# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Linky is a URL shortener built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and React Spring. Short links are stored in Upstash Redis with a TTL. The README is in Portuguese, while UI strings and code are in English.

## Commands

The package manager is pnpm, and Node 22+ is required (nanoid 6).

- `pnpm dev`: start the dev server at http://localhost:3000
- `pnpm build` / `pnpm start`: build for production and serve the build
- `pnpm lint`: run `eslint .` (flat config in `eslint.config.mjs`; `next lint` no longer exists in Next 16)
- `pnpm test`: run Jest
- Single test file: `pnpm test src/app/api/shorten/route.spec.ts`
- Single test by name: `pnpm test -t "creates a short url"`

Tests live next to their source files as `*.spec.ts` and run in the node environment. The route tests call the handlers directly with `NextRequest`. nanoid is ESM-only, so tests mock it (`jest.mock("nanoid", ...)`).

TypeScript is pinned to 6.x because typescript-eslint does not support TS 7 yet.

## Environment

`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` go in `.env.local`. The repository is created lazily in `src/shared/index.ts`, so `next build` works without the variables. Outside production, missing credentials fall back to the in-memory `MockLocalRepository`. That fallback is also what the tests use. In production, missing credentials throw.

## Architecture

Path aliases (defined in both `tsconfig.json` and `jest.config.mjs`): `@/*` → `src/*`, `@shared/*` → `src/shared/*`.

**Backend layer (`src/shared/`)** uses a small repository/use-case pattern:
- `repository/interface.ts` defines `IRepository` (`get`, `create(key, data, expDays)`). Implementations: `UpstashRepository` (`SET ... EX`) and `MockLocalRepository`.
- `useCases/` holds `CreateUrlUseCase` and `GetUrlUseCase`. Each receives an `IRepository` in its constructor.
- `index.ts` is the composition root. `getUseCases()` returns `{ createUrl, getUrl }` built on one repository cached on `globalThis`. Server code calls `getUseCases()` inside handlers, never at module top level.

**Request flow:**
1. `ShortenUrlForm` (client component) checks the input with `isValidURL`, then POSTs `{ url, exp }` to `/api/shorten`. `exp` is a number of days: 1, 7, or 30.
2. `src/app/api/shorten/route.ts` validates again on the server: the URL, plus `exp` as an integer from 1 to 365 (default 1). Invalid input returns 400 with `{ message }`. The URL is stored with its protocol (`ensureHttp`) under an 8-character nanoid, and the response is `shortUrl: ${origin}/s/${id}`.
3. `src/app/s/[id]/route.ts` is a `GET` route handler that sends a 307 to the stored URL, or to `/url-not-found`. In Next 16, `params` is a Promise.

The API is documented to users in `src/app/docs/page.tsx`. Keep it in sync when the API changes.

**Client-side history:** the server cannot list URLs. The `/urls` page reads the user's own short links from `localStorage` (key `"urls"`, with ISO expiration dates) through `src/utils/localStorageUtils.ts`.

**Client-only rendering:** browser-dependent components (clipboard, localStorage, animations) are wrapped in `ClientOnly` (built on `useSyncExternalStore`) with skeleton fallbacks. Browser event hooks in `src/hooks/` use React 19's `useEffectEvent`. The eslint-config-next React Compiler rules are active, `react-hooks/set-state-in-effect` among them.

**Styling:** Tailwind v4 has no `tailwind.config` file. The theme and custom utilities (`scrollbar-hide`, `code-text`) live in `src/app/globals.css`, along with compat rules for v3 defaults (gray-200 borders, pointer cursor on buttons). Important modifiers go at the end (`w-auto!`). lucide-react 1.x has no brand icons, so `Github`/`Linkedin` are defined in `src/components/icons.ts`.
