/**
 * Sidebar Component
 *
 * Vanilla JS port of the React Sidebar - Table of Contents style.
 * Starts collapsed, overlays content when expanded.
 */

const imgChevronLeftPipe = '/icons/chevron-left-pipe.svg';

const tableOfContentsItems = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'background', label: 'Background' },
  { id: 'model-architecture', label: 'Model Architecture' },
  { id: 'why-self-attention', label: 'Why Self-Attention' },
  { id: 'training', label: 'Training' },
  { id: 'results', label: 'Results' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'references', label: 'References' },
];

/**
 * Create sidebar component
 * @param {HTMLElement} container - Container to append to
 * @param {Object} options - Options
 * @param {Function} options.onScrollToHeading - Callback when TOC item clicked
 * @returns {Object} - Component API
 */
export function createSidebar(container, { onScrollToHeading } = {}) {
  let isCollapsed = true;
  let activeItem = 'abstract';

  // Wrapper for both expand button and aside
  const wrapper = document.createElement('div');
  wrapper.className = 'absolute top-0 left-0 z-10';

  function render() {
    wrapper.innerHTML = '';

    if (isCollapsed) {
      // Expand button
      const expandBtn = document.createElement('div');
      expandBtn.className = 'fixed left-4 top-4 z-50 cursor-pointer flex items-center justify-center';
      Object.assign(expandBtn.style, {
        width: '40px',
        height: '40px',
        backgroundColor: 'var(--app-sidebar-bg)',
        borderRadius: '8px',
      });
      expandBtn.addEventListener('click', () => { isCollapsed = false; render(); });

      const expandIcon = document.createElement('img');
      expandIcon.src = imgChevronLeftPipe;
      expandIcon.alt = 'Expand';
      expandIcon.className = 'block max-w-none w-5 h-5';
      expandIcon.style.transform = 'rotate(180deg)';
      expandIcon.style.filter = 'var(--app-icon-invert)';
      expandBtn.appendChild(expandIcon);
      wrapper.appendChild(expandBtn);
    }

    // Aside (always rendered for animation, but width/opacity controlled)
    const aside = document.createElement('aside');
    aside.className = 'relative transition-all duration-300';
    Object.assign(aside.style, {
      width: isCollapsed ? '0px' : '254px',
      height: 'calc(100vh - 32px)',
      backgroundColor: 'var(--app-sidebar-bg)',
      borderRadius: '12px',
      boxShadow: '0px -24px 100px 0px rgba(0, 0, 0, 0.25)',
      margin: '16px',
      marginRight: '8px',
      overflow: 'hidden',
      opacity: isCollapsed ? '0' : '1',
    });

    // Top section: workspace + doc title
    const topSection = document.createElement('div');
    topSection.className = 'absolute left-[24px] top-[24px] right-[55px] flex flex-col gap-[8px]';

    const workspaceRow = document.createElement('div');
    workspaceRow.className = 'flex items-start gap-[6px]';

    const hamburgerIcon = document.createElement('div');
    hamburgerIcon.className = 'relative shrink-0 opacity-50';
    hamburgerIcon.style.width = '12px';
    hamburgerIcon.style.height = '12px';
    hamburgerIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="8" height="1" fill="var(--app-text-primary)" />
      <rect x="0" y="2.5" width="8" height="1" fill="var(--app-text-primary)" />
      <rect x="0" y="5" width="8" height="1" fill="var(--app-text-primary)" />
    </svg>`;

    const workspaceLabel = document.createElement('p');
    workspaceLabel.className = "font-['Urbanist',sans-serif] font-normal leading-none opacity-50 whitespace-pre";
    workspaceLabel.style.fontSize = '12px';
    workspaceLabel.style.color = 'var(--app-text-primary)';
    workspaceLabel.textContent = "Mihir's Workspace";

    workspaceRow.appendChild(hamburgerIcon);
    workspaceRow.appendChild(workspaceLabel);
    topSection.appendChild(workspaceRow);

    const docTitle = document.createElement('p');
    docTitle.className = "font-['Urbanist',sans-serif] font-semibold leading-none opacity-90 whitespace-pre";
    docTitle.style.fontSize = '16px';
    docTitle.style.color = 'var(--app-text-primary)';
    docTitle.textContent = 'Attention Is All You Need';
    topSection.appendChild(docTitle);

    aside.appendChild(topSection);

    // TOC section
    const tocSection = document.createElement('div');
    tocSection.className = 'absolute left-[24px] top-[155px] right-[24px] bottom-[384px] flex flex-col gap-[12px]';

    // TOC header + collapse button
    const tocHeader = document.createElement('div');
    tocHeader.className = 'flex gap-[8px] items-center justify-between';

    const tocLabel = document.createElement('div');
    tocLabel.className = "font-['Geist_Mono',monospace] font-normal leading-[0] opacity-[0.52] uppercase";
    tocLabel.style.fontSize = '10px';
    tocLabel.style.color = 'var(--app-text-primary)';
    const tocLabelP = document.createElement('p');
    tocLabelP.className = 'leading-[1.5] whitespace-pre';
    tocLabelP.textContent = 'Table of Contents';
    tocLabel.appendChild(tocLabelP);

    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'flex gap-2.5 items-center p-2 rounded-full shrink-0 hover:bg-white/5 transition-colors -mr-2';
    collapseBtn.style.border = 'none';
    collapseBtn.style.backgroundColor = 'transparent';
    collapseBtn.style.cursor = 'pointer';
    collapseBtn.addEventListener('click', () => { isCollapsed = true; render(); });

    const collapseIcon = document.createElement('img');
    collapseIcon.src = imgChevronLeftPipe;
    collapseIcon.alt = 'Collapse';
    collapseIcon.className = 'block max-w-none w-5 h-5';
    collapseIcon.style.filter = 'var(--app-icon-invert)';
    collapseBtn.appendChild(collapseIcon);

    tocHeader.appendChild(tocLabel);
    tocHeader.appendChild(collapseBtn);
    tocSection.appendChild(tocHeader);

    // TOC items
    const tocList = document.createElement('div');
    tocList.className = 'flex flex-col';

    tableOfContentsItems.forEach((item) => {
      const isActive = activeItem === item.id;
      const button = document.createElement('button');
      button.className = `flex items-center w-full text-left${isActive ? '' : ' opacity-[0.52]'}`;
      button.style.gap = isActive ? '8px' : '10px';
      button.style.border = 'none';
      button.style.backgroundColor = 'transparent';
      button.style.cursor = 'pointer';
      button.style.padding = '0';

      button.addEventListener('click', () => {
        activeItem = item.id;
        if (onScrollToHeading) onScrollToHeading(item.label);
        render();
      });

      // Vertical line indicator
      const lineWrapper = document.createElement('div');
      lineWrapper.className = 'flex flex-row items-center self-stretch';
      const lineInner = document.createElement('div');
      lineInner.className = 'h-full overflow-clip relative shrink-0';
      lineInner.style.width = '12px';
      const lineBase = document.createElement('div');
      lineBase.className = 'absolute bottom-0 left-1/2 top-0 -translate-x-1/2';
      lineBase.style.width = '1px';
      lineBase.style.backgroundColor = 'rgba(255,255,255,0.24)';
      lineInner.appendChild(lineBase);

      if (isActive) {
        const lineActive = document.createElement('div');
        lineActive.className = 'absolute left-1/2 -translate-x-1/2';
        lineActive.style.top = '7px';
        lineActive.style.bottom = '7px';
        lineActive.style.width = '2px';
        lineActive.style.backgroundColor = '#ffc31c';
        lineInner.appendChild(lineActive);
      }

      lineWrapper.appendChild(lineInner);
      button.appendChild(lineWrapper);

      // Label
      const labelDiv = document.createElement('div');
      labelDiv.className = "font-['Geist_Mono',monospace] font-normal";
      labelDiv.style.fontSize = '12px';
      labelDiv.style.color = 'var(--app-text-primary)';
      const labelP = document.createElement('p');
      labelP.className = 'leading-[2.2] whitespace-pre';
      labelP.textContent = item.label;
      labelDiv.appendChild(labelP);
      button.appendChild(labelDiv);

      tocList.appendChild(button);
    });

    tocSection.appendChild(tocList);
    aside.appendChild(tocSection);
    wrapper.appendChild(aside);
  }

  render();
  container.appendChild(wrapper);

  return {
    el: wrapper,
    destroy() {
      wrapper.remove();
    },
  };
}
