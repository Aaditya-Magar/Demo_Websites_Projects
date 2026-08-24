import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Check, Calendar } from "lucide-react";

const treatments = [
  "Acne Treatment", "Skin Whitening", "Laser Hair Removal",
  "Anti-Aging / Botox", "Pigmentation Treatment", "Hair Loss Treatment",
];

type FormData = { name: string; phone: string; email: string; treatment: string; date: string; message: string };

export default function Booking() {
  const [data, setData] = useState<FormData>({ name: "", phone: "", email: "", treatment: "", date: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!data.name.trim() || data.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[+0-9\s\-()]{8,16}$/.test(data.phone.trim())) e.phone = "Enter a valid phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Enter a valid email";
    if (!data.treatment) e.treatment = "Select a treatment";
    if (!data.date) e.date = "Pick a date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setData({ name: "", phone: "", email: "", treatment: "", date: "", message: "" }); }, 3500);
  };

  const field = "w-full px-5 py-4 rounded-2xl bg-white border border-border/70 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition";

  return (
    <section id="contact" className="py-28 lg:py-36 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-soft" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Book Appointment</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Begin your <span className="italic text-gradient">skin journey</span> today.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Fill in your details and our team will confirm your consultation within 12 hours.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: MapPin, label: "Visit us", value: "Koregaon Park, Pune · Bandra, Mumbai" },
              { icon: Phone, label: "Call us", value: "+91 98220 12345" },
              { icon: Mail, label: "Email us", value: "care@dermaglow.in" },
            ].map((c) => (
              <div key={c.label} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl gradient-pink grid place-items-center shadow-glow flex-shrink-0">
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="font-display text-lg text-foreground mt-0.5">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={submit}
          className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 shadow-luxe border border-border/60"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Full name</label>
              <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={field} placeholder="Aanya Mehta" maxLength={80} />
              {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Phone</label>
              <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={field} placeholder="+91 98xxx xxxxx" maxLength={20} />
              {errors.phone && <p className="text-xs text-destructive mt-1.5">{errors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
              <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={field} placeholder="you@email.com" maxLength={120} />
              {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Treatment</label>
              <select value={data.treatment} onChange={(e) => setData({ ...data, treatment: e.target.value })} className={field}>
                <option value="">Select treatment</option>
                {treatments.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.treatment && <p className="text-xs text-destructive mt-1.5">{errors.treatment}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Preferred date</label>
              <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className={field} />
              {errors.date && <p className="text-xs text-destructive mt-1.5">{errors.date}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Message</label>
              <textarea value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} rows={4} className={field} placeholder="Tell us about your skin concerns…" maxLength={1000} />
            </div>
          </div>

          <button
            type="submit"
            disabled={sent}
            className="mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow hover:scale-[1.01] transition-all disabled:opacity-70"
          >
            {sent ? (<><Check className="w-5 h-5" /> Request received — we'll be in touch</>) : (<><Calendar className="w-4 h-4" /> Confirm appointment</>)}
          </button>
          <p className="text-xs text-muted-foreground mt-4 text-center">We respect your privacy. Your details are never shared.</p>
        </motion.form>
      </div>
    </section>
  );
}