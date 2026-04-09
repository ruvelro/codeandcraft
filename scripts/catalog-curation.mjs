const EXCLUDED_FULL_NAMES = new Set([
  'cirosantilli/china-dictatorship',
  'gege-circle/.github',
  'Dujltqzv/Some-Many-Books',
  'lTbgykio/Books-Free-Books',
]);

const MAX_DESCRIPTION_LENGTH = 280;
const FALLBACK_DESCRIPTION = 'No description';

export function cleanupDescription(value) {
  const trimmed = (value || FALLBACK_DESCRIPTION).replace(/\s+/g, ' ').trim();
  const normalized = trimmed.length > 0 ? trimmed : FALLBACK_DESCRIPTION;

  if (normalized.length <= MAX_DESCRIPTION_LENGTH) {
    return normalized;
  }

  return `${normalized.slice(0, MAX_DESCRIPTION_LENGTH - 3).trimEnd()}...`;
}

export function shouldExcludeCatalogRow(row) {
  const owner = row.Owner?.trim() ?? row.Creador?.trim() ?? '';
  const repo = row.Repository?.trim() ?? row.Repositorio?.trim() ?? '';
  const fullName = `${owner}/${repo}`;

  if (!owner || !repo) {
    return false;
  }

  if (repo === '.github') {
    return true;
  }

  return EXCLUDED_FULL_NAMES.has(fullName);
}

export { EXCLUDED_FULL_NAMES, FALLBACK_DESCRIPTION, MAX_DESCRIPTION_LENGTH };
