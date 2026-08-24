import { Heart, Instagram } from "lucide-react";

const grid = [
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600", likes: "2.4k" },
  { src: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600", likes: "1.8k" },
  { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600", likes: "3.1k" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", likes: "2.7k" },
  { src: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600", likes: "1.5k" },
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600", likes: "4.2k" },
];

export const InstagramStrip = () => {
  return (
    <section className="bg-vela-cream px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1440px] text-center">
        <h2 className="font-display text-4xl italic md:text-5xl">@wearVELA</h2>
        <p className="mt-2 text-sm text-vela-stone">Follow our story on Instagram</p>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {grid.map((g, i) => (
            <a
              key={i}
              href="#"
              className="group relative block aspect-square overflow-hidden"
            >
              <img
                src={g.src}
                alt={`Instagram post ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-vela-terracotta/0 text-vela-cream opacity-0 transition-all duration-400 group-hover:bg-vela-terracotta/85 group-hover:opacity-100">
                <Instagram size={22} strokeWidth={1.4} />
                <div className="flex items-center gap-1.5 text-xs">
                  <Heart size={13} fill="currentColor" strokeWidth={0} /> {g.likes}
                </div>
              </div>
            </a>
          ))}
        </div>

        <a
          href="#"
          className="mt-12 inline-block border border-vela-charcoal px-10 py-4 text-xs uppercase tracking-wider-2 transition hover:bg-vela-charcoal hover:text-vela-cream"
        >
          Follow Us
        </a>
      </div>
    </section>
  );
};
