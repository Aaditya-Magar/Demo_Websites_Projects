// Local-only persistence layer with a security wrapper around IndexedDB.
// - DB instance is module-private (not attached to globalThis).
// - All inputs are sanitized + schema-validated before write.
// - Journal text fields are encrypted at rest via Web Crypto (AES-GCM).
// - Hard caps prevent storage abuse (max habits, field length).
// - Errors are wrapped in SafeError with user-friendly messages.

import { habitSchema, journalSchema, sanitizeText, LIMITS, SafeError } from "./security";
import { decryptString, encryptString } from "./crypto";

const DB_NAME = "simple_habits_tracker";
const DB_VERSION = 2;

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  date: string;
  completed: 1 | 0;
}

export interface Journal {
  id: string;
  date: string;
  satisfied: string;
  not_satisfied: string;
  grateful: string;
  learned: string;
  reflection: string;
  reflection_prompt: string;
  summary: string;
  updated_at: string;
}

// Module-private DB handle (intentionally not on globalThis).
let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("habits")) db.createObjectStore("habits", { keyPath: "id" });
      if (!db.objectStoreNames.contains("habit_logs")) {
        const s = db.createObjectStore("habit_logs", { keyPath: "id" });
        s.createIndex("by_habit", "habit_id");
        s.createIndex("by_date", "date");
      }
      if (!db.objectStoreNames.contains("journals")) db.createObjectStore("journals", { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(new SafeError("Could not open local storage", req.error));
  });
  return dbPromise;
}

function tx<T>(
  store: string,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T> | Promise<T>,
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const s = t.objectStore(store);
        const result = fn(s);
        if (result instanceof Promise) {
          result.then(resolve).catch((e) => reject(new SafeError("Storage error", e)));
        } else {
          result.onsuccess = () => resolve(result.result);
          result.onerror = () => reject(new SafeError("Storage error", result.error));
        }
      }),
  );
}

function getAll<T>(store: string): Promise<T[]> {
  return tx<T[]>(store, "readonly", (s) => s.getAll() as IDBRequest<T[]>);
}

const uid = () => crypto.randomUUID();

// ---------- Habits ----------
export const habitsRepo = {
  list: () => getAll<Habit>("habits"),
  create: async (input: { name: string; description?: string; icon?: string }): Promise<Habit> => {
    // Enforce maximum habit count
    const existing = await getAll<Habit>("habits");
    if (existing.length >= LIMITS.MAX_HABITS) {
      throw new SafeError(`You can keep at most ${LIMITS.MAX_HABITS} habits.`);
    }
    const cleaned = {
      name: sanitizeText(input.name, LIMITS.MAX_HABIT_NAME),
      description: sanitizeText(input.description ?? "", LIMITS.MAX_HABIT_DESC),
      icon: sanitizeText(input.icon ?? "✨", 8),
    };
    const parsed = habitSchema.safeParse(cleaned);
    if (!parsed.success) throw new SafeError(parsed.error.issues[0]?.message ?? "Invalid habit");

    const habit: Habit = {
      id: uid(),
      name: parsed.data.name,
      description: parsed.data.description || undefined,
      icon: parsed.data.icon || "✨",
      created_at: new Date().toISOString(),
    };
    await tx("habits", "readwrite", (s) => s.put(habit));
    return habit;
  },
  update: async (id: string, patch: Partial<Habit>) => {
    const existing = await tx<Habit | undefined>("habits", "readonly", (s) =>
      s.get(id) as IDBRequest<Habit | undefined>,
    );
    if (!existing) return;
    const cleaned: Partial<Habit> = {};
    if (patch.name !== undefined) cleaned.name = sanitizeText(patch.name, LIMITS.MAX_HABIT_NAME);
    if (patch.description !== undefined) cleaned.description = sanitizeText(patch.description, LIMITS.MAX_HABIT_DESC);
    if (patch.icon !== undefined) cleaned.icon = sanitizeText(patch.icon, 8);
    await tx("habits", "readwrite", (s) => s.put({ ...existing, ...cleaned }));
  },
  remove: async (id: string) => {
    await tx("habits", "readwrite", (s) => s.delete(id));
    const logs = await getAll<HabitLog>("habit_logs");
    await Promise.all(
      logs.filter((l) => l.habit_id === id)
        .map((l) => tx("habit_logs", "readwrite", (s) => s.delete(l.id))),
    );
  },
};

// ---------- Habit logs ----------
export const logsRepo = {
  all: () => getAll<HabitLog>("habit_logs"),
  toggle: async (habit_id: string, date: string): Promise<HabitLog> => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new SafeError("Invalid date");
    const id = `${habit_id}_${date}`;
    const existing = await tx<HabitLog | undefined>("habit_logs", "readonly", (s) =>
      s.get(id) as IDBRequest<HabitLog | undefined>,
    );
    const next: HabitLog = existing
      ? { ...existing, completed: existing.completed ? 0 : 1 }
      : { id, habit_id, date, completed: 1 };
    await tx("habit_logs", "readwrite", (s) => s.put(next));
    return next;
  },
};

// ---------- Journals (encrypted at rest) ----------
const JOURNAL_TEXT_FIELDS = ["satisfied", "not_satisfied", "grateful", "learned", "reflection", "reflection_prompt", "summary"] as const;

async function decryptJournal(j: Journal): Promise<Journal> {
  const out: Journal = { ...j };
  for (const f of JOURNAL_TEXT_FIELDS) {
    const v = (j as any)[f];
    if (typeof v === "string" && v.startsWith("enc1:")) {
      (out as any)[f] = await decryptString(v);
    }
  }
  return out;
}

export const journalsRepo = {
  all: async () => {
    const list = await getAll<Journal>("journals");
    return Promise.all(list.map(decryptJournal));
  },
  get: async (date: string): Promise<Journal | undefined> => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
    const j = await tx<Journal | undefined>("journals", "readonly", (s) =>
      s.get(date) as IDBRequest<Journal | undefined>,
    );
    return j ? decryptJournal(j) : undefined;
  },
  upsert: async (entry: Omit<Journal, "id" | "updated_at">): Promise<Journal> => {
    // Sanitize all text fields first
    const cleaned = {
      date: entry.date,
      grateful: sanitizeText(entry.grateful, LIMITS.MAX_JOURNAL_FIELD),
      learned: sanitizeText(entry.learned, LIMITS.MAX_JOURNAL_FIELD),
      reflection: sanitizeText(entry.reflection, LIMITS.MAX_JOURNAL_FIELD),
      reflection_prompt: sanitizeText(entry.reflection_prompt, 200),
      satisfied: sanitizeText(entry.satisfied, LIMITS.MAX_JOURNAL_FIELD),
      not_satisfied: sanitizeText(entry.not_satisfied, LIMITS.MAX_JOURNAL_FIELD),
      summary: sanitizeText(entry.summary, LIMITS.MAX_JOURNAL_FIELD),
    };
    const parsed = journalSchema.safeParse(cleaned);
    if (!parsed.success) throw new SafeError(parsed.error.issues[0]?.message ?? "Invalid entry");

    const total = JOURNAL_TEXT_FIELDS.reduce((acc, f) => acc + ((cleaned as any)[f]?.length || 0), 0);
    if (total > LIMITS.MAX_JOURNAL_TOTAL) {
      throw new SafeError(`Entry too large (${total}/${LIMITS.MAX_JOURNAL_TOTAL} characters).`);
    }

    // Encrypt sensitive text fields before writing
    const encrypted: any = { ...cleaned };
    for (const f of JOURNAL_TEXT_FIELDS) {
      encrypted[f] = await encryptString(cleaned[f] as string);
    }

    const full: Journal = {
      ...(encrypted as Journal),
      id: cleaned.date,
      updated_at: new Date().toISOString(),
    };
    await tx("journals", "readwrite", (s) => s.put(full));
    // Return decrypted copy for immediate UI use
    return { ...(cleaned as any), id: full.id, updated_at: full.updated_at };
  },
};
