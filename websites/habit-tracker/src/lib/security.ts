// Frontend security utilities: input sanitization, validation,
// rate limiting and storage limits. No external network calls.

import { z } from "zod";

// ---------- Constants / limits ----------
export const LIMITS = {
  MAX_HABITS: 100,
  MAX_HABIT_NAME: 80,
  MAX_HABIT_DESC: 240,
  MAX_JOURNAL_FIELD: 5_000,
  MAX_JOURNAL_TOTAL: 30_000,
  MIN_ACTION_INTERVAL_MS: 250, // debounce window for repeated mutations
} as const;

// ---------- Sanitization ----------
// Strip control chars and normalize whitespace. Never inject into innerHTML
// anywhere — React already escapes text. This is defense-in-depth.
export function sanitizeText(input: unknown, maxLen: number = LIMITS.MAX_JOURNAL_FIELD): string {
  if (typeof input !== "string") return "";
  // Remove ASCII control chars except \n \r \t
  let s = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  // Strip null bytes & zero-width chars commonly used to obfuscate payloads
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, "");
  // Normalize line endings
  s = s.replace(/\r\n?/g, "\n");
  // Hard cap length to prevent memory abuse
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return s.trim();
}

// Escape HTML — only needed if a value is ever rendered outside React.
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Schemas ----------
export const habitSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(LIMITS.MAX_HABIT_NAME, `Name must be ≤ ${LIMITS.MAX_HABIT_NAME} characters`),
  description: z
    .string()
    .trim()
    .max(LIMITS.MAX_HABIT_DESC, `Description must be ≤ ${LIMITS.MAX_HABIT_DESC} characters`)
    .optional()
    .or(z.literal("")),
  icon: z.string().trim().min(1).max(8).optional(),
});

export const journalSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  grateful: z.string().max(LIMITS.MAX_JOURNAL_FIELD).optional().default(""),
  learned: z.string().max(LIMITS.MAX_JOURNAL_FIELD).optional().default(""),
  reflection: z.string().max(LIMITS.MAX_JOURNAL_FIELD).optional().default(""),
  reflection_prompt: z.string().max(200).optional().default(""),
  satisfied: z.string().max(LIMITS.MAX_JOURNAL_FIELD).optional().default(""),
  not_satisfied: z.string().max(LIMITS.MAX_JOURNAL_FIELD).optional().default(""),
  summary: z.string().max(LIMITS.MAX_JOURNAL_FIELD).optional().default(""),
});

// ---------- Rate limiting ----------
const lastActionAt = new Map<string, number>();

export function rateLimit(key: string, windowMs: number = LIMITS.MIN_ACTION_INTERVAL_MS): boolean {
  const now = Date.now();
  const prev = lastActionAt.get(key) || 0;
  if (now - prev < windowMs) return false;
  lastActionAt.set(key, now);
  return true;
}

// ---------- Errors ----------
export class SafeError extends Error {
  constructor(public userMessage: string, internal?: unknown) {
    super(userMessage);
    // Avoid logging sensitive payloads
    if (import.meta.env.DEV && internal) {
      // eslint-disable-next-line no-console
      console.debug("[SafeError]", userMessage, internal);
    }
  }
}
