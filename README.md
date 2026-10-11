# SooVers — spatial prototype 0.3

An original, browser-rendered 3D campus with a tower-only animated entrance for Ali's cybersecurity education concept. Persian interface; Eight procedurally modelled floors, 24 room zones, exterior orbit view, floor entry, first-person movement, and twenty linked learning tracks.

## Education demo 0.3

The attached original local 0.1 package was inspected and the existing source was extended without rewriting the renderer or library. The 0.2 opening tower animation is preserved. Exposure was lowered from 1.15 to 0.82, bloom from .34 to .10, environment lighting reduced, and metallic reflections softened.

Eight new navigable spaces comprise reception, a visitor discovery mezzanine and an education hub with classroom, laboratory, SOC, CTF and auditorium rooms. All new functionality is confined to this reception/education visit. See `docs/DEMO_GUIDE_FA.md` for an 8-minute presentation and capability matrix. `docs/DESIGN_REFERENCES.md` records primary-source design research and integration boundaries.

The whiteboard, three-slide lesson, question, local incident exercise, log challenge, nonduplicating score and report export actually work in browser memory. Exercise state follows the visitor between rooms. The guide is scripted; demo role selection is not authentication. Network events and avatars are synthetic. New education spaces target desktop/touch; headset interaction is future work.

Run `node scripts/test-campus.mjs` and `node scripts/test-soovers-motion.mjs` for state/scene checks. The campus test uses the actual Three.js scene graph with a stub Canvas context; it does not certify WebGL rendering. Browser control is unavailable in this environment, so device visual verification remains outstanding.

## Original tower scope

This is a single-user spatial prototype, not an operational cyber range. The monitors are explicitly labelled illustrative. There are no live SIEM events, attacks, running VMs, multiuser avatars, live instructor sessions, server assessment service, or embedded AI tutor. The new local exercise score is a demo assessment only. No claim of scientific novelty or comprehensive literature review is made by this prototype. The eight articles in the brief are research inputs for a subsequent evidence-based review; their implementation details have not been inferred from titles.

## Entrance

The opening scene is an original titanium and smoked-glass architectural sculpture. Procedural particles coalesce around the tower as eight floors assemble during a nine-second camera move. Touch or pointer interaction immediately releases the scripted camera. Pause/resume, replay, zoom and an exploded architectural view are available before entry; no floor directory or course features are shown at this stage. Enter goes to the lobby; the SooVers wordmark returns to the quiet exterior. Reduced-motion preference skips assembly and automatic camera motion. Rendering uses Three.js and soft bloom (disabled at low quality), with no downloaded model or image dependencies.

For future iterations, the presentation timeline lives in `lib/soovers-motion.ts`; room and floor content remains in `lib/tower-data.ts`. Floor selection does not start any backend lab.

## Controls

Drag to orbit, scroll to zoom, select a floor in the directory or on the building. Enter a floor, select room zones, or choose first-person walking. Use WASD or arrows, mouse look, Escape to leave. Touch movement buttons are available on mobile. The WebXR path requests an immersive-vr session when a compatible headset is detected. Controller ray selection teleports to floor positions; left stick moves. Exit VR before changing floors. Real headset validation remains required; desktop emulation is not proof of headset support.

## Local development

Node 22.13+ recommended. Install the pinned dependencies using pnpm. Use `pnpm exec vite --config vite.local.config.ts` for a local development server. `pnpm exec vite build --config vite.local.config.ts` produces the portable client in `local-dist/`. The hosted build uses the original Sites/Vinext scripts and keeps its own build pipeline. No API credentials are needed for the spatial prototype.

## Main source modules

- `lib/tower-data.ts`: floors, rooms, verified publisher links, proposed track topics and per-course tutor prompt.
- `components/tower/engine.ts`: Three.js scene, scene geometry, orbit/first-person/WebXR controls.
- `components/tower/TowerApp.tsx`: Persian UI, navigation and NotebookLM launch configuration.
- `app/globals.css`: responsive interface, local Persian font, theme.

The direct publisher links were checked on 2026-10-04. These are a starter catalog, not all cybersecurity courses. Track outlines are our proposed learning paths, not the publishers' exact syllabuses. Official publisher pages often require purchase; the site does not provide or import copyrighted book files. Exploring Splunk is a 2012 foundational text; use current version-matched Splunk documentation for production settings. Some other references are also older, so use them for concepts rather than current product configuration.

## NotebookLM

Opening a course shows the book, its reference link, a Persian tutor prompt and a notebook URL field. Links are saved only in this browser's localStorage and restricted to HTTPS notebook pages on notebooklm.google.com / notebook.google.com. The prototype does not authenticate to Google, upload sources, call a chat API, or start teaching automatically. Users add their authorized book source, paste the tutor prompt, then save the resulting notebook link. Commercial full-book content cannot be inferred from a publisher listing.

Official documentation:
- https://support.google.com/gemininotebook/answer/16215270?hl=en
- https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks
- https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks-sources

## Extension points

Add multiplayer presence and instructor controls through a separate authenticated session service. Implement range provisioning through a backend gateway with lab isolation and per-session permissions. Do not put privileged Splunk tokens in the browser. Feed normalized alert events to SOC displays over an authenticated HTTPS/WebSocket service. Keep training outcomes separate from presence telemetry. Add course notebooks centrally only after choosing and authorizing a supported Google integration.

## Verification

TypeScript compilation and production builds are verified during delivery. For the 0.2 update, browser visual QA was unavailable in this environment. The presentation state tests cover time independence, manual interruption, pause/replay, room transitions, and reduced motion. The finished composition and GPU behavior still need real browser inspection. Real-device VR and mobile interaction still require validation. Procedural furniture is an early spatial model, not a collision-complete game environment.
