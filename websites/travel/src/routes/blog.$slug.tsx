import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/data/site";
import { PageWrap } from "@/components/site/UI";

export const Route = createFileRoute("/blog/$slug")({
  component: () => {
    const { slug } = Route.useParams();
    const b = blogPosts.find((x) => x.slug === slug);
    if (!b) throw notFound();
    const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
    return (
      <PageWrap>
        <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img src={b.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-[rgba(7,13,24,0.5)]" />
        </section>
        <article className="py-16 bg-[var(--ivory)]">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <div className="text-xs text-[var(--stone)] font-sans-ui mb-3"><Link to="/blog" className="hover:text-[var(--amber-h)]">Blog</Link> · <span className="text-[var(--amber-h)] font-semibold">{b.category}</span> · {b.read} min read</div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">{b.title}</h1>
            <div className="flex items-center gap-3 mt-6 pb-6 border-b border-[var(--border)]">
              <img src={b.authorPhoto} className="w-12 h-12 rounded-full object-cover" alt="" />
              <div><div className="font-sans-ui font-semibold">{b.author}</div><div className="text-xs text-[var(--stone)]">WanderNest Expert</div></div>
            </div>
            <div className="mt-8 space-y-5 text-[var(--twilight-deep)]/85 leading-[1.85] text-[17px] font-sans-ui">
              {b.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-16">
            <h3 className="font-display text-2xl mb-4">You might also like</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="block bg-white rounded-xl overflow-hidden border border-[var(--border)]">
                  <img src={r.image} className="w-full h-32 object-cover" alt="" />
                  <div className="p-4 font-sans-ui font-semibold text-sm">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </PageWrap>
    );
  },
  notFoundComponent: () => <div className="min-h-screen flex items-center justify-center"><Link to="/blog" className="text-[var(--amber-h)]">← All stories</Link></div>,
});
