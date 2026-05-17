"use client";

import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const compact = width !== null && width < 640;
  const narrow = width !== null && width < 768;

  return { compact, narrow, ready: width !== null, width: width ?? 0 };
}
