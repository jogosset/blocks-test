# Navigation Bar Block

A full-width navigation bar with author-configurable background color, text color, and hover accent color (bottom-border underline). Supports dropdown sub-navigation linking to PLP pages, an optional breadcrumb row, and a mobile hamburger menu. Works in both DA.live and Universal Editor.

## Who Should Use It

Content authors and merchandisers who need a storefront category navigation bar with breadcrumb support.

## DA.live Authoring Instructions

Create a block table with the header **Navigation Bar** and the following rows:

| Navigation Bar | |
|---|---|
| Background Color | #1b1f3e |
| Text Color | #ffffff |
| Hover Accent Color | #3b82f6 |
| Aviation Parts | - [Tires](/plp/tires) |
| Aircraft Components | - [De-Icing](/plp/de-icing)<br>- [Air Pumps](/plp/air-pumps) |
| Aircraft Parts | - [Windows](/plp/windows) |
| Aircraft Electrical | - [Chargers](/plp/chargers)<br>- [Batteries](/plp/batteries) |
| Products | |
| Breadcrumb | [Home](/) > [Aircraft Components](/plp/aircraft-components) > [Air Pumps](/plp/air-pumps) > RA 442CW Dry Air Pump |

### Row Details

- **Background Color**: Hex color code for the nav bar background. Default: `#1b1f3e`
- **Text Color**: Hex color code for the nav text. Default: `#ffffff`
- **Hover Accent Color**: Hex color for the bottom-border underline on hover. Default: `#3b82f6`
- **Nav Item Rows**: Col 1 = category name, Col 2 = bulleted list of sub-links. Leave Col 2 empty for a direct link item (no dropdown/chevron).
- **Breadcrumb** (optional): Last row. Links separated by `>`. The final segment renders as plain text (current page).

You can add as many nav item rows as needed.

## Universal Editor Fields

### Navigation Bar - Container
| Field | Type | Description |
|---|---|---|
| Background Color | text | Hex color for nav bar background (default: #1b1f3e) |
| Text Color | text | Hex color for nav text (default: #ffffff) |
| Hover Accent Color | text | Hex color for hover underline (default: #3b82f6) |
| Breadcrumb | richtext | Optional breadcrumb trail with links separated by > |

### Nav Item - Child (add as many as needed)
| Field | Type | Description |
|---|---|---|
| Category Name | text | Top-level category label |
| Sub-Link 1 Label | text | First sub-link label |
| Sub-Link 1 URL | text | First sub-link path |
| Sub-Link 2 Label | text | Second sub-link label (optional) |
| Sub-Link 2 URL | text | Second sub-link path |
| Sub-Link 3 Label | text | Third sub-link label (optional) |
| Sub-Link 3 URL | text | Third sub-link path |

## Configuration Options

- **Background Color**: Any valid hex color value
- **Text Color**: Any valid hex color value
- **Hover Accent Color**: Any valid hex color value (renders as bottom-border underline)
- **Breadcrumb**: Optional — omit the row entirely to hide breadcrumbs
- **Nav Items**: Add as many top-level categories as needed; each can have up to 3 sub-links in UE (unlimited in DA.live via bullet list)

## Responsive Behavior

- **Desktop (900px+)**: Horizontal centered nav bar with hover dropdowns and breadcrumb row
- **Mobile (<900px)**: Hamburger menu with tap-to-expand categories; breadcrumb wraps

## Known Limitations

- UE nav items support up to 3 sub-links per category (DA.live has no limit via bullet list)
- Hover accent is a bottom-border underline only (no background highlight option)
- No mega-menu layout (single column dropdown)

## Developer Notes

### File Structure
```
blocks/navigation-bar/
├── navigation-bar.js       # Block decoration logic
├── navigation-bar.css      # Mobile-first responsive styles
├── _navigation-bar.json    # Universal Editor component config
└── README.md               # This file
```

### CSS Custom Properties (set from author input)
- `--nav-bg-color`: Background color
- `--nav-text-color`: Text color
- `--nav-accent-color`: Hover accent underline color
