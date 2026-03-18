# Portfolio Website (Next.js + Tailwind)

This repository contains a production-ready portfolio starter that is designed for a Figma-to-code workflow with Codex.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4
- ESLint
- Responsive component architecture with typed content models

## Project structure

- `src/content/site.ts`: single source of truth for name, copy, nav, links, projects, and SEO metadata.
- `src/components/primitives/*`: reusable UI building blocks (`Button`, `Card`, `Section`, `Container`).
- `src/components/sections/*`: portfolio sections (`Hero`, `About`, `Projects`, `Contact`, `Footer`).
- `src/app/api/contact/route.ts`: contact form endpoint with validation and optional webhook forwarding.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize content quickly

Edit `src/content/site.ts`:

- Update personal info (`name`, `role`, `location`, `availability`, `email`)
- Replace placeholder project cards (`projects`)
- Replace social and navigation links
- Update SEO values (`siteName`, `description`, `url`, `keywords`)

## Configure contact form forwarding (optional)

If you want submissions to forward to your own endpoint:

```bash
CONTACT_WEBHOOK_URL=https://your-endpoint.example.com
```

Without that env var, the API still validates input and returns success locally.

## Codex workflow for Figma parity

Use this loop section-by-section:

1. Share one Figma frame (or exported screenshot) plus acceptance criteria.
2. Ask Codex to patch only one section (for example: `Hero`).
3. Run locally, compare with Figma at mobile/tablet/desktop.
4. Share visual diffs, then ask Codex for targeted fixes.
5. Repeat for `About`, `Projects`, `Contact`, then global polish.

## Production checklist

- Replace placeholder `https://example.com` links in `src/content/site.ts`.
- Set `NEXT_PUBLIC_SITE_URL` in production for canonical/open-graph accuracy.
- Run checks:

```bash
npm run lint
npm run build
```
