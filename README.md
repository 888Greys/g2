# GameKey Market

A Vite + React + TypeScript storefront prototype for selling digital game keys.

## Tech Stack

- React 19
- React Router
- TypeScript
- Tailwind CSS (via `@tailwindcss/vite`)
- Bun (recommended) or npm

## Run Locally

Prerequisites:
- Bun `>=1.0` (recommended) or Node.js `>=20`

Install dependencies:

```bash
bun install
```

Start dev server:

```bash
bun run dev
```

The app runs on `http://localhost:3000`.

## Quality Checks

Type-check:

```bash
bun run lint
```

Production build:

```bash
bun run build
```

## Notes

- Cart state is persisted in `localStorage`.
- Product/catalog/cart/checkout flows are frontend-only in this repo.
- `express`/`better-sqlite3` are present in dependencies but backend runtime is not wired in current source.
