# Navigation JG Block

A full-width navigation bar with configurable background and text colors, hover effects on top-level items, and dropdown sub-navigation menus linking to PLP pages. The navigation items are centered within the bar, and the bar itself spans the entire page width.

## Who Should Use It

Content authors and merchandisers who need a storefront category navigation bar.

## DA.live Authoring Instructions

Create a block table with the header **navigation-jg** and the following rows:

| navigation-jg | |
|---|---|
| Background Color | #1b1f3e |
| Text Color | #ffffff |
| Aviation Parts | - [Tires](/plp/tires) |
| Aircraft Components | - [De-Icing](/plp/de-icing)<br>- [Air Pumps](/plp/air-pumps) |
| Aircraft Parts | - [Windows](/plp/windows) |
| Aircraft Electrical | - [Chargers](/plp/chargers)<br>- [Batteries](/plp/batteries) |
| Products | - [All Products](/plp/products) |

### Row Details

- **Row 1 (Background Color)**: Hex color code for the nav bar background. Default: `#1b1f3e`
- **Row 2 (Text Color)**: Hex color code for the nav text. Default: `#ffffff`
- **Rows 3+**: Each row is a navigation category. Column 1 = category name, Column 2 = a bulleted list of links to sub-pages (PLP pages).

If a category has no sub-links, it renders as a simple link without a dropdown chevron.

## Universal Editor Fields

### Navigation (JG) - Container
| Field | Type | Description |
|---|---|---|
| Background Color | text | Hex color for nav bar background (default: #1b1f3e) |
| Text Color | text | Hex color for nav text (default: #ffffff) |

### Navigation Item (JG) - Child
| Field | Type | Description |
|---|---|---|
| Category Name | text | Top-level category label |
| Sub-Navigation Links | richtext | Bulleted list of links to PLP pages |

## Configuration Options

- **Background Color**: Any valid CSS color value (hex recommended)
- **Text Color**: Any valid CSS color value (hex recommended)
- **Hover Effect**: Built-in semi-transparent white overlay on hover
- **Dropdown**: Automatically shown for categories with sub-links
- **Chevron**: Automatically added for categories with sub-links

## Responsive Behavior

- **Desktop (900px+)**: Horizontal centered nav bar with hover dropdowns
- **Mobile (<900px)**: Hamburger menu with tap-to-expand categories

## Known Limitations

- No mega-menu support (single column dropdown only)
- Hover color is a fixed semi-transparent white overlay (not author-configurable)
- No logo/brand slot in this block (use alongside the existing header block)

## Developer Notes

### File Structure
```
blocks/navigation-jg/
├── navigation-jg.js       # Block decoration logic
├── navigation-jg.css      # Styles (mobile-first, responsive)
├── _navigation-jg.json    # Universal Editor component config
└── README.md              # This file
```

### Key Functions
- `decorate(block)`: Extracts config rows (background/text color) and nav item rows, builds semantic nav HTML with dropdowns and hover behavior
- Config rows identified by label matching ("background color", "text color")
- Remaining rows treated as navigation categories

### CSS Custom Properties
The block sets these CSS variables from author input:
- `--nav-bg-color`: Background color
- `--nav-text-color`: Text color
