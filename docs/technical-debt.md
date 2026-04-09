# Technical Debt

## High Priority
- No open high-priority technical debt is currently recorded.

## Medium Priority
- Large generated payload
  - Confirmed by code: the app now splits default and full payloads, but low-star browsing still depends on the full generated catalog.
  - Confirmed by local measurement: parsing and filter logic are cheap relative to payload size, so transfer and browser rendering remain the main performance risks.
  - Follow-up: collect real browser traces on lower-end devices before adding virtualization complexity.

- Category quality
  - Reasonable inference: some repositories are noisy or weakly classified because discovery is keyword-based.
  - Confirmed by code: the build now excludes five known noisy rows and `.github` metadata repositories, and truncates oversized descriptions.
  - Confirmed by review: no additional broad heuristic exclusions were accepted because notebook/book/resource patterns still match many legitimate repositories.
  - Follow-up: keep curation explainable and add new exclusions only when concrete false positives are found.
