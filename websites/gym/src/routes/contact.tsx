import { useState } from "react";
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { LOCATIONS } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Iron Peak Circle" },
      { name: "description", content: "Get in touch with Iron Peak Circle Mumbai. Three locations: Andheri, Powai, Bandra." },
      { property: "og:title", content: "Contact Iron Peak Circle" },
      { property: "og:description", content: "Membership enquiries, class bookings, and personal training. We respond fast." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Membership Enquiry");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !msg) { setError("Please fill in all required fields."); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Please enter a valid email."); return; }
    setSent(true);
    setTimeout(() => {
      setSent(false); setName(""); setEmail(""); setPhone(""); setMsg(""); setSubject("Membership Enquiry");
    }, 3500);
  };

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1517438322307-e67111335449?w=1600"
        overline="Contact"
        title={<>Let's <span className="text-[#E8192C]">Talk.</span></>}
        subtitle="Membership, training, partnerships, or press. We respond within a working day."
      />

      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={submit}
            className="bg-[#111] border border-white/10 p-7 lg:p-10"
          >
            <h2 className="font-display text-4xl tracking-wider text-white">Send A Message</h2>
            <p className="text-white/50 text-sm mt-1">We typically reply within a few hours.</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Field label="Full Name *" value={name} onChange={setName} />
              <Field label="Email *" type="email" value={email} onChange={setEmail} />
              <Field label="Phone" value={phone} onChange={setPhone} />
              <label className="block">
                <span className="block font-condensed uppercase tracking-widest text-[10px] text-white/50 mb-1">Subject</span>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E8192C]"
                >
                  <option>Membership Enquiry</option>
                  <option>Class Booking</option>
                  <option>Personal Training</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label className="block mt-4">
              <span className="block font-condensed uppercase tracking-widest text-[10px] text-white/50 mb-1">Message *</span>
              <textarea
                rows={5}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full bg-black/50 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E8192C]"
              />
            </label>

            {error && <p className="mt-3 text-[#E8192C] text-sm">{error}</p>}

            <button
              type="submit"
              disabled={sent}
              className="mt-6 w-full bg-[#E8192C] text-white py-3.5 font-condensed font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#E8192C] transition-colors disabled:opacity-80 flex items-center justify-center gap-2"
            >
              {sent ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="grid place-items-center h-5 w-5 rounded-full bg-white text-[#E8192C]"
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.span>
                  Message Sent
                </>
              ) : "Send Message"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="grid gap-3">
              {LOCATIONS.map((l) => (
                <div key={l.id} className="bg-[#111] border border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl tracking-wider text-white">{l.name}</h3>
                      <p className="text-white/60 text-sm mt-1 flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-[#E8192C]" /> {l.address}</p>
                      <p className="text-white/60 text-sm mt-1 flex items-center gap-2"><Phone size={14} className="text-[#E8192C]" /> {l.phone}</p>
                      <p className="text-white/40 text-xs mt-1">{l.hours}</p>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(l.address)}`}
                      target="_blank" rel="noreferrer"
                      className="font-condensed uppercase tracking-widest text-xs text-[#E8192C] hover:text-white whitespace-nowrap"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="aspect-video w-full overflow-hidden border border-white/10">
              <iframe
                title="Iron Peak Circle Andheri Location"
                src="https://www.google.com/maps?q=Andheri+West,+Mumbai&output=embed"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(0.6) invert(0.92) hue-rotate(180deg)" }}
                loading="lazy"
              />
            </div>

            <div className="bg-[#111] border border-white/10 p-5">
              <h4 className="font-condensed uppercase tracking-widest text-xs text-white mb-3">Working Hours</h4>
              <table className="w-full text-sm text-white/70">
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2">Mon – Fri</td><td className="text-right text-white">5:00 AM – 11:00 PM</td></tr>
                  <tr><td className="py-2">Sat – Sun</td><td className="text-right text-white">6:00 AM – 10:00 PM</td></tr>
                  <tr><td className="py-2">PRO / ELITE</td><td className="text-right text-[#E8192C]">24/7 (Andheri)</td></tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-condensed uppercase tracking-widest text-xs text-white/50 mr-1">Follow:</span>
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} className="grid place-items-center h-10 w-10 border border-white/15 text-white/70 hover:bg-[#E8192C] hover:text-white hover:border-[#E8192C] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
              <a href="mailto:hello@ironpeakcircle.in" className="grid place-items-center h-10 w-10 border border-white/15 text-white/70 hover:bg-[#E8192C] hover:text-white hover:border-[#E8192C] transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block font-condensed uppercase tracking-widest text-[10px] text-white/50 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/50 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#E8192C]"
      />
    </label>
  );
}
