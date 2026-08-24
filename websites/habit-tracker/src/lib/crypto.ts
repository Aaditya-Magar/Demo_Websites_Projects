// Lightweight at-rest encryption for journal text using Web Crypto (AES-GCM).
// The key is derived from a per-device random secret stored in IndexedDB
// (NOT localStorage, which is more easily inspected). This protects against
// casual snooping if another extension/script reads the IDB store contents
// in plaintext form. It is NOT a substitute for full-disk encryption.

const KEY_DB = "shtk_keys_v1";
const KEY_STORE = "k";
const KEY_ID = "device";

let cachedKey: CryptoKey | null = null;

function openKeyDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(KEY_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(KEY_STORE)) db.createObjectStore(KEY_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readSecret(): Promise<Uint8Array | null> {
  const db = await openKeyDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(KEY_STORE, "readonly");
    const r = t.objectStore(KEY_STORE).get(KEY_ID);
    r.onsuccess = () => resolve((r.result as Uint8Array | undefined) ?? null);
    r.onerror = () => reject(r.error);
  });
}

async function writeSecret(secret: Uint8Array): Promise<void> {
  const db = await openKeyDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(KEY_STORE, "readwrite");
    t.objectStore(KEY_STORE).put(secret, KEY_ID);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });
}

async function getKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  let secret = await readSecret();
  if (!secret) {
    secret = crypto.getRandomValues(new Uint8Array(32));
    await writeSecret(secret);
  }
  cachedKey = await crypto.subtle.importKey(
    "raw",
    secret.buffer.slice(secret.byteOffset, secret.byteOffset + secret.byteLength) as ArrayBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
  return cachedKey;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function toB64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}
function fromB64(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const PREFIX = "enc1:";

export async function encryptString(plain: string): Promise<string> {
  if (!plain) return "";
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plain)),
  );
  const blob = new Uint8Array(iv.length + ct.length);
  blob.set(iv, 0);
  blob.set(ct, iv.length);
  return PREFIX + toB64(blob);
}

export async function decryptString(value: string): Promise<string> {
  if (!value || !value.startsWith(PREFIX)) return value || "";
  try {
    const key = await getKey();
    const blob = fromB64(value.slice(PREFIX.length));
    const iv = blob.slice(0, 12);
    const ct = blob.slice(12);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    return dec.decode(pt);
  } catch {
    return ""; // unable to decrypt — treat as empty to avoid breaking UI
  }
}
