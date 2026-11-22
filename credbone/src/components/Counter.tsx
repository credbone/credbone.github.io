import React, { useEffect, useState, useRef } from 'react';

export type CountEasing = 'linear' | 'out' | 'in-out';

interface CountProps {
  from?: number; // Start value; when omitted, continues from the current displayed value
  to: number;
  duration: number; // ms
  start?: boolean; // Default true; while false, holds the start value
  decimals?: 0 | 1 | 2 | 3; // Fraction digits to display (default 0)
  separator?: ',' | '.'; // Thousands separator; the decimal mark becomes the other one. Omit for no grouping
  prefix?: string; // Shown before the number, after any minus sign (e.g. "$")
  suffix?: string; // Shown after the number (e.g. "%", "°")
  easing?: CountEasing; // Default "out"
  onComplete?: () => void; // Called once the count reaches `to`
  // data-* attributes for the decimal mark and digits, e.g. { "data-weight": "300" }.
  // When set, they render in a nested <text>; otherwise the output stays a plain string
  decimalProps?: Record<`data-${string}`, string>;
}

const easings: Record<CountEasing, (t: number) => number> = {
  linear: (t) => t,
  out: (t) => t * (2 - t),
  'in-out': (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Splits a value into display parts: "lead" (sign, prefix, grouped whole number),
// "fraction" (decimal mark + digits, empty when there are none) and "suffix"
const formatCountParts = (
  value: number,
  decimals: number = 0,
  separator?: ',' | '.',
  prefix: string = '',
  suffix: string = ''
) => {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, digits] = fixed.split('.');
  const grouped = separator
    ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : whole;
  const decimalMark = separator === '.' ? ',' : '.';
  // Skip the sign when the value rounds to zero, so it never shows "-0"
  const sign = value < 0 && Number(fixed) !== 0 ? '-' : '';
  return {
    lead: `${sign}${prefix}${grouped}`,
    fraction: digits ? decimalMark + digits : '',
    suffix,
  };
};

export const formatCount = (...args: Parameters<typeof formatCountParts>) => {
  const { lead, fraction, suffix } = formatCountParts(...args);
  return `${lead}${fraction}${suffix}`;
};

const Count: React.FC<CountProps> = ({
  from,
  to,
  duration,
  start = true,
  decimals = 0,
  separator,
  prefix,
  suffix,
  easing = 'out',
  onComplete,
  decimalProps,
}) => {
  const [count, setCount] = useState(from ?? 0);
  // Tracks the value currently on screen, so an interrupted animation resumes from there
  const current = useRef(from ?? 0);
  // Kept in refs so new callback/easing identities don't restart a running count
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const easingRef = useRef(easing);
  easingRef.current = easing;

  useEffect(() => {
    if (!start) return;

    const startValue = from ?? current.current;
    const delta = to - startValue;

    const commit = (value: number) => {
      current.current = value;
      setCount(value);
    };

    if (duration <= 0 || delta === 0 || prefersReducedMotion()) {
      commit(to);
      onCompleteRef.current?.();
      return;
    }

    const ease = easings[easingRef.current] ?? easings.out;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (now: number) => {
      const progress = Math.min(Math.max((now - startTime) / duration, 0), 1);

      if (progress < 1) {
        commit(startValue + delta * ease(progress));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        commit(to);
        onCompleteRef.current?.();
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [from, to, duration, start]);

  const parts = formatCountParts(count, decimals, separator, prefix, suffix);

  if (!decimalProps || !parts.fraction) {
    return <>{`${parts.lead}${parts.fraction}${parts.suffix}`}</>;
  }

  return (
    <>
      {parts.lead}
      <text {...decimalProps}>{parts.fraction}</text>
      {parts.suffix}
    </>
  );
};

export default Count;
