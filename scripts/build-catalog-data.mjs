import fs from 'node:fs/promises';
import path from 'node:path';
import Papa from 'papaparse';
import { cleanupDescription, FALLBACK_DESCRIPTION, shouldExcludeCatalogRow } from './catalog-curation.mjs';

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, 'scrapper', 'repositories_catalog.csv');
const OUTPUT_DIR = path.join(ROOT, 'public', 'data');
const DEFAULT_OUTPUT_PATH = path.join(OUTPUT_DIR, 'catalog.default.generated.json');
const FULL_OUTPUT_PATH = path.join(OUTPUT_DIR, 'catalog.full.generated.json');
const DEFAULT_MIN_STARS = 10_000;

const CATEGORY_GROUPS = {
  Development: ['Dev Tools', 'Developer Experience (DX)', 'DevOps', 'APIs & Backend', 'Data & Database'],
  'AI & ML': ['AI Agents', 'AI Models'],
  Creative: ['Video & Media', 'Game Dev', 'Design Tools'],
  'Web & Mobile': ['Web & UI', 'Mobile Apps', 'Browser Extensions'],
  Productivity: ['Productivity', 'Automation', 'Low-Code & Automation'],
  Other: ['Self-Hosted & Open Alternatives', 'Cybersecurity & Pentesting', 'Fintech & Crypto AI'],
};

const categoryGroupMap = new Map(
  Object.entries(CATEGORY_GROUPS).flatMap(([group, categories]) => categories.map((category) => [category, group])),
);

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const csvContent = await fs.readFile(CSV_PATH, 'utf8');
const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
});

if (parsed.errors.length > 0) {
  throw new Error(`CSV parse failed: ${parsed.errors[0].message}`);
}

const curatedRows = parsed.data.filter((row) => !shouldExcludeCatalogRow(row));

const repos = curatedRows
  .map((row, index) => {
    const owner = row.Owner?.trim() ?? '';
    const repo = row.Repository?.trim() ?? '';
    const description = cleanupDescription(row.Description);
    const category = row.Category?.trim() ?? 'Uncategorized';
    const keyword = row.Keyword?.trim() ?? '';
    const stars = Number(row.Stars ?? 0);
    const normalizedOwner = normalizeText(owner);
    const normalizedRepo = normalizeText(repo);
    const normalizedDescription = normalizeText(description);
    const normalizedKeyword = normalizeText(keyword);
    const hasDescription = description !== FALLBACK_DESCRIPTION;

    return {
      id: `${owner}/${repo}/${index}`,
      category,
      categoryGroup: categoryGroupMap.get(category) ?? 'Other',
      keyword,
      keywordText: normalizedKeyword,
      owner,
      ownerText: normalizedOwner,
      repo,
      repoText: normalizedRepo,
      fullName: `${owner}/${repo}`,
      description,
      descriptionText: normalizedDescription,
      hasDescription,
      url: row.Url?.trim() ?? '',
      stars,
      searchText: normalizeText(`${owner} ${repo} ${description} ${keyword}`),
    };
  })
  .filter((repo) => repo.owner && repo.repo && repo.url && Number.isFinite(repo.stars))
  .sort((left, right) => right.stars - left.stars);

const defaultRepos = repos.filter((repo) => repo.stars >= DEFAULT_MIN_STARS);

function buildPayload(payloadRepos) {
  const keywords = [...new Set(payloadRepos.map((repo) => repo.keyword).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right),
  );

  return {
    generatedAt: new Date().toISOString(),
    totalRepos: payloadRepos.length,
    defaultMinStars: DEFAULT_MIN_STARS,
    groups: Object.entries(CATEGORY_GROUPS).map(([label, categories]) => ({ label, categories })),
    keywords,
    repos: payloadRepos,
  };
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.writeFile(DEFAULT_OUTPUT_PATH, JSON.stringify(buildPayload(defaultRepos), null, 2), 'utf8');
await fs.writeFile(FULL_OUTPUT_PATH, JSON.stringify(buildPayload(repos), null, 2), 'utf8');

console.log(`Generated ${defaultRepos.length} default catalog rows at ${DEFAULT_OUTPUT_PATH}`);
console.log(`Generated ${repos.length} full catalog rows at ${FULL_OUTPUT_PATH}`);
