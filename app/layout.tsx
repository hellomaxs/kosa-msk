import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema, faqSchema } from "@/lib/schema";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Наращивание волос в Москве — премиальные натуральные волосы | KOSA-MSK",
  description:
    "Продажа премиальных натуральных волос и наращивание в Москве. Длины 40–70 см, подбор оттенка по фото, без силикона и химической обработки.",
  keywords: [
    "наращивание волос Москва",
    "купить натуральные волосы",
    "волосы на срезе",
    "капсульное наращивание",
    "премиальные волосы для наращивания",
    "коррекция наращивания",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "KOSA-MSK",
    title: "Наращивание волос в Москве — премиальные натуральные волосы",
    description:
      "Премиальные натуральные волосы длиной 40–70 см и наращивание в Москве. Подбор оттенка по фото.",
    images: [{ url: "/img/hero.webp", width: 2000, height: 1333 }],
  },
  other: {
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={faqSchema} />
      </body>
    </html>
  );
}
