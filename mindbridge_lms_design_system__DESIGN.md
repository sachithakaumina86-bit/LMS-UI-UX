---
name: MindBridge LMS Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#cfd9fb'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e1e7ff'
  surface-container-highest: '#d9e2ff'
  on-surface: '#101b34'
  on-surface-variant: '#414754'
  inverse-surface: '#25304a'
  inverse-on-surface: '#eef0ff'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cba'
  primary: '#005ab6'
  on-primary: '#ffffff'
  primary-container: '#0072e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#abc7ff'
  secondary: '#4d5c8e'
  on-secondary: '#ffffff'
  secondary-container: '#b5c5fd'
  on-secondary-container: '#405081'
  tertiary: '#7f5300'
  on-tertiary: '#ffffff'
  tertiary-container: '#a06900'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b5c5fd'
  on-secondary-fixed: '#041847'
  on-secondary-fixed-variant: '#354575'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb952'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#faf8ff'
  on-background: '#101b34'
  surface-variant: '#d9e2ff'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system powers a multi-tenant enterprise learning management ecosystem engineered for educational institutions, corporate academies, and public sector training portals across South Asia. The brand personality balances academic authority, institutional trust, and digital agility. It must evoke intellectual empowerment, clarity, and structural reliability under heavy data density.

The visual style merges **Corporate / Modern refinement** with subtle **structural architectural touches** (referencing the "bridge of knowledge" metaphor). The UI avoids juvenile playfulness while retaining high warmth through balanced golden-amber accents against authoritative deep navy infrastructure. Tenancy-aware interfaces enforce crisp white and soft-tint content canvases, framed by precision hairline boundaries, disciplined typography, and clear status communication.

Core design tenets:
- **Intellectual Clarity:** Complex course hierarchies, grading workflows, and tenant administration grids are uncluttered, prioritizing legibility and scan speed.
- **Architectural Cohesion:** Soft bridge-arch radiuses and clean structural 1px dividers provide visual anchor points across desktop control planes and responsive student views.
- **Localized Fluency:** Seamless handling of dual-script typography (English and Sinhala Unicode) alongside dual-currency figures (LKR / Rs.) without metric shift or visual clipping.

## Colors

The palette establishes an immediate institutional baseline with deep optical grounding:

- **Primary (`#0875E8` - Education Blue):** The primary interactive driver. Used for active navigation states, primary buttons, high-priority links, and focused tab bars.
- **Secondary (`#071B4A` - Deep Navy Blue):** The enterprise anchor. Drives top-level app chrome, persistent enterprise sidebars, major headlines, and high-level tenant branding zones.
- **Tertiary (`#FFAA00` - Golden Orange):** Used strategically for gamification points, course completion badges, streak trackers, callouts, and academic milestones ("Achieve").
- **Neutral (`#111C35` - Text Dark):** High-contrast base for primary text, structured data values, and dark UI surfaces.
- **Canvas & Backgrounds:**
  - Base Light Canvas: `#F4F8FF` (Soft Blue Tint)
  - Card & Surface Fill: `#FFFFFF` (Pure White)
  - Subtle Borders & Rules: `#E2E8F4`
  - Secondary Text & Meta: `#667085`
- **Functional Semantics:**
  - Success: `#16A36A` (Passing grades, published courses, active subscriptions)
  - Warning: `#E6A000` (Deadlines pending, pending reviews, quota cautions)
  - Error: `#DC4C4C` (Overdue assignments, failed verifications, system alerts)

### Dark Mode Adaptation
In dark mode, surfaces invert from pure black to layered midnight tones: canvas shifts to `#0A1124`, card containers use `#101C38`, borders scale to `#1D2D56`, and text transitions to `#F4F8FF` (primary) and `#94A3B8` (secondary). Education Blue shifts slightly lighter to `#2B8CFF` to preserve WCAG AAA contrast ratios.

## Typography

The typographic stack couples **Plus Jakarta Sans** for structural brand impact with **Inter** for data grids, reading passages, and interactive dashboard tokens.

- **Plus Jakarta Sans (Headings & Metric Displays):** Delivers clean geometry, modern stance, and confident presence on course dashboards and marketing banners.
- **Inter (Body, UI Controls, Data Tables):** Provides tall x-height, neutral tone, and optimal clarity at dense 12px–14px sizes.
- **Dual-Script & Sinhala Optimization:** Inter and Plus Jakarta Sans are twinned with high-quality Sinhala Unicode fallback chains (e.g., *Noto Sans Sinhala*, *Iskoola Pota*). Line heights must maintain minimum 1.45–1.5x ratios to account for Sinhala ascenders, descenders, and vowel diacritics (kombuva, aepilla) without line clipping.
- **Currency & Tabular Figures:** Numeric columns displaying Sri Lankan Rupee pricing (e.g., `Rs. 45,000.00` or `LKR 12,500`) must enforce tabular numbers (`font-variant-numeric: tabular-nums`) to guarantee strict vertical alignment in ledger cards and billing logs.

## Layout & Spacing

This design system uses a flexible 12-column grid layout across desktop environments with fluid adaptation for tablet and handheld devices:

- **Desktop (1200px+):** 12-column fluid grid, `2rem` outer page margins, `1.5rem` gutters. Collapsible secondary sidebar navigation (compact 72px vs standard 260px).
- **Tablet (768px - 1199px):** 8-column grid, `1.5rem` page margins, `1rem` gutters. Left sidebar collapses into an overlay drawer. Dual-pane assignment views stack into tabbed panels.
- **Mobile (< 768px):** 4-column layout, `1rem` margins, `1rem` gutters. Dense metric ribbons transform into horizontally swipeable snap carousels.

Spacing adheres strictly to an 8pt base grid with a 4pt micro-increment (`space-xs: 4px`, `space-sm: 8px`, `space-md: 16px`, `space-lg: 24px`, `space-xl: 32px`). Element spacing inside cards never drops below `space-sm`, guaranteeing touch targets of at least 44x44px across responsive viewports.

## Elevation & Depth

Visual hierarchy leverages a hybrid model of **crisp 1px low-contrast structural outlines** layered over **soft, tinted ambient shadows**. This maintains clean data boundaries while preventing the layout from feeling harsh or flat.

- **Level 0 (Base Canvas):** Background fill `#F4F8FF`. Flat, non-elevated.
- **Level 1 (Card & Module Surfaces):** 
  - Fill: `#FFFFFF`
  - Border: `1px solid #E2E8F4`
  - Shadow: `0 1px 3px rgba(7, 27, 74, 0.04), 0 4px 12px rgba(7, 27, 74, 0.03)`
- **Level 2 (Hover States, Flyouts, Popovers):**
  - Fill: `#FFFFFF`
  - Border: `1px solid #D0DBEE`
  - Shadow: `0 4px 6px -1px rgba(7, 27, 74, 0.06), 0 10px 20px -2px rgba(7, 27, 74, 0.07)`
- **Level 3 (Modals, Dialogs, Global Drawers):**
  - Fill: `#FFFFFF`
  - Border: `1px solid #CBD7EE`
  - Shadow: `0 16px 36px -4px rgba(7, 27, 74, 0.14), 0 6px 12px -2px rgba(7, 27, 74, 0.05)`
  - Backdrop: `rgba(7, 27, 74, 0.65)` with a `4px` blur filter.

### Bridge-of-Knowledge Motif
Accentuated structural modules (such as course header cards, tenant overview hero units, and completion banners) incorporate an asymmetric top-border arc or top-right radial curve mask (`border-top-right-radius: 24px`), discreetly echoing the arch of a bridge without impairing content grid alignment.

## Shapes

The design system adopts a **Rounded (`2`)** baseline geometry. This strikes the right balance between crisp enterprise discipline and contemporary academic approachability.

- **Base Radius (0.5rem / 8px):** Inputs, standard buttons, table cell selections, notification toasts, dropdown items.
- **Large Radius (`rounded-lg`, 1rem / 16px):** Content cards, test-taking viewports, course module containers, modal sheets.
- **Extra-Large Radius (`rounded-xl`, 1.5rem / 24px):** Hero banners, tenant switchers, bridge-arch card accents.
- **Pill Badges (`9999px`):** Status indicators, grade markers, skill tags, live attendance chips.

## Components

### Buttons & Actions
- **Primary:** Background `#0875E8`, text `#FFFFFF`, radius 8px, height 40px (desktop) / 44px (mobile), padding `0 18px`. Hover: `#0764C7`. Focus: 3px outer ring in `rgba(8, 117, 232, 0.25)`.
- **Secondary (Navy Anchor):** Background `#071B4A`, text `#FFFFFF`, radius 8px. Used for institutional actions (e.g., "Publish Course", "Export Tenant Report").
- **Tertiary / Outlined:** Border `1px solid #D0DBEE`, background `#FFFFFF`, text `#071B4A`. Hover: background `#F4F8FF`, border-color `#0875E8`.
- **Golden Milestone:** Background `#FFAA00`, text `#111C35`, font-weight 600. Used exclusively for certificates, achievements, and upgrades.

### Chips & Badges
- **Status Chips:** Pill-shaped, font size 12px, weight 500, padding `4px 10px`.
  - In Progress: `#EBF3FE` fill with `#0875E8` text.
  - Completed / Active: `#E6F7F0` fill with `#16A36A` text.
  - Review Needed: `#FFF7E6` fill with `#B37D00` text.
  - Overdue / Inactive: `#FDE8E8` fill with `#DC4C4C` text.

### Cards & Modules
- Standard containers have a 1px `#E2E8F4` boundary, `#FFFFFF` background, and `rounded-lg` (16px) corners.
- Course cards include a fixed 16:9 media thumbnail topped with a tag chip in the upper-left, a linear progress bar running along the card footer, and teacher/student seat indicators using tabular figures.

### Form Inputs & Selectors
- Height 42px, radius 8px, border `1px solid #D0DBEE`, background `#FFFFFF`, typography `Inter 14px regular`.
- Focus state: border-color `#0875E8`, box-shadow `0 0 0 3px rgba(8, 117, 232, 0.15)`.
- Error state: border-color `#DC4C4C`, box-shadow `0 0 0 3px rgba(220, 76, 76, 0.15)`.
- Currency prefix inputs display fixed `Rs.` or `LKR` blocks in muted `#667085` with an internal 1px vertical divider.

### Data Tables & Course Rosters
- Header: `#F4F8FF` background, text uppercase `Inter 11px label-sm` in `#667085`, border-bottom `1px solid #E2E8F4`.
- Rows: Height 56px, zebra-striping disabled, hover state `#F8FAFC`. Pinned actions column on the right edge.
- Sinhala-compatible line box: minimum row height adjusted to 60px when multilingual rendering is enabled.

### Multi-Tenant Switcher
- Pinned to the top of the secondary sidebar: displays tenant logo avatar (32x32px, 8px radius), organization title (`14px bold`), tenant role chip (`Admin`, `Instructor`, `Learner`), and a chevron selector leading to an elevated Level-2 drop panel.