import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/site";
import { PageWrap, SectionHeader } from "@/components/site/UI";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Travel Stories — WanderNest" }, { name: "description", content: "Travel stories & insider tips from our experts." }] }),
  component: () => (
    <PageWrap>
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600" className="absolute inset-0 w-full h-full object-cover animate-kenburns" alt="" />
        <div className="absolute inset-0 bg-[rgba(7,13,24,0.7)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pb-14 text-white">
          <h1 className="font-display italic text-5xl lg:text-7xl">Travel Stories & Insider Tips</h1>
        </div>
      </section>
      <section className="py-20 bg-[var(--ivory)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionHeader overline="STORIES" title="From The Road" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((b) => (
              <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="group block bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:-translate-y-1.5 hover:shadow-xl transition">
                <div className="h-52 overflow-hidden"><img src={b.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <div className="p-5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--amber-h)]/20 text-[var(--amber-h)] font-semibold">{b.category}</span>
                  <h3 className="font-display text-xl mt-2 leading-tight">{b.title}</h3>
                  <p className="text-sm text-[var(--stone)] mt-2 font-sans-ui line-clamp-2">{b.excerpt}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-[var(--stone)]">
                    <img src={b.authorPhoto} className="w-6 h-6 rounded-full object-cover" alt="" />{b.author} · {b.read} min
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  ),
});
