# Visual Theme & Atmosphere

Build a quiet, terminal-inspired engineering portfolio: nearly black, low-glare, precise, and intentionally sparse. The experience should feel like reading a well-kept developer workstation rather than a marketing landing page. Use Shivam Singh's identity, work, writing, and project assets throughout.

# Color

- Canvas: `#0d0e0f`; elevated surface: `#111315`; hairline: `#252729`.
- Primary text: warm parchment `#d4bea0`; secondary: `#81786d`; dim: `#56514b`.
- Accent green: `#a8b66f`; mint: `#83b98b`; amber: `#d4a15f`; coral: `#b97970`.
- Contribution intensity uses five dark-to-mint steps and never falls back to GitHub's bright default palette.
- Keep contrast readable at WCAG AA for body copy. Accent colors are signals, not large fills.

# Typography

- One monospaced family across the product: `JetBrains Mono`, `Cascadia Code`, `SFMono-Regular`, Consolas, monospace.
- Base desktop size 14px with 1.65 line-height; mobile 13px with 1.65 line-height.
- Headings remain lowercase or command-like, use weight 600, and avoid oversized display typography.
- Labels use 10–12px uppercase with tracked letters; body text uses sentence case.

# Spacing & Grid

- Main shell max-width: 850px, centered.
- Global side padding: 24px desktop, 16px mobile.
- Header height: 45px with a single bottom hairline.
- Section rhythm: 72–96px desktop, 56–72px mobile.
- Hero: two-column portrait/content grid on desktop; single column on mobile.
- Project archive: two-column grid on desktop, one column below 720px.

# Layout & Composition

- Sticky top navigation with wordmark left and Projects / Blog / Gears right.
- Home opens with an identity block: processed portrait, availability stamp, compact bio, current-build line, skills, social actions.
- GitHub calendar follows the hero as a bordered, scrollable terminal panel.
- Experience is a vertical log; pull requests are repository rows with state filters.
- Projects use image-backed cards and open into an in-page modal with full context and source links.
- Blog uses a chronological, filterable command-list presentation.
- Gears is a structured two-column key/value inventory, not a shopping catalogue.
- Footer displays local IST time and a back-to-top action.

# Components

- `TerminalHeader`: sticky shell navigation and active-route state.
- `TerminalFooter`: live IST clock and back-to-top.
- `PortraitConsole`: Shivam portrait with scanline/dither treatment, availability stamp, summary and coding overlays.
- `Tag`: thin bordered technology label with semantic accent cycling.
- `TerminalSection`: `$ cat file.ext` command heading plus content.
- `ContributionCalendar`: real GitHub contribution data, five levels, horizontal mobile scroll.
- `ContributionList`: merged/open/closed filters and compact repo rows.
- `ProjectExplorer`: all/agent/applied filters, project-card grid, modal details.
- `BlogIndex`: all/engineering/notes filters and chronological links.
- `GearTable`: grouped tool inventory with label/value rows.
- `HireTerminal`: accessible email/subject/message form that opens a composed email.

# Motion & Interaction

- Use 150–240ms transitions with small opacity/translate changes; no springy or decorative movement.
- Portrait controls open a recruiter summary or coding activity overlay while the background soft-blurs.
- Project cards reveal imagery and accent borders on hover/focus; activation opens a modal and traps intent visually.
- Filters update immediately, preserve keyboard semantics, and expose active state.
- Respect `prefers-reduced-motion`; disable scanline drift and transforms.
- Horizontal calendars remain keyboard-scrollable on narrow screens.

# Voice & Brand

- Direct, technical, self-aware, and concise.
- Command labels (`$ cat experience.log`) provide structure without turning copy into fake hacker jargon.
- Claims must describe Shivam's actual projects and public work. Do not import another developer's achievements, biography, metrics, usernames, or contact details.

# Anti-patterns

- Do not copy the reference developer's portrait, copy, email, repository names, contribution count, screenshots, or brand marks.
- Do not add gradients, glassmorphism, glowing neon borders, large rounded cards, or generic dashboard statistics.
- Do not use oversized sans-serif headlines or marketing CTAs.
- Do not hide essential content behind hover-only interactions.
- Do not render fabricated GitHub activity when the API is unavailable; label loading/fallback states honestly.
- Do not let the desktop two-column compositions overflow or become compressed on 375px screens.
