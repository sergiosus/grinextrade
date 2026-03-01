# Grinex Trade LLC

Production-ready international export company website.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- SEO optimized (meta, OpenGraph, structured data)
- Multi-language: English, Russian, Arabic (RTL), Chinese, Turkish, Romanian
- Admin dashboard for product catalog (JSON storage)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects from `/` to the locale based on browser language (e.g. `/en`, `/ru`, `/ar`).

## Build & deploy

```bash
npm run build
npm start
```

Vercel: connect the repo and deploy. No extra config required.

## Routes

- `/` — redirects to `/{locale}` by browser language
- `/{locale}` — home (en, ru, ar, zh, tr, ro)
- `/{locale}/products` — product catalog
- `/{locale}/government` — government & tenders
- `/{locale}/about` — about
- `/{locale}/contact` — contact form
- `/admin` — admin dashboard (add/edit/delete products)

## Environment

Optional: `NEXT_PUBLIC_SITE_URL` for canonical URLs and sitemap (e.g. `https://grinextrade.com`).

---

**Grinex Trade LLC** — Global Export Supplier. Textile products and oil & gas components worldwide.
