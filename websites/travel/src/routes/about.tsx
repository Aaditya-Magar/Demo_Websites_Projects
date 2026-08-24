import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Globe, Users, Heart } from "lucide-react";
import { PageWrap, SectionHeader } from "@/components/site/UI";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WanderNest — 18 Years of Family Travel" },
      { name: "description", content: "Founded in Mumbai in 2007, WanderNest has built itineraries for 50,000+ families across 500+ destinations." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageWrap>
      <section className="relative bg-[var(--twilight-deep)] pt-32 pb-20 text-white">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="text-xs font-sans-ui font-semibold tracking-[0.2em] uppercase text-[var(--amber-h)] mb-3">OUR STORY</div>
          <h1 className="font-display italic text-4xl lg:text-6xl leading-tight max-w-3xl">A Mumbai family. A love letter to the world.</h1>
          <p className="mt-6 max-w-2xl text-white/75 font-sans-ui text-lg leading-relaxed">
            WanderNest began in 2007 in a small office above a Nariman Point bookshop. Today, we're 60 travel experts across five Indian cities — and one mission still drives us: hand-built holidays that feel personal.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cloud)] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid md:grid-cols-4 gap-5">
          {[
            { i: <Award className="w-5 h-5" />, n: "18", l: "Years" },
            { i: <Globe className="w-5 h-5" />, n: "500+", l: "Destinations" },
            { i: <Users className="w-5 h-5" />, n: "50,000+", l: "Families" },
            { i: <Heart className="w-5 h-5" />, n: "4.9★", l: "Google Rating" },
          ].map((s) => (
            <div key={s.l} className="bg-white rounded-2xl p-6 text-center">
              <div className="w-11 h-11 rounded-full bg-[var(--amber-h)]/15 text-[var(--amber-h)] flex items-center justify-center mx-auto mb-3">{s.i}</div>
              <div className="font-display text-3xl text-[var(--twilight-deep)]">{s.n}</div>
              <div className="text-xs text-[var(--stone)] font-sans-ui mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 prose prose-lg">
          <SectionHeader overline="THE WANDERNEST WAY" title="Why we do this" />
          <p className="text-[var(--stone)] font-sans-ui leading-relaxed">
            We believe a holiday is more than a transaction. It's the first time your child sees the ocean. It's a grandparent's silence in front of the Taj. It's an anniversary on an overwater villa.
          </p>
          <p className="text-[var(--stone)] font-sans-ui leading-relaxed mt-4">
            We don't sell packages. We design memories. Every itinerary is built around your family's pace, ages, dreams and budget. There are no cookie-cutter plans here.
          </p>
          <div className="mt-10">
            <Link to="/contact" className="inline-block px-6 py-3 rounded-full bg-[var(--amber-h)] text-[var(--twilight-deep)] font-sans-ui font-semibold">Talk to a Travel Expert →</Link>
          </div>
        </div>
      </section>
    </PageWrap>
  );
}