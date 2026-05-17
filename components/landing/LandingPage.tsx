import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Team } from "@/components/landing/Team";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
