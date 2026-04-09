import { describe, expect, it } from 'vitest';
import { cleanupDescription, shouldExcludeCatalogRow } from './catalog-curation.mjs';

describe('catalog curation', () => {
  it('truncates oversized descriptions', () => {
    const value = cleanupDescription('a'.repeat(400));

    expect(value.length).toBeLessThanOrEqual(280);
    expect(value.endsWith('...')).toBe(true);
  });

  it('keeps normal descriptions intact', () => {
    expect(cleanupDescription('Useful CLI toolkit')).toBe('Useful CLI toolkit');
  });

  it('excludes explicit noisy repositories', () => {
    expect(shouldExcludeCatalogRow({ Creador: 'cirosantilli', Repositorio: 'china-dictatorship' })).toBe(true);
    expect(shouldExcludeCatalogRow({ Creador: 'gege-circle', Repositorio: '.github' })).toBe(true);
  });

  it('keeps normal repositories', () => {
    expect(shouldExcludeCatalogRow({ Creador: 'junegunn', Repositorio: 'fzf' })).toBe(false);
  });
});
