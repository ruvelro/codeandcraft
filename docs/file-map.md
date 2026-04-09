# File Map

## Scrapper
- `scrapper/repositories_catalog.csv`: canonical source dataset for the catalog build
- `scrapper/new_repositories.csv`: delta output from scraper runs, used for review before rebuilds
- `scrapper/categories.json`: category and keyword definitions used by the scraper
- `scrapper/github_scraper.py`: GitHub scraping script for updating the dataset

## Application
- `src/app/App.tsx`: loads generated catalog data and wires the UI together
- `src/app/main.tsx`: React entrypoint
- `src/components/FilterSidebar.tsx`: grouped category navigation with a single active category and per-category icons
- `src/components/CatalogHeader.tsx`: page headline and result count
- `src/components/CategoryIcon.tsx`: shared inline SVG icon renderer for categories and GitHub mark
- `src/components/SearchBar.tsx`: repository name search input
- `src/components/StarsFilter.tsx`: minimum stars selector
- `src/components/RepoGrid.tsx`: incremental card grid with sentinel-based loading
- `src/components/RepoCard.tsx`: individual repository card

## Catalog Feature
- `src/features/catalog/catalog-types.ts`: domain types for catalog data and filters
- `src/features/catalog/catalog-constants.ts`: grouped category definitions, defaults, and category icon metadata
- `src/features/catalog/catalog-selectors.ts`: pure filtering/counting logic
- `src/features/catalog/catalog-url-state.ts`: parses filters from URL query params and serializes current filters back into the URL
- `src/features/catalog/use-catalog-filters.ts`: UI state for filtering

## Data Pipeline
- `scripts/build-catalog-data.mjs`: CSV parser and JSON generator reading from `scrapper/repositories_catalog.csv`
- `scripts/catalog-curation.mjs`: explicit curation rules for excluding known noisy repositories and trimming oversized descriptions
- `public/data/catalog.default.generated.json`: initial frontend payload for the default `>= 10,000` stars view
- `public/data/catalog.full.generated.json`: full frontend payload used when the user lowers the minimum star threshold

## Documentation
- `docs/features/*.md`: feature-level operational context
- `docs/tasks/*.md`: persistent Kanban state
