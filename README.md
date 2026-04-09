# Code & Craft

Discover standout open-source repositories through a fast, static-first catalog built from curated GitHub data.

[Open the live site](https://ruvelro.github.io/codeandcraft/)

## What It Does

`code&craft` turns a large CSV of GitHub repositories into a browsable web app focused on quick exploration.

- Browse repositories by category
- Search by name
- Start from a curated high-signal view of repos with more than `10,000` stars
- Load the full catalog only when lower star thresholds are needed

## Live Demo

The project is published on GitHub Pages:

- [ruvelro.github.io/codeandcraft](https://ruvelro.github.io/codeandcraft/)

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest
- GitHub Actions
- GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Build production assets:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Data Pipeline

The catalog is generated from:

- [`scrapper/repositories_catalog.csv`](./scrapper/repositories_catalog.csv)

Frontend payloads are built with:

- `npm run build:data`

The build pipeline writes optimized JSON files into `public/data/` for the app to consume.

## Automated Updates

The repository includes a scheduled GitHub Actions workflow that can:

- run the scraper
- refresh the catalog data
- rebuild generated payloads
- run tests
- open a pull request automatically

Secrets are not committed to the repository. The scraper reads its GitHub token from the `SCRAPER_GITHUB_TOKEN` repository secret.

## Repository Structure

```text
src/         React application
scripts/     catalog build and curation logic
scrapper/    scraper inputs, outputs, and scraper script
public/data/ generated catalog payloads
docs/        persistent project documentation
```

## Why This Project Exists

Browsing a giant spreadsheet of repositories is slow and noisy. This project aims to make discovery feel immediate: category-first, searchable, and deployable as a simple static site.

## Notes

- The repo uses GitHub Pages for deployment.
- The app is designed to work under `https://ruvelro.github.io/codeandcraft/`.
- Automation and operational notes live in [`docs/setup-and-ops.md`](./docs/setup-and-ops.md).
