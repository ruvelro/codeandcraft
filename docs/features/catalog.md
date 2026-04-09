# Catalog Feature

## Objective
- Provide a fast browsing experience over the curated repository dataset.

## Scope
- Header, toolbar, sidebar, and repository grid
- Split local dataset loading with lazy fetch for the full catalog
- Interactive filtering in the browser
- Visual language aligned toward the provided dark reference layout
- Incremental repository rendering while scrolling
- Advanced metadata filtering and sorting
- Repository promotion links for GitHub and project support

## Current Header Behavior
- Confirmed by code: the hero now shows only the main title and a short subtitle.
- Confirmed by code: the stats strip under the title has been removed.
- Confirmed by code: hero and toolbar spacing has been tightened to keep the first fold more compact.
- Confirmed by code: the visible UI copy is now aligned to English to match the dataset and overall interface language.
- Confirmed by code: the floating promotion ribbon has been replaced by a persistent top bar with a sidebar toggle, `@ruvelro` handle, active `Repos` tab, and external actions for support and GitHub profile.
- Confirmed by code: repository cards now use a darker footer treatment so the stars row and source link read as a distinct action strip.
- Confirmed by code: repository cards now use a wider grid target and tighter top spacing between the GitHub mark and repository title.
- Confirmed by code: repository cards now reserve fixed vertical space for the title block and the three-line description block so card content aligns consistently across the grid.
- Confirmed by code: repository cards now stretch to a uniform height inside the grid rows.
- Confirmed by code: visible result counters now use the same English numeric formatting as the rest of the interface copy.

## Accessibility Notes
- Confirmed by code: interactive controls now expose visible `focus-visible` outlines.

## Key Files
- `src/app/App.tsx`
- `src/components/CatalogHeader.tsx`
- `src/components/FilterSidebar.tsx`
- `src/components/RepoGrid.tsx`
- `src/components/RepoCard.tsx`

## Dependencies
- `public/data/catalog.default.generated.json`
- `public/data/catalog.full.generated.json`
- `src/features/catalog/*`

## Risks
- Large result rendering may require virtualization later.
