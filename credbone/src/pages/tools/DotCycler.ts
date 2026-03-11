// useCyclingDots.ts
import { useState, useEffect } from "react";
import { heart, X, Bolt, colorspace  } from "./dotIcon";

const dotMap = new Map([
  ["heart", new Set(heart)],
  ["x", new Set(X)],

        ["Bolt", new Set(Bolt)],
                ["colorspace", new Set(colorspace)]
]);

export function useCyclingDots(intervalMs = 1500) {
  const entries = Array.from(dotMap.values());
  const [activeDots, setActiveDots] = useState<Set<number>>(entries[0] ?? new Set());

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % entries.length;
      setActiveDots(entries[i]);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return activeDots;
}