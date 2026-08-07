import { contacts, faq, siteUrl } from "@/lib/content";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${siteUrl}/#organization`,
  name: "KOSA-MSK",
  description:
    "Продажа премиальных натуральных волос и услуги наращивания в Москве.",
  url: siteUrl,
  telephone: contacts.phoneRaw,
  image: `${siteUrl}/img/hero.webp`,
  priceRange: "$$$",
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  sameAs: [contacts.telegramHref],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Наращивание волос",
        serviceType: "Капсульное и ленточное наращивание волос",
        areaServed: { "@type": "City", name: "Москва" },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Натуральные волосы на срезе",
        description:
          "Премиальный натуральный срез длиной 40–70 см в естественных оттенках.",
      },
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "KOSA-MSK",
  inLanguage: "ru-RU",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};
