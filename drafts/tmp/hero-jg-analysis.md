# hero-jg: Two-Bug Fix Analysis

## Bug 1: Image picker opens wrong assets repository

**What:** The image field opens DA.live's default asset picker instead of
the AEM Assets Cloud instance.

**Root cause:** The model `image` field uses `"component": "reference"` but
has no `rootPath`. Without rootPath, the picker defaults to the DA.live
content source (content.da.live). The correct AEM Assets instance is
https://author-p158081-e1683323.adobeaemcloud.com/content/dam

**Fix:** Add `"rootPath": "https://author-p158081-e1683323.adobeaemcloud.com/content/dam"`
to the image field in the model (same pattern used in company-myaccount-banner).

---

## Bug 2: cta-button-opacity doesn't change button rendering

**What:** Changing the authored cta-button-opacity value has no visible
effect on the CTA button's background.

**Root cause:** The JS correctly computes `--hero-jg-cta-bg` and sets it as
a CSS custom property on the block element. The CSS consumes it via
`var(--hero-jg-cta-bg)`. However, EDS global button styles (applied by
decorateButtons() + styles.css / lazy-styles.css) can override the block's
`background-color` rule depending on load order and specificity. Because CSS
variable resolution is correct but the computed value is silently overridden
by a global rule, the opacity never visually changes.

**Fix:** After building the DOM, apply `background-color` as an inline style
directly on the button element(s). Inline styles always win over class-based
rules regardless of CSS specificity or load order. Keep the CSS variable as
a fallback for UE's structure path.

---

## Acceptance Criteria

- [ ] Image picker opens https://author-p158081-e1683323.adobeaemcloud.com/content/dam
- [ ] cta-button-opacity: 0   → button background fully transparent
- [ ] cta-button-opacity: 50  → button background 50% white
- [ ] cta-button-opacity: 100 → button background fully opaque white
- [ ] cta-button-opacity: 24 (default) → 24% white background
- [ ] Invalid/missing value   → graceful fallback to 24%
- [ ] text-color still works alongside opacity
- [ ] No regressions on layout or other features
- [ ] Lint passes
