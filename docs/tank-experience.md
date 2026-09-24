# Homepage 3D process experience

Reference: supplied 101-second 640 × 480 tank-treatment film. Visual review at eight-second intervals identified the tank cutaway, dosing pipework, internal treatment and transfer/recovery. After Effects inspection confirmed a single footage layer rather than editable source geometry. Website copy supplies the four explanatory stages; this is an illustrative process, not an engineering simulation or a recovery guarantee.

## Scene passport

SCENE
- intent: Explain non-entry sludge treatment with an inspectable tank cutaway.
- deliverable: Blender-authored GLB, poster and responsive English/Arabic integration exclusively in The method section; original video hero preserved.
- units: metres; axes: right-handed Z-up; glTF exports Y-up.
- render: EEVEE, 1200 × 900, 24 fps, frames 1–192.
- dynamic: yes; treatment, digestion and recovery stages, automatic browser playback.

HIERARCHY
- collection/object naming: new TAM_Process scene, TAM_Asset collection; HERO_, PRP_, ENV_, CAM_, LGT_ prefixes.
- parent/child relationships: independently editable fluid, shell, pipe and equipment meshes.
- protected existing objects: original Scene, Cube, Camera, Light; no changes/deletions.

ASSETS
- A01 HERO_shell | [BLOCK] detailed | 6.4 × 6.4 × 3.8 m | [0,0,0.3] | [0,0,0] | base anchor | tank body.
- A02 HERO_sludge / HERO_oil / HERO_water | [BLOCK] stylized | diameter 6.15 m, variable depth | [0,0,0.38] | base anchor | independently animated fluids.
- A03 PRP_dosing / PRP_recovery | [BLOCK] detailed | approximately 1.2 × 1 × 1.5 m | [-4.5,0,0.2] / [4.4,0,0.2] | ground anchor | dosing and recovery skids.
- A04 PRP_pipework / rails / ladder | [BLOCK] detailed | tank-relative dimensions | fixed to shell | industrial scale cues.
- A05 ENV_plinth | [BLOCK] stylized | diameter 7.2 m, 0.3 m high | [0,0,0] | ground anchor.
- generation estimate/submission state: no paid generation required; engineered geometry is built locally.

SHOT
- active camera: CAM_TAM.
- framing/lens/target: orthographic technical product view, [9,-14,10], target [0,0,1.8], scale 12.5.
- foreground/subject/background: exposed fluid faces; metallic tank shell; deep green site background.

LOOK
- material roles and palette: pale brushed steel shell, dark green equipment, amber recovered oil, burgundy sludge, teal water, mint treatment.
- material route: local flat Principled materials, portable glTF properties.
- texture scale/UV: none required; geometry supplies seams and flanges.
- relief: geometric welded bands and railings; no fake baked labels.
- dielectric/metallic: shell metallic 0.65, roughness 0.3; fluids dielectric, roughness 0.22.
- world/background: deep green; transparent poster for site compositing.

LIGHTING
- focal subject: exposed tank interior; secondary: dosing/recovery pipework; darkest region: underside and rear equipment.
- mood: clean technical studio, consistent with site brand.
- environment route: NONE; no HDR required.
- baseline: neutral dim World, compare World-only and no World.
- key: large upper-left source, soft reflections on steel.
- fill: weaker front-right source to preserve readable fluids.
- rim: upper rear source to separate the shell silhouette.
- motivation: studio product lighting, no asserted outdoor realism.
- reflection strategy: broad area highlights.
- atmosphere: none.
- color management: AgX, exposure 0.

MOTION
- 24 fps, frames 1–192; 8-second authored demonstration.
- beats: sample/rest → dosing → sludge depth reduction/oil separation → recovery draw-off.
- web runtime: automatic 2.8-second stages (11.2-second full cycle), 0.8-second eased fluid changes, accelerated flow indicators, pointer-responsive orbit, animated stage captions and progress lines. No play/pause/stage buttons. Reduced-motion users see a static model and all four stage explanations.
- loop: stage reset is explicit, not represented as a physical reverse process.

ACCEPTANCE
- structural: protected scene preserved; named meshes and separate fluid origins; lightweight self-contained GLB.
- motion: fluid depths visibly change; particles follow actual pipe paths; pause and reduced-motion work.
- visual: open-front silhouette, clear fluid colors, readable shell and supported equipment; no clipping at desktop/mobile widths.
- lighting: inspect camera render, isolation renders and web view with fixed exposure; no atmosphere.

refs_read: blender-scene, blender-scene-spec, blender-modeling, blender-lookdev, blender-lighting-camera, blender-animation, blender-audit-finalize, blender-volatile.

## Build checklist

- [x] Read all applicable Blender reference modules.
- [x] A: inspect reference, scene and scope; write passport.
- [x] B: recovery checkpoint.
- [x] C: silhouette/proportions/depth/contact/camera gate.
- [x] D: detail/materials/lighting/animation/export.
- [x] E: structural, motion, render and browser checks.


## Verification and delivery

- Original video hero preserved. Per final user request, The method sits immediately after Why TAM and before Solutions. Only The method hosts the model.
- The GLB is 392,584 bytes, with nine meshes and eight materials. Static geometry is batched by material; three named fluid meshes remain independent.
- Blender main shell, roof and fluid meshes have zero non-manifold edges. Fluid contact was checked at six timeline positions with zero gaps; four motion frames and five isolated-light renders were viewed.
- Existing Blender Scene/Cube/Camera/Light preserved. New editable scene: TAM_Process. Recovery checkpoints are in /tmp; active Blender file path was not changed.
- Web assets: public/models/tam-tank-process.glb and public/media/tank-process-poster.webp (50,072 bytes).
- Full production build and targeted ESLint pass.
- Browser: English desktop and mobile; Arabic mobile; automatic stages/captions advance without buttons. No horizontal overflow at 390px. No application console errors in inspected states.
- Reduced-motion and failed-WebGL paths retain a static poster and complete stage copy. Forced reduced-motion/WebGL-failure browser emulation was not performed.
- No deployment or paid generation performed.

The model-building script runs inside Blender with TAM_PHASE set to blockout, detail or export; export additionally requires TAM_ROOT set to the repository path. The web GLB deliberately omits baked animation: live stage animation is provided by lib/three/tank-scene.ts.
