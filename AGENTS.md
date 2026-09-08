# Base44 Dev Environment

## Stack
Static front-end (`index.html`, `app.js`, `styles.css`) served by nginx, plus a small Node.js webhook proxy (`server.js`) that forwards form submissions to Discord. No database — all app data is in `localStorage` (key `mcd_combined_v1`).

## Architecture
- **web** (nginx:alpine, port 3000): serves static files and proxies `/api/` to the webhook service.
- **webhook** (node:22-alpine, port 3001 internal): receives POST `/api/webhook` with `{ type, data }`, formats a Discord embed, and forwards to the matching Discord webhook URL. Webhook URLs are stored as env vars (secrets), never in browser JS.

## Webhook types
- `rules` → `WEBHOOK_RULES`
- `building` → `WEBHOOK_BUILDING`
- `training` → `WEBHOOK_TRAINING_US` / `WEBHOOK_TRAINING_UK` / `WEBHOOK_TRAINING_AU` (selected by the `server` field in the data)

## Secrets
All five `WEBHOOK_*` vars are Discord webhook URLs, delivered via `/run/base44/app.env`. The app boots fine without them (webhook calls return an error but forms still save to localStorage).

## Running
`docker compose -f docker-compose.base44.yml up -d` — nginx depends on the webhook service being healthy.

## Verification
- `curl -s http://localhost:3000/` returns the HTML page.
- `curl -s -X POST http://localhost:3000/api/webhook -H 'Content-Type: application/json' -d '{"type":"rules","data":{}}'` returns an error if secrets aren't set, or forwards to Discord if they are.
