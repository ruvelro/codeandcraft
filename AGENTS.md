# AGENTS

## Mission
- Build and maintain `code&craft` as a fast, browsable catalog of GitHub repositories sourced from `scrapper/repositories_catalog.csv`.
- Treat this repository as the permanent source of truth for product context, architecture, task state, and operational decisions.

## Mandatory Reading Before Work
- `AGENTS.md`
- `docs/project-overview.md`
- `docs/architecture.md`
- `docs/tasks/backlog.md`
- `docs/tasks/in-progress.md`
- Relevant files under `docs/features/` for the area being changed

## Working Rules
- Do not rely on chat memory. Persist relevant context into docs.
- Every feature, bug, refactor, and debt item must appear in `docs/tasks/`.
- Before starting work:
  - confirm the task exists in `backlog.md` or `in-progress.md`
  - if missing, add it
  - move it to `in-progress.md`
  - note scope, dependencies, and touched files
- After finishing work:
  - move the task to `done.md`
  - update `docs/history/change-log.md`
  - update any impacted architecture, flow, file map, or feature docs
- Mark documentation statements as one of:
  - Confirmed by code
  - Reasonable inference
  - Pending confirmation

## Current Product Direction
- MVP is a static-first web app that reads preprocessed catalog data derived from `scrapper/repositories_catalog.csv`.
- Default filter is repositories with more than `10,000` stars.
- Primary interactions are category navigation, name search, and fast browsing.

## Multi-Agent Safety
- Keep changes scoped to the active task.
- Update `docs/features/*.md` for feature-local context so another agent can continue without re-reading the whole repo.
- Record conflicts or dependencies in the task files.

## Operational Notes
- Scraper-managed source files live under `scrapper/`.
- Generated frontend data lives under `public/data/`.
- Scraper credentials must come from environment variables, never hardcoded secrets.
