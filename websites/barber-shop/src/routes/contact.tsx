import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, MessageSquare, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CutCraft Studios" },
      { name: "description", content: "Tell us about your project. We reply within 24 hours." },
      { property: "og:title", content: "Contact CutCraft" },
      { property: "og:description", content: "Start a project with CutCraft Studios." },
    ],
  }),
  component: ContactPage,
});

const projectTypes = ["YouTube", "Reels / Shorts", "Ad Creative", "Podcast", "Motion Graphics", "Other"];
const budgets = ["< $1k", "$1k – $5k", "$5k – $15k", "$15k+"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: projectTypes[0], budget: budgets[1], msg: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="relative pt-32 pb-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-radial-glow opacity-60" />
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-electric">Contact</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">Let's <span className="gradient-text">craft</span> something.</h1>
            <p className="mt-5 text-muted-foreground">
              Drop the details below and a producer will reply within 24 hours with a tailored quote and first-week plan.
            </p>
            <ul className="mt-10 space-y-5">
              <Info icon={Mail} title="Email" value="hello@cutcraft.studio" />
              <Info icon={MessageSquare} title="DM us" value="@cutcraftstudios" />
              <Info icon={MapPin} title="Studio" value="Los Angeles · Remote-first" />
            </ul>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 to-electric/20 blur-2xl" />
            <form onSubmit={submit} className="glass rounded-3xl p-8 md:p-10">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary glow-purple">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl">Pitch received.</h3>
                  <p className="mt-2 text-muted-foreground">We'll reply within 24 hours, {form.name || "creator"}.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Your name">
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Alex Rivera" />
                    </Field>
                    <Field label="Email">
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="you@studio.com" />
                    </Field>
                    <Field label="Project type">
                      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
                        {projectTypes.map((t) => <option key={t} className="bg-surface">{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Budget">
                      <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputCls}>
                        {budgets.map((b) => <option key={b} className="bg-surface">{b}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Tell us about the project">
                    <textarea required value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={5} className={inputCls + " resize-none"} placeholder="Footage, timeline, vibe references…" />
                  </Field>
                  <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground glow-purple transition hover:scale-[1.02]">
                    Send pitch <Send className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const inputCls = "mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary focus:glow-purple";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
        <p className="font-display text-xl">{value}</p>
      </div>
    </li>
  );
}
