# Project Instructions: Ola Electric Authorized Dealership Website

## Project Overview
A pixel-faithful, responsive, production-optimized landing page for an authorized Ola Electric dealership.

## Design Tokens & System

### Palette
- **Brand Red**: `#E11313`
- **Brand Red Hover**: `#CF1111`
- **Brand Black**: `#0B0B0F`
- **Surface**: `#F4F5F7`
- **Border**: `#E8E9EC`
- **Muted**: `#6B6F76`
- **White**: `#FFFFFF`

### Typography
- **Font Family**: Inter, Arial, sans-serif (`var(--font-inter)`)
- **Heading Weight**: `800` / `900`
- **Letter Spacing**:
  - Tightest: `-0.03em`
  - Eyebrow: `0.2em`

### Radii & Shadows
- **Button Radius**: `8px` (`rounded-button`)
- **Card Radius**: `16px` (`rounded-card`)
- **Card Large**: `20px` (`rounded-card-lg`)
- **Soft Shadow**: `0 4px 24px rgba(0, 0, 0, 0.06)`

### Container
- **Max Width**: `1280px` (`max-w-container`)

## Rules & Constraints
1. **Pixel Fidelity**: Every section must match the reference screenshots from `/design/` (Pages 1 to 13).
2. **Zero Inventions**: Do not invent vehicle specs, pricing, or dealership contact details. Read from data files (`src/data/`). Flag any ambiguities or TODOs in Decisions notes.
3. **No External Image Generation**: Do not auto-generate mock images with generative AI; leave image space vacant / ready for real scooter and gallery assets.
4. **Clean Responsiveness**: Support viewports seamlessly from 360px up to 1920px with zero horizontal scrolling.
5. **Accessibility**: Semantic HTML5 tags, full keyboard navigation (Drawer Escape key, focus management), proper ARIA tags and color contrast.
