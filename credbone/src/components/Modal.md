# Modal

How the modal system works in `components/Modal.tsx`. Read this before touching modals or adding one.

## Two parts

1. **`ModalProvider`:** owns a stack of open modals and renders them. It wraps the app in `App.tsx`.
2. **`Modal`:** the dialog itself. Pages never render it directly; they go through `useModal()`.

## Usage

```tsx
import { useModal } from "../components/Modal";

const { openModal, closeModal } = useModal();

openModal({
  id: "modal-import",
  title: "Import Raw Data",
  content: <MyContent onDone={() => closeModal("modal-import")} />,
  customAttributes: { "data-max-length": "500" },
});
```

`useModal()` throws if it's called outside `ModalProvider`.

`updateModal(id, options)` merges new options into an open modal, e.g. from controls inside its content: `updateModal("modal-map-0", { draggable: false })`. The demo's Basic Modal (`template/Modal.tsx`, `BasicModalOptions`) uses it for its drag, dim and fullscreen toggles. Turning `fullscreenbutton` off restores a maximized panel to its initial size. Turning drag off recenters a moved panel.
## `openModal` options

| Option | Default | Effect |
|---|---|---|
| `id` | required | Key used by `closeModal(id)` and as the React key |
| `title` | required | Header text |
| `content` | required | ReactNode rendered inside the panel |
| `hasHeader` | `true` | Title bar with the close button |
| `hasToolbar` | `false` | Cancel / OK footer |
| `dimClose` | unset | Whether a backdrop click closes the modal. Unset falls back to the header/toolbar rule (see Closing) |
| `fullscreen` | `false` | Starts maximized |
| `fullscreenbutton` | `false` | Shows the maximize / minimize toggle in the header |
| `draggable` | `true` | Panel can be dragged by its header (see Dragging) |
| `customAttributes` | `{}` | `data-*` attributes spread onto the panel, last, so they override its defaults |
| `dimAttributes` | `{}` | `data-*` attributes spread onto the backdrop |
| `spacing` | `20` | `data-space` of the outer layer, i.e. the gap between panel and viewport |
| `onClose` | unset | Called when the user closes the modal (Esc, header X, toolbar, backdrop), just before it's removed. Not called by `closeModal(id)` |

## Provider behavior

- **Stack:** `openModal` appends an entry to `modals[]`, and `closeModal(id)` removes it. Closed entries are filtered out right away, so every entry is open.
- **Topmost:** the last entry. Only the topmost modal reacts to Esc, so stacked modals close one at a time.
- **Wrapper:** everything renders inside `<div data-name="modal-wrapper">`, which `controls/popup.css` puts at `z-index: 9995`.
- **Route change:** a `pathname` change clears the modals that were open before it. A modal the new page opens while mounting is kept, so a link from another page to `?demo=paint` lands with Paint open (child effects run before the provider's, so clearing everything would wipe it). A change to the query string or hash alone keeps them all, so `?item=` / `?demo=` deep links (`template/Cards.tsx`, `template/quickDemos.tsx`) can open and close a modal without wiping it. Search links to Paint this way (`pages/search/routesData.ts`).

## Modal layers

1. **Outer `group`:** absolute, full size, centered column, padded by `spacing`.
2. **Backdrop `group`:** `data-background="modal-backdrop"` (`var(--dim)`) + `dimAttributes`.
3. **Panel `group`:** `data-background="context"`, `data-radius="20"`, `data-elevation="2"`, `data-max-height="fit"`, `data-contain=""`. Width is `auto`, or `fit` when maximized. Then `customAttributes`.
4. **Header** (`hasHeader`): ellipsized title, optional maximize toggle with tooltip, a separator, the X button, then a horizontal separator.
5. **`content`**.
6. **Toolbar** (`hasToolbar`): two 60px `Ripple` buttons, Cancel (neutral) and OK (`main`).

The maximized state is local to each `Modal` and starts from `fullscreen`.

## Dragging

- **Handle:** the header only. Active when `draggable` and `hasHeader` are on and the modal isn't maximized; headerless modals (search) never drag.
- **Input:** pointer events with pointer capture, so mouse, touch and pen all work. A press that starts anywhere in the header's right-side controls group (`controlsRef`: maximize, separator, close) is ignored, so those buttons click normally. A tag selector like `button` wouldn't work here: `Button` renders a `<div class="button">` unless `type="button"` is passed.
- **Header attributes while active:** `data-touch-action="none"` (no page scroll on touch), `data-user-select="none"`. No drag cursor, by choice.
- **Offset:** kept in a ref and written to the panel's `style.translate`, so content doesn't re-render while dragging. It uses `translate`, not `transform`, because the entrance animations animate `transform`.
- **Bounds:** the modal's outer layer, inset by its padding (`spacing`), so a dragged panel keeps the same edge gap as a centered one. `clampOffset` is shared by dragging and resizing. An axis where the panel is bigger than the bounds snaps back to 0.
- **Resize:** a `ResizeObserver` on the layer and the panel re-clamps the offset. A panel that still fits stays put; a clipped one moves just far enough back in. This covers window resize, content growing and font-size changes.
- **Double-click:** with `fullscreenbutton` on, double-clicking the header (outside the controls) toggles maximize / restore, like a window title bar. It works while maximized too, even though dragging doesn't.
- **Reset:** maximizing resets the offset to center. Each open starts centered, since the offset lives in the `Modal` instance.

## Closing

- Esc (topmost only)
- The header X
- Either toolbar button (both just close)
- Backdrop click: `dimClose` decides when it's set. When it's unset, **only when both `hasHeader` and `hasToolbar` are off**, since then there may be no other way out. A headerless modal with its own close button (Paint in `template/quickDemos.tsx`) passes `dimClose: false`.
- All of the above call the `onClose` option first. `closeModal(id)` from code doesn't.

## Patterns in use

- **Headerless, full-screen overlay** (`pages/search/Searchshortcutlistener.tsx`): `hasHeader: false`, `spacing: 0`, and `customAttributes` that clear the radius, background and elevation so the content draws its own surface.
- **Entrance animation** (`template/Modal.tsx`): pass `data-animation-name` / `data-fill-mode` / `data-animation-duration` through `customAttributes`.
- **Custom action buttons** (`template/dotDisplayEdit.tsx`): leave `hasToolbar` off and build the buttons inside `content`, calling `closeModal(id)` yourself.
- **Live content** (`template/Cards.tsx`): `content` is a component that holds its own state (see known issue 2).
- **URL-driven modal** (`template/Cards.tsx` `?item=`, `template/quickDemos.tsx` `?demo=paint`): an effect on the search params opens the modal when the param appears and calls `closeModal` when it goes, with a ref so it opens only once. Opening, Back and deep links all go through the URL. Pass `onClose` so Esc also clears the param. Quick Demos also remembers whether Launch pushed the history entry: if it did, Exit calls `navigate(-1)` so Back doesn't reopen; for a direct link it removes the param with `replace`.

## Known issues

1. ~~**Search: Ctrl+K stops working after Esc.**~~ Fixed 2026-11-07: `openModal` now has `onClose`, and the `onClose` that `Searchshortcutlistener.tsx` already passed resets `isSearchOpen`. The `as ModalControls["openModal"]` cast is still there and still hides type errors.
2. **`content` is a snapshot.** It's stored in provider state when the modal opens, so it won't re-render when the opener's state changes. Anything dynamic has to live in a component inside the modal.
3. **No duplicate-id guard.** Opening the same `id` twice gives duplicate React keys, and the two close together.
4. **The `id` prop on `Modal` is unused.** (`dimClose` used to be missing from `openModal` too; fixed 2026-11-04.)
5. **The toolbar can't confirm anything.** OK and Cancel both call `onClose`; there's no `onConfirm`. It's only useful for demos.
6. **Leftover code:** `className="modal-container"` has no CSS behind it; `data-modal-backdrop="dark"` in the search config lands on the panel and has no CSS either; some blocks are commented out.
7. **Accessibility:** no `role="dialog"` / `aria-modal`, no focus trap, and focus isn't returned to where it was on close.
8. **Cards: closing adds a history entry.** Closing a card modal calls `setSearchParams({})`, which pushes, so Back afterwards reopens the item. Quick Demos' `navigate(-1)` pattern would fix it.

For 5: add an optional `onConfirm` next to `onClose`.
