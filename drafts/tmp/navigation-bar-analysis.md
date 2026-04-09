# Navigation Bar Block - Analysis

## Task Description
Build a production-ready, full-width navigation bar block with author-configurable colors (background, text, hover accent), dropdown sub-navigation for PLP links, an optional breadcrumb row, and mobile-collapsed state. Must work in both DA.live and Universal Editor.

## Visual Analysis

### Image 1 - Desktop Nav Bar
- **Background**: Dark navy (#1b1f3e), full viewport width (100vw)
- **Content**: Centered within max-width container (~1264px)
- **Typography**: White, bold, ~16px sans-serif with letter-spacing
- **Top-level items**: "Aviation Parts ▼", "Aircraft Components ▼", "Aircraft Parts ▼", "Aircraft Electrical ▼", "Products"
- **Hover/Active state**: Blue bottom-border underline accent (contrasting color, author-configurable)
- **Chevrons**: ▼ on items with sub-navigation; absent on direct-link items (e.g., "Products")
- **Breadcrumb row**: Below nav bar, lighter background, "Home > Aircraft Components > Air Pumps > RA 442CW Dry Air Pump" with grey text, blue links, ">" separators

### Image 2 - Mobile / Content Hierarchy
- Stacked vertical list
- Top-level = category label (plain text)
- Sub-level = bold linked items (PLP pages)
- Categories: Aviation Parts (Tires), Aircraft Components (De-Icing, Air Pumps), Aircraft Parts (Windows), Aircraft Electrical (Chargers, Batteries), Account (Log in, Registration, My Account, Create New Company Account, Quick Order)

## Requirements

### Author Inputs
1. **Background Color** (required, default: #1b1f3e)
2. **Text Color** (required, default: #ffffff)
3. **Hover Accent Color** (required, default: #3b82f6 blue) — renders as bottom-border underline
4. **Navigation Items** — repeating rows: category label + sub-link list
5. **Breadcrumb** (optional) — text with links and ">" separators

### Functional Requirements
- Full-width background (100vw) with centered content (max-width container)
- Hover effect: bottom-border underline in accent color on top-level items
- Dropdown sub-nav on hover (desktop) / tap-to-expand (mobile)
- Chevron (▼) only on items with sub-navigation
- Items without sub-links render as direct `<a>` links (no dropdown)
- Optional breadcrumb row below main nav
- Keyboard accessible (Escape closes, focus management)
- Works in DA.live and Universal Editor

### Responsive Behavior
- **Desktop (900px+)**: Horizontal centered nav bar, hover dropdowns, breadcrumb visible
- **Mobile (<900px)**: Hamburger menu, expandable categories, breadcrumb stacks/wraps

## Acceptance Criteria

1. [ ] Full-width background spanning entire viewport
2. [ ] Nav content centered in max-width container
3. [ ] Author can configure background color, text color, hover accent color
4. [ ] Hover shows bottom-border underline in accent color
5. [ ] Chevron on items with sub-nav only
6. [ ] Dropdown reveals sub-nav links on hover (desktop)
7. [ ] Sub-nav links are clickable PLP links
8. [ ] Optional breadcrumb row renders below nav bar
9. [ ] Mobile hamburger with tap-to-expand categories
10. [ ] Works in DA.live document-based authoring
11. [ ] Works in Universal Editor with color fields
12. [ ] No console errors from the block
13. [ ] Uses project CSS design tokens
14. [ ] Lint passes
