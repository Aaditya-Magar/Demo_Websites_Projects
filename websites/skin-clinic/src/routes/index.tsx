import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Stats from "@/components/site/Stats";
import Treatments from "@/components/site/Treatments";
import WhyUs from "@/components/site/WhyUs";
import Doctors from "@/components/site/Doctors";
import Results from "@/components/site/Results";
import Testimonials from "@/components/site/Testimonials";
import Booking from "@/components/site/Booking";
import Footer from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DermaGlow Skin Clinic — Premium Dermatology in Pune & Mumbai" },
      { name: "description", content: "Advanced dermatology treatments — acne, anti-aging, laser, pigmentation & hair restoration — by board-certified specialists at DermaGlow Skin Clinic." },
      { property: "og:title", content: "DermaGlow Skin Clinic — Healthy Skin. Confident You." },
      { property: "og:description", content: "Premium dermatology clinic combining world-class technology with personal care." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Treatments />
        <WhyUs />
        <Doctors />
        <Results />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
