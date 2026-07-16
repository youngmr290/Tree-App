# NRM Handbook v2 Web Tool

Static browser app that reproduces the `Guide` economics section from `Handbook v2.xlsx`.

## What It Covers

- Scenario inputs from `Guide` (location, focus, soil, area, price scenarios, include toggles)
- Orange assumption cells (costs, yields, prices, micro-climate percentages)
- Results matching the Guide breakdown:
  - Land opportunity cost
  - +trees
  - +livestock shelter
  - +adj pad interaction
  - +carbon
  - +biodiversity
  - +harvesting
  - +micro-climate
  - +increased grazing
  - +reduced salinity spread
- Total annualised economic impact

## Files

- `index.html` UI
- `styles.css` styling
- `app.js` workbook-mapped formulas and lookup tables
- `Handbook v2.xlsx` reference workbook

## Run

Open `index.html` directly, or serve as static files.

## Storage

- Browser-only persistence via `localStorage` key: `nrm_handbook_v2_inputs`
- No backend and no cloud sync
