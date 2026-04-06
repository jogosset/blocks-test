# hero-jg

## What this block does

A hero banner with a full-bleed background image and overlay text
(title, subtitle, description) plus a call-to-action button. The
title sits on the left; the subtitle, description, and CTA sit on
the right. Text color and CTA button opacity are author-configurable
so the block adapts to light or dark imagery without code changes.

## Who should use it

Content authors and merchandisers who need a visual hero at the top
of a landing page.

## DA.live authoring

Create a block named **hero-jg** with this table structure:

| hero-jg            |                              |
|--------------------|------------------------------|
| _(image + heading + subheading + description + CTA link in one cell)_ ||
| text-color         | `#ffffff`                    |
| cta-button-opacity | `24`                         |

First row: a single cell containing (in order) a picture, an `h2`
title, an `h3` subtitle, a `p` description, and a `p` wrapping an
`a` link for the CTA.

Additional rows are key/value config pairs and are removed from the
DOM at render time.

## Universal Editor fields

| Field                | Type      | Purpose                                        |
|----------------------|-----------|------------------------------------------------|
| `image`              | reference | Background image. Uses DA.live's default asset picker. |
| `imageAlt`           | text      | Alt text for the background image.             |
| `title`              | text      | `h2` title (shown top-left).                    |
| `subtitle`           | text      | `h3` subtitle (shown top-right).                |
| `description`        | text      | Description paragraph (right column).           |
| `ctaLabel`           | text      | Visible CTA link text.                          |
| `ctaUrl`             | text      | CTA link destination.                           |
| `text-color`         | text      | CSS color string (e.g. `#ffffff`, `white`). Applied to all overlay text and the CTA label. |
| `cta-button-opacity` | text      | `0`–`100`. Percent white fill on the CTA button. Default `24`. |

## Configuration options

- **text-color**: any valid CSS color string. Applied via inline
  `color` on the CTA and via the `--hero-jg-text-color` custom
  property on block-scoped text.
- **cta-button-opacity**: integer `0`–`100`. Computed to
  `rgba(255, 255, 255, opacity/100)` and applied as an inline
  `background-color` on the CTA link. Values outside `[0, 100]` are
  clamped; non-numeric or missing values fall back to `24`.

## Known limitations

- The CTA background color is always white with configurable opacity;
  a non-white button color would require a code change.
- Layout uses absolute positioning tuned for desktop widths. Very
  narrow images or long text may overlap at small viewports.
- `text-color` applied to the CTA uses inline `!important` and will
  override any CSS rules from global themes.

## Developer notes

**Files**
- `hero-jg.js` — `decorate()` entry point. Parses config rows, builds
  a single `hero-jg-main > hero-jg-content > (hero-jg-image + hero-jg-body)`
  wrapper, routes `<picture>`-containing children into `hero-jg-image`
  and everything else into `hero-jg-body`, and applies the computed
  `rgba()` and `text-color` as inline `!important` styles on the CTA
  link so they win over EDS global button styles regardless of CSS
  load order.
- `hero-jg.css` — block-scoped styles. Uses `--hero-jg-cta-bg` and
  `--hero-jg-text-color` custom properties set by the JS.
- `hero-jg.test.js` — unit tests for the opacity parsing / clamping
  logic. Run with `node blocks/hero-jg/hero-jg.test.js`.
- `_hero-jg.json` — DA.live unsafeHTML template and UE model
  definition (merged into root `component-definition.json` /
  `component-models.json`).

**Extending**
- To add a new config option, add a row to the unsafeHTML template
  in `_hero-jg.json`, add a field to the model, and read it from
  `config[key]` inside `decorate()`.
- To change CSS variable substitution into `rgba()`, compute the
  full `rgba()` string in JS — CSS variable substitution inside
  `rgba()` is unreliable across browsers.
