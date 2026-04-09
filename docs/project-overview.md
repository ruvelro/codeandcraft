# Project Overview

## Product Summary
- Confirmed by code: the repository contains `scrapper/repositories_catalog.csv`, a dataset of GitHub repositories with category, keyword, owner, repository, description, URL, and star count.
- Confirmed by user requirement: the product is a web catalog for browsing and filtering those repositories quickly.
- Confirmed by implementation: the MVP is a static-first React app that consumes generated JSON from the CSV.

## Primary User Value
- Browse notable open-source repositories without scanning a spreadsheet.
- Navigate by grouped categories from a left sidebar.
- Search repositories by name.
- Start from a curated default view showing repositories with more than `10,000` stars.

## Current Scope
- Sidebar category navigation
- Repository card grid
- Name search
- Minimum stars filter
- Static data generation from CSV

## Non-Goals For MVP
- User accounts
- Favorites persistence
- Full-text search backend
- Live GitHub API querying from the frontend
