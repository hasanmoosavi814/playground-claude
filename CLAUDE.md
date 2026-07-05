# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint (flat config in eslint.config.js)
```

There is no test runner configured — `npm test` does not exist.

## Architecture

Vite + React 19 single-page app. The entire application is one component,
[src/App.jsx](src/App.jsx); [src/main.jsx](src/main.jsx) only mounts it into
`#root`. There is no router, no backend, and no persistence — transactions
live in React `useState` seeded with hardcoded data and reset on refresh.

`App.jsx` holds all state and derived values: the transactions list, the
add-transaction form fields, and two filter selects. Summary totals
(income / expenses / balance) and the filtered transaction table are computed
inline on each render from that state. Adding a transaction appends to the
array; nothing leaves the component.

## Context for this repo

This is the starter project for a Claude Code course. It **intentionally**
ships with a bug, deliberately poor UI, and messy code that are meant to be
fixed. Notably, transaction `amount` values are stored as **strings**, so the
summary totals in `App.jsx` use `reduce(... sum + t.amount ...)` which does
string concatenation rather than numeric addition. Treat rough edges here as
work to be done, not conventions to preserve.
