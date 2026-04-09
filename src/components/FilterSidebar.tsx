import { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { CATEGORY_GROUPS, CATEGORY_META } from '../features/catalog/catalog-constants';

type FilterSidebarProps = {
  isOpen: boolean;
  selectedCategory: string | null;
  categoryCounts: Map<string, number>;
  onSelectCategory: (category: string | null) => void;
};

export default function FilterSidebar({
  isOpen,
  selectedCategory,
  categoryCounts,
  onSelectCategory,
}: FilterSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORY_GROUPS.map((group) => [group.label, true])),
  );

  return (
    <aside id="catalog-sidebar" className={`sidebar${isOpen ? '' : ' is-hidden'}`} aria-hidden={!isOpen}>
      <nav aria-label="Catalog categories">
        <button
          type="button"
          className={`sidebar-all${selectedCategory === null ? ' is-active' : ''}`}
          onClick={() => onSelectCategory(null)}
          aria-pressed={selectedCategory === null}
        >
          <span className="sidebar-all-icon">
            <CategoryIcon icon="globe" className="sidebar-icon-svg" />
          </span>
          <span>All categories</span>
        </button>

        {CATEGORY_GROUPS.map((group) => {
          const groupCount = group.categories.reduce((sum, category) => sum + (categoryCounts.get(category) ?? 0), 0);
          const isGroupOpen = openGroups[group.label] ?? true;

          return (
            <section key={group.label} className="sidebar-group">
              <button
                type="button"
                className="sidebar-group-toggle"
                onClick={() => setOpenGroups((current) => ({ ...current, [group.label]: !isGroupOpen }))}
                aria-expanded={isGroupOpen}
                aria-controls={`sidebar-group-${group.label}`}
              >
                <span>{group.label}</span>
                <span>{groupCount}</span>
              </button>

              {isGroupOpen ? (
                <div className="sidebar-categories" id={`sidebar-group-${group.label}`}>
                  {group.categories.map((category) => {
                    const checked = selectedCategory === category;
                    const count = categoryCounts.get(category) ?? 0;
                    const icon = CATEGORY_META[category]?.icon ?? '::';

                    return (
                      <button
                        key={category}
                        type="button"
                        className={`sidebar-category${checked ? ' is-active' : ''}`}
                        onClick={() => onSelectCategory(category)}
                        aria-pressed={checked}
                      >
                        <span className="sidebar-category-icon">
                          <CategoryIcon icon={icon} className="sidebar-icon-svg" />
                        </span>
                        <span className="sidebar-category-label">{category}</span>
                        <span>{count}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
