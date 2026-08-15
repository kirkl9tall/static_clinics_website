import Hero from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats-section";
import AboutPreview from "@/components/sections/about-preview";
import dynamic from "next/dynamic";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";

const NetworkGrid = dynamic(() => import("@/components/sections/network-grid"));
const ServicesPreview = dynamic(() => import("@/components/sections/services-preview"));
const TeamPreview = dynamic(() => import("@/components/sections/team-preview"));
const Testimonials = dynamic(() => import("@/components/sections/testimonials"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const ContactSection = dynamic(() => import("@/components/sections/contact-section"));

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
