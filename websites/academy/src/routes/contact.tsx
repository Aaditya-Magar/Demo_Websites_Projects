import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { PageHeader } from "./courses";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ExcelEdge Academy" },
      { name: "description", content: "Talk to a counsellor. Visit us in Kota or reach out by phone or email." },
      { property: "og:title", content: "Contact ExcelEdge Academy" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader title="Get in touch" subtitle="Have a question? Our counsellors usually respond within a few hours." />
      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, label: "Visit", value: "Coaching Hub, Rajeev Gandhi Nagar, Kota, Rajasthan 324005" },
            { icon: Phone, label: "Call", value: "+91 98765 43210" },
            { icon: Mail, label: "Email", value: "hello@exceledge.in" },
          ].map((c) => (
            <div key={c.label} className="p-6 rounded-2xl bg-card border border-border shadow-card flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center flex-shrink-0">
                <c.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.label}</div>
                <div className="font-medium text-foreground mt-0.5">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="rounded-2xl overflow-hidden border border-border shadow-card">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Kota+Rajasthan&output=embed"
              className="w-full h-64"
              loading="lazy"
            />
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-2 p-8 rounded-3xl bg-card border border-border shadow-glow space-y-5"
        >
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Phone" name="phone" required />
          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="How can we help?" />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform">
            {sent ? <><Check className="h-4 w-4" /> Sent!</> : <><Send className="h-4 w-4" /> Send Message</>}
          </button>
          {sent && <p className="text-sm text-primary">Thanks! A counsellor will reach out shortly.</p>}
        </motion.form>
      </section>
    </>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input {...rest} className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}
