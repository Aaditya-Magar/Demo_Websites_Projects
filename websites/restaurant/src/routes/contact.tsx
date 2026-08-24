import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Royal Spice House" },
      { name: "description", content: "Visit, call or write to Royal Spice House. We'd love to host you." },
      { property: "og:title", content: "Contact — Royal Spice House" },
      { property: "og:description", content: "Find us at 42 Heritage Lane, Connaught Place, New Delhi." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { Icon: MapPin, title: "Address", text: "42 Heritage Lane, Connaught Place, New Delhi 110001" },
    { Icon: Phone, title: "Phone", text: "+91 98765 43210" },
    { Icon: Mail, title: "Email", text: "hello@royalspicehouse.in" },
    { Icon: Clock, title: "Hours", text: "Mon–Sun · 12:00 – 23:30" },
  ];

  return (
    <>
      <section className="relative pt-40 pb-16 bg-[color:var(--dark-brown)] text-cream text-center">
        <div className="container mx-auto px-6">
          <p className="text-gold tracking-[0.4em] uppercase text-xs">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3 text-gradient-gold">We'd Love to Host You</h1>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {items.map((it) => (
                <div key={it.title} className="p-6 rounded-2xl bg-white border border-gold/20 hover:border-gold transition-colors">
                  <it.Icon className="h-6 w-6 text-gold" />
                  <h3 className="font-display text-lg mt-3 text-maroon">{it.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{it.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-gold/20 h-[420px] glow-gold">
              <iframe
                title="Royal Spice House location"
                src="https://www.google.com/maps?q=Connaught+Place,+New+Delhi&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
