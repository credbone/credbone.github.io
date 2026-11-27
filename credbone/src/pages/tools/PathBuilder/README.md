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
| `pathUtils.ts` | `buildPathD(points, close)` builds the `d` string (values rounded). `makePoint` fills every control field up front with defaults based on the previous point, so switching a segment's type always has values. Also `snapToGrid`, `uid`, `r`, the device checks `isTouchFirst` / `isApple` / `isSmallScreen` (≤ 600px wide, checked once on load), and the shared limits `CANVAS_SIZE` (100–1000) and `GRID_SIZE` (5–200). |
| `useEditorState.ts` | `useReducer` store and all interaction logic. Actions: `ADD_POINT`, `SELECT`, `REMOVE` (re-marks the new first point as `M`), `RESET`, `SET_POINT_TYPE`, `UPDATE_POINT`, `SET_CONFIG` (clamps values; pulls points inside if the canvas shrinks), `RESIZE` (from the canvas handles: sets width/height and shifts points by `offsetX/offsetY` from a snapshot taken at drag start, clamped inside). Mouse drag for anchors and control dots with snapping. `onWorkAreaMouseDown` (on the canvas column's `data-scroll` group in `PathBulder.tsx`) deselects when the work area around the canvas is pressed: mousedown rather than click, so ending a point drag over the padding doesn't deselect; presses inside `canvasRef` (the `PathCanvas` root: svg + resize handles) are skipped; taps come through as emulated mousedowns, scrolling doesn't. Canvas resize logic (`startResize` / `isResizing`) ported from `tools/SimplePaint.tsx`: pointer + touch listeners on `window`, live resize within `CANVAS_SIZE`, snapped to the grid when Snap to Grid is on, ×2 factor per axis when the canvas is centered in its `[data-scroll]` area. **Defaults** (`DEFAULT_CONFIG`, `START`): the canvas starts at 360×480 with `M 80 240 C 160 160 200 320 280 240`, or at 280×320 with `M 80 160 C 120 120 160 200 200 160` when `isSmallScreen`. Grid 40, Snap to Grid and Show Grid on, Close Path off. `RESET` clears the points and restores the default width, height and grid size. Intro animation: the start path begins as a flat line at its anchors' y and eases into the S-curve over 700ms. |
| `PathCanvas.tsx` | The `<svg>` inside a relative `<group>`. Layers: grid background → control lines → path → control dots → anchors. First anchor has its own color. `mousemove` / `mouseup` listeners on `window`. Four SimplePaint-style corner resize handles sit just outside the canvas (the page wraps it in `data-space="50"` so they aren't clipped), plus a "W × H" badge while resizing. Dragging a left/top handle keeps the path pinned to the opposite edge. |
| `Panel.tsx` | Exports each piece separately so the page can place it anywhere. `ConfigPanel` (canvas settings: `ConfigSlider`s for width, height, grid size; toggles for Close Path, Snap to Grid, Show Grid). `ResetButton` (separate export, placed after the canvas settings with a dotted separator in the rail and the menu panel; radius 30 in a bottom sheet, 15 otherwise). `SegmentTypePicker` (L/Q/C/A segmented toggle; a message slides in over it on an empty canvas, with no point selected, or for the fixed first point, from `PICKER_MESSAGES`, device-aware for the empty case). `SegmentTypeButton` (compact version: one button showing the current type, opening the types from `SEGMENT_TYPES` as a `MenuItem` list, bottom sheet on mobile; shows the same message when there's nothing to pick). `RemovePointButton` (icon + tooltip). `PointPanel` (sliders for the selected point and its controls; Arc Size and Sweep as `ConfigSwap`s). `PathOutput` (the `d` string only). `CopyPathButton` (copies `d` with a snackbar and a Copy Path → Copied text swap; its own inline button markup; radius 30 in a bottom sheet, 15 otherwise; renders nothing with no path). `HintsPanel`. `SheetCloseButton` (Dot Icon Maker-style button that ends a bottom sheet and doubles as its bottom gap; `label` defaults to "Close"). Building blocks: `ToggleRow` (the component demos' bordered switch bar, `role="switch"`, Enter/Space), `Toggle`. `ResetButton` and `CopyPathButton` each have their own inline button markup (no shared button component). |
| `PathBulder.tsx` | Page layout: canvas column (scroll area with the canvas, floating toolbar at the bottom) and a 320px right rail from 1000px (Selected Point, Canvas Settings). **Toolbar:** full picker from 600px and `SegmentTypeButton` below, Remove always, then the promoted menu items, then the "…" menu. **Menu** is driven by `menuItems` (key, icon, title, `description` = short line in the menu list, `summary` = longer text under the panel header in popovers and the right pane, plus): `outsideFrom` (a breakpoint with `desktop-`/`mobile-` pairs in `control.css`: 500, 600, 800, 1000, 1200) takes the item out of the menu from that width; `inToolbar` makes it a toolbar button there (always, without `outsideFrom`); `disabled` dims it everywhere. The menu button (and its separator) hides from the largest `outsideFrom`, so on wide screens there's no menu. Current: Selected Point (disabled with no selection) and Canvas Settings in the rail from 1000px, menu below; Export Path always in the toolbar (disabled with no points); Quick Help in the toolbar from 1000px. Picking a menu item closes the list and opens that item's panel in a separate popover anchored to the same "…" button (`menuView`), with no back step. That popover wraps the menu's popover: its own trigger click is ignored (it only closes), and while it's open the "…" button just closes it. It opens on the next tick, so the outside-click listener doesn't catch the click that opened it. It also closes if its item becomes disabled. Every popover is written out inline, so each can be styled on its own: the toolbar's Export Path and Quick Help, the "…" list, and the menu-panel popover, which has one inline block per item that can be in the menu: Selected Point, Canvas Settings and Quick Help (`menuView`). Export Path is always in the toolbar, so it has no menu block. The shared parts are still duplicated for now and will be combined later. Each panel uses the right pane's header format (large hero title, then the `summary` at 40% opacity, no icon), then a separator, then the panel. Titles and summaries come from `menuItems` (`pointItem`, `exportItem`, `settingsItem`, `infoItem`), which the rail also reads. Popovers use the menu frame (`data-space="5"`, radius 20, 320 wide) and are bottom sheets on mobile, ending with `SheetCloseButton` (Done in panels and Export, Close on the menu list, Cancel on the type list). Toolbar tooltips are disabled while their popover is open (`toolbarOpen`, `isMenuOpen`). Delete/Backspace removes the selected point. Styled in place with `data-*` attributes (no classes, no CSS file). |

## Data flow

```
useEditorState (points + config)
   ├─ buildPathD ─► PathCanvas (draws it)
   │             └► PathOutput + CopyPathButton (in the Export Path popovers)
   └─ dispatch / updateSelected / setSelectedType ◄─ ConfigPanel, PointPanel, SegmentTypePicker / Button, RemovePointButton, canvas drag
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
- Bottom sheets (mobile devices only, from the Popover's `isMobile` check, not width) close with the button at the end or a swipe down. Narrow desktop windows get popovers.

## Known issues / TODO

1. ~~Corner resize handles missing~~ Done (2026-11-26): `RESIZE` action, `startResize` / `isResizing` in `useEditorState.ts`, handles + size badge in `PathCanvas.tsx`. The centered check looks at the closest `[data-scroll]` ancestor of the canvas; if the layout stops centering the canvas there, the ×2 factor turns off by itself.
2. **Hard-coded color.** The first anchor uses `#f4511e` in `PathCanvas.tsx`. Replace it with a theme token.
3. ~~`NumberRow` over-steps~~ Gone: `NumberRow` was removed (2026-11-26); canvas size and grid use `ConfigSlider`.
4. ~~Size limits don't match~~ Fixed (2026-11-26): `CANVAS_SIZE` (100–1000) and `GRID_SIZE` (5–200) in `pathUtils.ts` are used by `SET_CONFIG`, the resize handles and the sliders.
5. **Backspace can delete a point by accident.** The shortcut only ignores `INPUT`, so it also fires in textareas or other editable elements.
6. **Typos:** "Easly" in the `toolData.ts` description, and the file name `PathBulder.tsx`.
7. **Leftovers:** commented-out code and empty `<group>` spacers in `Panel.tsx` and `PathBulder.tsx` (e.g. the commented-out title/intro block). The `data-height="70"` group under the canvas is not a leftover: it keeps the canvas bottom clear of the floating toolbar when scrolled.
8. **`tsconfig.json` uses `"moduleResolution": "bundler"`**, which the installed TypeScript 4.9 rejects, so `npx tsc --noEmit` fails before checking anything. Either upgrade TypeScript to 5.x or switch to `"node"`.
