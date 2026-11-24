# Snackbar

How the snackbar in `components/snackbar/` works. Read this before touching it or adding a message.

## What it does

Shows a short message at the bottom center that goes away on its own. It's the only way the site gives feedback: no `alert()` and no custom toasts. It's for information only: the stack ignores the pointer (`pointer-events: none`), so a snackbar can't hold links or buttons.

## Parts

All but `Snackbar` are in `SnackbarContainer.tsx`.

1. **`SnackbarProvider`:** holds the list of messages sent from inside it. Shows nothing by itself.
2. **`SnackbarStack`:** shows the nearest provider's messages where it's placed. It takes no height, and they grow upward from it. Throws outside a provider.
3. **`SnackbarContainer`** (default export): a provider with the stack after its children. Use this unless the stack has to be somewhere else.
4. **`useSnackbar()`:** returns `{ addSnackbar }`. Throws outside a provider.
5. **`Snackbar`** (`Snackbar.tsx`): one message. It runs its own timer and asks the provider to remove it.

`index.tsx` wraps the whole app in a container, outside `ThemeProvider`, because the theme code shows snackbars too. A nested container or provider catches the messages of everything inside it: `template/quickDemos.tsx` uses one to keep the Calculator demo's messages in its card. Nothing at the call site shows this: to know where a message lands, find the nearest provider (or container) above the component, then its stack. Portals (popovers, modals) don't change it, because context follows the component tree. So the Calculator in a popover, with no container of its own, shows its message at the bottom of the screen.

The CSS is in `styles/base/project.css` (search for "snackbar"). The demo is `template/SnackbarPropsDemo.tsx` on the Snackbar page; its preview is a nested provider with its own stack.

## Usage

```tsx
const { addSnackbar } = useSnackbar();

addSnackbar("Link copied to clipboard", 1000);

addSnackbar(
  <text>
    <text data-opacity="60">Theme changed to </text>
    <text data-weight="700">Dark</text>
  </text>,
  1000,
  "theme",
  true,
);
```

| Argument | Default | Meaning |
|---|---|---|
| `message` | | What to show: a string or JSX. Plain strings wrap, `<text>` doesn't (see Known issues). |
| `duration` | `3000` | Ms before it starts to leave. |
| `source` | | A name for a group of messages. Keep it unique to the feature (`"paint-share"`). |
| `clearPrevious` | `false` | Removes earlier messages with the same `source` first. Does nothing without one. |

Use `source` with `clearPrevious` for anything that can fire repeatedly (toggles, pickers), so messages replace each other instead of piling up.

Don't call `addSnackbar` inside a state updater (`setX(prev => …)`): StrictMode runs updaters twice in development.

To choose where the stack goes, use the two parts:

```tsx
<SnackbarProvider>
  <group data-fit="1" data-contain="" data-align="end">
    <SnackbarStack />
  </group>
  <Controls />
</SnackbarProvider>
```

Use exactly one stack per provider. With two, each message shows twice, and the first to finish removes both. With none, messages are kept without showing, because the timers are in `Snackbar`.

## Lifecycle

1. `addSnackbar` gives the message an id from a counter and appends it. The stack grows upward, with the newest at the bottom.
2. It appears with the `snackbar-appear` animation (325ms).
3. After `duration` it gets `snackbar-exit` (fades and moves up, 125ms).
4. 300ms after that it's removed from the list.

A message cleared by `clearPrevious` skips 3 and 4 and disappears at once.

## Details to keep

- **Ids** come from a counter, not a timestamp. Two messages added in the same millisecond must not share an id, or they get the same React key and the first to close removes both.
- **Two contexts:** `addSnackbar` is in one and the list in the other, which only the stack reads. Both values are memoized, and `addSnackbar` never changes. So showing or removing a message doesn't re-render the components that call `useSnackbar()`, and it's safe in dependency arrays.
- **`onClose` is stable too.** The timer effect depends on it, so a new identity would restart the timers.
- **Position:** absolute at the bottom of a zero-height, relative wrapper, wherever the stack is placed (after the children in `SnackbarContainer`). In the app's stack, `z-index: 9999` puts it above modals (9995).

## Accessibility

The wrapper is a polite live region (`aria-live="polite"`). It's mounted as long as the stack is, even when empty, because screen readers only announce changes to a region that already exists.

`aria-atomic="false"` and `aria-relevant="additions"` limit it to newly added messages: the rest of the stack isn't read again, and neither is text that changes inside one (the demo's countdown). `role="status"` isn't used because it implies `aria-atomic="true"`.

## Known issues

1. **Long `<text>` is cut off.** `<text>` doesn't wrap and the snackbar clips its overflow, so long JSX messages can lose their end on phones. Use `data-wrap="wrap"` or `data-ellipsis=""` on the text.
2. **Short messages:** many last 1 second, failures included. They can't be paused or dismissed.
3. **No exit on replace:** `clearPrevious` removes without animating.
4. **No limit:** most copy messages pass no `source`, so repeated clicks pile up.
5. **Reduced motion** isn't handled, for the entrance or the exit.
6. **No safe-area spacing** for the home bar in the installed app.
7. **Two exit times:** the fade takes 125ms (CSS) but removal waits 300ms (`exitDuration`), so the stack keeps an empty slot in between.
8. **`setTheme` breaks the updater rule:** `setThemeWithValidation` in `ThemeProvider.tsx` calls `addSnackbar` inside its updater. `clearPrevious` hides the duplicate.
9. **Legacy markup:** the classes `snackbar-container`, `snackbar` and `snackbar-exit`, a plain `<div>`, and CSS in `project.css` instead of `styles/controls/`.
10. **Hard-coded color:** `data-background="snackbar"` is `#2d2d2d` in every theme, same as the tooltip.
11. **Clip radius:** `clip-path` rounds to 10px while the snackbar has `data-radius="15"`.
12. **Dead stub:** the `addSnackbar` function at the bottom of `ThemeProvider.tsx` throws, but is never called.
