import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section className="bg-vela-charcoal px-6 py-24 text-vela-cream md:px-10 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-[10px] uppercase tracking-vela text-vela-terracotta md:text-xs">
          Letters from VELA
        </p>
        <h2 className="font-display text-5xl italic leading-none md:text-7xl">Join the Inner Circle</h2>
        <p className="mt-6 text-sm text-vela-cream/70 md:text-base">
          Be first to know. New drops, exclusive offers, style notes — once a fortnight, never more.
        </p>

        <div className="relative mt-12 h-20">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submit}
                className="absolute inset-x-0 mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 border border-vela-cream/30 bg-transparent px-5 py-4 text-sm text-vela-cream placeholder:text-vela-cream/40 focus:border-vela-terracotta focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-vela-terracotta px-8 py-4 text-xs uppercase tracking-wider-2 text-vela-cream transition hover:bg-vela-cream hover:text-vela-charcoal"
                >
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 flex flex-col items-center"
              >
                <svg width="56" height="56" viewBox="0 0 56 56" className="mb-4">
                  <circle cx="28" cy="28" r="26" stroke="hsl(var(--vela-terracotta))" strokeWidth="1.5" fill="none" />
                  <motion.path
                    d="M16 29 L25 38 L41 19"
                    fill="none"
                    stroke="hsl(var(--vela-terracotta))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <p className="font-display text-3xl italic">You're in. Welcome to VELA.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-xs text-vela-cream/40">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};
