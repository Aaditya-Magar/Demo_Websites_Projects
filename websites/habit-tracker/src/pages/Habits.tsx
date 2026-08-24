import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addMonths, endOfMonth, format, isSameDay, isSameMonth, startOfMonth,
} from "date-fns";
import { Check, ChevronLeft, ChevronRight, Pencil, Plus, Trash2, Flame, Target, TrendingUp } from "lucide-react";
import { habitsRepo, logsRepo, type Habit, type HabitLog } from "@/lib/db";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import HabitDialog from "@/components/HabitDialog";
import { rateLimit, SafeError } from "@/lib/security";

export default function HabitsPage() {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, HabitLog>>({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const today = new Date();
  const days = useMemo(() => {
    const end = endOfMonth(cursor).getDate();
    return Array.from({ length: end }, (_, i) => i + 1);
  }, [cursor]);

  async function refresh() {
    const [h, l] = await Promise.all([habitsRepo.list(), logsRepo.all()]);
    h.sort((a, b) => a.created_at.localeCompare(b.created_at));
    setHabits(h);
    const map: Record<string, HabitLog> = {};
    for (const log of l) map[log.id] = log;
    setLogs(map);
    setLoading(false);
  }

  useEffect(() => {
    refresh().catch((e) => { console.error(e); toast.error("Failed to load habits"); setLoading(false); });
  }, []);

  const dateStr = (day: number) =>
    format(new Date(cursor.getFullYear(), cursor.getMonth(), day), "yyyy-MM-dd");

  async function handleCreate(data: { name: string; description: string; icon: string }) {
    if (!rateLimit("habit:create", 500)) return;
    try {
      await habitsRepo.create(data);
      refresh();
      toast.success(`${data.icon} ${data.name} added`);
    } catch (e) {
      toast.error(e instanceof SafeError ? e.userMessage : "Could not add habit");
    }
  }

  async function handleSaveHabit(data: { name: string; description: string; icon: string }) {
    if (!editingHabit) {
      await handleCreate(data);
      return;
    }
    if (!rateLimit(`habit:update:${editingHabit.id}`, 500)) return;
    try {
      await habitsRepo.update(editingHabit.id, data);
      setEditingHabit(null);
      refresh();
      toast.success(`${data.icon} ${data.name} updated`);
    } catch (e) {
      toast.error(e instanceof SafeError ? e.userMessage : "Could not update habit");
    }
  }

  async function handleToggle(habitId: string, day: number) {
    if (!rateLimit(`habit:toggle:${habitId}:${day}`, 150)) return;
    try {
      const ds = dateStr(day);
      const next = await logsRepo.toggle(habitId, ds);
      setLogs((p) => ({ ...p, [next.id]: next }));
    } catch (e) {
      toast.error(e instanceof SafeError ? e.userMessage : "Could not update");
    }
  }

  async function handleDelete(id: string) {
    if (!rateLimit(`habit:delete:${id}`, 500)) return;
    if (!confirm("Delete this habit and all its history?")) return;
    try {
      await habitsRepo.remove(id);
      refresh();
      toast.success("Habit deleted");
    } catch {
      toast.error("Could not delete habit");
    }
  }

  // ---- Stats for header
  const todayStr = format(today, "yyyy-MM-dd");
  const monthDates = days.map((d) => dateStr(d));
  const completedToday = habits.filter((h) => logs[`${h.id}_${todayStr}`]?.completed === 1).length;
  const monthDone = habits.reduce((acc, h) => acc + monthDates.filter((d) => logs[`${h.id}_${d}`]?.completed === 1).length, 0);
  const monthTotal = habits.length * days.length;
  const monthPct = monthTotal ? Math.round((monthDone / monthTotal) * 100) : 0;

  const stats = [
    { label: "Today", value: `${completedToday}/${habits.length || 0}`, icon: Target, hue: "from-emerald-400 to-teal-500" },
    { label: "Month rate", value: `${monthPct}%`, icon: TrendingUp, hue: "from-cyan-400 to-emerald-500" },
    { label: "Habits", value: `${habits.length}`, icon: Flame, hue: "from-amber-400 to-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <HabitDialog
        open={dialogOpen}
        habit={editingHabit}
        onClose={() => {
          setDialogOpen(false);
          setEditingHabit(null);
        }}
        onSubmit={handleSaveHabit}
      />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 p-6 sm:p-8"
        style={{ backgroundImage: "var(--gradient-card)" }}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-64" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Daily rituals</p>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              <span className="gradient-text">{format(cursor, "MMMM")}</span>{" "}
              <span className="text-foreground/80">{format(cursor, "yyyy")}</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Track every day. Small steps, big change.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setCursor((c) => addMonths(c, -1))} className="rounded-xl border border-border/60 bg-card/60 p-2.5 text-muted-foreground transition-all hover:scale-105 hover:text-foreground" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </button>

            <select
              value={cursor.getMonth()}
              onChange={(e) => setCursor(new Date(cursor.getFullYear(), Number(e.target.value), 1))}
              className="cursor-pointer rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-secondary focus:ring-2 focus:ring-primary/40 [&>option]:bg-popover [&>option]:text-foreground"
              aria-label="Select month"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>{format(new Date(2000, i, 1), "MMMM")}</option>
              ))}
            </select>

            <select
              value={cursor.getFullYear()}
              onChange={(e) => setCursor(new Date(Number(e.target.value), cursor.getMonth(), 1))}
              className="cursor-pointer rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-secondary focus:ring-2 focus:ring-primary/40 [&>option]:bg-popover [&>option]:text-foreground"
              aria-label="Select year"
            >
              {Array.from({ length: 131 }, (_, i) => 1970 + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <button onClick={() => setCursor(startOfMonth(new Date()))} className="rounded-xl border border-border/60 bg-card/60 px-4 py-2 text-sm font-medium hover:bg-secondary">
              Today
            </button>
            <button onClick={() => setCursor((c) => addMonths(c, 1))} className="rounded-xl border border-border/60 bg-card/60 p-2.5 text-muted-foreground transition-all hover:scale-105 hover:text-foreground" aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${s.hue} text-white shadow-lg`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
              <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Add */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingHabit(null);
            setDialogOpen(true);
          }}
          className="group flex items-center gap-2 rounded-2xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow transition-all hover:scale-[1.03]"
        >
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" /> New Habit
        </button>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="overflow-hidden rounded-2xl border border-border/60"
        style={{ backgroundImage: "var(--gradient-card)" }}
      >
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">Loading…</div>
        ) : habits.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl gradient-primary glow animate-float">
              <Plus className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="font-display text-xl font-semibold">No habits yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Click "New Habit" to begin your journey.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="sticky left-0 z-10 min-w-[200px] bg-card/90 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                    Habit
                  </th>
                  {days.map((d) => {
                    const date = new Date(cursor.getFullYear(), cursor.getMonth(), d);
                    const isToday = isSameMonth(date, today) && isSameDay(date, today);
                    return (
                      <th key={d} className={cn(
                        "w-9 px-0 py-2 text-center text-[11px] font-medium",
                        isToday ? "text-primary" : "text-muted-foreground",
                      )}>
                        <div className="font-display font-bold">{d}</div>
                        <div className="text-[9px] opacity-60">{format(date, "EEEEE")}</div>
                      </th>
                    );
                  })}
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {habits.map((h, idx) => (
                    <motion.tr
                      key={h.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group border-b border-border/40 last:border-0 hover:bg-primary/5"
                    >
                      <td className="sticky left-0 z-10 bg-card/90 px-4 py-2.5 backdrop-blur group-hover:bg-primary/[0.04]">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{h.icon || "✨"}</span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{h.name}</div>
                            {h.description && <div className="truncate text-[11px] text-muted-foreground">{h.description}</div>}
                          </div>
                          <button
                            onClick={() => {
                              setEditingHabit(h);
                              setDialogOpen(true);
                            }}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Edit habit"
                          >
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      </td>
                      {days.map((d) => {
                        const ds = dateStr(d);
                        const log = logs[`${h.id}_${ds}`];
                        const done = log?.completed === 1;
                        const date = new Date(cursor.getFullYear(), cursor.getMonth(), d);
                        const isToday = isSameMonth(date, today) && isSameDay(date, today);
                        return (
                          <td key={d} className="p-1 text-center">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              whileHover={{ scale: 1.15 }}
                              onClick={() => handleToggle(h.id, d)}
                              aria-label={`${h.name} on ${ds}`}
                              className={cn(
                                "habit-cell mx-auto grid h-7 w-7 place-items-center rounded-full border border-border/70 bg-background/40",
                                done && "habit-cell-done border-transparent",
                                isToday && !done && "habit-cell-today",
                              )}
                            >
                              {done && (
                                <motion.span
                                  initial={{ scale: 0, rotate: -90 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                                >
                                  <Check className="h-4 w-4 text-white" strokeWidth={3.5} />
                                </motion.span>
                              )}
                            </motion.button>
                          </td>
                        );
                      })}
                      <td className="px-3">
                        <button onClick={() => handleDelete(h.id)} className="text-muted-foreground opacity-0 transition-all hover:text-destructive group-hover:opacity-100" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
