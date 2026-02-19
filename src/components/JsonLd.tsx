import { company } from "@/content/company";
import { baseUrl } from "@/lib/site-url";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.companyName,
    legalName: company.legalName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: company.aboutText,
    taxID: company.inn,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Якутск",
      addressRegion: "Республика Саха (Якутия)",
      streetAddress: "проспект Ленина 4/2",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneHref,
      email: company.email,
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: "Russian",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    name: company.companyName,
    image: `${baseUrl}/logo.png`,
    url: baseUrl,
    telephone: company.phoneHref,
    email: company.email,
    taxID: company.inn,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Якутск",
      addressRegion: "Республика Саха (Якутия)",
      streetAddress: "проспект Ленина 4/2",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness),
        }}
      />
    </>
  );
}
