# Design Brief

## Direction

**BipDeep ContentMagic** — An AI-powered social media content creator with vibrant energy and streamlined creation workflows. The platform empowers creators to generate, customize, and manage content across multiple platforms effortlessly.

## Tone

Bold, energetic minimalism with creative accents. Modern, approachable, and playful without sacrificing clarity. Smooth interactions and visual depth create a premium yet accessible creative tool.

## Differentiation

Vibrant teal primary paired with warm coral accents for CTAs creates instant visual distinction from generic SaaS tools. Gradient-enriched buttons and smooth micro-interactions make creation feel delightful.

## Color Palette

| Token          | OKLCH           | Role                                      |
| -------------- | --------------- | ----------------------------------------- |
| background     | 0.98 0 0        | Light off-white for main surface          |
| foreground     | 0.18 0 0        | Deep grey for primary text                |
| card           | 1.0 0 0         | Pure white for elevated content cards     |
| primary        | 0.64 0.19 223   | Vibrant teal for primary actions          |
| secondary      | 0.68 0.13 44    | Warm coral/apricot for secondary CTAs     |
| accent         | 0.64 0.19 223   | Same as primary for highlights            |
| muted          | 0.93 0 0        | Light grey for disabled/secondary content |
| destructive    | 0.56 0.22 22    | Red for delete/dangerous actions          |

## Typography

- Display: Space Grotesk — Bold geometric headlines for sections and feature titles
- Body: Plus Jakarta Sans — Warm, highly legible body copy and UI labels
- Mono: JetBrains Mono — Code-like precision for content snippets and draft previews
- Scale: Hero `text-3xl font-display font-bold`, Section `text-xl font-display font-semibold`, Label `text-sm font-medium text-muted-foreground`

## Elevation & Depth

Three-tier shadow hierarchy: subtle (input fields), elevated (cards/modals), and prominent (floating CTAs). Surface emphasis through layering rather than color intensity.

## Structural Zones

| Zone    | Background                | Border              | Notes                                              |
| ------- | ------------------------- | ------------------- | -------------------------------------------------- |
| Header  | `bg-card border-border`   | Bottom subtle       | Sticky nav with logo, user menu, no shadow        |
| Content | `bg-background`           | —                   | Main work surface with alternating card sections  |
| Sidebar | `bg-sidebar border-right` | Right edge          | Template/tone/platform selectors                  |
| Cards   | `bg-card shadow-md`       | `border-border`     | Draft cards and content previews with lift effect |
| Footer  | `bg-muted/30 border-t`    | Top subtle          | Stats dashboard with chart tokens                 |

## Spacing & Rhythm

Structured grid of 0.5rem base unit: 4px micro-spacing (form fields), 8px component padding, 16px section gaps, 32px major section breaks. Density tightens on mobile, expands on desktop.

## Component Patterns

- Buttons: Rounded-md (`8px`), gradient-filled primary, flat secondary, ghost tertiary. Hover opacity + scale, active `scale-95` feedback.
- Cards: Rounded-lg (`12px`), `bg-card` with `border-border`, `shadow-md` baseline, hover `shadow-lg` lift effect.
- Badges: Pill-shaped (`rounded-full`), `bg-muted` foreground, compact padding for template/tone labels.
- Inputs: Rounded-md, `border-input` with `focus:ring-2 focus:ring-ring/20` for accessibility.

## Motion

- Entrance: Fade-in + slide-up (150ms) for cards and modals, staggered by 50ms per item.
- Hover: Opacity shift and shadow lift (200ms smooth) on interactive elements. Scale feedback on buttons.
- Decorative: Pulse-soft animation (2s loop) for "generating" state indicators.

## Constraints

- Never use raw hex colors or named colors — all colors via OKLCH CSS variables.
- Maintain minimum AA contrast ratio in both light and dark modes.
- Gradients only on CTAs and accent elements; avoid full-page backgrounds.
- Typography hierarchy serves information priority, not decoration.
- Rounded corners scale intentionally: 0 (raw edges) → 4px (inputs) → 8px (buttons) → 12px (cards).

## Signature Detail

Gradient-filled primary buttons (teal-to-deep-blue) combined with warm coral secondary CTAs create instant visual energy while maintaining professional clarity — the "enchant" moment in the interface.
