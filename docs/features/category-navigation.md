# Category Navigation

## Objective
- Mirror the left-hand grouped navigation style from the reference design.

## Grouping Model
- Development
- AI & ML
- Creative
- Web & Mobile
- Productivity
- Other

## Key Files
- `src/components/FilterSidebar.tsx`
- `src/features/catalog/catalog-constants.ts`

## Current Behavior
- Confirmed by code: sidebar groups are collapsible.
- Confirmed by code: category navigation uses a single active category, not multi-select checkboxes.
- Confirmed by code: each category row uses an inline SVG icon.
- Confirmed by code: category icons now share a more consistent line-based SVG style.
- Confirmed by code: category counts reflect the current query and star threshold, but not the active category itself.
- Confirmed by code: sidebar spacing has been tightened for a denser navigation rhythm closer to the reference.
- Confirmed by code: sidebar toggle buttons expose `aria-expanded`, and category buttons expose pressed state.
- Confirmed by code: a global top-bar control can collapse the entire category sidebar.
- Confirmed by code: on compact layouts, selecting a category closes the sidebar so the repository grid can reclaim the viewport.
- Confirmed by code: compact and mobile layouts now start with the category sidebar hidden by default.
- Confirmed by code: compact layouts now present the category sidebar as an overlay drawer with a dismissible backdrop instead of reflowing the main content.

## URL Behavior
- Confirmed by code: the active category persists in the URL as `category=<name>`.
- Confirmed by code: legacy `categories=` links still hydrate the first valid category.

## Risks
- Some original categories may need regrouping after real usage feedback.
