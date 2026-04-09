# Testing

## Local Run
1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Open the URL shown by Vite, normally `http://localhost:5173`.

## Current Automated Coverage
- `src/features/catalog/catalog-selectors.test.ts`
  - verifies minimum star filtering
  - verifies combined category and query filtering
  - verifies star-descending ordering

- `src/features/catalog/catalog-url-state.test.ts`
  - verifies query-string parsing and serialization

- `scripts/catalog-curation.test.mjs`
  - verifies curation exclusions and description truncation

## Manual Checks
- Run `npm run build:data` and confirm both `public/data/catalog.default.generated.json` and `public/data/catalog.full.generated.json` are generated.
- Run `npm run build` and confirm the production bundle succeeds.
- Verify that visible UI labels are in English and no Spanish copy remains in the main interface.
- Verify that the default view only shows repositories with `> 10,000` stars.
- Verify that visible repositories stay ordered from more stars to fewer stars after changing categories, text, or min stars.
- Verify that clicking a category replaces the current category view instead of stacking multiple category filters.
- Verify that `All categories` clears the active category.
- Verify that searching by repository name updates results immediately.
- Verify that owner, keyword, category group, search scope, description-only mode, sorting, and top-N limit all affect the result set as expected.
- Verify that advanced filters can be collapsed and expanded without losing their current values.
- Verify that active advanced filters appear as chips when set.
- Verify that the advanced filters panel opens and closes smoothly.
- Verify that the description-only switch no longer stretches awkwardly compared with adjacent controls.
- Verify that the filters section does not overlap at tablet and mobile widths.
- Verify keyboard navigation across sidebar buttons, toolbar actions, form controls, and repository links.
- Verify that focus rings are visible on buttons, links, inputs, and selects.
- Verify that lowering the minimum stars filter below `10,000` loads the full catalog and expands result counts.
- Verify that the grid starts with a limited batch and appends more cards when scrolling near the end.

## How To Measure

### 1. Initial Payload
1. Open Chrome DevTools.
2. Go to `Network`.
3. Enable `Disable cache`.
4. Reload the page.
5. Check the size and timing of `catalog.default.generated.json`.

Expected current behavior:
- initial dataset request should be `catalog.default.generated.json`
- `catalog.full.generated.json` should not be requested on first load

### 2. Full Catalog Lazy Load
1. Keep DevTools open in `Network`.
2. Change the stars filter from `10.000` to `5.000` or `0`.
3. Confirm that `catalog.full.generated.json` is requested only at that moment.

### 3. Main-Thread Cost
1. Open DevTools `Performance`.
2. Start recording.
3. Reload the page once with default filters.
4. Stop recording and inspect:
   - scripting time during initial load
   - layout/paint spikes
   - long tasks over `50 ms`
5. Record a second trace while changing `minStars` from `10.000` to `0`.

### 4. DOM And Rendering Density
1. Open DevTools `Elements` and inspect `.repo-grid`.
2. Compare the number of rendered cards before and after scrolling near the sentinel.
3. Compare default mode versus low-star mode.
4. If low-star mode still feels heavy even with incremental rendering, that is the signal for future virtualization work.

### 5. Mobile Feel
1. Open DevTools device toolbar.
2. Test widths around `390px` and `768px`.
3. Verify that:
   - sidebar becomes stacked
   - toolbar wraps correctly
   - cards remain legible and clickable

### 6. Lighthouse Snapshot
1. Run Lighthouse in mobile mode.
2. Focus on:
    - Performance
   - Accessibility
   - Best Practices
3. Use it as a baseline, not as the only decision-maker.

## Current Local Measurements
- Confirmed by local Node measurement: `catalog.default.generated.json` is about `365 KB gzip`.
- Confirmed by local Node measurement: `catalog.full.generated.json` is about `3.22 MB gzip`.
- Confirmed by local Node measurement: default payload parse time is about `4.30 ms`.
- Confirmed by local Node measurement: full payload parse time is about `35.82 ms`.
- Confirmed by local Node measurement: common filter scenarios remained under about `2 ms` on the full payload.
- Reasonable inference: current evidence does not justify true virtualization yet, but this is not a substitute for browser/device traces.

## Gaps
- Pending confirmation: browser-level tests for responsive behavior across real devices
- Pending confirmation: browser-level measurements for initial card render cost on lower-end devices
