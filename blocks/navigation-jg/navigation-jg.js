/**
 * Navigation JG Block
 * Full-width navigation bar with configurable colors, hover effects,
 * and dropdown sub-navigation for PLP links.
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  if (block.dataset.decorated) return;
  block.dataset.decorated = 'true';

  const rows = [...block.querySelectorAll(':scope > div')];

  // Helper: find config row by label
  const getConfigValue = (label) => {
    const row = rows.find((r) => r.querySelector(':scope > div')?.textContent?.trim().toLowerCase() === label.toLowerCase());
    return row?.querySelector(':scope > div:last-child')?.textContent?.trim() ?? '';
  };

  // Extract config
  const bgColor = getConfigValue('background color') || '#1b1f3e';
  const textColor = getConfigValue('text color') || '#ffffff';

  // Identify nav item rows (skip config rows)
  const configLabels = ['background color', 'text color'];
  const navRows = rows.filter((r) => {
    const label = r.querySelector(':scope > div')?.textContent?.trim().toLowerCase();
    return !configLabels.includes(label);
  });

  // Build navigation structure
  const nav = document.createElement('nav');
  nav.className = 'navigation-jg__nav';
  nav.setAttribute('aria-label', 'Main navigation');

  // Mobile hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'navigation-jg__hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<span class="navigation-jg__hamburger-icon"></span>';
  nav.appendChild(hamburger);

  // Navigation list
  const ul = document.createElement('ul');
  ul.className = 'navigation-jg__list';

  navRows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const categoryName = cells[0]?.textContent?.trim();
    if (!categoryName) return;

    const subLinks = cells[1] ? [...cells[1].querySelectorAll('a')] : [];
    const li = document.createElement('li');
    li.className = 'navigation-jg__item';

    if (subLinks.length > 0) {
      li.classList.add('navigation-jg__item--has-children');

      // Top-level button (for dropdown)
      const trigger = document.createElement('button');
      trigger.className = 'navigation-jg__trigger';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = `<span>${categoryName}</span><span class="navigation-jg__chevron" aria-hidden="true"></span>`;
      li.appendChild(trigger);

      // Dropdown panel
      const dropdown = document.createElement('div');
      dropdown.className = 'navigation-jg__dropdown';

      const subUl = document.createElement('ul');
      subUl.className = 'navigation-jg__sub-list';
      subLinks.forEach((link) => {
        const subLi = document.createElement('li');
        subLi.className = 'navigation-jg__sub-item';
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = 'navigation-jg__sub-link';
        subLi.appendChild(a);
        subUl.appendChild(subLi);
      });
      dropdown.appendChild(subUl);
      li.appendChild(dropdown);

      // Desktop: hover to open
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
        // Close other open items
        ul.querySelectorAll('.navigation-jg__trigger[aria-expanded="true"]').forEach((other) => {
          if (other !== trigger) other.setAttribute('aria-expanded', 'false');
        });
        trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    } else {
      // Simple link item (no sub-nav)
      const a = document.createElement('a');
      a.className = 'navigation-jg__link';
      a.href = '#';
      a.textContent = categoryName;
      li.appendChild(a);
    }

    ul.appendChild(li);
  });

  nav.appendChild(ul);

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    ul.classList.toggle('navigation-jg__list--open');
  });

  // Close dropdowns on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.querySelectorAll('.navigation-jg__trigger[aria-expanded="true"]').forEach((trigger) => {
        trigger.setAttribute('aria-expanded', 'false');
      });
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        ul.classList.remove('navigation-jg__list--open');
      }
    }
  });

  // Apply custom colors as CSS variables
  block.style.setProperty('--nav-bg-color', bgColor);
  block.style.setProperty('--nav-text-color', textColor);

  // Replace block content
  block.textContent = '';
  block.appendChild(nav);
}
