# SEO, indexability, and external integrations

This document describes the site’s SEO setup, accessibility metadata, and how to extend it for Google Merchant Center, product feeds, and other integrations.

## What is in place

### Metadata and crawlability

- **Root layout** (`app/layout.tsx`): `metadataBase`, title template (`%s | Phase Alignment`), default description, keywords, Open Graph (type, locale, url, siteName, title, description), Twitter card, `robots` (index/follow, `googleBot`), and default canonical.
- **Per-page**: Unique `title`, `description`, `openGraph` (title, description, url), and `alternates.canonical` on home, shop, learn, stacks, partner, about, contact, and every product page.
- **Product pages**: In addition, `openGraph.images` with absolute image URL and `alt`; canonical set to the product URL.
- **robots.txt** (`app/robots.ts`): Allows `/`, disallows `/admin`, `/api`, `/checkout`; references sitemap.
- **Sitemap** (`app/sitemap.ts`): Home, shop, learn, stacks, partner, about, contact, cart, account, and all product URLs with priorities and change frequencies.

All of the above are server-rendered in the HTML so Google, Bing, and AI crawlers can read them without executing JavaScript.

### Structured data (JSON-LD)

- **Organization** (root): name, url, logo, description, `@id`, ContactPoint (email).
- **WebSite** (root): name, url, description, publisher, inLanguage.
- **Product** (product pages): name, description, image (absolute URL), url, brand, offers (price, currency, availability, condition).
- **BreadcrumbList** (product pages): Home → Shop → Product name.

Product schema matches [Google’s Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) and is suitable for Shopping and Merchant Center once a feed is connected.

### Accessibility

- **Skip link**: “Skip to main content” at top of body; visible on focus; targets `#main-content`.
- **Landmarks**: `<main id="main-content" role="main">`, `<header role="banner">`, `<footer role="contentinfo">`, `<nav aria-label="...">` where appropriate.
- **Forms**: Newsletter form has `aria-labelledby`, `aria-describedby` for error, `aria-busy` on submit; email input has `aria-label` and `autoComplete="email"`.
- **Images**: Product images use descriptive `alt` (product name) and explicit `width`/`height` where applicable. Decorative hero images use `alt=""`.
- **Breadcrumb**: Product breadcrumb nav has `aria-label="Breadcrumb"`.
- **Live region**: Newsletter error message uses `role="alert"` so it is announced.

No visual design was changed; only markup and metadata were added.

---

## Extending for Google and other channels

### Google Merchant Center / Shopping

To surface products in Google Shopping or other Google surfaces:

1. **Product schema**  
   Already present on each product page. Ensure product URLs and image URLs are absolute and stable (they are built from `NEXT_PUBLIC_BASE_URL` and `lib/site.ts`).

2. **Product feed**  
   Merchant Center typically needs a feed (e.g. XML, CSV, or Content API). Options:
   - **Dynamic feed route**: Add an API route or server-rendered page (e.g. `/api/feed/products.xml` or `/feed/products.xml`) that reads from the same source as the site (e.g. `lib/products` or your CMS) and outputs [Google’s required product attributes](https://support.google.com/merchants/answer/7052112): id, title, description, link, image link, price, availability, condition, brand, etc.
   - **Stored feed file**: Generate a static feed file at build time (e.g. via a script that calls `getProducts()` and writes XML/CSV) and host it at a stable URL; point Merchant Center at that URL.

3. **Eligibility**  
   Comply with [Shopping ads policies](https://support.google.com/merchants/answer/6149970) (checkout, returns, contact info, etc.). The site already exposes contact (e.g. contact page, Organization schema contactPoint).

4. **Optional: product identifiers**  
   If you have GTIN, MPN, or brand codes, add them to the Product JSON-LD and to the feed when you build it.

### Other product feeds and marketplaces

- **Facebook / Meta Catalog**: Same idea as Merchant Center: product feed (CSV or API) with required fields; can reuse the same product data and image URLs.
- **Amazon, eBay, etc.**: Each has its own feed format; the existing product schema and canonical URLs give you a single source of truth to map into their templates.

### AI and search crawlers

- **OpenAI, Perplexity, etc.**: They generally consume the same HTML and meta tags as Google. Keeping titles, descriptions, and JSON-LD accurate and keyword-rich (without stuffing) helps.
- **Optional**: If you add an official API or docs site, you can expose it via `sameAs` in Organization schema and/or a dedicated doc sitemap.

### Local and app integrations

- **Google Business Profile**: If you have a physical location or local intent, add [LocalBusiness](https://schema.org/LocalBusiness) (or a subtype) JSON-LD and link it from Organization if appropriate.
- **PWA / app stores**: For future app or PWA listings, reuse the same metadata (title, description, image) and keep product and site URLs stable.

---

## Configuration

- **Base URL**: Set `NEXT_PUBLIC_BASE_URL` in production (e.g. `https://phasealignment.com`). Used for canonicals, sitemap, robots, Open Graph URLs, and JSON-LD. Default in code is `https://phasealignment.com`.
- **Contact**: Organization and contact page use `signal@jackdanger.dev`. Update in `lib/site.ts` (or env) and in `components/seo/OrganizationWebSiteSchema.tsx` if you centralize contact data.

---

## Files reference

| Purpose              | Location |
|----------------------|----------|
| Base URL, canonical  | `lib/site.ts` |
| Root metadata        | `app/layout.tsx` |
| Organization/WebSite schema | `components/seo/OrganizationWebSiteSchema.tsx` |
| Product + Breadcrumb schema | `components/seo/ProductSchema.tsx` |
| JSON-LD helper      | `components/seo/JsonLd.tsx` |
| Sitemap              | `app/sitemap.ts` |
| Robots               | `app/robots.ts` |
| Skip link + main id  | `app/layout.tsx`, `app/globals.css` (.skip-link), `ConditionalSiteLayout.tsx` |

Adding a new product feed (e.g. for Merchant Center) can be done by creating a route that reads from `getProducts()` (or your data layer) and outputs the required feed format, using `canonical()` and `absoluteImage()` from `lib/site.ts` for URLs.
