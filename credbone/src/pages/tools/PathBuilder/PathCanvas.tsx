import React, { useEffect } from 'react';
import { CanvasConfig, DragRole, PathPoint } from './types';
import { buildPathD, r } from './pathUtils';

interface Props {
  points: PathPoint[];
  selectedId: string | null;
  config: CanvasConfig;
  svgRef: React.RefObject<SVGSVGElement | null> | React.MutableRefObject<SVGSVGElement | null>;
  onCanvasMouseDown: (e: React.MouseEvent<SVGSVGElement>) => void;
  onAnchorMouseDown: (e: React.MouseEvent, id: string) => void;
  onCtrlMouseDown: (e: React.MouseEvent, id: string, role: DragRole) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

export const PathCanvas: React.FC<Props> = ({
  points,
  selectedId,
  config,
  svgRef,
  onCanvasMouseDown,
  onAnchorMouseDown,
  onCtrlMouseDown,
  onMouseMove,
  onMouseUp,
}) => {
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const pathD = buildPathD(points, config.closePath);
  const gs = config.gridSize;
  const { width, height } = config;

  return (
    <svg
    data-shrink="no"
    data-margin-top="-1"
    data-margin-left="-1"
      ref={svgRef as React.RefObject<SVGSVGElement>}
      id="main-svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block', cursor: 'crosshair' }}
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={onCanvasMouseDown}
    >
      <defs>
        <pattern id="grid-pat" patternUnits="userSpaceOnUse" width={gs} height={gs}>
          <path d={`M ${gs} 0 L 0 0 0 ${gs}`} fill="none" stroke="currentColor" opacity="0.2" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Background */}
      <rect
        id="canvas-bg"
        width={width}
        height={height}
        fill={config.showGrid ? 'url(#grid-pat)' : 'transparent'}
      />

      {/* ── Group 1: Control lines ── */}
      <g id="g-ctrl-lines">
        {points.map((p, i) => {
          if (i === 0) return null;
          const prev = points[i - 1];
          if (p.type === 'Q') return (
            <React.Fragment key={p.id}>
              <CtrlLine x1={prev.x} y1={prev.y} x2={p.cx!} y2={p.cy!} />
              <CtrlLine x1={p.cx!} y1={p.cy!} x2={p.x} y2={p.y} />
            </React.Fragment>
          );
          if (p.type === 'C') return (
            <React.Fragment key={p.id}>
              <CtrlLine x1={prev.x} y1={prev.y} x2={p.cx1!} y2={p.cy1!} />
              <CtrlLine x1={p.cx2!} y1={p.cy2!} x2={p.x} y2={p.y} />
              {/* <CtrlLine x1={p.cx1!} y1={p.cy1!} x2={p.cx2!} y2={p.cy2!} /> */}
            </React.Fragment>
          );
          return null;
        })}
      </g>

      {/* ── Group 2: The path ── */}
      <path
        id="drawn-path"
        d={pathD}
        fill={config.closePath ? 'var(--gray-shade-20)' : 'none'}
       // fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Group 3: Control point dots ── */}
      <g id="g-ctrl-points">
        {points.map((p, i) => {
          if (i === 0) return null;
          return (
            <React.Fragment key={p.id}>
              {p.type === 'Q' && (
                <CtrlDot cx={p.cx!} cy={p.cy!} pointId={p.id} role="cx_cy" onMouseDown={onCtrlMouseDown} />
              )}
              {p.type === 'C' && (
                <>
                  <CtrlDot cx={p.cx1!} cy={p.cy1!} pointId={p.id} role="cx1_cy1" onMouseDown={onCtrlMouseDown} />
                  <CtrlDot cx={p.cx2!} cy={p.cy2!} pointId={p.id} role="cx2_cy2" onMouseDown={onCtrlMouseDown} />
                </>
              )}
            </React.Fragment>
          );
        })}
      </g>

      {/* ── Group 4: Anchor points ── */}
      <g id="g-anchor-points">
        {points.map((p, i) => (
          <AnchorPoint
            key={p.id}
            point={p}
            isSelected={p.id === selectedId}
            isFirst={i === 0}
            onMouseDown={onAnchorMouseDown}
          />
        ))}
      </g>

      {/* Empty state */}
      {/* {points.length === 0 && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
         
         // fill="#2a4060"
      //    fontSize="15"
     //     fontFamily="'Courier New', monospace"
          pointerEvents="none"
        >
          Ctrl+Click to place first point
        </text>
      )} */}
    </svg>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const CtrlLine: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
  <line
    x1={r(x1)} y1={r(y1)} x2={r(x2)} y2={r(y2)}
    stroke="currentColor"
    opacity={.2}
    strokeWidth="1"
   // strokeDasharray="2 6"
  />
);

interface CtrlDotProps {
  cx: number;
  cy: number;
  pointId: string;
  role: DragRole;
  onMouseDown: (e: React.MouseEvent, id: string, role: DragRole) => void;
}

const CtrlDot: React.FC<CtrlDotProps> = ({ cx, cy, pointId, role, onMouseDown }) => (
  <circle
    cx={r(cx)}
    cy={r(cy)}
    r={5}
    fill="var(--background)"
    stroke="var(--amber)"
    strokeWidth="5"
    style={{ cursor: 'pointer' }}
    onMouseDown={e => onMouseDown(e, pointId, role)}
    
  />
);

interface AnchorPointProps {
  point: PathPoint;
  isSelected: boolean;
  isFirst: boolean;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}

const AnchorPoint: React.FC<AnchorPointProps> = ({ point, isSelected, isFirst, onMouseDown }) => {
  const [hovered, setHovered] = React.useState(false);
  const strokeColor = isFirst ? '#f4511e' : 'currentColor';
  const fill = isSelected ? strokeColor : 'var(--background)';

  return (
    <g
      style={{ cursor: 'pointer' }}
      onMouseDown={e => onMouseDown(e, point.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {(hovered || isSelected) && (
        <circle
          cx={r(point.x)} cy={r(point.y)} r={9}
          fill="none"
          stroke={`${strokeColor}`}
          strokeWidth={isSelected ? 10 : hovered ? 7 : 0}
          opacity={.2}

        />
      )}
      <circle
        cx={r(point.x)} cy={r(point.y)} r={5}
        fill={fill}
        stroke={strokeColor}
        strokeWidth="5"
      />
    </g>
  );
};