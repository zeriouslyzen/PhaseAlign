# Phase Alignment – Audit Summary

Audit scope: users, paths, admin, security, SEO, UI/nav. Last updated after implementing fixes below.

---

## Browser verification (mandatory)

**Rule:** Every UI, layout, or visual change must be verified in the browser before marking done. Use cursor-ide-browser: navigate or reload to the relevant URL, then snapshot + screenshot. Report what you see; do not assume.

**Last browser check:** Homepage at `http://localhost:3000/` (after nav metrics + dropdown):
- Header: 5rem bar; logo centered; nav uses 8px-grid padding (px-4 / px-6). Menu trigger: 44px min-height, 12px gap to chevron, 0.06em letter-spacing; right-aligned.
- Dropdown: glass panel (backdrop blur, dark bg), gradient accent line on top, metric padding (--nav-dropdown-item-px/py), divider gradient; items Shop, Account, Cart; open/close animation 0.2s ease-out.
- Hero and sections present; page loads.

If your browser shows something different (blank page, old logo, wrong port): hard refresh (Cmd+Shift+R), confirm dev server is running on 3000, or run `rm -rf .next && npm run dev` then reload.

---

## Code audit: nav and logo (where it is controlled)

If the nav or logo does not update in the browser, the following files are the only ones that render them. Edits must be in these places; then clear build cache and hard-refresh.

| What | File | Lines (approx) |
|------|------|----------------|
| Layout wraps Header (not on /admin) | `components/layout/ConditionalSiteLayout.tsx` | 4, 20 |
| Nav bar + logo wrapper | `components/layout/Header.tsx` | 36–77 (header height 4.5rem, SVG, grid, logo wrapper) |
| Logo text + collapse to "Align" | `components/ui/PhaseAlignmentLogo.tsx` | 9–59 (text, font, paddingBottom) |
| Hero overlap with nav | `components/sections/Hero.tsx` | -mt-[4.5rem], pt-[9rem] |
| Logo + nav styles | `app/globals.css` | .logo-wrapper-nav, .logo-pulse (see below) |

**Logo:** Header uses a 3-column grid (`grid-cols-[1fr_auto_1fr]`); logo sits in the center column. `.logo-wrapper-nav` in `globals.css` uses `transform: translateY(-18px)` and `padding-bottom: 14px` so the "g" descender is not clipped. Logo font is Orbitron (`--font-logo`); `.logo-pulse` adds letter-spacing, glow, and stroke.

**After changing any of the above:** From project root run `rm -rf .next` then `npm run dev`. In the browser do a hard refresh (Cmd+Shift+R or Ctrl+Shift+R). Then verify in browser (see Browser verification above).

---

## UI / Nav (logo and bar)

- **Nav bar:** Header height 4.5rem; SVG bar and formulas clipped to curve (`clipPath`). Hero uses `-mt-[4.5rem]` and `pt-[9rem]` so background runs under nav and content starts below the bar.
- **Logo ("Phase Alignment" / "Align"):** Centered via 3-column grid; scroll collapse to "Align" after 72px. Orbitron font (cyber style), letter-spacing 0.2em, glow pulse. `.logo-wrapper-nav`: `translateY(-18px)`, `padding-bottom: 14px` so "g" is not clipped.
- **If logo "g" still clips:** Hard refresh; clear build cache (`rm -rf .next` then `npm run dev`). If still clipped, increase `padding-bottom` in `.logo-wrapper-nav` or the translateY value in globals.css.

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
