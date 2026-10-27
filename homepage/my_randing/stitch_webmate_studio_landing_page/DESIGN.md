---
name: Webmate Editorial Studio
colors:
  surface: '#f9f9fa'
  surface-dim: '#dadadb'
  surface-bright: '#f9f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeef'
  surface-container-high: '#e8e8e9'
  surface-container-highest: '#e2e2e3'
  on-surface: '#1a1c1d'
  on-surface-variant: '#47464b'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#77767b'
  outline-variant: '#c8c5cb'
  surface-tint: '#5f5e61'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1e'
  on-primary-container: '#858387'
  inverse-primary: '#c8c5ca'
  secondary: '#5d5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1ec'
  on-secondary-container: '#63646c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b16'
  on-tertiary-container: '#88837c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e1e6'
  primary-fixed-dim: '#c8c5ca'
  on-primary-fixed: '#1b1b1e'
  on-primary-fixed-variant: '#47464a'
  secondary-fixed: '#e3e1ec'
  secondary-fixed-dim: '#c6c5cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#46464e'
  tertiary-fixed: '#e8e2d9'
  tertiary-fixed-dim: '#cbc6bd'
  on-tertiary-fixed: '#1d1b16'
  on-tertiary-fixed-variant: '#494640'
  background: '#f9f9fa'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e3'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: 4rem
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: -0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.025em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies a disciplined, architectural Swiss-modernist aesthetic engineered for editorial curation and digital product workspaces. It prioritizes semantic clarity, high-density typographic order, and uncompromising monochromatic restraint. The experience feels deliberate, intellectual, and silent—treating the interface as a gallery frame for creative assets and technical data.

Visual complexity is eliminated in favor of pristine surfaces, strict grid discipline, and purposeful typographic contrasts. All unnecessary visual noise, saturated highlights, and ornamental graphics are excised. The UI evokes clinical precision, confidence, and archival durability.

## Colors
The color architecture relies strictly on an optical grayscale continuum. The canvas remains pure white (`#ffffff`), layered with delicate cool-neutral surfaces (`#f7f7f8`, `#f0f1f3`, `#e5e7eb`) that delineate hierarchy without adding pigment.

- **Primary (`#18181b` / `#111111`):** The absolute visual anchor, applied strictly to high-level headings, dominant text, and primary call-to-action buttons.
- **Secondary (`#71717a` / `#52525b`):** Muted slate-grays dedicated to metadata, field captions, helper labels, and structural breadcrumbs.
- **Neutral Surface & Stroke (`#f7f7f8`, `#e5e7eb`):** Subtle dividers, structural container fills, and precision borders.
- **Accents:** Strictly achromatic. State variations (focus, active, selected) must rely on weight, inversion, or contrast shifts rather than chromatic saturation.

## Typography
Type is the primary architectural material of the system. Utilizing `Inter` across all functional roles guarantees crisp rendering across tabular figures, editorial text, and technical metadata.

- **Baseline & Metrics:** Line heights strictly adhere to a consistent 4px baseline module. Tabular numbers (`tnum`) must be engaged for numbers, timestamps (`0.8s`), and monetary metrics.
- **Kerning & Characters:** Optical negative tracking is mandatory on large display scales (`-0.025em` to `-0.035em`) to create dense, magazine-like headlines. Mixed characters, slashes (`/`), and mathematical symbols (`+`, `&`) align symmetrically with capitals and uppercase ascenders.
- **Hierarchy:** High contrast between dense obsidian weights (`600`) and neutral body copy (`400`) creates natural rhythm without requiring chromatic differentiation.

## Layout & Spacing
The layout model employs a disciplined 12-column fluid grid system pinned to an 8px architectural cadence, supplemented by 4px micro-steps.

- **Desktop (1024px+):** 12 columns with a fixed `3rem` canvas margin and `1.5rem` gutters. Primary structural panels snap strictly to column intersections.
- **Tablet (768px - 1023px):** 8 columns with `2rem` margins and `1.25rem` gutters. Secondary inspector sidebars collapse into overlay drawers.
- **Mobile (<768px):** 4 columns with `1.25rem` margin and `1rem` gutters. Complex data tables convert to single-column card feeds with strict top-to-bottom reading hierarchies.
- **Rhythm:** Spacing between unbordered sections scales using `space-xl` (`2.5rem`), while grouped UI controls maintain tightly packaged `space-xs` and `space-sm` intervals.

## Elevation & Depth
Elevation is constructed through subtle hair-thin strokes and tonal layer changes rather than diffuse drop shadows.

- **Low-Contrast Outlines:** Surfaces are separated by 1px solid borders using `#e5e7eb` or `#f0f1f3`. Layering is planar and structural, reminiscent of architectural blueprints.
- **Tonal Stacking:** Background sits at `#ffffff`. Base surface containers take `#f7f7f8`. Elevated flyouts, popovers, and dialogs step up to `#ffffff` backed by a razor-sharp 1px border (`#18181b` at 10% opacity) and an ambient, whisper-soft scrim shadow: `0 4px 16px -2px rgba(24, 24, 27, 0.04)`.
- **Modals & Overlays:** Backdrop dimming uses an ultra-clean tint of `#18181b` at 30% opacity with no blur, maintaining focus strictly through raw contrast.

## Shapes
In line with the structural, modernist theme, shapes maintain tight, purposeful corners. The system utilizes Level 1 soft curvature (`roundedness: 1`), providing an exacting compromise between razor-sharp technical tools and contemporary usability.

- **Standard Containers & Inputs:** `0.25rem` (4px) radius. Applied to text fields, standard buttons, tabs, and table containers.
- **Cards & Modals:** `0.5rem` (8px) radius (`rounded-lg`) for larger grouped viewports, editor inspectors, and dialog frames.
- **Chips & Badges:** `0.25rem` (4px) or strictly squared inline badges. Pill shapes are intentionally excluded to avoid playful or consumerist connotations.

## Components

### Buttons
- **Primary:** Solid `#18181b` background, pure `#ffffff` text, 0.25rem radius, height of 36px. Hover state shifts to `#27272a`. Active state triggers `transform: scale(0.99)`.
- **Secondary:** `#ffffff` background with 1px border in `#e5e7eb`, text in `#18181b`. Hover state applies `#f7f7f8` surface background.
- **Ghost:** Transparent background, `#52525b` text, shifting to `#18181b` with subtle `#f4f4f5` background on interaction.

### Chips & Tags
- Height of 22px, padding of 0 6px, radius of 0.25rem.
- Bordered in `#e5e7eb` on a `#f7f7f8` background with `#52525b` text in `label-sm` tracking. Never use pill radii or bright color tags; semantic states use minimalist symbols (•) in neutral or monochrome tones.

### Input Fields
- Monochromatic 1px border (`#e5e7eb`), `#ffffff` background, height of 36px, horizontal padding of `space-md` (`0.75rem`).
- Focus state switches the border to 1px `#18181b` without glowing ambient rings. Placeholder text is fixed at `#a1a1aa`.

### Checkboxes & Radios
- Size: 16px × 16px. Border: 1px `#d4d4d8`.
- Checked state: Inverts to `#18181b` background with sharp white vector mark. Radio buttons use a concentric `#18181b` dot inside a clean white inset ring.

### Cards & Panels
- Framed with 1px `#e5e7eb` solid border. Background defaults to `#ffffff` or secondary container `#f7f7f8`.
- Card headers feature clear divider lines (`1px solid #f0f1f3`) separating title metadata from content bodies.

### Data Tables & Studio Toolbars
- **Data Tables:** Dense horizontal grid lines (`#f0f1f3`), header row set in uppercase `label-sm` with `#71717a` text. Numerical cells use `font-variant-numeric: tabular-nums`.
- **Studio Action Strip:** Floating docked panels rendered in `#ffffff` with a subtle 1px `#e5e7eb` surround, housing discrete icon buttons with 1px divider separators.