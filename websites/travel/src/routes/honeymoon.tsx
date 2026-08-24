import { createFileRoute } from "@tanstack/react-router";
import { packages } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";
import { PackageCard } from "./index";

export const Route = createFileRoute("/honeymoon")({
  head: () => ({ meta: [{ title: "Honeymoon Specials — WanderNest" }, { name: "description", content: "Romantic escapes crafted down to the last petal." }] }),
  component: () => {
    const list = packages.filter((p) => p.type === "honeymoon");
    return (
      <PageWrap>
        <section className="relative h-[80vh] min-h-[520px] flex items-end overflow-hidden">
          <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920" className="absolute inset-0 w-full h-full object-cover animate-kenburns" alt="" />
          <div className="absolute inset-0 bg-[rgba(7,13,24,0.55)]" />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 text-white">
            <h1 className="font-display italic text-6xl lg:text-8xl">Begin Your Forever</h1>
            <p className="mt-4 text-white/80 max-w-xl font-sans-ui text-lg">Romantic escapes crafted down to the last petal.</p>
          </div>
        </section>
        <section className="py-20 bg-[var(--ivory)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <SectionHeader overline="HONEYMOON SPECIALS" title="Curated for Two" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => <PackageCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      </PageWrap>
    );
  },
});
