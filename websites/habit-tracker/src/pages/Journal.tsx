import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { journalsRepo, type Journal } from "@/lib/db";
import { rateLimit, SafeError, LIMITS } from "@/lib/security";
import { toast } from "sonner";
import { BookOpen, Heart, Lightbulb, Target, ThumbsUp, ThumbsDown, Sparkles, Save, NotebookPen } from "lucide-react";

const PROMPTS = [
  "What's one thing you're proud of?",
  "What surprised you today?",
  "Where did you grow today?",
  "What would you do differently?",
  "Who made your day better?",
  "What's a small joy you noticed?",
  "What did your future self thank you for?",
  "What energy did you bring today?",
];

type Mode = "journal" | "summary";

const FIELDS = [
  { key: "grateful" as const, label: "What are you grateful for today?", icon: Heart, placeholder: "I'm grateful for...", hue: "from-rose-400 to-pink-500" },
  { key: "learned" as const, label: "What did you learn today?", icon: Lightbulb, placeholder: "Today I learned...", hue: "from-amber-400 to-yellow-500" },
];

export default function JournalPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [mode, setMode] = useState<Mode>("journal");
  const [entry, setEntry] = useState({
    grateful: "", learned: "", reflection: "", reflection_prompt: PROMPTS[0],
    satisfied: "", not_satisfied: "", summary: "",
  });
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [allEntries, setAllEntries] = useState<Journal[]>([]);

  const ds = format(date, "yyyy-MM-dd");

  useEffect(() => {
    journalsRepo.all().then(setAllEntries).catch(() => {});
  }, [savedAt]);

  useEffect(() => {
    journalsRepo.get(ds).then((j) => {
      if (j) {
        setEntry({
          grateful: j.grateful || "", learned: j.learned || "",
          reflection: j.reflection || "", reflection_prompt: j.reflection_prompt || PROMPTS[0],
          satisfied: j.satisfied || "", not_satisfied: j.not_satisfied || "",
          summary: j.summary || "",
        });
        setSavedAt(j.updated_at);
      } else {
        setEntry({ grateful: "", learned: "", reflection: "", reflection_prompt: PROMPTS[0], satisfied: "", not_satisfied: "", summary: "" });
        setSavedAt(null);
      }
    }).catch(() => { toast.error("Could not load entry"); });
  }, [ds]);

  async function save() {
    if (!rateLimit("journal:save", 800)) return;
    setSaving(true);
    try {
      const saved = await journalsRepo.upsert({ date: ds, ...entry });
      setSavedAt(saved.updated_at);
      toast.success("Entry saved ✨");
    } catch (e) {
      toast.error(e instanceof SafeError ? e.userMessage : "Could not save entry");
    } finally { setSaving(false); }
  }

  function newPrompt() {
    const next = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setEntry((p) => ({ ...p, reflection_prompt: next }));
  }

  const charCount = useMemo(
    () =>
      entry.grateful.length +
      entry.learned.length +
      entry.reflection.length +
      entry.satisfied.length +
      entry.not_satisfied.length +
      entry.summary.length,
    [entry],
  );
  const entryDates = useMemo(() => new Set(allEntries.map((e) => e.date)), [allEntries]);

  return (
    <div className="space-y-5">
      {/* Header — full width */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center gap-4 overflow-hidden rounded-3xl border border-border/60 p-6"
        style={{ backgroundImage: "var(--gradient-card)" }}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-48" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative grid h-14 w-14 place-items-center rounded-2xl gradient-primary glow">
          <NotebookPen className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="relative">
          <h2 className="font-display text-3xl font-bold">Daily Journal</h2>
          <p className="text-sm text-muted-foreground">Reflect on your journey</p>
        </div>
      </motion.div>

      {/* Two-column body: form (left) + sidebar (right) */}
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {true ? (
            <motion.div
              key="journal-mode"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {FIELDS.map((f, i) => (
                <motion.div
                  key={f.key}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border/60 p-5"
                  style={{ backgroundImage: "var(--gradient-card)" }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${f.hue} text-white shadow`}>
                      <f.icon className="h-3.5 w-3.5" />
                    </div>
                    <label className="font-display text-base font-semibold">{f.label}</label>
                  </div>
                  <textarea maxLength={LIMITS.MAX_JOURNAL_FIELD}
                    value={entry[f.key]}
                    onChange={(e) => setEntry((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-input bg-background/40 px-4 py-3 text-sm leading-relaxed outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </motion.div>
              ))}

              {/* Daily reflection w/ prompt */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border/60 p-5"
                style={{ backgroundImage: "var(--gradient-card)" }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg gradient-primary text-primary-foreground shadow">
                      <Target className="h-3.5 w-3.5" />
                    </div>
                    <label className="font-display text-base font-semibold">Daily Reflection</label>
                  </div>
                  <button onClick={newPrompt} className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all hover:bg-primary/20">
                    <Sparkles className="h-3 w-3" /> New prompt
                  </button>
                </div>
                <p className="mb-3 text-sm italic text-muted-foreground">{entry.reflection_prompt}</p>
                <textarea maxLength={LIMITS.MAX_JOURNAL_FIELD}
                  value={entry.reflection}
                  onChange={(e) => setEntry((p) => ({ ...p, reflection: e.target.value }))}
                  placeholder="Write your thoughts, goals, or anything on your mind..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-input bg-background/40 px-4 py-3 text-sm leading-relaxed outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </motion.div>

              {/* Satisfied / unsatisfied */}
              {[
                { key: "satisfied" as const, label: "Satisfied Tasks", sub: "What tasks made you feel accomplished today?", placeholder: "List the tasks you're satisfied with today...", icon: ThumbsUp, hue: "from-emerald-400 to-teal-500" },
                { key: "not_satisfied" as const, label: "Unsatisfied Tasks", sub: "What tasks didn't go well or remain unfinished?", placeholder: "List the tasks you're unsatisfied with or couldn't complete...", icon: ThumbsDown, hue: "from-rose-400 to-red-500" },
              ].map((f, i) => (
                <motion.div
                  key={f.key}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                  className="rounded-2xl border border-border/60 p-5"
                  style={{ backgroundImage: "var(--gradient-card)" }}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <div className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${f.hue} text-white shadow`}>
                      <f.icon className="h-3.5 w-3.5" />
                    </div>
                    <label className="font-display text-base font-semibold">{f.label}</label>
                  </div>
                  <p className="mb-3 ml-9 text-xs text-muted-foreground">{f.sub}</p>
                  <textarea maxLength={LIMITS.MAX_JOURNAL_FIELD}
                    value={entry[f.key]}
                    onChange={(e) => setEntry((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-input bg-background/40 px-4 py-3 text-sm leading-relaxed outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {savedAt ? `Last saved ${format(new Date(savedAt), "p")}` : "Not saved yet"}
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={save} disabled={saving}
            className="flex items-center gap-2 rounded-2xl gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground glow transition-all hover:scale-[1.03] disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save entry"}
          </motion.button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4 md:sticky md:top-24 md:self-start">
        <motion.div
          initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-2xl border border-border/60"
          style={{ backgroundImage: "var(--gradient-card)" }}
        >
          <div className="flex items-center gap-2 px-5 pt-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-bold">{format(date, "MMM d, yyyy")}</span>
          </div>
          <div className="px-3 pt-1 pb-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => { if (d) { setDate(d); setViewMonth(d); } }}
              month={viewMonth}
              onMonthChange={setViewMonth}
              captionLayout="dropdown-buttons"
              fromYear={1970}
              toYear={2100}
              modifiers={{ hasEntry: (d) => entryDates.has(format(d, "yyyy-MM-dd")) }}
              modifiersClassNames={{ hasEntry: "after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-primary relative" }}
              className="w-full p-2 pointer-events-auto"
              classNames={{
                months: "w-full",
                month: "w-full space-y-3",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "hidden",
                caption_dropdowns: "flex items-center gap-1.5",
                dropdown: "bg-secondary/70 border border-border/60 rounded-md px-2 py-1 text-sm font-medium text-foreground outline-none cursor-pointer hover:bg-secondary focus:ring-2 focus:ring-primary/40 [&>option]:bg-popover [&>option]:text-foreground",
                dropdown_month: "mr-1",
                dropdown_year: "",
                vhidden: "hidden",
                nav: "flex items-center gap-1",
                nav_button: "h-7 w-7 grid place-items-center rounded-md bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "grid grid-cols-7",
                head_cell: "text-muted-foreground font-normal text-[0.75rem] text-center",
                row: "grid grid-cols-7 mt-1",
                cell: "h-9 w-full text-center text-sm p-0 relative",
                day: "h-9 w-9 mx-auto p-0 font-normal rounded-md hover:bg-secondary aria-selected:opacity-100",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                day_today: "text-primary font-semibold",
                day_outside: "text-muted-foreground/40",
              }}
            />
            <div className="mt-2 border-t border-border/60 pt-3 text-center text-xs text-muted-foreground">
              📝 {allEntries.length} entr{allEntries.length === 1 ? "y" : "ies"} written
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
          className="rounded-2xl border border-border/60 p-5 text-center"
          style={{ backgroundImage: "var(--gradient-card)" }}
        >
          <p className="font-display text-4xl font-bold gradient-text">{charCount}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">characters today</p>
        </motion.div>
      </aside>
      </div>
    </div>
  );
}
