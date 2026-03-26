import { teamLists, teamSections } from './constants.js'

export function createTaskListSidebar(container, { userName = 'S', onSelectList } = {}) {
  let isCollapsed = true
  let selectedListId = 'marketing'
  let searchQuery = ''

  const el = document.createElement('div')
  el.style.height = '100%'
  el.style.flexShrink = '0'

  function render() {
    const userInitial = userName.charAt(0).toUpperCase()

    if (isCollapsed) {
      el.style.width = '48px'
      el.innerHTML = `
        <div style="height:100%;display:flex;flex-direction:column;align-items:center;padding-top:12px;background:var(--task-sidebar-bg);">
          <button class="sidebar-expand-btn" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:none;background:transparent;cursor:pointer;transform:rotate(180deg);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="M18 17V7"/></svg>
          </button>
        </div>`
      el.querySelector('.sidebar-expand-btn').onclick = () => { isCollapsed = false; render() }
      return
    }

    el.style.width = '251px'
    const filteredSections = teamSections.map(s => ({
      ...s,
      items: s.items.filter(id => {
        const list = teamLists.find(l => l.id === id)
        return list?.name.toLowerCase().includes(searchQuery.toLowerCase())
      }),
    })).filter(s => s.items.length > 0)

    el.innerHTML = `
      <div style="height:100%;display:flex;flex-direction:column;background:var(--task-sidebar-bg);font-family:Inter,sans-serif;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;height:48px;flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:16px;height:16px;border-radius:4px;background:rgb(245,93,103);display:flex;align-items:center;justify-content:center;">
              <span style="font-family:Urbanist,sans-serif;font-size:11px;font-weight:700;color:var(--task-text);">${userInitial}</span>
            </div>
            <span style="font-family:Urbanist,sans-serif;font-size:14px;color:var(--task-text);">Todo</span>
          </div>
          <button class="sidebar-collapse-btn" style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;border:none;background:transparent;cursor:pointer;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="M18 17V7"/></svg>
          </button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;padding:12px;flex:1;overflow-y:auto;">
          <div style="display:flex;align-items:center;gap:8px;padding:0 8px;height:32px;border-radius:8px;border:1px solid var(--task-border);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input class="sidebar-search" style="flex:1;background:transparent;border:none;outline:none;font-size:12px;color:var(--task-text);font-family:Inter,sans-serif;" placeholder="Search Lists" value="${searchQuery}" />
          </div>
          ${filteredSections.map(section => `
            <div style="display:flex;flex-direction:column;gap:2px;">
              <div style="padding:8px;font-size:12px;color:var(--task-text);">${section.header}</div>
              ${section.items.map(itemId => {
                const list = teamLists.find(l => l.id === itemId)
                const sel = itemId === selectedListId
                return `<button class="sidebar-list-item" data-id="${itemId}" style="display:flex;align-items:center;gap:8px;padding:0 8px;height:32px;border-radius:8px;border:none;cursor:pointer;text-align:left;background:${sel ? 'rgb(1,108,221)' : 'transparent'};font-family:Inter,sans-serif;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${sel ? 'rgb(254,255,255)' : 'var(--task-text)'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
                  <span style="font-size:12px;color:${sel ? 'rgb(254,255,255)' : 'var(--task-text)'};">${list.name}</span>
                </button>`
              }).join('')}
            </div>
          `).join('')}
        </div>
      </div>`

    el.querySelector('.sidebar-search').oninput = (e) => { searchQuery = e.target.value; render() }
    el.querySelector('.sidebar-collapse-btn').onclick = () => { isCollapsed = true; render() }
    el.querySelectorAll('.sidebar-list-item').forEach(btn => {
      btn.onclick = () => {
        selectedListId = btn.dataset.id
        if (onSelectList) onSelectList(selectedListId)
        render()
      }
    })
  }

  render()
  container.appendChild(el)

  return {
    el,
    getSelectedListId() { return selectedListId },
    destroy() { el.remove() },
  }
}
