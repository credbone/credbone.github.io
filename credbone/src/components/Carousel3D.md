# Carousel3D

How the 3D carousel in `components/Carousel3D.tsx` works. Read this before touching it or adding one.

## Three parts

1. **Stage:** a `data-type="stack"` group where every card sits in the same grid cell and is placed with an inline `transform` (X offset, Z depth, Y tilt). It can be dragged, and it takes the arrow keys.
2. **Caption:** the `caption` of the two items around the center, sliding and cross-fading under the stage. It's only rendered when at least one item has a `caption`.
3. **Controls:** Previous / Next round buttons around an endless tick rail. The rail scrolls with the cards and can be dragged or clicked too.

## Usage

```tsx
import Carousel3D, { Carousel3DItem } from "../components/Carousel3D";

const items: Carousel3DItem[] = data.map((d) => ({
  id: d.key,
  title: d.title,
  node: ({ centered }) => (
    <group data-background={centered ? "context" : "main-background"} data-radius="25">
      …
    </group>
  ),
  caption: (
    <group data-direction="column" data-align="center" data-gap="10">
      <text data-weight="700" data-text-size="medium" data-font-type="hero">{d.title}</text>
      <text data-wrap="wrap" data-opacity="40">{d.description}</text>
    </group>
  ),
}));

<group data-animation-name="appear-bottom" data-fill-mode="backwards" data-contain="">
  <Carousel3D items={items} fade={0} onChange={(i) => setSelected(data[i].key)} />
</group>
```

Wrap it in a `data-contain=""` group: the stage has no `data-contain` of its own (it's commented out), so side cards and the 3D depth spill past it.

## Props

| Prop | Default | Effect |
|---|---|---|
| `items` | required | `Carousel3DItem[]`, see below |
| `initialIndex` | `0` | Starting item. Read on mount only |
| `onChange` | – | `(index)` called when a snap **starts**, with the target item |
| `desktop` | `{ spread: .22, maxSpread: 240, sideCount: 2 }` | Layout at stage width ≥ 600px. Partial, merged over the default |
| `mobile` | `{ spread: .3, maxSpread: 140, sideCount: 1 }` | Layout at stage width < 600px |
| `depth` | `160` | px each step sits further back (`translateZ`) |
| `tilt` | `35` | deg the side cards turn (`rotateY`), full from one step out |
| `fade` | `0.3` | Opacity lost per step. `0` keeps every visible card opaque |
| `cardWidth` | `"260"` | `data-length` of each card |
| `perspective` | `"1200"` | `data-perspective` of the stage |
| `align` | `"center"` | Vertical alignment of cards of different heights |
| `intro` | `true` | On mount, slide in from this many cards before `initialIndex`. `true` = 3, `false` / `0` = off, negative slides the other way. Mount-only |

**`Carousel3DItem`:** `id` (React key), `title` (card and tick `aria-label`), `node` (the card), `caption` (optional).

`node` can be a render function `({ centered }) => …` to style the card differently while it's in the center. `centered` is true for the nearest card, even mid-drag.

**Layout (`Carousel3DSpread`):** `spread` is the card spacing as a share of the stage width, capped at `maxSpread` px. `sideCount` is how many cards show on each side; it's capped at `floor((count - 1) / 2)` so the wrap point stays out of view. The breakpoint is the **stage's** width (ResizeObserver), not the viewport's.

## How it moves

- **Position:** one unbounded float, `position`. Every integer is a card, wrapped onto `items` with an always-positive `mod`, so the carousel loops forever in both directions. Each card's offset from the center is wrapped into `[-count/2, count/2)`.
- **Animation:** snaps run in JS with `requestAnimationFrame` (450ms ease-out cubic), not CSS transitions, so a card wrapping from one end to the other moves continuously instead of flying across the stage. `goTo(index)` takes the shortest way around.
- **Intro:** `position` (and the caption) start `intro` cards before `initialIndex`, capped at `count - 1`. Once the ResizeObserver reports a stage width, it glides to `initialIndex` over 900ms with an ease-out quint. It's a silent `animateTo` (no `onChange`), and a drag stops it like any snap. Cards stay hidden until the stage is measured, so the zero-spacing first frame never shows. It plays on every mount, e.g. each time Cards switches to the Carousel view.
- **Fade and wrap:** within `sideCount` a card loses `fade` per step. Past it, it fades to 0 over half a step and gets `visibility: hidden`, so it's invisible before it wraps.
- **Stacking:** `zIndex = 100 - distance * 10`.
- **Caption:** follows `position` with a lag (30% of the gap per frame), so it moves with the cards but trails slightly. It shifts 120px per step and is fully gone half a step out.
- **Reduced motion:** with `prefers-reduced-motion` (read on mount, then followed), there's no intro, snaps jump, the caption doesn't lag, and cards only translate on X (no depth or tilt).

## Input

- **Drag:** pointer events on the stage (one step = card spacing) and the rail (one step = 15px tick spacing). Nothing happens until the pointer moves 8px; then it captures the pointer, sets `data-user-select="none"` and a `grabbing` cursor, and fires `POPOVER_DISMISS_EVENT` so open popovers close. `data-touch-action="pan-y"` keeps vertical page scroll working on touch.
- **Release:** velocity is smoothed over moves. The drag coasts 250ms on that velocity and snaps to the nearest card. A flick over 0.5px/ms always moves at least one card. Holding still for 100ms before release cancels momentum.
- **Grab mid-snap:** a press stops the running animation where it is. A tap without dragging finishes the snap to the nearest card.
- **Click after drag:** the click that follows a drag is swallowed in the capture phase, so cards and widgets don't fire.
- **Active card:** inside the centered card, presses on `input, textarea, select, button, canvas, a, [contenteditable], [data-interactive]` keep their own behavior and don't start a drag. That's what lets the Quick Demos apps work in the carousel. The centered card is marked `data-carousel-active="true"` (a JS hook only, no CSS behind it); every other card has its content set to `data-pointer-event="none"` and clicks through to `goTo`.
- **Portaled content:** React bubbles events from portals (popovers, mobile bottom sheets) up to the stage even though they're outside it in the DOM. Presses and keys whose target isn't DOM-inside the stage or rail are ignored, so a sheet's swipe-to-close doesn't also drag the carousel (and dismiss itself).
- **Keyboard:** the stage is focusable (`tabIndex={0}`); ← / → move one card, except while typing in a field.
- **Rail:** clicking a tick goes there.

## Patterns in use

- **Cards page, Carousel view** (`template/Cards.tsx`, `CarouselTemplate`): wide, deep layout (`desktop={{ spread: .15, maxSpread: 300, sideCount: 3 }}`, `mobile={{ spread: .35 }}`, `depth={400}`, `tilt={45}`, `fade={0}`). `node` uses `centered` to lift the card (`context` + elevation) and to play its video only in the center. Double-click opens the item modal. `initialIndex` starts on the selected item, and `onChange` syncs the selection, skipping the key that's already selected because `onSelect` toggles. The scroll `ref` sits outside the `appear-bottom` group so it measures the final position.
- **Quick Demos** (`template/quickDemos.tsx`): live apps as cards (`DemoBlock mode="carousel" active={centered}`), `align="end"` so apps of different heights sit on one baseline, `fade={0}`. The interactive-selector rule is what keeps the apps usable.
- Both pages wrap it in `data-animation-name="appear-bottom" data-fill-mode="backwards" data-contain=""`.

## Known issues

1. **Empty `items` crashes.** With `count = 0`, `mod` divides by zero and `items[tick.index].title` throws in the rail.
2. **`initialIndex` is mount-only.** If the selection changes elsewhere (Cards page list, deep link), the carousel doesn't follow until it remounts.
3. **`onChange` fires on no-op snaps.** Clicking the current tick, or a tap that finishes an interrupted snap, calls it with the index that's already centered. Cards guards against it; other callers have to as well. (The intro is silent, so it doesn't add to this.)
4. **`cardWidth` and `perspective` are only as good as the CSS.** They go straight into `data-length` / `data-perspective`, and `control.css` only defines `data-perspective` 500 and 1200. Any other value silently does nothing.
5. ~~**First frame is collapsed.**~~ Fixed: cards stay hidden until `stageWidth` is measured.
6. **Every frame re-renders every card.** Position is React state, so each animation frame re-renders all `node`s. Fine for images, heavier for live apps like Quick Demos.
7. **Magic numbers tied to markup.** `RAIL_HALF = 120` must match the rail's `data-length="240"`, and `TICK_SPACING = 15` the ticks' `data-length="15"`.
8. **Controls are inconsistent.** Previous uses `data-radius="40"` inside a `data-width="auto"` wrapper; Next uses `data-radius="full"` inside a bare `<group>`.
9. **Accessibility:** the stage has `aria-roledescription="carousel"` but no `aria-label`. Ticks have labels but no role and aren't focusable. Side cards are `aria-hidden` yet clickable. Arrow keys also move the carousel while a button inside the active card has focus.
10. **Leftover code:** commented-out `data-contain` on the stage and caption, a commented `data-radius` on the ticks, and stray blank lines in the stage props.
