import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown, Plus, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { PLANS, FAQS } from "@/lib/data";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Iron Peak Circle" },
      { name: "description", content: "Three plans, zero compromises. From ₹1,999/mo. Andheri, Powai, Bandra." },
      { property: "og:title", content: "Membership — Iron Peak Circle" },
      { property: "og:description", content: "Choose your plan. Starter, Pro, or Elite. Cancel anytime." },
    ],
  }),
  component: MembershipPage,
});

function MembershipPage() {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600"
        overline="Pricing"
        title={<>Choose Your <span className="text-[#E8192C]">Plan</span></>}
        subtitle="Three tiers. Zero hidden fees. Cancel anytime."
      />

      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-[#1A1A1A] p-1 border border-white/10">
              <button
                onClick={() => setAnnual(false)}
                className={`px-6 py-2.5 font-condensed uppercase tracking-widest text-xs transition-colors ${!annual ? "bg-[#E8192C] text-white" : "text-white/60"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-6 py-2.5 font-condensed uppercase tracking-widest text-xs transition-colors flex items-center gap-2 ${annual ? "bg-[#E8192C] text-white" : "text-white/60"}`}
              >
                Annual <span className="text-[10px] bg-[#C9A84C] text-black px-1.5 py-0.5">−20%</span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative flex flex-col p-8 ${
                  p.highlight
                    ? "bg-[#1A1A1A] border border-[#E8192C] lg:scale-105 pulse-red z-10"
                    : p.elite
                    ? "bg-[#1A1A1A] border-2 border-[#C9A84C] gold-glow"
                    : "bg-[#111] border border-white/10"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8192C] text-white px-3 py-1 text-[10px] font-condensed font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                {p.elite && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black px-3 py-1 text-[10px] font-condensed font-bold uppercase tracking-widest">
                    Elite
                  </div>
                )}

                <h3 className={`font-display text-4xl tracking-widest ${p.elite ? "text-[#C9A84C]" : "text-white"}`}>{p.name}</h3>
                <p className="font-condensed uppercase tracking-widest text-xs text-white/50 mt-1">{p.tagline}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={annual ? "a" + p.id : "m" + p.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-6xl text-white"
                    >
                      ₹{(annual ? Math.round(p.annual / 12) : p.monthly).toLocaleString("en-IN")}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>
                {annual && (
                  <p className="text-[#E8192C] text-xs font-condensed uppercase tracking-widest mt-1">
                    ₹{p.annual.toLocaleString("en-IN")} billed annually
                  </p>
                )}

                <ul className="mt-7 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                      <Check size={16} className={p.elite ? "text-[#C9A84C] mt-0.5 shrink-0" : "text-[#E8192C] mt-0.5 shrink-0"} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-4 font-condensed font-bold uppercase tracking-widest text-sm transition-colors ${
                    p.highlight ? "bg-[#E8192C] text-white hover:bg-white hover:text-[#E8192C]"
                    : p.elite ? "bg-[#C9A84C] text-black hover:bg-white"
                    : "border border-white/30 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <ComparisonTable />
          <FAQ />

          <div className="mt-20 text-center bg-[#111] p-12 border border-white/10">
            <p className="font-condensed uppercase tracking-[0.4em] text-[#E8192C] text-xs">◆ Still Deciding?</p>
            <h3 className="font-display text-4xl lg:text-5xl text-white mt-3">Talk To A Coach.</h3>
            <p className="text-white/60 mt-3 max-w-md mx-auto">Free consultation. We'll match you to the right plan and trainer.</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#E8192C] text-white px-6 py-3 font-condensed font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#E8192C] transition-colors">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 font-condensed font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ComparisonTable() {
  const rows = [
    ["Gym Access", "6AM–10PM", "24/7", "24/7"],
    ["Group Classes", "2/week", "Unlimited", "Unlimited"],
    ["Personal Training", "—", "1/mo", "4/mo"],
    ["Locker", "Shared", "Shared + Towel", "Dedicated"],
    ["App Access", "—", "✓", "✓"],
    ["Body Scan (DEXA)", "—", "—", "Monthly"],
    ["Recovery Room", "—", "—", "✓"],
    ["Guest Passes", "—", "—", "2/mo"],
    ["Multi-Location", "✓", "✓", "✓"],
  ];
  return (
    <div className="mt-20">
      <h3 className="font-display text-4xl text-white mb-6">Full Comparison</h3>
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#111] text-white/60 font-condensed uppercase tracking-widest text-xs">
              <th className="text-left p-4">Feature</th>
              <th className="p-4">Starter</th>
              <th className="p-4 text-[#E8192C]">Pro</th>
              <th className="p-4 text-[#C9A84C]">Elite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r[0]} className="text-white/80">
                <td className="p-4 text-white">{r[0]}</td>
                <td className="p-4 text-center">{r[1]}</td>
                <td className="p-4 text-center">{r[2]}</td>
                <td className="p-4 text-center">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-20">
      <h3 className="font-display text-4xl text-white mb-6">Frequently Asked</h3>
      <div className="border border-white/10 divide-y divide-white/10">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5"
              >
                <span className="font-condensed uppercase tracking-wider text-white">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-[#E8192C]">
                  <Plus size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-white/70 text-sm leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
