import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Habit } from "@/lib/db";

const ICONS = [
  "🏃", "📚", "🧘", "💧", "😴", "💻", "🤝", "🎵", "🏋️",
  "🧘‍♂️", "🥗", "📖", "🙏", "💼", "🚴", "🏊", "🚶", "✨",
  "✍️", "🎨", "🌱", "☀️", "🍎", "💊", "🦷", "🧠", "❤️",
  "🎯", "⏰", "🌙", "☕", "🥑", "🚭", "📵", "🎸", "🌍",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; icon: string }) => void;
  habit?: Habit | null;
}

export default function HabitDialog({ open, onClose, onSubmit, habit }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🏃");
  const isEditing = Boolean(habit);

  useEffect(() => {
    if (!open) return;
    setName(habit?.name ?? "");
    setDescription(habit?.description ?? "");
    setIcon(habit?.icon ?? "🏃");
  }, [habit, open]);

  function submit() {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim(), icon });
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
            style={{ backgroundImage: "var(--gradient-card)" }}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-32 h-64" style={{ background: "var(--gradient-glow)" }} />

            <div className="relative flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">{isEditing ? "Edit Habit" : "Create New Habit"}</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Habit Name</label>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="e.g., Morning Run"
                  className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Icon</label>
                <div className="grid max-h-36 grid-cols-9 gap-1.5 overflow-y-auto rounded-xl border border-border/60 bg-background/40 p-2">
                  {ICONS.map((i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setIcon(i)}
                      className={`grid h-9 w-9 place-items-center rounded-lg text-lg transition-all hover:scale-110 ${
                        icon === i ? "bg-primary/20 ring-2 ring-primary" : "bg-secondary/60 hover:bg-secondary"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-6 flex justify-end gap-2">
              <button onClick={onClose} className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary">
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={!name.trim()}
                className="rounded-xl gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground glow transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {isEditing ? "Save Changes" : "Create Habit"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
