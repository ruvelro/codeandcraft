# Repository Cards

## Objective
- Surface repository metadata in a compact, scannable card layout.

## Card Contents
- Repository name
- Owner
- Description
- Stars
- Category badge
- External GitHub link

## Current Behavior
- Confirmed by code: visible repositories are explicitly sorted from highest to lowest stars.
- Confirmed by code: cards use a dark bordered panel style closer to the provided visual reference.
- Reasonable inference: the current layout is closer to the target screenshot, but still not a pixel-perfect replica.
- Confirmed by code: the grid only renders an initial batch and appends more cards while scrolling.
- Confirmed by code: the repository badge now uses an inline GitHub SVG mark instead of the `GH` text token.
- Confirmed by code: card padding, title scale, footer spacing, and badge proportions were tightened for a denser visual balance.

## Key Files
- `src/components/RepoCard.tsx`
- `src/components/RepoGrid.tsx`

## Pending Improvements
- Add language, updated-at date, or avatar imagery if the source data grows.
