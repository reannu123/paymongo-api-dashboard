# PayMongo API Dashboard TODO

Last updated: 2026-07-01 (public demo deployed)

## Project

- Name: PayMongo Operations Dashboard
- Path: `/home/reannu123/Projects/portfolio/paymongo-api-dashboard`
- Status: complete (flagship)
- Stage: remaster
- Branch: `main`
- Portfolio role: Flagship payment-operations dashboard — runs with no PayMongo
  account via demo mode

## Flagship Elevation — done 2026-06-20

- [x] Demo mode (default on): `lib/demo.ts` mock payments/webhooks/checkout +
      pure `summarize()`; API routes serve demo data when no/empty/"demo" key
      and proxy the live PayMongo API otherwise (key stays server-side).
- [x] Operations UI: summary KPIs (gross/net volume, success rate, count) +
      sortable payments table with method/status badges; Payments/Webhooks/
      Checkout tabs; demo banner + toggle.
- [x] Vitest unit tests for `summarize()` + `isDemo()`; `npm test` script.
- [x] README rewrite (ops-dashboard framing, demo mode, architecture, badges),
      `docs/CASE_STUDY.md`, MIT LICENSE, dashboard + webhooks screenshots.
- [x] `next build` clean; pushed public to `main` (61daf7a).
- [x] CI activated 2026-06-24 — `.github/workflows/ci.yml` pushed in
      `bc4f625`; first GitHub Actions CI run passed.
- [x] Public demo deployed 2026-07-01 at `https://paymongo.reannu.dev`:
      GHCR image `ghcr.io/reannu123/paymongo-api-dashboard:main`, pm-docker
      port `3023`, NPM proxy host `id=17`, local/public `/api/health` 200,
      public homepage 200, and browser smoke rendered the demo dashboard.
- [ ] Optional next: webhook event-log viewer, refund/void in live mode,
      date-range filters, CSV export.

## Current Milestone

Revive the existing PayMongo developer dashboard as a runnable, documented
tool for testing PayMongo checkout-session and webhook workflows with a test
API key.

This milestone is about proving the existing API-tooling workflow. It does not
include building a full PayMongo replacement dashboard, storing live payment
secrets, adding multi-user auth, or expanding every PayMongo endpoint.

## Definition Of Done

- [x] Another developer can install dependencies and run the Next.js app.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] The documented secret-key workflow is clear and does not require
      committing credentials.
- [x] The main workflow has been smoke-tested with PayMongo test credentials:
      enter an API key, fetch webhooks, enable or disable a webhook when safe,
      and create a test checkout session.
- [x] The starter Next.js README is replaced with project-specific setup,
      purpose, stack, limitations, and verification instructions.
- [x] Docker development and production-like workflows are verified and
      documented.
- [x] The revived state is merged or pushed through a clear GitHub trail.

## Now

- No active work. The revival milestone is complete.

## Next

- Choose and inspect the next queued revival before activating it.

## Later

- [ ] Add typed request/response coverage for more PayMongo endpoints only
      after the revival milestone is complete.
- [ ] Add safer request presets and example payloads for common test cases.
- [ ] Add authentication only if the tool becomes a deployed internal utility.
- [ ] Add screenshots or a short walkthrough for portfolio use after the app is
      runnable and documented.

## Blocked

- No confirmed blocker.

## Done

- [x] Cloned repository locally on 2026-06-19 from
      `https://github.com/reannu123/paymongo-api-dashboard`.
- [x] Inspected repository on 2026-06-19: Next.js 14 app exists, README is
      still the default starter, current UI accepts a secret key, lists
      webhooks, can enable/disable webhooks, and can create a checkout session.
- [x] Verified by user confirmation on 2026-06-19: the app is runnable,
      `npm run build` works, and the current product is a barebones API
      testing app.
- [x] Verified by user confirmation on 2026-06-19: `npm run lint` succeeds
      with no warnings or errors.
- [x] Replaced the starter Next.js README on 2026-06-19 with project-specific
      purpose, stack, setup, run, lint, build, credential-safety,
      verification, limitations, and useful-files sections.
- [x] Verified by user confirmation on 2026-06-19: the webhook workflow works
      with a PayMongo test secret key.
- [x] Fixed the checkout-session CORS issue on 2026-06-19 by moving the
      PayMongo checkout-session POST behind `/api/checkout-sessions`.
- [x] Verified on 2026-06-19 after the checkout-session route change:
      `npm run lint` passes and `npm run build` completes successfully.
- [x] Verified by user confirmation on 2026-06-19: checkout-session creation
      works after the local API-route CORS fix.
- [x] Replaced the incomplete Docker setup on 2026-06-20 with a multi-stage
      Next.js Dockerfile, development Compose workflow, and production-like
      Compose workflow modeled on Better Ecommerce Admin.
- [x] Added an optional `.env.example` on 2026-06-20 for Docker Compose port
      configuration only; PayMongo test keys remain per-session UI input and
      are not Docker environment configuration.
- [x] Verified on 2026-06-20: `docker compose config --quiet` and
      `docker compose -f compose.prod.yaml config --quiet` pass; both stacks
      build successfully and serve `http://localhost:3000`.
- [x] Merged GitHub PR #1 on 2026-06-20:
      `https://github.com/reannu123/paymongo-api-dashboard/pull/1`.
- [x] Added GHCR publishing and pm-docker deployment config on 2026-07-01:
      commit `8854bf7`; CI run `28464304045` passed and Docker Image CD run
      `28464304027` published the `main` image.
