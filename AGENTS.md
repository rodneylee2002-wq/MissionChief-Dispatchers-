# Base44 Dev Environment

## Stack
Pure static front-end: `index.html`, `app.js`, `styles.css`. No build step, no backend, no database. All data is stored in the browser via `localStorage` (key `mcd_combined_v1`).

## Running
Served by `nginx:alpine` on host port 3000 via `docker-compose.base44.yml`. The repo root is bind-mounted read-only into the container, so edits to the source files appear on browser refresh — no rebuild needed.

## Verification
- `curl -s http://localhost:3000/` should return the HTML page containing `MISSIONCHIEF`.
- No secrets or external credentials are required.
