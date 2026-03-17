import { useCallback, useReducer, useRef } from 'react';
import { CanvasConfig, DragRole, DragState, PathPoint, PointType } from './types';
import { makePoint, snapToGrid, uid } from './pathUtils';

// ─── State ───────────────────────────────────────────────────────────────────
export interface EditorState {
  points: PathPoint[];
  selectedId: string | null;
  config: CanvasConfig;
}

// ─── Actions ─────────────────────────────────────────────────────────────────
type Action =
  | { type: 'ADD_POINT'; x: number; y: number }
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
      const pt = makePoint(action.x, action.y, prev, isFirst);
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
  return { ...state, config: { ...state.config, ...patch } };
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



const p0 = makePoint(90, 210, undefined, true);
const p1 = {
  ...makePoint(330, 210, p0, false),
  type: 'C' as PointType,
  cx1: 180,
  cy1: 120,
  cx2: 240,
  cy2: 300,
};







const DEFAULT_POINTS: PathPoint[] = [p0, p1];




const INITIAL: EditorState = {
 points: DEFAULT_POINTS,
selectedId: p1.id,
  config: DEFAULT_CONFIG,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useEditorState() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const dragRef = useRef<DragState | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getSvgCoords = useCallback((e: MouseEvent | React.MouseEvent): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const snap = useCallback(
    (v: number) => snapToGrid(v, state.config.gridSize, state.config.snapGrid),
    [state.config.gridSize, state.config.snapGrid]
  );

  // Canvas click to add
  const onCanvasMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (e.ctrlKey || e.metaKey) {
        const { x, y } = getSvgCoords(e);
        dispatch({ type: 'ADD_POINT', x: snap(x), y: snap(y) });
        return;
      }
      if (
        e.target === svgRef.current ||
        (e.target as SVGElement).id === 'canvas-bg' ||
        (e.target as SVGElement).id === 'drawn-path'
      ) {
        dispatch({ type: 'SELECT', id: null });
      }
    },
    [getSvgCoords, snap]
  );

  // Start drag on anchor
  const onAnchorMouseDown = useCallback(
    (e: React.MouseEvent, pointId: string) => {
      e.stopPropagation();
      dispatch({ type: 'SELECT', id: pointId });
      const { x, y } = getSvgCoords(e);
      const pt = state.points.find(p => p.id === pointId)!;
      dragRef.current = {
        pointId,
        role: 'anchor',
        startX: x,
        startY: y,
        originX: pt.x,
        originY: pt.y,
      };
    },
    [getSvgCoords, state.points]
  );

  // Start drag on control point
  const onCtrlMouseDown = useCallback(
    (e: React.MouseEvent, pointId: string, role: DragRole) => {
      e.stopPropagation();
      dispatch({ type: 'SELECT', id: pointId });
      const { x, y } = getSvgCoords(e);
      const pt = state.points.find(p => p.id === pointId)!;
      let ox = 0, oy = 0;
      if (role === 'cx_cy')   { ox = pt.cx!;  oy = pt.cy!; }
      if (role === 'cx1_cy1') { ox = pt.cx1!; oy = pt.cy1!; }
      if (role === 'cx2_cy2') { ox = pt.cx2!; oy = pt.cy2!; }
      dragRef.current = { pointId, role, startX: x, startY: y, originX: ox, originY: oy };
    },
    [getSvgCoords, state.points]
  );

  // Mouse move — update dragged point
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const { x, y } = getSvgCoords(e);
      const dx = x - drag.startX;
      const dy = y - drag.startY;
      const nx = snap(drag.originX + dx);
      const ny = snap(drag.originY + dy);

      const patch: Partial<PathPoint> = {};
      if (drag.role === 'anchor')   { patch.x = nx; patch.y = ny; }
      if (drag.role === 'cx_cy')    { patch.cx = nx; patch.cy = ny; }
      if (drag.role === 'cx1_cy1')  { patch.cx1 = nx; patch.cy1 = ny; }
      if (drag.role === 'cx2_cy2')  { patch.cx2 = nx; patch.cy2 = ny; }
      dispatch({ type: 'UPDATE_POINT', id: drag.pointId, patch });
    },
    [getSvgCoords, snap]
  );

  const onMouseUp = useCallback(() => { dragRef.current = null; }, []);

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
    updateSelected,
    setSelectedType,
    removeSelected,
  };
}
