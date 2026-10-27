---
name: Rhythm Coffee Atelier
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#434655'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#633b04'
  on-tertiary: '#ffffff'
  tertiary-container: '#7e521c'
  on-tertiary-container: '#ffcb94'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffddbb'
  tertiary-fixed-dim: '#f7bb7a'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#663e06'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2df'
  cobalt-electric: '#1d4ed8'
  navy-ink: '#0f172a'
  warm-canvas: '#f8f7f4'
  canvas-subtle: '#f1efe9'
  canvas-card: '#ffffff'
  line-neutral: '#e2ded6'
  accent-amber: '#92632b'
typography:
  display:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Inter
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: '0'
  spec-num:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the aesthetic evolution of a high-end specialty coffee atelier and wholesale purveyor. Moving deliberately away from traditional, heavy artisanal serifs, rustic kraft paper tropes, and cluttered packaging motifs, the system adopts a crisp, Swiss-influenced neo-grotesque discipline aligned with modern specialty institutions.

The brand persona is architectural, exacting, and effortlessly contemporary:
- **Neo-Grotesque Precision:** Universal adoption of a clean, geometric grotesk voice across all levels—from monumental editorial headlines down to granular origin telemetry.
- **Negative Space as Luxury:** Ample, intentional white and cream fields provide quiet breathing room, allowing lot names, roast profiles, and cupping scores to stand out without decorative badges or ornamental flourishes.
- **Utilitarian Elegance:** Wholesale order matrices, moisture indicators, and lot codes are treated with the meticulous typography of industrial laboratory specs, balancing aesthetic restraint with enterprise transactional efficiency.

## Colors

The palette is rooted in an architectural dialogue between pristine warm neutrals, deep obsidian-slate ink, and a razor-sharp electric cobalt accent:

- **Primary (`#1d4ed8` - Electric Cobalt):** Serves as the active catalyst across the interface. Used with extreme restraint for focused primary actions, active catalog filters, cart callouts, and key data points. It injects high-contrast energy without polluting the minimalist baseline.
- **Secondary (`#0f172a` - Obsidian Ink):** The anchor for high-density typography, navigation bars, structural dividers, and high-impact editorial headlines. It provides substantial typographic authority.
- **Tertiary (`#92632b` - Parchment Amber):** A refined, low-saturation warm bronze used sparingly for provenance verification, farm micro-lot designations, and cupping score highlights.
- **Neutral Canvas (`#f8f7f4` - Warm Canvas):** Replaces clinical stark white with a softened, warm background reminiscent of unbleached paper and porcelain cupping bowls. Paired with pure white (`#ffffff`) for elevated panels and `#f1efe9` for quiet background contrast.
- **Border and Rules (`#e2ded6`):** Hairline architectural borders define space purely through subtle tonal boundaries rather than heavy framing.

## Typography

The typography shifts completely from classic bookish serif styling to a unified, modern Neo-Grotesque hierarchy powered entirely by Inter.

- **Unified Voice:** By standardizing headlines, narrative body copy, and trade telemetry under Inter, the brand project an authoritative, gallery-like coffee atelier impression.
- **Tight Tracking on Display Scales:** Large display headlines utilize negative tracking (`-0.02em` to `-0.03em`) and medium/semi-bold weights, creating compact, sculptural wordforms reminiscent of Swiss international posters.
- **Granular Spec Tokens:** `spec-num` and `label-caps` handle tabular cupping ratings, elevation numbers (m.a.s.l.), moisture percentages, and SKU references. All numbers are rendered with tabular figures (`tnum`) for neat vertical alignment in wholesale schedules.

## Layout & Spacing

Layouts follow an airy, disciplined grid that balances commercial catalog clarity with generous gallery-like breathing room:

- **Grid Framework:**
  - **Desktop (1024px+):** 12-column fluid grid bounded by a 1440px maximum container width. Outer margin sits at `3rem` (`space-xl` scaled) with `1.5rem` gutters.
  - **Tablet (768px - 1023px):** 8 columns, `2rem` margins, `1.25rem` gutters.
  - **Mobile (<768px):** 4 columns, `1.25rem` outer margins, `1rem` gutters.
- **Negative Space Rhythm:** Spacing is used constructively to eliminate unnecessary container borders. White space separates editorial hero imagery from harvest details, giving products room to breathe without surrounding them with boxes or background pills.

## Elevation & Depth

This design system rejects heavy drop shadows, fuzzy blurs, and skeuomorphic gradients in favor of crisp tonal stacking and delicate hairline definition:

- **Flat Tonal Hierarchy:** Depth is created primarily through color planes. The page canvas (`#f8f7f4`) supports pure white (`#ffffff`) modules or subtly darker `#f1efe9` metadata blocks.
- **Low-Contrast Hairlines:** Elements are bounded by 1px rules of `#e2ded6` rather than deep shadows.
- **Micro Ambient Lift:** For floating drawers, quick-view flyouts, and wholesale checkout panels, the system uses a single, highly diffused, navy-tinted ambient shadow:
  - *Floating Elevation:* `0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)`
- **Interactive Focus:** Hover and focus states use crisp outline shifts or subtle background transitions rather than vertical physical lift.

## Shapes

The shape system is set to roundedness level `1` (Soft), maintaining a crisp, architectural profile:

- **Core Elements:** Buttons, text fields, badges, and thumbnail frames feature a tight `0.25rem` (4px) corner radius. This avoids harsh right angles while preserving modern structural rigor.
- **Panels & Dialogs:** Overlay modals and major card containers scale modestly to `0.5rem` (`rounded-lg`), softening content boundaries without feeling playful or bulbous.
- **Pill Ban:** Full pill shapes (`rounded-full`) are strictly restricted to microscopic operational badges or dot indicators; interactive buttons and input modules remain architectural and rectangular.

## Components

### Buttons
- **Primary:** Solid `#1d4ed8` (Electric Cobalt) background, crisp `#ffffff` text, 4px radius, no border. Subtle hover step to `#1e40af` with an instant, decisive 150ms transition.
- **Secondary / Outline:** Transparent fill, 1px solid `#0f172a`, text `#0f172a`. Hover fills `#0f172a` with `#ffffff` text.
- **Tertiary / Text:** Bare `#0f172a` text with an underlined 1px baseline or pairing with a minimal glyph (`→`).

### Product & Offering Cards
- **Editorial Micro-lot Card:** Framed on `#ffffff` with a subtle 1px `#e2ded6` border. Features uncropped 1:1 origin photography, clean typography hierarchy (Origin, Producer, Varietal), and tasting notes rendered in quiet inline text rather than heavy badges.
- **Wholesale Bulk Card:** Flat `#f1efe9` background, structured tabular columns listing Screen Size, Processing Method, Moisture, Crop Year, and tiered MOQ break points.

### Chips & Badges
- Replaces heavy, high-contrast filled badges with ultra-minimal outlines.
- 1px border `#e2ded6`, `#f8f7f4` background, `#0f172a` text, tracked uppercase `label-caps` font, 4px padding vertical, 8px horizontal.

### Lists & Tables (Wholesale Order Matrix)
- Stripped of excessive alternating zebra stripes. Clean 1px `#e2ded6` bottom rules.
- Numeric columns right-aligned using `spec-num`. Interactive increment/decrement steppers integrate flush into table cells without rounded bubble buttons.

### Form Inputs & Controls
- Height: 42px. Flat white background, 1px `#e2ded6` border, 4px radius.
- Focus: Immediate transition to a 1.5px `#1d4ed8` border without fuzzy outer glow rings.
- Checkboxes: 16px square, 2px radius, checked state filled with `#1d4ed8` and a sharp white checkmark.

### Cupping Score Indicator
- Redesigned as an understated editorial stamp: 40px square or minimal typographic lockup with `#0f172a` text and a fine `#1d4ed8` micro-dot or numeric emphasis, eliminating ornate circular seals.