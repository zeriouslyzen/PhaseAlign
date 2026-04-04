# Phase Alignment

High-performance e-commerce store: herbal blends, wholesale herbs, performance supplements, and health tech. Next.js (App Router), Vercel-ready, with Stripe checkout and Auth.js.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Auth.js (NextAuth v5)** – GitHub sign-in; guest checkout supported
- **Stripe** – Checkout (card, Cash App, Link, crypto)
- **Framer Motion** – Animations
- **Tailwind CSS** – Design system (white, yellow, gray, black)

## Getting started

```bash
npm install
# Create .env.local (gitignored) with the variables below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create **`.env.local`** in the project root (do not commit it). Commonly used:

- **AUTH_SECRET** – Generate with `openssl rand -base64 32`
- **AUTH_GITHUB_ID** / **AUTH_GITHUB_SECRET** – [GitHub OAuth](https://github.com/settings/developers)
- **ALLOWED_ADMIN_EMAILS** – Comma-separated emails allowed for `/admin` (optional; see `auth.ts`)
- **STRIPE_SECRET_KEY** – Stripe Dashboard → Developers → API keys
- **STRIPE_WEBHOOK_SECRET** – Stripe → Webhooks → signing secret for `checkout.session.completed` → `/api/webhooks/stripe`
- **NEXT_PUBLIC_BASE_URL** – e.g. `http://localhost:3000` locally; production URL on Vercel (Stripe success/cancel redirects, canonicals)

Optional: `STRIPE_FLAT_SHIPPING_CENTS`, `CHECKOUT_ALLOWED_COUNTRIES`, `STRIPE_AUTOMATIC_TAX`, `STRIPE_ALLOW_PROMOTION_CODES`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `ORDERS_JSON_PATH` (see `lib/checkout-config.ts` and `lib/orders-store.ts`).

## Features

- Home: hero, category strip, featured products, trust bar, CTA
- Shop: category filter, search, product grid
- Product detail: add to cart, sticky quick-pay bar (mobile)
- Cart: quantity controls, checkout CTA
- Checkout: guest (email only), redirect to Stripe (card, Cash App, Link, crypto)
- Success: order reference, cart cleared
- Account: sign in with GitHub; order history / saved methods placeholder (requires DB)

## Project structure

- `app/` – Routes (home, shop, products, cart, checkout, account)
- `components/` – UI, layout, sections, cart, providers
- `lib/` – Products, cart helpers, Stripe, types
- `data/` – Static products and categories (JSON)
- `auth.ts` – Auth.js config

## Deploy on Vercel

1. **Push to GitHub**
   - From the project root: `git init`, `git add .`, `git commit -m "Initial commit"`, then create a repo on GitHub and push (`git remote add origin <url>`, `git push -u origin main`).
   - Ensure `.env` and `.env.local` are not committed (they are in `.gitignore`).

2. **Vercel**
   - [Vercel](https://vercel.com) → New Project → Import your GitHub repo.
   - Framework preset: Next.js (auto-detected). Root directory: `./`. Deploy.

3. **Environment variables** (Vercel → Project → Settings → Environment Variables)
   - Mirror the variables listed in **Environment variables** above. For production:
     - `AUTH_SECRET` – use a new value from `openssl rand -base64 32`.
     - `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` – from [GitHub OAuth](https://github.com/settings/developers); set callback URL to `https://<your-vercel-domain>/api/auth/callback/github`.
     - `STRIPE_SECRET_KEY` – Stripe live or test key.
     - `NEXT_PUBLIC_BASE_URL` – `https://<your-vercel-domain>.vercel.app` (or your custom domain).
   - Redeploy after adding env vars.

4. **Optional**
   - Stripe webhooks: point `checkout.session.completed` to `https://<your-domain>/api/webhooks/stripe` and set `STRIPE_WEBHOOK_SECRET` in Vercel.
   - Custom domain: Vercel → Project → Settings → Domains.
