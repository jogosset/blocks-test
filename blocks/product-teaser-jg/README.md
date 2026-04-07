# Product Teaser JG

A product teaser card fetched live from the catalog service. Displays the product image on the left (or top on mobile), and the product name, SKU, price, short description, and optional Details / Add to Cart buttons on the right.

All colors are configurable per instance: card background, text, and the Details button background + text colors.

## Configuration Options

All options are set as key-value rows in the block table.

| Key                  | Default     | Description                                                                 |
|----------------------|-------------|-----------------------------------------------------------------------------|
| `sku`                | *(required)*| Product SKU to display                                                      |
| `details-button`     | `true`      | Show a "Details" link to the product page                                   |
| `cart-button`        | `true`      | Show an "Add to Cart" button                                                |
| `background-color`   | `#003087`   | Card background — any valid CSS color                                       |
| `text-color`         | `#ffffff`   | Color for the product name, SKU, price, and description                    |
| `button-color`       | `#ffffff`   | Background color of the Details button (falls back to `text-color`)         |
| `button-text-color`  | `#003087`   | Text color of the Details button (falls back to `background-color`)         |

## Example Table

| Product Teaser JG   |              |
|---------------------|--------------|
| sku                 | MH01-XS-Black |
| details-button      | true         |
| cart-button         | true         |
| background-color    | #003087      |
| text-color          | #ffffff      |
| button-color        | #ffffff      |
| button-text-color   | #003087      |

## Display Order

1. Product image (left on desktop, top on mobile)
2. Product name
3. Product SKU
4. Product price (final price; strikethrough regular price if on sale)
5. Short description (from the catalog's `shortDescription` field)
6. Action buttons (Details / Add to Cart)

## Behavior

- Fetches product data on page load from the catalog service using the provided SKU.
- Shows a placeholder skeleton while loading.
- For complex/configurable products, displays a price range and disables the Add to Cart button.
- Colors applied via CSS custom properties: `--ptjg-bg-color`, `--ptjg-text-color`, `--ptjg-button-bg-color`, `--ptjg-button-text-color`.
- The Details button link is auto-constructed from `urlKey` and `sku`.

## Universal Editor

All seven fields are editable in the UE properties panel.

## DA.live

Insert the block from the component panel — all seven fields are pre-filled with default values. Enter the product SKU in the first row to load the product.
