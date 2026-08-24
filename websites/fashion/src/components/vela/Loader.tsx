import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-vela-charcoal"
        >
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-display text-5xl font-semibold text-vela-cream tracking-vela md:text-7xl"
          >
            VELA
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 h-px w-40 origin-left -translate-x-1/2 bg-vela-terracotta"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
