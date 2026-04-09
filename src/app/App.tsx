import { useEffect, useState } from 'react';
import CatalogHeader from '../components/CatalogHeader';
import FilterSidebar from '../components/FilterSidebar';
import RepoGrid from '../components/RepoGrid';
import SearchBar from '../components/SearchBar';
import StarsFilter from '../components/StarsFilter';
import { SEARCH_SCOPE_OPTIONS, SORT_OPTIONS, TOP_N_OPTIONS } from '../features/catalog/catalog-constants';
import { useCatalogFilters } from '../features/catalog/use-catalog-filters';
import { buildSearchFromFilters, readFiltersFromSearch } from '../features/catalog/catalog-url-state';
import type { CatalogData } from '../features/catalog/catalog-types';

const DEFAULT_CATALOG_URL = `${import.meta.env.BASE_URL}data/catalog.default.generated.json`;
const FULL_CATALOG_URL = `${import.meta.env.BASE_URL}data/catalog.full.generated.json`;
const PROFILE_URL = 'https://github.com/ruvelro';
const SUPPORT_URL = 'https://buymeacoffee.com/ruvelro';

function isMediaQueryMatch(query: string) {
  return typeof window !== 'undefined' && window.matchMedia(query).matches;
}

function subscribeToMediaQuery(query: MediaQueryList, listener: () => void) {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

function SidebarToggleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M9 4.5v15" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h11v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M15 11h1.5a2.5 2.5 0 1 1 0 5H15" />
      <path d="M7 4v3" />
      <path d="M10 4v3" />
      <path d="M13 4v3" />
      <path d="M5 20h12" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .08 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.43.2 2.48.1 2.74.64.73 1.03 1.65 1.03 2.78 0 3.97-2.34 4.84-4.58 5.09.36.32.68.96.68 1.94 0 1.4-.01 2.52-.01 2.86 0 .28.18.61.69.5A10.25 10.25 0 0 0 22 12.24C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

export default function App() {
  const [defaultData, setDefaultData] = useState<CatalogData | null>(null);
  const [fullData, setFullData] = useState<CatalogData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUrlStateReady, setIsUrlStateReady] = useState(false);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(() => isMediaQueryMatch('(max-width: 960px)'));
  const [isMobileLayout, setIsMobileLayout] = useState(() => isMediaQueryMatch('(max-width: 720px)'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !isMediaQueryMatch('(max-width: 960px)'));
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(() => !isMediaQueryMatch('(max-width: 720px)'));

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 960px)');
    const mobileQuery = window.matchMedia('(max-width: 720px)');

    const syncLayout = () => {
      const nextIsCompactLayout = compactQuery.matches;
      const nextIsMobileLayout = mobileQuery.matches;
      setIsCompactLayout(nextIsCompactLayout);
      setIsMobileLayout(nextIsMobileLayout);

      setIsSidebarOpen(!nextIsCompactLayout);
      setIsFiltersPanelOpen(!nextIsMobileLayout);
    };

    syncLayout();
    const unsubscribeCompact = subscribeToMediaQuery(compactQuery, syncLayout);
    const unsubscribeMobile = subscribeToMediaQuery(mobileQuery, syncLayout);

    return () => {
      unsubscribeCompact();
      unsubscribeMobile();
    };
  }, []);

  useEffect(() => {
    if (!isCompactLayout || !isSidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCompactLayout, isSidebarOpen]);

  useEffect(() => {
    if (!isCompactLayout) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isSidebarOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCompactLayout, isSidebarOpen]);

  useEffect(() => {
    let active = true;

    fetch(DEFAULT_CATALOG_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Catalog request failed with status ${response.status}`);
        }

        return response.json() as Promise<CatalogData>;
      })
      .then((catalog) => {
        if (active) {
          setDefaultData(catalog);
        }
      })
      .catch((requestError: Error) => {
        if (active) {
          setError(requestError.message);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const {
    query,
    minStars,
    selectedCategory,
    selectedCategoryGroup,
    selectedKeyword,
    ownerQuery,
    hasDescriptionOnly,
    sortBy,
    topN,
    searchScope,
    keywords,
    filteredRepos,
    categoryCounts,
    setMinStars,
    setSelectedKeyword,
    setHasDescriptionOnly,
    setSortBy,
    setTopN,
    setSearchScope,
    updateQuery,
    updateOwnerQuery,
    selectCategory,
    selectCategoryGroup,
    replaceFilters,
    resetFilters,
  } = useCatalogFilters(fullData ?? defaultData);

  const activeData = fullData ?? defaultData;
  const shouldLoadFullData = isUrlStateReady && minStars < (defaultData?.defaultMinStars ?? 10_000);

  useEffect(() => {
    if (!shouldLoadFullData || fullData) {
      return;
    }

    let active = true;

    fetch(FULL_CATALOG_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Full catalog request failed with status ${response.status}`);
        }

        return response.json() as Promise<CatalogData>;
      })
      .then((catalog) => {
        if (active) {
          setFullData(catalog);
        }
      })
      .catch((requestError: Error) => {
        if (active) {
          setError(requestError.message);
        }
      });

    return () => {
      active = false;
    };
  }, [fullData, shouldLoadFullData]);

  useEffect(() => {
    if (!defaultData) {
      return;
    }

    const categories = defaultData.groups.flatMap((group) => group.categories);
    const groups = defaultData.groups.map((group) => group.label);
    const availableKeywords = (fullData ?? defaultData).keywords;
    const applyUrlFilters = () => {
      replaceFilters(readFiltersFromSearch(window.location.search, categories, groups, availableKeywords));
      setIsUrlStateReady(true);
    };

    applyUrlFilters();
    window.addEventListener('popstate', applyUrlFilters);

    return () => {
      window.removeEventListener('popstate', applyUrlFilters);
    };
  }, [defaultData, fullData, replaceFilters]);

  useEffect(() => {
    if (!defaultData || !isUrlStateReady) {
      return;
    }

    const nextSearch = buildSearchFromFilters({
      query,
      minStars,
      selectedCategory,
      selectedCategoryGroup,
      selectedKeyword,
      ownerQuery,
      hasDescriptionOnly,
      sortBy,
      topN,
      searchScope,
    });
    if (nextSearch === window.location.search) {
      return;
    }

    const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
    window.history.replaceState(null, '', nextUrl);
  }, [defaultData, hasDescriptionOnly, isUrlStateReady, minStars, ownerQuery, query, searchScope, selectedCategory, selectedCategoryGroup, selectedKeyword, sortBy, topN]);

  if (error) {
    return (
      <main className="app-shell centered-message">
        <div>
          <h1>Failed to load catalog</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!defaultData || !isUrlStateReady || (shouldLoadFullData && !fullData)) {
    return (
      <main className="app-shell centered-message">
        <div>
          <h1>Loading catalog</h1>
          <p>
            {shouldLoadFullData
              ? 'Loading the full catalog so lower star thresholds can be browsed.'
              : 'Preparing repositories and category navigation.'}
          </p>
        </div>
      </main>
    );
  }

  const activeFilterChips = [
    selectedCategory ? `Category: ${selectedCategory}` : null,
    selectedCategoryGroup ? `Group: ${selectedCategoryGroup}` : null,
    selectedKeyword ? `Keyword: ${selectedKeyword}` : null,
    ownerQuery.trim() ? `Owner: ${ownerQuery.trim()}` : null,
    hasDescriptionOnly ? 'With description' : null,
    sortBy !== 'stars-desc' ? `Sort: ${SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? sortBy}` : null,
    topN !== null ? `Limit: ${topN}` : null,
    searchScope !== 'all' ? `Scope: ${SEARCH_SCOPE_OPTIONS.find((option) => option.value === searchScope)?.label ?? searchScope}` : null,
  ].filter(Boolean) as string[];

  const shouldShowFiltersPanel = !isMobileLayout || isFiltersPanelOpen;
  const handleSelectCategory = (category: string | null) => {
    selectCategory(category);

    if (isCompactLayout) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-main">
          <div className="top-bar-left">
            <button
              type="button"
              className="top-bar-icon-button"
              onClick={() => setIsSidebarOpen((current) => !current)}
              aria-label={isSidebarOpen ? 'Hide categories menu' : 'Show categories menu'}
              aria-expanded={isSidebarOpen}
              aria-controls="catalog-sidebar"
            >
              <SidebarToggleIcon />
            </button>
            <span className="top-bar-handle">
              <span className="top-bar-handle-mark">@</span>
              <span className="top-bar-handle-name">ruvelro</span>
            </span>
            <a className="top-bar-tab is-active" href="#repos-section" aria-current="page">
              Repos
            </a>
          </div>

          <div className="top-bar-actions">
            <a className="top-bar-link" href={SUPPORT_URL} target="_blank" rel="noreferrer" aria-label="Buy me a coffee">
              <span className="top-bar-link-icon">
                <CoffeeIcon />
              </span>
              <span>Buy me a coffee</span>
            </a>
            <a className="top-bar-link" href={PROFILE_URL} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
              <span className="top-bar-link-icon github">
                <GitHubIcon />
              </span>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {isCompactLayout && isSidebarOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close categories menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <main className={`app-shell${isSidebarOpen ? '' : ' is-sidebar-collapsed'}${isCompactLayout ? ' is-compact-layout' : ''}`}>
        <FilterSidebar
          isOpen={isSidebarOpen}
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          onSelectCategory={handleSelectCategory}
        />

        <section id="repos-section" className="content-panel">
          <CatalogHeader
            visibleCount={filteredRepos.length}
            totalCount={activeData?.totalRepos ?? 0}
            selectedCategory={selectedCategory}
            minStars={minStars}
            usingFullCatalog={Boolean(fullData)}
          />

          <div className="toolbar-mobile-actions">
            <button
              type="button"
              className={`toolbar-secondary mobile-filters-toggle${shouldShowFiltersPanel ? ' is-active' : ''}`}
              onClick={() => setIsFiltersPanelOpen((current) => !current)}
              aria-expanded={shouldShowFiltersPanel}
              aria-controls="catalog-filters-panel"
            >
              {shouldShowFiltersPanel ? 'Hide filters' : 'Show filters'}
            </button>
          </div>

          <div id="catalog-filters-panel" className={`filters-shell${shouldShowFiltersPanel ? ' is-open' : ''}`}>
            <div className="toolbar">
              <SearchBar value={query} onChange={updateQuery} />
              <StarsFilter value={minStars} onChange={setMinStars} />
              <button
                type="button"
                className={`toolbar-secondary${advancedFiltersOpen ? ' is-active' : ''}`}
                onClick={() => setAdvancedFiltersOpen((current) => !current)}
                aria-expanded={advancedFiltersOpen}
                aria-controls="advanced-filters-panel"
              >
                {advancedFiltersOpen ? 'Hide advanced filters' : 'Show advanced filters'}
              </button>
              <button type="button" className="toolbar-reset" onClick={resetFilters}>
                Reset filters
              </button>
            </div>

            <div
              id="advanced-filters-panel"
              className={`filters-panel${advancedFiltersOpen ? ' is-open' : ''}`}
              aria-hidden={!advancedFiltersOpen}
              role="region"
              aria-label="Advanced filters"
            >
              <div className="filters-grid">
                <label className="filter-control">
                  <span className="search-label">Category group</span>
                  <select value={selectedCategoryGroup ?? 'all'} onChange={(event) => selectCategoryGroup(event.target.value === 'all' ? null : event.target.value)}>
                    <option value="all">All groups</option>
                    {activeData?.groups.map((group) => (
                      <option key={group.label} value={group.label}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-control">
                  <span className="search-label">Keyword</span>
                  <select value={selectedKeyword ?? 'all'} onChange={(event) => setSelectedKeyword(event.target.value === 'all' ? null : event.target.value)}>
                    <option value="all">All keywords</option>
                    {keywords.map((keyword) => (
                      <option key={keyword} value={keyword}>
                        {keyword}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-control filter-control-input">
                  <span className="search-label">Owner</span>
                  <input value={ownerQuery} onChange={(event) => updateOwnerQuery(event.target.value)} placeholder="vercel, sindresorhus..." />
                </label>

                <label className="filter-control">
                  <span className="search-label">Search scope</span>
                  <select value={searchScope} onChange={(event) => setSearchScope(event.target.value as typeof searchScope)}>
                    {SEARCH_SCOPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-control">
                  <span className="search-label">Sort by</span>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)}>
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-control">
                  <span className="search-label">Result limit</span>
                  <select value={topN === null ? 'all' : String(topN)} onChange={(event) => setTopN(event.target.value === 'all' ? null : Number(event.target.value))}>
                    {TOP_N_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-switch-field">
                  <span className="search-label">Description</span>
                  <span className={`filter-switch${hasDescriptionOnly ? ' is-active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={hasDescriptionOnly}
                      onChange={(event) => setHasDescriptionOnly(event.target.checked)}
                    />
                    <span className="filter-switch-track">
                      <span className="filter-switch-thumb" />
                    </span>
                    <span className="filter-switch-label">Only repositories with descriptions</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {activeFilterChips.length > 0 ? (
            <div className="filter-chips" aria-label="Active filters">
              {activeFilterChips.map((chip) => (
                <span key={chip} className="filter-chip">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          <RepoGrid repos={filteredRepos} />
        </section>
      </main>
    </>
  );
}
