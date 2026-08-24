import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { dishes } from "@/data/dishes";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/menu/$id")({
  loader: ({ params }) => {
    const dish = dishes.find((d) => d.id === params.id);
    if (!dish) throw notFound();
    return { dish };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.dish.name} — Royal Spice House` },
          { name: "description", content: loaderData.dish.short },
          { property: "og:title", content: `${loaderData.dish.name} — Royal Spice House` },
          { property: "og:description", content: loaderData.dish.short },
          { property: "og:image", content: loaderData.dish.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen pt-40 pb-20 text-center bg-cream">
      <h1 className="font-display text-4xl text-maroon">Dish not found</h1>
      <Link to="/menu" className="mt-6 inline-block text-gold underline">Back to menu</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen pt-40 pb-20 text-center bg-cream">
      <h1 className="font-display text-3xl text-maroon">Something went wrong</h1>
      <p className="text-foreground/70 mt-2">{error.message}</p>
    </div>
  ),
  component: DishDetail,
});

function DishDetail() {
  const { dish } = Route.useLoaderData();
  return (
    <section className="bg-cream pt-32 pb-24">
      <div className="container mx-auto px-6">
        <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-maroon mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden glow-gold">
              <img src={dish.image} alt={dish.name} className="w-full h-[520px] object-cover" />
              <span className={`absolute top-4 left-4 h-6 w-6 rounded-sm border-2 grid place-items-center bg-white ${dish.veg ? "border-green-700" : "border-red-700"}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${dish.veg ? "bg-green-700" : "bg-red-700"}`} />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-gold tracking-[0.4em] uppercase text-xs">{dish.category}</span>
            <h1 className="font-display text-5xl md:text-6xl text-maroon mt-3">{dish.name}</h1>
            <div className="ornate-divider my-6 max-w-xs ml-0" />
            <p className="text-foreground/75 leading-relaxed">{dish.description}</p>

            <div className="mt-8">
              <h3 className="font-display text-xl text-maroon">Ingredients</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {dish.ingredients.map((ing) => (
                  <li key={ing} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex items-center justify-between p-6 rounded-2xl bg-white border border-gold/30">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">Price</p>
                <p className="font-display text-4xl text-maroon mt-1">₹{dish.price}</p>
              </div>
              <Link to="/reservation" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon text-cream font-semibold hover:bg-gold hover:text-[color:var(--dark-brown)] hover:glow-gold transition-all">
                Reserve a table <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
