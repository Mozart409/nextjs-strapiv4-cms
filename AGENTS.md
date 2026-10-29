# AGENTS.md

Strapi 5 headless CMS backend (PostgreSQL 18, pnpm workspace) deployed to Railway. The Next.js frontend was removed and only `apps/backend` remains. See [README.md](README.md) for setup, environment variables and scripts.

## Layout

- `apps/backend/`: Strapi app (config, content types, `scripts/seed.js`, Dockerfile)
- `.railway/railway.ts`: Railway infrastructure as code (named partial; Postgres, Redis and backup cron live in the dashboard)
- `pnpm-workspace.yaml`: workspace config, including `overrides` for transitive security fixes

## Commands

- `pnpm install`, `pnpm up` (local Postgres on `localhost:5555`), `pnpm dev`, `pnpm seed`
- `pnpm be` builds the admin panel; `pnpm scan:backend` builds the image and runs trivy and kics
- `railway config plan` before `railway config apply`

## Dependency constraints

- Keep `vite` pinned to `6.4.4` via workspace overrides. Strapi 5 needs vite 6, and vite 8 breaks the admin bundle (`Prism is not defined`).
- Keep `react` and `react-dom` on 18 and `react-router-dom` on 6 for the Strapi admin.
- Keep all `@strapi/*` packages on the same exact version.
- Fix transitive advisories with entries in `pnpm-workspace.yaml` `overrides`.

## Conventions

- Commits follow Conventional Commits (enforced by cocogitto in the `commit-msg` hook).
- Pre-commit hooks format with biome, dprint and keep-sorted. Don't bypass them.

## Tests

- Playwright E2E suite in `e2e/`, config in `playwright.config.ts`. It runs on every PR via `.github/workflows/e2e.yml`.
- Locally: `pnpm up`, `pnpm seed`, `pnpm dev`, then `pnpm test:e2e`. The suite reuses the running Strapi on `:1337`.
- Global setup logs in as the seeded admin and mints a full-access API token. Specs talk to Strapi over HTTP and verify writes by reading Postgres directly (`withDb` in `e2e/support.ts`).
- Response bodies and DB rows are attached to the report as JSON artifacts.
- Retries are disabled on purpose.
- Browsers come from `pkgs.playwright-driver.browsers` in `flake.nix`. Keep `@playwright/test` at the exact version of `playwright-driver` in the locked nixpkgs. Bump both together when updating `flake.lock`.

## Testing Philosophy

- **NEVER write unit tests after you write code.** Unit tests written after the
  fact tend to just re-describe the implementation rather than verify
  behavior.
- **Highly prefer E2E tests as the sole testing mechanism.** Use them to
  verify complex features work end-to-end. At the end of an E2E test, produce
  a verifiable and repeatable artifact (e.g. a downloaded/verified file, a
  persisted DB row, an API response fixture) rather than just asserting a
  process exited cleanly.
- **If you must test a system in isolation**, first write down all the ways
  it could fail, _then_ write the code to guard against those failure modes.
  Do not write the code first and backfill unit tests against it.
- **When writing an E2E test, don't pick the simplest possible scenario to
  prove the happy path works.** Pick a medium-to-hard scenario when verifying
  the work.
- **NEVER loosen an assertion to make a failing test pass.** Widening an
  expected value (`== Pending` to `Pending | Downloading`), switching to a
  negative check (`!= X`), adding a tolerance or retry, or marking a test
  `#[ignore]` all hide the failure instead of explaining it. When a test
  fails, find out whether the code or the test is wrong. If the test is
  racy, make it deterministic (pause the module under test, seed the state
  directly, poll a bounded condition) rather than accept every outcome. If
  loosening really is the right call, stop: explain to the user why, what
  the weaker assertion no longer catches, and what the alternatives are,
  and wait for their approval before changing it.
