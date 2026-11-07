import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import Tooltip from "../components/tooltip";
import Popover from "../components/popover";
import { isMobile } from "react-device-detect";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import Scroll from "../components/scroll";
import Ripple from "../components/Ripple";
import CustomSlider from "../components/inputs/slider";
import {
  Brush,
  Feather,
  Highlighter,
  Pencil,
  PenIcon,
  PenTool,
  X,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { getStroke, getStrokePoints } from "perfect-freehand";
import { IconAdd, IconBrush, IconMarker } from "../components/icon/credIcons";

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

/** Lighten (amount > 0) or darken (amount < 0) a #rrggbb color by 0..1. */
const shadeHex = (hex: string, amount: number) => {
  const n = parseInt(hex.slice(1, 7), 16);
  return (
    "#" +
    [n >> 16, (n >> 8) & 255, n & 255]
      .map((c) =>
        Math.round(amount > 0 ? c + (255 - c) * amount : c * (1 + amount)),
      )
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
  );
};

type BrushType ="brush" | "marker" | "calligraphy" | "oil";

const brushTypeLabels: { type: BrushType; label: string; icon: ReactNode }[] = [
  { type: "brush", icon: <Pencil size={20} />, label: "Brush" },
  { type: "marker", icon: <IconMarker size={20} />, label: "Marker" },
  { type: "calligraphy", icon: <Feather size={20} />, label: "Ink" },
  { type: "oil", icon: <IconBrush size={20} />, label: "Oil" },
];

interface SimplePaintProps {
  /** Shows an Exit button in the top bar, e.g. to close the hosting modal. */
  onExit?: () => void;
}

const SimplePaint: React.FC<SimplePaintProps> = ({ onExit }) => {
  const { addSnackbar } = useSnackbar();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Live-stroke layer for all tools, committed to canvasRef on release
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(
    document.createElement("canvas"),
  );

  const [isDrawing, setIsDrawing] = useState(false);
  // Default = custom swatch, seeded as a darker take on the first preset
  const [brushColor, setBrushColor] = useState(() =>
    shadeHex(colors[0].value, -0.3),
  );
  const [brushSize, setBrushSize] = useState(16);
  const [brushType, setBrushType] = useState<BrushType>("calligraphy");

  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const [isBrushOpen, setIsBrushOpen] = useState(false);
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  // Custom swatch (first in the palette); resets on reload
  const [customColor, setCustomColor] = useState(brushColor);
  // Explicit flag: custom can equal a preset, so selection isn't color-derived
  const [isCustomSelected, setIsCustomSelected] = useState(true);
  const selectCustom = () => {
    setBrushColor(customColor);
    setIsCustomSelected(true);
  };
  // Narrow layouts: Color popover shows the picker; swatches nest over it
  const [isSwatchesOpen, setIsSwatchesOpen] = useState(false);
  // Mobile tool | size picker
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  // Desktop custom-swatch picker
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);

  const closePickers = () => {
    setIsCustomPickerOpen(false);
    setIsBrushOpen(false);
    setIsColorsOpen(false);
    setIsSwatchesOpen(false);
    setIsToolsOpen(false);
    setIsSizeOpen(false);
  };

  // ─── Color swatches ───────────────────────────────────────────────────────
  const renderSwatch = (opts: {
    key?: React.Key;
    index: number;
    name: string;
    value: string;
    selected: boolean;
    onClick?: () => void;
  }) => (
    <group key={opts.key} data-height="40" data-length="40">
      <Tooltip content={opts.name} delay={300}>
        <group
          data-animation-name="appear-left"
          data-over-color="neutral"
          data-fill-mode="backwards"
          data-animation-duration={2 + opts.index * 0.25}
          data-radius="30"
          data-align="center"
          data-justify="center"
          data-direction="column"
          data-cursor="pointer"
          data-interactive=""
          data-transition-prop="padding"
          data-duration=".125"
          data-background={opts.selected ? "context" : ""}
          data-index={opts.selected ? "1" : ""}
          data-space={opts.selected ? "15" : "10"}
          onClick={opts.onClick}
        >
          <group
            data-border="outline-soft"
            data-interact=""
            data-radius="30"
            data-height="fit"
            style={{ backgroundColor: opts.value }}
          ></group>
        </group>
      </Tooltip>
    </group>
  );

  const customColorPicker = (
    <group
      data-animation-name="appear-bottom"
      data-fill-mode="backwards"
      data-animation-duration="2.25"
      data-elevation="2"
      data-background="context"
      data-space="5"
      data-radius="20"
      data-direction="column"
      data-name="cred-react-colorful"
      data-width="auto"
      data-gap="5"
      data-index="2"
      // Close the nested swatches as soon as a picker drag starts; popovers
      // otherwise wait for a click, which a touch drag never fires
      onPointerDown={() => setIsSwatchesOpen(false)}
    >
      <HexColorPicker
        color={customColor}
        onChange={(c) => {
          setCustomColor(c);
          setBrushColor(c);
          setIsCustomSelected(true);
        }}
      />
    </group>
  );

  const customSwatchProps = {
    index: 0,
    name: "Custom color",
    value: customColor,
    selected: isCustomSelected,
  };

  const presetSwatches = colors.map((color, index) =>
    renderSwatch({
      key: color.value,
      index: index + 1,
      name: color.name,
      value: color.value,
      selected: !isCustomSelected && brushColor === color.value,
      onClick: () => {
        setBrushColor(color.value);
        setIsCustomSelected(false);
      },
    }),
  );

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
    maxW: number;
    maxH: number;
  } | null>(null);

  // The wrapper is the size limit, but it grows with the canvas up to its
  // own limits (the max-height / max-width fit chain), so its current size
  // is just the canvas size. To find how far it can grow, oversize the
  // canvas box to the viewport for one synchronous layout, read the
  // wrapper, and restore. Nothing paints in between, so there's no flicker.
  // Forces layout: call it once per gesture, not per move.
  const getBounds = () => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return { w: Infinity, h: Infinity };
    const { width: prevW, height: prevH } = container.style;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
    const bounds = { w: wrapper.clientWidth, h: wrapper.clientHeight };
    container.style.width = prevW;
    container.style.height = prevH;
    return bounds;
  };

  // Initial / New size: a fixed default on desktop (the modal is windowed
  // there), the whole wrapper on mobile (fullscreen). Never past the limit.
  const DESKTOP_CANVAS = { w: 1200, h: 400 };

  const fitToBounds = () => {
    const { w, h } = getBounds();
    if (w === Infinity) return;
    setWidth(Math.max(40, isMobile ? w : Math.min(DESKTOP_CANVAS.w, w)));
    setHeight(Math.max(40, isMobile ? h : Math.min(DESKTOP_CANVAS.h, h)));
  };

  /** Copy the drawing so the size effect can restore it after a resize. */
  const snapshotCanvas = () => {
    if (canvasRef.current && tempCanvasRef.current) {
      tempCanvasRef.current.width = canvasRef.current.width;
      tempCanvasRef.current.height = canvasRef.current.height;
      const tempCtx = tempCanvasRef.current.getContext("2d");
      if (tempCtx) tempCtx.drawImage(canvasRef.current, 0, 0);
    }
  };

  const startResize = (e: React.PointerEvent, dirX: number, dirY: number) => {
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
      const bounds = getBounds();
      resizeRef.current = {
        maxW: bounds.w,
        maxH: bounds.h,
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
    snapshotCanvas();
    setIsResizing(true);
    closePickers();
  };

  const stopResize = () => {
    // Later size changes (shrink to fit, New) keep the drawing top-left
    resizeRef.current = null;
    setIsResizing(false);
  };

  const handleResize = useCallback(
    (e: PointerEvent | TouchEvent) => {
      const r = resizeRef.current;
      if (!isResizing || !r) return;
      if ("touches" in e) e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = (clientX - r.startX) * r.dirX * r.factorX;
      const dy = (clientY - r.startY) * r.dirY * r.factorY;
      setWidth(Math.min(Math.max(40, Math.round(r.startW + dx)), r.maxW));
      setHeight(Math.min(Math.max(40, Math.round(r.startH + dy)), r.maxH));
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
  // Start by filling the wrapper
  useEffect(() => {
    fitToBounds();
  }, []);

  // When the wrapper's limits shrink below the canvas (window resize,
  // rotation), shrink the canvas with them, keeping the top-left of the
  // drawing. A wrapper that's still below its limits only changes size when
  // the canvas does, and then the canvas fits by definition.
  const sizeRef = useRef({ width, height });
  sizeRef.current = { width, height };
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => {
      // A drag already clamps itself; skip the probe on every step
      if (resizeRef.current) return;
      const { w, h } = getBounds();
      const { width: cw, height: ch } = sizeRef.current;
      if (cw <= w && ch <= h) return;
      resizeRef.current = null;
      snapshotCanvas();
      setWidth(Math.max(40, Math.min(cw, w)));
      setHeight(Math.max(40, Math.min(ch, h)));
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
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

  // ── Stroke pipeline ───────────────────────────────────────────────────
  // All tools collect samples the same way and draw the live stroke on the
  // overlay, which is committed once on release. Brush, Marker and Ink
  // redraw the whole stroke each move as one filled shape (no seams where
  // segments meet); Oil only adds its new segments. The input is
  // streamlined, so jitter is smoothed out.
  //
  // Pens report real pressure. Mouse/touch get pressure simulated from
  // speed in px/ms (not px/event), so it feels the same at any input rate.
  // Only Ink uses pressure; the other tools keep a constant width.
  const STROKE_STREAMLINE = 0.45;
  const INK_THINNING = 0.7; // how much pressure affects width
  const INK_FAST_SPEED = 1.6; // px/ms at which simulated pressure bottoms out
  const INK_PRESSURE_EMA = 0.2; // pressure reaction speed (higher = more responsive)
  const INK_REST_PRESSURE = 0.6; // pressure at the very start of a stroke

  const strokePointsRef = useRef<number[][]>([]);
  const strokeLastRef = useRef<{
    x: number;
    y: number;
    t: number;
    p: number;
  } | null>(null);
  const isPenRef = useRef(false);

  const addSample = (s: Sample) => {
    const last = strokeLastRef.current;
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
    strokeLastRef.current = { x: s.x, y: s.y, t: s.t, p };
    strokePointsRef.current.push([s.x, s.y, p]);
  };

  const fillOverlay = (path: Path2D | string) => {
    const octx = getOverlayContext();
    if (!octx) return;
    clearOverlay();
    if (!path) return;
    octx.fillStyle = brushColor;
    octx.fill(typeof path === "string" ? new Path2D(path) : path);
  };

  // ── Brush / Ink ───────────────────────────────────────────────────────
  // Outline-based stroke (perfect-freehand): each point gets a radius, and
  // the left/right offsets form one polygon. Brush uses no thinning (even
  // width, round caps); Ink thins with pressure and tapers both ends.
  const drawOutlineStroke = (last: boolean) => {
    const ink = brushType === "calligraphy";
    const outline = getStroke(strokePointsRef.current, {
      size: brushSize,
      thinning: ink ? INK_THINNING : 0,
      smoothing: 0.6,
      streamline: STROKE_STREAMLINE,
      simulatePressure: false,
      start: { taper: ink ? brushSize * 2 : 0, cap: true },
      end: { taper: ink ? brushSize * 2 : 0, cap: true },
      last,
    });
    fillOverlay(getSvgPathFromStroke(outline));
  };

  // ── Marker ────────────────────────────────────────────────────────────
  // A chisel nib: a rectangle (brushSize long, MARKER_NIB_THICKNESS thick)
  // held at MARKER_NIB_ANGLE. The stroke is the nib swept along the
  // streamlined path: for each pair of points, the convex hull of the two
  // nib rectangles. Every hull is wound the same way, so nonzero fill
  // unions them into one seamless shape. Width depends on direction, like
  // a real highlighter, and the ends come out flat and angled.
  //
  // The overlay shows the stroke at MARKER_OPACITY via CSS, so overlaps
  // within one stroke never darken; on release it is multiplied onto the
  // main canvas once, so separate strokes layer like a real highlighter.
  const MARKER_OPACITY = 0.55;
  const MARKER_NIB_ANGLE = (-40 * Math.PI) / 180;
  const MARKER_NIB_THICKNESS = 0.3; // fraction of brushSize

  /** Andrew's monotone chain; returns the hull counterclockwise. */
  const convexHull = (pts: number[][]) => {
    const sorted = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o: number[], a: number[], b: number[]) =>
      (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const half = (list: number[][]) => {
      const out: number[][] = [];
      for (const p of list) {
        while (
          out.length >= 2 &&
          cross(out[out.length - 2], out[out.length - 1], p) <= 0
        )
          out.pop();
        out.push(p);
      }
      out.pop();
      return out;
    };
    return [...half(sorted), ...half(sorted.reverse())];
  };

  const drawMarkerStroke = (last: boolean) => {
    const pts = getStrokePoints(strokePointsRef.current, {
      size: brushSize,
      streamline: STROKE_STREAMLINE,
      last,
    }).map((s) => s.point);
    if (!pts.length) return fillOverlay("");

    const ux = (Math.cos(MARKER_NIB_ANGLE) * brushSize) / 2;
    const uy = (Math.sin(MARKER_NIB_ANGLE) * brushSize) / 2;
    const thickness = Math.max(brushSize * MARKER_NIB_THICKNESS, 2) / 2;
    const vx = -Math.sin(MARKER_NIB_ANGLE) * thickness;
    const vy = Math.cos(MARKER_NIB_ANGLE) * thickness;
    const nib = ([x, y]: number[]) => [
      [x + ux + vx, y + uy + vy],
      [x + ux - vx, y + uy - vy],
      [x - ux - vx, y - uy - vy],
      [x - ux + vx, y - uy + vy],
    ];

    const path = new Path2D();
    const addPolygon = (poly: number[][]) => {
      path.moveTo(poly[0][0], poly[0][1]);
      for (let i = 1; i < poly.length; i++) path.lineTo(poly[i][0], poly[i][1]);
      path.closePath();
    };
    if (pts.length === 1) addPolygon(convexHull(nib(pts[0])));
    for (let i = 1; i < pts.length; i++) {
      addPolygon(convexHull([...nib(pts[i - 1]), ...nib(pts[i])]));
    }
    fillOverlay(path);
  };

  // ── Oil ───────────────────────────────────────────────────────────────
  // A row of bristles spread across brushSize, each with its own width and
  // a slightly lighter or darker shade, fixed for the whole stroke so the
  // streaks stay continuous. The row is held perpendicular to the drawing
  // direction and eases into new directions, so curves fan out. The row
  // has no front or back, so angles are compared mod π: doubling back
  // doesn't spin the brush around.
  //
  // Bristles are opaque, so only new segments are drawn each move. The
  // streamline is causal (each point depends only on earlier ones), which
  // keeps already-drawn segments valid.
  const OIL_COLOR_VARIATION = 0.08; // max lighten/darken per bristle
  const OIL_TURN_EASE = 0.35; // how fast the row follows direction changes
  const OIL_STREAMLINE_T = 0.15 + (1 - STROKE_STREAMLINE) * 0.85;

  type Bristle = { offset: number; width: number; color: string };
  const oilRef = useRef<{
    bristles: Bristle[];
    next: number; // index of the next raw point to process
    point: number[]; // last streamlined point
    angle: number | null; // row angle; null until the first movement
  } | null>(null);

  const makeBristles = (): Bristle[] => {
    const count = Math.min(Math.max(Math.round(brushSize / 3), 3), 32);
    const gap = brushSize / count;
    return Array.from({ length: count }, (_, i) => ({
      offset:
        -brushSize / 2 + gap * (i + 0.5) + (Math.random() - 0.5) * gap * 0.5,
      width: Math.max(gap * (1 + Math.random() * 0.8), 1),
      color: shadeHex(
        brushColor,
        (Math.random() * 2 - 1) * OIL_COLOR_VARIATION,
      ),
    }));
  };

  const drawOilStroke = (last: boolean) => {
    const octx = getOverlayContext();
    const raw = strokePointsRef.current;
    if (!octx || !raw.length) return;
    if (!oilRef.current) {
      clearOverlay();
      oilRef.current = {
        bristles: makeBristles(),
        next: 1,
        point: raw[0],
        angle: null,
      };
    }
    const oil = oilRef.current;

    // Each segment: [x0, y0, angle0, x1, y1, angle1]
    const segments: number[][] = [];
    const step = (target: number[]) => {
      const [px, py] = oil.point;
      const dx = target[0] - px;
      const dy = target[1] - py;
      if (dx * dx + dy * dy < 0.25) return;
      const axis = Math.atan2(dy, dx) + Math.PI / 2;
      const prev = oil.angle ?? axis;
      // Shortest turn mod π, in [-π/2, π/2)
      const diff =
        ((((axis - prev + Math.PI / 2) % Math.PI) + Math.PI) % Math.PI) -
        Math.PI / 2;
      const angle = oil.angle === null ? axis : prev + diff * OIL_TURN_EASE;
      segments.push([px, py, prev, target[0], target[1], angle]);
      oil.point = [target[0], target[1]];
      oil.angle = angle;
    };
    for (; oil.next < raw.length; oil.next++) {
      const q = raw[oil.next];
      const [px, py] = oil.point;
      step([
        px + (q[0] - px) * OIL_STREAMLINE_T,
        py + (q[1] - py) * OIL_STREAMLINE_T,
      ]);
    }
    // Close the streamline lag so the stroke ends under the pointer
    if (last) step(raw[raw.length - 1]);

    if (!segments.length) {
      // A tap: dab the bristles in a horizontal row
      if (!last || oil.angle !== null) return;
      const [x, y] = oil.point;
      for (const b of oil.bristles) {
        octx.fillStyle = b.color;
        octx.beginPath();
        octx.arc(x + b.offset, y, b.width / 2, 0, Math.PI * 2);
        octx.fill();
      }
      return;
    }

    octx.lineCap = "round";
    octx.lineJoin = "round";
    for (const b of oil.bristles) {
      octx.strokeStyle = b.color;
      octx.lineWidth = b.width;
      octx.beginPath();
      const [x0, y0, a0] = segments[0];
      octx.moveTo(x0 + Math.cos(a0) * b.offset, y0 + Math.sin(a0) * b.offset);
      for (const [, , , x1, y1, a1] of segments) {
        octx.lineTo(x1 + Math.cos(a1) * b.offset, y1 + Math.sin(a1) * b.offset);
      }
      octx.stroke();
    }
  };

  const drawStroke = (last: boolean) => {
    if (brushType === "marker") drawMarkerStroke(last);
    else if (brushType === "oil") drawOilStroke(last);
    else drawOutlineStroke(last);
  };

  // ── Unified start/draw/stop ────────────────────────────────────────────
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const [pt] = getSamples(e);
    if (!pt) return;
    e.currentTarget.setPointerCapture(e.pointerId);

    isPenRef.current = e.pointerType === "pen";
    strokePointsRef.current = [];
    strokeLastRef.current = null;
    oilRef.current = null;
    addSample(pt);
    drawStroke(false);

    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    getSamples(e).forEach(addSample);
    drawStroke(false);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    drawStroke(true);
    if (brushType === "marker") commitOverlay(MARKER_OPACITY, "multiply");
    else commitOverlay(1, "source-over");
    strokePointsRef.current = [];
    strokeLastRef.current = null;

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
    // New also resets the size (see fitToBounds)
    resizeRef.current = null;
    fitToBounds();
    addSnackbar(<text>Canvas cleared</text>, 1500, "paint-clear", true);
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

  // Shared by the desktop toolbar and the mobile tool | size picker
  const renderToolButtons = (onPick?: () => void) =>
    brushTypeLabels.map(({ type, label, icon }) => (
      <Tooltip key={type} content={label} delay={300}>
        <group data-width="auto">
          <Ripple>
            <group
              data-ink-color="neutral"
              data-over-color="neutral"
              onClick={() => {
                setBrushType(type);
                onPick?.();
              }}
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
              {icon}
            </group>
          </Ripple>
        </group>
      </Tooltip>
    ));

  const sizeSlider = (
    <group data-direction="column" data-length="300" data-space="15">
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
      </group>
    </group>
  );

  return (
    <group
      data-direction="column"
      data-wrap="no"
      data-max-height="fit"
      data-height="fit"
      data-contain=""
      data-background="adaptive-gray"
      data-space="25"
      data-gap="25"
    >
      <group
       
       data-order={isMobile ? "2" : undefined}

         data-wrap="no"
        // data-sticky=""
        // data-bottom="0"
        data-left="0"
        // data-space="30"
        //  data-space-bottom="0"
        data-align="center"
        data-gap="10"
        // data-background="adaptive-gray"
        //  data-wrap="no"
      >
        {/* TODO: confirm (or offer undo) before clearing a drawing */}
        <Ripple>
          <group
            //    data-backdrop="20-contrast"
            data-ink-color="neutral"
            data-over-color="neutral"
            onClick={clearCanvas}
            data-cursor="pointer"
            data-radius="30"
            data-width="auto"
            data-contain=""
            data-interactive=""
            data-height="50"
            data-wrap="no"
            data-align="center"
            data-gap="15"
            data-background="adaptive-gray"
            //   data-adaptive="desktop"
          >
            <group data-width="auto" data-wrap="no">
              <group data-adaptive="desktop" data-space-horizontal="25">
                <text data-weight="700" data-length="autofit">
                  New
                </text>
              </group>
              <group data-adaptive="mobile" data-space="15" data-interact="">
                <IconAdd size={20} />
              </group>
            </group>
          </group>
        </Ripple>

        {/* ── Brush type selector ── */}
        <group
          data-shrink="no"
          data-adaptive="desktop"
          data-background="adaptive-gray"
          data-radius="30"
          data-space="5"
          data-wrap="no"
          data-width="auto"
          data-contain=""
          //    data-backdrop="20-contrast"
        >
          {renderToolButtons()}
        </group>

        {/* ── Brush size ── */}
        <group data-adaptive="desktop" data-width="auto">
          <Popover
            open={isBrushOpen}
            onOpenChange={setIsBrushOpen}
            data-space="0"
            data-radius="30"
            content={sizeSlider}
          >
            <group data-width="auto">
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
                  //   data-backdrop="20-contrast"
                >
                  <text data-opacity="50">Brush</text>
                  <separator data-vertical="" data-height="20"></separator>

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
        </group>

        {/* ── Color picker ── */}
        <group
          data-contain=""
          data-gap="10"
          //    data-shrink="no"
          data-width="auto"
          data-background="adaptive-gray"
          data-radius="30"
          data-adaptive="desktop-1200"
          //       data-backdrop="20-contrast"

          data-clip="toolbar-pill"
        >
          <group data-wrap="no" data-space="5" data-align="center">
            {/* Popover overrides its child's onClick, so select via onOpenChange */}
            <Popover
              data-space="0"
              data-radius="0"
              data-background="none"
              data-contain="visible"
              data-elevation="none"
              content={customColorPicker}
              open={isCustomPickerOpen}
              onOpenChange={(isOpen) => {
                setIsCustomPickerOpen(isOpen);
                if (isOpen) selectCustom();
              }}
            >
              {renderSwatch(customSwatchProps)}
            </Popover>
<group data-length="20"></group>
            {presetSwatches}
          </group>
        </group>

        {/* ── Tool | size picker mobile ── */}
        <group
          data-adaptive="mobile"
          data-width="auto"
          data-background="adaptive-gray"
          data-radius="30"
          data-contain=""
          data-wrap="no"
          data-align="center"
          //      data-backdrop="20-contrast"
          //  data-space="5"

       //   data-clip="toolbar-pill"
        >
          <Popover
            open={isToolsOpen}
            onOpenChange={setIsToolsOpen}
            data-space="0"
            data-radius="30"
            content={
              <group data-space="10" data-wrap="no" data-width="auto">
                {renderToolButtons(() => setIsToolsOpen(false))}
              </group>
            }
          >
            <group data-width="auto">
              <Ripple>
                <group
                  data-ink-color="neutral"
                  data-over-color="neutral"
                  data-cursor="pointer"
                  data-contain=""
                  data-interactive=""
                  //data-height="40"
                  data-space="15"
                  //  data-space-horizontal="20"
                  data-radius="30"
                  data-wrap="no"
                  data-align="center"
                >
                  {brushTypeLabels.find((t) => t.type === brushType)?.icon}
                </group>
              </Ripple>
            </group>
          </Popover>

          {/* <group data-length="10"></group> */}

          <separator data-vertical="" data-height="20"></separator>

          <Popover
            open={isSizeOpen}
            onOpenChange={setIsSizeOpen}
            data-space="0"
            data-radius="30"
            content={sizeSlider}
          >
            <group data-width="auto">
              <Ripple>
                <group
                  data-ink-color="neutral"
                  data-over-color="neutral"
                  data-cursor="pointer"
                  data-contain=""
                  data-interactive=""
                  data-height="50"
                  data-space="15"
                  //  data-space-horizontal="20"
                  data-radius="30"
                  data-wrap="no"
                  data-align="center"
                >
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
        </group>

        <group
          data-width="auto"
          data-radius="30"
          data-background="adaptive-gray"
          data-adaptive="mobile-1200"
        >
          {/* Picker first; "Swatches" opens a nested popover over it, and the
              custom swatch there closes it back to the picker.
              hideOnScroll off: scrolling the swatch row would close this one. */}
          <Popover
            open={isColorsOpen}
            onOpenChange={(isOpen) => {
              setIsColorsOpen(isOpen);
              if (!isOpen) setIsSwatchesOpen(false);
            }}
            hideOnScroll={false}
            data-space="0"
            data-radius="0"
            data-background="none"
            data-contain="visible"
            data-elevation="none"
            content={
              <group data-width="auto" data-direction="column" data-gap="5">
                {customColorPicker}
                <group
                  data-animation-name="appear-top"
                  data-fill-mode="backwards"
                  data-animation-duration="3.75"
                  data-space="5"
                  data-radius="20"
                  data-elevation="2"
                  data-background="context"
                  data-direction="column"
                >
                  <Popover
                    open={isSwatchesOpen}
                    onOpenChange={setIsSwatchesOpen}
                    data-space="0"
                    data-radius="30"
                    data-elevation="2"
                    content={
                      <group
                        data-direction="column"
                        data-length="400"
                        data-snap-button="15"
                      >
                        <Scroll
                          wheelEnabled
                          buttonProps={{
                            "data-radius": "30",
                            "data-contain": "",
                          }}
                        >
                          <group
                            data-wrap="no"
                            data-space="10"
                            data-align="center"
                          >
                            {renderSwatch({
                              ...customSwatchProps,
                              onClick: () => {
                                selectCustom();
                                setIsSwatchesOpen(false);
                              },
                            })}
                            <separator
                              data-vertical=""
                              data-height="20"
                              data-margin-horizontal="5"
                            ></separator>
                            {presetSwatches}
                          </group>
                        </Scroll>
                      </group>
                    }
                  >
                    <group data-direction="column">
                      <Ripple>
                        <group
                          data-space="15"
                          data-interactive=""
                          data-over-color="neutral"
                          data-cursor="pointer"
                          data-radius="15"
                          data-align="center"
                          data-direction="column"
                          data-contain=""
                          data-ink-color="neutral"
                        >
                          <text>Swatches</text>
                        </group>
                      </Ripple>
                    </group>
                  </Popover>
                </group>
              </group>
            }
          >
            <group data-width="auto">
              <Ripple>
                <group
                  data-ink-color="neutral"
                  data-over-color="neutral"
                  data-cursor="pointer"
                  data-radius="30"
                  data-contain=""
                  data-interactive=""
                  // data-space-horizontal="15"
                  // data-space-vertical="15"
                  data-wrap="no"
                  data-align="center"
                  data-gap="15"
                  data-space="15"

                  // data-height="40"
                >
                  <group
                    data-adaptive="desktop-500"
                    data-wrap="no"
                    data-align="center"
                    data-gap="15"
                  >
                    <text data-space-left="5" data-opacity="50">
                      Color
                    </text>
                    <separator data-vertical="" data-height="20"></separator>
                  </group>

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

        {/* <separator data-vertical="" data-height="20"></separator> */}

        {onExit && (
          <Tooltip content="Exit" delay={300}>
            <group data-width="auto" data-position="right">
              <Ripple>
                <group
                  //   data-backdrop="20-contrast"
                  data-ink-color="neutral"
                  data-over-color="neutral"
                  onClick={onExit}
                  data-cursor="pointer"
                  data-radius="full"
                  data-contain=""
                  data-interactive=""
                  data-height="50"
                  data-length="50"
                  data-align="center"
                  data-justify="center"
                  data-background="adaptive-gray"
                >
                  <icon>
                    <X size={20} />
                  </icon>
                </group>
              </Ripple>
            </group>
          </Tooltip>
        )}
      </group>

      <group
        // data-scroll=""

        data-max-height="fit"
        data-height="fit"
       
        data-width="auto"
        data-wrap="no"
        data-gap="25"
        data-direction="column"
        data-min-height="300"
      >
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
            // data-max-length="auto"
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
                closePickers();
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
                {...(dirY > 0
                  ? { "data-bottom": "-20" }
                  : { "data-top": "-20" })}
                {...(dirX > 0
                  ? { "data-right": "-20" }
                  : { "data-left": "-20" })}
                // Place the dot at the corner closest to the canvas
                data-align={dirY < 0 ? "end" : undefined}
                data-justify={dirX < 0 ? "end" : undefined}
                style={{
                  cursor: dirX === dirY ? "nwse-resize" : "nesw-resize",
                  touchAction: "none",
                }}
                onPointerDown={(e: React.PointerEvent) =>
                  startResize(e, dirX, dirY)
                }
              >
                <group
                  data-height="5"
                  data-length="5"
                  data-radius="10"
                  data-background="text"
                ></group>
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* <group data-position="bottom">
        <group data-space-horizontal="25" data-background="adaptive-gray">
          <separator data-horizontal="dotted"></separator>
          <group data-space-vertical="25" data-gap="5" data-width="auto">
            <text>{width}</text> <text>×</text> <text>{height}</text>
          </group>
        </group>
      </group> */}
    </group>
  );
};

export default SimplePaint;
