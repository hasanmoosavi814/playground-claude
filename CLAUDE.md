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

Vite + React 19 single-page app. There is no router, no backend, and no
persistence — transactions live in React `useState` seeded with hardcoded data
and reset on refresh. [src/main.jsx](src/main.jsx) only mounts `App` into
`#root`.

[src/App.jsx](src/App.jsx) is a thin container. It owns the `transactions`
array and the shared `categories` constant, exposes an `addTransaction` handler
that appends to the array, and composes three child components in
[src/components/](src/components/):

- [Summary.jsx](src/components/Summary.jsx) — receives `transactions` and
  computes income / expenses / balance internally.
- [TransactionForm.jsx](src/components/TransactionForm.jsx) — owns its own form
  fields (`description`, `amount`, `type`, `category`) and calls the
  `onAddTransaction` prop with a new transaction, then resets itself. The form
  `amount` is a string from the input, so it is coerced with `Number()` here
  before being stored.
- [TransactionList.jsx](src/components/TransactionList.jsx) — owns the filter
  state (`filterType`, `filterCategory`) and filters `transactions` internally.

State is colocated with the component that uses it; only `transactions` (shared
by `Summary` and `TransactionList`) is lifted into `App`. Transaction `amount`
values are numbers everywhere in the array — keep that invariant.

## Context for this repo

This is the starter project for a Claude Code course. It **intentionally**
shipped with a bug, deliberately poor UI, and messy code that are meant to be
fixed over the course; the original single-file `App.jsx` has since been split
into the components above and the string-amount summary bug has been fixed.
Styling and remaining rough edges are still fair game — treat them as work to
be done, not conventions to preserve.
