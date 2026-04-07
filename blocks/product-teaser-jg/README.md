# Product Teaser JG

A product teaser card fetched live from the catalog service. Displays the product image, name, SKU, price, full description, and optional Details / Add to Cart buttons. Background and text colors are configurable per instance.

Derived from `product-teaser-v2` with the following differences:

- Prefers the product's full `description` field, falling back to `shortDescription`.
- CSS custom properties are namespaced with `--ptjg-*` so it can coexist with the v2 block.
- The Details and Add to Cart buttons default to `true` so the card is fully functional on insert.

## Configuration Options

All options are set as key-value rows in the block table.

| Key                | Default     | Description                                                              |
|--------------------|-------------|--------------------------------------------------------------------------|
| `sku`              | *(required)*| Product SKU to display                                                   |
| `details-button`   | `true`      | Show a "Details" link to the product page                                |
| `cart-button`      | `true`      | Show an "Add to Cart" button                                             |
| `background-color` | `#003087`   | Card background — any valid CSS color                                    |
| `text-color`       | `#ffffff`   | Color for the product name, SKU, price, and description                  |

## Example Table

| Product Teaser JG | |
|---|---|
| sku | MH01-XS-Black |
| details-button | true |
| cart-button | true |
| background-color | #003087 |
| text-color | #ffffff |

## Display Order

1. Product image (left on desktop, top on mobile)
2. Product name
3. Product SKU
4. Product price (final price; strikethrough regular price if on sale)
5. Product description (full `description`, or `shortDescription` fallback)
6. Action buttons (Details / Add to Cart)

## Behavior

- Fetches product data on page load from the catalog service using the provided SKU.
- Shows a placeholder skeleton while loading.
- For complex/configurable products, displays a price range and disables the Add to Cart button.
- Colors are applied via CSS custom properties (`--ptjg-bg-color`, `--ptjg-text-color`).
- The Details button link is auto-constructed from `urlKey` and `sku`.

## Universal Editor

All five fields are editable in the UE properties panel.

## DA.live

Insert the block from the component panel — all five fields are pre-filled with default values. Enter the product SKU in the first row to load the product.
