import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { PageHero, Overline } from "../components/SectionPrimitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Seagrove Resort & Spa, Candolim Beach Goa" },
      { name: "description", content: "Reach Seagrove Resort & Spa on Candolim Beach, North Goa. Reservations, dining, spa, and event enquiries." },
      { property: "og:title", content: "Contact Seagrove" },
      { property: "og:description", content: "We're here for you, 24 hours a day." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero title="We're Here for You" subtitle="Reservations, special occasions, or simply to say hello." image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920" />
      <section className="bg-ivory py-20">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Overline>Send Enquiry</Overline>
            <h2 className="font-display italic text-4xl text-ocean mt-3 mb-8">Tell us how we can help.</h2>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="border-2 border-gold rounded-2xl p-10 text-center">
                <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
                  <motion.circle cx="30" cy="30" r="28" stroke="#D4A853" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                  <motion.path d="M18 31 L27 40 L43 22" stroke="#D4A853" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
                </svg>
                <p className="font-display italic text-2xl text-ocean mt-5">Thank you.</p>
                <p className="text-driftwood font-sub text-sm mt-2">We'll respond within two hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" required />
                  <Input label="Email" type="email" required />
                  <Input label="Phone" />
                  <Input label="Country" />
                </div>
                <Select label="Enquiry Type" options={["Reservation","Dining","Spa","Event","Other"]} />
                <Input label="Preferred Check-in" type="date" />
                <div>
                  <label className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood">Message</label>
                  <textarea rows={4} className="mt-1.5 w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sub focus:outline-none focus:border-gold" />
                </div>
                <button className="w-full bg-gold text-ocean-deep py-4 rounded-full text-xs font-sub font-semibold uppercase tracking-[0.22em] hover:bg-gold-soft transition">Send Enquiry</button>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6">
              <Overline>The Resort</Overline>
              <p className="font-display italic text-2xl text-ocean mt-2">Seagrove Resort & Spa</p>
              <ul className="mt-4 space-y-3 text-sm font-sub text-ocean/85">
                <li className="flex gap-3"><MapPin size={16} className="text-teal mt-0.5 shrink-0" /> Candolim Beach Road, North Goa – 403515, India</li>
                <li className="flex gap-3"><Phone size={16} className="text-teal mt-0.5" /> <a href="tel:+919822200111">+91 98222 00111</a></li>
                <li className="flex gap-3"><Mail size={16} className="text-teal mt-0.5" /> <a href="mailto:hello@seagroveresort.com">hello@seagroveresort.com</a></li>
                <li className="text-driftwood text-xs">Front Desk: 24/7 · Reservations: 7 AM – 11 PM IST</li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-border">
              <iframe title="Map" src="https://www.google.com/maps?q=Candolim+Beach,+Goa&output=embed" className="w-full h-full" loading="lazy" />
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <Overline>How to Reach</Overline>
              <ul className="mt-3 space-y-2 text-sm font-sub text-ocean/85">
                <li className="flex justify-between"><span>Goa International Airport</span><span className="text-driftwood">45 min</span></li>
                <li className="flex justify-between"><span>Panjim City</span><span className="text-driftwood">20 min</span></li>
                <li className="flex justify-between"><span>Mumbai (by road)</span><span className="text-driftwood">10 hrs</span></li>
              </ul>
              <a href="#" className="mt-4 inline-block text-teal text-xs font-sub uppercase tracking-[0.22em] story-link">Book Airport Transfer →</a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <a href="https://wa.me/919822200111" className="bg-[#25D366] text-white py-3 rounded-full flex items-center justify-center gap-2 text-xs font-sub uppercase tracking-[0.18em]"><MessageCircle size={14} /> WhatsApp</a>
              <a href="mailto:hello@seagroveresort.com" className="border border-border py-3 rounded-full flex items-center justify-center gap-2 text-xs font-sub uppercase tracking-[0.18em] text-ocean hover:border-gold hover:text-gold transition"><Mail size={14} /> Email</a>
              <a href="#" className="border border-border py-3 rounded-full flex items-center justify-center gap-2 text-xs font-sub uppercase tracking-[0.18em] text-ocean hover:border-gold hover:text-gold transition"><Instagram size={14} /> Insta</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood">{label}</label>
      <input type={type} required={required} className="mt-1.5 w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sub focus:outline-none focus:border-gold" />
    </div>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-[10px] font-sub uppercase tracking-[0.22em] text-driftwood">{label}</label>
      <select className="mt-1.5 w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-sub focus:outline-none focus:border-gold">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
