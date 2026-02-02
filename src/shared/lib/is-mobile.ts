/** Client-side mobile detection. Returns false during SSR to avoid hydration mismatch. */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;

  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}
