# PayMongo API Dashboard TODO

Last updated: 2026-06-19

## Project

- Name: PayMongo API Dashboard
- Path: `/home/reannu123/Projects/Scratch/paymongo-api-dashboard`
- Status: active
- Stage: revival
- Branch: `main`
- Portfolio role: API testing dashboard and internal payment-operations tool

## Current Milestone

Revive the existing PayMongo developer dashboard as a runnable, documented
tool for testing PayMongo checkout-session and webhook workflows with a test
API key.

This milestone is about proving the existing API-tooling workflow. It does not
include building a full PayMongo replacement dashboard, storing live payment
secrets, adding multi-user auth, or expanding every PayMongo endpoint.

## Definition Of Done

- [ ] Another developer can install dependencies and run the Next.js app.
- [ ] `npm run lint` and `npm run build` pass.
- [ ] The documented secret-key workflow is clear and does not require
      committing credentials.
- [ ] The main workflow has been smoke-tested with PayMongo test credentials:
      enter an API key, fetch webhooks, enable or disable a webhook when safe,
      and create a test checkout session.
- [ ] The starter Next.js README is replaced with project-specific setup,
      purpose, stack, limitations, and verification instructions.
- [ ] Docker setup is either verified and documented or explicitly deferred
      with a reason.
- [ ] The revived state is merged or pushed through a clear GitHub trail.

## Now

- [ ] Run `npm run lint` and `npm run build` to establish the current baseline.
- [ ] Replace the starter README with project-specific PayMongo setup and
      verification instructions.
- [ ] Create `.env.example` or equivalent safe configuration notes for local
      ports and test-only API-key usage.

## Next

- [ ] Smoke-test the existing webhook list and checkout-session workflows with
      a PayMongo test secret key.
- [ ] Fix only issues that block the revival definition of done.
- [ ] Review the Dockerfile and Compose setup, then decide whether Docker is
      useful for this small tool.

## Later

- [ ] Add typed request/response coverage for more PayMongo endpoints only
      after the revival milestone is complete.
- [ ] Add safer request presets and example payloads for common test cases.
- [ ] Add authentication only if the tool becomes a deployed internal utility.
- [ ] Add screenshots or a short walkthrough for portfolio use after the app is
      runnable and documented.

## Blocked

- No confirmed blocker. A PayMongo test secret key is needed for authenticated
  API smoke tests, but lint/build/documentation can proceed without it.

## Done

- [x] Cloned repository locally on 2026-06-19 from
      `https://github.com/reannu123/paymongo-api-dashboard`.
- [x] Inspected repository on 2026-06-19: Next.js 14 app exists, README is
      still the default starter, current UI accepts a secret key, lists
      webhooks, can enable/disable webhooks, and can create a checkout session.
