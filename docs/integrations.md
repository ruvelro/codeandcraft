# Integrations

## GitHub
- Confirmed by code: `scrapper/github_scraper.py` calls the GitHub Search Repositories API.
- Confirmed by code: authentication is expected through a token.
- Confirmed by implementation update: token must be read from environment variables, not committed in code.

## Frontend Runtime
- Confirmed by code: the frontend fetches `/data/catalog.default.generated.json` first and only fetches `/data/catalog.full.generated.json` when lower-star browsing is needed.
- There are no other runtime service integrations in the MVP.
