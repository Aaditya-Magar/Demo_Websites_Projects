import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Royal Spice House" },
      { name: "description", content: "Our story, our chef and our vision — bringing authentic royal Indian flavours to the modern table." },
      { property: "og:title", content: "About Royal Spice House" },
      { property: "og:description", content: "A heritage of authentic royal Indian flavours since 2009." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2009", title: "The Beginning", text: "Royal Spice House opens its doors in Connaught Place with 12 tables and a single tandoor." },
  { year: "2013", title: "First Awards", text: "Recognised among Delhi's top 10 Indian restaurants by leading food critics." },
  { year: "2017", title: "Heritage Wing", text: "Expansion of the dining hall with hand-painted Mughal frescoes and brass chandeliers." },
  { year: "2021", title: "Master Class", text: "Chef Arjun launches culinary masterclasses celebrating regional Indian heritage." },
  { year: "2024", title: "A Royal Legacy", text: "100,000+ guests served. A new chapter begins with a refreshed seasonal menu." },
];

function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 bg-[color:var(--dark-brown)] text-cream text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--dark-brown)]" />
        <div className="relative container mx-auto px-6">
          <p className="text-gold tracking-[0.4em] uppercase text-xs">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl mt-3 text-gradient-gold">A Legacy of Flavour</h1>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80"
              alt="Chef Arjun Kapoor" className="rounded-3xl w-full h-[560px] object-cover shadow-2xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-gold tracking-[0.4em] uppercase text-xs">Meet The Chef</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mt-3">Chef Arjun Kapoor</h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              Born in Lucknow and trained in the royal kitchens of Rajasthan, Chef Arjun has spent 25 years studying the regional cuisines of India. He believes a great meal is a story — and every plate at Royal Spice House tells a chapter.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              His approach blends generations-old techniques with modern presentation, honouring tradition without resisting evolution.
            </p>
            <blockquote className="mt-6 pl-5 border-l-2 border-gold text-maroon font-display text-xl italic">
              "Spices are memories. We cook to keep them alive."
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--dark-brown)] text-cream py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <p className="text-center text-gold tracking-[0.4em] uppercase text-xs">Our Journey</p>
            <h2 className="text-center font-display text-4xl md:text-5xl mt-3">A Royal Timeline</h2>
            <div className="ornate-divider mt-6 max-w-md mx-auto" />
          </Reveal>

          <div className="mt-16 relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/30" />
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className={`relative flex md:items-center gap-6 mb-12 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  <div className="md:w-1/2" />
                  <span className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-gold glow-gold" />
                  <div className="ml-12 md:ml-0 md:w-1/2 p-6 rounded-2xl bg-white/5 backdrop-blur border border-gold/20">
                    <span className="font-display text-2xl text-gradient-gold">{t.year}</span>
                    <h3 className="font-display text-xl text-cream mt-1">{t.title}</h3>
                    <p className="text-cream/75 text-sm mt-2">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <p className="text-gold tracking-[0.4em] uppercase text-xs">Our Vision</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mt-3">Where Heritage Meets Hospitality</h2>
            <p className="mt-6 text-foreground/75 leading-relaxed">
              We dream of a table where every guest feels like royalty. Where the warmth of Indian hospitality meets the artistry of its cuisine. That is Royal Spice House — yesterday, today and always.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
