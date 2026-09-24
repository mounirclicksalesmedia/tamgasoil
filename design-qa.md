# Process animation QA

final result: passed

## Visual truth and evidence

- Source: user-supplied tank-treatment film, reviewed in /tmp/tamgas-review/video-contact-sheet.jpg; new Blender reference render /tmp/tamgas-review/tank-detail.png (1200 × 900).
- Implementation: http://localhost:3000/en#process and http://localhost:3000/ar#process. Browser screenshots were viewed inline in this task at desktop 1440 × 1000 / 1440 × 1100 and mobile 390 × 844 CSS pixels. The browser tool provided inline captures rather than saved screenshot paths.
- Combined comparison: Blender source render and final English browser screenshot emitted together in the final comparison call. The source is an isolated tank; implementation is the same exported geometry within the existing website. Scaling, green background, browser lighting and animated fluid state are intentional differences; this was a modernization, not a pixel clone.
- Focused comparisons: exposed fluid layers, roof, pipes and skids; mobile captions, automatic stage indicator and Arabic RTL layout. Source and implementation density differ, so no pixel-exact fidelity claim is made.

## Findings and iterations

- Fixed: initial implementation replaced the video hero. Per user correction, restored the original Hero component exactly. The 3D model is exclusively in The method. Per the final placement request, The method follows Why TAM and precedes Solutions.
- Fixed: early web lighting washed out fluid colors; reduced exposure and light strength. Final render keeps separate amber, teal and burgundy layers.
- Fixed: initial GLB animation targeted the wrong local scale axis. Inspected actual exported transforms and changed browser fluid scaling to Y. Fluid layers remain stacked.
- Fixed: Blender interpolation introduced small fluid-interface gaps. Added drivers and verified zero gaps at six sampled timeline positions; opening, dosing, digestion and recovery renders viewed.
- Fixed: original 6.5-second stages and playback controls felt slow. Final cycle uses 2.8-second automatic stages, 0.8-second fluid transitions, faster flow indicators, animated caption entrances and progress lines. All process buttons removed.
- Final English browser DOM: one hero video, zero process buttons, running automatic cycle. Arabic mobile DOM: 390px viewport and 390px scroll width, running automatic cycle, automatically changing caption.

## Required surfaces

- Typography: existing IBM Plex Sans/Arabic/Mono preserved; legible stage title/body hierarchy, no observed clipping.
- Layout: original hero preserved; full-width process panel fits desktop and 390px mobile; stable caption space reduces layout jumps.
- Colors: existing green site palette preserved; fluid colors correspond to the visible legend.
- Assets: genuine Blender 3D geometry, exported as a self-contained 392,584-byte GLB, nine meshes. 50,072-byte transparent WebP fallback. No video embedded in The method.
- Copy: original four process descriptions retained in English/Arabic; illustrative timing note retained. No recovery rates or physical simulation claims added.

## Checks

- Production build and targeted ESLint passed.
- No browser application errors in checked states. Next.js dev console has image LCP loading hints for direct hash navigation, including the existing logo.
- Earlier stage/rotation/playback interaction checks passed before the user's final switch to automatic-only controls. Final verification checks the automatic cycle and absence of those controls.
- Complete stable screen-reader copy; reduced-motion and error paths include all four descriptions. Forced reduced-motion and WebGL-failure emulation were not performed.
- Blender source scene remains editable and open. Original default scene preserved; recovery checkpoints written without changing the active file path.

## Remaining scope

No actionable P0/P1/P2 findings in the checked states. No production deployment performed.
