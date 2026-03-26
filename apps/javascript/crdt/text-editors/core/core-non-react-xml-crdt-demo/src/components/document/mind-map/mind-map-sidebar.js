/**
 * Mind Map Sidebar Component
 *
 * Collapsible sidebar for switching between CRDT stores/documents.
 */

import { storeItems, storeSections } from './constants.js';

/**
 * Create the mind map sidebar
 * @param {HTMLElement} container - Container to append to
 * @param {Object} options - Options
 * @param {string} options.userName - Current user name (for avatar initial)
 * @param {Function} options.onSelectStore - Callback when a store is selected
 * @returns {Object} - Component API with el and destroy
 */
export function createMindMapSidebar(container, { userName = 'S', onSelectStore } = {}) {
  let isCollapsed = true;
  let selectedStoreId = 'sdk-decision';
  let searchQuery = '';

  const el = document.createElement('div');
  el.style.height = '100%';
  el.style.flexShrink = '0';

  function schemaIcon(color) {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
      <path d="M14 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
      <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
      <path d="M10 7h4"/>
      <path d="M7 10v5a1 1 0 0 0 1 1h6"/>
    </svg>`;
  }

  function render() {
    const userInitial = userName.charAt(0).toUpperCase();

    // Collapsed state — show only expand button
    if (isCollapsed) {
      el.style.width = '48px';
      el.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; padding-top:12px; background:var(--task-sidebar-bg);">
          <button class="expand-btn" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; border-radius:8px; border:none; background:transparent; cursor:pointer; transform:rotate(180deg);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m11 17-5-5 5-5"/>
              <path d="M18 17V7"/>
            </svg>
          </button>
        </div>`;
      el.querySelector('.expand-btn').onclick = () => {
        isCollapsed = false;
        render();
      };
      return;
    }

    // Expanded state
    el.style.width = '251px';

    // Filter store items by search query
    const filtered = storeSections
      .map((s) => ({
        ...s,
        items: s.items.filter((id) => {
          const item = storeItems.find((si) => si.id === id);
          return item?.name.toLowerCase().includes(searchQuery.toLowerCase());
        }),
      }))
      .filter((s) => s.items.length > 0);

    // Build section HTML
    const sectionsHtml = filtered
      .map((section) => {
        const itemsHtml = section.items
          .map((itemId) => {
            const item = storeItems.find((si) => si.id === itemId);
            const isSelected = itemId === selectedStoreId;
            const bgColor = isSelected ? 'rgb(1,108,221)' : 'transparent';
            const textColor = isSelected ? 'rgb(254,255,255)' : 'var(--task-text)';
            const iconColor = isSelected ? 'rgb(254,255,255)' : 'var(--task-text)';

            return `
              <button class="list-item" data-id="${itemId}"
                style="display:flex; align-items:center; gap:8px; padding:0 8px; height:32px;
                       border-radius:8px; border:none; cursor:pointer; text-align:left;
                       background:${bgColor}; font-family:Inter,sans-serif;">
                ${schemaIcon(iconColor)}
                <span style="font-size:12px; color:${textColor};">${item.name}</span>
              </button>`;
          })
          .join('');

        return `
          <div style="display:flex; flex-direction:column; gap:2px;">
            <div style="padding:8px; font-size:12px; color:var(--task-text);">${section.header}</div>
            ${itemsHtml}
          </div>`;
      })
      .join('');

    el.innerHTML = `
      <div style="height:100%; display:flex; flex-direction:column; background:var(--task-sidebar-bg); font-family:Inter,sans-serif;">
        <!-- Header row -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; height:48px; flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:16px; height:16px; border-radius:4px; background:rgb(245,93,103); display:flex; align-items:center; justify-content:center;">
              <span style="font-family:Urbanist,sans-serif; font-size:11px; font-weight:700; color:var(--task-text);">${userInitial}</span>
            </div>
            <span style="font-family:Urbanist,sans-serif; font-size:14px; color:var(--task-text);">Todo</span>
          </div>
          <button class="collapse-btn" style="width:24px; height:24px; display:flex; align-items:center; justify-content:center; border-radius:4px; border:none; background:transparent; cursor:pointer;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m11 17-5-5 5-5"/>
              <path d="M18 17V7"/>
            </svg>
          </button>
        </div>

        <!-- Search and store list -->
        <div style="display:flex; flex-direction:column; gap:8px; padding:12px; flex:1; overflow-y:auto;">
          <div style="display:flex; align-items:center; gap:8px; padding:0 8px; height:32px; border-radius:8px; border:1px solid var(--task-border);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input class="search"
              style="flex:1; background:transparent; border:none; outline:none; font-size:12px; color:var(--task-text); font-family:Inter,sans-serif;"
              placeholder="Search Lists"
              value="${searchQuery}" />
          </div>
          ${sectionsHtml}
        </div>
      </div>`;

    // Attach event listeners
    el.querySelector('.search').oninput = (e) => {
      searchQuery = e.target.value;
      render();
    };
    el.querySelector('.collapse-btn').onclick = () => {
      isCollapsed = true;
      render();
    };
    el.querySelectorAll('.list-item').forEach((btn) => {
      btn.onclick = () => {
        selectedStoreId = btn.dataset.id;
        if (onSelectStore) onSelectStore(selectedStoreId);
        render();
      };
    });
  }

  render();
  container.appendChild(el);

  return {
    el,
    destroy() {
      el.remove();
    },
  };
}
