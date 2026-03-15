import { PathPoint } from './types';

export function r(n: number): number {
  return Math.round(n);
}

export function buildPathD(points: PathPoint[], close: boolean): string {
  if (!points.length) return '';
  const [first, ...rest] = points;
  let d = `M ${r(first.x)} ${r(first.y)}`;

  for (const p of rest) {
    switch (p.type) {
      case 'L':
        d += ` L ${r(p.x)} ${r(p.y)}`;
        break;
      case 'Q':
        d += ` Q ${r(p.cx!)} ${r(p.cy!)} ${r(p.x)} ${r(p.y)}`;
        break;
      case 'C':
        d += ` C ${r(p.cx1!)} ${r(p.cy1!)} ${r(p.cx2!)} ${r(p.cy2!)} ${r(p.x)} ${r(p.y)}`;
        break;
      case 'A':
        d += ` A ${r(p.rx!)} ${r(p.ry!)} ${r(p.xrot!)} ${p.large ? 1 : 0} ${p.sweep ? 1 : 0} ${r(p.x)} ${r(p.y)}`;
        break;
    }
  }

  if (close) d += ' Z';
  return d;
}

export function snapToGrid(v: number, gridSize: number, snap: boolean): number {
  if (!snap) return v;
  return Math.round(v / gridSize) * gridSize;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function makePoint(
  x: number,
  y: number,
  prev: PathPoint | undefined,
  isFirst: boolean
): PathPoint {
  const midX = prev ? (prev.x + x) / 2 : x;
  const midY = prev ? (prev.y + y) / 2 : y;
  return {
    id: uid(),
    type: isFirst ? 'M' : 'L',
    x,
    y,
    cx: midX,
    cy: midY - 50,
    cx1: prev ? prev.x + (x - prev.x) * 0.33 : x - 50,
    cy1: prev ? prev.y : y,
    cx2: prev ? prev.x + (x - prev.x) * 0.67 : x + 50,
    cy2: y,
    rx: 50,
    ry: 50,
    xrot: 0,
    large: false,
    sweep: false,
  };
}
