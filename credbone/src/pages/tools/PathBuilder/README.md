# Path Builder

SVG path editor: place anchor points on a grid, choose a segment type per point (M / L / Q / C / A), drag anchors and control handles, then copy the resulting `d` string.

Route: `/Tools/PathBuilder`

## Where it's registered

| Place | File |
|---|---|
| Route | `pages/tools/index.tsx` (`<Route path="PathBuilder" element={<PathBulder />} />`) |
| Tools list | `pages/tools/toolData.ts` (still `new:"true"`) |
| Thumbnail | `pages/tools/toolThumbs.tsx` (`PathBuilder`, a `DotDisplay`) |
| Search | `pages/search/routesData.ts` |
| Page title | `components/TitleUpdater.tsx` |

## Files

| File | Role |
|---|---|
| `types.ts` | `PathPoint` (`type`, `x/y`, plus optional `cx/cy` for Q, `cx1/cy1/cx2/cy2` for C, `rx/ry/xrot/large/sweep` for A), `DragRole`, `DragState`, `CanvasConfig` (width, height, closePath, gridSize, snapGrid, showGrid). |
| `pathUtils.ts` | `buildPathD(points, close)` builds the `d` string (values rounded). `makePoint` fills every control field up front with defaults based on the previous point, so switching a segment's type always has values. Also `snapToGrid`, `uid`, `r`. |
| `useEditorState.ts` | `useReducer` store and all interaction logic. Actions: `ADD_POINT`, `SELECT`, `REMOVE` (re-marks the new first point as `M`), `RESET`, `SET_POINT_TYPE`, `UPDATE_POINT`, `SET_CONFIG` (clamps values; pulls points inside if the canvas shrinks), `RESIZE` (from the canvas handles: sets width/height and shifts points by `offsetX/offsetY` from a snapshot taken at drag start, clamped inside). Mouse drag for anchors and control dots with snapping. Canvas resize logic (`startResize` / `isResizing`) ported from `tools/SimplePaint.tsx`: pointer + touch listeners on `window`, live resize, 100–1000, snapped to the grid when Snap to Grid is on, ×2 factor per axis when the canvas is centered in its `[data-scroll]` area. Intro animation: a flat line eases into an S-curve over 700ms. |
| `PathCanvas.tsx` | The `<svg>` inside a relative `<group>`. Layers: grid background → control lines → path → control dots → anchors. First anchor has its own color. `mousemove` / `mouseup` listeners on `window`. Four SimplePaint-style corner resize handles sit just outside the canvas (the page wraps it in `data-space="20"` so they aren't clipped), plus a "W × H" badge while resizing. Dragging a left/top handle keeps the path pinned to the opposite edge. |
| `Panel.tsx` | `ConfigPanel` (canvas settings + Reset), `PointPanel` (segment type picker + sliders for the selected point and its controls), `PathOutput` (shows the `d` string, copy with snackbar), `HintsPanel`. Building blocks: `NumberRow` (−/+ stepper with hold-to-repeat), `SliderRow` (`CustomSlider` in the "Grain" style from the slider demo: invisible default-width handle, 40px rounded fill via `fillProps`, decorative `TickComponent` behind, label and value inside the bar), `ToggleRow`, `Toggle`, `Section`, `ActionBtn`. |
| `PathBulder.tsx` | Page layout: left panel (canvas settings, path export, hints, 260px), center column (title, intro text, canvas in a `data-scroll` area) and right panel (selected point & segment). Under 1000px the left panel becomes a button that opens a `Popover`; under 800px the right panel becomes a sticky bottom button (bottom sheet on mobile). Delete/Backspace removes the selected point. Everything is styled in place with `data-*` attributes (no classes, no CSS file). |

## Data flow

```
useEditorState (points + config)
   ├─ buildPathD ─► PathCanvas (draws it)
   │             └► PathOutput (Copy Path)
   └─ dispatch / updateSelected / setSelectedType ◄─ ConfigPanel, PointPanel, canvas drag
```

## Interactions

- **Ctrl / ⌘ + click** on the canvas: add a point (snapped if Snap to Grid is on)
- **Hold** (400ms, mouse or touch) on empty canvas: add a point and keep dragging it until release
- **Click / tap** an anchor: select it. Clicking or tapping empty canvas deselects.
- **Drag** an anchor or control handle (mouse): move it right away (kept inside the canvas)
- **Long-press** an anchor or handle (touch): pick it up and drag it. Moving the finger more than 10px before the long-press fires cancels it, so the canvas area still scrolls normally.
- Touch uses touch events (not pointer events) with `touchmove` + `preventDefault` once a drag starts, like `components/SortableGrid.tsx`: with pointer events the browser starts scrolling and sends `pointercancel` before the long-press fires. Mouse events the browser replays after a tap are ignored for 800ms. On touch-first devices (`isTouchFirst`, `pointer: coarse`) anchors and handles get an invisible 22px hit circle.
- Hints and intro text switch to gesture wording on touch-first devices, and use ⌘ / ⌫ on Apple devices (`isApple` in `pathUtils.ts`).
- **Drag a corner handle**: resize the canvas live (works on touch). Left/top handles keep the path pinned to the opposite edge; shrinking pulls points inside.
- **Delete / Backspace**: remove the selected point (ignored while an `INPUT` has focus)
- The first point is always `M`, and its type can't be changed.

## Known issues / TODO

1. **The corner resize handles described above aren't in the code.** `RESIZE`, `startResize` and the handles don't exist in `useEditorState.ts` / `PathCanvas.tsx`; canvas size is only set from the Config panel.
2. **Hard-coded color.** The first anchor uses `#f4511e` in `PathCanvas.tsx`. Replace it with a theme token.
3. **`NumberRow` over-steps.** `hasFired` is never set to true, so releasing after a hold adds one extra step. `wasHolding` is unused.
4. **Size limits don't match.** `SET_CONFIG` allows width/height up to 2000, but the `NumberRow` inputs and the resize handles (`RESIZE_MAX`) stop at 1000.5. **Backspace can delete a point by accident.** The shortcut only ignores `INPUT`, so it also fires in textareas or other editable elements.
6. **Typos:** "Easly" in the `toolData.ts` description, and the file name `PathBulder.tsx`.
7. **Leftovers:** commented-out code and empty `<group>` spacers in `Panel.tsx`.
8. **`tsconfig.json` uses `"moduleResolution": "bundler"`**, which the installed TypeScript 4.9 rejects, so `npx tsc --noEmit` fails before checking anything. Either upgrade TypeScript to 5.x or switch to `"node"`.
