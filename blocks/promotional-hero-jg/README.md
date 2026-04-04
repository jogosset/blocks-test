# Promotional Hero (JPG)

A highly configurable promotional hero block with per-block background color, text color, CTA button styling, and side-by-side layout support.

## Authoring in da.live (doc-based)

Add a **Promotional Hero (JPG)** block. Each block has one content row followed by optional config rows:

**Content row** (3 columns):

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Image | Heading + description text | CTA link |

**Config rows** (key | value — all optional):

| Key | Description | Example |
|-----|-------------|---------|
| `bgcolor` | Block background color | `#003087` or `blue` |
| `text-color` | Main description text color | `#ffffff` or `white` |
| `columns` | How many blocks side by side (1–4) | `2` |
| `cta-button-color` | CTA button background color | `#ff6b00` |
| `cta-text-color` | CTA button label text color | `#ffffff` |

### Example block table

```
| Promotional Hero (JPG) |                          |              |
|------------------------|--------------------------|--------------|
| [image]                | ## Heading               | [Shop now]() |
|                        | Some description text    |              |
| bgcolor                | #003087                  |              |
| text-color             | #ffffff                  |              |
| columns                | 3                        |              |
| cta-button-color       | #ff6b00                  |              |
| cta-text-color         | #ffffff                  |              |
```

### Side-by-side layout

To display 2, 3, or 4 blocks next to each other, add multiple **Promotional Hero (JPG)** blocks inside the same section and set `columns` to the same value in each one (e.g. `3` for a 3-up layout). The grid will automatically fill the row.

## Authoring in Universal Editor (da.live UE)

The block appears in the block picker under **Blocks → Promotional Hero (JPG)**. After inserting it, use the properties panel to set:

- **Background Color** — CSS color for the block background
- **Text Color** — CSS color for the description text
- **Columns** — Select 1, 2, 3, or 4 for side-by-side layouts
- **CTA Button Color** — CSS color for the button background
- **CTA Button Text Color** — CSS color for the button label

## Color values

All color fields accept any valid CSS color:

- Hex: `#003087`, `#fff`
- Named: `blue`, `white`, `transparent`
- RGB/RGBA: `rgb(0, 48, 135)`, `rgba(0,0,0,0.5)`

If a color field is left blank, the block uses its default styling.

## Notes

- `columns` defaults to `2` when not set
- Colors apply immediately on page load — no JavaScript refresh needed
- The block also supports many advanced config options (image ratio, card size, hover effects, etc.) via the same key-value row pattern — see the JS DEFAULTS for a full list
