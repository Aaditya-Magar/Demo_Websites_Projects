import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, Phone, Mail, Send, Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  "Haircut & Styling",
  "Hair Coloring",
  "Bridal Makeup",
  "Skincare & Facial",
  "Nail Art",
  "Spa & Relaxation",
];

export function Booking() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => setDone(false), 4000);
    }, 1400);
  };

  const inputCls =
    "w-full px-5 py-3.5 rounded-xl bg-input/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-glow outline-none transition-all placeholder:text-muted-foreground/60 text-foreground";

  return (
    <section id="contact" className="relative py-28 px-6">
      <SectionHeading
        eyebrow="Book Appointment"
        title="Reserve Your"
        highlight="Aura Moment"
        description="Tell us what you'd love — our concierge confirms within 30 minutes."
      />

      <div className="mt-20 max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-5"
        >
          <div className="glass rounded-2xl p-7">
            <h3 className="font-display text-2xl">Visit our studio</h3>
            <p className="text-muted-foreground text-sm mt-2">
              Walk-ins welcome between 11AM – 8PM, Tue – Sun.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>14, Linking Road, Bandra West, Mumbai 400050</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98200 14725</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@auraluxe.studio</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-7">
            <h4 className="font-display text-xl">Working hours</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between"><span>Tue – Fri</span><span className="text-muted-foreground">11:00 – 20:00</span></li>
              <li className="flex justify-between"><span>Sat – Sun</span><span className="text-muted-foreground">10:00 – 21:00</span></li>
              <li className="flex justify-between"><span>Monday</span><span className="text-muted-foreground">Closed</span></li>
            </ul>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 glass-strong rounded-3xl p-8 md:p-10 shadow-luxe space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Full Name
              </label>
              <input required type="text" placeholder="Your name" className={`${inputCls} mt-2`} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Phone Number
              </label>
              <input required type="tel" placeholder="+91 98xxx xxxxx" className={`${inputCls} mt-2`} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Service
              </label>
              <select required className={`${inputCls} mt-2 appearance-none`}>
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-card">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Preferred Date
              </label>
              <div className="relative mt-2">
                <input required type="date" className={inputCls} />
                <Calendar className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your look, occasion, or any preferences..."
              className={`${inputCls} mt-2 resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={loading || done}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium glow-on-hover disabled:opacity-80"
          >
            {done ? (
              <>
                <Check className="w-4 h-4" /> Request received
              </>
            ) : loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Request Appointment <Send className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-xs text-muted-foreground">
            By submitting, you agree to our concierge contacting you to confirm your slot.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
