/**
 * Renders a JSON-LD script tag for structured data (Organization, WebSite, Product, etc.).
 * Crawlers and AI indexers consume this for rich results and knowledge panels.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
