import { JsonLd } from "./JsonLd";
import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/site";

/**
 * Organization and WebSite structured data for the root layout.
 * Supports rich results, sitelinks, and knowledge panels.
 */
export function OrganizationWebSiteSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
    description: DEFAULT_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "signal@jackdanger.dev",
      availableLanguage: "English",
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-US",
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={webSite} />
    </>
  );
}
