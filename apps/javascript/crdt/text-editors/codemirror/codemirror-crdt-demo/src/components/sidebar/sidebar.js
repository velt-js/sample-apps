/**
 * Sidebar Component
 *
 * Vanilla JS port of the React Sidebar component.
 * Creates the same DOM structure with identical classNames and styling.
 */

// Asset paths
const imgTablerIconMenu2 = '/figma-assets/icon-menu.svg';
const imgTablerIconChevronLeftPipe = '/figma-assets/icon-chevron-left-pipe.svg';
const imgTablerIconBrain = '/figma-assets/icon-brain.svg';
const imgTablerIconChevronRight = '/figma-assets/icon-chevron-right-blue.svg';
const imgTablerIconTerminal = '/figma-assets/icon-terminal.svg';
const imgTablerIconSend = '/figma-assets/icon-send.svg';

/**
 * Create the Sidebar component
 * @param {HTMLElement} container - Container element to mount into
 * @returns {Object} - Component API with el and destroy methods
 */
export function createSidebar(container) {
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
  const sidebar = document.createElement('div');
  sidebar.className = 'bg-[#0e0e0e] content-stretch flex flex-col items-start justify-between relative h-full transition-all duration-300 overflow-hidden';
  sidebar.dataset.nodeId = '449:454';

  sidebar.innerHTML = `
    <div class="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="449:455">
      <div class="box-border content-stretch flex items-center justify-between pl-[16px] pr-[12px] py-[12px] relative shrink-0 w-full" data-node-id="449:456">
        <div class="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="449:457">
          <div class="relative shrink-0 size-[16px]" data-name="tabler-icon-menu-2" data-node-id="449:458">
            <img alt="" class="block max-w-none size-full" src="${imgTablerIconMenu2}" />
          </div>
          <p class="font-['Urbanist:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" data-node-id="449:460">
            Mihir's Workspace
          </p>
        </div>
        <button
          class="collapse-btn box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0 cursor-pointer hover:bg-white/5 rounded transition-colors"
          data-node-id="449:461"
        >
          <div class="relative shrink-0 size-[16px]" data-name="tabler-icon-chevron-left-pipe" data-node-id="449:462">
            <img alt="" class="block max-w-none size-full" src="${imgTablerIconChevronLeftPipe}" />
          </div>
        </button>
      </div>
      <div class="box-border content-stretch flex flex-col gap-[16px] items-start justify-center pl-[24px] pr-[8px] py-[8px] relative shrink-0 w-full" data-node-id="449:464">
        <div class="bg-[rgba(255,255,255,0.06)] box-border content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative rounded-[12px] shrink-0 w-full" data-node-id="449:465">
          <p class="basis-0 font-['Urbanist:Regular',sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[13px] text-white" data-node-id="449:466">
            Make a website for a photography portfolio which is minimal
          </p>
        </div>
      </div>
      <div class="box-border content-stretch flex flex-col gap-[16px] items-center justify-center px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="449:467">
        <div class="content-stretch flex gap-[8px] items-center opacity-[0.32] relative shrink-0 w-full" data-node-id="449:468">
          <div class="relative shrink-0 size-[14px]" data-name="tabler-icon-brain" data-node-id="449:469">
            <img alt="" class="block max-w-none size-full" src="${imgTablerIconBrain}" />
          </div>
          <p class="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[12px] text-white w-[78px]" data-node-id="449:471">
            Thought 52s
          </p>
        </div>
        <p class="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-white w-full" data-node-id="449:472">Perfect! I'll create a minimal and sophisticated photographer website inspired by these beautiful examples. Let me build this for you.</p>
        <div class="bg-[rgba(255,255,255,0.04)] border border-[#0070f3] border-solid box-border content-stretch flex gap-[10px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="449:473">
          <p class="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[13px] text-white" data-node-id="449:474">
            Photographer website
          </p>
          <div class="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="449:475">
            <p class="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-white w-[14px]" data-node-id="449:476">
              v1
            </p>
            <div class="relative shrink-0 size-[14px]" data-name="tabler-icon-chevron-right" data-node-id="449:477">
              <img alt="" class="block max-w-none size-full" src="${imgTablerIconChevronRight}" />
            </div>
          </div>
        </div>
        <p class="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-white w-full" data-node-id="449:479">I've created a minimal and sophisticated photographer portfolio website featuring a warm neutral color palette with off-white backgrounds and charcoal text. The design includes an elegant serif font (Cormorant Garamond) for headings paired with clean sans-serif body text, a responsive gallery grid with hover effects, smooth transitions, and generous white space that lets the photography breathe. The navigation is fixed and minimal, and the overall aesthetic emphasizes sophistication through restraint.</p>
        <div class="content-stretch flex gap-[4px] items-center opacity-50 relative shrink-0 w-full" data-node-id="449:480">
          <div class="relative shrink-0 size-[14px]" data-name="tabler-icon-terminal" data-node-id="449:481">
            <img alt="" class="block max-w-none size-full" src="${imgTablerIconTerminal}" />
          </div>
          <p class="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[12px] text-white w-[92px]" data-node-id="449:483">
            No issues found
          </p>
        </div>
      </div>
    </div>
    <div class="box-border content-stretch flex flex-col gap-[10px] items-start p-[12px] relative shrink-0 w-full" data-node-id="449:484">
      <div class="bg-[#121212] border border-[rgba(255,255,255,0.08)] border-solid box-border content-stretch flex h-[40px] items-center justify-between p-[12px] relative rounded-[12px] shrink-0 w-full" data-node-id="449:485">
        <div class="flex flex-col font-['Urbanist:Regular',sans-serif] font-normal justify-center leading-[0] opacity-[0.32] relative shrink-0 text-[14px] text-nowrap text-white" data-node-id="449:486">
          <p class="leading-none whitespace-pre">Ask a follow-up</p>
        </div>
        <div class="relative shrink-0 size-[16px]" data-name="tabler-icon-send" data-node-id="449:487">
          <img alt="" class="block max-w-none size-full" src="${imgTablerIconSend}" />
        </div>
      </div>
    </div>
  `;

  /**
   * Update sidebar visibility based on collapsed state
   */
  function updateVisibility() {
    // Update expand button visibility
    expandButton.style.display = isCollapsed ? 'flex' : 'none';

    // Update sidebar dimensions
    sidebar.style.width = isCollapsed ? '0px' : '267px';
    sidebar.style.opacity = isCollapsed ? '0' : '1';
  }

  /**
   * Toggle collapsed state
   */
  function toggle() {
    isCollapsed = !isCollapsed;
    updateVisibility();
  }

  // Event handlers
  expandButton.addEventListener('click', () => {
    isCollapsed = false;
    updateVisibility();
  });

  const collapseBtn = sidebar.querySelector('.collapse-btn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      isCollapsed = true;
      updateVisibility();
    });
  }

  // Initial state
  updateVisibility();

  // Mount to container
  root.appendChild(expandButton);
  root.appendChild(sidebar);
  container.appendChild(root);

  return {
    el: root,
    toggle,
    isCollapsed: () => isCollapsed,
    destroy() {
      root.remove();
    },
  };
}
