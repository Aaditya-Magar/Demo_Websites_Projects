import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";

const KEY = "shtk_privacy_dismissed";

export default function PrivacyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch { /* storage blocked — skip */ }
  }, []);

  function dismiss() {
    setOpen(false);
    try { localStorage.setItem(KEY, "1"); } catch { /* noop */ }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl border border-border/60 bg-card/95 p-4 backdrop-blur-xl shadow-2xl sm:bottom-6 sm:right-6"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-primary glow">
              <Lock className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold">Your data stays with you</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Everything is stored locally on this device and encrypted at rest. Nothing is uploaded anywhere.
              </p>
              <button
                onClick={dismiss}
                className="mt-3 text-xs font-medium text-primary hover:underline"
              >
                Got it
              </button>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
