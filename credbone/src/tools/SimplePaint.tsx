import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import Tooltip from "../components/tooltip";
import Popover from "../components/popover";
import Scroll from "../components/scroll";
import Ripple from "../components/Ripple";
import CustomSlider from "../components/inputs/slider";
import { Brush, Highlighter, Pencil, PenIcon, PenTool } from "lucide-react";

const colors = [
  { name: "Coral Sunset", value: "#F5745E" },
  { name: "Sunset Orange", value: "#EF7843" },
  { name: "Warm Apricot", value: "#F39555" },
  { name: "Golden Sand", value: "#F2CA89" },
  { name: "Lemon Chiffon", value: "#EBC368" },
  { name: "Mossy Green", value: "#CBC24B" },
  { name: "Olive Drab", value: "#AFB247" },
  { name: "Slate Gray", value: "#717896" },
  { name: "Dusty Blue", value: "#7F959F" },
  { name: "Aqua Teal", value: "#8DAFB2" },
  { name: "Seafoam Green", value: "#9DC3BE" },
  { name: "Cool Breeze", value: "#84CEC0" },
];

type BrushType = "brush" | "marker" | "calligraphy";

const brushTypeLabels: { type: BrushType; label: string; icon: ReactNode }[] = [
  { type: "brush", icon: <Pencil size={20} />, label: "Brush" },
  { type: "marker", icon: <Highlighter size={20} />, label: "Marker" },
  { type: "calligraphy", icon: <PenTool size={20} />, label: "Ink" },
];

const SimplePaint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(
    document.createElement("canvas"),
  );

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#F5745E");
  const [brushSize, setBrushSize] = useState(16);
  const [brushType, setBrushType] = useState<BrushType>("brush");

  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);

  // Smooth drawing: rolling buffer of recent points
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  // Previous point for calligraphy angle calculation
  const prevPtRef = useRef<{ x: number; y: number } | null>(null);

  const [isBrushOpen, setIsBrushOpen] = useState(false);
  const [isColorsOpen, setIsColorsOpen] = useState(false);

  // ─── HiDPI ────────────────────────────────────────────────────────────────
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  const setupCanvas = (
    canvas: HTMLCanvasElement,
    logicalW: number,
    logicalH: number,
    restoreFrom?: HTMLCanvasElement | null,
  ) => {
    canvas.width = Math.round(logicalW * dpr);
    canvas.height = Math.round(logicalH * dpr);
    canvas.style.width = `${logicalW}px`;
    canvas.style.height = `${logicalH}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    if (restoreFrom && restoreFrom.width > 0 && restoreFrom.height > 0) {
      ctx.drawImage(
        restoreFrom,
        0,
        0,
        restoreFrom.width / dpr,
        restoreFrom.height / dpr,
      );
    }
  };

  // ─── Resize ───────────────────────────────────────────────────────────────
  const startResize = () => {
    if (canvasRef.current && tempCanvasRef.current) {
      tempCanvasRef.current.width = canvasRef.current.width;
      tempCanvasRef.current.height = canvasRef.current.height;
      const tempCtx = tempCanvasRef.current.getContext("2d");
      if (tempCtx) tempCtx.drawImage(canvasRef.current, 0, 0);
    }
    setIsResizing(true);
  };

  const stopResize = () => setIsResizing(false);

  const handleResize = useCallback(
    (e: PointerEvent | TouchEvent) => {
      if (!isResizing || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setWidth(Math.max(40, Math.round(clientX - rect.left)));
      setHeight(Math.max(40, Math.round(clientY - rect.top)));
    },
    [isResizing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCanvas(canvas, width, height, tempCanvasRef.current);
  }, [width, height]);

  useEffect(() => {
    window.addEventListener("pointermove", handleResize);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("touchmove", handleResize, { passive: false });
    window.addEventListener("touchend", stopResize);
    return () => {
      window.removeEventListener("pointermove", handleResize);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("touchmove", handleResize);
      window.removeEventListener("touchend", stopResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (appRef.current) setWidth(appRef.current.offsetWidth - 60);
  }, []);
  useEffect(() => {
    if (wrapperRef.current) setHeight(wrapperRef.current.offsetHeight - 60);
  }, []);

  // ─── Drawing ──────────────────────────────────────────────────────────────
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    if ("touches" in e) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  /** Parse hex color to r,g,b components */
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    return ctx;
  };

  // ── Brush (smooth Catmull-Rom) ─────────────────────────────────────────
  const drawSmoothCurve = (
    ctx: CanvasRenderingContext2D,
    pts: { x: number; y: number }[],
  ) => {
    if (pts.length < 2) return;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    if (pts.length === 2) {
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[1].x, pts[1].y);
    } else {
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(i + 2, pts.length - 1)];
        const t = 0.5;
        const cp1x = p1.x + ((p2.x - p0.x) * t) / 3;
        const cp1y = p1.y + ((p2.y - p0.y) * t) / 3;
        const cp2x = p2.x - ((p3.x - p1.x) * t) / 3;
        const cp2y = p2.y - ((p3.y - p1.y) * t) / 3;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    }
    ctx.stroke();
  };

  // ── Marker ────────────────────────────────────────────────────────────
  // Offscreen buffer approach: the current stroke is drawn at full opacity
  // onto a temp canvas, then composited at marker opacity onto the main canvas.
  // This means overlaps within a single stroke don't darken — only separate
  // strokes layer on top of each other, exactly like a real marker.
  const markerBufferRef = useRef<HTMLCanvasElement | null>(null);

  const getMarkerBuffer = (): HTMLCanvasElement | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    if (!markerBufferRef.current) {
      markerBufferRef.current = document.createElement("canvas");
    }
    const buf = markerBufferRef.current;
    if (buf.width !== canvas.width || buf.height !== canvas.height) {
      buf.width = canvas.width;
      buf.height = canvas.height;
    }
    return buf;
  };

  const drawMarkerStrokeToBuffer = (pts: { x: number; y: number }[]) => {
    const buf = getMarkerBuffer();
    if (!buf) return;
    const bctx = buf.getContext("2d");
    if (!bctx) return;

    // Clear buffer, apply dpr scale
    bctx.clearRect(0, 0, buf.width, buf.height);
    bctx.save();
    bctx.scale(dpr, dpr);

    bctx.strokeStyle = brushColor;
    bctx.lineWidth = brushSize * 1;
    bctx.lineCap = "round";
    bctx.lineJoin = "round";
    bctx.globalAlpha = 1;

    // Draw smooth Catmull-Rom through all marker points
    if (pts.length < 2) {
      bctx.beginPath();
      bctx.arc(pts[0].x, pts[0].y, brushSize * 0.8, 0, Math.PI * 2);
      bctx.fillStyle = brushColor;
      bctx.fill();
    } else {
      bctx.beginPath();
      bctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(i + 2, pts.length - 1)];
        const t = 0.5;
        const cp1x = p1.x + ((p2.x - p0.x) * t) / 3;
        const cp1y = p1.y + ((p2.y - p0.y) * t) / 3;
        const cp2x = p2.x - ((p3.x - p1.x) * t) / 3;
        const cp2y = p2.y - ((p3.y - p1.y) * t) / 3;
        bctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      bctx.stroke();
    }
    bctx.restore();
  };

  // Snapshot of canvas before marker stroke starts (same pattern as calligraphy)
  const markerSnapshotRef = useRef<HTMLCanvasElement | null>(null);

  const compositeMarkerBuffer = () => {
    const canvas = canvasRef.current;
    const buf = markerBufferRef.current;
    const snapshot = markerSnapshotRef.current;
    if (!canvas || !buf) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lw = canvas.width / dpr;
    const lh = canvas.height / dpr;

    // Restore snapshot (removes incremental overdraw from live preview)
    if (snapshot) {
      ctx.clearRect(0, 0, lw, lh);
      ctx.drawImage(snapshot, 0, 0, lw, lh);
    }
    // Composite the fully-drawn stroke once at marker opacity — clean, no overlaps
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(buf, 0, 0, lw, lh);
    ctx.restore();
  };

  // ── Ink / Calligraphy ─────────────────────────────────────────────────
  // Velocity-based variable-width ink: each segment is drawn with a lineWidth
  // derived from how fast the pointer moved. Slow = thick, fast = thin.
  // Width is smoothed with exponential decay (EMA) to avoid jitter.
  // Segments overlap with round caps so there are no gaps.
  // A snapshot at stroke-start enables clean per-segment overdraw.
  //
  // This is the same core approach used in most real drawing apps:
  // simple, fast, and looks good.

  const calligSnapshotRef = useRef<HTMLCanvasElement | null>(null);
  type InkPoint = { x: number; y: number; w: number };
  const inkPointsRef = useRef<InkPoint[]>([]);

  const INK_MAX_WIDTH = 1; // multiplier on brushSize at rest (thick)
  const INK_MIN_WIDTH = 0.2; // multiplier on brushSize at full speed (hairline)
  const INK_VELOCITY_SCALE = 2; // px/event where stroke becomes fully thin
  const INK_EMA_ALPHA = 0.2; // width reaction speed (higher = more responsive)

  /**
   * Redraw the entire ink stroke from scratch on the main canvas.
   * Restores snapshot first, then replays all segments. This keeps
   * the stroke clean even as new points are added.
   */
  const redrawInkStroke = (pts: InkPoint[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lw = canvas.width / dpr;
    const lh = canvas.height / dpr;

    // Restore canvas to pre-stroke state
    const snapshot = calligSnapshotRef.current;
    if (snapshot) {
      ctx.clearRect(0, 0, lw, lh);
      ctx.drawImage(snapshot, 0, 0, lw, lh);
    }

    if (pts.length === 0) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    if (pts.length === 1) {
      // Single tap: filled dot
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, pts[0].w / 2, 0, Math.PI * 2);
      ctx.fillStyle = brushColor;
      ctx.fill();
      return;
    }

    // Draw each segment individually with its own lineWidth.
    // Each segment slightly overlaps the previous (round caps ensure continuity).
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      ctx.beginPath();
      ctx.lineWidth = (a.w + b.w) / 2; // average width over the segment
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  };

  // ── Unified start/draw/stop ────────────────────────────────────────────
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pt = getCoordinates(e);
    const ctx = getContext();
    if (!ctx) return;

    pointsRef.current = [pt];
    prevPtRef.current = pt;

    if (brushType === "brush") {
      ctx.fillStyle = brushColor;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (brushType === "marker") {
      // Snapshot canvas before stroke (enables clean final composite)
      const canvas = canvasRef.current;
      if (canvas) {
        if (!markerSnapshotRef.current)
          markerSnapshotRef.current = document.createElement("canvas");
        const snap = markerSnapshotRef.current;
        snap.width = canvas.width;
        snap.height = canvas.height;
        const sctx = snap.getContext("2d");
        if (sctx) sctx.drawImage(canvas, 0, 0);
      }
      // Init marker buffer
      const buf = getMarkerBuffer();
      if (buf) {
        const bctx = buf.getContext("2d");
        if (bctx) bctx.clearRect(0, 0, buf.width, buf.height);
      }
      drawMarkerStrokeToBuffer([pt]);
    } else {
      // Ink: snapshot canvas before stroke, seed with full-width point
      const canvas = canvasRef.current;
      if (canvas) {
        if (!calligSnapshotRef.current)
          calligSnapshotRef.current = document.createElement("canvas");
        const snap = calligSnapshotRef.current;
        snap.width = canvas.width;
        snap.height = canvas.height;
        const sctx = snap.getContext("2d");
        if (sctx) sctx.drawImage(canvas, 0, 0);
      }
      inkPointsRef.current = [
        { x: pt.x, y: pt.y, w: brushSize * INK_MAX_WIDTH },
      ];
      redrawInkStroke(inkPointsRef.current);
    }

    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = getContext();
    if (!ctx) return;
    const pt = getCoordinates(e);

    if (brushType === "brush") {
      const pts = pointsRef.current;
      const last = pts[pts.length - 1];
      const dx = pt.x - last.x;
      const dy = pt.y - last.y;
      if (dx * dx + dy * dy < 1) return;
      pts.push(pt);
      drawSmoothCurve(ctx, pts.slice(Math.max(pts.length - 4, 0)));
    } else if (brushType === "marker") {
      const pts = pointsRef.current;
      const last = pts[pts.length - 1];
      const dx = pt.x - last.x;
      const dy = pt.y - last.y;
      if (dx * dx + dy * dy < 1) return;
      pts.push(pt);
      drawMarkerStrokeToBuffer(pts);
      // Live preview: restore snapshot then composite buffer at opacity
      // — this keeps mid-stroke overlaps clean during drag
      const canvas = canvasRef.current;
      const snapshot = markerSnapshotRef.current;
      const buf = markerBufferRef.current;
      if (canvas && buf) {
        const lw = canvas.width / dpr;
        const lh = canvas.height / dpr;
        if (snapshot) {
          ctx.clearRect(0, 0, lw, lh);
          ctx.drawImage(snapshot, 0, 0, lw, lh);
        }
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.drawImage(buf, 0, 0, lw, lh);
        ctx.restore();
      }
    } else {
      // Ink: velocity → width with EMA smoothing
      const inkPts = inkPointsRef.current;
      const last = inkPts[inkPts.length - 1];
      const dx = pt.x - last.x;
      const dy = pt.y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.5) return;

      const velocity = Math.min(dist, INK_VELOCITY_SCALE);
      const thinness = velocity / INK_VELOCITY_SCALE; // 0=slow 1=fast
      const targetW =
        brushSize *
        (INK_MAX_WIDTH - (INK_MAX_WIDTH - INK_MIN_WIDTH) * thinness);
      // EMA: blend toward target width — smooths out jitter from uneven mouse events
      const prevW = last.w;
      const w = prevW + (targetW - prevW) * INK_EMA_ALPHA;

      inkPts.push({ x: pt.x, y: pt.y, w });
      redrawInkStroke(inkPts);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    if (brushType === "brush") {
      const ctx = getContext();
      if (ctx) drawSmoothCurve(ctx, pointsRef.current);
    } else if (brushType === "marker") {
      // Final clean composite: snapshot already restored in live preview,
      // so compositeMarkerBuffer just needs to lay the stroke on top once.
      drawMarkerStrokeToBuffer(pointsRef.current);
      compositeMarkerBuffer();
      markerSnapshotRef.current = null;
    } else {
      // Ink: final stroke already on canvas
      calligSnapshotRef.current = null;
      inkPointsRef.current = [];
    }

    pointsRef.current = [];
    prevPtRef.current = null;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCanvas(canvas, width, height);
    if (tempCanvasRef.current) {
      const tempCtx = tempCanvasRef.current.getContext("2d");
      if (tempCtx)
        tempCtx.clearRect(
          0,
          0,
          tempCanvasRef.current.width,
          tempCanvasRef.current.height,
        );
    }
  };

  // ─── SVG cursor ───────────────────────────────────────────────────────────
  const buildCursorSvg = () => {
    const pad = 4;
    const r = Math.max(brushSize / 2, 3);
    const size = (r + pad) * 2;
    const c = size / 2;
    const strokeW = 1;
    const dotR = 1;

    const svg = `<svg xmlns='http://www.w3.org/2000/svg'  width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>

        <circle cx='${c}' cy='${c}' r='${r}' fill='none' stroke='rgba(0,0,0,.35)' stroke-width='${strokeW}'/>
      <circle cx='${c}' cy='${c}' r='${dotR}' fill='#000'/>

    </svg>`;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${c} ${c}, crosshair`;
  };

  return (
    <group
      data-direction="column"
      data-wrap="no"
      ref={appRef}
      data-max-height="fit"
      data-height="fit"
      data-contain=""
    >


      <group
        data-scroll=""
        data-background="adaptive-gray"
        data-max-height="fit"
        data-height="fit"
        data-space="30"
        ref={wrapperRef}
        data-wrap="no"
        data-direction="column"
        data-align="start"
        data-gap="30"
      >



      <group

      data-sticky=""
      data-top="0"
      data-left="0"
       // data-space="30"
      //  data-space-bottom="0"
        data-align="start"
        data-gap="10"
       // data-background="adaptive-gray"
      //  data-wrap="no"
      >
        <Ripple>
          <group
          data-backdrop="20-contrast"
            data-ink-color="neutral"
            onClick={clearCanvas}
            data-cursor="pointer"
            data-radius="30"
            data-width="auto"
            data-contain=""
            data-interactive=""
            data-height="50"
            data-space-vertical="15"
            data-space-horizontal="25"
            data-wrap="no"
            data-align="center"
            data-gap="15"
            data-background="adaptive-gray"
          >
            <text data-weight="700" data-length="autofit">
              New
            </text>
          </group>
        </Ripple>

        {/* ── Brush type selector ── */}
        <group
          data-background="adaptive-gray"
          data-radius="30"
          data-space="5"
          data-wrap="no"
          data-width="auto"
          data-contain=""
           data-backdrop="20-contrast"
         
        >
          {brushTypeLabels.map(({ type, label, icon }) => (
            <Ripple key={type}>
              <group
              
                data-ink-color="neutral"
                data-over-color="neutral"
                onClick={() => setBrushType(type)}
                data-cursor="pointer"
                data-width="auto"
                data-contain=""
                data-interactive=""
                data-radius="30"
                data-space="15"
                data-duration="2.25"
                data-transition-prop="padding"
                data-space-horizontal={brushType === type ? "20" : ""}
                data-height="40"
                data-wrap="no"
                data-align="center"
                data-background={brushType === type ? "text" : ""}
                data-color={brushType === type ? "main-background" : ""}
              >
                {/* <text data-weight={brushType === type ? "700" : "400"} data-length="autofit">{label}</text> */}
                {icon}
              </group>
            </Ripple>
          ))}
        </group>

        {/* ── Brush size ── */}
        <Popover
          open={isBrushOpen}
          onOpenChange={setIsBrushOpen}
          data-space="0"
          data-radius="30"
          content={<group
              data-direction="column"
              data-length="300"
              data-space="15"
              data-space-horizontal="30"
              // onClick={closePopover}
            >
              {/* <group data-ratio="1:1"  data-align="center" data-justify="center" data-direction="column">

              </group> */}
              <group data-gap="15" data-wrap="no">
                <CustomSlider
                  start={1}
                  end={48}
                  value={brushSize}
                  onValueChange={(value) => setBrushSize(value)}
                  handlerProps={{ "data-animation-name": "slider-smooth" }}
                  trackLeftProps={{
                    "data-margin-right": "0",
                    "data-height": "1",
                  }}
                  trackRightProps={{
                    "data-opacity": "10",
                    "data-margin-left": "5",
                    "data-height": "1",
                  }}
                />
                {/* <separator data-vertical></separator>

                <group data-ratio="1:1" style={{ height: brushSize }} data-radius="full" data-width="auto" data-background="text"></group> */}
              </group>
            </group>
          }
        >
          <group
            data-cursor="pointer"
            data-radius="30"
            data-width="auto"
            data-background="adaptive-gray"
            data-contain=""
            data-interactive=""
            data-space-horizontal="20"
            data-space-vertical="15"
            data-wrap="no"
            data-align="center"
            data-gap="15"
             data-backdrop="20-contrast"
          >
            <text data-opacity="50">Brush</text>
            <separator data-vertical="" data-height="20"></separator>
            {/* <group data-length="20" data-align="center" data-direction="column" data-interact="">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r={brushSize} data-duration=".225" fill="currentColor" />
              </svg>

             
            </group> */}

            <group data-length="20" data-align="center" data-direction="column">
              <text data-weight="700">{brushSize}</text>
            </group>
          </group>
        </Popover>

        {/* ── Color picker ── */}
        <group
          data-contain=""
          data-gap="10"
          data-shrink="no"
          data-width="auto"
          data-background="adaptive-gray"
          data-radius="30"
          data-adaptive="desktop"
           data-backdrop="20-contrast"
        >
          <group data-snap-button="10">
            <Scroll>
              <group data-wrap="no" data-space="5">
                {colors.map((color, index) => (
                  <group key={index} data-height="40" data-length="40">
                    <Tooltip content={color.name} delay={300}>
                      <group
                        data-animation-name="appear-left"
                        data-over-color="neutral"
                        data-fill-mode="backwards"
                        data-animation-duration={2 + index * 0.25}
                        data-radius="30"
                        data-align="center"
                        data-justify="center"
                        data-direction="column"
                        data-cursor="pointer"
                        data-interactive=""
                        data-transition-prop="padding"
                        data-duration=".125"
                        data-background={
                          brushColor === color.value ? "context" : ""
                        }
                        data-index={brushColor === color.value ? "1" : ""}
                        data-space={brushColor === color.value ? "15" : "10"}
                        onClick={() => setBrushColor(color.value)}
                      >
                        <group
                          data-border="outline-soft"
                          data-interact=""
                          data-radius="30"
                          data-height="fit"
                          style={{ backgroundColor: color.value }}
                        ></group>
                      </group>
                    </Tooltip>
                  </group>
                ))}
              </group>
            </Scroll>
          </group>
        </group>

        {/* ── Color picker mobile ── */}
        <group data-adaptive="mobile" data-width="auto">
          <Popover
            open={isColorsOpen}
            onOpenChange={setIsColorsOpen}
            data-space="0"
            data-radius="30"
            //  data-backdrop="20-adaptive"
            content={
              <group
                data-direction="column"
                data-length="400"
                data-snap-button="15"
              >
                <Scroll
                  wheelEnabled
                  buttonProps={{ "data-radius": "30", "data-contain": "" }}
                >
                  <group data-wrap="no" data-space="10">
                    {colors.map((color, index) => (
                      <group key={index} data-height="40" data-length="40">
                        <Tooltip content={color.name} delay={300}>
                          <group
                            data-animation-name="appear-left"
                            data-over-color="neutral"
                            data-fill-mode="backwards"
                            data-animation-duration={2 + index * 0.25}
                            data-radius="30"
                            data-align="center"
                            data-justify="center"
                            data-direction="column"
                            data-cursor="pointer"
                            data-interactive=""
                            data-transition-prop="padding"
                            data-duration=".125"
                            data-background={
                              brushColor === color.value ? "context" : ""
                            }
                            data-index={brushColor === color.value ? "1" : ""}
                            data-space={
                              brushColor === color.value ? "15" : "10"
                            }
                            onClick={() => setBrushColor(color.value)}

                            // onClick={closePopover}
                          >
                            <group
                              data-border="outline-soft"
                              data-interact=""
                              data-radius="30"
                              data-height="fit"
                              style={{ backgroundColor: color.value }}
                            ></group>
                          </group>
                        </Tooltip>
                      </group>
                    ))}
                  </group>
                </Scroll>
              </group>
            }
          >
            <group
              data-over-color="neutral"
              data-cursor="pointer"
              data-radius="30"
              data-width="auto"
              data-background="adaptive-gray"
              data-contain=""
              data-interactive=""
              data-space-horizontal="15"
              data-space-vertical="15"
              data-wrap="no"
              data-align="center"
              data-gap="15"
               data-backdrop="20-contrast"
            >
              <text data-space-left="5" data-opacity="50">
                Color
              </text>
              <separator data-vertical="" data-height="20"></separator>

              <group
                data-height="20"
                data-border="outline-soft"
                data-length="20"
                data-interact=""
                data-radius="30"
                style={{ backgroundColor: brushColor }}
              ></group>
            </group>
          </Popover>
        </group>
      </group>



        <group
          data-border=""
          data-radius="20"
          // data-contain=""
          //  /     data-elevation="2"
          data-type="group"
          data-direction="column"
          data-align="start"
          data-max-length="auto"
          data-position="center"
          data-width="auto"
          data-background="white"
          ref={containerRef}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <canvas
            data-radius="20"
            ref={canvasRef}
            //   onMouseDown={startDrawing}
            onMouseDown={(e) => {
              setIsBrushOpen(false);
              setIsColorsOpen(false);
              startDrawing(e);
            }}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              setIsBrushOpen(false);
              setIsColorsOpen(false);
              startDrawing(e);
            }}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{ cursor: buildCursorSvg(), touchAction: "none" }}
          />

{/* <group data-hidden={isBrushOpen? "true":""} data-hide="over" data-position="absolute" data-pointer-event="none"  data-direction="column" data-align="center" data-justify="center" data-height="fit" data-top="0" > 
<svg width="100" height="100" data-animation-name="zoom-in" data-animation-duration="2" >
  <circle cx="50" cy="50" r={brushSize / 2}  fill="#000" />
</svg>
</group> */}


          <group
            data-position="absolute"
            data-height="30"
            data-length="30"
            data-bottom="-30"
            data-right="-30"
            style={{ cursor: "nwse-resize" }}
            onPointerDown={startResize}
          >
            <group
              data-height="5"
              data-length="5"
              data-background="text"
            ></group>
          </group>

          {/*
          <group data-position="absolute" data-height="30" data-length="30" data-bottom="-30" data-left="-30"  data-justify="end" style={{ cursor: "nesw-resize", }} > <group data-height="5" data-length="5" data-background="text" ></group> </group>
          <group data-position="absolute" data-height="30" data-length="30" data-top="-30" data-right="-30" data-align="end" data-justify="start" style={{ cursor: "nesw-resize", }}  > <group data-height="5" data-length="5" data-background="text" ></group> </group>
          <group data-position="absolute" data-height="30" data-length="30" data-top="-30" data-left="-30" data-align="end" data-justify="end" style={{ cursor: "nwse-resize", }}  > <group data-height="5" data-length="5" data-background="text" ></group> </group>
          */}
        </group>
      </group>

      <group data-position="bottom">
        <group data-space-horizontal="30" data-background="adaptive-gray">
          <separator data-horizontal=""></separator>
          <group data-space-vertical="30" data-gap="5" data-width="auto">
            <text>{width}</text> <text>×</text> <text>{height}</text>
          </group>
        </group>
      </group>
    </group>
  );
};

export default SimplePaint;
