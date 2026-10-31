# Range Slider

How the range slider works in `components/inputs/slider.tsx` (`CustomSlider`) and its companion `TickComponent.tsx`. Read this before touching either one or adding a slider.

## Files

- **`inputs/slider.tsx`:** `CustomSlider`, the slider itself.
- **`inputs/TickComponent.tsx`:** a row of tick marks. It's a separate scale you place next to a slider; nothing connects the two.
- **`styles/controls/inputs.css`** (the `range-slider` block): hides the native input and positions the tracks.
- **`template/RangeSlider.tsx`:** the demo page.

## Usage

```tsx
import CustomSlider from "../components/inputs/slider";

const [value, setValue] = useState(25);

<CustomSlider
  start={0}
  end={100}
  value={value}
  onValueChange={setValue}
  handlerProps={{ "data-background": "main", "data-color": "main-text" }}
  trackLeftProps={{ "data-background": "main" }}
  trackRightProps={{ "data-opacity": "10" }}
/>
```

It's fully controlled: it keeps no value of its own and renders whatever `value` it gets.

## Props

| Prop | Default | Effect |
|---|---|---|
| `start` / `end` | required | Min and max, passed to the native input |
| `value` | required | Current value |
| `onValueChange` | required | Called with a `number` on every input change |
| `step` | none (native `1`) | Native `step` |
| `handlerWidth` | `60` | Handle width in px, used as `data-length` and in the position formula |
| `edgeGap` | `0` | Insets the track area by `edgeGap / 2` on each side (can be negative) |
| `unit` | none | Text appended after the value on the handle |
| `showvalue` | `true` | Shows the value on the handle (`unit` still shows when it's off) |
| `label` | none | Text shown on the handle instead of the value and unit (both are hidden when it's set). Shown at the default weight, the value at 700. Also set as `aria-valuetext`. For a label that follows the value, map it yourself: `label={sizes[value]}` |
| `showValueOnDrag` | `false` | With `label` set, shows the value and unit instead while dragging, then goes back to the label on release |
| `handlerProps` | none | Attributes spread onto the handle, last, so they override its defaults |
| `trackLeftProps` / `trackRightProps` | none | Attributes spread onto each track, last |
| `onDragStart` / `onDragEnd` | none | Called on press and release on the input |

## How it works

1. **Native input on top.** A real `<input type="range">` fills the slider at `opacity: 0` and takes all the input, so mouse, touch, keyboard and step snapping come from the browser. Its thumb is sized 60×30 in CSS so the hit area roughly matches the default handle.
2. **Visual layers below**, all `pointer-events: none`:
   - **Handle:** `data-background="text"`, `data-color="main-background"`, height 30, `data-radius="40"`, showing the value and unit at weight 700.
   - **Tracks:** two 2px bars inside a wrapper that moves with the handle. The left one is attached at `right: 100%` and the right one at `left: 100%` (with `data-margin-left="5"`), so they stick out from either side of the handle. Each is 700px long (`data-min-length="700"`), and the outer `data-contain` clips them, so they look like they fill the slider up to the handle.
3. **Positioning.** Both the handle and the track wrapper use `left: calc(p% - handlerWidth * p)`, where `p` is the value as a fraction of the range. That's the same formula the browser uses for its own thumb, so the handle stays under the invisible thumb from edge to edge.
4. **Motion.** While not dragging, the handle and tracks carry `data-duration="2.25"` (0.225s) with `data-transition-prop="position"`, so a click on the track glides. While dragging the duration is removed, so the handle follows the pointer exactly. `isDragging` is set from `mousedown`/`touchstart` and `mouseup`/`touchend` listeners on the input.
5. **Pressed feedback.** `:active` on the slider nudges the handle text down 1px.

## TickComponent

```tsx
<TickComponent tickCount={21} majorEvery={5} heights={{ minor: 8, major: 18 }} />
```

| Prop | Default | Effect |
|---|---|---|
| `tickCount` | required | Number of ticks, spread with `space-between` |
| `majorEvery` | none | Every Nth tick (0, N, 2N…) gets the `major` height |
| `midEvery` | none | Every Nth tick that isn't major gets the `mid` height |
| `emphasizeEdges` | `true` | First and last ticks are major |
| `emphasizeCenter` | `true` | The middle tick (`floor(tickCount / 2)`) gets the `center` height |
| `heights` | `{ minor: 10, mid: 18, major: 20, center: 30 }` | Per-kind heights, merged over the defaults |
| any `data-*` | none | Spread onto the root, last, so they override its defaults (`data-align`, `data-opacity`…) |

Priority is center, then edges, then major, then mid, then minor. Heights are typed to the `data-height` values that exist in `control.css`, so an unsupported value is a type error. Ticks are 1px wide with `data-background="neutral-stable"`.

To line ticks up with a slider, inset the tick row by half the handle width so the first and last ticks sit under the handle's center at the ends.

## Patterns in use

- **Default** (`template/RangeSlider.tsx`, first example): neutral handle that shows the value and fills its container.
- **Primary color** (demo, temperature card): `main` handle and left track, right track at `data-opacity="10"`, with a `TickComponent` and labels above.
- **On dark surfaces** (demo): `data-theme="dark"` on the container; the default tokens adapt.
- **Outlined handle with unit** (demo, gauge card): `data-background="none"` + `data-border="inset-2"` on the handle, `unit="°"`.
- **Text label** (demo, size card): a 0–4 slider with `label={sizes[sizeIndex]}` showing XS…XL.
- **Handle as a window over a tick strip** (demo, "Deep Customization" section, four variants, each with its own value): text labels (Grain, Exposure, Warmth, Contrast) + `showValueOnDrag`, `handlerWidth={100}`, both tracks `data-background="none"`, ticks positioned absolutely behind the slider.
- **Elsewhere:** tool panels (ColorMixer, BlobGenerator, AvatarMaker, PathBuilder `SliderRow`, SimplePaint), `FontSizeControl`, and several template pages.

## Known issues

1. **Thumb hit area ignores `handlerWidth`.** The native thumb is fixed at 60×30 in `inputs.css`. With any other `handlerWidth` (100 in the demo), the invisible thumb and the visible handle drift apart: grabbing the edge of a wide handle makes the value jump, and a narrow handle has a hit area bigger than itself.
2. **Drag can get stuck.** Release is only caught by `mouseup`/`touchend` on the input. Releasing outside it leaves `isDragging` true, so the glide transition stays off and `onDragEnd` never fires. There's no `touchcancel` either.
3. **Stale drag callbacks.** The listener `useEffect` has `[]` deps, so `onDragStart` / `onDragEnd` stay the first render's versions.
4. **Tracks are 700px long.** A slider wider than about 700px plus the handle shows a gap at the far end of a track.
5. **Asymmetric track gap.** The right track has `data-margin-left="5"`, the left one has no margin (its `data-margin-right` is commented out). So `trackLeftProps={{ "data-margin-right": "0" }}` in the demo does nothing.
6. **Accessibility:** no visible focus state (the input is invisible and the handle doesn't react to focus), no way to pass `aria-label`, and no `aria-valuetext`, so screen readers don't hear `unit`.
7. **Division by zero.** `start === end` gives `NaN` as the position.
8. **Legacy styling.** The CSS targets `[data-name="range-slider…"]` selectors, which the house rules don't allow for new code. The block also declares `position` twice, and has commented-out rules and an empty `@media` block. The `edgeGap` comment mentions a `Math.abs` the code doesn't use.

A likely fix for 1, 2 and 3 together: switch to pointer events with pointer capture (or listen for release on `window`), keep the callbacks in refs, and size the thumb from `handlerWidth` through a CSS variable set on the slider.
