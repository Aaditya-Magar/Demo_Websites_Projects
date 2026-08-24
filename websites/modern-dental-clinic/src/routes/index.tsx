import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Doctors } from "@/components/site/Doctors";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Testimonials } from "@/components/site/Testimonials";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { WaveDivider } from "@/components/site/WaveDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmileCraft Dental — Premium Dental Care in Mumbai" },
      {
        name: "description",
        content:
          "Premium dental clinic in Mumbai offering implants, whitening, orthodontics and pediatric dentistry. Trusted by 10,000+ patients. Book a free consultation.",
      },
      { property: "og:title", content: "SmileCraft Dental — Premium Dental Care in Mumbai" },
      {
        property: "og:description",
        content: "Advanced, gentle dental care. Implants, whitening, braces & more. Book your appointment today.",
      },
      { property: "og:site_name", content: "SmileCraft Dental" },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80",
      },
      { name: "twitter:title", content: "SmileCraft Dental — Premium Dental Care in Mumbai" },
      {
        name: "twitter:description",
        content: "Advanced, gentle dental care. Implants, whitening, braces & more. Book your appointment today.",
      },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Stats />

      {/* navy → white wave */}
      <div className="text-navy-deep bg-white"><WaveDivider /></div>

      <Services />
      <WhyUs />
      <Doctors />
      <BeforeAfter />
      <Testimonials />
      <BookingForm />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "SmileCraft Dental",
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80",
            address: {
              "@type": "PostalAddress",
              streetAddress: "42 Dental Plaza, Health District",
              addressLocality: "Mumbai",
              postalCode: "400001",
              addressCountry: "IN",
            },
            telephone: "+91-98765-43210",
            email: "hello@smilecraftdental.com",
            openingHours: ["Mo-Fr 09:00-19:00", "Sa 09:00-16:00"],
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2400" },
          }),
        }}
      />
    </main>
  );
}
