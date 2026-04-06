import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Read all config rows (every row after the first content row is a key-value config pair)
  const allRows = [...block.querySelectorAll(':scope > div')];
  const configRows = allRows.slice(1);
  const config = {};

  configRows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      if (key) config[key] = value;
    }
    row.remove();
  });

  // Apply text color
  if (config['text-color']) {
    block.style.setProperty('--hero-jg-text-color', config['text-color']);
  }

  // Apply CTA button background — compute full rgba() in JS so CSS never needs
  // to substitute a custom property into rgba(), which is unreliable cross-browser.
  const pct = parseFloat(config['cta-button-opacity']);
  const opacity = Number.isNaN(pct) ? 0.24 : Math.min(1, Math.max(0, pct / 100));
  const ctaBg = `rgba(255, 255, 255, ${opacity})`;
  block.style.setProperty('--hero-jg-cta-bg', ctaBg);

  const contentCell = block.querySelector('div:nth-child(1)>div:nth-child(1)');
  if (!contentCell) return;

  // Build a single hero-jg-main > hero-jg-content > (hero-jg-image + hero-jg-body)
  // structure. Anything containing a <picture> goes to heroimage; everything
  // else (headings, paragraphs, CTA link) goes to herobody. This keeps all
  // content together and makes the CTA link reliably targetable afterwards.
  const heromain = document.createElement('div');
  heromain.className = 'hero-jg-main';
  const herocontent = document.createElement('div');
  herocontent.className = 'hero-jg-content';
  const heroimage = document.createElement('div');
  heroimage.className = 'hero-jg-image';
  const herobody = document.createElement('div');
  herobody.className = 'hero-jg-body';

  [...contentCell.children].forEach((child) => {
    if (child.tagName === 'PICTURE' || child.querySelector?.('picture')) {
      heroimage.append(child);
    } else {
      herobody.append(child);
    }
  });

  herocontent.append(heroimage);
  herocontent.append(herobody);
  heromain.append(herocontent);

  // Optimize all images
  heroimage.querySelectorAll('picture > img').forEach((img) => {
    const src = img.getAttribute('src') || img.src;
    const alt = img.getAttribute('alt') || '';
    if (src) {
      img.closest('picture').replaceWith(createOptimizedPicture(src, alt, false, [{ width: '750' }]));
    }
  });
  block.replaceChildren(heromain);

  // Apply CTA background directly on the button element(s) as an inline
  // !important so it always wins over global EDS button styles regardless
  // of CSS load order, specificity, or late-arriving stylesheets.
  const ctaLinks = block.querySelectorAll('.hero-jg-body a, .hero-jg-image a, a.button');
  ctaLinks.forEach((btn) => {
    btn.style.setProperty('background-color', ctaBg, 'important');
    if (config['text-color']) {
      btn.style.setProperty('color', config['text-color'], 'important');
    }
  });
}
