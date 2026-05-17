/** Konfigurasi situs — SEO & metadata */
export const siteConfig = {
  name: "Arcade Dental",
  legalName: "Arcade Dental Klinik Gigi",
  title: "Arcade Dental | Klinik Gigi Premium & Sistem ERP",
  description:
    "Klinik gigi premium di Jakarta dengan perawatan modern, dokter spesialis, dan sistem ERP terintegrasi untuk janji temu, pasien, dan billing.",
  descriptionEn:
    "Premium dental clinic with modern care, specialist doctors, and integrated ERP for appointments, patients, and billing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id_ID",
  localeAlternate: "en_US",
  email: "info@arcadedental.com",
  phone: "+62-21-5550-8888",
  address: {
    street: "Jl. Arcade No. 88",
    city: "Jakarta Selatan",
    postalCode: "12345",
    country: "ID",
  },
  keywords: [
    "klinik gigi",
    "dental clinic",
    "Arcade Dental",
    "perawatan gigi Jakarta",
    "dokter gigi",
    "janji temu gigi",
    "bleaching gigi",
    "ortodonti",
    "ERP klinik",
  ],
  twitterHandle: "@arcadedental",
} as const;

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p === "/" ? "" : p}`;
}
