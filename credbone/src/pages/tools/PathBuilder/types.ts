export type PointType = 'M' | 'L' | 'Q' | 'C' | 'A';

export interface PathPoint {
  id: string;
  type: PointType;
  x: number;
  y: number;
  // Q
  cx?: number;
  cy?: number;
  // C
  cx1?: number;
  cy1?: number;
  cx2?: number;
  cy2?: number;
  // A
  rx?: number;
  ry?: number;
  xrot?: number;
  large?: boolean;
  sweep?: boolean;
}

export type DragRole =
  | 'anchor'
  | 'cx_cy'
  | 'cx1_cy1'
  | 'cx2_cy2';

export interface DragState {
  pointId: string;
  role: DragRole;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

export interface CanvasConfig {
  width: number;
  height: number;
  closePath: boolean;
  gridSize: number;
  snapGrid: boolean;
  showGrid: boolean;
}
