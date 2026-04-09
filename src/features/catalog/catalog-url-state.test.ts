import { describe, expect, it } from 'vitest';
import { buildSearchFromFilters, readFiltersFromSearch } from './catalog-url-state';

describe('catalog URL state', () => {
  it('reads valid filters from the query string', () => {
    const filters = readFiltersFromSearch(
      '?q=react&minStars=5000&category=Web%20%26%20UI&group=Web%20%26%20Mobile&keyword=Landing%20Page&owner=vercel&hasDescription=1&sort=name-asc&top=20&scope=name',
      ['Web & UI', 'AI Agents'],
      ['Web & Mobile', 'AI & ML'],
      ['Landing Page', 'LLM agent'],
    );

    expect(filters).toEqual({
      query: 'react',
      minStars: 5000,
      selectedCategory: 'Web & UI',
      selectedCategoryGroup: 'Web & Mobile',
      selectedKeyword: 'Landing Page',
      ownerQuery: 'vercel',
      hasDescriptionOnly: true,
      sortBy: 'name-asc',
      topN: 20,
      searchScope: 'name',
    });
  });

  it('supports the legacy categories param by taking the first valid category', () => {
    const filters = readFiltersFromSearch(
      '?categories=Unknown,AI%20Agents,Web%20%26%20UI',
      ['Web & UI', 'AI Agents'],
      [],
      [],
    );
    expect(filters.selectedCategory).toBe('AI Agents');
  });

  it('omits default values when serializing filters', () => {
    expect(
      buildSearchFromFilters({
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
      }),
    ).toBe('');
  });

  it('serializes non-default filters into a stable query string', () => {
    expect(
      buildSearchFromFilters({
        query: 'docker',
        minStars: 1000,
        selectedCategory: 'AI Agents',
        selectedCategoryGroup: 'AI & ML',
        selectedKeyword: 'LLM agent',
        ownerQuery: 'foo',
        hasDescriptionOnly: true,
        sortBy: 'name-desc',
        topN: 50,
        searchScope: 'description',
      }),
    ).toBe(
      '?q=docker&minStars=1000&category=AI+Agents&group=AI+%26+ML&keyword=LLM+agent&owner=foo&hasDescription=1&sort=name-desc&top=50&scope=description',
    );
  });
});
