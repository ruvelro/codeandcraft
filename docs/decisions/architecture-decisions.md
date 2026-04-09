# Architecture Decisions

## ADR-001
- Date: 2026-04-07
- Context: The product needs a fast browsing experience for a local CSV dataset without backend requirements.
- Problem: Decide how to ship a modern UI with instant filtering while keeping implementation and operations simple.
- Options considered:
  - static SPA with preprocessed JSON
  - SSR app with runtime CSV parsing
  - backend API plus database
- Decision taken: build a static-first React + Vite + TypeScript application that consumes JSON generated from the CSV at build time.
- Motives:
  - fastest path to MVP
  - low operational complexity
  - no backend required for current scope
  - easy for multiple agents to reason about
- Implications:
  - the frontend payload contains the catalog data
  - data refresh requires regenerating JSON from the canonical scraper CSV
  - future scale issues may require chunking or pagination

## ADR-002
- Date: 2026-04-07
- Context: The dataset has many raw categories and the UI reference expects a grouped sidebar.
- Problem: Decide whether the UI should expose raw categories directly or a curated grouping layer.
- Options considered:
  - raw category list only
  - grouped sidebar backed by original categories
- Decision taken: keep original categories in the data model and add a grouped sidebar layer for navigation.
- Motives:
  - matches the desired UX more closely
  - preserves source fidelity while improving browseability
- Implications:
  - grouping rules must be maintained in code and docs
  - future curation work can refine mappings without changing source CSV columns

## ADR-003
- Date: 2026-04-07
- Context: The full generated catalog payload is materially larger than the default `>= 10,000` stars subset used on first load.
- Problem: Decide whether to optimize initial performance with payload splitting or card virtualization first.
- Options considered:
  - keep one payload and add virtualization only
  - split payloads and lazy-load the full dataset when needed
  - do both immediately
- Decision taken: split the catalog into default and full payloads, and lazy-load the full payload only when the active minimum stars filter drops below `10,000`.
- Motives:
  - local measurements showed initial transfer size was the biggest avoidable cost
  - the default subset is much smaller than the full dataset while still matching the default product view
  - this keeps implementation complexity lower than adding virtualization immediately
- Implications:
  - the build now produces two generated JSON files
  - app loading logic branches depending on the active star threshold
  - virtualization remains a follow-up only if browser rendering proves heavy in the default view

## ADR-004
- Date: 2026-04-07
- Context: The catalog now has split payloads, incremental grid rendering, and a larger filter system, so the open question is whether true grid virtualization is worth the extra complexity.
- Problem: Decide whether to add virtualization now or defer it until real browser evidence shows that incremental rendering is insufficient.
- Options considered:
  - add virtualization immediately
  - keep incremental rendering and defer virtualization pending browser traces
- Decision taken: keep incremental rendering and defer virtualization for now.
- Motives:
  - local proxy measurements show payload parsing and filter evaluation are cheap enough for the current dataset
  - the dominant remaining risk is browser rendering cost on lower-end devices, which has not yet been measured directly
  - adding virtualization now would add implementation and maintenance complexity without measured justification
- Implications:
  - browser/device profiling remains a tracked follow-up
  - incremental rendering stays the current mitigation for large result sets
  - future virtualization work should be driven by real traces rather than intuition

## ADR-005
- Date: 2026-04-07
- Context: The repository already has an incremental acquisition artifact (`scrapper/new_repositories.csv`) from scraping, but the frontend payloads are generated from the full canonical CSV.
- Problem: Decide whether the project should implement true incremental frontend payload generation now, or keep a simpler full rebuild workflow.
- Options considered:
  - generate frontend payload patches from `scrapper/new_repositories.csv`
  - keep incremental scraping but rebuild frontend payloads from `scrapper/repositories_catalog.csv`
- Decision taken: keep incremental scraping and review through `scrapper/new_repositories.csv`, but continue rebuilding frontend payloads from the full canonical `scrapper/repositories_catalog.csv`.
- Motives:
  - preserves a single canonical source of truth for the catalog
  - avoids consistency issues around global sorting, curation, and split payload generation
  - current build times and data volume do not justify extra incremental build complexity
- Implications:
  - `scrapper/new_repositories.csv` remains useful for review and audit, not as a runtime data source
  - `npm run build:data` remains a full rebuild step
  - true incremental frontend generation should only be revisited if rebuild cost becomes operationally painful
