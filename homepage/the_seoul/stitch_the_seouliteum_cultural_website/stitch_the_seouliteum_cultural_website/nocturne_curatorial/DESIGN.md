---
name: Nocturne Curatorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#111111'
  on-primary-container: '#7e7c7c'
  inverse-primary: '#5f5e5e'
  secondary: '#e0c298'
  on-secondary: '#402d0f'
  secondary-container: '#584323'
  on-secondary-container: '#ceb188'
  tertiary: '#cac6c3'
  on-tertiary: '#32302f'
  tertiary-container: '#121110'
  on-tertiary-container: '#7f7c7a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#fedeb2'
  secondary-fixed-dim: '#e0c298'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#584323'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  headline-xl:
    fontFamily: Syne
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Syne
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-tablet: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2.25rem
  space-xl: 4rem
---

## Brand & Style

This design system channels an avant-garde nocturnal gallery atmosphere. Built for discerning patrons, collectors, and architectural purists, it evokes quiet reverence, spatial drama, and deliberate restraint. 

The aesthetic is rooted in architectural minimalism and nocturnal exhibition staging. It discards decorative ornamentation in favor of expansive, deep charcoal voids punctuated by surgical typography and sculptural pill forms. The emotional tone mirrors stepping into a cavernous, darkened white-cube gallery where spotlights carve out physical artifacts: quiet, commanding, and atmospheric.

## Colors

The palette operates on controlled illumination against charcoal obscurity:
- **Primary Canvas (`#111111`)**: The foundational deep obsidian ground, absorbing ambient distraction.
- **Secondary Accent (`#C5A880`)**: Muted champagne bronze used strictly for singular focal points, active states, and curatorial verification marks.
- **Neutral Elevation (`#1A1A1A`)**: Sculptural surface tier for elevated cards, layered planes, and floating panels.
- **Support Values**: Hairline stone borders are articulated with low-opacity alabaster (`rgba(245, 245, 240, 0.08)` to `rgba(245, 245, 240, 0.16)`). Text contrasts rely on pure alabaster (`#FBFBF9`) for primary display titles and stone grey (`#7A7A72`) for secondary metadata and technical specifications.

## Typography

The typographic tension pairs the sculptural, wide display geometry of **Syne** with the monoline, technical exactness of **Geist**. 

- **Syne** commands exhibition hero spaces, room titles, and conceptual manifestos. It behaves like physical signage carved into gallery stone.
- **Geist** structures curatorial metadata, floor plans, dimensions, and operational booking schedules. 
- All metadata labels (`label-md`, `label-sm`) require full uppercase treatment with generous tracking (`0.08em` to `0.12em`) to evoke museum placards.

## Layout & Spacing

The layout is governed by a 12-column architectural grid on desktop (8 columns on tablet, 4 columns on mobile). Space functions as visual silence:

- Desktop sections maintain generous outer breathing room (`margin: 4rem`), scaling down to `1.25rem` on mobile.
- Grids emphasize asymmetrical alignments; single works or paragraphs may span 4 to 6 columns while neighboring space remains completely unoccupied.
- Vertical layout shifts leverage rhythmic intervals of `space-xl` (`4rem`) to isolate exhibition segments into discrete visual chambers.

## Elevation & Depth

Visual hierarchy is constructed through tonal differentiation and razor-thin boundaries rather than heavy drop shadows:

- **Surface Tiers**: Base floors sit at `#111111`. Elevated interactive cards and modals shift to `#1A1A1A`, establishing quiet vertical separation.
- **Hairline Outlines**: Elements demarcate boundaries via ultra-crisp, 1px ghost borders (`rgba(245, 245, 240, 0.08)`).
- **Curatorial Spotlight Effect**: Hover or selected states avoid diffuse black drops; instead, they project a subtle ambient champagne illumination (`box-shadow: 0 0 24px -4px rgba(197, 168, 128, 0.12)`).

## Shapes

The design system enforces a pill geometry archetype (`roundedness: 3`). High-radius contours create sculptural contrast against the structural, boxy grid of architectural spaces:

- **Interactive Badges & Buttons**: Render as pure capsules with continuous curvature (`border-radius: 9999px` / `rounded-full`).
- **Cards & Architectural Viewports**: Large display containers use `rounded-xl` (3rem / 48px) or `rounded-lg` (2rem / 32px), softening the boundary between dark canvas and high-contrast photography.
- **Input Fields**: Full pill profiles ensuring tactile, touch-friendly engagement.

## Components

### Buttons
- **Primary**: Solid pill filled with `#FBFBF9`, text in `#111111`, styled in uppercase `label-md`. On hover, surface transitions smoothly to `#C5A880`.
- **Secondary / Outline**: Pill with a 1px border of `rgba(245, 245, 240, 0.16)`, transparent interior, text in `#FBFBF9`. Active hover shifts border to `#C5A880`.

### Chips & Badges
- Pill-shaped tags with `0.375rem` vertical and `0.875rem` horizontal padding. Grounded in `#1A1A1A` with a 1px hairline border. Typography strictly rendered in `label-sm` tracking.

### Cards
- Nocturnal framing surfaces set to `#1A1A1A` with `rounded-xl` curvature. Padded with `space-lg`. Media contained within cards preserves the 2rem corner geometry with no inset gap.

### Input Fields & Controls
- **Inputs**: Full pill contours with `1px solid rgba(245, 245, 240, 0.12)`, `#111111` backdrop, and `body-md` typography. Focus state shifts the border to `#C5A880` with zero ambient ring blowout.
- **Checkboxes & Radios**: Minimalist indicators. Checkboxes maintain micro-pill (6px radius) boxes; radios are concentric circles. Active fill glows in muted bronze (`#C5A880`).

### Curatorial Data Tables & Lists
- Thin horizontal lines (`1px solid rgba(245, 245, 240, 0.06)`) separating entries. No vertical column rules. Left-aligned label in `Syne`, right-aligned technical metrics in tabular `Geist` figures.