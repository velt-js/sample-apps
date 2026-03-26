/**
 * Sidebar Component
 *
 * Vanilla JS port of the React Sidebar component.
 * Collapsible document navigation with Starred and Private sections.
 */

const imgTablerIconChevronLeftPipe = '/icons/chevron-left-pipe.svg';

const starredDocuments = [
  { id: 'attention', emoji: '\u{1F9E0}', label: 'Attention Is All You Need' },
  { id: 'layer-norm', emoji: '\u{1F9C8}', label: 'Layer Normalization' },
  { id: 'power-attention', emoji: '\u{1F308}', label: 'The Power of Attention Mechanisms' },
];

const privateDocuments = [
  { id: 'harnessing', emoji: '\u{1F6A8}', label: 'Harnessing Attention for Enhanced Learning' },
  { id: 'revolutionizing', emoji: '\u{1F6DE}', label: 'Revolutionizing Neural Networks with Attention' },
  { id: 'frontier', emoji: '\u{2699}\u{FE0F}', label: 'Attention Mechanisms: A New Frontier in AI' },
  { id: 'transforming', emoji: '\u{1FAA0}', label: 'Transforming Data Processing through Attention' },
];

/**
 * Create a document section (Starred or Private)
 * @param {string} title - Section title
 * @param {Array} items - Document items
 * @param {string} activeItem - Currently active item ID
 * @param {Function} onSelect - Selection callback
 * @returns {HTMLElement}
 */
function createDocumentSection(title, items, activeItem, onSelect) {
  const section = document.createElement('div');
  section.className = 'flex flex-col';
  section.style.gap = '4px';

  // Section label
  const labelWrapper = document.createElement('div');
  labelWrapper.style.padding = '6px 8px';
  const label = document.createElement('span');
  Object.assign(label.style, {
    fontFamily: "'Urbanist', sans-serif",
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgb(163, 163, 163)',
  });
  label.textContent = title;
  labelWrapper.appendChild(label);
  section.appendChild(labelWrapper);

  // Document items container
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'flex flex-col';
  itemsContainer.style.gap = '2px';

  items.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'flex items-center w-full text-left transition-colors';
    const isActive = activeItem === item.id;
    Object.assign(button.style, {
      gap: '12px',
      padding: '8px',
      borderRadius: isActive ? '8px' : '32px',
      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
      border: 'none',
      cursor: 'pointer',
    });

    const emoji = document.createElement('span');
    emoji.className = 'shrink-0 leading-none';
    emoji.style.fontSize = '15px';
    emoji.textContent = item.emoji;

    const text = document.createElement('span');
    text.className = 'truncate';
    Object.assign(text.style, {
      fontFamily: "'Urbanist', sans-serif",
      fontSize: '15px',
      fontWeight: '400',
      color: 'var(--app-text-primary)',
    });
    text.textContent = item.label;

    button.appendChild(emoji);
    button.appendChild(text);

    button.addEventListener('click', () => onSelect(item.id));

    itemsContainer.appendChild(button);
  });

  section.appendChild(itemsContainer);
  return section;
}

/**
 * Create the sidebar component
 * @param {HTMLElement} container - Container element to append to
 * @returns {Object} - Component API with el and destroy methods
 */
export function createSidebar(container) {
  let isCollapsed = true;
  let activeItem = 'attention';

  const aside = document.createElement('aside');
  aside.className = 'relative shrink-0 flex flex-col transition-all duration-300 overflow-hidden';
  Object.assign(aside.style, {
    width: '251px',
    minWidth: '251px',
    height: '100%',
    backgroundColor: 'var(--app-sidebar-bg)',
  });

  function render() {
    aside.innerHTML = '';
    aside.style.width = isCollapsed ? '48px' : '251px';
    aside.style.minWidth = isCollapsed ? '48px' : '251px';

    if (isCollapsed) {
      // Collapsed: just show expand button
      const expandWrapper = document.createElement('div');
      expandWrapper.className = 'flex items-center justify-center pt-3';

      const expandBtn = document.createElement('button');
      expandBtn.className = 'flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity';
      Object.assign(expandBtn.style, { width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent' });

      const expandIcon = document.createElement('img');
      expandIcon.src = imgTablerIconChevronLeftPipe;
      expandIcon.alt = 'Expand';
      expandIcon.className = 'block w-4 h-4';
      expandIcon.style.transform = 'rotate(180deg)';
      expandIcon.style.filter = 'var(--app-icon-invert)';

      expandBtn.appendChild(expandIcon);
      expandBtn.addEventListener('click', () => { isCollapsed = false; render(); });
      expandWrapper.appendChild(expandBtn);
      aside.appendChild(expandWrapper);
      return;
    }

    // Expanded content
    // Top: header + document list
    const topSection = document.createElement('div');
    topSection.className = 'flex flex-col flex-1 min-h-0';

    // Header
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between shrink-0';
    header.style.padding = '12px 12px 12px 16px';
    header.style.gap = '45px';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'flex items-center gap-2';

    // Hamburger menu icon
    const hamburgerWrapper = document.createElement('div');
    hamburgerWrapper.className = 'shrink-0 w-4 h-4 flex items-center justify-center';
    hamburgerWrapper.innerHTML = `<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0" width="11" height="1.2" rx="0.6" fill="var(--app-text-primary)" />
      <rect y="3.4" width="11" height="1.2" rx="0.6" fill="var(--app-text-primary)" />
      <rect y="6.8" width="11" height="1.2" rx="0.6" fill="var(--app-text-primary)" />
    </svg>`;

    const workspaceLabel = document.createElement('span');
    workspaceLabel.className = 'whitespace-nowrap overflow-hidden text-ellipsis';
    Object.assign(workspaceLabel.style, {
      fontFamily: "'Urbanist', sans-serif",
      fontSize: '14px',
      fontWeight: '400',
      color: 'var(--app-text-primary)',
    });
    workspaceLabel.textContent = "Mihir's Workspace";

    headerLeft.appendChild(hamburgerWrapper);
    headerLeft.appendChild(workspaceLabel);

    // Collapse button
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'shrink-0 flex items-center justify-center p-1 rounded hover:opacity-70 transition-opacity';
    collapseBtn.style.border = 'none';
    collapseBtn.style.backgroundColor = 'transparent';
    collapseBtn.style.cursor = 'pointer';

    const collapseIcon = document.createElement('img');
    collapseIcon.src = imgTablerIconChevronLeftPipe;
    collapseIcon.alt = 'Collapse';
    collapseIcon.className = 'block w-4 h-4';
    collapseIcon.style.filter = 'var(--app-icon-invert)';

    collapseBtn.appendChild(collapseIcon);
    collapseBtn.addEventListener('click', () => { isCollapsed = true; render(); });

    header.appendChild(headerLeft);
    header.appendChild(collapseBtn);
    topSection.appendChild(header);

    // Divider
    const divider = document.createElement('div');
    divider.className = 'shrink-0';
    Object.assign(divider.style, { height: '1px', backgroundColor: 'var(--app-border)' });
    topSection.appendChild(divider);

    // Document list
    const docList = document.createElement('div');
    docList.className = 'flex-1 overflow-y-auto flex flex-col gap-4 p-2';

    const onSelect = (id) => {
      activeItem = id;
      render();
    };

    docList.appendChild(createDocumentSection('Starred', starredDocuments, activeItem, onSelect));
    docList.appendChild(createDocumentSection('Private', privateDocuments, activeItem, onSelect));
    topSection.appendChild(docList);

    aside.appendChild(topSection);

    // Bottom: Settings
    const settingsSection = document.createElement('div');
    settingsSection.className = 'shrink-0';
    settingsSection.style.padding = '16px';
    settingsSection.style.borderTop = '1px solid var(--app-border)';

    const settingsRow = document.createElement('div');
    settingsRow.className = 'flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity';

    const settingsIconWrapper = document.createElement('div');
    settingsIconWrapper.className = 'shrink-0 w-4 h-4 flex items-center justify-center';
    settingsIconWrapper.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="var(--app-text-primary)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M6.8 1.8l-.3 1.1a4.8 4.8 0 00-1.2.7L4.2 3.2l-1.2 2 .8.8a4.8 4.8 0 000 1.4l-.8.8 1.2 2 1.1-.4a4.8 4.8 0 001.2.7l.3 1.1h2.4l.3-1.1a4.8 4.8 0 001.2-.7l1.1.4 1.2-2-.8-.8a4.8 4.8 0 000-1.4l.8-.8-1.2-2-1.1.4a4.8 4.8 0 00-1.2-.7L9.2 1.8z" />
    </svg>`;

    const settingsLabel = document.createElement('span');
    Object.assign(settingsLabel.style, {
      fontFamily: "'Urbanist', sans-serif",
      fontSize: '14px',
      fontWeight: '400',
      color: 'var(--app-text-primary)',
    });
    settingsLabel.textContent = 'Settings';

    settingsRow.appendChild(settingsIconWrapper);
    settingsRow.appendChild(settingsLabel);
    settingsSection.appendChild(settingsRow);
    aside.appendChild(settingsSection);
  }

  render();
  container.appendChild(aside);

  return {
    el: aside,
    destroy() {
      aside.remove();
    },
  };
}
