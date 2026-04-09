# Navigation JG Block - Analysis

## Task Description
Build a full-width navigation block for a storefront, supporting author-configurable background color, text color, hover effects on top-level items, and dropdown sub-navigation with links to PLP pages. Must work in both DA.live and Universal Editor.

## Visual Analysis

### Image 1 - Final Look & Feel
- **Layout**: Full-width dark navy bar (~#1b1f3e) spanning entire viewport
- **Text**: White, bold, uppercase-ish top-level category names
- **Items**: "Aviation Parts", "Aircraft Components", "Aircraft Parts", "Aircraft Electrical" (with chevron ▼), "Products" (no chevron, no sub-items)
- **Alignment**: Navigation items centered horizontally within the bar
- **Spacing**: Even spacing between top-level items
- **Typography**: ~16px bold, sans-serif, with letter-spacing

### Image 2 - Content Structure
Top-level categories with nested sub-items:
- **Aviation Parts** → Tires
- **Aircraft Components** → De-Icing, Air Pumps
- **Aircraft Parts** → Windows
- **Aircraft Electrical** → Chargers, Batteries
- **Account** → Log in, Registration, My Account, Create New Company Account, Quick Order

Sub-items are bold links (to PLP pages).

### Interactive Elements
- Hover effect on top-level nav items (likely background color change or underline)
- Dropdown panels showing sub-navigation links on hover/click
- Chevron (▼) icons on items with sub-navigation

## Requirements

### Author Inputs
1. **Background Color** - configurable (default: dark navy)
2. **Text Color** - configurable (default: white)
3. **Navigation Items** - each row = one top-level category
4. **Sub-navigation Links** - links within each category row pointing to PLP pages

### Functional Requirements
- Full-width bar that spans the entire viewport width
- Navigation items centered within the bar
- Hover effect on top-level items
- Dropdown sub-nav on hover showing linked sub-items
- Chevron icon on items that have sub-navigation
- Responsive behavior (hamburger menu on mobile)
- Works in both DA.live and Universal Editor

### Responsive Behavior
- **Desktop (900px+)**: Horizontal nav bar, dropdowns on hover
- **Mobile (<900px)**: Collapsed hamburger menu with expandable categories

## Acceptance Criteria

1. [ ] Full-width dark background bar spanning viewport width
2. [ ] Navigation items centered horizontally
3. [ ] Author can set background color and text color
4. [ ] Top-level items show hover effect (background highlight)
5. [ ] Items with sub-nav show chevron (▼) indicator
6. [ ] Hovering a top-level item reveals dropdown with sub-nav links
7. [ ] Sub-nav links are clickable and navigate to PLP pages
8. [ ] Mobile: hamburger menu with expandable categories
9. [ ] Works in DA.live document-based authoring
10. [ ] Works in Universal Editor with editable fields
11. [ ] No console errors
12. [ ] Matches project CSS conventions (uses design tokens)
