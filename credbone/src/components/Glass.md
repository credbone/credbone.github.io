# Glass

How the liquid glass surface works in `components/Glass.tsx` and `styles/controls/glass.css`. Read this before touching either one.

## Files

- **`components/Glass.tsx`:** `Glass`, the component. Builds the SVG filter and sets the light variables.
- **`styles/controls/glass.css`:** the `[data-glass]` attribute: tint, light rim, sheen and inset edges.
- **`template/GlassPropsDemo.tsx`:** the demo, shown on the Miscellaneous page: sliders, a draggable glass orb over a photo, Reset, and Copy (puts the current config on the clipboard as props).

## Usage

```tsx
import Glass from "../components/Glass";

<Glass refraction={60} depth={30} dispersion={40} frost={4} radius={30}
       data-length="240" data-height="140" data-space="20">
  <text>Content</text>
</Glass>
```

It renders a `<group>`, so any `data-*` attribute and children pass straight through. Size it with `data-length` / `data-height` like any group.

## Props

The first six match Figma's Glass effect.

| Prop | Default | Effect |
|---|---|---|
| `lightAngle` | `-45` | Light direction in degrees, Figma style (`-45` = from top-left) |
| `lightIntensity` | `80` | Strength of the rim highlight, sheen and inset edges, 0–100 |
| `refraction` | `60` | How far the rim bends the backdrop (displacement scale = value × 1.6) |
| `depth` | `30` | Width of the curved rim, 0–100. `100` curves the whole surface |
| `dispersion` | `40` | Red/green/blue split at the rim, 0–100 |
| `frost` | `4` | Backdrop blur, 0–100 (`100` = 20px) |
| `radius` | `30` | Corner radius in px, clamped to half the smaller side. Set inline, so it beats `data-radius` |
| `saturation` | `150` | Backdrop saturation in % |
| `tint` | `"white"` | Tint color, any CSS color. Prefer theme tokens (`"var(--main-color)"`) so it follows the user's theme |
| `tintOpacity` | `8` | Tint strength in %, mixed with `color-mix()` |

## How it works

1. **Displacement map.** A canvas the element's exact size, turned into a data URL. Red/green hold the x/y offset (128 = none). Only pixels within the rim band (`depth`) move, following a circular-lens curve (`1 − √(1 − t²)`), so the edge samples from further inside and the centre stays put.
2. **Filter chain**, used as `backdrop-filter: url(#id)`: blur (frost) → three `feDisplacementMap` passes at growing scales (dispersion) → keep only R, G, B from each → screen-blend back → saturate.
3. **Rebuilds.** A `ResizeObserver` tracks the size; the map is only rebuilt when the size, radius or depth changes. Other props just change filter attributes.
4. **Light.** The component sets `--glass-angle`, `--glass-highlight`, `--glass-light-x/y` and `--glass-edge-x/y` inline. `[data-glass]::before` draws the rim (gradient ring via mask-composite), `::after` the sheen behind the content (`z-index: -1` inside `isolation: isolate`), and inset box-shadows give the lit and shaded edges.
5. **Fallback.** Non-Chromium browsers get `blur() saturate()`, with at least 6px of blur. The light layer works everywhere.

## Notes

- Highlights are white in every theme on purpose: they stand for physical light, not a UI color. The tint comes from `--glass-tint-color` and `--glass-tint-amount`, set by the `tint` / `tintOpacity` props.
- `[data-glass]` uses both pseudo-elements and sets `background`, so don't combine it with another attribute that does the same.
- The filter lives in a hidden `<svg>` rendered as a sibling just before the glass.

## Known issues

- Chromium is detected by user agent (`Chrome/`); there's no reliable feature test for SVG `backdrop-filter`.
- The map is built at 1 CSS px per pixel, so curves can look slightly stepped on high-DPI screens.
- The map is built pixel by pixel in JS. Resizing a large glass every frame is costly.
