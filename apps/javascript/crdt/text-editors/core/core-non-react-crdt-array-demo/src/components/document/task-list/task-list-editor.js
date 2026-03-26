/**
 * Task List Editor Component
 *
 * Vanilla JS implementation of the collaborative task list using CRDT array store.
 * Uses createVeltStore from @veltdev/crdt for real-time sync.
 */

// [Velt] Import createVeltStore for CRDT array store
import { createVeltStore } from '@veltdev/crdt';
import { STORE_ID, CURSOR_COLORS, initialTasks, teamLists } from './constants.js';
import { createTaskListSidebar } from './task-list-sidebar.js';

const STATUS_CYCLE = ['open', 'in-progress', 'resolved'];
const STATUS_CONFIG = {
  'open': { label: 'Open', color: 'rgb(98,93,245)', icon: '<circle cx="12" cy="12" r="10"/>' },
  'in-progress': { label: 'In Progress', color: 'rgb(245,151,93)', icon: '<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7-7"/>' },
  'resolved': { label: 'Resolved', color: 'rgb(12,158,75)', icon: '<path d="M18 6 7 17l-5-5"/><path d="m22 10-9.5 9.5L10 17"/>' },
};

function hashToIndex(str, len) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % len;
}

// Deduplicate tasks by ID (CRDT arrays can duplicate when multiple clients seed initial data)
function deduplicateTasks(arr) {
  const seen = new Set();
  return arr.filter(t => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}

function relativeTime(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function statusIconSvg(status) {
  const cfg = STATUS_CONFIG[status];
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${cfg.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${cfg.icon}</svg>`;
}

/**
 * Create the task list editor with CRDT array store
 * @param {HTMLElement} container - Container to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {Object} user - Current user object
 * @returns {Promise<Object>} - Component API with destroy
 */
export async function createTaskListEditor(container, veltClient, user) {
  let store = null;
  let tasks = [];
  let expandedTaskId = 'task-1';
  let selectedListId = 'marketing';
  let searchQuery = '';
  let remoteFocuses = {};
  let liveStateSub = null;
  let storeUnsub = null;
  let annotationSub = null;
  let annotationDataByTargetId = {};
  let commentModal = null;

  // Local user info for focus broadcasting
  const localUser = {
    userId: user.userId || 'anonymous',
    name: user.name || 'Anonymous',
    color: CURSOR_COLORS[hashToIndex(user.userId || user.name || '', CURSOR_COLORS.length)],
  };

  // ── Build DOM ──────────────────────────────────────────────────────

  // Root layout: sidebar + main
  const root = document.createElement('div');
  root.style.cssText = 'display:flex;height:100%;font-family:Inter,sans-serif;';

  // Sidebar
  const sidebarContainer = document.createElement('div');
  root.appendChild(sidebarContainer);
  const sidebar = createTaskListSidebar(sidebarContainer, {
    userName: user.name || 'S',
    onSelectList: (id) => {
      selectedListId = id;
      renderHeader();
    },
  });

  // Main content area
  const mainArea = document.createElement('div');
  mainArea.style.cssText = 'flex:1;overflow-y:auto;background:var(--task-bg);';
  root.appendChild(mainArea);

  const innerWrap = document.createElement('div');
  innerWrap.style.cssText = 'max-width:870px;margin:0 auto;padding:24px 40px;';
  mainArea.appendChild(innerWrap);

  // Status indicator
  const statusRow = document.createElement('div');
  statusRow.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:24px;';
  innerWrap.appendChild(statusRow);

  // Title section
  const titleSection = document.createElement('div');
  titleSection.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:28px;';
  innerWrap.appendChild(titleSection);

  // Action bar
  const actionBar = document.createElement('div');
  actionBar.style.cssText = 'display:flex;align-items:center;gap:11px;margin-bottom:28px;';
  innerWrap.appendChild(actionBar);

  // Task list container
  const taskListEl = document.createElement('div');
  taskListEl.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding-bottom:40px;';
  innerWrap.appendChild(taskListEl);

  container.appendChild(root);

  // ── Create CRDT store ──────────────────────────────────────────────

  // [Velt] Create a CRDT array store for collaborative task list
  console.log('[TaskListEditor] Creating CRDT store...');
  store = await createVeltStore({
    id: STORE_ID,
    type: 'array',
    initialValue: initialTasks,
    veltClient: veltClient,
  });

  if (!store) {
    console.error('[TaskListEditor] Failed to create store');
    return { destroy() { root.remove(); } };
  }

  console.log('[TaskListEditor] Store created successfully');

  const initVal = store.getValue();
  tasks = deduplicateTasks(Array.isArray(initVal) ? initVal : []);

  // [Velt] Subscribe to store changes (local + remote)
  storeUnsub = store.subscribe((newTasks) => {
    tasks = deduplicateTasks(Array.isArray(newTasks) ? newTasks : []);
    // Skip re-render if user is actively editing an input
    const active = document.activeElement;
    if (active && taskListEl.contains(active) && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      return;
    }
    renderTaskList();
  });

  // ── Live focus (Velt Live State) ───────────────────────────────────

  // [Velt] Get live state element for broadcasting task focus
  const liveStateElement = veltClient.getLiveStateSyncElement();
  if (liveStateElement) {
    // [Velt] Subscribe to remote focus changes
    liveStateSub = liveStateElement.getLiveStateData('core-crdt-task-focuses', { listenToNewChangesOnly: true })
      .subscribe((data) => {
        remoteFocuses = data || {};
        const active = document.activeElement;
        if (active && taskListEl.contains(active) && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
          return;
        }
        renderTaskList();
      });
  }

  /**
   * Broadcast which task the local user is focused on
   * @param {string} taskId - Task ID
   */
  function broadcastFocus(taskId) {
    if (!liveStateElement) return;
    // [Velt] Broadcast focus via live state
    liveStateElement.setLiveStateData('core-crdt-task-focuses', {
      ...remoteFocuses,
      [localUser.userId]: {
        name: localUser.name,
        color: localUser.color,
        taskId,
        timestamp: Date.now(),
      },
    });
  }

  // ── Comment annotations ──────────────────────────────────────────
  try {
    const commentElement = veltClient.getCommentElement();
    if (commentElement) {
      annotationSub = commentElement.getAllCommentAnnotations().subscribe((annotations) => {
        const dataMap = {};
        if (annotations && Array.isArray(annotations)) {
          annotations.forEach((annotation) => {
            const targetId = annotation.targetElementId;
            if (targetId) {
              if (!dataMap[targetId]) dataMap[targetId] = { count: 0, hasUnread: false };
              if (annotation.status?.id !== 'RESOLVED') dataMap[targetId].count = annotation.comments?.length || 0;
              if (annotation.unread) dataMap[targetId].hasUnread = true;
            }
          });
        }
        annotationDataByTargetId = dataMap;
        const active = document.activeElement;
        if (active && taskListEl.contains(active) && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
        renderTaskList();
      });
    }
  } catch (e) { console.warn('[TaskListEditor] Comment annotations not available:', e); }

  // ── Comment modal ──────────────────────────────────────────────────
  function showCommentModal(task) {
    if (commentModal) commentModal.remove();
    const targetId = `task-${task.id}`;
    commentModal = document.createElement('div');
    commentModal.innerHTML = `
      <div class="comment-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:60;"></div>
      <div class="comment-center" style="position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="comment-box" style="background:var(--task-surface);border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);max-width:512px;width:100%;max-height:80vh;display:flex;flex-direction:column;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgb(229,231,235);">
            <h3 style="font-size:14px;font-weight:600;color:var(--task-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${task.title}</h3>
            <button class="comment-close-btn" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px;border:none;background:transparent;cursor:pointer;">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="var(--task-text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div style="flex:1;overflow:auto;" id="${targetId}">
            <velt-inline-comments-section target-element-id="${targetId}" shadow-dom="false" composer-position="bottom" multi-thread="false"></velt-inline-comments-section>
          </div>
        </div>
      </div>`;
    document.body.appendChild(commentModal);
    commentModal.querySelector('.comment-overlay').onclick = closeCommentModal;
    commentModal.querySelector('.comment-center').onclick = closeCommentModal;
    commentModal.querySelector('.comment-box').onclick = (e) => e.stopPropagation();
    commentModal.querySelector('.comment-close-btn').onclick = closeCommentModal;
  }

  function closeCommentModal() {
    if (commentModal) { commentModal.remove(); commentModal = null; }
  }

  // ── CRDT Mutations ─────────────────────────────────────────────────

  function addTask() {
    // [Velt] Read current value and update with new task
    const current = store.getValue() || [];
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: 'New Task',
      status: 'open',
      description: '',
      createdAt: Date.now(),
      commentCount: 0,
    };
    store.update([newTask, ...(Array.isArray(current) ? current : [])]);
  }

  function updateTask(id, changes) {
    // [Velt] Read current value and update specific task by ID
    const current = store.getValue() || [];
    if (Array.isArray(current)) {
      store.update(current.map(t => t.id === id ? { ...t, ...changes } : t));
    }
  }

  function deleteTask(id) {
    // [Velt] Read current value and filter out deleted task
    const current = store.getValue() || [];
    if (Array.isArray(current)) {
      store.update(current.filter(t => t.id !== id));
    }
    if (expandedTaskId === id) expandedTaskId = null;
  }

  // ── Rendering ──────────────────────────────────────────────────────

  function renderStatus() {
    const status = store ? 'connected' : 'disconnected';
    const synced = true;
    const dotColor = status === 'connected' ? (synced ? '#22c55e' : '#eab308') : '#ef4444';
    const label = status === 'connected' ? (synced ? 'Synced' : 'Syncing...') : 'Disconnected';
    statusRow.innerHTML = `
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${dotColor};"></span>
      <span style="font-size:12px;color:var(--app-text-tertiary);">${label}</span>`;
  }

  function renderHeader() {
    const team = teamLists.find(l => l.id === selectedListId);
    const teamName = team?.name || 'Marketing Tasks';
    titleSection.innerHTML = `
      <h1 style="font-size:32px;font-weight:700;line-height:1.2;color:var(--task-text);font-family:Inter,sans-serif;">${teamName}</h1>
      <p style="font-size:16px;color:var(--task-text);font-family:Inter,sans-serif;">Please make sure to update your tasks before logging off</p>`;
  }

  function renderActionBar() {
    actionBar.innerHTML = `
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:11px;background:var(--task-search-bg);height:41px;border-radius:8px;padding:0 12px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-search-placeholder)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input class="task-search-input" style="flex:1;background:transparent;border:none;outline:none;font-size:14px;font-weight:500;color:var(--task-search-text);font-family:Inter,sans-serif;" placeholder="Search tasks" value="${searchQuery}" />
        </div>
      </div>
      <button class="task-add-btn" style="display:flex;align-items:center;gap:11px;height:41px;padding:0 12px;border-radius:8px;border:1px solid rgb(0,109,220);background:transparent;cursor:pointer;white-space:nowrap;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(0,109,220)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <span style="font-size:14px;font-weight:500;color:var(--task-text);font-family:Inter,sans-serif;">Add New Task</span>
      </button>`;

    actionBar.querySelector('.task-search-input').oninput = (e) => {
      searchQuery = e.target.value;
      renderTaskList();
    };
    actionBar.querySelector('.task-add-btn').onclick = addTask;
  }

  function renderTaskList() {
    const filtered = searchQuery
      ? tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : tasks;

    taskListEl.innerHTML = '';

    if (filtered.length === 0) {
      taskListEl.innerHTML = `<div style="text-align:center;padding:48px 0;font-size:14px;color:var(--task-text-secondary);">
        ${searchQuery ? 'No tasks match your search' : 'No tasks yet. Click "Add New Task" to get started.'}
      </div>`;
      return;
    }

    filtered.forEach(task => {
      const isExpanded = expandedTaskId === task.id;
      const cfg = STATUS_CONFIG[task.status];

      // Remote focus indicator
      let focusUser = null;
      let focusColor = null;
      for (const [uid, entry] of Object.entries(remoteFocuses)) {
        if (uid === localUser.userId) continue;
        if (Date.now() - (entry.timestamp || 0) > 30000) continue;
        if (entry.taskId === task.id) {
          focusUser = entry.name;
          focusColor = entry.color;
          break;
        }
      }

      const row = document.createElement('div');
      row.className = 'task-row';
      if (focusColor) row.style.borderLeft = `3px solid ${focusColor}`;

      row.innerHTML = `
        ${focusUser ? `<div style="position:absolute;top:-8px;left:-4px;font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;color:white;z-index:10;background:${focusColor};">${focusUser}</div>` : ''}
        <div style="display:flex;align-items:center;width:100%;gap:12px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-chevron)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;transition:transform 0.2s;${isExpanded ? '' : 'transform:rotate(-90deg);'}"><path d="m6 9 6 6 6-6"/></svg>
          <input class="task-title-input" value="${task.title.replace(/"/g, '&quot;')}" placeholder="Task title..." style="flex:1;min-width:0;font-size:14px;font-weight:500;color:var(--task-text);font-family:Inter,sans-serif;background:transparent;border:none;outline:none;cursor:text;" />
          <button class="task-status-btn" style="display:flex;align-items:center;gap:8px;border:none;background:transparent;cursor:pointer;flex-shrink:0;">
            ${statusIconSvg(task.status)}
            <span style="font-size:14px;font-weight:500;color:var(--task-text);font-family:Inter,sans-serif;white-space:nowrap;">${cfg.label}</span>
          </button>
          <span style="font-size:14px;font-weight:500;color:var(--task-text-secondary);font-family:Inter,sans-serif;white-space:nowrap;flex-shrink:0;">${relativeTime(task.createdAt)}</span>
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
            ${(() => {
              const annot = annotationDataByTargetId[`task-${task.id}`];
              const count = annot?.count || 0;
              const hasUnread = annot?.hasUnread || false;
              return `<button class="task-comment-btn" style="padding:4px;border:none;background:transparent;cursor:pointer;border-radius:4px;display:flex;align-items:center;gap:2px;transition:opacity 0.15s;">
                <span style="position:relative;display:inline-flex;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(152,152,152)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  ${hasUnread ? '<span style="position:absolute;top:-2px;right:-2px;width:5px;height:5px;background:#BD323C;border-radius:50%;"></span>' : ''}
                </span>
                ${count > 0 ? `<span style="font-size:9px;font-weight:500;color:rgb(152,152,152);">${count}</span>` : ''}
              </button>`;
            })()}
            <button class="task-delete-btn task-action-hover" style="padding:4px;border:none;background:transparent;cursor:pointer;border-radius:4px;opacity:0;transition:opacity 0.15s;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--task-text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        ${isExpanded ? `
          <div class="task-desc-area" style="margin-top:16px;border-radius:12px;padding:24px;background:var(--task-expanded-bg);">
            <textarea class="task-desc-input" style="width:100%;background:transparent;border:none;outline:none;resize:none;font-size:16px;font-weight:500;line-height:1.5;color:var(--task-expanded-text);font-family:Inter,sans-serif;min-height:80px;">${task.description}</textarea>
          </div>
        ` : ''}`;

      // Events
      row.onclick = () => {
        expandedTaskId = expandedTaskId === task.id ? null : task.id;
        renderTaskList();
      };

      const titleInput = row.querySelector('.task-title-input');
      titleInput.onclick = (e) => e.stopPropagation();
      titleInput.onfocus = () => broadcastFocus(task.id);
      titleInput.oninput = () => {
        updateTask(task.id, { title: titleInput.value });
      };
      titleInput.onblur = () => {
        if (!titleInput.value.trim()) {
          updateTask(task.id, { title: task.title });
        }
      };

      row.querySelector('.task-status-btn').onclick = (e) => {
        e.stopPropagation();
        const idx = STATUS_CYCLE.indexOf(task.status);
        updateTask(task.id, { status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] });
      };

      row.querySelector('.task-comment-btn').onclick = (e) => {
        e.stopPropagation();
        showCommentModal(task);
      };

      row.querySelector('.task-delete-btn').onclick = (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      };

      // Description editing
      const descArea = row.querySelector('.task-desc-area');
      if (descArea) {
        descArea.onclick = (e) => e.stopPropagation();
        const descInput = row.querySelector('.task-desc-input');
        if (descInput) {
          descInput.onfocus = () => broadcastFocus(task.id);
          descInput.oninput = () => {
            updateTask(task.id, { description: descInput.value });
          };
        }
      }

      taskListEl.appendChild(row);
    });
  }

  // Initial renders
  renderStatus();
  renderHeader();
  renderActionBar();
  renderTaskList();

  return {
    el: root,
    // [Velt] Cleanup: unsubscribe from store and live state, destroy store
    destroy() {
      closeCommentModal();
      if (annotationSub) annotationSub.unsubscribe();
      if (storeUnsub) storeUnsub();
      if (liveStateSub) liveStateSub.unsubscribe();
      if (store) store.destroy();
      root.remove();
    },
  };
}
