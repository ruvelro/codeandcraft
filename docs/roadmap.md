# Roadmap

## Phase 0 - Foundation
- Create repository documentation and task system
- Define architecture and data flow
- Remove hardcoded credentials from the scraper

## Phase 1 - MVP Catalog
- Generate JSON from canonical scraper CSV
- Build sidebar-based browsing UI
- Add repository cards
- Add name search
- Add minimum stars filter with `10,000` default

## Phase 2 - UX Hardening
- URL-synced filters
- Stronger empty/loading states
- Responsive polish
- Accessibility improvements

## Phase 3 - Data Quality
- Improve category grouping rules
- Add curation for noisy repositories

## Phase 4 - Data Operations
- Keep incremental repository acquisition through the scraper and `scrapper/new_repositories.csv`
- Retain full payload rebuilds from canonical `scrapper/repositories_catalog.csv`
- Revisit true incremental frontend payload generation only if full rebuild time or data volume becomes an operational bottleneck
