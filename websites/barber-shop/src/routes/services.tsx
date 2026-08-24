import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Youtube, Film, Megaphone, Mic, Sparkles, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CutCraft Studios" },
      { name: "description", content: "YouTube, Reels, Ads, Motion Graphics & Podcast editing services." },
      { property: "og:title", content: "CutCraft Services" },
      { property: "og:description", content: "Edit services engineered for performance." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Youtube, title: "YouTube Editing", desc: "Long-form storytelling that retains viewers from second one to outro.", features: ["Story-arc structuring", "B-roll & sound design", "Custom thumbnails", "Color grading"], from: "$450 / video" },
  { icon: Film, title: "Short-form Content", desc: "Reels, Shorts and TikToks engineered to break the algorithm.", features: ["Hook engineering", "Beat-sync cuts", "Animated captions", "Bulk packs"], from: "$120 / clip" },
  { icon: Megaphone, title: "Ad Creatives", desc: "Performance ads that convert scroll into action.", features: ["UGC + studio", "A/B variants", "Hook iteration", "Vertical + horizontal"], from: "$650 / spot" },
  { icon: Sparkles, title: "Motion Graphics", desc: "Custom 2D/3D motion design, type animation and brand identities in motion.", features: ["Logo stings", "Lower thirds", "Explainer animation", "Title sequences"], from: "$300 / scene" },
  { icon: Mic, title: "Podcast Production", desc: "Multi-cam podcast edits with broadcast polish and full clip workflow.", features: ["Multi-cam sync", "Audio mastering", "Clip cutting", "Captions"], from: "$400 / episode" },
  { icon: Sparkles, title: "Color & Finishing", desc: "Standalone color grading and final delivery for projects you've cut yourself.", features: ["Show LUTs", "HDR delivery", "Clean masters", "Quality checks"], from: "$220 / video" },
];

function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="absolute inset-x-0 -top-10 -z-10 h-[400px] bg-radial-glow opacity-70" />
        <p className="text-xs uppercase tracking-widest text-electric">What we do</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">Editing as a <span className="gradient-text">craft</span>.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          We're a full-stack edit studio. Whether you need one Reel or a season of long-form, we plug in and ship.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-border bg-surface/50 p-7 transition hover:border-primary/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:glow-purple">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-electric" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Starting at</p>
                <p className="font-display text-xl text-electric">{s.from}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border border-border bg-surface/60 p-10 text-center md:p-14 neon-border">
          <h2 className="font-display text-4xl md:text-5xl">Need something custom?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">From documentary to commercial — we scope hybrid packages every week.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-purple transition hover:scale-105">
            Talk to a producer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
