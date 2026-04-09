import { startTransition, useCallback, useDeferredValue, useMemo, useState } from 'react';
import {
  CATEGORY_GROUP_LOOKUP,
  DEFAULT_MIN_STARS,
  DEFAULT_SEARCH_SCOPE,
  DEFAULT_SORT_BY,
  DEFAULT_TOP_N,
} from './catalog-constants';
import { categoryCountsForNavigation, filterRepos } from './catalog-selectors';
import type { CatalogData, CatalogUrlFilters } from './catalog-types';

export function useCatalogFilters(data: CatalogData | null) {
  const [query, setQuery] = useState('');
  const [minStars, setMinStars] = useState(DEFAULT_MIN_STARS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [ownerQuery, setOwnerQuery] = useState('');
  const [hasDescriptionOnly, setHasDescriptionOnly] = useState(false);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const [topN, setTopN] = useState<number | null>(DEFAULT_TOP_N);
  const [searchScope, setSearchScope] = useState(DEFAULT_SEARCH_SCOPE);
  const deferredQuery = useDeferredValue(query);

  const repos = data?.repos ?? [];
  const keywords = data?.keywords ?? [];

  const filteredRepos = useMemo(
    () =>
      filterRepos(repos, {
        query: deferredQuery,
        minStars,
        selectedCategory,
        selectedCategoryGroup,
        selectedKeyword,
        ownerQuery,
        hasDescriptionOnly,
        sortBy,
        topN,
        searchScope,
      }),
    [deferredQuery, hasDescriptionOnly, minStars, ownerQuery, repos, searchScope, selectedCategory, selectedCategoryGroup, selectedKeyword, sortBy, topN],
  );

  const categoryCounts = useMemo(
    () =>
      categoryCountsForNavigation(repos, {
        query: deferredQuery,
        minStars,
        selectedCategoryGroup,
        selectedKeyword,
        ownerQuery,
        hasDescriptionOnly,
        searchScope,
      }),
    [deferredQuery, hasDescriptionOnly, minStars, ownerQuery, repos, searchScope, selectedCategoryGroup, selectedKeyword],
  );

  const updateQuery = useCallback((value: string) => {
    startTransition(() => {
      setQuery(value);
    });
  }, []);

  const selectCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const selectCategoryGroup = useCallback((group: string | null) => {
    setSelectedCategoryGroup(group);
    setSelectedCategory((current) => {
      if (!current || !group) {
        return current;
      }

      return CATEGORY_GROUP_LOOKUP.get(current) === group ? current : null;
    });
  }, []);

  const updateOwnerQuery = useCallback((value: string) => {
    startTransition(() => {
      setOwnerQuery(value);
    });
  }, []);

  const resetFilters = useCallback(() => {
    setQuery('');
    setMinStars(DEFAULT_MIN_STARS);
    setSelectedCategory(null);
    setSelectedCategoryGroup(null);
    setSelectedKeyword(null);
    setOwnerQuery('');
    setHasDescriptionOnly(false);
    setSortBy(DEFAULT_SORT_BY);
    setTopN(DEFAULT_TOP_N);
    setSearchScope(DEFAULT_SEARCH_SCOPE);
  }, []);

  const replaceFilters = useCallback((filters: CatalogUrlFilters) => {
    startTransition(() => {
      const nextGroup = filters.selectedCategoryGroup ?? null;
      const nextCategory = filters.selectedCategory ?? null;

      setQuery(filters.query ?? '');
      setMinStars(filters.minStars ?? DEFAULT_MIN_STARS);
      setSelectedCategoryGroup(nextGroup);
      setSelectedCategory(nextCategory && nextGroup && CATEGORY_GROUP_LOOKUP.get(nextCategory) !== nextGroup ? null : nextCategory);
      setSelectedKeyword(filters.selectedKeyword ?? null);
      setOwnerQuery(filters.ownerQuery ?? '');
      setHasDescriptionOnly(filters.hasDescriptionOnly ?? false);
      setSortBy(filters.sortBy ?? DEFAULT_SORT_BY);
      setTopN(filters.topN ?? DEFAULT_TOP_N);
      setSearchScope(filters.searchScope ?? DEFAULT_SEARCH_SCOPE);
    });
  }, []);

  return {
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
  };
}
