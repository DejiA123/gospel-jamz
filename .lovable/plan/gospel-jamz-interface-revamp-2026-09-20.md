# Gospel Jamz interface revamp

## Goal
Rebuild the public event website in the visual language of the supplied reference: near-black canvas, oversized white/cyan typography, amber accents, thin borders, square editorial panels, and continuously moving schedule strips.

## Changes
- Replace the current cinematic homepage composition with a structured festival layout: bold event masthead, high-impact image-led event introduction, schedule ticker, programme grid, mission/values, statistics, registration, and footer.
- Preserve all existing event wording, dates, registration links, flyer, worship imagery, and working registration flow.
- Keep **The Team** section intact, including all five “Coming soon” entries and its continuous left movement.
- Restyle the navigation, standalone registration page, organiser sign-in, registration form, and organiser desk so the experience remains visually consistent.
- Keep mobile layouts readable and usable while retaining the same strong visual identity.

## Technical details
- Consolidate the new cyan/amber/ink palette and typography roles into semantic tokens in the global stylesheet.
- Reuse existing local assets only; the supplied screenshots remain design references and will not be embedded.
- Preserve current server functions, email delivery, registration storage, admin access, and Excel export logic.
- Validate the homepage and registration page at desktop and mobile sizes, including the Team marquee and key interactions.
