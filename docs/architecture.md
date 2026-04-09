# Architecture

## Overview
- Confirmed by code: source data comes from `scrapper/repositories_catalog.csv`.
- Confirmed by code: `scripts/build-catalog-data.mjs` transforms CSV rows into frontend-ready JSON at `public/data/catalog.default.generated.json` and `public/data/catalog.full.generated.json`.
- Confirmed by code: the frontend is a Vite + React + TypeScript SPA under `src/`.

## Runtime Architecture
1. Build step runs `npm run build:data`.
2. The script parses the CSV and writes `public/data/catalog.default.generated.json` and `public/data/catalog.full.generated.json`.
3. The app fetches the default payload on load.
4. The app fetches the full payload only when the active minimum stars filter drops below `10,000`.
5. Category navigation, search, and star threshold filtering run client-side in memory.
6. The repository grid renders incrementally in batches as the user scrolls.

## Why This Architecture
- Reasonable inference: a static-first app is the fastest path to an instant-feeling UI for a local curated dataset.
- Reasonable inference: pre-processing the CSV avoids runtime parsing overhead and keeps the browser logic simple.
- Reasonable inference: no backend is needed until product requirements include auth, personalization, or live syncing.

## Main Technical Components
- `scripts/build-catalog-data.mjs`: ingestion and normalization pipeline
- `scripts/catalog-curation.mjs`: small, explicit curation layer for noisy rows
- `src/app/App.tsx`: application shell and data loading
- `src/features/catalog/*`: filter state, selectors, and shared types
- `src/components/*`: sidebar, toolbar, cards, grid

## Known Constraints
- Confirmed by code: the full generated JSON still contains all repositories, so low-star browsing still depends on a large payload.
- Confirmed by local measurement: the current split-payload approach reduced transfer from about `3.22 MB gzip` for the full dataset to about `365 KB gzip` for the default dataset.
- Confirmed by local measurement: parsing the default payload took about `4.30 ms` in local Node measurement, while parsing the full payload took about `35.82 ms`.
- Confirmed by local measurement: common filter scenarios remained under about `2 ms` even on the full payload in Node-based proxy measurements.
- Reasonable inference: payload splitting and incremental grid rendering continue to provide better value than introducing virtualization immediately.
- Pending confirmation: real browser traces on lower-end devices are still needed before definitively ruling out virtualization.
