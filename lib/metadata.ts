import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { images } from "@/lib/images";

const defaultOgImage = images.dentalHero;

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      id: absoluteUrl("/"),
      en: absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: [siteConfig.localeAlternate],
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Klinik Gigi Premium`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "health",
};

export const privateRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function pageMetadata(overrides: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const path = overrides.path ?? "/";
  return {
    title: overrides.title,
    description: overrides.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: overrides.title,
      description: overrides.description,
      url: absoluteUrl(path),
    },
    twitter: {
      title: overrides.title,
      description: overrides.description,
    },
    ...(overrides.noIndex ? { robots: privateRobots } : {}),
  };
}
