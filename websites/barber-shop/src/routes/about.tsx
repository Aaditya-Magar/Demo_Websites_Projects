import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CutCraft Studios" },
      { name: "description", content: "The story, vision and team behind CutCraft Studios." },
      { property: "og:title", content: "About CutCraft" },
      { property: "og:description", content: "We're a small studio with a big obsession: pacing." },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "Lena Park", role: "Creative Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
  { name: "Jules Okafor", role: "Lead Editor", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Mira Solano", role: "Motion Designer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" },
  { name: "Theo Vance", role: "Colorist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
];

const timeline = [
  { year: "2019", title: "The first cut", desc: "Two friends edit a friend's vlog at 3am. It hits 2M views." },
  { year: "2021", title: "Studio launch", desc: "CutCraft opens its LA edit bay with a roster of 12 creators." },
  { year: "2023", title: "100M views", desc: "We cross 100 million views generated for our clients." },
  { year: "2026", title: "Global team", desc: "20+ editors across 6 timezones. Always on, always crafting." },
];

function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="absolute inset-x-0 -top-10 -z-10 h-[400px] bg-radial-glow opacity-70" />
        <p className="text-xs uppercase tracking-widest text-electric">Our Story</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">A studio built on <span className="gradient-text">obsession</span>.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          CutCraft was started in a Los Angeles bedroom by two editors who couldn't stand boring cuts. Six years later we're a global edit collective serving creators and brands who refuse to look average.
        </p>
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-6">
        <h2 className="font-display text-3xl md:text-5xl text-center">The <span className="gradient-text">timeline</span>.</h2>
        <div className="relative mt-14">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-electric to-transparent md:left-1/2" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative grid items-start gap-4 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <p className="font-display text-4xl gradient-text">{t.year}</p>
                  <h3 className="mt-1 font-display text-2xl">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-background glow-purple md:left-1/2 md:-translate-x-1/2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <h2 className="font-display text-3xl md:text-5xl">The <span className="gradient-text">crew</span>.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="group overflow-hidden rounded-2xl border border-border">
              <div className="relative">
                <img src={m.img} alt={m.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-xl">{m.name}</p>
                  <p className="text-xs text-electric">{m.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-4xl px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-electric">Vision</p>
        <h2 className="mt-3 font-display text-4xl md:text-6xl">Every frame, on <span className="gradient-text">purpose</span>.</h2>
        <p className="mt-6 text-muted-foreground">
          We believe attention is the most valuable currency on the internet. Our job is to honor it — with cuts that respect the viewer and reward the creator.
        </p>
      </section>
    </div>
  );
}
