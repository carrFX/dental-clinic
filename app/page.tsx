import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipToContent } from "@/components/seo/SkipToContent";
import { LandingPage } from "@/components/landing/LandingPage";
import { rootMetadata } from "@/lib/metadata";
import { getDentalClinicJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = rootMetadata;

export default function HomePage() {
  return (
    <>
      <SkipToContent />
      <JsonLd data={getDentalClinicJsonLd()} />
      <LandingPage />
    </>
  );
}
