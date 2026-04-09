export type CategoryGroup = {
  label: string;
  categories: string[];
};

export type CategoryMeta = {
  icon: string;
};

export type RepositoryRecord = {
  id: string;
  category: string;
  categoryGroup: string;
  keyword: string;
  keywordText: string;
  owner: string;
  ownerText: string;
  repo: string;
  repoText: string;
  fullName: string;
  description: string;
  descriptionText: string;
  hasDescription: boolean;
  url: string;
  stars: number;
  searchText: string;
};

export type CatalogData = {
  generatedAt: string;
  totalRepos: number;
  defaultMinStars: number;
  groups: CategoryGroup[];
  keywords: string[];
  repos: RepositoryRecord[];
};

export type SortOption = 'stars-desc' | 'stars-asc' | 'name-asc' | 'name-desc';
export type SearchScope = 'all' | 'name' | 'owner' | 'description';

export type CatalogFilters = {
  query: string;
  minStars: number;
  selectedCategory: string | null;
  selectedCategoryGroup: string | null;
  selectedKeyword: string | null;
  ownerQuery: string;
  hasDescriptionOnly: boolean;
  sortBy: SortOption;
  topN: number | null;
  searchScope: SearchScope;
};

export type CatalogUrlFilters = Partial<CatalogFilters>;
