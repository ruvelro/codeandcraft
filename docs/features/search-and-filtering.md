# Search And Filtering

## Objective
- Let users narrow the catalog instantly by repository name, category, star threshold, and additional metadata filters.

## Rules
- Default star threshold is `10,000`.
- Search runs against normalized `searchText`.
- Confirmed by code: category navigation uses a single active category.
- Confirmed by code: filter state is mirrored to the URL for query, stars, category, group, keyword, owner, description-only mode, sort, top-N, and search scope.
- Confirmed by code: invalid categories, groups, and keywords in the URL are ignored instead of breaking the catalog.

## Available Filters
- Query text
- Minimum stars
- Active category
- Category group
- Keyword
- Owner
- Only repositories with descriptions
- Sort by
- Top N limit
- Search scope: all text, name, owner, description

## Current UX
- Confirmed by code: primary filters stay in the top toolbar.
- Confirmed by code: advanced filters live in a collapsible panel to reduce visual density.
- Confirmed by code: active advanced filters are surfaced as compact chips above the results grid.
- Confirmed by code: the advanced panel opens and closes with a smooth transition instead of appearing abruptly.
- Confirmed by code: the description-only filter now uses a compact switch-style control.
- Confirmed by code: the advanced filters grid collapses from multi-column to single-column layouts on smaller breakpoints.
- Confirmed by code: the advanced filters toggle exposes `aria-expanded` and labels its controlled region.
- Confirmed by code: on mobile widths, the full filters area is hidden behind a dedicated `Show filters` / `Hide filters` control instead of always occupying vertical space.
- Confirmed by code: mobile layouts now start with the filters area hidden by default.
- Confirmed by code: responsive layout listeners use a compatibility fallback for browsers that still expose `MediaQueryList.addListener` instead of `addEventListener`.

## Key Files
- `src/features/catalog/catalog-selectors.ts`
- `src/features/catalog/catalog-url-state.ts`
- `src/features/catalog/use-catalog-filters.ts`
- `src/app/App.tsx`
- `src/components/SearchBar.tsx`
- `src/components/StarsFilter.tsx`

## Follow-Ups
- Consider adding a visible reset action once URL-synced filters make shared deep links common.
