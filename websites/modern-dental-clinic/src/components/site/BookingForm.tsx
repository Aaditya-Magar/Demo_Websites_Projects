import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check, Sparkles as SparkIcon } from "lucide-react";

const services = [
  "General Checkup",
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics / Braces",
  "Root Canal Treatment",
  "Pediatric Dentistry",
  "Emergency Visit",
];

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "date", string>>;

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Errors = {};
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const email = String(f.get("email") || "").trim();
    const service = String(f.get("service") || "");
    const date = String(f.get("date") || "");
    if (!name) next.name = "Please enter your full name";
    if (!/^[\d +()\-]{8,}$/.test(phone)) next.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!service) next.service = "Choose a service";
    if (!date) next.date = "Pick a date";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setDone(false), 4000);
    }, 1400);
  };

  const fieldClass = (err?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-deep placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-teal ${
      err ? "border-destructive" : "border-border"
    }`;

  return (
    <section
      id="book"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.78 0.14 195) 0%, oklch(0.65 0.13 200) 60%, oklch(0.5 0.12 220) 100%)",
      }}
    >
      {/* Floating decorative SVGs */}
      <SparkIcon className="absolute top-12 left-10 h-8 w-8 text-white/40 animate-pulse" />
      <SparkIcon className="absolute bottom-16 right-16 h-12 w-12 text-white/30 animate-pulse" />
      <SparkIcon className="absolute top-1/2 right-1/4 h-6 w-6 text-white/40" />
      <svg className="absolute -top-20 -right-20 h-80 w-80 text-white/10" viewBox="0 0 200 200" fill="currentColor">
        <circle cx="100" cy="100" r="100" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-white"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/85 font-semibold">Book your visit</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-balance">
            Ready for your <span className="italic text-gold">best smile</span>?
          </h2>
          <p className="mt-5 text-white/90 text-lg max-w-md">
            Tell us a little about you and we'll confirm your appointment within
            an hour. New patient consultations are complimentary.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Confirmation within 60 minutes", "Free first consultation", "Easy reschedule any time"].map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-white/90">
                <Check className="h-4 w-4 text-gold" strokeWidth={3} /> {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white/95 backdrop-blur-xl border border-white/40 p-6 lg:p-8 shadow-[0_30px_80px_-30px_rgba(11,20,55,0.5)]"
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-navy-deep">Full Name</label>
              <input name="name" placeholder="Jane Doe" className={`mt-1.5 ${fieldClass(errors.name)}`} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-deep">Phone Number</label>
              <input name="phone" placeholder="+91 98765 43210" className={`mt-1.5 ${fieldClass(errors.phone)}`} />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-navy-deep">Email Address</label>
              <input name="email" type="email" placeholder="jane@email.com" className={`mt-1.5 ${fieldClass(errors.email)}`} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-deep">Service</label>
              <select name="service" defaultValue="" className={`mt-1.5 ${fieldClass(errors.service)}`}>
                <option value="" disabled>Choose a service…</option>
                {services.map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-deep">Preferred Date</label>
              <input name="date" type="date" className={`mt-1.5 ${fieldClass(errors.date)}`} />
              {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-navy-deep">Message (optional)</label>
              <textarea
                name="message"
                rows={3}
                placeholder="Tell us anything we should know before your visit…"
                className={`mt-1.5 ${fieldClass()} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Booking…
              </>
            ) : done ? (
              <>
                <Check className="h-4 w-4 text-teal" /> Appointment requested!
              </>
            ) : (
              "Confirm Appointment"
            )}
          </button>
          <p className="mt-3 text-[11px] text-muted-foreground text-center">
            By submitting you agree to our privacy policy. We'll never share your info.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
