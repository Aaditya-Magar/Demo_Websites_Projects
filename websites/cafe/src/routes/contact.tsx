import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Brew Haven Café" },
      { name: "description", content: "Visit, call, or email Brew Haven Café. We'd love to hear from you." },
      { property: "og:title", content: "Contact — Brew Haven" },
      { property: "og:description", content: "Visit, call, or email Brew Haven Café." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const info = [
    { icon: MapPin, label: "Address", value: "142 Mulberry Street, NY 10013" },
    { icon: Phone, label: "Phone", value: "+1 (212) 555-0184" },
    { icon: Mail, label: "Email", value: "hello@brewhaven.cafe" },
    { icon: Clock, label: "Hours", value: "Mon – Sun · 7am – 9pm" },
  ];
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Contact</span>
        <h1 className="mt-3 font-display text-5xl md:text-6xl text-primary">Come Say Hello</h1>
        <p className="mt-4 text-muted-foreground">We're always happy to chat — coffee, life, or anything in between.</p>
      </div>

      <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
        <div className="grid sm:grid-cols-2 gap-4">
          {info.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card p-6 rounded-2xl shadow-soft"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent grid place-items-center mb-3">
                <it.icon className="w-5 h-5" />
              </div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground">{it.label}</div>
              <div className="mt-1 font-medium text-foreground">{it.value}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-card aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]">
          <iframe
            title="Brew Haven location"
            src="https://www.google.com/maps?q=Mulberry+Street+New+York&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
