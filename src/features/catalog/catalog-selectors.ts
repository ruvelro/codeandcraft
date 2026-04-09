import type { CatalogFilters, RepositoryRecord } from './catalog-types';

function matchesQuery(repo: RepositoryRecord, query: string, scope: CatalogFilters['searchScope']): boolean {
  if (query.length === 0) {
    return true;
  }

  switch (scope) {
    case 'name':
      return repo.repoText.includes(query);
    case 'owner':
      return repo.ownerText.includes(query);
    case 'description':
      return repo.descriptionText.includes(query);
    default:
      return repo.searchText.includes(query);
  }
}

function applySort(repos: RepositoryRecord[], sortBy: CatalogFilters['sortBy']): RepositoryRecord[] {
  return [...repos].sort((left, right) => {
    switch (sortBy) {
      case 'stars-asc':
        return left.stars - right.stars || left.repo.localeCompare(right.repo);
      case 'name-asc':
        return left.repo.localeCompare(right.repo) || right.stars - left.stars;
      case 'name-desc':
        return right.repo.localeCompare(left.repo) || right.stars - left.stars;
      default:
        return right.stars - left.stars || left.repo.localeCompare(right.repo);
    }
  });
}

export function filterRepos(repos: RepositoryRecord[], filters: CatalogFilters): RepositoryRecord[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const baseRepos = repos.filter((repo) => {
    if (repo.stars < filters.minStars) {
      return false;
    }

    if (filters.selectedCategoryGroup && repo.categoryGroup !== filters.selectedCategoryGroup) {
      return false;
    }

    if (filters.selectedCategory && repo.category !== filters.selectedCategory) {
      return false;
    }

    if (filters.selectedKeyword && repo.keyword !== filters.selectedKeyword) {
      return false;
    }

    if (filters.ownerQuery.trim().length > 0 && !repo.ownerText.includes(filters.ownerQuery.trim().toLowerCase())) {
      return false;
    }

    if (filters.hasDescriptionOnly && !repo.hasDescription) {
      return false;
    }

    if (!matchesQuery(repo, normalizedQuery, filters.searchScope)) {
      return false;
    }

    return true;
  });

  const sortedRepos = applySort(baseRepos, filters.sortBy);
  return filters.topN ? sortedRepos.slice(0, filters.topN) : sortedRepos;
}

export function countByCategory(repos: RepositoryRecord[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    counts.set(repo.category, (counts.get(repo.category) ?? 0) + 1);
  }
  return counts;
}

export function categoryCountsForNavigation(
  repos: RepositoryRecord[],
  filters: Pick<
    CatalogFilters,
    'query' | 'minStars' | 'selectedCategoryGroup' | 'selectedKeyword' | 'ownerQuery' | 'hasDescriptionOnly' | 'searchScope'
  >,
): Map<string, number> {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return countByCategory(
    repos.filter((repo) => {
      if (repo.stars < filters.minStars) {
        return false;
      }

      if (filters.selectedCategoryGroup && repo.categoryGroup !== filters.selectedCategoryGroup) {
        return false;
      }

      if (filters.selectedKeyword && repo.keyword !== filters.selectedKeyword) {
        return false;
      }

      if (filters.ownerQuery.trim().length > 0 && !repo.ownerText.includes(filters.ownerQuery.trim().toLowerCase())) {
        return false;
      }

      if (filters.hasDescriptionOnly && !repo.hasDescription) {
        return false;
      }

      if (!matchesQuery(repo, normalizedQuery, filters.searchScope)) {
        return false;
      }

      return true;
    }),
  );
}
