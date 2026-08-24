import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  eachDayOfInterval, endOfMonth, endOfWeek, endOfYear, format,
  startOfMonth, startOfWeek, startOfYear, subDays,
} from "date-fns";
import { Activity, Award, Flame, Target, TrendingUp } from "lucide-react";
import { habitsRepo, logsRepo, type Habit, type HabitLog } from "@/lib/db";

type Range = "today" | "weekly" | "monthly" | "yearly";

const RANGES: { key: Range; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

function getInterval(range: Range): { start: Date; end: Date } {
  const now = new Date();
  switch (range) {
    case "today": return { start: subDays(now, 6), end: now };
    case "weekly": return { start: startOfWeek(now), end: endOfWeek(now) };
    case "monthly": return { start: startOfMonth(now), end: endOfMonth(now) };
    case "yearly": return { start: startOfYear(now), end: endOfYear(now) };
  }
}

export default function AnalyticsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [range, setRange] = useState<Range>("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([habitsRepo.list(), logsRepo.all()])
      .then(([h, l]) => { setHabits(h); setLogs(l.filter((x) => x.completed === 1)); })
      .finally(() => setLoading(false));
  }, []);

  const { lineData, barData, completionPct, totalSlots, totalDone, perHabit } = useMemo(() => {
    const { start, end } = getInterval(range);
    const days = eachDayOfInterval({ start, end });
    const habitCount = habits.length || 1;
    const byDate = new Map<string, number>();
    for (const log of logs) byDate.set(log.date, (byDate.get(log.date) || 0) + 1);

    const line = days.map((d) => {
      const ds = format(d, "yyyy-MM-dd");
      const done = byDate.get(ds) || 0;
      return { date: format(d, days.length > 60 ? "MMM" : "MMM d"), completed: done, rate: Math.round((done / habitCount) * 100) };
    });

    let bar = line;
    if (range === "yearly") {
      const months = new Map<string, number>();
      for (const d of days) months.set(format(d, "MMM"), 0);
      for (const log of logs) {
        const dt = new Date(log.date);
        if (dt >= start && dt <= end) {
          const key = format(dt, "MMM");
          months.set(key, (months.get(key) || 0) + 1);
        }
      }
      bar = Array.from(months.entries()).map(([date, completed]) => ({ date, completed, rate: 0 }));
    }

    const slots = days.length * habitCount;
    const done = line.reduce((a, b) => a + b.completed, 0);

    const dateSet = new Set(days.map((d) => format(d, "yyyy-MM-dd")));
    const ph = habits.map((h) => {
      const c = logs.filter((l) => l.habit_id === h.id && dateSet.has(l.date)).length;
      return { name: h.name, icon: h.icon || "✨", completed: c, rate: Math.round((c / days.length) * 100) };
    }).sort((a, b) => b.completed - a.completed);

    return { lineData: line, barData: bar, completionPct: slots ? Math.round((done / slots) * 100) : 0, totalSlots: slots, totalDone: done, perHabit: ph };
  }, [habits, logs, range]);

  const { currentStreak, longestStreak } = useMemo(() => {
    const dates = new Set(logs.map((l) => l.date));
    let longest = 0, current = 0, cursor = new Date();
    while (dates.has(format(cursor, "yyyy-MM-dd"))) { current++; cursor = subDays(cursor, 1); }
    const sorted = Array.from(dates).sort();
    let run = 0; let prev: Date | null = null;
    for (const d of sorted) {
      const dt = new Date(d);
      if (prev && (dt.getTime() - prev.getTime()) / 86400000 === 1) run++;
      else run = 1;
      longest = Math.max(longest, run); prev = dt;
    }
    return { currentStreak: current, longestStreak: longest };
  }, [logs]);

  const stats = [
    { label: "Completion", value: `${completionPct}%`, icon: Target, hue: "from-emerald-400 to-teal-500" },
    { label: "Done", value: `${totalDone}/${totalSlots}`, icon: Activity, hue: "from-cyan-400 to-blue-500" },
    { label: "Current streak", value: `${currentStreak}d`, icon: Flame, hue: "from-amber-400 to-orange-500" },
    { label: "Longest streak", value: `${longestStreak}d`, icon: Award, hue: "from-fuchsia-400 to-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 p-6 sm:p-8"
        style={{ backgroundImage: "var(--gradient-card)" }}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-64" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Insights</p>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              Your <span className="gradient-text">progress</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Watch the small wins compound over time.</p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur">
            {RANGES.map((r) => (
              <button key={r.key} onClick={() => setRange(r.key)} className="relative">
                <span className={`relative z-10 block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${range === r.key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {range === r.key && (
                    <motion.span layoutId="rangepill" className="absolute inset-0 -z-10 rounded-full gradient-primary glow" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-border/60 p-5"
            style={{ backgroundImage: "var(--gradient-card)" }}
          >
            <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${s.hue} text-white shadow-lg`}>
              <s.icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-border/60 bg-card/60 p-12 text-center text-sm text-muted-foreground">Loading…</div>
      ) : habits.length === 0 ? (
        <div className="rounded-2xl border border-border/60 p-12 text-center" style={{ backgroundImage: "var(--gradient-card)" }}>
          <p className="font-display text-xl font-semibold">No data yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add habits and check them off to see analytics come alive.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-5 lg:grid-cols-3">
            <ChartCard title="Consistency over time" icon={TrendingUp} className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="completed" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Volume" icon={Activity}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary-glow))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "hsl(var(--primary) / 0.1)" }} />
                  <Bar dataKey="completed" fill="url(#bg1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Per-habit */}
          <ChartCard title="Habit leaderboard" icon={Award}>
            <div className="space-y-3">
              {perHabit.map((h, i) => (
                <motion.div
                  key={h.name}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-base">{h.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="truncate text-sm font-medium">{h.name}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{h.completed} · {h.rate}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${h.rate}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.04 }}
                        className="h-full gradient-primary"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </>
      )}
    </div>
  );
}

function ChartCard({ title, icon: Icon, className, children }: { title: string; icon: any; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-border/60 p-5 ${className || ""}`}
      style={{ backgroundImage: "var(--gradient-card)" }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <h3 className="font-display text-base font-semibold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
