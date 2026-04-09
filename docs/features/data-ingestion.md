# Data Ingestion Feature

## Objective
- Convert the canonical scraper CSV dataset into frontend-optimized JSON files.

## Scope
- CSV parsing
- description cleanup
- explicit curation of known noisy rows
- accent-insensitive search text generation
- category group assignment
- JSON emission into `public/data/`
- operational support for incremental dataset review through `scrapper/new_repositories.csv`

## Key Files
- `scripts/build-catalog-data.mjs`
- `scripts/catalog-curation.mjs`
- `scrapper/repositories_catalog.csv`
- `scrapper/new_repositories.csv`
- `public/data/catalog.default.generated.json`
- `public/data/catalog.full.generated.json`

## Current Curation Rules
- Confirmed by code: rows with repository name `.github` are excluded from the generated catalog because they are metadata repositories, not browsable products.
- Confirmed by code: a small explicit denylist removes known noisy outliers:
  - `cirosantilli/china-dictatorship`
  - `Dujltqzv/Some-Many-Books`
  - `lTbgykio/Books-Free-Books`
- Confirmed by code: descriptions longer than `280` characters are truncated during generation to avoid oversized cards and polluted search text.

## Review Outcome
- Confirmed by review: broader patterns such as notebooks, books, tutorials, and educational resources appear frequently in legitimate repositories across this catalog and should not be filtered by heuristic rules alone.
- Confirmed by review: current curation remains intentionally narrow to avoid false positives.

## Update Workflow
- Confirmed by code: `scrapper/new_repositories.csv` acts as a delta log of newly discovered repositories.
- Confirmed by decision: frontend payloads are still regenerated from the full canonical `scrapper/repositories_catalog.csv`, not patched incrementally from `scrapper/new_repositories.csv`.

## Open Questions
- Pending confirmation: should future builds exclude very low-star repositories from the generated payload?
- Pending confirmation: should future category curation stay fully explicit, or can any safe category-specific rules be defined without hiding legitimate repositories?
