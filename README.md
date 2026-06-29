# KoinX Tax Loss Harvesting Tool

A responsive React application for simulating tax loss harvesting on crypto holdings.

## Features

- **Pre/Post Harvesting Cards** — real-time comparison of capital gains before and after harvesting
- **Holdings Table** — sortable, selectable table with all crypto holdings
- **Savings Indicator** — shows estimated tax savings when post-harvesting gains are lower
- **Select All / Deselect All** — batch select holdings
- **View All** — toggle to show all 25 holdings (default shows 8)
- **Skeleton Loaders** — smooth loading states for both API calls
- **Mobile Responsive** — works on all screen sizes

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- Mock APIs via in-app Promises (no server needed)

## Project Structure

```
src/
  api/         → Mock API (fetchHoldings, fetchCapitalGains)
  components/  → CapitalGainsCard, HoldingsTable
  hooks/       → useCapitalGains (business logic)
  utils/       → formatCurrency, formatNumber
```

## Assumptions

- Holdings with `gain > 0` add to profits; `gain < 0` add to losses (as absolute value)
- "Amount to Sell" column shows totalHolding when row is selected
- Assets sorted by absolute STCG gain descending (largest impact first)
- Default table shows 8 rows; "View All" expands to full list
