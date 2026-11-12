import React, { useEffect, useId, useRef, useState } from "react";

// Liquid glass surface: refracts, splits and frosts whatever sits behind it.
// Refraction and dispersion use an SVG filter as backdrop-filter (Chromium only);
// other browsers get a blur + saturate fallback. Light rim and sheen are CSS
// ([data-glass] in styles/controls/glass.css) and work everywhere. See Glass.md.

export interface GlassProps extends React.HTMLAttributes<HTMLElement> {
  /** Light direction in degrees, Figma style (-45 = from top-left). */
  lightAngle?: number;
  /** Strength of the rim highlight and sheen, 0–100. */
  lightIntensity?: number;
  /** How far the rim bends the backdrop, 0–100. */
  refraction?: number;
  /** Width of the curved rim, 0–100 (100 curves the whole surface). */
  depth?: number;
  /** Red/green/blue split at the rim, 0–100. */
  dispersion?: number;
  /** Backdrop blur, 0–100 (100 = 20px). */
  frost?: number;
  /** Corner radius in px; clamped to half the smaller side. */
  radius?: number;
  /** Backdrop saturation in %. */
  saturation?: number;
  /** Tint color, any CSS color; prefer theme tokens such as "var(--main-color)". */
  tint?: string;
  /** Tint strength in %, 0–100. */
  tintOpacity?: number;
  children?: React.ReactNode;
  [key: `data-${string}`]: any;
}

const SUPPORTS_SVG_BACKDROP =
  typeof navigator !== "undefined" && /Chrome\/\d+/.test(navigator.userAgent);

// Displacement map for a rounded rect. R/G hold the x/y offset (128 = none).
// Pixels inside the rim sample inward with a circular-lens slope profile.
const makeMap = (w: number, h: number, r: number, bezel: number): string => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const hw = w / 2;
  const hh = h / 2;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      let dist: number;
      let nx: number;
      let ny: number;
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(qx, qy);
        dist = r - l;
        nx = qx / l;
        ny = qy / l;
      } else if (qx > qy) {
        dist = r - qx;
        nx = 1;
        ny = 0;
      } else {
        dist = r - qy;
        nx = 0;
        ny = 1;
      }
      nx *= Math.sign(px) || 1;
      ny *= Math.sign(py) || 1;

      let mag = 0;
      if (dist >= 0 && dist < bezel) {
        const t = 1 - dist / bezel;
        mag = 1 - Math.sqrt(1 - t * t);
      }
      const i = (y * w + x) * 4;
      d[i] = 128 - nx * mag * 127;
      d[i + 1] = 128 - ny * mag * 127;
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
};

// Keeps one color channel of a displaced pass
const channel = (r: number, g: number, b: number) =>
  `${r} 0 0 0 0  0 ${g} 0 0 0  0 0 ${b} 0 0  0 0 0 1 0`;

interface MapState {
  w: number;
  h: number;
  href: string;
}

const Glass: React.FC<GlassProps> = ({
  lightAngle = -45,
  lightIntensity = 80,
  refraction = 60,
  depth = 30,
  dispersion = 40,
  frost = 4,
  radius = 30,
  saturation = 150,
  tint = "white",
  tintOpacity = 8,
  style,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);
  const filterId = "glass-" + useId().replace(/:/g, "");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [map, setMap] = useState<MapState | null>(null);
  const mapKey = useRef("");

  // Track the element's size
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  const bezel = Math.max(2, 2 + (depth / 100) * (Math.min(w, h) / 2 - 2));

  // Rebuild the displacement map only when geometry changes
  useEffect(() => {
    if (!SUPPORTS_SVG_BACKDROP || !w || !h) return;
    const key = [w, h, r, bezel.toFixed(1)].join();
    if (key === mapKey.current) return;
    mapKey.current = key;
    setMap({ w, h, href: makeMap(w, h, r, bezel) });
  }, [w, h, r, bezel]);

  // Filter strengths
  const scale = refraction * 1.6;
  const spread = (dispersion / 100) * 0.18;
  const blur = frost * 0.2;

  const backdrop =
    SUPPORTS_SVG_BACKDROP && map
      ? `url(#${filterId})`
      : `blur(${Math.max(blur, 6)}px) saturate(${saturation}%)`;

  // Light: Figma angle to CSS gradient angle, plus a unit vector toward the light
  const cssAngle = lightAngle + 180;
  const a = (cssAngle * Math.PI) / 180;
  const lx = -Math.sin(a);
  const ly = Math.cos(a);

  const glassStyle = {
    borderRadius: r + "px",
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
    "--glass-angle": cssAngle + "deg",
    "--glass-highlight": (lightIntensity / 100).toFixed(3),
    "--glass-light-x": (50 + lx * 50).toFixed(1) + "%",
    "--glass-light-y": (50 + ly * 50).toFixed(1) + "%",
    "--glass-edge-x": lx.toFixed(3),
    "--glass-edge-y": ly.toFixed(3),
    "--glass-tint-color": tint,
    "--glass-tint-amount": tintOpacity + "%",
    ...style,
  } as React.CSSProperties;

  return (
    <>
      {SUPPORTS_SVG_BACKDROP && map && (
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          focusable="false"
          data-position="absolute"
        >
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={map.w}
            height={map.h}
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} edgeMode="duplicate" result="blur" />
            <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="blur" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="G" result="dR" />
            <feColorMatrix in="dR" type="matrix" values={channel(1, 0, 0)} result="r" />
            <feDisplacementMap in="blur" in2="map" scale={scale * (1 + spread)} xChannelSelector="R" yChannelSelector="G" result="dG" />
            <feColorMatrix in="dG" type="matrix" values={channel(0, 1, 0)} result="g" />
            <feDisplacementMap in="blur" in2="map" scale={scale * (1 + spread * 2)} xChannelSelector="R" yChannelSelector="G" result="dB" />
            <feColorMatrix in="dB" type="matrix" values={channel(0, 0, 1)} result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" result="rgb" />
            <feColorMatrix in="rgb" type="saturate" values={String(saturation / 100)} />
          </filter>
        </svg>
      )}

      <group ref={ref} data-glass="" style={glassStyle} {...rest}>
        {children}
      </group>
    </>
  );
};

export default Glass;
