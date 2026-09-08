# MCD Combined App

This package combines the functions shown in the supplied MissionChief Dispatchers screenshots into one responsive web app:

- Main alliance website / regional navigation
- Rules & verification page
- Rule acceptance records
- Shared infrastructure / building requests
- **Training requests** (placeholder types — expand per server as needed)
- **Alliance Google Maps** page (links to the shared map)
- Admin control room
- Admin rule editing
- Alliance avatar upload/preview
- Verification, building-request, and training-request tables

## Important
This is a standalone front-end build. It stores data in the browser with localStorage, so records are NOT shared between different users/devices yet.

For true multi-user operation, the next step is to connect the app to a shared database (for example Supabase) and a secure server endpoint for the Discord webhook. The Discord webhook secret must never be placed in browser JavaScript.

## Publishing
Because this is plain HTML/CSS/JavaScript, it can be published on any static host that supports a ZIP/folder upload or Git repository.

Open `index.html` locally to test it.

## Pages
| Hash | Page |
|------|------|
| `#home` | Main landing |
| `#rules` | Rules + verification form |
| `#request` | Building request form |
| `#training` | Training request form |
| `#maps` | Alliance Google Map link |
| `#admin` | Admin control room |

