import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CutCraft Studios" },
      { name: "description", content: "Transparent pricing for creators, brands and agencies." },
      { property: "og:title", content: "CutCraft Pricing" },
      { property: "og:description", content: "Three plans. No surprises. All cinematic." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  { name: "Starter", price: "$1,200", period: "/ month", desc: "For solo creators just getting consistent.", features: ["4 long-form videos", "Basic motion graphics", "48hr turnaround", "1 round of revisions", "Email support"], cta: "Start with Starter", featured: false },
  { name: "Pro", price: "$3,400", period: "/ month", desc: "Our most popular plan for scaling channels.", features: ["8 long-form + 12 shorts", "Custom motion design", "24hr turnaround", "Unlimited revisions", "Dedicated editor", "Slack channel"], cta: "Go Pro", featured: true },
  { name: "Agency", price: "Custom", period: "", desc: "For brands, agencies and full-stack production.", features: ["Unlimited deliverables", "Full creative team", "Same-day priority", "Strategy + research", "Account director", "SLA & contract"], cta: "Talk to sales", featured: false },
];

function PricingPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="absolute inset-x-0 -top-10 -z-10 h-[400px] bg-radial-glow opacity-70" />
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-electric">Pricing</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">Simple, <span className="gradient-text">cinematic</span>.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">No hidden fees. Cancel anytime. Always shipped on a deadline.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl border bg-surface/50 p-8 transition ${
                p.featured ? "border-primary/60 glow-purple" : "border-border hover:border-electric/50"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
                  <Sparkles className="mr-1 inline h-3 w-3" /> Most Popular
                </div>
              )}
              <h3 className="font-display text-3xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl gradient-text">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  p.featured
                    ? "bg-primary text-primary-foreground hover:scale-105"
                    : "border border-border hover:border-electric hover:text-electric"
                }`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid gap-6 rounded-2xl border border-border bg-surface/30 p-8 md:grid-cols-3">
          {[
            ["Cancel anytime", "Month-to-month, no contracts."],
            ["Hand-picked editors", "Senior editors only — no juniors hiding behind brand."],
            ["Money-back week one", "If we miss the brief in week one, full refund."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-display text-xl">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
