import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type TankScene = {
  setStage: (stage: number, immediate?: boolean) => void;
  setPlaying: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  dispose: () => void;
};

/** Blender-authored, independently editable meshes; browser motion is illustrative. */
export async function createTankScene(host: HTMLElement, onFailure: () => void): Promise<TankScene> {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x05211a, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .95;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "tank-canvas";
  host.prepend(canvas);
  const world = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-6.5, 6.5, 4.9, -4.9, .1, 100);
  camera.position.set(9, 10, 14);
  camera.lookAt(0, 1.8, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  world.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  world.add(new THREE.HemisphereLight(0xe1ffee, 0x15231c, .9));
  const key = new THREE.DirectionalLight(0xf0fff5, 2); key.position.set(-5, 10, 7); world.add(key);
  const rim = new THREE.DirectionalLight(0xa7ffd1, 1.4); rim.position.set(0, 6, -6); world.add(rim);
  const warm = new THREE.DirectionalLight(0xffdfad, .65); warm.position.set(7, 5, 3); world.add(warm);
  let model: THREE.Group;
  try {
    model = (await new GLTFLoader().loadAsync("/models/tam-tank-process.glb")).scene;
  } catch (error) {
    renderer.dispose(); environment.dispose(); canvas.remove(); throw error;
  }
  world.add(model);
  const sludge = model.getObjectByName("HERO_sludge")!;
  const water = model.getObjectByName("HERO_water")!;
  const oil = model.getObjectByName("HERO_oil")!;
  if (!sludge || !water || !oil) {
    model.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
    renderer.dispose(); environment.dispose(); canvas.remove();
    throw new Error("The tank model is missing its fluid layers.");
  }
  // glTF converts Blender Z-up into Y-up, preserving the initial layer scales.
  const initialScale = [sludge.scale.clone(), water.scale.clone(), oil.scale.clone()];
  const initialHeights = [.8, .38, .65];
  const states = [[.8, .38, .65], [.8, .38, .65], [.18, .46, 1.18], [.18, .22, .35]];
  let stage = 0;
  let target = states[0];
  const levels = [...target];
  let playing = false, visible = true, disposed = false, frame = 0, previous = 0, time = 0, transition = 0;
  let yaw = 0, yawTarget = 0, tilt = 0, tiltTarget = 0;
  const pulseMeshes: THREE.Object3D[] = [];
  model.traverse((object) => {
    if (object.name.startsWith("PRP_treatment_pulse")) object.visible = false;
    if (object instanceof THREE.Mesh) {
      object.castShadow = false;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) mat.envMapIntensity = .7;
      });
    }
  });
  const particleGeometry = new THREE.SphereGeometry(.11, 8, 6);
  const particleMaterial = new THREE.MeshBasicMaterial({color:0xa6ffcb});
  const oilParticleMaterial = new THREE.MeshBasicMaterial({color:0xffd991});
  const dosePath = new THREE.CurvePath<THREE.Vector3>();
  const recoveryPath = new THREE.CurvePath<THREE.Vector3>();
  // Blender Z-up → glTF Y-up: (x, y, z) → (x, z, -y).
  const makePath = (path: THREE.CurvePath<THREE.Vector3>, points: number[][]) => {
    for (let i=1;i<points.length;i++) path.add(new THREE.LineCurve3(new THREE.Vector3(...points[i-1]), new THREE.Vector3(...points[i])));
  };
  makePath(dosePath,[[-4.6,.8,.45],[-3.8,.8,.45],[-3.8,4.48,.45],[-1.4,4.48,.45],[-1.4,2.3,.45]]);
  makePath(recoveryPath,[[2.4,.75,1.8],[3.7,.75,1.8],[3.7,.75,-.2],[4.7,.75,-.2]]);
  for (let i=0;i<24;i++) {
    const dot=new THREE.Mesh(particleGeometry,i<16?particleMaterial:oilParticleMaterial);
    model.add(dot);pulseMeshes.push(dot);
  }
  // Surface rings indicate the treatment zone without pretending to simulate chemistry.
  const rings: THREE.Mesh[]=[];
  const ringGeometry=new THREE.TorusGeometry(1,.016,5,64);
  const ringMaterial=new THREE.MeshBasicMaterial({color:0x8de7b2,transparent:true,opacity:.5});
  for(let i=0;i<3;i++) {const ring=new THREE.Mesh(ringGeometry,ringMaterial.clone());ring.rotation.x=-Math.PI/2;model.add(ring);rings.push(ring);}

  const applyLevels = () => {
    [sludge,water,oil].forEach((object,i) => {
      // Exported local Y is the fluid axis.
      object.scale.copy(initialScale[i]); object.scale.y *= levels[i]/initialHeights[i];
    });
    sludge.position.y=.38;
    water.position.y=.38+levels[0];
    oil.position.y=.38+levels[0]+levels[1];
  };
  const render = (now: number) => {
    frame=0;
    if(disposed || !visible || document.hidden) {previous=0; return;}
    const dt=previous ? Math.min((now-previous)/1000,.05) : 0;
    previous=now;
    if(playing) time+=dt;
    if(transition>0) {
      levels.forEach((value,i)=>levels[i]=THREE.MathUtils.damp(value,target[i],9,dt || .016));
      transition-=dt;
      if(transition<=0) levels.splice(0,3,...target);
    }
    yaw=THREE.MathUtils.damp(yaw,yawTarget,9,dt || .016);
    tilt=THREE.MathUtils.damp(tilt,tiltTarget,7,dt || .016);
    model.rotation.y=yaw + (playing ? Math.sin(time*.65)*.055 : 0);
    model.rotation.x=tilt;
    applyLevels();
    pulseMeshes.forEach((dot,i)=>{
      const dosing=i<16;
      dot.visible=dosing ? stage===1 || stage===2 : stage===3;
      const t=(time*.42+(dosing?i/16:(i-16)/8))%1;
      dot.position.copy((dosing?dosePath:recoveryPath).getPoint(t));
    });
    rings.forEach((ring,i)=>{
      ring.visible=stage===2;
      const phase=(time*.55+i/3)%1;
      ring.scale.setScalar(.15+phase*1.7);
      ring.position.set(-.45,.4+levels.reduce((a,b)=>a+b,0),.3);
      (ring.material as THREE.MeshBasicMaterial).opacity=(1-phase)*.4;
    });
    renderer.render(world,camera);
    if(playing || transition>0 || Math.abs(yaw-yawTarget)>.001) requestRender();
  };
  const requestRender = () => { if(!frame && !disposed && visible && !document.hidden) frame=requestAnimationFrame(render); };
  const resize = () => {
    const {width,height}=host.getBoundingClientRect();
    if(!width || !height) return;
    const aspect=width/height;
    const halfWidth=Math.max(6.25,4.35*aspect);
    camera.left=-halfWidth;camera.right=halfWidth;camera.top=halfWidth/aspect;camera.bottom=-halfWidth/aspect;
    camera.updateProjectionMatrix();renderer.setSize(width,height,false);requestRender();
  };
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  let dragX: number | null=null;
  const pointerDown=(event:PointerEvent)=>{dragX=event.clientX;canvas.setPointerCapture(event.pointerId);};
  const pointerMove=(event:PointerEvent)=>{
    if(!playing) return;
    if(dragX!==null) {yawTarget=THREE.MathUtils.clamp(yawTarget+(event.clientX-dragX)*.004,-.4,.4);dragX=event.clientX;}
    else if(event.pointerType!=="touch") {
      const bounds=canvas.getBoundingClientRect();
      yawTarget=((event.clientX-bounds.left)/bounds.width-.5)*.5;
      tiltTarget=((event.clientY-bounds.top)/bounds.height-.5)*.055;
    }
    requestRender();
  };
  const pointerUp=()=>{dragX=null;};
  const pointerLeave=()=>{dragX=null;yawTarget=0;tiltTarget=0;requestRender();};
  canvas.addEventListener("pointerdown",pointerDown);canvas.addEventListener("pointermove",pointerMove);canvas.addEventListener("pointerup",pointerUp);canvas.addEventListener("pointercancel",pointerUp);canvas.addEventListener("pointerleave",pointerLeave);
  const visibilityChange=()=>{previous=0;requestRender();};
  document.addEventListener("visibilitychange",visibilityChange);
  const contextLost=(event:Event)=>{event.preventDefault();visible=false;onFailure();};
  canvas.addEventListener("webglcontextlost",contextLost);
  requestRender();
  return {
    setStage(value,immediate=false) {stage=value;target=states[value];transition=immediate?0:.8;if(immediate)levels.splice(0,3,...target);requestRender();},
    setPlaying(value) {playing=value;previous=0;requestRender();},
    setVisible(value) {visible=value;previous=0;if(!value && frame){cancelAnimationFrame(frame);frame=0;}requestRender();},
    dispose() {
      disposed=true;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener("visibilitychange",visibilityChange);
      canvas.removeEventListener("pointerdown",pointerDown);canvas.removeEventListener("pointermove",pointerMove);canvas.removeEventListener("pointerup",pointerUp);canvas.removeEventListener("pointercancel",pointerUp);canvas.removeEventListener("pointerleave",pointerLeave);canvas.removeEventListener("webglcontextlost",contextLost);
      const geometries=new Set<THREE.BufferGeometry>();const materials=new Set<THREE.Material>();
      world.traverse((object)=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());environment.dispose();renderer.dispose();canvas.remove();
    },
  };
}
