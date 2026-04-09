type CatalogHeaderProps = {
  visibleCount: number;
  totalCount: number;
  selectedCategory: string | null;
  minStars: number;
  usingFullCatalog: boolean;
};

export default function CatalogHeader({
  visibleCount: _visibleCount,
  totalCount: _totalCount,
  selectedCategory: _selectedCategory,
  minStars: _minStars,
  usingFullCatalog: _usingFullCatalog,
}: CatalogHeaderProps) {
  return (
    <header className="catalog-header">
      <h1>Code & Craft.</h1>
      <p>Open source projects, experiments, libraries and tools.</p>
    </header>
  );
}
