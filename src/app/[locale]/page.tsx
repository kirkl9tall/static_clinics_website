import Hero from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats-section";
import AboutPreview from "@/components/sections/about-preview";
import NetworkGrid from "@/components/sections/network-grid";
import ServicesPreview from "@/components/sections/services-preview";
import TeamPreview from "@/components/sections/team-preview";
import Testimonials from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq-section";
import ContactSection from "@/components/sections/contact-section";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Hero />
      <StatsSection />
      <AboutPreview />
      <NetworkGrid />
      <ServicesPreview />
      <TeamPreview />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}
