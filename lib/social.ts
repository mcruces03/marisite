/** Public social URLs and labels from env (safe for client components). */

const DEFAULT_INSTAGRAM_LABEL = "Instagram profesional";

/** Visible label for Instagram links (footer, contact). Override via NEXT_PUBLIC_INSTAGRAM_LABEL. */
export function getInstagramLabel(): string {
  const t = process.env.NEXT_PUBLIC_INSTAGRAM_LABEL?.trim();
  return t || DEFAULT_INSTAGRAM_LABEL;
}

export function getInstagramUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.href;
  } catch {
    return null;
  }
}
