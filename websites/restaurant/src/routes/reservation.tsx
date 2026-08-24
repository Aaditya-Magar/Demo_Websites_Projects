import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, User, Phone, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Royal Spice House" },
      { name: "description", content: "Reserve your table at Royal Spice House for an unforgettable royal Indian dining experience." },
      { property: "og:title", content: "Book a Table — Royal Spice House" },
      { property: "og:description", content: "Limited seating. Reserve ahead." },
    ],
  }),
  component: ReservationPage,
});

function ReservationPage() {
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", date: "", time: "19:00" });
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <>
      <section className="relative pt-40 pb-16 bg-[color:var(--dark-brown)] text-cream text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--dark-brown)]" />
        <div className="relative container mx-auto px-6">
          <p className="text-gold tracking-[0.4em] uppercase text-xs">Reservations</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3 text-gradient-gold">Reserve Your Royal Table</h1>
          <p className="mt-4 max-w-xl mx-auto text-cream/75">Tell us when you'd like to dine with us. We'll prepare a memorable evening.</p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <Reveal>
            {done ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="p-10 rounded-3xl bg-white border border-gold/30 text-center glow-gold">
                <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-gold text-[color:var(--dark-brown)]">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="font-display text-3xl text-maroon mt-5">Reservation Confirmed</h2>
                <p className="text-foreground/70 mt-3">
                  Thank you, <span className="text-maroon font-semibold">{form.name || "guest"}</span>. We've reserved a table for {form.guests} on {form.date || "your selected date"} at {form.time}. A confirmation will be sent to {form.phone}.
                </p>
                <button onClick={() => setDone(false)} className="mt-6 inline-flex items-center gap-2 text-gold hover:underline">
                  <Sparkles className="h-4 w-4" /> Make another reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="p-8 md:p-10 rounded-3xl bg-white border border-gold/30 shadow-xl">
                <h2 className="font-display text-3xl text-maroon">Book your table</h2>
                <p className="text-foreground/65 text-sm mt-1">All fields required.</p>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <Field icon={User} label="Name">
                    <input required value={form.name} onChange={update("name")}
                      className="w-full bg-transparent outline-none text-foreground placeholder:text-foreground/40"
                      placeholder="Your full name" />
                  </Field>
                  <Field icon={Phone} label="Phone">
                    <input required type="tel" value={form.phone} onChange={update("phone")}
                      className="w-full bg-transparent outline-none text-foreground placeholder:text-foreground/40"
                      placeholder="+91 98765 43210" />
                  </Field>
                  <Field icon={Users} label="Guests">
                    <select required value={form.guests} onChange={update("guests")}
                      className="w-full bg-transparent outline-none text-foreground">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} guest{i ? "s" : ""}</option>
                      ))}
                    </select>
                  </Field>
                  <Field icon={Calendar} label="Date">
                    <input required type="date" value={form.date} onChange={update("date")}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-transparent outline-none text-foreground" />
                  </Field>
                  <Field icon={Clock} label="Time" className="sm:col-span-2">
                    <select required value={form.time} onChange={update("time")}
                      className="w-full bg-transparent outline-none text-foreground">
                      {["12:00","13:00","14:00","18:00","19:00","20:00","21:00","22:00"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <button type="submit"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-maroon text-cream font-semibold tracking-wide hover:bg-gold hover:text-[color:var(--dark-brown)] hover:glow-gold-strong transition-all">
                  Confirm Reservation
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ icon: Icon, label, children, className = "" }: { icon: React.ElementType; label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">{label}</span>
      <div className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/30 bg-cream/50 focus-within:border-gold focus-within:glow-gold transition-all">
        <Icon className="h-4 w-4 text-gold shrink-0" />
        {children}
      </div>
    </label>
  );
}
