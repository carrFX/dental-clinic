import { absoluteUrl, siteConfig } from "@/lib/site";
import { images } from "@/lib/images";

export function getDentalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DentalClinic",
        "@id": `${absoluteUrl("/")}#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: absoluteUrl("/"),
        image: images.dentalHero,
        logo: absoluteUrl("/icon.svg"),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -6.2615,
          longitude: 106.8106,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "20:00",
          },
        ],
        priceRange: "$$",
        medicalSpecialty: "Dentistry",
        sameAs: [absoluteUrl("/")],
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: ["id", "en"],
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}#webpage`,
        url: absoluteUrl("/"),
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "id",
      },
    ],
  };
}
