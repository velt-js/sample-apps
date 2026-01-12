/**
 * Sidebar Component
 *
 * Vanilla JS port of the React Sidebar component.
 * Creates the same DOM structure with identical classNames and styling.
 */

const imgTablerIconChevronLeftPipe = '/icons/chevron-left-pipe.svg';

// Table of contents items matching the React version
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
 * Create the Sidebar component
 * @param {HTMLElement} container - Container element to mount into
 * @param {Object} options - Options including onScrollToHeading callback
 * @returns {Object} - Component API with el and destroy methods
 */
export function createSidebar(container, options = {}) {
  const { onScrollToHeading } = options;
  let activeItem = 'abstract';
  let isCollapsed = true;

  // Create root element
  const root = document.createElement('div');
  root.style.display = 'contents';

  // Expand button (shown when collapsed)
  const expandButton = document.createElement('div');
  expandButton.className = 'fixed left-4 top-4 z-50 cursor-pointer flex items-center justify-center';
  expandButton.style.cssText = 'width: 40px; height: 40px; background-color: rgb(14, 14, 14); border-radius: 8px;';
  expandButton.innerHTML = `
    <img
      src="${imgTablerIconChevronLeftPipe}"
      alt="Expand"
      class="block max-w-none w-5 h-5"
      style="transform: rotate(180deg);"
    />
  `;

  // Sidebar container
  const sidebar = document.createElement('aside');
  sidebar.className = 'relative transition-all duration-300';

  /**
   * Render the sidebar content
   */
  function renderSidebar() {
    sidebar.style.width = isCollapsed ? '0px' : '254px';
    sidebar.style.height = 'calc(100vh - 32px)';
    sidebar.style.backgroundColor = '#0e0e0e';
    sidebar.style.borderRadius = '12px';
    sidebar.style.boxShadow = '0px -24px 100px 0px rgba(0, 0, 0, 0.25)';
    sidebar.style.margin = '16px';
    sidebar.style.marginRight = '8px';
    sidebar.style.overflow = 'hidden';
    sidebar.style.opacity = isCollapsed ? '0' : '1';

    sidebar.innerHTML = `
      <div class="absolute left-[24px] top-[24px] right-[55px] flex flex-col gap-[8px]">
        <div class="flex items-start gap-[6px]">
          <div class="relative shrink-0 size-[12px] opacity-50">
            <svg width="12" height="12" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="8" height="1" fill="white" />
              <rect x="0" y="2.5" width="8" height="1" fill="white" />
              <rect x="0" y="5" width="8" height="1" fill="white" />
            </svg>
          </div>
          <p class="font-['Urbanist',sans-serif] font-normal leading-none opacity-50 text-[12px] text-white whitespace-pre">
            Mihir's Workspace
          </p>
        </div>

        <p class="font-['Urbanist',sans-serif] font-semibold leading-none opacity-90 text-[16px] text-white whitespace-pre">
          Attention Is All You Need
        </p>
      </div>

      <div class="absolute left-[24px] top-[155px] right-[24px] bottom-[384px] flex flex-col gap-[12px]">
        <div class="flex gap-[8px] items-center justify-between">
          <div class="font-['Geist_Mono',monospace] font-normal leading-[0] opacity-[0.52] text-[10px] text-white uppercase">
            <p class="leading-[1.5] whitespace-pre">Table of Contents</p>
          </div>
          <button
            class="collapse-btn flex gap-2.5 items-center p-2 rounded-full shrink-0 hover:bg-white/5 transition-colors -mr-2"
          >
            <img
              src="${imgTablerIconChevronLeftPipe}"
              alt="Collapse"
              class="block max-w-none w-5 h-5"
            />
          </button>
        </div>

        <div class="flex flex-col" id="toc-items">
          ${tableOfContentsItems.map(item => {
            const isActive = activeItem === item.id;
            return `
              <button
                class="toc-item flex gap-[${isActive ? '8' : '10'}px] items-center ${isActive ? '' : 'opacity-[0.52]'} w-full text-left"
                data-id="${item.id}"
              >
                <div class="flex flex-row items-center self-stretch">
                  <div class="h-full overflow-clip relative shrink-0 w-[12px]">
                    <div class="absolute bg-[rgba(255,255,255,0.24)] bottom-0 left-1/2 top-0 -translate-x-1/2 w-px"></div>
                    ${isActive ? '<div class="absolute bg-[#ffc31c] bottom-[7px] left-1/2 top-[7px] -translate-x-1/2 w-[2px]"></div>' : ''}
                  </div>
                </div>

                <div class="font-['Geist_Mono',monospace] font-normal text-[12px] text-white">
                  <p class="leading-[2.2] whitespace-pre">${item.label}</p>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Add event listeners
    const collapseBtn = sidebar.querySelector('.collapse-btn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        isCollapsed = true;
        updateVisibility();
      });
    }

    const tocItems = sidebar.querySelectorAll('.toc-item');
    tocItems.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        activeItem = id;
        renderSidebar();
        if (onScrollToHeading) {
          const tocItem = tableOfContentsItems.find(t => t.id === id);
          if (tocItem) {
            onScrollToHeading(tocItem.label);
          }
        }
      });
    });
  }

  /**
   * Update sidebar visibility based on collapsed state
   */
  function updateVisibility() {
    // Update expand button visibility
    expandButton.style.display = isCollapsed ? 'flex' : 'none';

    // Re-render sidebar with updated collapsed state
    renderSidebar();
  }

  // Event handlers
  expandButton.addEventListener('click', () => {
    isCollapsed = false;
    updateVisibility();
  });

  // Initial render
  updateVisibility();

  // Mount to container
  root.appendChild(expandButton);
  root.appendChild(sidebar);
  container.appendChild(root);

  return {
    el: root,
    isCollapsed: () => isCollapsed,
    destroy() {
      root.remove();
    },
  };
}
