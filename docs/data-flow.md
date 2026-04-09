# Data Flow

## Confirmed Flow
1. `scrapper/github_scraper.py` can fetch repositories from GitHub and append them into `scrapper/repositories_catalog.csv` and `scrapper/new_repositories.csv`.
2. `scripts/build-catalog-data.mjs` reads `scrapper/repositories_catalog.csv`.
3. The build script normalizes rows and assigns each repository to a sidebar group.
4. The build script emits a default payload and a full payload under `public/data/`.
5. `src/app/App.tsx` fetches the default payload in the browser.
6. `src/features/catalog/catalog-url-state.ts` reads any filter state already present in the URL.
7. If the user requests a minimum stars threshold below `10,000`, `App.tsx` fetches the full payload.
8. `useCatalogFilters` applies query, star threshold, active category, category group, keyword, owner, description-only mode, sort, top-N, and search scope in memory.
9. `App.tsx` mirrors the current filter state back to the URL with `history.replaceState`.
10. `RepoGrid` renders the filtered repositories in batches as the sentinel enters view.

## Filter Flow
- User types in `SearchBar` -> query state updates with `startTransition`
- `useDeferredValue` softens re-filtering pressure during typing
- `filterRepos` recalculates matching repositories
- `categoryCountsForNavigation` recomputes category navigation counts
- `buildSearchFromFilters` updates the URL query string without page reload
- `popstate` rehydrates filter state when the user navigates browser history
- `IntersectionObserver` grows the visible grid incrementally

## Pending Improvements
- Pending confirmation: chunk data or virtualize cards if payload or render cost becomes noticeable
