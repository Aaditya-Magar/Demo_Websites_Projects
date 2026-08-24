import { createFileRoute } from "@tanstack/react-router";
import { CursorAndProgress } from "@/components/salon/CursorAndProgress";
import { Navbar } from "@/components/salon/Navbar";
import { Hero } from "@/components/salon/Hero";
import { Stats } from "@/components/salon/Stats";
import { Services } from "@/components/salon/Services";
import { WhyChooseUs } from "@/components/salon/WhyChooseUs";
import { Stylists } from "@/components/salon/Stylists";
import { Gallery } from "@/components/salon/Gallery";
import { Pricing } from "@/components/salon/Pricing";
import { Testimonials } from "@/components/salon/Testimonials";
import { Booking } from "@/components/salon/Booking";
import { Footer } from "@/components/salon/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground min-h-screen overflow-x-hidden">
      <CursorAndProgress />
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Stylists />
      <Gallery />
      <Pricing />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
