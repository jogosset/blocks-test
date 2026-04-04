/**
 * Product Hero block
 * Renders a large product image alongside name, short description, and a CTA.
 * Supports light (default) and dark themes via a data-theme attribute set from
 * the block's variant class (add "dark" variant in the authoring table).
 *
 * Expected authored structure (two-column table):
 * | Product Hero |           |
 * |--------------|-----------|
 * | [image]      | Product Name (h2) |
 * |              | Short description |
 * |              | [CTA link]        |
 *
 * @param {Element} block the block element
 */
export default function decorate(block) {
  // Set data-theme from variant class; default to light
  block.dataset.theme = block.classList.contains('dark') ? 'dark' : 'light';

  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cells = [...row.querySelectorAll(':scope > div')];
  const [mediaCell, contentCell] = cells;

  // --- Media ---
  const media = document.createElement('div');
  media.className = 'ph-media';
  const picture = mediaCell?.querySelector('picture');
  if (picture) media.append(picture);

  // --- Content ---
  const content = document.createElement('div');
  content.className = 'ph-content';

  if (contentCell) {
    const heading = contentCell.querySelector('h1, h2, h3');
    const allParas = [...contentCell.querySelectorAll('p')];
    const ctaP = allParas.find((p) => p.querySelector('a'));
    const descP = allParas.find((p) => p !== ctaP);

    if (heading) {
      heading.className = 'ph-name';
      content.append(heading);
    }

    if (descP) {
      descP.className = 'ph-description';
      content.append(descP);
    }

    if (ctaP) {
      const link = ctaP.querySelector('a');
      link.className = 'button primary';
      const cta = document.createElement('div');
      cta.className = 'ph-cta';
      cta.append(link);
      content.append(cta);
    }
  }

  block.replaceChildren(media, content);
}
