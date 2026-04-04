# Product Teaser (JG)

Displays a single product card fetched live from the catalog service, showing the product image, name, price, short description, and optional action buttons. Supports configurable background and text colors.

## Configuration Options

All options are set as key-value rows in the block table.

| Key | Default | Description |
|-----|---------|-------------|
| `sku` | *(required)* | Product SKU to display |
| `details-button` | `false` | Show a "Details" link to the product page |
| `cart-button` | `false` | Show an "Add to Cart" button |
| `background-color` | `#003087` | Card background — any valid CSS color |
| `text-color` | `#ffffff` | Color for the product name, price, and description |

## Example Table

| Product Teaser (JPG) | |
|---|---|
| sku | MH01-XS-Black |
| details-button | true |
| cart-button | true |
| background-color | #003087 |
| text-color | #ffffff |

## Behavior

- Fetches product data from the catalog service on page load using the provided SKU.
- Shows a placeholder skeleton while loading.
- Renders the product image, name, price (regular and final), short description, and action buttons.
- For complex/configurable products, displays a price range and disables the Add to Cart button.
- Colors are applied via CSS custom properties (`--pt-jg-bg-color`, `--pt-jg-text-color`).

## Universal Editor

All five fields are editable in the UE properties panel. The block is available in the "Product" component group and in page sections.

## DA.live

Insert the block from the component panel — all five fields are pre-filled with default values for immediate editing.
