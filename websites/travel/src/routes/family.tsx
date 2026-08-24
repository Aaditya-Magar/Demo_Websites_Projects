import { createFileRoute } from "@tanstack/react-router";
import { packages } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";
import { PackageCard } from "./index";

export const Route = createFileRoute("/family")({
  head: () => ({ meta: [{ title: "Family Holidays — WanderNest" }, { name: "description", content: "Holidays the whole family loves." }] }),
  component: () => {
    const list = packages.filter((p) => p.type === "family");
    const features = ["Kid-friendly hotels","Child-paced itineraries","Safe destinations","Senior-friendly options","School holiday specials","Family group discounts"];
    return (
      <PageWrap>
        <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
          <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920" className="absolute inset-0 w-full h-full object-cover animate-kenburns" alt="" />
          <div className="absolute inset-0 bg-[rgba(7,13,24,0.55)]" />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 text-white">
            <h1 className="font-display italic text-6xl lg:text-8xl">Holidays The Whole Family Loves</h1>
          </div>
        </section>
        <section className="py-20 bg-[var(--cloud)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <SectionHeader overline="FAMILY-FIRST" title="Built for Every Age" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => <div key={f} className="bg-white p-5 rounded-xl border border-[var(--border)] font-sans-ui font-medium">✓ {f}</div>)}
            </div>
          </div>
        </section>
        <section className="py-20 bg-[var(--ivory)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <SectionHeader overline="FAMILY PACKAGES" title="Top Picks for Families" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => <PackageCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      </PageWrap>
    );
  },
});
