# September 2026 visual refresh

The layout research used Customer.io sections returned by the Mobbin MCP, including:
- https://mobbin.com/sites/sections/60e8549b-7483-4964-a488-daca18ec0994
- https://mobbin.com/sites/sections/695ef77c-4097-43ad-9231-7072a0dd34d0

Royal green and burgundy (العنابي) remain the brand colors. Ivory and white are supporting surfaces. The homepage video and headline are preserved. Decorative polygon overlays, dotted page backgrounds, excessive card borders, and hover-only service descriptions were removed or simplified.

## Image provenance

All generated images use the built-in Image Gen tool. They are illustrative website imagery and must not be presented as documentation of TAM projects, facilities, or staff. The existing source photographs and hero video are retained.

- `public/media/tank-farm-enhanced.webp`: enhancement generated from `public/media/services/svc-01.jpg`. Prompt: Enhance the tank farm photograph for a premium oil and gas website; preserve tank farm subject and arrangement, improve clarity, detail and exposure, natural warm sunlight and ivory steel with deep royal green shadows. Lift muddy shadows and reduce yellow haze. No graphics, text, overlays, borders or logos.
- `public/media/precision-pipework.webp`: Prompt: Premium 3:2 editorial industrial photograph of clean refinery pipework and flanged valves beside an ivory petroleum storage tank; deep royal-green pipelines, brushed metal and one burgundy valve wheel. Physically credible engineering, natural afternoon sunlight, calm architectural framing. No people, text, logos, smoke, overlays or named facility.
- `public/media/safety-team.webp`: Prompt: Premium 3:2 editorial photograph of two anonymous engineers seen from behind on a safe ground-level walkway beside an ivory storage tank, reviewing a tablet. Royal-green reflective coveralls, white hard hats, safety glasses, gloves and boots, a burgundy document wallet. Natural morning sunlight, realistic materials. No hazardous action, text, logos or claims of a real named team.
- `public/media/terminal-night.webp`: blue-hour coastal terminal and marine loading arms for the blog feature.
- `public/media/sampling-lab.webp`: field sample collection with stainless inspection tools for the process section.
- `public/media/inspection-instruments.webp`: engineer inspecting tank instrumentation for the About hero.
- `public/media/port-terminal.webp`: sunrise marine terminal for the Markets section.
- `public/media/coating-maintenance.webp`: protective coating maintenance for the Solutions hero.
- `public/media/control-room.webp`: industrial control room for the homepage Services feature.

Each image slot has one owner: Pillars owns `tank-farm-enhanced.webp`, Technology owns `precision-pipework.webp`, Contact owns `safety-team.webp`, and the six new images each appear in one page section. Blog article covers use the original `public/media/blog/*.jpg` files, while the index uses one-time service stills as thumbnails.

Generated PNG masters remain in the Codex generated-images directory. The site uses compressed WebP copies and responsive Next.js images.

## Contact and Blog follow-up

- Contact now places the enquiry form beside its introduction, with a compact native topic selector and general-message wording for non-tank enquiries. Unconfigured contact-detail placeholders are omitted from the public layout.
- Blog now uses a clear featured-story layout, natural-color images, category filtering, keyword search, result counts and a recoverable empty state. Labels are available in English and Arabic.
- The contact API returns HTTP 503 while delivery remains unconfigured. The Contact page retains the visitor's entries and explicitly says the message was not sent, instead of claiming delivery.
- Verified desktop and 390px mobile layouts, English/Arabic category filtering, empty search/reset, general enquiry wording, and the unavailable-delivery state with local dummy data.
