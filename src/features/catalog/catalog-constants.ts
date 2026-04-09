import type { CategoryGroup, CategoryMeta, SearchScope, SortOption } from './catalog-types';

export const DEFAULT_MIN_STARS = 10_000;
export const DEFAULT_SORT_BY: SortOption = 'stars-desc';
export const DEFAULT_SEARCH_SCOPE: SearchScope = 'all';
export const DEFAULT_TOP_N: number | null = null;

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: 'Development',
    categories: ['Dev Tools', 'Developer Experience (DX)', 'DevOps', 'APIs & Backend', 'Data & Database'],
  },
  {
    label: 'AI & ML',
    categories: ['AI Agents', 'AI Models'],
  },
  {
    label: 'Creative',
    categories: ['Video & Media', 'Game Dev', 'Design Tools'],
  },
  {
    label: 'Web & Mobile',
    categories: ['Web & UI', 'Mobile Apps', 'Browser Extensions'],
  },
  {
    label: 'Productivity',
    categories: ['Productivity', 'Automation', 'Low-Code & Automation'],
  },
  {
    label: 'Other',
    categories: ['Self-Hosted & Open Alternatives', 'Cybersecurity & Pentesting', 'Fintech & Crypto AI'],
  },
];

export const CATEGORY_META: Record<string, CategoryMeta> = {
  'Dev Tools': { icon: 'code' },
  'Developer Experience (DX)': { icon: 'sparkles' },
  DevOps: { icon: 'server' },
  'APIs & Backend': { icon: 'brackets' },
  'Data & Database': { icon: 'database' },
  'AI Agents': { icon: 'bot' },
  'AI Models': { icon: 'brain' },
  'Video & Media': { icon: 'video' },
  'Game Dev': { icon: 'gamepad' },
  'Design Tools': { icon: 'palette' },
  'Web & UI': { icon: 'globe' },
  'Mobile Apps': { icon: 'smartphone' },
  'Browser Extensions': { icon: 'puzzle' },
  Productivity: { icon: 'bolt' },
  Automation: { icon: 'wand' },
  'Low-Code & Automation': { icon: 'workflow' },
  'Self-Hosted & Open Alternatives': { icon: 'home' },
  'Cybersecurity & Pentesting': { icon: 'shield' },
  'Fintech & Crypto AI': { icon: 'coins' },
};

export const CATEGORY_GROUP_LOOKUP = new Map(
  CATEGORY_GROUPS.flatMap((group) => group.categories.map((category) => [category, group.label])),
);

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'stars-desc', label: 'Stars: High to Low' },
  { value: 'stars-asc', label: 'Stars: Low to High' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export const SEARCH_SCOPE_OPTIONS: Array<{ value: SearchScope; label: string }> = [
  { value: 'all', label: 'All text' },
  { value: 'name', label: 'Name only' },
  { value: 'owner', label: 'Owner only' },
  { value: 'description', label: 'Description only' },
];

export const TOP_N_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All results' },
  { value: '20', label: 'Top 20' },
  { value: '50', label: 'Top 50' },
  { value: '100', label: 'Top 100' },
];
