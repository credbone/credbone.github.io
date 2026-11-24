# Tooltip

How the tooltip in `components/tooltip.tsx` works. Read this before touching it or adding one.

## What it does

Shows a short hint next to its trigger on hover, touch hold or keyboard focus. It's for information only: the bubble ignores the pointer (`pointer-events: none`), so it can't hold links or buttons. Use `Popover` for those.

## Parts

1. **Trigger:** the single child, cloned with a ref, focus and pointer handlers and `aria-describedby`. No wrapper is added.
2. **Bubble:** a `<group>` portaled into `#tooltip-container` (`index.tsx`), so no parent can clip it. It exists only while shown.

The CSS is in `styles/controls/tooltip.css`, and the fade-in is `data-animation-name="tooltip"` (`animation.css`).

## Usage

```tsx
<Tooltip content="Clear" delay={300}>
  <group data-interactive="" data-cursor="pointer">…</group>
</Tooltip>

<Tooltip content="Primary" placement="right" data-background="main" data-color="main-text">
  <group>…</group>
</Tooltip>
```

The child must be one element that accepts a ref and these props: a tag, or a component that forwards them (`Button`, `Link`). `Ripple` doesn't, so put it inside the trigger, not between it and the tooltip.

The bubble lives outside the trigger's tree, so a nested `data-theme` around the trigger doesn't reach it.

## Props

| Prop | Default | Meaning |
|---|---|---|
| `content` | | What to show. Empty (`""`, `null`) turns the tooltip off. |
| `children` | | The trigger. |
| `placement` | `"top"` | `"top"`, `"bottom"`, `"left"`, `"right"`, `"auto"` (top if it fits, otherwise bottom) or `"cursor"` (follows the mouse; `"auto"` on touch and keyboard). |
| `distance` | `10` | Px to the trigger. Negative overlaps it. `"cursor"` uses it only when it falls back to `"auto"`. |
| `delay` | `0` | Ms before showing. Hiding is instant. |

Other `data-*` props go on the bubble and override its defaults: `data-background="tooltip"`, `data-color="white"`, `data-radius="10"`, `data-space="12"`.

## When it shows

- **Mouse:** on enter, until leave.
- **Touch:** after holding 300ms plus `delay`, until the finger lifts.
- **Keyboard:** while the trigger, or something inside it, has `:focus-visible`. Focus from a click doesn't count, except in text fields, where browsers always set it.
- **Both:** hover and focus are tracked separately, and it stays until neither holds it. Pressing the trigger ends the focus hold, so it then hides when the pointer leaves.
- **Dismissed by:** Escape, a press or click outside the trigger, or scrolling outside it. While keyboard focus holds it, scrolling moves it instead, because tabbing to an element scrolls it into view.

Focus events bubble through React portals, so focus inside a popover or modal opened from the trigger is ignored.

## How it's positioned

- **Measuring:** it renders, is measured and is placed in a layout effect, before paint. It's measured with `left: 0`, since near the right edge the width would be squeezed.
- **Repositions** when `content`, `placement`, `distance` or the window size changes.
- **Coordinates:** viewport values on an absolute element. That's safe only because `html` and `body` don't scroll.
- **Edges:** kept at least 10px from the screen edge, or `distance` if that's larger.
- **Cursor:** up and to the right of the mouse. With no mouse over the trigger (touch hold, keyboard focus) it's placed like `"auto"`.

## Accessibility

The bubble has `role="tooltip"`, and the trigger gets `aria-describedby` while it's shown, added to any it already has. That's a description, not a name: icon-only triggers still need their own `aria-label`.

## Known issues

1. **Only focusable triggers work by keyboard.** Many are plain `<group>`s without a `tabIndex`.
2. **`aria-describedby` goes on the trigger.** When the focusable element is inside it (the input in a checkbox label), screen readers may not read it.
3. **Fixed placements don't flip.** They're clamped to the screen edge, so they can cover the trigger.
4. **`"cursor"` near edges:** no left limit, and near the top it's clamped onto the cursor.
5. **Pen input** never opens it.
6. **Not repositioned** when the trigger moves without a scroll or resize, or the bubble changes size on its own (a loaded image, changed `data-*` props).
7. **Following on scroll:** held by focus, it stays at the screen edge if the trigger is scrolled out of view.
8. **Escape** isn't stopped, so anything else listening for it also reacts.
9. **Every instance** keeps a document `pointerdown` listener while closed, and `"cursor"` ones a `mousemove` listener.
10. **`content` is `any`:** `0` renders a stray "0" on the page.
11. **A passed `style`** replaces the computed position.
12. **The child's own ref and pointer handlers** are overwritten, so a `Button` in a tooltip loses its press ink. `onFocus` and `onBlur` are kept.
13. **Hard-coded color:** `data-background="tooltip"` is `#2d2d2d` in every theme.
14. **Legacy class:** `tooltip` carries the base styles. The placement class after it does nothing.
15. **`tooltip.css`** declares `max-width` twice and also holds popover styles.
16. **Long `<text>` is cut off** unless it has `data-wrap="wrap"`.
