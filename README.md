# KoinX Tax Loss Harvesting Tool

A responsive React application for simulating tax loss harvesting on crypto holdings. The app uses mocked API responses, calculates pre- and post-harvesting capital gains in real time, and lets users select holdings to see the potential tax impact.

## Live Demo

https://koinx-tax-harvesting-pink.vercel.app/

## Features

- Pre-harvesting and after-harvesting capital gains cards
- Real-time recalculation when holdings are selected or deselected
- Holdings table with row checkboxes and select-all support
- Amount-to-sell updates for selected holdings
- Loader states while mock data is being fetched
- Mobile-friendly responsive layout
- View All toggle for the holdings list

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- ESLint
- In-app mock APIs using Promises

## Project Structure

```text
src/
  api/         Mock API responses
  components/  Capital gains cards and holdings table
  hooks/       Harvesting calculation logic
  utils/       Currency and number formatting helpers
```

## How It Works

1. The app fetches holdings data and capital gains data through mocked async functions.
2. The pre-harvesting card shows the base capital gains from the capital gains API.
3. The after-harvesting card starts identical to the pre-harvesting view.
4. When a holding is selected, its short-term and long-term gains are applied to the post-harvesting totals.
5. Positive gains are added to profits and negative gains are added to losses.
6. The savings message appears only when the post-harvesting realised gains are lower than the pre-harvesting realised gains.

## Assumptions

- Holdings with positive gain values contribute to profits.
- Holdings with negative gain values contribute to losses as absolute amounts.
- The holdings table shows the selected asset quantity in the amount-to-sell column.
- The default table view shows the first 8 holdings, with a View All toggle for the full list.
- The application uses mocked data instead of live backend services.

## Deployed URL

https://koinx-tax-harvesting-pink.vercel.app/
