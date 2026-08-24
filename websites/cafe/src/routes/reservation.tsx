import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Brew Haven Café" },
      { name: "description", content: "Book your table at Brew Haven Café — we'll have it warm and ready." },
      { property: "og:title", content: "Reserve a Table — Brew Haven" },
      { property: "og:description", content: "Book your table at Brew Haven Café." },
    ],
  }),
  component: Reservation,
});

function Reservation() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", date: "", time: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=2000&q=80')" }} />
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, var(--cream) 0%, transparent 40%, var(--cream) 100%)" }} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-semibold">Reservations</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl text-primary">Book Your Table</h1>
          <p className="mt-4 text-muted-foreground">Tell us when you're coming — your perfect spot will be waiting.</p>
        </div>

        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 bg-card rounded-3xl p-12 text-center shadow-card">
            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground grid place-items-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="mt-6 font-display text-3xl text-primary">You're booked, {form.name || "friend"}!</h2>
            <p className="mt-3 text-muted-foreground">We've reserved a table for {form.guests} on {form.date} at {form.time}. See you soon!</p>
            <button onClick={() => { setDone(false); setForm({ name: "", phone: "", guests: "2", date: "", time: "" }); }} className="mt-6 text-accent font-medium hover:underline">Make another reservation</button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 glass bg-card/70 rounded-3xl p-8 md:p-10 shadow-card border border-white/40 space-y-5"
          >
            <Field label="Full Name" required>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Marco Bellini" />
            </Field>
            <Field label="Phone Number" required>
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+1 (212) 555-0184" />
            </Field>
            <div className="grid sm:grid-cols-3 gap-5">
              <Field label="Guests" required>
                <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                </select>
              </Field>
              <Field label="Date" required>
                <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" />
              </Field>
              <Field label="Time" required>
                <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input" />
              </Field>
            </div>

            <button type="submit" className="w-full mt-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all">
              Confirm Reservation
            </button>
          </motion.form>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          background: oklch(1 0 0 / 0.7);
          border: 1px solid var(--border);
          font-size: 0.95rem;
          color: var(--foreground);
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px oklch(0.74 0.10 70 / 0.2);
          background: white;
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
        {label}{required && <span className="text-accent"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
