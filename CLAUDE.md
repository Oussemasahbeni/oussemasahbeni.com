# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml` / `pnpm-lock.yaml`). Despite the README, the app runs on **Vite**, not `ng serve`.

- `pnpm dev` (or `pnpm start`) — Vite dev server
- `pnpm build` — production build (AnalogJS SSR output under `dist/`)
- `pnpm preview` — run the built SSR server: `node dist/analog/server/index.mjs`
- `pnpm test` — Vitest (jsdom, globals on; setup in `src/test-setup.ts`)
  - single file: `pnpm test src/app/.../foo.spec.ts`
  - by name: `pnpm test -t "some test name"`
- `npx eslint .` — lint (no `lint` script defined; config in `eslint.config.js`)

## Architecture

**Angular 22 on AnalogJS 2.6** (a Vite-based Angular meta-framework). Not a standard Angular CLI app — the Angular CLI (`ng`) is present but the toolchain is Vite + `@analogjs/platform`. SSR is enabled (`ssr: true, static: false` in `vite.config.ts`).

### Routing — file-based

Routes live in `src/app/pages/` and are wired by `provideFileRouter` (`app.config.ts`). Filename conventions:

- `index.page.ts` → route index; nested folders → nested paths
- `[slug].page.ts` → dynamic segment; `[...page-not-found].page.ts` → catch-all
- Each page exports a `default` component and optionally `export const routeMeta: RouteMeta` for title/meta/resolvers.

### Content — markdown blog

Blog posts are markdown files in `src/content/` with frontmatter. `injectContentFiles<ContentMetadata>()` loads them (see `src/app/pages/blog/index.page.ts`); rendering uses `provideContent` + Shiki highlighter. `vite.config.ts` `prerender` generates static routes + sitemap from these files and skips `draft: true` posts. Frontmatter shape is `src/app/models/content-metadata.ts`.

### Server API — h3 handlers

Backend endpoints are AnalogJS/Nitro server routes in `src/server/routes/api/`, written as `defineEventHandler` (h3). Filename maps to path: `contact-post.ts` → `POST /api/contact`, `spotify/now-playing.ts` → `/api/spotify/now-playing`, `rss.xml.ts` → `/api/rss.xml`. Secrets come from `process.env` (`.env`, gitignored): `RESEND_API_KEY`, `SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN`. Contact form emails via Resend; Spotify "now playing" and GitHub data are fetched server-side/via services in `src/app/core/services/`.

### UI — spartan/ui (Brain + Helm)

Two-layer component system:

- **Brain** (`@spartan-ng/brain`) — headless behavior primitives, from npm.
- **Helm** — styled wrappers **copied into this repo** at `src/app/components/ui/<name>/`, imported via path aliases like `@spartan-ng/helm/button` (mapped in `tsconfig.json` `paths`, NOT node_modules). Each has `src/index.ts` re-exporting an `Hlm*Imports` array.

Add/update Helm components with the spartan CLI (`@spartan-ng/cli`); config is `components.json` (`style: "nova"`). When adding a component, a new `paths` entry must be added to `tsconfig.json`. Styling is **Tailwind CSS v4** (via `@tailwindcss/vite`, no `tailwind.config.js`); class merging uses `clsx` + `tailwind-merge` + `class-variance-authority` (see `components/ui/utils`). Icons via `@ng-icons` (lucide / radix / remix).

### Component conventions

Standalone components with **inline templates**, **signals** (`signal`/`computed`) for state, and layout classes set via the `host` block. Modern control flow (`@for`, `@if`, `@empty`). TypeScript is strict (`strictTemplates`, `noPropertyAccessFromIndexSignature`, etc.). ESLint enforces `app` element-selector prefix, kebab-case. Visual extras: `pixi.js` + `simplex-noise` power the noise background (`shared/components/noise-background`); theme switching in `core/services/theme.service.ts`.

### Layout of `src/app`

`pages/` (routes) · `components/` (`home`, `blog`, `ui`) · `layout/` (navbar, footer, theme-toggle) · `core/` (services, resolvers) · `shared/` (reusable components, directives, pipes) · `models/` (types).
