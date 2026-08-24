import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { menuItems } from "@/data/cafe";

export const Route = createFileRoute("/menu/$id")({
  loader: ({ params }) => {
    const item = menuItems.find((m) => m.id === params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.item.name} — Brew Haven Café` },
          { name: "description", content: loaderData.item.description },
          { property: "og:title", content: `${loaderData.item.name} — Brew Haven` },
          { property: "og:description", content: loaderData.item.description },
          { property: "og:image", content: loaderData.item.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="pt-40 text-center">
      <h1 className="font-display text-4xl text-primary">Item not found</h1>
      <Link to="/menu" className="mt-6 inline-flex text-accent">Back to menu</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-40 text-center">
      <h1 className="font-display text-3xl text-primary">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ItemDetail,
});

function ItemDetail() {
  const { item } = Route.useLoaderData();
  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
      <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back to menu
      </Link>

      <div className="mt-8 grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden shadow-card aspect-square"
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/15 text-accent font-semibold tracking-widest uppercase">
            {item.category}
          </span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-primary">{item.name}</h1>
          <div className="mt-4 text-3xl font-semibold text-accent">${item.price.toFixed(2)}</div>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{item.description}</p>

          <h3 className="mt-10 font-display text-xl text-primary">Ingredients</h3>
          <ul className="mt-4 space-y-2">
            {item.ingredients.map((ing: string) => (
              <li key={ing} className="flex items-center gap-2 text-foreground/80">
                <Check className="w-4 h-4 text-accent" /> {ing}
              </li>
            ))}
          </ul>

          <Link to="/reservation" className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all">
            Reserve a Table to Try It
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
