/**
 * Navigation Bar Block
 * Full-width navigation with configurable colors, hover accent underline,
 * dropdown sub-navigation for PLP links, and optional breadcrumb row.
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  if (block.dataset.decorated) return;
  block.dataset.decorated = 'true';

  const rows = [...block.querySelectorAll(':scope > div')];

  // Helper: find config row by label (case-insensitive)
  const getConfigValue = (label) => {
    const row = rows.find(
      (r) => r.querySelector(':scope > div')?.textContent?.trim().toLowerCase() === label.toLowerCase(),
    );
    return row?.querySelector(':scope > div:last-child')?.textContent?.trim() ?? '';
  };

  // Extract config
  const bgColor = getConfigValue('background color') || '#1b1f3e';
  const textColor = getConfigValue('text color') || '#ffffff';
  const accentColor = getConfigValue('hover accent color') || '#3b82f6';

  // Identify config and special rows
  const configLabels = ['background color', 'text color', 'hover accent color'];
  const breadcrumbLabel = 'breadcrumb';

  let breadcrumbRow = null;
  const navRows = [];

  rows.forEach((r) => {
    const label = r.querySelector(':scope > div')?.textContent?.trim().toLowerCase();
    if (configLabels.includes(label)) return;
    if (label === breadcrumbLabel) {
      breadcrumbRow = r;
      return;
    }
    navRows.push(r);
  });

  // Apply custom colors as CSS variables
  block.style.setProperty('--nav-bg-color', bgColor);
  block.style.setProperty('--nav-text-color', textColor);
  block.style.setProperty('--nav-accent-color', accentColor);

  // Build wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-bar__wrapper';

  // --- Main Nav Bar ---
  const navBar = document.createElement('div');
  navBar.className = 'nav-bar__bar';

  const navInner = document.createElement('nav');
  navInner.className = 'nav-bar__inner';
  navInner.setAttribute('aria-label', 'Main navigation');

  // Hamburger
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-bar__hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<span class="nav-bar__hamburger-icon"></span>';
  navInner.appendChild(hamburger);

  // Nav list
  const ul = document.createElement('ul');
  ul.className = 'nav-bar__list';

  navRows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const categoryName = cells[0]?.textContent?.trim();
    if (!categoryName) return;

    const subLinks = cells[1] ? [...cells[1].querySelectorAll('a')] : [];
    const li = document.createElement('li');
    li.className = 'nav-bar__item';

    if (subLinks.length > 0) {
      li.classList.add('nav-bar__item--has-children');

      const trigger = document.createElement('button');
      trigger.className = 'nav-bar__trigger';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = `<span>${categoryName}</span><svg class="nav-bar__chevron" aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      li.appendChild(trigger);

      // Dropdown
      const dropdown = document.createElement('div');
      dropdown.className = 'nav-bar__dropdown';
      const subUl = document.createElement('ul');
      subUl.className = 'nav-bar__sub-list';
      subLinks.forEach((link) => {
        const subLi = document.createElement('li');
        subLi.className = 'nav-bar__sub-item';
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = 'nav-bar__sub-link';
        subLi.appendChild(a);
        subUl.appendChild(subLi);
      });
      dropdown.appendChild(subUl);
      li.appendChild(dropdown);

      // Desktop hover
      li.addEventListener('mouseenter', () => {
        trigger.setAttribute('aria-expanded', 'true');
      });
      li.addEventListener('mouseleave', () => {
        trigger.setAttribute('aria-expanded', 'false');
      });

      // Click toggle (mobile + accessibility)
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        ul.querySelectorAll('.nav-bar__trigger[aria-expanded="true"]').forEach((other) => {
          if (other !== trigger) other.setAttribute('aria-expanded', 'false');
        });
        trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    } else {
      // Direct link item (no sub-nav, no chevron)
      const a = document.createElement('a');
      a.className = 'nav-bar__link';
      a.href = '#';
      a.textContent = categoryName;
      li.appendChild(a);
    }

    ul.appendChild(li);
  });

  navInner.appendChild(ul);
  navBar.appendChild(navInner);
  wrapper.appendChild(navBar);

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    ul.classList.toggle('nav-bar__list--open');
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navInner.querySelectorAll('.nav-bar__trigger[aria-expanded="true"]').forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
      });
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        ul.classList.remove('nav-bar__list--open');
      }
    }
  });

  // --- Breadcrumb Row (optional) ---
  if (breadcrumbRow) {
    const bcCell = breadcrumbRow.querySelector(':scope > div:last-child');
    if (bcCell) {
      const bcBar = document.createElement('div');
      bcBar.className = 'nav-bar__breadcrumb-bar';

      const bcInner = document.createElement('nav');
      bcInner.className = 'nav-bar__breadcrumb-inner';
      bcInner.setAttribute('aria-label', 'Breadcrumb');

      const bcList = document.createElement('ol');
      bcList.className = 'nav-bar__breadcrumb-list';

      // Parse breadcrumb by walking child nodes of the content container
      // EDS wraps inline content in <p> tags, so look inside those
      const bcContainer = bcCell.querySelector('p') || bcCell;
      const bcSegments = [];
      bcContainer.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
          bcSegments.push({ text: node.textContent.trim(), href: node.href });
        } else if (node.nodeType === Node.TEXT_NODE) {
          const parts = node.textContent.split('>');
          parts.forEach((part) => {
            const trimmed = part.trim();
            if (trimmed) {
              bcSegments.push({ text: trimmed });
            }
          });
        }
      });

      bcSegments.forEach((seg, i) => {
        const bcLi = document.createElement('li');
        bcLi.className = 'nav-bar__breadcrumb-item';

        if (seg.href && i < bcSegments.length - 1) {
          const a = document.createElement('a');
          a.href = seg.href;
          a.textContent = seg.text;
          a.className = 'nav-bar__breadcrumb-link';
          bcLi.appendChild(a);
        } else {
          const span = document.createElement('span');
          span.className = 'nav-bar__breadcrumb-current';
          span.textContent = seg.text;
          if (i === bcSegments.length - 1) {
            span.setAttribute('aria-current', 'page');
          }
          bcLi.appendChild(span);
        }

        bcList.appendChild(bcLi);
      });

      bcInner.appendChild(bcList);
      bcBar.appendChild(bcInner);
      wrapper.appendChild(bcBar);
    }
  }

  // Replace block content
  block.textContent = '';
  block.appendChild(wrapper);
}
