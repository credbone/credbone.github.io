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
import { getStroke } from "perfect-freehand";

/** Turn a perfect-freehand outline into a smooth closed SVG path. */
const getSvgPathFromStroke = (points: number[][]) => {
  const len = points.length;
  if (len < 4) return "";
  const avg = (a: number, b: number) => (a + b) / 2;
  let a = points[0];
  let b = points[1];
  const c = points[2];
  let d = `M${a[0]},${a[1]} Q${b[0]},${b[1]} ${avg(b[0], c[0])},${avg(b[1], c[1])} T`;
  for (let i = 2; i < len - 1; i++) {
    a = points[i];
    b = points[i + 1];
    d += `${avg(a[0], b[0])},${avg(a[1], b[1])} `;
  }
  return d + "Z";
};

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
  // Live-stroke layer for marker and ink, committed to canvasRef on release
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
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

  const [isBrushOpen, setIsBrushOpen] = useState(false);
  const [isColorsOpen, setIsColorsOpen] = useState(false);

  // ─── HiDPI ────────────────────────────────────────────────────────────────
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  const setupCanvas = (
    canvas: HTMLCanvasElement,
    logicalW: number,
    logicalH: number,
    restoreFrom?: HTMLCanvasElement | null,
    offsetX = 0,
    offsetY = 0,
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
        offsetX,
        offsetY,
        restoreFrom.width / dpr,
        restoreFrom.height / dpr,
      );
    }
  };

  // ─── Resize ───────────────────────────────────────────────────────────────
  // Which edges the active handle moves: x/y = -1 (left/top), 1 (right/bottom)
  const resizeRef = useRef<{
    dirX: number;
    dirY: number;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    factorX: number;
    factorY: number;
  } | null>(null);

  const startResize = (
    e: React.PointerEvent,
    dirX: number,
    dirY: number,
  ) => {
    e.preventDefault();
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (container && wrapper) {
      // The canvas is centered with margin:auto, so it grows from both sides.
      // Detect that per axis so the dragged edge tracks the pointer exactly.
      const r = container.getBoundingClientRect();
      const w = wrapper.getBoundingClientRect();
      const centeredX = Math.abs(r.left - w.left - (w.right - r.right)) < 2;
      const centeredY = Math.abs(r.top - w.top - (w.bottom - r.bottom)) < 2;
      resizeRef.current = {
        dirX,
        dirY,
        startX: e.clientX,
        startY: e.clientY,
        startW: width,
        startH: height,
        factorX: centeredX ? 2 : 1,
        factorY: centeredY ? 2 : 1,
      };
    }
    if (canvasRef.current && tempCanvasRef.current) {
      tempCanvasRef.current.width = canvasRef.current.width;
      tempCanvasRef.current.height = canvasRef.current.height;
      const tempCtx = tempCanvasRef.current.getContext("2d");
      if (tempCtx) tempCtx.drawImage(canvasRef.current, 0, 0);
    }
    setIsResizing(true);
    setIsBrushOpen(false);
    setIsColorsOpen(false);
  };

  const stopResize = () => setIsResizing(false);

  const handleResize = useCallback(
    (e: PointerEvent | TouchEvent) => {
      const r = resizeRef.current;
      if (!isResizing || !r) return;
      if ("touches" in e) e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = (clientX - r.startX) * r.dirX * r.factorX;
      const dy = (clientY - r.startY) * r.dirY * r.factorY;
      setWidth(Math.max(40, Math.round(r.startW + dx)));
      setHeight(Math.max(40, Math.round(r.startH + dy)));
    },
    [isResizing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // When dragging a left/top handle, keep the drawing pinned to the
    // opposite edge instead of the top-left corner.
    const r = resizeRef.current;
    const offsetX = r && r.dirX < 0 ? width - r.startW : 0;
    const offsetY = r && r.dirY < 0 ? height - r.startH : 0;
    setupCanvas(canvas, width, height, tempCanvasRef.current, offsetX, offsetY);
    if (overlayRef.current) setupCanvas(overlayRef.current, width, height);
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

  // ─── ────
  useEffect(() => {
    if (appRef.current) setWidth(appRef.current.offsetWidth - 60);
  }, []);
  useEffect(() => {
    if (wrapperRef.current) setHeight(wrapperRef.current.offsetHeight);
  }, []);

  // ─── Drawing ──────────────────────────────────────────────────────────────
  type Sample = { x: number; y: number; t: number; p: number };

  /** All samples for this move, including coalesced high-rate ones. */
  const getSamples = (e: React.PointerEvent): Sample[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    const rect = canvas.getBoundingClientRect();
    const native = e.nativeEvent;
    const coalesced = native.getCoalescedEvents?.() ?? [];
    const events = coalesced.length ? coalesced : [native];
    return events.map((ev) => ({
      x: ev.clientX - rect.left,
      y: ev.clientY - rect.top,
      t: ev.timeStamp,
      p: ev.pressure,
    }));
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

  const getOverlayContext = () => overlayRef.current?.getContext("2d") ?? null;

  const clearOverlay = () => {
    const overlay = overlayRef.current;
    const octx = getOverlayContext();
    if (!overlay || !octx) return;
    octx.clearRect(0, 0, overlay.width / dpr, overlay.height / dpr);
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
  // The live stroke is drawn opaque onto the overlay canvas, which shows it
  // at MARKER_OPACITY via CSS. Overlaps within one stroke never darken; on
  // release it is multiplied onto the main canvas once, so separate strokes
  // layer like a real highlighter. Each move only draws the newest segment
  // (quadratic through midpoints), so cost doesn't grow with stroke length.
  const MARKER_OPACITY = 0.4;

  const drawMarkerSegment = (pts: { x: number; y: number }[]) => {
    const octx = getOverlayContext();
    if (!octx) return;
    octx.strokeStyle = brushColor;
    octx.fillStyle = brushColor;
    octx.lineWidth = brushSize;
    octx.lineCap = "round";
    octx.lineJoin = "round";

    const n = pts.length;
    if (n === 1) {
      octx.beginPath();
      octx.arc(pts[0].x, pts[0].y, brushSize / 2, 0, Math.PI * 2);
      octx.fill();
      return;
    }
    const a = pts[n - 2];
    const b = pts[n - 1];
    const midAB = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    octx.beginPath();
    if (n === 2) {
      octx.moveTo(a.x, a.y);
      octx.lineTo(midAB.x, midAB.y);
    } else {
      const z = pts[n - 3];
      octx.moveTo((z.x + a.x) / 2, (z.y + a.y) / 2);
      octx.quadraticCurveTo(a.x, a.y, midAB.x, midAB.y);
    }
    octx.stroke();
  };

  /** Close the gap between the last midpoint and the final point. */
  const finishMarkerStroke = (pts: { x: number; y: number }[]) => {
    const octx = getOverlayContext();
    if (!octx || pts.length < 2) return;
    const a = pts[pts.length - 2];
    const b = pts[pts.length - 1];
    octx.beginPath();
    octx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
    octx.lineTo(b.x, b.y);
    octx.stroke();
  };

  const commitOverlay = (alpha: number, op: GlobalCompositeOperation) => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const ctx = getContext();
    if (!canvas || !overlay || !ctx) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = op;
    ctx.drawImage(overlay, 0, 0, canvas.width / dpr, canvas.height / dpr);
    ctx.restore();
    clearOverlay();
  };

  // ── Ink ───────────────────────────────────────────────────────────────
  // Outline-based variable-width stroke (perfect-freehand): the input is
  // streamlined, each point gets a radius from pressure, and the left/right
  // offsets form one polygon that is filled in a single pass — smooth edges,
  // tapered ends, no beads at width changes.
  //
  // Pens report real pressure. Mouse/touch get pressure simulated from
  // speed in px/ms (not px/event), so it feels the same at any input rate.
  const INK_THINNING = 0.7; // how much pressure affects width
  const INK_FAST_SPEED = 1.6; // px/ms at which simulated pressure bottoms out
  const INK_PRESSURE_EMA = 0.2; // pressure reaction speed (higher = more responsive)
  const INK_REST_PRESSURE = 0.6; // pressure at the very start of a stroke

  const inkPointsRef = useRef<number[][]>([]);
  const inkLastRef = useRef<{ x: number; y: number; t: number; p: number } | null>(null);
  const isPenRef = useRef(false);

  const addInkSample = (s: Sample) => {
    const last = inkLastRef.current;
    let p: number;
    if (isPenRef.current) {
      p = s.p;
    } else if (!last) {
      p = INK_REST_PRESSURE;
    } else {
      const dist = Math.hypot(s.x - last.x, s.y - last.y);
      if (dist < 0.5) return;
      const dt = Math.max(s.t - last.t, 1);
      const speed = Math.min(dist / dt / INK_FAST_SPEED, 1);
      const target = 1 - speed;
      p = last.p + (target - last.p) * INK_PRESSURE_EMA;
    }
    inkLastRef.current = { x: s.x, y: s.y, t: s.t, p };
    inkPointsRef.current.push([s.x, s.y, p]);
  };

  const drawInkStroke = (last: boolean) => {
    const octx = getOverlayContext();
    if (!octx) return;
    const outline = getStroke(inkPointsRef.current, {
      size: brushSize,
      thinning: INK_THINNING,
      smoothing: 0.6,
      streamline: 0.45,
      simulatePressure: false,
      start: { taper: brushSize * 2, cap: true },
      end: { taper: brushSize * 2, cap: true },
      last,
    });
    clearOverlay();
    if (!outline.length) return;
    octx.fillStyle = brushColor;
    octx.fill(new Path2D(getSvgPathFromStroke(outline)));
  };

  // ── Unified start/draw/stop ────────────────────────────────────────────
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const [pt] = getSamples(e);
    const ctx = getContext();
    if (!ctx || !pt) return;
    e.currentTarget.setPointerCapture(e.pointerId);

    pointsRef.current = [pt];

    if (brushType === "brush") {
      ctx.fillStyle = brushColor;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (brushType === "marker") {
      clearOverlay();
      drawMarkerSegment(pointsRef.current);
    } else {
      isPenRef.current = e.pointerType === "pen";
      inkPointsRef.current = [];
      inkLastRef.current = null;
      addInkSample(pt);
      drawInkStroke(false);
    }

    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = getContext();
    if (!ctx) return;
    const samples = getSamples(e);

    if (brushType === "brush" || brushType === "marker") {
      const pts = pointsRef.current;
      for (const pt of samples) {
        const last = pts[pts.length - 1];
        const dx = pt.x - last.x;
        const dy = pt.y - last.y;
        if (dx * dx + dy * dy < 1) continue;
        pts.push(pt);
        if (brushType === "brush") {
          drawSmoothCurve(ctx, pts.slice(Math.max(pts.length - 4, 0)));
        } else {
          drawMarkerSegment(pts);
        }
      }
    } else {
      samples.forEach(addInkSample);
      drawInkStroke(false);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    if (brushType === "brush") {
      const ctx = getContext();
      if (ctx) drawSmoothCurve(ctx, pointsRef.current);
    } else if (brushType === "marker") {
      finishMarkerStroke(pointsRef.current);
      commitOverlay(MARKER_OPACITY, "multiply");
    } else {
      drawInkStroke(true);
      commitOverlay(1, "source-over");
      inkPointsRef.current = [];
      inkLastRef.current = null;
    }

    pointsRef.current = [];
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
        data-width="auto"
        data-wrap="no"
        data-gap="30"
        data-direction="column"
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
              data-over-color="neutral"
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
            content={
              <group
                data-direction="column"
                data-length="300"
                data-space="15"
                

                // onClick={closePopover}
              >
                {/* <group data-ratio="1:1"  data-align="center" data-justify="center" data-direction="column">

              </group> */}
                <group data-gap="15" data-wrap="no">
                  <CustomSlider
                    edgeGap={30}
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
<group  data-width="auto">
  <Ripple>
                <group
              data-cursor="pointer"
              data-radius="30"
                           data-ink-color="neutral"
              data-over-color="neutral"
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

              <group
                data-length="20"
                data-align="center"
                data-direction="column"
              >
                <text data-weight="700">{brushSize}</text>
              </group>
            </group>
  </Ripple>
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
             //   data-backdrop="20-adaptive"
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
<group  data-width="auto">
  <Ripple>
                  <group
                              data-ink-color="neutral"
              data-over-color="neutral"
                data-cursor="pointer"
                data-radius="30"
               
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
  </Ripple>
</group>
            </Popover>
          </group>
        </group>

        <group
          data-width="auto"
          ref={wrapperRef}
          data-align="start"
          data-direction="column"
          data-wrap="no"
          data-height="fit"
        //  data-background="red"
        >
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
              onPointerDown={(e) => {
                setIsBrushOpen(false);
                setIsColorsOpen(false);
                startDrawing(e);
              }}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              style={{ cursor: buildCursorSvg(), touchAction: "none" }}
            />
            <canvas
              data-radius="20"
              ref={overlayRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                opacity: brushType === "marker" ? MARKER_OPACITY : 1,
                mixBlendMode: brushType === "marker" ? "multiply" : "normal",
              }}
            />

            {/* <group data-hidden={isBrushOpen? "true":""} data-hide="over" data-position="absolute" data-pointer-event="none"  data-direction="column" data-align="center" data-justify="center" data-height="fit" data-top="0" > 
<svg width="100" height="100" data-animation-name="zoom-in" data-animation-duration="2" >
  <circle cx="50" cy="50" r={brushSize / 2}  fill="#000" />
</svg>
</group> */}

            {[
              { dirX: 1, dirY: 1 },
              { dirX: -1, dirY: 1 },
              { dirX: 1, dirY: -1 },
              { dirX: -1, dirY: -1 },
            ].map(({ dirX, dirY }) => (
              <group
                key={`${dirX}${dirY}`}
                data-position="absolute"
                data-height="20"
                data-length="20"
                {...(dirY > 0 ? { "data-bottom": "-20" } : { "data-top": "-20" })}
                {...(dirX > 0 ? { "data-right": "-20" } : { "data-left": "-20" })}
                // Place the dot at the corner closest to the canvas
                data-align={dirY < 0 ? "end" : undefined}
                data-justify={dirX < 0 ? "end" : undefined}
                style={{
                  cursor: dirX === dirY ? "nwse-resize" : "nesw-resize",
                  touchAction: "none",
                }}
                onPointerDown={(e: React.PointerEvent) => startResize(e, dirX, dirY)}
              >
                <group
                  data-height="5"
                  data-length="5"
                  data-background="text"
                ></group>
              </group>
            ))}
          </group>
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
