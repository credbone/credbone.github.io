import { useEffect, useMemo, useRef } from "react";

// Spring motion for the dot editor grid.
// Each dot has three damped springs (scale, x offset, y offset). Animation state lives in
// typed arrays and is written straight to the circles' `transform`, so it never re-renders
// React. The loop sleeps once every dot is at rest.

export type DotSize = "small" | "default" | "large";

// ---- Tuning ---------------------------------------------------------------
const STIFFNESS = 520; // spring pull back to rest
const DAMPING = 20; // higher = calmer, fewer bounces
const STEP = 1 / 120; // fixed physics step (s), same feel at 60 and 120 Hz

const HOVER_SCALE = 0.28; // extra scale while hovered
const HOVER_KICK = 5.5; // scale velocity on hover enter (the little bounce)
const GHOST_HOVER = 0.6; // secondary hover strength (mirrored cell in symmetry mode)

const POP_SCALE = -0.5; // a freshly painted dot starts at 50% and springs past 100%
const ERASE_SCALE = -0.55; // an erased dot collapses, then springs back as an empty dot

const REACH = 6; // neighbour radius, in cells
const DELAY_PER_CELL = 25; // ms, how fast the bump travels outward
const PUSH_IMPULSE = 48; // offset velocity (svg units/s) for a neighbour at distance 1
const SQUASH_IMPULSE = 4.4; // scale velocity for a neighbour at distance 1
const PULL_FACTOR = 0.6; // erase pulls neighbours inward at this strength
const EMPTY_FACTOR = 0; // how much empty neighbours react (0 = only painted dots)
const SIZE_WEIGHT: Record<DotSize, number> = {
  small: 1.4, // light, moves more
  default: 1,
  large: 0.6, // heavy, moves less
};

const MAX_OFFSET = 3; // svg units (a cell is 10)
const MIN_SCALE = -0.6;
const MAX_SCALE = 0.4;
const KICK_THROTTLE = 40; // ms, at most one neighbour kick per dot in this window
// ---------------------------------------------------------------------------

type Kick = { i: number; at: number; vx: number; vy: number; vs: number };

export interface DotSprings {
  /** Stable ref callbacks, one per dot. */
  refs: ((el: SVGCircleElement | null) => void)[];
  /** Hover a dot (-1 to clear). */
  hover: (i: number, ghost?: number) => void;
  /** A dot was painted. `dir` is the stroke direction (unit vector) while dragging. */
  pop: (i: number, dir?: { x: number; y: number }) => void;
  /** A dot was erased. */
  erase: (i: number) => void;
}

export const useDotSprings = (
  count: number,
  cols: number,
  cell: number,
  getSize: (i: number) => DotSize | undefined,
): DotSprings => {
  const getSizeRef = useRef(getSize);
  getSizeRef.current = getSize;

  const st = useMemo(
    () => ({
      s: new Float32Array(count),
      vs: new Float32Array(count),
      x: new Float32Array(count),
      vx: new Float32Array(count),
      y: new Float32Array(count),
      vy: new Float32Array(count),
      target: new Float32Array(count),
      lastKick: new Float64Array(count),
      els: new Array<SVGCircleElement | null>(count).fill(null),
      awake: new Set<number>(),
      queue: [] as Kick[],
      hovered: -1,
      ghost: -1,
      raf: 0,
      last: 0,
      acc: 0,
      reduced: false,
    }),
    [count],
  );

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    st.reduced = !!mq?.matches;
    const onChange = () => (st.reduced = !!mq?.matches);
    mq?.addEventListener?.("change", onChange);
    return () => {
      mq?.removeEventListener?.("change", onChange);
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
  }, [st]);

  return useMemo(() => {
    const clamp = (v: number, lo: number, hi: number) =>
      v < lo ? lo : v > hi ? hi : v;

    const write = (i: number) => {
      const el = st.els[i];
      if (!el) return;
      const s = st.s[i];
      const x = st.x[i];
      const y = st.y[i];
      if (Math.abs(s) < 1e-3 && Math.abs(x) < 1e-3 && Math.abs(y) < 1e-3) {
        el.removeAttribute("transform");
        return;
      }
      // Scale around the dot's own centre, then offset it
      const cx = (i % cols) * cell + cell / 2;
      const cy = Math.floor(i / cols) * cell + cell / 2;
      el.setAttribute(
        "transform",
        `translate(${(cx + x).toFixed(3)} ${(cy + y).toFixed(3)}) scale(${(1 + s).toFixed(4)}) translate(${-cx} ${-cy})`,
      );
    };

    const integrate = (i: number, dt: number) => {
      st.vs[i] += (-STIFFNESS * (st.s[i] - st.target[i]) - DAMPING * st.vs[i]) * dt;
      st.s[i] = clamp(st.s[i] + st.vs[i] * dt, MIN_SCALE, MAX_SCALE);
      st.vx[i] += (-STIFFNESS * st.x[i] - DAMPING * st.vx[i]) * dt;
      st.x[i] = clamp(st.x[i] + st.vx[i] * dt, -MAX_OFFSET, MAX_OFFSET);
      st.vy[i] += (-STIFFNESS * st.y[i] - DAMPING * st.vy[i]) * dt;
      st.y[i] = clamp(st.y[i] + st.vy[i] * dt, -MAX_OFFSET, MAX_OFFSET);
    };

    const atRest = (i: number) =>
      Math.abs(st.s[i] - st.target[i]) < 1e-3 &&
      Math.abs(st.vs[i]) < 1e-2 &&
      Math.abs(st.x[i]) < 1e-3 &&
      Math.abs(st.vx[i]) < 1e-2 &&
      Math.abs(st.y[i]) < 1e-3 &&
      Math.abs(st.vy[i]) < 1e-2;

    const tick = (now: number) => {
      const dtMs = st.last ? Math.min(now - st.last, 50) : 16;
      st.last = now;

      // Apply kicks that are due
      if (st.queue.length) {
        const pending: Kick[] = [];
        for (const k of st.queue) {
          if (k.at > now) {
            pending.push(k);
            continue;
          }
          if (now - st.lastKick[k.i] < KICK_THROTTLE) continue;
          st.lastKick[k.i] = now;
          st.vx[k.i] += k.vx;
          st.vy[k.i] += k.vy;
          st.vs[k.i] += k.vs;
          st.awake.add(k.i);
        }
        st.queue = pending;
      }

      st.acc += dtMs / 1000;
      while (st.acc >= STEP) {
        st.acc -= STEP;
        st.awake.forEach((i) => integrate(i, STEP));
      }

      st.awake.forEach((i) => {
        if (atRest(i)) {
          st.s[i] = st.target[i];
          st.vs[i] = st.x[i] = st.vx[i] = st.y[i] = st.vy[i] = 0;
          st.awake.delete(i);
        }
        write(i);
      });

      if (st.awake.size || st.queue.length) {
        st.raf = requestAnimationFrame(tick);
      } else {
        st.raf = 0;
        st.last = 0;
        st.acc = 0;
      }
    };

    const wake = (i?: number) => {
      if (i !== undefined) st.awake.add(i);
      if (!st.raf) st.raf = requestAnimationFrame(tick);
    };

    // Bump painted neighbours outward (sign > 0) or pull them inward (sign < 0)
    const fanOut = (i: number, sign: number, dir?: { x: number; y: number }) => {
      const now = performance.now();
      const c0 = i % cols;
      const r0 = Math.floor(i / cols);
      const rows = Math.ceil(count / cols);
      for (let dr = -REACH; dr <= REACH; dr++) {
        for (let dc = -REACH; dc <= REACH; dc++) {
          if (!dr && !dc) continue;
          const d = Math.hypot(dc, dr);
          if (d > REACH + 0.01) continue;
          const c = c0 + dc;
          const r = r0 + dr;
          if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
          const j = r * cols + c;
          const size = getSizeRef.current(j);
          const weight = size ? SIZE_WEIGHT[size] : EMPTY_FACTOR;
          if (!weight) continue;

          const ux = dc / d;
          const uy = dr / d;
          // While dragging, dots ahead of the stroke get shoved more than dots behind
          const bias = dir
            ? clamp(0.5 + 0.75 * (ux * dir.x + uy * dir.y), 0.15, 1.25)
            : 1;
          const f = (weight * bias) / (d * d);
          st.queue.push({
            i: j,
            at: now + d * DELAY_PER_CELL,
            vx: ux * PUSH_IMPULSE * f * sign,
            vy: uy * PUSH_IMPULSE * f * sign,
            vs: -SQUASH_IMPULSE * f * Math.abs(sign),
          });
        }
      }
      wake();
    };

    // `ghost` is a softer, secondary hover (e.g. the mirrored cell in symmetry mode)
    const hover = (i: number, ghost = -1) => {
      if (i === st.hovered && ghost === st.ghost) return;
      const prev = [st.hovered, st.ghost];
      st.hovered = i;
      st.ghost = ghost;
      if (st.reduced) return;
      prev.forEach((p) => {
        if (p >= 0 && p !== i && p !== ghost) {
          st.target[p] = 0;
          wake(p);
        }
      });
      const enter = (j: number, amount: number) => {
        if (j < 0) return;
        const wasHovered = prev.includes(j);
        st.target[j] = HOVER_SCALE * amount;
        if (!wasHovered) st.vs[j] += HOVER_KICK * amount;
        wake(j);
      };
      enter(i, 1);
      enter(ghost, GHOST_HOVER);
    };

    const pop = (i: number, dir?: { x: number; y: number }) => {
      if (st.reduced) return;
      st.s[i] = POP_SCALE;
      st.vs[i] = 0;
      write(i);
      wake(i);
      fanOut(i, 1, dir);
    };

    const erase = (i: number) => {
      if (st.reduced) return;
      st.s[i] = ERASE_SCALE;
      st.vs[i] = 0;
      write(i);
      wake(i);
      fanOut(i, -PULL_FACTOR);
    };

    const refs = Array.from(
      { length: count },
      (_, i) => (el: SVGCircleElement | null) => {
        st.els[i] = el;
        if (el) write(i);
      },
    );

    return { refs, hover, pop, erase };
  }, [st, count, cols, cell]);
};
