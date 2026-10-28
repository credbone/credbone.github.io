# Colors, Themes & Variables

How the color system works end to end. Read this before touching theming, palette or color tokens.

## Two independent axes

1. **Palette:** which colors are used. It comes from two user-picked hex values, primary and secondary.
2. **Mode:** light or dark. It's set by `data-theme` on `<html>`, with the values `light`, `dark` or `auto`.

They're set separately and only combined in CSS.

## Palette pipeline

### `styles/skin.ts`
- The defaults are `#5f6040` (Olive) and `#AA562C` (Copper).
- `getPalette(primary, secondary?)` uses `shade-generator` to expand each base color into 10 shades: UltraLight(10), Lightest(20), Lighter(40), Light(60), Soft(80), **base**, Deep(300), Dark(500), Darker(700), Darkest(900). If no secondary is given, it uses the inverted RGB complement of the primary.
- `getCSSByPalette()` turns the palette into a `:root { … }` string containing:
  - `--main-color`, `--main-color-{ultra-light|lightest|lighter|light|soft|deep|dark|darker|darkest}`, and the same set for `--secondary-color-*`.
  - Alpha variants built by appending a hex alpha: `--main-color-alpha-15` (`…26`), `--main-color-alpha-50` (`…80`), `--main-color-light-alpha-15/50` and `--secondary-color-alpha-15/50`.
  - Text-on-color tokens that depend on luminance (`isColorLight`, threshold 0.55): `--main-color-text`, `--main-color-font` and `--secondary-color-text`.

### `components/ThemeProvider.tsx` (wraps the app in `index.tsx`)
- **State:** `theme` (a `ColorPalette`) and `themeMode` (a string).
- **Apply palette:** writes the CSS string into `<style id="theme-styles">` in `<head>`. It also sets `data-main-color-luminance` and `data-secondary-color-luminance` (`light`/`dark`) on `<html>`.
- **Apply mode:** sets `data-theme` on `<html>`.
- **Persistence:** `localStorage` keys `selectedColors` (the full palette JSON) and `themeMode`. Hex values are validated and normalized on load and on every `setTheme`; bad data shows a snackbar and falls back to the defaults.
- **Cross-tab sync:** a `storage` event listener.
- **Reset:** `resetTheme()` clears both keys and goes back to the default colors plus `light`.
- **API:** `useTheme()` returns `{ theme, setTheme, themeMode, setThemeMode, resetTheme }`. The pickers (`RichThemePicker`, `CustomColorPicker`, `themeToggle`, settings page) all go through it.

### `styles/paletteUtils.ts`
- `usePaletteActions()` exports the palette as SVG (download or copy). It maps the shade keys to 50–900 numbers.

## Static variables (CSS)

| Group | Light (default) | Dark |
|---|---|---|
| Surfaces / text: `--background`, `--context`, `--foreground`, `--highlight`, `--border-color`, `--text-color`, `--outline`, `--backdrop`, `--overlay`, `--dim`, `--elevation_*` | `:root` in `base/control.css` and `base/project.css` (split) | `[data-theme="dark"]` in `base/project.css`, duplicated under `@media (prefers-color-scheme: dark) [data-theme="auto"]` |
| Neutral scale `--neutral-color-*` | `:root` in `controls/color.css` | Inverted dark values under `[data-theme="dark"]:root` and the `auto` media block in the same file |
| Hover / press `--over-color`, `--press-color` | Main alpha-15 gradient. Overridden by `data-over-color="secondary"`, `"neutral"` or `"neutral-10"` | Same |
| Fixed base colors `--red`, `--rich-raspberry`, … (each with `-light`, `-lighter`, `-dark`, `-darker`) | `controls/base_colors.css` | Don't change |

**Dark mode and the brand color:** with a *dark* primary in dark mode, `--main-color-font` and `--main-color-alpha-*` switch to the `-light` shade so they stay readable. The rule is in `controls/color.css` and is keyed on `data-theme` + `data-main-color-luminance`.

## Tints & Blend (computed in CSS)

These are defined in `controls/color.css` and computed by the browser from the theme tokens, so they follow palette changes and light/dark mode automatically. They're shown on the Colors page as the Tints and Blend sections, where clicking a swatch copies the CSS expression.

| Token / attribute value | Definition |
|---|---|
| `main-tint-5/10/20`, `secondary-tint-5/10/20` (Whisper / Wash / Tint) | `color-mix(in oklch, var(--main-color) N%, var(--context))`: a brand wash over the surface that turns into a dark colored surface in dark mode |
| `blend-25/50/75` (Primary Lean / Midpoint / Secondary Lean) | `color-mix(in oklch, var(--main-color), var(--secondary-color) N%)` |

- **Usage:** `data-background="main-tint-10"` etc. The blends also exist as `data-color` values. In custom CSS, use `var(--main-tint-10)`.
- **Fallbacks:** the variables first get older tokens (`-lightest`, `-lighter`, main/secondary). They're redefined inside an `@supports` block, so older browsers get a close color instead of a transparent background.
- **Caveat:** the variables resolve on `:root`. A subtree that overrides `--context` won't change the tints.

## Usage in markup

- **Backgrounds:** `data-background="main | main-light | secondary-dark | neutral-lighter | context | main-background | highlight | adaptive-gray | main-alpha-15 | red-light …"`
- **Text:** `data-color="text | main | main-text | secondary-text | neutral-* | reset"`
  - `data-color="main"` resolves to `--main-color-font`, not `--main-color`. The raw base color is `data-color="main-color"`.
  - `main-text` and `secondary-text` are the readable foreground colors on a filled `main` or `secondary` background.
- **SVG:** `data-fill` and `data-stroke` cover a smaller subset of tokens.
- **Misc:** `data-brightness="adaptive"` dims images in dark mode, and `data-color="reset"` resets to `--text-color` in dark mode.

## Known issues (not fixed yet)

- [ ] **Colors page, auto mode:** `neutralHex()` in `template/Colors.tsx` only checks `themeMode === "dark"`. In `auto` mode with an OS dark theme, the swatch renders dark but shows and copies the *light* hex.
- [ ] **Dead code:** at the bottom of `ThemeProvider.tsx` there's a stub `addSnackbar` that throws. The real one from `useSnackbar()` shadows it, so it never runs and can be deleted.
- [ ] **Duplicated values that can drift apart:**
  - The neutral hex values are in both `controls/color.css` and `NeutralShades` in `template/utils/colorData.ts`.
  - The base colors are in both `controls/base_colors.css` and `BaseColors`.
  - The dark surface block is written twice, once for `dark` and once for `auto`.
- [ ] **Naming mismatch:** `data-background="pink"` maps to `--rich-raspberry`, and `"purple"` maps to `--royal-violet`. The CSS variable names don't match the attribute and data names.
- [ ] **Light tokens are split:** they're defined in both `control.css` and `project.css` `:root`. The dark tokens all live in `project.css`.
