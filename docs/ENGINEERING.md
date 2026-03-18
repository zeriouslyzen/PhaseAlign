# Engineering Documentation: Phase Alignment

## Overview
Phase Alignment is a high-performance e-commerce platform specializing in herbal blends, performance supplements, and health technology. The application is built with a "Physiology First" philosophy, combining ancient wisdom with modern science.

## Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Animations**: Framer Motion
- **Authentication**: Auth.js (NextAuth v5)
- **Payments**: Stripe (Checkout, Elements)
- **State Management**: React Context (Cart)
- **Deployment**: Vercel

## Architecture

### Directory Structure
- `app/`: Contains the application routes, layouts, and global styles.
- `components/`: Modular UI components, layout sections, and SEO providers.
- `lib/`: Core logic, including product data fetchers, Stripe utilities, and site constants.
- `data/`: Static JSON data for products and categories.
- `context/`: React context providers (e.g., `CartContext`).

### Routing
The project uses the Next.js App Router. Key routes include:
- `/`: Home page with hero and featured products.
- `/shop`: Catalog with filtering and search capabilities.
- `/products/[slug]`: Dynamic product detail pages.
- `/cart`: Shopping cart management.
- `/checkout`: Stripe-integrated checkout flow.
- `/admin`: Administrative dashboard for product management.

## Key Systems

### State Management (Cart)
The `CartContext` manages the shopping cart state. It persists data to `localStorage` and provides methods for adding, updating, and removing items.
- File: `context/CartContext.tsx`

### Authentication
Auth.js handles user sessions, primarily using the GitHub provider.
- File: `auth.ts`, `app/api/auth/[...nextauth]/route.ts`

### SEO & Accessibility
Phase Alignment implements robust SEO and accessibility features:
- **Metadata**: Dynamic title and description generation.
- **Structured Data**: JSON-LD for Organization, WebSite, and Product schemas.
- **Sitemap & Robots**: Automated generation via `sitemap.ts` and `robots.ts`.
- **Accessibility**: Skip links, semantic HTML, and ARIA labels.

## Development Workflow

### Useful Commands
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint to ensure code quality.

### Code Standards
- Use functional components and hooks.
- Follow the established Tailwind CSS design system in `globals.css`.
- Ensure all new pages include appropriate metadata and schema.
