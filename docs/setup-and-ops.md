# Setup And Ops

## Local Setup
1. Install dependencies with `npm install`.
2. Start the app with `npm run dev`.
3. Build production assets with `npm run build`.

## Data Refresh
1. Update `scrapper/repositories_catalog.csv` manually or via `scrapper/github_scraper.py`.
2. Regenerate the frontend payloads with `npm run build:data`.
3. Run `npm run build` to validate the app against the latest data.

## Incremental Update Workflow
- Confirmed by code: `scrapper/github_scraper.py` writes newly discovered repositories into `scrapper/new_repositories.csv` and appends them into `scrapper/repositories_catalog.csv`.
- Decision taken: the operational workflow is incremental at the dataset collection stage, but the frontend payload build remains a full rebuild from `scrapper/repositories_catalog.csv`.

### Recommended Update Loop
1. Run the scraper and review `scrapper/new_repositories.csv` as the short-lived delta file.
2. Spot-check category quality and obvious false positives in the newly added rows.
3. Keep `scrapper/repositories_catalog.csv` as the canonical merged dataset.
4. Regenerate `public/data/catalog.default.generated.json` and `public/data/catalog.full.generated.json` from the canonical CSV.
5. Run `npm run build` before publishing.

### Why This Workflow
- Reasonable inference: the scraper already gives the project an incremental acquisition mechanism through `scrapper/new_repositories.csv`.
- Confirmed by architecture: the frontend expects globally sorted, curated payloads derived from the full canonical CSV.
- Reasonable inference: introducing partial JSON patching now would add complexity around sorting, curation, and payload consistency without clear operational need.

### Operational Rule
- Treat `scrapper/new_repositories.csv` as a review and audit artifact, not as a second source of truth for the frontend.
- Treat `scrapper/repositories_catalog.csv` as the only canonical input for `npm run build:data`.

## Scraper Operation
- Set `GITHUB_TOKEN` in the environment before running the scraper.
- Example PowerShell session:
  - `$env:GITHUB_TOKEN="your_token"`
  - `python scrapper/github_scraper.py`

## Automation

### Automatic Catalog Refresh PRs
- Confirmed by code: `.github/workflows/update-catalog.yml` can run manually and on a weekly schedule.
- Confirmed by code: it runs the scraper, validates payload generation, runs tests, and opens a pull request with scraper-managed file changes.

### Required Repository Secret
1. Open the GitHub repository.
2. Go to `Settings` -> `Secrets and variables` -> `Actions`.
3. Create a new repository secret named `SCRAPER_GITHUB_TOKEN`.
4. Paste the GitHub personal access token that should be used for scraping.

### How To Run The Refresh Workflow Manually
1. Open the repository on GitHub.
2. Go to `Actions`.
3. Open `Update Catalog`.
4. Click `Run workflow`.
5. Review the pull request created by the workflow.

## GitHub Pages Publishing

### Workflow
- Confirmed by code: `.github/workflows/deploy-pages.yml` builds the site and deploys `dist/` to GitHub Pages on push to `main` and on manual dispatch.
- Confirmed by code: `vite.config.ts` uses `base: './'`, so the built asset URLs remain relative and work under the project Pages URL `https://ruvelro.github.io/codeandcraft/`.

### Pages Setup
1. Push the repository to GitHub.
2. Open `Settings` -> `Pages`.
3. Under `Build and deployment`, select `GitHub Actions` as the source.
4. Push to `main` or run the `Deploy GitHub Pages` workflow manually.

### Repository Naming
- If you want the site at `https://<your-username>.github.io/`, the repository must be named exactly `<your-username>.github.io`.
- If the repository is named `codeandcraft`, the site URL will be `https://<your-username>.github.io/codeandcraft/`.
- Confirmed by code: `vite.config.ts` uses `base: './'` and the app fetches data through `import.meta.env.BASE_URL`, so both hosting modes are supported.

### Recommendation
- Use `codeandcraft` if you want a normal project repository.
- Use `<your-username>.github.io` only if you specifically want the site served from the domain root.

### First Publish Plan For `ruvelro.github.io/codeandcraft`
- Confirmed by local review: the repository is not yet initialized as a local Git repository, so the first publish flow must include local `git init`, remote creation, and the initial `main` push.
- Confirmed by code: the current Pages workflow already matches the intended hosting model and should deploy automatically once the repository exists on GitHub and Pages is set to `GitHub Actions`.

1. Create a new GitHub repository named `codeandcraft` under the `ruvelro` account.
2. Keep it public if the goal is standard GitHub Pages hosting without extra paid/private setup constraints.
3. In the local project folder, initialize Git:
   - `git init`
   - `git branch -M main`
4. Review the publish set before the first commit:
   - confirm `node_modules/`, `dist/`, local `.env*`, and credential files are ignored
   - confirm `public/data/catalog.generated.json` is absent because it is a legacy unused artifact
5. Stage the project:
   - `git add .`
6. Inspect the staged files carefully:
   - `git status`
   - `git diff --cached --stat`
7. Create the initial commit:
   - `git commit -m "chore: initial publish-ready catalog app"`
8. Add the GitHub remote:
   - `git remote add origin https://github.com/ruvelro/codeandcraft.git`
9. Push the first version:
   - `git push -u origin main`
10. In GitHub, open `Settings` -> `Pages` and set `Source` to `GitHub Actions`.
11. Open `Actions` and verify that `Deploy GitHub Pages` completes successfully.
12. Validate the published URL:
   - `https://ruvelro.github.io/codeandcraft/`
13. Smoke-test the live site:
   - first load succeeds
   - category navigation works
   - search works
   - lowering the star threshold loads the full catalog successfully
   - support and GitHub links open correctly

### Repeatable Release Plan For New Versions
- Confirmed by code: every push to `main` triggers a fresh Pages deployment.
- Reasonable inference: the safest release flow is to validate locally, push to GitHub, then confirm the live Pages deployment before considering the version released.

1. Update code and, if needed, refresh data with the scraper workflow or local data rebuild.
2. Run local verification:
   - `npm test`
   - `npm run build`
3. Review the exact files being published:
   - `git status`
   - `git diff --stat`
4. Commit with a focused message:
   - example: `git commit -m "feat: improve catalog filtering"`
5. Push to `main`:
   - `git push`
6. Wait for `Deploy GitHub Pages` to finish in GitHub Actions.
7. Re-check the live site on `https://ruvelro.github.io/codeandcraft/`.
8. If the release touched data loading or routing-sensitive code, test directly from the live Pages URL rather than only in local preview.

### Recommended Safety Checklist Before Every Push
- Confirmed by local review: no live token values were found in the working tree during the publication audit.
- Confirmed by code: the scraper reads `GITHUB_TOKEN` from the environment and the automation workflow reads `SCRAPER_GITHUB_TOKEN` from GitHub Actions secrets.
- Confirmed by local review: `.gitignore` now excludes common secret files and generated build artifacts, reducing accidental publication risk.
- Pending confirmation: once Git is initialized, the staged file list should still be reviewed manually before each push because local ignore rules do not protect already tracked files.

1. Run `git status` and make sure only intended files are staged.
2. Search one more time if the change touched automation or scraper code:
   - `rg -n "(TOKEN|SECRET|PASSWORD|KEY)" .`
3. Never commit personal access tokens into source, docs, or workflow YAML.
4. Prefer storing scraper credentials only in:
   - local environment variables for local runs
   - GitHub Actions repository secrets for automation
5. If a token is ever exposed, rotate it before the next push.

## Operational Warnings
- Confirmed by previous code state: a GitHub token had been committed directly into `scrapper/github_scraper.py`.
- The repository must never store live credentials again.
