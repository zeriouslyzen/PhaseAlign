# Phase Alignment – Audit Summary

Audit scope: users, paths, admin, security, SEO. No design changes. Last updated after implementing fixes below.

---

## Paths (routes)

| Path | Purpose | Status |
|------|--------|--------|
| `/` | Home | OK |
| `/shop` | Shop catalog, filters, search | OK |
| `/cart` | Cart, quick pay | OK |
| `/account` | Sign in (GitHub), sign out, admin redirect message | OK |
| `/checkout` | Checkout form, redirect to Stripe | OK |
| `/checkout/success` | Order confirmed, clear cart | OK |
| `/products/[slug]` | Product detail, add to cart | OK |
| `/admin` | Admin dashboard | OK |
| `/admin/products` | Product list, Edit / View / Remove | OK |
| `/admin/products/add` | Add product form | OK |
| `/admin/products/[id]/edit` | Edit product form | OK |
| `/admin/orders` | Link to Stripe Dashboard | OK |
| `/api/auth/[...nextauth]` | NextAuth handlers | OK |
| `/api/checkout` | Create Stripe Checkout session | OK (validates server-side) |
| `/api/admin/products` | List, create products | OK |
| `/api/admin/products/[id]` | Get, update, delete product | OK |

Missing pages considered but not required for MVP: privacy policy, terms of service, contact. Add under `/legal` or `/policies` when needed.

---

## Users

- **Auth:** NextAuth v5, GitHub provider. Sign-in at `/account`; session used for account UI and admin access.
- **Admin access:** `ALLOWED_ADMIN_EMAILS` (comma-separated). Empty = any signed-in user is admin. Set in production to restrict.
- **Guest checkout:** Supported; no account required for cart or checkout.
- **Account page:** Sign in, sign out, AdminRequired message. Order history placeholder for future DB.

---

## Admin

- **Protection:** Admin layout and all admin API routes check session + `isAdmin` (or `SKIP_ADMIN_AUTH=1` in dev).
- **Tools:** Dashboard, Products (list + edit + delete), Add product, Orders (Stripe link).
- **Data:** Products read/write via `lib/admin/products-data.ts` (JSON file). Modular; can swap to DB later.
- **Dev bypass:** `SKIP_ADMIN_AUTH=1` in development only; do not use in production.

---

## Security

- **Checkout:** Prices and product names are no longer taken from the client. API uses `readProducts()`, validates each `productId`, and builds Stripe line items from server-side price and name. Quantity capped (1–99).
- **Admin APIs:** All require auth + isAdmin (or dev bypass). No public write access.
- **Auth:** `AUTH_SECRET` required in production (fallback only for dev). `trustHost: true` set for deployment behind a proxy.
- **Robots:** `/admin` and `/api` disallowed in `robots.ts`. Checkout disallowed via layout `robots: noindex, nofollow`.
- **Recommendations:** Set `AUTH_SECRET` and `ALLOWED_ADMIN_EMAILS` in production. Remove or never set `SKIP_ADMIN_AUTH` in production. Add rate limiting on `/api/checkout` and auth endpoints if needed.

---

## SEO

- **Root:** `layout.tsx` – title and description set.
- **Shop:** `shop/page.tsx` – metadata (title, description).
- **Product:** `products/[slug]/page.tsx` – `generateMetadata` (title, description, openGraph) from product.
- **Cart / Account / Checkout:** Layout metadata for title (and description where relevant). Checkout layout has `robots: noindex, nofollow`.
- **Sitemap:** `app/sitemap.ts` – dynamic; home, shop, cart, account, product URLs. Uses `readProducts()` so admin-added products are included.
- **Robots:** `app/robots.ts` – allow `/`, disallow `/admin`, `/api`, `/checkout`; sitemap URL set. Set `NEXT_PUBLIC_BASE_URL` in production for correct sitemap/robots URLs.

---

## Error and 404

- **404:** `app/not-found.tsx` – custom “Page not found” with link home.
- **Error boundary:** `app/error.tsx` – “Something went wrong” with Try again and Go home.

---

## Implemented in this pass

1. **Security:** Checkout API validates product IDs and uses server-side price and name; quantity capped.
2. **SEO:** Product and shop metadata; sitemap (dynamic); robots; cart/account/checkout layout metadata.
3. **UX:** Global not-found and error pages.
4. **Auth:** `trustHost: true` for production.

---

## Optional next steps (not done)

- Middleware to force HTTPS or add security headers.
- Rate limiting (e.g. on checkout and auth).
- Privacy/Terms pages and links in footer.
- Stripe webhook to persist orders and show them in admin.
- Database for products/orders and move off JSON file.
