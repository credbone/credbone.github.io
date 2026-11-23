# Marquee

How the marquee in `components/Marquee.tsx` works. Read this before touching it or adding one.

## What it does

Scrolls its children sideways in a seamless loop. By default only content that doesn't fit scrolls; with `loop="always"`, short content repeats to fill the width (ticker, logo strip). It can be paused, dragged and flicked. Horizontal only, by design.

## Parts

1. **Root:** the outer `<group>`. Clips, catches the pointer and carries the edge fade. Gets any extra props.
2. **Track:** gets an inline `transform`, written through a ref.
3. **Item:** the real children, `max-content` wide.
4. **Copies:** the children rendered again, `period` px apart. They're out of flow (absolute), so repeating never changes the marquee's own size.

The CSS is generic: `data-mask="start-end"` (`control.css`) and `data-width="max-content"` (`group.css`). `data-mask="end"` is the old resting fade, now used only by the theme picker.

## Usage

```tsx
<Marquee auto={isActive}>
  <text>{title}</text>
</Marquee>

<Marquee auto loop="always" speed={60} gap={30} draggable>
  <group data-gap="30" data-wrap="no">…logos…</group>
</Marquee>
```

## Props

| Prop | Default | Meaning |
|---|---|---|
| `children` | | The content. Rendered more than once while repeating. |
| `auto` | `false` | Scroll on its own. When off, it scrolls only under a mouse or pen. |
| `speed` | `90` | Px per second. Changes ease in. |
| `reverse` | `false` | Scroll against the reading direction. |
| `loop` | `"overflow"` | `"overflow"` scrolls only content that doesn't fit; `"always"` repeats it to fill. |
| `delay` | `0` | Ms to hold before scrolling and after each loop. It slows into the hold. |
| `gap` | `20` | Px between the content and its repeat: 0, 5, 10, 15, 20, 30 or 50. |
| `pauseOnHover` | `true` | Slow to a stop under a mouse or pen. Only in `auto` mode. |
| `draggable` | `false` | Drag or swipe. Not the native HTML attribute. |
| `fade` | `true` | Fade the edges while the marquee can scroll. |

Other props go on the root, except the handlers the marquee needs itself (pointer, focus, blur, scroll, click capture, drag start), which the type leaves out.

## How it moves

- **State:** position (0..`period`, where `period` = content width + gap) and velocity, both along the reading direction. Positive is forward: left in LTR, right in RTL.
- **Loop:** `requestAnimationFrame`. Velocity eases toward a target (`speed`, or 0 when paused, held or inactive) by elapsed time, so it's the same at any refresh rate. The transform is written straight to the element; nothing re-renders as it moves.
- **Sleep:** the loop stops at rest, while held, while pressed and while off screen (`IntersectionObserver`).
- **Stop:** when `auto` turns off or the mouse leaves, it eases to whichever of the start and the loop point is nearer. They look the same.
- **Copies** exist only when needed: always for `loop="always"` and `draggable`, otherwise only while away from rest. So idle nav titles have no extra DOM.
- **Fade:** `--mask-start` follows the position up to 20px, so a resting title isn't faded at its first letter.
- **Measuring:** a `ResizeObserver` on the root and item. The item width is read unrounded, or the loop point would jump.
- **Text direction** is re-read on every render and follows any ancestor's `dir`.

## Input

- **Hover** ignores touch, so a tap doesn't leave it stuck.
- **Drag:** a press stops it, and 5px of movement makes it a drag. The pointer is captured only then; capturing on press would take clicks from links. The click after a drag is swallowed.
- **Flick:** measured over the last 100ms, capped at 3000px/s. It settles back to the normal speed and direction.
- **Touch:** `data-touch-action="pan-y"`, so vertical swipes still scroll the page.
- **Keyboard:** focus inside stops the motion and brings the focused item into view. Copies are `aria-hidden`; their links stay clickable but are out of the tab order.
- **Native scrolling** of the root (focus, find in page) is turned into a position.
- **Reduced motion:** no auto or hover scrolling, no flick, no animated return. Dragging works.

## Known issues

1. **Children render more than once.** Stateful children aren't in sync between copies, and ids are duplicated.
2. **`tabindex` on copies is set after each marquee render.** A child that adds a focusable element on its own later is missed until the next one.
3. **Start padding larger than `gap`** shows the tail of the previous repeat disappearing inside the padding as the loop restarts. Keep `gap` at least as large.
4. **Copies are capped at 40**, so very small content in a very wide container can leave a hole.
5. **A `dir` change that doesn't re-render the marquee** isn't picked up until its next render. The fade's RTL rule also needs `dir` on an ancestor, not on the marquee itself.
6. **Don't justify the root** (`data-justify="center"`): overflowing content would start off-center.
