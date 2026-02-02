# Feature-Sliced Design (FSD) — Next.js App Router

Code is organized in FSD layers. **Dependency rule:** each layer may only import from layers below it.

| Layer     | Path alias    | Purpose |
|----------|----------------|---------|
| **app**  | `@/app/*`     | App-wide: providers, styles, api-routes |
| **pages**| `@/pages/*`   | Full page compositions (re-exported from `app/**/page.tsx`) |
| **widgets** | `@/widgets/*` | Composite UI blocks |
| **features** | `@/features/*` | User actions, interactions |
| **entities** | `@/entities/*` | Business entities |
| **shared** | `@/shared/*` | UI kit, lib, config — no upper-layer imports |

- Next.js routes live in the root `app/` folder; each route’s `page.tsx` re-exports the page from `@/pages/*`.
- Empty root `pages/` folder exists so Next.js does not treat `src/pages` as the Pages Router.

See [FSD + Next.js](https://feature-sliced.design/docs/guides/tech/with-nextjs).
