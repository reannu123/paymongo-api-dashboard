# Case Study — PayMongo Operations Dashboard

**One line:** Turned a tool that only worked with a private API key into a
self-demoing operations dashboard anyone can clone and explore in seconds.

---

## The problem

The original was a developer utility: paste a PayMongo secret key, then fetch
webhooks or create a checkout session. It worked, but as a portfolio piece it
had a fatal flaw — **without a real PayMongo account it showed nothing.** A
recruiter or potential client opening it saw an empty form, and there was no way
to convey what the tool actually did.

It also had rough edges: the secret key was used from client state, the UI was a
single password box plus two buttons, and there was no sense of "operations" —
no payments, no totals, no health signals.

## The goal

Make it **instantly demoable with no account**, and grow it from a single-purpose
utility into a small, credible payment-operations dashboard — without losing the
ability to talk to the real PayMongo API.

## Approach

**1. Demo mode as a first-class path.** A server-side `isDemo(secretKey)` check
(empty / blank / `"demo"`) makes every API route return realistic mock data from
`lib/demo.ts`. Demo mode is on by default, so the app is fully explorable the
moment it loads.

**2. One code path, two data sources.** The browser always calls the app's own
Next.js API routes (`/api/payments`, `/api/webhooks`, `/api/checkout-sessions`)
with the current key. Each route branches: demo → mock data; real key → proxy
the live PayMongo API and map the response into the table shape. This also moved
the secret key off the client and onto the server.

**3. From utility to dashboard.** Added summary KPIs (gross/net volume, success
rate, payment count) computed by a pure, unit-tested `summarize()` function, a
sortable payments table with method/status badges, and a clean tabbed layout
(Payments / Webhooks / Checkout).

## Key decisions & trade-offs

- **Mock data over a sandbox key in the repo.** Shipping demo data means no
  secrets, no rate limits, and deterministic screenshots/CI — at the cost of the
  demo not being "live." Real mode covers the live case.
- **Server-side proxying.** Slightly more code than calling PayMongo from the
  browser, but the secret key never ships in the client bundle and CORS is a
  non-issue.
- **Static demo dataset.** Simple and deterministic; a future version could
  generate randomized-but-seeded data for variety.

## Outcome

- Runs with **zero configuration**: `npm install && npm run dev` shows a
  populated dashboard (gross ₱5,497.00, 83% success rate, 7 payments) with no
  PayMongo account.
- `next build` is clean; `summarize()` and demo-mode detection are unit tested
  (vitest); live mode proxies the real API behind the same routes.

## What this demonstrates

- **Product empathy** — recognizing that a portfolio tool must demo itself, and
  designing a demo mode that doesn't compromise the real integration.
- **Next.js app-router fluency** — server API routes, a clean client/server
  boundary, and safe handling of credentials.
- **Operations/dashboard UX** — KPIs, tabular data, and status semantics that
  mirror real payment-ops tooling (exactly the internal-tools work this is meant
  to advertise).
