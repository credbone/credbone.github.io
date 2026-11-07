import { useCallback, useEffect, useReducer, useRef } from 'react';
import { CanvasConfig, DragRole, DragState, PathPoint, PointType } from './types';
import { makePoint, snapToGrid, uid } from './pathUtils';

// ─── Interaction tuning ──────────────────────────────────────────────────────
const LONG_PRESS = 400;          // ms before a press adds / picks up a point
const PRESS_TOLERANCE = 10;      // px a finger may wander before it counts as scrolling
const TOUCH_MOUSE_GUARD = 800;   // ms after a touch during which mouse events are ignored

type ClientPoint = { clientX: number; clientY: number };
export type TouchTarget = { pointId: string; role: DragRole };

// ─── State ───────────────────────────────────────────────────────────────────
export interface EditorState {
  points: PathPoint[];
  selectedId: string | null;
  config: CanvasConfig;
}

// ─── Actions ─────────────────────────────────────────────────────────────────
type Action =
  | { type: 'ADD_POINT'; x: number; y: number; id?: string }
  | { type: 'SELECT'; id: string | null }
  | { type: 'REMOVE'; id: string }
  | { type: 'RESET' }
  | { type: 'SET_POINT_TYPE'; id: string; pointType: PointType }
  | { type: 'UPDATE_POINT'; id: string; patch: Partial<PathPoint> }
  | { type: 'SET_CONFIG'; patch: Partial<CanvasConfig> };

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case 'ADD_POINT': {
      const prev = state.points[state.points.length - 1];
      const isFirst = state.points.length === 0;
      const made = makePoint(action.x, action.y, prev, isFirst);
      const pt = action.id ? { ...made, id: action.id } : made;
      return { ...state, points: [...state.points, pt], selectedId: pt.id };
    }

    case 'SELECT':
      return { ...state, selectedId: action.id };

    case 'REMOVE': {
      const idx = state.points.findIndex(p => p.id === action.id);
      if (idx === -1) return state;
      const next = state.points.filter(p => p.id !== action.id);
      // Re-ensure first point is M
      if (next.length) next[0] = { ...next[0], type: 'M' };
      const newSel = next.length
        ? (next[Math.min(idx, next.length - 1)]?.id ?? null)
        : null;
      return { ...state, points: next, selectedId: newSel };
    }

    case 'RESET':
      return {
        ...state,
        points: [],
        selectedId: null,
        config: {
          ...state.config,
          width: INITIAL.config.width,
          height: INITIAL.config.height,
          gridSize: INITIAL.config.gridSize,
        },
      };

    case 'SET_POINT_TYPE': {
      return {
        ...state,
        points: state.points.map(p =>
          p.id === action.id ? { ...p, type: action.pointType } : p
        ),
      };
    }

    case 'UPDATE_POINT': {
      return {
        ...state,
        points: state.points.map(p =>
          p.id === action.id ? { ...p, ...action.patch } : p
        ),
      };
    }

    case 'SET_CONFIG': {
      const patch = { ...action.patch };
      if (patch.width !== undefined) patch.width = isNaN(patch.width) ? state.config.width : Math.min(2000, Math.max(100, patch.width));
      if (patch.height !== undefined) patch.height = isNaN(patch.height) ? state.config.height : Math.min(2000, Math.max(100, patch.height));
      if (patch.gridSize !== undefined) patch.gridSize = isNaN(patch.gridSize) ? state.config.gridSize : Math.min(200, Math.max(5, patch.gridSize));

      const newW = patch.width  ?? state.config.width;
      const newH = patch.height ?? state.config.height;

      const clampedPoints = state.points.map(p => ({
        ...p,
        x:   Math.min(p.x,   newW),
        y:   Math.min(p.y,   newH),
        cx:  p.cx  != null ? Math.min(p.cx,  newW) : p.cx,
        cy:  p.cy  != null ? Math.min(p.cy,  newH) : p.cy,
        cx1: p.cx1 != null ? Math.min(p.cx1, newW) : p.cx1,
        cy1: p.cy1 != null ? Math.min(p.cy1, newH) : p.cy1,
        cx2: p.cx2 != null ? Math.min(p.cx2, newW) : p.cx2,
        cy2: p.cy2 != null ? Math.min(p.cy2, newH) : p.cy2,
      }));

      return { ...state, config: { ...state.config, ...patch }, points: clampedPoints };
    }

    default:
      return state;
  }
}


const DEFAULT_CONFIG = {
  width: 420,
  height: 420,
  closePath: false,
  gridSize: 30,
  snapGrid: true,
  showGrid: true,
};


const TARGET_Y = 210;

const p0 = makePoint(90, TARGET_Y, undefined, true);
const p1 = {
  ...makePoint(330, TARGET_Y, p0, false),
  type: 'C' as PointType,
  cx1: 180,
  cy1: 120,
  cx2: 240,
  cy2: 300,
};

const TARGET_POINTS = [p0, p1];

const DEFAULT_POINTS: PathPoint[] = TARGET_POINTS.map(p => ({
  ...p,
  y: TARGET_Y,
  cy: TARGET_Y,
  cy1: TARGET_Y,
  cy2: TARGET_Y,
}));

const INITIAL: EditorState = {
  points: DEFAULT_POINTS,
  selectedId: p1.id,
  config: DEFAULT_CONFIG,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useEditorState() {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const configRef = useRef(state.config);
  useEffect(() => { configRef.current = state.config; }, [state.config]);

  useEffect(() => {
    const duration = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease out cubic

      TARGET_POINTS.forEach(target => {
        dispatch({
          type: 'UPDATE_POINT',
          id: target.id,
          patch: {
            y:   TARGET_Y + (target.y   - TARGET_Y) * ease,
            cy:  TARGET_Y + ((target.cy  ?? TARGET_Y) - TARGET_Y) * ease,
            cy1: TARGET_Y + ((target.cy1 ?? TARGET_Y) - TARGET_Y) * ease,
            cy2: TARGET_Y + ((target.cy2 ?? TARGET_Y) - TARGET_Y) * ease,
          },
        });
      });

      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  const dragRef = useRef<DragState | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Latest points for handlers that fire later (long-press timers)
  const pointsRef = useRef(state.points);
  pointsRef.current = state.points;

  // Time of the last touch: browsers replay a tap as mouse events, which must be ignored
  const lastTouchRef = useRef(0);
  const isEmulatedMouse = useCallback(() => Date.now() - lastTouchRef.current < TOUCH_MOUSE_GUARD, []);

  // Pending mouse long-press on empty canvas
  const pressRef = useRef<{ timer: ReturnType<typeof setTimeout>; x: number; y: number; startX: number; startY: number } | null>(null);
  // Ends the active touch session, if any
  const touchEndRef = useRef<(() => void) | null>(null);

  const getSvgCoords = useCallback((c: ClientPoint): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    return { x: c.clientX - rect.left, y: c.clientY - rect.top };
  }, []);

  // Reads config from the ref so long-lived handlers never snap with stale settings
  const snap = useCallback(
    (v: number) => snapToGrid(v, configRef.current.gridSize, configRef.current.snapGrid),
    []
  );

  const clampX = useCallback((v: number) => Math.max(0, Math.min(configRef.current.width, v)), []);
  const clampY = useCallback((v: number) => Math.max(0, Math.min(configRef.current.height, v)), []);

  // Select a point (or handle) and start dragging it from the given pointer position
  const beginDrag = useCallback(
    (pointId: string, role: DragRole, c: ClientPoint) => {
      const pt = pointsRef.current.find(p => p.id === pointId);
      if (!pt) return;
      dispatch({ type: 'SELECT', id: pointId });
      const { x, y } = getSvgCoords(c);
      let ox = pt.x, oy = pt.y;
      if (role === 'cx_cy')   { ox = pt.cx!;  oy = pt.cy!; }
      if (role === 'cx1_cy1') { ox = pt.cx1!; oy = pt.cy1!; }
      if (role === 'cx2_cy2') { ox = pt.cx2!; oy = pt.cy2!; }
      dragRef.current = { pointId, role, startX: x, startY: y, originX: ox, originY: oy };
    },
    [getSvgCoords]
  );

  // Add a point under the pointer and keep dragging it until release
  const addAndDrag = useCallback(
    (c: ClientPoint) => {
      const { x, y } = getSvgCoords(c);
      const px = clampX(snap(x));
      const py = clampY(snap(y));
      const id = uid();
      dispatch({ type: 'ADD_POINT', x: px, y: py, id });
      dragRef.current = { pointId: id, role: 'anchor', startX: x, startY: y, originX: px, originY: py };
    },
    [getSvgCoords, snap, clampX, clampY]
  );

  // Move the dragged point to follow the pointer
  const dragTo = useCallback(
    (c: ClientPoint) => {
      const drag = dragRef.current;
      if (!drag) return;
      const { x, y } = getSvgCoords(c);
      const nx = clampX(snap(drag.originX + x - drag.startX));
      const ny = clampY(snap(drag.originY + y - drag.startY));

      const patch: Partial<PathPoint> = {};
      if (drag.role === 'anchor')   { patch.x = nx; patch.y = ny; }
      if (drag.role === 'cx_cy')    { patch.cx = nx; patch.cy = ny; }
      if (drag.role === 'cx1_cy1')  { patch.cx1 = nx; patch.cy1 = ny; }
      if (drag.role === 'cx2_cy2')  { patch.cx2 = nx; patch.cy2 = ny; }
      dispatch({ type: 'UPDATE_POINT', id: drag.pointId, patch });
    },
    [getSvgCoords, snap, clampX, clampY]
  );

  const cancelPress = useCallback(() => {
    if (pressRef.current) clearTimeout(pressRef.current.timer);
    pressRef.current = null;
  }, []);

  // ── Mouse / pen ──
  // Ctrl/⌘ + click adds a point; holding on empty canvas adds one and drags it
  const onCanvasMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isEmulatedMouse() || e.button !== 0) return;
      if (e.ctrlKey || e.metaKey) {
        const { x, y } = getSvgCoords(e);
        dispatch({ type: 'ADD_POINT', x: clampX(snap(x)), y: clampY(snap(y)) });
        return;
      }
      if (
        e.target === svgRef.current ||
        (e.target as SVGElement).id === 'canvas-bg' ||
        (e.target as SVGElement).id === 'drawn-path'
      ) {
        dispatch({ type: 'SELECT', id: null });
        cancelPress();
        const press = {
          x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY,
          timer: setTimeout(() => {
            pressRef.current = null;
            addAndDrag({ clientX: press.x, clientY: press.y });
          }, LONG_PRESS),
        };
        pressRef.current = press;
      }
    },
    [getSvgCoords, snap, addAndDrag, isEmulatedMouse, clampX, clampY, cancelPress]
  );

  // Pressing an anchor or handle drags it right away
  const onAnchorMouseDown = useCallback(
    (e: React.MouseEvent, pointId: string) => {
      e.stopPropagation();
      if (isEmulatedMouse() || e.button !== 0) return;
      beginDrag(pointId, 'anchor', e);
    },
    [beginDrag, isEmulatedMouse]
  );

  const onCtrlMouseDown = useCallback(
    (e: React.MouseEvent, pointId: string, role: DragRole) => {
      e.stopPropagation();
      if (isEmulatedMouse() || e.button !== 0) return;
      beginDrag(pointId, role, e);
    },
    [beginDrag, isEmulatedMouse]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const press = pressRef.current;
      if (press) {
        press.x = e.clientX;
        press.y = e.clientY;
        if (Math.hypot(e.clientX - press.startX, e.clientY - press.startY) > PRESS_TOLERANCE) cancelPress();
        return;
      }
      dragTo(e);
    },
    [dragTo, cancelPress]
  );

  const onMouseUp = useCallback(() => {
    cancelPress();
    dragRef.current = null;
  }, [cancelPress]);

  // ── Touch ──
  // Long-press on empty canvas adds a point and drags it; long-press on a point
  // or handle drags it. A tap selects (or deselects on empty canvas). Moving
  // before the long-press fires lets the page scroll as usual.
  const onCanvasTouchStart = useCallback(
    (e: React.TouchEvent, target: TouchTarget | null) => {
      e.stopPropagation();
      lastTouchRef.current = Date.now();
      touchEndRef.current?.();
      if (e.touches.length !== 1) return; // pinch-zoom etc. stays native

      // Listen on the touch target itself: touch events always reach it
      const el = e.target as SVGElement;
      const t = e.touches[0];
      const start = { clientX: t.clientX, clientY: t.clientY };
      let last = start;
      let active = false;

      const begin = () => {
        active = true;
        navigator.vibrate?.(10);
        if (target) beginDrag(target.pointId, target.role, last);
        else addAndDrag(last);
      };

      const onMove = (ev: TouchEvent) => {
        const tt = ev.touches[0];
        if (!tt) return;
        last = { clientX: tt.clientX, clientY: tt.clientY };
        if (!active) {
          if (Math.hypot(last.clientX - start.clientX, last.clientY - start.clientY) > PRESS_TOLERANCE) end(false);
          return;
        }
        if (ev.cancelable) ev.preventDefault();
        dragTo(last);
      };
      const onMenu = (ev: Event) => ev.preventDefault();
      const onEnd = () => end(true);
      const onCancel = () => end(false);

      const timer = setTimeout(begin, LONG_PRESS);

      const end = (released: boolean) => {
        clearTimeout(timer);
        el.removeEventListener('touchmove', onMove);
        el.removeEventListener('touchend', onEnd);
        el.removeEventListener('touchcancel', onCancel);
        window.removeEventListener('contextmenu', onMenu);
        lastTouchRef.current = Date.now();
        touchEndRef.current = null;
        // A quick tap that never turned into a drag selects / deselects
        if (released && !active) dispatch({ type: 'SELECT', id: target?.pointId ?? null });
        if (active) dragRef.current = null;
      };

      el.addEventListener('touchmove', onMove, { passive: false });
      el.addEventListener('touchend', onEnd);
      el.addEventListener('touchcancel', onCancel);
      window.addEventListener('contextmenu', onMenu);
      touchEndRef.current = () => end(false);
    },
    [beginDrag, addAndDrag, dragTo]
  );

  // Drop pending timers / listeners on unmount
  useEffect(() => () => {
    cancelPress();
    touchEndRef.current?.();
  }, [cancelPress]);

  // Selected point helpers
  const selectedPoint = state.points.find(p => p.id === state.selectedId) ?? null;
  const selectedIdx = state.points.findIndex(p => p.id === state.selectedId);
  const isFirstSelected = selectedIdx === 0;

  const updateSelected = useCallback((patch: Partial<PathPoint>) => {
    if (!state.selectedId) return;
    dispatch({ type: 'UPDATE_POINT', id: state.selectedId, patch });
  }, [state.selectedId]);

  const setSelectedType = useCallback((pt: PointType) => {
    if (!state.selectedId || isFirstSelected) return;
    dispatch({ type: 'SET_POINT_TYPE', id: state.selectedId, pointType: pt });
  }, [state.selectedId, isFirstSelected]);

  const removeSelected = useCallback(() => {
    if (!state.selectedId) return;
    dispatch({ type: 'REMOVE', id: state.selectedId });
  }, [state.selectedId]);

  return {
    state,
    dispatch,
    svgRef,
    dragRef,
    selectedPoint,
    selectedIdx,
    isFirstSelected,
    onCanvasMouseDown,
    onAnchorMouseDown,
    onCtrlMouseDown,
    onMouseMove,
    onMouseUp,
    onCanvasTouchStart,
    updateSelected,
    setSelectedType,
    removeSelected,
  };
}