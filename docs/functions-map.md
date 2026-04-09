# Functions Map

## Data Pipeline
- `normalizeText` in `scripts/build-catalog-data.mjs`
  - Removes accents and lowercases search data.
- `cleanupDescription` in `scripts/catalog-curation.mjs`
  - Normalizes whitespace, fills empty descriptions, and truncates oversized descriptions to keep cards and search text readable.
- `shouldExcludeCatalogRow` in `scripts/catalog-curation.mjs`
  - Excludes a small explicit set of known noisy repositories and metadata repositories such as `.github`.

## Catalog Logic
- `filterRepos` in `src/features/catalog/catalog-selectors.ts`
  - Applies category, group, keyword, owner, description, query, stars, sort, and top-N rules.
- `countByCategory` in `src/features/catalog/catalog-selectors.ts`
  - Produces sidebar counts for the current filtered result set.
- `categoryCountsForNavigation` in `src/features/catalog/catalog-selectors.ts`
  - Produces sidebar counts without the active category constraint so navigation remains cross-category.
- `readFiltersFromSearch` in `src/features/catalog/catalog-url-state.ts`
  - Reads query, stars, category, group, keyword, owner, description mode, sort, top-N, and search scope from the URL, while still accepting legacy `categories` links.
- `buildSearchFromFilters` in `src/features/catalog/catalog-url-state.ts`
  - Writes a minimal query string that omits default filter values.
- `useCatalogFilters` in `src/features/catalog/use-catalog-filters.ts`
  - Stores the full filter state, available keywords, and derived results.

## UI Helpers
- `formatStars` in `src/lib/format-stars.ts`
  - Formats stars using `es-ES` locale.
