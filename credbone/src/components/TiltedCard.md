# TiltedCard

How the tilted card in `components/TiltedCard.tsx` works. Read this before touching it or adding one.

## What it does

The card turns toward the pointer, up to `maxTilt` degrees at its edges. While the pointer is on it, it rises `lift` px toward the viewer and grows to `scale`. When the pointer leaves, it eases back flat. With `float`, it bobs and sways slowly while untouched. Parts of the face wrapped in `TiltedCardLayer` rise above the card while it's active. There is no shadow and no light or glare; the card face is entirely the caller's markup.

## Parts

1. **Stage:** the outer `<group data-perspective>`. It catches the pointer and is never transformed, so its `getBoundingClientRect()` gives an undistorted reading.
2. **Card:** the inner `<group data-transform-style="preserve-3d">`. It gets an inline `transform` written through a ref, and the `--tilted-card-active` variable (0..1) for its layers.
3. **Layers (optional):** `TiltedCardLayer` groups inside the face, each pushed forward by `--tilted-card-active × depth` px.

## Usage

```tsx
import TiltedCard, { TiltedCardLayer } from "../components/TiltedCard";

<group data-length="300">
  <TiltedCard maxTilt={12} lift={20} float>
    <group data-background="adaptive-gray" data-radius="30" data-space="10" data-transform-style="preserve-3d">
      <TiltedCardLayer depth={20}>
        <group data-ratio="4:5" data-radius="20" data-contain="">…photo…</group>
      </TiltedCardLayer>
      <TiltedCardLayer depth={50}>
        <text>Title</text>
      </TiltedCardLayer>
    </group>
  </TiltedCard>
</group>
```

Size it with a wrapper (`data-length`, a grid cell…). The stage fills its parent, and the tilt is measured across the stage, so a stage wider than the card makes the card tilt from outside its own edges.

**Layers only work through an unbroken 3D chain.** Every element between the card and a layer needs `data-transform-style="preserve-3d"` and must not clip (`data-contain`) or be translucent (`data-opacity`); any of those flattens the layer back onto the card. Clipping *inside* a layer is fine. Without layers, the face can be any markup.

## Props

| Prop | Default | Meaning |
|---|---|---|
| `children` | | The card face. Style it yourself. |
| `axis` | `"both"` | Rotation axes that follow the pointer: `"x"` tips up/down (pointer's vertical position), `"y"` turns left/right (horizontal), `"both"` does both. |
| `maxTilt` | `12` | Degrees the card turns at its edges. 0 keeps it facing forward while it still lifts. |
| `lift` | `20` | Px the card rises toward the viewer while active. |
| `scale` | `1` | Size while active (e.g. `1.05`). |
| `perspective` | `"1000"` | `data-perspective` value of the stage. Lower is more dramatic. |
| `smoothing` | `100` | Ms time constant of the easing: how long the card takes to catch up. 0 is instant. |
| `reverse` | `false` | Tilt away from the pointer instead of toward it. |
| `float` | `false` | Slow idle bob (±6px) and sway (±3°) over a 6s cycle while untouched. |
| `disabled` | `false` | Static card. |

`TiltedCardLayer` takes `depth` (px at full activity, default 0) and any `data-*` attribute, which goes on its group, e.g. `<TiltedCardLayer depth={30} data-position="absolute" data-left="0" data-top="0">`. Its own `data-transform-style="preserve-3d"` and depth transform always win.

## How it moves

- **Channels:** the pose has four channels: `x` / `y` (pointer angles), `a` (active amount, 0..1) and `f` (float amount, 0..1). Lift is `a × lift`, scale is `1 + (scale − 1) × a`, and layer depth is `a × depth`.
- **Target:** the pointer position across the stage on a −1..1 scale gives `x = −y × maxTilt` and `y = x × maxTilt`, with `a = 1`. `axis` zeroes the angle it leaves out, and `reverse` flips the sign of both. Leaving sets `x`, `y` and `a` back to 0.
- **Smoothing:** a `requestAnimationFrame` loop moves each channel by `1 − e^(−dt / smoothing)` of the remaining distance, so the speed is the same at any refresh rate. A stalled frame counts as at most 100ms. The loop stops once every channel is within `SETTLE`. The transform is written straight to the element, so the card never re-renders while it moves.
- **Float:** sway and bob are scaled by `f × (1 − a)`, so they fade out while the pointer drives the card and ease in and out when `float` toggles. While floating the loop keeps running, but an `IntersectionObserver` pauses it while the card is off screen.
- **Rest:** with every channel at rest, the inline transform and variable are cleared, so a resting card has no transform at all.

Transform order: `translateY(bob) rotateX rotateY translateZ(lift) scale`.

## Input

- **Mouse and pen** tilt on hover (`pointermove`) and reset on `pointerleave`.
- **Touch** uses a short hold. A swipe over the card scrolls the page as usual. A finger resting on it for `HOLD_DELAY` (300ms) without drifting more than `HOLD_SLOP` (8px) picks the card up:
  - The card lifts, and a `HOLD_BUZZ` (10ms) vibration plays where supported. Android vibrates; iOS has no Vibration API, and Chrome ignores it before the page's first tap.
  - From then on the finger tilts the card on both axes, continuously, until it lifts.
  - Tilt mode runs on native touch events, not pointer events. iOS still reads the blocked swipe as a pan and sends `pointercancel` mid-tilt, while touch events keep coming until the finger lifts. So `touchmove` aims the card, `touchend` / `touchcancel` end tilt mode, and `pointercancel` / `pointerleave` are ignored while it's on. Pointer events still run the hold itself.
  - Touch events stay on the element the finger landed on, so the tilt keeps following past the card's edge (clamped at `maxTilt`). The pointer is also captured.
  - Page scroll is blocked only during tilt mode. The same non-passive `touchmove` listener calls `preventDefault()`, because `touch-action` is fixed the moment the finger lands, before a hold can be told from a scroll.
  - The native listeners are bound once, so `aim` reads `axis`, `maxTilt` and `reverse` from the `live` ref, and the listeners call the latest `aim` / `release` through a ref.
  - During the hold and tilt, the stage gets `data-user-select="none"` (written to the element, no re-render), and the context menu is blocked. The iOS callout is already off globally in `base.css`.
  - The click that follows lifting the finger after a tilt is swallowed in the capture phase, so a tilt never taps a link or button on the face.
  - A finger that moves before the hold completes is a scroll. The browser sends `pointercancel`, and the hold is dropped.
  - Only the primary touch counts.
- **Reduced motion** (`prefers-reduced-motion: reduce`, watched live) and `disabled` both cancel the loop, turn float off and drop the card flat at once.
- The effect is decorative: no focus stop and no ARIA. Focusable content inside the card works as usual.

## Patterns in use

- `template/TiltedCard.tsx`: the demo page. The large card has live controls in a 300px grid: Axis (popover selector); Reverse, Idle Float and Depth Layers (switches); and Tilt, Lift, Scale, Perspective and Smoothing (tick sliders). Copy Parameters copies the props, and Reset appears after a change. Its face is `MainCardFace`, with the title (20px) and photo (30px) in `TiltedCardLayer`s; Depth Layers turns that depth on. It's demo markup, so it isn't copied. A Demo selector under the description switches the stage between Card (`MainCardFace`) and Gallery (three 200px cards with their own plain face, `CardFace`, so the two can be styled separately). A third option, Product, shows a single blank 300px 3:4 card (`ProductCardFace`), reserved for a buds configurator demo. Every control applies to all three; Depth Layers only affects Card. Reset and Copy Parameters both leave the selector alone, and switching it doesn't count as a change, so it doesn't show Reset.

## Known issues

1. ~~**Smoothing depends on frame rate.**~~ Fixed: easing is time-based (`smoothing` ms time constant).
2. **`perspective` is only as good as the CSS.** It goes straight into `data-perspective`, and `control.css` only defines 300, 500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000 and 5000. Any other value silently does nothing.
3. **Touch tilt needs a hold.** It isn't discoverable: nothing tells a phone user to hold the card. The hold delay isn't a prop yet. Device-orientation tilt is a possible later addition. (Earlier, touch tilt reset as soon as the page started to scroll; the hold fixes that.)
4. **Lift can be clipped.** A `data-contain` (overflow hidden) ancestor close around the card cuts off its corners while it's tilted and lifted. Leave some space around it.
5. **The stage size sets the tilt area.** See Usage: an unsized stage can be far wider than the card.
6. **Layers flatten silently.** A `data-contain`, `data-opacity` or missing `preserve-3d` anywhere between the card and a layer turns the layer flat with no warning.
7. **Layer depth is an inline style.** `TiltedCardLayer` writes `translateZ(calc(var(--tilted-card-active) × depth))` inline, because the depth is free-form; there's no `data-*` attribute for it.
8. **Controls are copies.** The demo's slider, selector and switch markup duplicates the Carousel page's. Extracting shared controls is planned separately.
