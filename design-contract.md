# Design contract

## Target artifact

A production Next.js portfolio for Shivam Singh covering the home, projects, blog, individual writing, and gears/stack routes, with responsive states and keyboard-accessible overlays.

## Audience

Engineering recruiters, open-source maintainers, collaborators, and technical peers evaluating Shivam's AI systems work.

## Evidence used

- The live reference at `https://www.heyamit.dev/`, observed on 1280×720 and 375×812 viewports on 2026-09-30.
- The reference `/projects`, `/blog`, and `/gears` routes, including project filters, a project-detail dialog, blog filtering, activity overlay, contribution calendar, experience log, PR state tabs, and key/value gear sections.
- The current portfolio content, assets, GitHub API route, project dataset, experience copy, résumé, social destinations, and theme/sound infrastructure in this repository.

The exact font source and implementation details of the reference are inferences from computed browser styles and observed behavior; they are not brand facts.

## Reference: heyamit.dev

### Keep

- Compact centered shell, nearly black canvas, warm mono text, thin rules, and terminal-command section labels.
- Route hierarchy: home, projects, blog, gears.
- Hero hierarchy, contribution calendar, vertical experience log, PR state filters, project category filters, project dialog, chronological blog list, and footer clock.
- Reserved motion, focus-visible controls, and responsive one-column mobile composition.

### Change

- Replace all identity, portrait, biography, skills, experience, project, repository, social, résumé, and contact information with Shivam's.
- Use the repository's real project images and GitHub endpoint.
- Make project imagery more visible at rest while preserving the reference's restrained tonal treatment.
- Keep accessible labels, honest loading states, and reduced-motion support explicit.

### Do not copy

- The reference's portrait treatment as a literal asset, written copy, email address, repository list, project names, contribution numbers, setup screenshots, or third-party product links.
- Any private implementation code, unique branding asset, or unverified claim about the reference creator.

## Binding implementation rules

- Follow the tokens and nine sections in `DESIGN.md`.
- All main routes share one header/footer shell and max-width.
- All interactive cards are buttons or links with visible focus styles.
- Project detail opens without a page reload and can be dismissed by close control, Escape, or backdrop.
- Mobile at 375px must avoid horizontal page overflow; only the contribution calendar may scroll horizontally.
- The project, blog, and PR filters must visibly update their active state and content.
- The home page must use Shivam's live contribution data path, not a static recreation of the reference graph.

## Failure conditions

- Imported reference content or assets remain in the build.
- The layout looks like a generic SaaS/dashboard or conventional rounded-card portfolio.
- Project modal, filters, email form, contribution calendar, or route navigation fail with keyboard or touch input.
- The mobile hero collapses into unusable columns or has clipped text.
- Console or build errors remain.
