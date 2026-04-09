import { DEFAULT_MIN_STARS, DEFAULT_SEARCH_SCOPE, DEFAULT_SORT_BY, DEFAULT_TOP_N } from './catalog-constants';
import type { CatalogFilters, CatalogUrlFilters } from './catalog-types';

const QUERY_PARAM = 'q';
const MIN_STARS_PARAM = 'minStars';
const CATEGORY_PARAM = 'category';
const LEGACY_CATEGORIES_PARAM = 'categories';
const CATEGORY_GROUP_PARAM = 'group';
const KEYWORD_PARAM = 'keyword';
const OWNER_PARAM = 'owner';
const HAS_DESCRIPTION_PARAM = 'hasDescription';
const SORT_PARAM = 'sort';
const TOP_PARAM = 'top';
const SEARCH_SCOPE_PARAM = 'scope';

const VALID_SORT_OPTIONS = new Set(['stars-desc', 'stars-asc', 'name-asc', 'name-desc']);
const VALID_SEARCH_SCOPES = new Set(['all', 'name', 'owner', 'description']);

export function readFiltersFromSearch(search: string, validCategories: string[], validGroups: string[], validKeywords: string[]): CatalogUrlFilters {
  const params = new URLSearchParams(search);
  const validCategorySet = new Set(validCategories);
  const validGroupSet = new Set(validGroups);
  const validKeywordSet = new Set(validKeywords);
  const query = params.get(QUERY_PARAM)?.trim() ?? '';
  const minStarsParam = params.get(MIN_STARS_PARAM);
  const categoryParam = params.get(CATEGORY_PARAM)?.trim() ?? '';
  const legacyCategoriesParam = params.get(LEGACY_CATEGORIES_PARAM) ?? '';
  const categoryGroup = params.get(CATEGORY_GROUP_PARAM)?.trim() ?? '';
  const keyword = params.get(KEYWORD_PARAM)?.trim() ?? '';
  const ownerQuery = params.get(OWNER_PARAM)?.trim() ?? '';
  const hasDescriptionOnly = params.get(HAS_DESCRIPTION_PARAM) === '1';
  const sortBy = params.get(SORT_PARAM) ?? DEFAULT_SORT_BY;
  const searchScope = params.get(SEARCH_SCOPE_PARAM) ?? DEFAULT_SEARCH_SCOPE;
  const topParam = params.get(TOP_PARAM);
  const selectedCategory = [categoryParam, ...legacyCategoriesParam.split(',').map((category) => category.trim())].find(
    (category) => category.length > 0 && validCategorySet.has(category),
  ) ?? null;

  const parsedMinStars = minStarsParam ? Number(minStarsParam) : undefined;
  const minStars = Number.isFinite(parsedMinStars) && parsedMinStars !== undefined && parsedMinStars >= 0
    ? parsedMinStars
    : undefined;

  return {
    query,
    minStars,
    selectedCategory,
    selectedCategoryGroup: categoryGroup && validGroupSet.has(categoryGroup) ? categoryGroup : null,
    selectedKeyword: keyword && validKeywordSet.has(keyword) ? keyword : null,
    ownerQuery,
    hasDescriptionOnly,
    sortBy: VALID_SORT_OPTIONS.has(sortBy) ? (sortBy as CatalogFilters['sortBy']) : DEFAULT_SORT_BY,
    topN: topParam && Number.isFinite(Number(topParam)) && Number(topParam) > 0 ? Number(topParam) : DEFAULT_TOP_N,
    searchScope: VALID_SEARCH_SCOPES.has(searchScope) ? (searchScope as CatalogFilters['searchScope']) : DEFAULT_SEARCH_SCOPE,
  };
}

export function buildSearchFromFilters(filters: CatalogFilters): string {
  const params = new URLSearchParams();

  if (filters.query.trim().length > 0) {
    params.set(QUERY_PARAM, filters.query.trim());
  }

  if (filters.minStars !== DEFAULT_MIN_STARS) {
    params.set(MIN_STARS_PARAM, String(filters.minStars));
  }

  if (filters.selectedCategory) {
    params.set(CATEGORY_PARAM, filters.selectedCategory);
  }

  if (filters.selectedCategoryGroup) {
    params.set(CATEGORY_GROUP_PARAM, filters.selectedCategoryGroup);
  }

  if (filters.selectedKeyword) {
    params.set(KEYWORD_PARAM, filters.selectedKeyword);
  }

  if (filters.ownerQuery.trim().length > 0) {
    params.set(OWNER_PARAM, filters.ownerQuery.trim());
  }

  if (filters.hasDescriptionOnly) {
    params.set(HAS_DESCRIPTION_PARAM, '1');
  }

  if (filters.sortBy !== DEFAULT_SORT_BY) {
    params.set(SORT_PARAM, filters.sortBy);
  }

  if (filters.topN !== DEFAULT_TOP_N && filters.topN !== null) {
    params.set(TOP_PARAM, String(filters.topN));
  }

  if (filters.searchScope !== DEFAULT_SEARCH_SCOPE) {
    params.set(SEARCH_SCOPE_PARAM, filters.searchScope);
  }

  const search = params.toString();
  return search.length > 0 ? `?${search}` : '';
}
