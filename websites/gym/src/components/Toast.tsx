import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

let listeners: ((m: string) => void)[] = [];
export function showToast(msg: string) { listeners.forEach((l) => l(msg)); }

export default function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const l = (m: string) => {
      setMsg(m);
      window.setTimeout(() => setMsg(null), 3000);
    };
    listeners.push(l);
    return () => { listeners = listeners.filter((x) => x !== l); };
  }, []);
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-[#E8192C] text-white px-6 py-3 font-condensed uppercase tracking-widest text-sm shadow-2xl"
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
