"""Run inside Blender via the connected bridge; preserves all existing scenes.
Set TAM_ROOT to the website repository path. Set TAM_PHASE to 'blockout',
'detail' or 'export'. Website animations use the
same named, bottom-anchored fluid meshes exported here.
"""
import bpy, math, os
from mathutils import Vector
from math import sin, cos, pi

phase = globals().get('TAM_PHASE', 'blockout')
ROOT = globals().get('TAM_ROOT')
if phase == 'export' and not ROOT:
    raise ValueError('Set TAM_ROOT to the absolute website repository path before export.')
scene = bpy.data.scenes.get('TAM_Process')
if scene is None:
    scene = bpy.data.scenes.new('TAM_Process')
bpy.context.window.scene = scene
col = bpy.data.collections.get('TAM_Asset')
if col is None:
    col = bpy.data.collections.new('TAM_Asset')
    scene.collection.children.link(col)

def material(name, color, metal=0, rough=.35):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    bs = m.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = (*color, 1)
    bs.inputs['Metallic'].default_value = metal
    bs.inputs['Roughness'].default_value = rough
    return m

steel=material('TAM_Steel', (.48,.62,.57), .65,.3)
edge=material('TAM_Edge', (.75,.83,.78), .7,.24)
green=material('TAM_Green', (.026,.16,.10), .4,.32)
sludge_mat=material('TAM_Sludge', (.17,.035,.047), .05,.6)
oil_mat=material('TAM_Oil', (.56,.30,.065), .28,.22)
water_mat=material('TAM_Water', (.03,.23,.22), .1,.24)
base_mat=material('TAM_Base', (.025,.064,.048), .25,.6)
mint=material('TAM_Treatment', (.28,.84,.49), .15,.24)

# All helpers are idempotent. Semantic meshes remain separate for animation.
def mesh(name, verts, faces, mat, location=(0,0,0), smooth=False):
    if name in bpy.data.objects:
        return bpy.data.objects[name]
    data=bpy.data.meshes.new(name+'_Mesh'); data.from_pydata(verts, [], faces); data.update()
    ob=bpy.data.objects.new(name,data); col.objects.link(ob); ob.location=location
    data.materials.append(mat)
    if smooth:
        for p in data.polygons: p.use_smooth=True
    return ob

def cylinder(name,r,h,loc,mat,n=80):
    v=[(r*cos(i*2*pi/n),r*sin(i*2*pi/n),z) for z in (0,h) for i in range(n)]
    f=[tuple(reversed(range(n))),tuple(range(n,2*n))]
    f += [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    ob=mesh(name,v,f,mat,loc)
    for p in ob.data.polygons[2:]:p.use_smooth=True
    return ob

def box(name,dim,loc,mat,bevel=0):
    x,y,z=[d/2 for d in dim]
    v=[(-x,-y,-z),(x,-y,-z),(x,y,-z),(-x,y,-z),(-x,-y,z),(x,-y,z),(x,y,z),(-x,y,z)]
    ob=mesh(name,v,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],mat,loc)
    if bevel and not ob.modifiers:
        mod=ob.modifiers.new('Machined edges','BEVEL');mod.width=bevel;mod.segments=3
        ob.modifiers.new('Face normals','WEIGHTED_NORMAL')
    return ob

def arc(name,profile,mat,start=-20,end=210,n=100):
    # Closed radial profile swept into a thick, manifold open-front tank wall.
    v=[]
    for i in range(n+1):
        a=math.radians(start+(end-start)*i/n)
        v += [(r*cos(a),r*sin(a),z) for r,z in profile]
    k=len(profile);f=[]
    for i in range(n):
        for j in range(k):f.append((i*k+j,i*k+(j+1)%k,(i+1)*k+(j+1)%k,(i+1)*k+j))
    f += [tuple(reversed(range(k))),tuple(n*k+j for j in range(k))]
    return mesh(name,v,f,mat,smooth=True)

def pipe(name,points,r,mat):
    if name in bpy.data.objects:return bpy.data.objects[name]
    data=bpy.data.curves.new(name+'_Curve','CURVE');data.dimensions='3D';data.resolution_u=12
    data.bevel_depth=r;data.bevel_resolution=3
    sp=data.splines.new('POLY');sp.points.add(len(points)-1)
    for p,co in zip(sp.points,points):p.co=(*co,1)
    ob=bpy.data.objects.new(name,data);col.objects.link(ob);data.materials.append(mat)
    return ob

def point_camera(ob,at):ob.rotation_euler=(Vector(at)-ob.location).to_track_quat('-Z','Y').to_euler()

if phase=='blockout':
    cylinder('ENV_plinth',3.65,.28,(0,0,0),base_mat)
    cylinder('HERO_floor',3.28,.1,(0,0,.28),edge)
    arc('HERO_shell',[(3.14,.38),(3.26,.38),(3.26,4.05),(3.14,4.05)],steel)
    cylinder('HERO_sludge',3.12,1,(0,0,.38),sludge_mat)
    cylinder('HERO_water',3.115,1,(0,0,1.18),water_mat)
    cylinder('HERO_oil',3.11,1,(0,0,1.56),oil_mat)
    bpy.data.objects['HERO_sludge'].scale.z=.8
    bpy.data.objects['HERO_water'].scale.z=.38
    bpy.data.objects['HERO_oil'].scale.z=.65
    box('PRP_dosing_skid',(1.6,1.3,.18),(-4.6,0,.09),base_mat)
    box('PRP_dosing_cabinet',(.85,.8,1.4),(-4.85,.05,.88),green,.06)
    box('PRP_recovery_skid',(1.65,1.25,.18),(4.6,.2,.09),base_mat)
    cylinder('PRP_recovery_vessel',.46,1.48,(4.7,.2,.18),steel)
    pipe('PRP_dose_pipe',[(-4.6,-.45,.8),(-3.8,-.45,.8),(-3.8,-.45,4.48),(-1.4,-.45,4.48),(-1.4,-.45,2.8)],.075,mint)
    pipe('PRP_recovery_pipe',[(2.4,-1.8,.75),(3.7,-1.8,.75),(3.7,.2,.75),(4.7,.2,.75)],.095,oil_mat)
    camera_data=bpy.data.cameras.get('CAM_TAM_Data') or bpy.data.cameras.new('CAM_TAM_Data');camera=bpy.data.objects.get('CAM_TAM') or bpy.data.objects.new('CAM_TAM',camera_data)
    if camera.name not in scene.objects:scene.collection.objects.link(camera)
    camera.location=(9,-14,10);point_camera(camera,(0,0,1.8));camera_data.type='ORTHO';camera_data.ortho_scale=12.5;scene.camera=camera
    scene.render.engine='BLENDER_EEVEE';scene.render.resolution_x=1200;scene.render.resolution_y=900;scene.render.resolution_percentage=75
    scene.render.fps=24;scene.frame_start=1;scene.frame_end=192
    scene.world=bpy.data.worlds.get('TAM_World') or bpy.data.worlds.new('TAM_World');scene.world.use_nodes=True
    scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.14,.19,.16,1)
    scene.world.node_tree.nodes['Background'].inputs[1].default_value=.4
    scene.view_settings.view_transform='AgX';scene.view_settings.exposure=0
    # Camera-aligned solid viewport evidence for the blockout gate.
    for area in bpy.context.screen.areas:
        if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA'
    scene.render.film_transparent=True
    scene.render.image_settings.file_format='PNG'
    scene.render.filepath='/tmp/tamgas-review/blockout.png'
    scene.display.shading.light='STUDIO';scene.display.shading.color_type='MATERIAL'
    bpy.ops.render.opengl(write_still=True, view_context=False)

elif phase=='detail':
    for z in (.43,1.6,2.85,4.02):
        arc('PRP_shell_band_'+str(z),[(3.26,z-.035),(3.295,z-.035),(3.295,z+.035),(3.26,z+.035)],edge)
    # Raised conical roof cutaway; closed radial profile, aligned with shell opening.
    arc('HERO_roof',[(.55,4.45),(3.3,4.07),(3.3,4.13),(.55,4.51)],steel)
    for z in (4.22,4.62):
        points=[(3.22*cos(math.radians(a)),3.22*sin(math.radians(a)),z) for a in range(-20,211,2)]
        pipe('PRP_rail_'+str(z),points,.023,edge)
    for i,a in enumerate(range(-20,211,15)):
        a=math.radians(a);x,y=3.22*cos(a),3.22*sin(a)
        pipe('PRP_rail_post_'+str(i),[(x,y,4.08),(x,y,4.64)],.024,edge)
    # Service ladder supported at floor and roof.
    for y in (-.32,.32):pipe('PRP_ladder_stringer_'+str(y),[(-3.48,y,.28),(-3.48,y,4.58)],.038,edge)
    for i in range(16):
        z=.42+i*.26;pipe('PRP_ladder_rung_'+str(i),[(-3.48,-.32,z),(-3.48,.32,z)],.027,edge)
    for z in (.55,2.2,3.8):pipe('PRP_ladder_mount_'+str(z),[(-3.48,0,z),(-3.15,0,z)],.042,steel)
    # Cabinet vents and recessed-looking instrument plate, with no baked text.
    box('PRP_control_panel',(.6,.024,.32),(-4.85,-.367,1.24),base_mat,.02)
    for i in range(6):box('PRP_cabinet_vent_'+str(i),(.56,.035,.018),(-4.85,-.365,.5+i*.065),edge,.005)
    motor=cylinder('PRP_pump_motor',.23,.64,(-4.15,-.3,.44),green,32);motor.rotation_euler=(0,pi/2,0)
    for i in range(5):
        ring=cylinder('PRP_motor_fin_'+str(i),.253,.025,(-4.14+i*.11,-.3,.44),edge,32);ring.rotation_euler=(0,pi/2,0)
    # Small flanges and visible bolt heads along both transfer connections.
    for side,x,y,z in [('dose',-3.8,-.45,.8),('recovery',3.5,-1.8,.75)]:
        flange=cylinder('PRP_'+side+'_flange',.18,.09,(x,y,z),edge,32);flange.rotation_euler=(0,pi/2,0)
        for i in range(8):
            a=i*pi/4;bolt=cylinder('PRP_'+side+'_bolt_'+str(i),.026,.12,(x-.01,y+.135*cos(a),z+.135*sin(a)),green,6);bolt.rotation_euler=(0,pi/2,0)
    cylinder('PRP_separator_cap',.48,.09,(4.7,.2,1.66),edge)
    pipe('PRP_separator_outlet',[(4.7,.2,1.6),(5.2,.2,1.6),(5.2,.2,.65)],.065,edge)
    # Frame-driven fluid volumes use bottom origins; total layers remain stacked.
    sludge=bpy.data.objects['HERO_sludge'];water=bpy.data.objects['HERO_water'];oil=bpy.data.objects['HERO_oil']
    for frame,s,w,o in [(1,.8,.38,.65),(48,.8,.38,.65),(96,.5,.40,.92),(144,.18,.46,1.18),(192,.18,.22,.35)]:
        sludge.scale.z=s;water.scale.z=w;water.location.z=.38+s;oil.scale.z=o;oil.location.z=.38+s+w
        for ob in (sludge,water,oil):
            ob.keyframe_insert(data_path='scale',frame=frame);ob.keyframe_insert(data_path='location',frame=frame)
    # Driver-linked interfaces keep layers exactly touching between keyframes.
    for name,expr,variables in [('HERO_water','.38+s',[('s','HERO_sludge')]),('HERO_oil','.38+s+w',[('s','HERO_sludge'),('w','HERO_water')])]:
        ob=bpy.data.objects[name];driver=ob.driver_add('location',2).driver;driver.expression=expr
        for v in list(driver.variables):driver.variables.remove(v)
        for var,target in variables:
            v=driver.variables.new();v.name=var;v.type='SINGLE_PROP';v.targets[0].id=bpy.data.objects[target];v.targets[0].data_path='scale[2]'
    # Purposeful flow pulses along the dosing route, separate portable meshes.
    for i in range(7):
        dot=cylinder('PRP_treatment_pulse_'+str(i),.075,.12,(-1.4,-.45,3.8),mint,12)
        for frame,z in [(1,3.9-i*.16),(48,3.9-i*.16),(96,2.4-i*.09),(144,3.9-i*.16),(192,3.9-i*.16)]:
            dot.location.z=z;dot.keyframe_insert(data_path='location',frame=frame)
    def light(name,loc,power,size,color):
        data=bpy.data.lights.get(name) or bpy.data.lights.new(name,'AREA');data.energy=power;data.shape='DISK';data.size=size;data.color=color
        ob=bpy.data.objects.get(name) or bpy.data.objects.new(name,data)
        if ob.name not in scene.objects:scene.collection.objects.link(ob)
        ob.location=loc;point_camera(ob,(0,0,1.8))
    light('LGT_key',(-5,-7,10),2100,7,(.88,1,.94))
    light('LGT_fill',(6,-3,6),1000,6,(1,.89,.72))
    light('LGT_rim',(1,6,9),2600,5,(.69,1,.82))
    scene.frame_set(96);scene.render.resolution_percentage=100
    scene.render.filepath='/tmp/tamgas-review/tank-detail.png'
    bpy.ops.render.render(write_still=True)

elif phase=='export':
    # Batch static geometry by material for ~10 browser draw calls, retaining
    # the independently editable source objects and animated fluid objects.
    scene.frame_set(1)
    depsgraph=bpy.context.evaluated_depsgraph_get()
    batches={}
    for ob in col.objects:
        if ob.name in ['HERO_sludge','HERO_water','HERO_oil'] or ob.name.startswith('PRP_treatment_pulse'):continue
        evaluated=ob.evaluated_get(depsgraph)
        data=bpy.data.meshes.new_from_object(evaluated)
        if not data.materials:
            bpy.data.meshes.remove(data);continue
        mat=data.materials[0]
        batch=batches.setdefault(mat.name,{'verts':[],'faces':[],'smooth':[],'mat':mat})
        offset=len(batch['verts'])
        batch['verts'] += [tuple(ob.matrix_world @ v.co) for v in data.vertices]
        batch['faces'] += [tuple(offset+i for i in poly.vertices) for poly in data.polygons]
        batch['smooth'] += [poly.use_smooth for poly in data.polygons]
        bpy.data.meshes.remove(data)
    temp=bpy.data.collections.new('TAM_Export_Temporary');scene.collection.children.link(temp)
    for name,batch in batches.items():
        data=bpy.data.meshes.new('Export_'+name);data.from_pydata(batch['verts'],[],batch['faces']);data.materials.append(batch['mat']);data.update()
        for poly,smooth in zip(data.polygons,batch['smooth']):poly.use_smooth=smooth
        ob=bpy.data.objects.new('Static_'+name,data);temp.objects.link(ob)
    for ob in scene.objects:ob.select_set(False)
    for ob in temp.objects:ob.select_set(True)
    for name in ['HERO_sludge','HERO_water','HERO_oil']:bpy.data.objects[name].select_set(True)
    bpy.context.view_layer.objects.active=bpy.data.objects['HERO_shell']
    bpy.ops.export_scene.gltf(filepath=ROOT+'/public/models/tam-tank-process.glb',export_format='GLB',use_selection=True,use_active_scene=True,export_apply=True,export_current_frame=True,export_animations=False,export_cameras=False,export_lights=False)
    for ob in list(temp.objects):
        data=ob.data;bpy.data.objects.remove(ob,do_unlink=True);bpy.data.meshes.remove(data)
    bpy.data.collections.remove(temp)
    scene.frame_set(96)
    scene.render.filepath='/tmp/tamgas-review/tank-process-poster.png'
    bpy.ops.render.render(write_still=True)

result={'phase':phase,'scene':scene.name,'objects':len(scene.objects),'asset_objects':len(col.objects),'camera':scene.camera.name,'render':scene.render.filepath,'protected_scene_objects':list(bpy.data.scenes['Scene'].objects.keys())}
