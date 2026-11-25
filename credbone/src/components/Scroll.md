# Scroll

How the scroll strip in `components/scroll.tsx` works. Read this before touching it or adding one.

## What it does

Makes a row (or column) of items scrollable, with arrow buttons, an edge fade, mouse drag and a glide after a flick. Used by tab strips, the theme picker, paint swatches, the tool pattern pickers and the content slide.

It has ends. For content that loops, use [Marquee](Marquee.md). The two share the same drag and flick values but no code: the marquee moves a transform, this one moves the real scroll position, so keyboard scrolling, `scrollTo` and `scrollIntoView` all work on it.

## Parts

1. **Root** (`.snapcont`): clips and holds the arrows. Carries `left` / `right` while there's content beyond that edge, which drives the fade.
2. **Wrapper** (`.snapscroll`): carries `dragging`.
3. **Scroll element:** the first child passed in. This is what scrolls. Pass one element.
4. **Arrow buttons:** hidden at the ends and on mobile.

The CSS is in `styles/controls/scrollbar.css`.

## Usage

```tsx
<group data-scroll-mask="false">
  <Scroll wheelEnabled buttonProps={{ "data-hide": "true" }}>
    <group data-wrap="no" data-gap="15">…items…</group>
  </Scroll>
</group>
```

## Props

| Prop | Default | Meaning |
|---|---|---|
| `children` | | One element, which becomes the scroll element. |
| `vertical` | `false` | Scroll up and down. |
| `wheelEnabled` | `false` | Let a vertical wheel scroll it sideways. Horizontal only. |
| `buttonProps` | | Extra props for both arrows. |
| `className` | | Goes on the wrapper. Used by the tab strip. |

Set on an ancestor: `data-scroll-mask="false"` (no fade), `data-snap-button="compact" | "15" | "30"` (arrow position).

## How it moves

- **Drag:** mouse only. Touch and pen scroll natively, with their own momentum. A press becomes a drag after 5px, and the pointer is captured only then, because capturing on press would take clicks from items. Move and release are listened to on the document, so a fast flick can leave the strip.
- **Clicks:** the click after a drag is swallowed, and so is one that catches a strip gliding faster than 100px/s. Slower, it still selects.
- **No drag** starts on inputs, selects, text areas, sliders, editable text or `draggable="true"` items.
- **Glide:** the release speed, measured over the last 100ms, capped at 3000px/s, slowing over a 325ms time constant (about 975px at most). A 60ms pause before release makes it a plain drop. By elapsed time, so it's the same at any refresh rate.
- **Ends** are a hard stop, by design.
- **Stopped by** a press, wheel, key, arrow button, or anything else that moves the scroll position by more than 2px.
- **Arrows** page by 80% of the visible size.
- **Wheel:** at an end, or with nothing to scroll, the page scrolls instead. Sideways wheels and ctrl + wheel are left to the browser.
- **Arrow and fade state** updates once per frame and re-renders only when it changes.
- **Reduced motion:** drag works, with no glide.

## Known issues

1. **The scroll element is found once, on mount.** Replacing the child with another element leaves the strip listening to the old one.
2. **`data-scroll-type="snap"`** (unused) would fight the drag and stop the glide early.
3. **Nested strips** on the same axis both move on a drag.
4. **Content that changes size on its own**, with no render, resize or scroll, doesn't update the arrows.
5. **Wheel scrolling** moves in raw steps and doesn't glide.
6. **Arrow buttons** scroll smoothly even with reduced motion.
