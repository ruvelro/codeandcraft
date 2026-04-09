# Domain Glossary

- `Catalog`: the browser-facing collection of repositories shown in the web app.
- `RepositoryRecord`: normalized frontend representation of one CSV row.
- `Category`: original high-level label from `scrapper/repositories_catalog.csv`, such as `Dev Tools` or `AI Models`.
- `Category Group`: sidebar grouping layer used by the UI, such as `Development` or `AI & ML`.
- `Keyword`: search term used by the scraper to discover repositories for a category.
- `Minimum Stars`: numeric threshold used to hide less popular repositories by default.
- `Generated Catalog`: the generated JSON payloads under `public/data/`, produced from the CSV during build.
