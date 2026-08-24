import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PageHeader } from "./courses";
import { courses } from "../data/site";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "Enroll Now — ExcelEdge Academy" },
      { name: "description", content: "Apply for admission to ExcelEdge programs. Scholarships available." },
      { property: "og:title", content: "Enroll Now — ExcelEdge Academy" },
      { property: "og:description", content: "Take the first step to your top rank." },
    ],
  }),
  component: AdmissionPage,
});

type Form = { name: string; phone: string; email: string; course: string; cls: string };

function AdmissionPage() {
  const [form, setForm] = useState<Form>({ name: "", phone: "", email: "", course: courses[0].title, cls: "11" });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [done, setDone] = useState(false);

  function set<K extends keyof Form>(k: K, v: Form[K]) { setForm((f) => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Partial<Form> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^[0-9+\s-]{8,}$/.test(form.phone)) er.phone = "Enter a valid phone number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email";
    setErrors(er);
    if (Object.keys(er).length === 0) setDone(true);
  }

  return (
    <>
      <PageHeader title="Enroll Now" subtitle="Limited seats. Scholarships of up to 100% based on entrance test." />
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="rounded-3xl bg-card border border-border shadow-glow p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={submit}
                className="space-y-5"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold">Application Form</h2>
                  <p className="text-muted-foreground text-sm mt-1">Fill in your details — a counsellor will call within 24 hours.</p>
                </div>

                <Input label="Full name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Phone" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} placeholder="+91 ..." />
                  <Input label="Email (optional)" value={form.email} onChange={(v) => set("email", v)} error={errors.email} type="email" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Course</label>
                    <select
                      value={form.course}
                      onChange={(e) => set("course", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {courses.map((c) => <option key={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Current Class</label>
                    <select
                      value={form.cls}
                      onChange={(e) => set("cls", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {["6","7","8","9","10","11","12","Dropper"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-gold-foreground font-bold shadow-glow hover:scale-[1.02] transition-transform">
                  Submit Application <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="h-20 w-20 mx-auto rounded-full bg-gradient-brand grid place-items-center shadow-glow"
                >
                  <Check className="h-10 w-10 text-primary-foreground" />
                </motion.div>
                <h2 className="font-display text-3xl font-bold mt-6">You're in, {form.name.split(" ")[0]}! 🎉</h2>
                <p className="text-muted-foreground mt-2">Application received for <span className="font-semibold text-foreground">{form.course}</span>. A counsellor will call you on <span className="font-semibold text-foreground">{form.phone}</span> within 24 hours.</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-accent font-semibold">
                  <Sparkles className="h-4 w-4" /> Welcome to the ExcelEdge family
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function Input({
  label, value, onChange, error, ...rest
}: { label: string; value: string; onChange: (v: string) => void; error?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
        className={`w-full px-4 py-3 rounded-xl bg-secondary/60 border focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
