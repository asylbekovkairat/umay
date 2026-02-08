"use client";

/* External dependencies */
import { useEffect, useState } from "react";

/** Client-side mobile detection (not safe during render — use `useIsMobile` instead). */
export function isMobile(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

/** SSR-safe hook: returns `false` on the server and first render, then updates after hydration. */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return mobile;
}
