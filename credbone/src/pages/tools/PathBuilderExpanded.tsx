import React, { useState, useRef, useCallback } from 'react';

// --- Types ---
export type PointType = 'M' | 'L' | 'Q' | 'C' | 'A';

export interface PathPoint {
  id: string;
  type: PointType;
  x: number;
  y: number;
  // Bezier Controls
  cx1?: number; cy1?: number; // Used by Q and C
  cx2?: number; cy2?: number; // Used by C
  // Arc Params
  rx?: number; ry?: number;
  rot?: number; large?: number; sweep?: number;
}

export default function PathBuilder() {
  // --- Global Options ---
  const [canvasSize, setCanvasSize] = useState({ w: 600, h: 400 });
  const [gridSize, setGridSize] = useState(30);
  const [snapGrid, setSnapGrid] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [closePath, setClosePath] = useState(false);

  // --- Path State ---
  const [points, setPoints] = useState<PathPoint[]>([
    { id: '1', type: 'M', x: 400, y: 300 },
    { id: '2', type: 'Q', x: 550, y: 300, cx1: 450, cy1: 200 }
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [dragInfo, setDragInfo] = useState<{ index: number; target: 'main' | 'c1' | 'c2' } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // --- Core Logic ---
  const applySnap = (val: number) => snapGrid ? Math.round(val / gridSize) * gridSize : val;

  const getMouseCoords = (e: React.MouseEvent | React.PointerEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    return { x: applySnap(svgP.x), y: applySnap(svgP.y) };
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.ctrlKey) {
      const { x, y } = getMouseCoords(e);
      const newPoint: PathPoint = { id: Date.now().toString(), type: 'L', x, y };
      setPoints([...points, newPoint]);
      setSelectedIndex(points.length);
    } else if ((e.target as Element).tagName === 'svg' || (e.target as Element).tagName === 'rect') {
      setSelectedIndex(-1);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo) return;
    const { x, y } = getMouseCoords(e);
    setPoints(prev => {
      const updated = [...prev];
      const p = { ...updated[dragInfo.index] };
      if (dragInfo.target === 'main') { p.x = x; p.y = y; }
      else if (dragInfo.target === 'c1') { p.cx1 = x; p.cy1 = y; }
      else if (dragInfo.target === 'c2') { p.cx2 = x; p.cy2 = y; }
      updated[dragInfo.index] = p;
      return updated;
    });
  };

  const generatePathString = () => {
    let d = '';
    points.forEach((p, i) => {
      const type = i === 0 ? 'M' : p.type;
      if (type === 'M' || type === 'L') d += `${type} ${p.x} ${p.y} `;
      else if (type === 'Q') d += `Q ${p.cx1} ${p.cy1} ${p.x} ${p.y} `;
      else if (type === 'C') d += `C ${p.cx1} ${p.cy1} ${p.cx2} ${p.cy2} ${p.x} ${p.y} `;
      else if (type === 'A') d += `A ${p.rx} ${p.ry} ${p.rot} ${p.large} ${p.sweep} ${p.x} ${p.y} `;
    });
    return (d + (closePath ? 'Z' : '')).trim();
  };

  const selectedPoint = points[selectedIndex];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#f4f7fb', overflow: 'hidden' }}
         onPointerMove={handlePointerMove} onPointerUp={() => setDragInfo(null)}>
      
      {/* LEFT CANVAS AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <svg ref={svgRef} width={canvasSize.w} height={canvasSize.h} onMouseDown={handleCanvasClick}
               style={{ background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', touchAction: 'none' }}>
            {/* Grid */}
            {showGrid && (
              <defs>
                <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                  <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#f0f0f0" strokeWidth="1" />
                </pattern>
              </defs>
            )}
            {showGrid && <rect width="100%" height="100%" fill="url(#grid)" />}

            {/* Path */}
            <path d={generatePathString()} fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" />

            {/* Anchors & Guidelines */}
            {points.map((p, i) => {
              const isSel = i === selectedIndex;
              const prev = points[i - 1];
              return (
                <g key={p.id}>
                  {/* Q & C Guidelines */}
                  {(p.type === 'Q' || p.type === 'C') && prev && (
                    <line x1={prev.x} y1={prev.y} x2={p.cx1} y2={p.cy1} stroke="#bbb" strokeDasharray="4 4" />
                  )}
                  {p.type === 'Q' && (
                    <line x1={p.cx1} y1={p.cy1} x2={p.x} y2={p.y} stroke="#bbb" strokeDasharray="4 4" />
                  )}
                  {p.type === 'C' && (
                    <line x1={p.cx2} y1={p.cy2} x2={p.x} y2={p.y} stroke="#bbb" strokeDasharray="4 4" />
                  )}

                  {/* Control Point 1 */}
                  {p.cx1 !== undefined && (
                    <circle cx={p.cx1} cy={p.cy1} r="5" fill="white" stroke="#999" strokeWidth="2" style={{ cursor: 'pointer' }}
                            onPointerDown={(e) => { e.stopPropagation(); setSelectedIndex(i); setDragInfo({ index: i, target: 'c1' }); }} />
                  )}
                  {/* Control Point 2 (Cubic only) */}
                  {p.cx2 !== undefined && (
                    <circle cx={p.cx2} cy={p.cy2} r="5" fill="white" stroke="#999" strokeWidth="2" style={{ cursor: 'pointer' }}
                            onPointerDown={(e) => { e.stopPropagation(); setSelectedIndex(i); setDragInfo({ index: i, target: 'c2' }); }} />
                  )}

                  {/* Main Anchor */}
                  <circle cx={p.x} cy={p.y} r="6" fill={isSel ? "#4a6cf7" : "#555"} style={{ cursor: 'pointer' }}
                          onPointerDown={(e) => { e.stopPropagation(); setSelectedIndex(i); setDragInfo({ index: i, target: 'main' }); }} />
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Instruction Footer */}
        <div style={{ padding: '20px', fontSize: '12px', color: '#888', background: 'white', borderTop: '1px solid #eee' }}>
          • <b>CLICK</b> TO SELECT A POINT <br/>
          • <b>CTRL + CLICK</b> TO ADD A POINT
        </div>
      </div>

      {/* RIGHT SIDEBAR (UI Scaffold) */}
      <div style={{ width: '360px', background: '#2b3a67', color: 'white', padding: '25px', overflowY: 'auto' }}>
        
        {/* Global Settings Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ fontSize: '11px' }}>WIDTH<br/><span style={{ fontSize: '16px' }}>{canvasSize.w}</span></div>
          <div style={{ fontSize: '11px' }}>HEIGHT<br/><span style={{ fontSize: '16px' }}>{canvasSize.h}</span></div>
          <div style={{ fontSize: '11px' }}>CLOSE PATH<br/><input type="checkbox" checked={closePath} onChange={e => setClosePath(e.target.checked)} /></div>
          
          <div style={{ fontSize: '11px' }}>GRID SIZE<br/><span style={{ fontSize: '16px' }}>{gridSize}</span></div>
          <div style={{ fontSize: '11px' }}>SNAP GRID<br/><input type="checkbox" checked={snapGrid} onChange={e => setSnapGrid(e.target.checked)} /></div>
          <div style={{ fontSize: '11px' }}>SHOW GRID<br/><input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} /></div>
        </div>

        <button style={{ color: '#ff4d4d', background: 'none', border: '1px solid #ff4d4d', padding: '8px 15px', cursor: 'pointer', marginBottom: '30px' }}
                onClick={() => setPoints([{ id: '1', type: 'M', x: 100, y: 100 }])}>RESET</button>

        {selectedPoint && (
          <div>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Selected point</h2>
            
            {/* Point Type Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
              {['L', 'Q', 'C', 'A'].map(t => (
                <button key={t} onClick={() => {
                  const updated = [...points];
                  updated[selectedIndex] = { ...updated[selectedIndex], type: t as PointType };
                  // Add defaults for new types if missing
                  if (t === 'Q' && updated[selectedIndex].cx1 === undefined) { updated[selectedIndex].cx1 = updated[selectedIndex].x - 50; updated[selectedIndex].cy1 = updated[selectedIndex].y - 50; }
                  if (t === 'C' && updated[selectedIndex].cx2 === undefined) { updated[selectedIndex].cx2 = updated[selectedIndex].x + 50; updated[selectedIndex].cy2 = updated[selectedIndex].y - 50; }
                  if (t === 'A' && updated[selectedIndex].rx === undefined) { updated[selectedIndex].rx = 50; updated[selectedIndex].ry = 50; updated[selectedIndex].rot = 0; updated[selectedIndex].large = 0; updated[selectedIndex].sweep = 0; }
                  setPoints(updated);
                }} style={{ padding: '10px 15px', background: selectedPoint.type === t ? '#4a6cf7' : 'transparent', border: '1px solid #4a6cf7', color: 'white', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>

            {/* Dynamic Sliders based on type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               <label>POINT X POSITION: {selectedPoint.x}</label>
               <input type="range" max={canvasSize.w} value={selectedPoint.x} onChange={e => {
                 const updated = [...points]; updated[selectedIndex].x = +e.target.value; setPoints(updated);
               }} />

               {(selectedPoint.type === 'Q' || selectedPoint.type === 'C') && (
                 <>
                   <label>CONTROL POINT 1 X: {selectedPoint.cx1}</label>
                   <input type="range" max={canvasSize.w} value={selectedPoint.cx1} onChange={e => {
                     const updated = [...points]; updated[selectedIndex].cx1 = +e.target.value; setPoints(updated);
                   }} />
                 </>
               )}
            </div>

            <button style={{ color: '#ff4d4d', background: 'none', border: 'none', marginTop: '30px', cursor: 'pointer' }}
                    onClick={() => { setPoints(points.filter((_, i) => i !== selectedIndex)); setSelectedIndex(-1); }}>
              Remove this point
            </button>
          </div>
        )}

        {/* Path Data Output */}
        <div style={{ background: '#1a2444', padding: '15px', marginTop: '40px', fontSize: '12px', wordBreak: 'break-all', fontFamily: 'monospace' }}>
          {generatePathString()}
        </div>
      </div>
    </div>
  );
}