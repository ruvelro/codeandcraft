import { describe, expect, it } from 'vitest';
import { filterRepos } from './catalog-selectors';
import type { RepositoryRecord } from './catalog-types';

const repos: RepositoryRecord[] = [
  {
    id: '1',
    category: 'Dev Tools',
    categoryGroup: 'Development',
    keyword: 'CLI',
    keywordText: 'cli',
    owner: 'junegunn',
    ownerText: 'junegunn',
    repo: 'fzf',
    repoText: 'fzf',
    fullName: 'junegunn/fzf',
    description: 'A command-line fuzzy finder',
    descriptionText: 'a command-line fuzzy finder',
    hasDescription: true,
    url: 'https://github.com/junegunn/fzf',
    stars: 79_000,
    searchText: 'junegunn fzf a command-line fuzzy finder',
  },
  {
    id: '2',
    category: 'AI Agents',
    categoryGroup: 'AI & ML',
    keyword: 'LLM agent',
    keywordText: 'llm agent',
    owner: 'foo',
    ownerText: 'foo',
    repo: 'agent-one',
    repoText: 'agent-one',
    fullName: 'foo/agent-one',
    description: 'Agent workflow engine',
    descriptionText: 'agent workflow engine',
    hasDescription: true,
    url: 'https://github.com/foo/agent-one',
    stars: 4_000,
    searchText: 'foo agent-one agent workflow engine',
  },
];

describe('filterRepos', () => {
  it('filters by minimum stars', () => {
    const result = filterRepos(repos, {
      query: '',
      minStars: 10_000,
      selectedCategory: null,
      selectedCategoryGroup: null,
      selectedKeyword: null,
      ownerQuery: '',
      hasDescriptionOnly: false,
      sortBy: 'stars-desc',
      topN: null,
      searchScope: 'all',
    });
    expect(result).toHaveLength(1);
    expect(result[0].repo).toBe('fzf');
  });

  it('filters by category and query', () => {
    const result = filterRepos(repos, {
      query: 'agent',
      minStars: 0,
      selectedCategory: 'AI Agents',
      selectedCategoryGroup: null,
      selectedKeyword: null,
      ownerQuery: '',
      hasDescriptionOnly: false,
      sortBy: 'stars-desc',
      topN: null,
      searchScope: 'all',
    });
    expect(result).toHaveLength(1);
    expect(result[0].repo).toBe('agent-one');
  });

  it('keeps filtered results ordered by stars descending', () => {
    const result = filterRepos(repos, {
      query: '',
      minStars: 0,
      selectedCategory: null,
      selectedCategoryGroup: null,
      selectedKeyword: null,
      ownerQuery: '',
      hasDescriptionOnly: false,
      sortBy: 'stars-desc',
      topN: null,
      searchScope: 'all',
    });
    expect(result.map((repo) => repo.repo)).toEqual(['fzf', 'agent-one']);
  });

  it('supports search scope and top-n ordering', () => {
    const result = filterRepos(repos, {
      query: 'foo',
      minStars: 0,
      selectedCategory: null,
      selectedCategoryGroup: 'AI & ML',
      selectedKeyword: 'LLM agent',
      ownerQuery: 'foo',
      hasDescriptionOnly: true,
      sortBy: 'name-asc',
      topN: 1,
      searchScope: 'owner',
    });

    expect(result).toHaveLength(1);
    expect(result[0].repo).toBe('agent-one');
  });
});
