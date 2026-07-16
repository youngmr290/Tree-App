# Tree Handbook v2 Web Tool

Static browser app that allows users to model the economics of trees on Wheatbelt farms.

## What It Covers

- Scenario inputs (location, focus, soil, area, price scenarios, include toggles)
- Assumption inputs (costs, yields, prices, micro-climate percentages)
- Results breakdown:
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

## Run

Open `index.html` directly, or serve as static files.

## Storage

- Browser-only persistence via `localStorage` key: `nrm_handbook_v2_inputs`
- No backend and no cloud sync
