# PayMongo API Dashboard

A small Next.js developer tool for testing PayMongo checkout-session and
webhook workflows with a test secret key.

The app is meant for local API verification during payment-gateway integration.
It lets a developer paste a PayMongo secret key into the UI, fetch webhook
records, enable or disable existing webhooks, and create a test checkout
session using the app's sample payload.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Radix UI primitives
- TanStack Table
- Zustand
- Axios
- PayMongo API

## Requirements

- Node.js 20 or another current LTS version
- npm
- A PayMongo test secret key for authenticated API verification

## Setup

Install dependencies:

```bash
npm install
```

No local environment file is required for the main browser workflow. The
PayMongo secret key is entered in the password field on the page and is held in
client state for the current session. Checkout-session creation is sent through
the local Next.js API route at `/api/checkout-sessions` so the PayMongo POST
request runs server-side instead of from the browser.

Use a PayMongo test secret key only. Do not commit PayMongo credentials, live
keys, webhook secrets, or copied API responses that contain sensitive data.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Docker

The project provides two Docker Compose workflows based on the established
Better Ecommerce Admin pattern:

- `docker-compose.yml` runs the development target with source bind mounts and
  hot reload.
- `compose.prod.yaml` builds and runs the minimal standalone production image
  without source bind mounts.

Docker Compose uses `APP_PORT` with a default of `3000`. Configuration is
optional for this project; copy the example only when that default port is
already in use:

```bash
cp .env.example .env
```

Start development with Docker:

```bash
docker compose up --build
```

Open `http://localhost:3000`, then stop the development stack with:

```bash
docker compose down
```

Run a production-like local check with:

```bash
docker compose -f compose.prod.yaml up --build
```

Stop it with:

```bash
docker compose -f compose.prod.yaml down
```

The optional `.env` file configures Docker Compose interpolation only. Do not
place PayMongo secret keys in it: enter a PayMongo test secret key in the UI
for each verification session.

Verified on 2026-06-20: both Compose files pass `docker compose config
--quiet`, build successfully, and serve the app at `http://localhost:3000`.

## Lint

Run the Next.js lint check:

```bash
npm run lint
```

Verified on 2026-06-19 by user confirmation: this command succeeds with no
warnings or errors.

## Build

Create a production build:

```bash
npm run build
```

Verified on 2026-06-19 by user confirmation: this command succeeds.

To run the built app locally:

```bash
npm run start
```

## Verification

Use a PayMongo test secret key for all API checks.

1. Start the app with `npm run dev`.
2. Open `http://localhost:3000`.
3. Paste the PayMongo test secret key into the secret-key field.
4. On the Webhooks tab, click **Get Webhooks**.
5. Confirm the webhook table loads existing webhook records, if the test
   account has any.
6. Use the row action menu to copy a webhook URL or ID.
7. Enable or disable a webhook only when it is safe to mutate the test account.
8. On the Checkout Session tab, click **Test Checkout Session**.
9. Confirm the app returns a PayMongo checkout URL and opens it in a new tab.

If the PayMongo account has no webhooks, the webhook table may remain empty
even when the request succeeds.

## Current Limitations

- This is a local developer utility, not a hosted multi-user dashboard.
- The Create Webhook button is present in the UI but is not wired to a create
  workflow yet.
- Checkout-session creation uses a hard-coded sample billing and line-item
  payload in `lib/paymongo.ts`.
- The sample checkout flow uses placeholder success and cancel URLs.
- Docker is intended for local development and production-like image checks;
  it is not a deployment configuration.

## Useful Files

- `app/(root)/(routes)/page.tsx` - main UI
- `app/api/checkout-sessions/route.ts` - local server route for creating
  checkout sessions without browser CORS issues
- `hooks/use-paymongo.ts` - client state and UI actions
- `lib/paymongo.ts` - PayMongo API helpers and sample checkout payload
- `components/data-tables/webhooks/` - webhook table columns and row actions
