# Change Log

## 2026-04-09
- Audited the repository for GitHub publication readiness and confirmed the existing Pages workflow is compatible with `https://ruvelro.github.io/codeandcraft/`.
- Documented a first-publish runbook and a repeatable release process for future GitHub Pages updates.
- Expanded `.gitignore` to cover common local credential files and generated artifacts that should never be published accidentally.
- Removed the unused legacy payload `public/data/catalog.generated.json` so the repository is leaner and less confusing before its first public push.

## 2026-04-07
- Bootstrapped persistent project documentation under `docs/` and added `AGENTS.md`.
- Defined architecture, data flow, feature docs, task tracking, and ADRs.
- Added a Vite + React + TypeScript frontend shell for the repository catalog.
- Added `scripts/build-catalog-data.mjs` to generate frontend payloads from the canonical scraper CSV.
- Implemented grouped category navigation, repository cards, search, and minimum star filtering.
- Documented and prepared the scraper to use environment-based credentials.
- Adjusted npm scripts to work from the `code&craft` Windows path where `.bin` resolution breaks on `&`.
- Verified `npm test` and `npm run build` successfully against the real dataset.
- Added URL-synced filters for query, minimum stars, and selected categories, including browser history rehydration.
- Added a dedicated curation layer to the data build pipeline, excluding five known noisy repositories and trimming oversized descriptions.
- Split the generated catalog into default and full payloads, and lazy-loaded the full payload only when the minimum stars filter drops below `10,000`.
- Refined the catalog UI toward the provided dark reference, made star ordering explicit, and documented a concrete manual measurement workflow.
- Reworked category browsing into single-view navigation with per-category icons and added incremental grid loading on scroll.
- Removed redundant visual chrome from the sidebar and header to tighten the GUI around the actual catalog interactions.
- Simplified the hero copy, removed the stats strip under the title, and replaced sidebar text tokens with inline SVG icons.
- Refined icon consistency, replaced the repository `GH` token with a GitHub SVG mark, and tightened layout spacing/proportions.
- Fine-tuned visual alignment again with denser sidebar spacing, cleaner hero proportions, and more consistent card/icon balance.
- Translated the remaining Spanish GUI copy to English for consistency with the rest of the interface.
- Fixed the minimum stars native dropdown popup colors to match the dark UI theme.
- Expanded the catalog filter system with group, keyword, owner, description, sort, top-N, and search-scope controls plus URL persistence.
- Refined the advanced filters UX with a collapsible panel and active filter chips to reduce toolbar density.
- Added smooth advanced-panel transitions, a compact description switch, and stronger responsive behavior in the filters section.
- Reduced the visual weight of the description-only switch by removing its extra boxed treatment inside the advanced filters panel.
- Vertically centered the description-only switch content so it aligns better with adjacent filter controls.
- Matched the description-only switch to the same label-row structure as neighboring fields to correct its row alignment.
- Added focus-visible treatment, semantic accessibility attributes, and a stronger narrow-width card grid fallback as part of an accessibility/responsive hardening pass.
- Measured current payload and filter costs, and explicitly deferred true virtualization until real browser/device traces justify it.
- Reviewed catalog curation quality and decided to keep the current narrow explicit denylist instead of adding broad heuristic exclusions.
- Defined the incremental data update workflow: review deltas in `scrapper/new_repositories.csv`, but keep full payload rebuilds from canonical `scrapper/repositories_catalog.csv`.
- Reorganized scraper assets under `scrapper/`, normalized scraper file names and CSV headers to English, and updated the app build pipeline to the new canonical paths.
- Added GitHub Actions workflows for catalog refresh PRs and GitHub Pages deployment, plus Pages-compatible base URL handling.
- Added a GitHub fork ribbon and a Buy Me a Coffee support link to the UI.
- Polished the promotion links by fixing the fork ribbon sizing and moving the support button into the same top-right cluster with a coffee icon.

## 2026-04-08
- Replaced the floating promotion ribbon with a persistent top bar containing the sidebar toggle, `@ruvelro` identity label, active `Repos` tab, and support/profile links.
- Added full sidebar collapse plus a mobile-only filter visibility toggle so navigation and filters consume less space on narrow screens.
- Darkened the repository card footer strip to better separate stars and source-link actions from the card body.
- Tightened the mobile defaults so both categories and filters start hidden on narrow screens, and widened repository cards while reducing the gap between the GitHub mark and repository titles.
- Normalized repository card content alignment by fixing the title block and description area heights while preserving three-line description truncation.
- Made repository cards stretch uniformly within each grid row and hardened the collapsed sidebar so it is no longer interactable while visually hidden.
- Added a `matchMedia` listener fallback for broader browser support, switched visible result counts to English numeric formatting, and turned the compact sidebar into a dismissible overlay drawer.
