/**
 * Map Store Editor Component with Velt CRDT
 *
 * Vanilla JS implementation using createVeltStore from @veltdev/crdt
 * for real-time collaborative key-value editing with remote focus indicators.
 */

import { createVeltStore } from '@veltdev/crdt';
import { STORE_ID, CURSOR_COLORS, initialMapData, storeItems } from './constants.js';
import { createMapStoreSidebar } from './map-store-sidebar.js';

const FOCUS_STALE_MS = 30000;

function hashToIndex(str, len) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % len;
}

/**
 * Create the map store CRDT editor
 * @param {HTMLElement} container - Container to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {Object} user - Current user object
 * @returns {Promise<Object>} - Component API with destroy
 */
export async function createMapStoreEditor(container, veltClient, user) {
  let store = null;
  let entries = {};
  let selectedStoreId = 'image-store';
  let remoteFocuses = {};
  let keyOrder = [];
  let dragIndex = null;
  let dragOverIndex = null;
  let storeUnsub = null;
  let liveStateSub = null;
  let keyOrderSub = null;
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

  // Root layout
  const root = document.createElement('div');
  root.style.cssText = 'display:flex;height:100%;font-family:Inter,sans-serif;';

  // Sidebar (store selector)
  const sidebarContainer = document.createElement('div');
  root.appendChild(sidebarContainer);
  createMapStoreSidebar(sidebarContainer, {
    userName: user.name || 'S',
    onSelectStore: (id) => { selectedStoreId = id; renderHeader(); },
  });

  // Main editor area
  const mainArea = document.createElement('div');
  mainArea.style.cssText = 'flex:1;overflow-y:auto;background:var(--task-bg);';
  root.appendChild(mainArea);

  const innerWrap = document.createElement('div');
  innerWrap.style.cssText = 'max-width:600px;margin:0 auto;padding:24px 40px;';
  mainArea.appendChild(innerWrap);

  // Status indicator
  const statusRow = document.createElement('div');
  statusRow.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:24px;';

  const statusDot = document.createElement('span');
  Object.assign(statusDot.style, { display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' });

  const statusLabel = document.createElement('span');
  statusLabel.style.cssText = 'font-size:12px;color:var(--app-text-tertiary);';
  statusLabel.textContent = 'Connecting\u2026';

  statusRow.appendChild(statusDot);
  statusRow.appendChild(statusLabel);
  innerWrap.appendChild(statusRow);

  // ── Status updates ─────────────────────────────────────────────────

  function updateStatus(status, synced) {
    if (status === 'connected') {
      statusDot.style.backgroundColor = synced ? '#22c55e' : '#eab308';
      statusLabel.textContent = synced ? 'Synced' : 'Syncing\u2026';
    } else if (status === 'connecting') {
      statusDot.style.backgroundColor = '#eab308';
      statusLabel.textContent = 'Connecting\u2026';
    } else {
      statusDot.style.backgroundColor = '#ef4444';
      statusLabel.textContent = 'Disconnected';
    }
  }

  // Title section
  const titleSection = document.createElement('div');
  titleSection.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:28px;';
  innerWrap.appendChild(titleSection);

  // Entry list
  const entryListEl = document.createElement('div');
  entryListEl.style.cssText = 'display:flex;flex-direction:column;gap:12px;padding-bottom:24px;';
  innerWrap.appendChild(entryListEl);

  // Add entry button
  const addBtn = document.createElement('button');
  addBtn.style.cssText = 'width:32px;height:32px;border-radius:50%;border:1px solid rgb(0,109,220);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;';
  addBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(0,109,220)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
  addBtn.onclick = addEntry;
  innerWrap.appendChild(addBtn);

  container.appendChild(root);

  // ── Initialize CRDT store ──────────────────────────────────────────

  // [Velt] Create CRDT map store for collaborative key-value editing
  try {
    console.log('[MapStoreEditor] Creating CRDT store...');
    store = await createVeltStore({
      id: STORE_ID,
      type: 'map',
      initialValue: initialMapData,
      veltClient,
    });

    if (!store) {
      throw new Error('Failed to create CRDT store');
    }

    console.log('[MapStoreEditor] Store created successfully');

    // [Velt] Seed UI with current CRDT value
    const initVal = store.getValue();
    entries = (initVal && typeof initVal === 'object' && !Array.isArray(initVal)) ? initVal : {};

    // Mark as connecting initially, then synced once subscribe fires
    updateStatus('connecting', false);

    // [Velt] Subscribe to store changes (local + remote)
    let firstSync = true;
    storeUnsub = store.subscribe((newEntries) => {
      entries = (newEntries && typeof newEntries === 'object' && !Array.isArray(newEntries)) ? newEntries : {};

      if (firstSync) {
        firstSync = false;
        updateStatus('connected', true);
      }

      const active = document.activeElement;
      if (active && entryListEl.contains(active) && active.tagName === 'INPUT') return;
      renderEntries();
    });

    // If store.getValue() returned content, we're already synced
    if (Object.keys(entries).length > 0) {
      updateStatus('connected', true);
    }

  } catch (error) {
    console.error('[MapStoreEditor] Failed to initialize store:', error);
    updateStatus('disconnected', false);
    return { destroy() { root.remove(); } };
  }

  // ── Live focus broadcasting ────────────────────────────────────────

  // [Velt] Use getLiveStateSyncElement for remote focus indicators
  let liveStateElement = null;

  try {
    liveStateElement = veltClient.getLiveStateSyncElement();
    if (liveStateElement) {
      // [Velt] Subscribe to remote focus changes
      liveStateSub = liveStateElement.getLiveStateData('core-crdt-map-focuses', { listenToNewChangesOnly: true })
        .subscribe((data) => {
          remoteFocuses = data || {};
          const active = document.activeElement;
          if (active && entryListEl.contains(active) && active.tagName === 'INPUT') return;
          renderEntries();
        });

      // [Velt] Subscribe to key order changes for drag reorder sync
      keyOrderSub = liveStateElement.getLiveStateData('core-crdt-map-key-order', {})
        .subscribe((data) => {
          keyOrder = Array.isArray(data) ? data : [];
          const active = document.activeElement;
          if (active && entryListEl.contains(active) && active.tagName === 'INPUT') return;
          renderEntries();
        });

      console.log('[MapStoreEditor] Live focus initialized');
    }
  } catch (error) {
    console.error('[MapStoreEditor] Failed to initialize live focus:', error);
  }

  // [Velt] Broadcast local focus position to remote users
  function broadcastFocus(entryKey, field = 'value') {
    if (!liveStateElement) return;
    liveStateElement.setLiveStateData('core-crdt-map-focuses', {
      ...remoteFocuses,
      [localUser.userId]: { name: localUser.name, color: localUser.color, entryKey, field, timestamp: Date.now() },
    });
  }

  // [Velt] Sync key order via live state
  function setKeyOrderSync(newOrder) {
    keyOrder = newOrder;
    if (liveStateElement) liveStateElement.setLiveStateData('core-crdt-map-key-order', newOrder);
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
        if (active && entryListEl.contains(active) && active.tagName === 'INPUT') return;
        renderEntries();
      });
    }
  } catch (e) { console.warn('[MapStoreEditor] Comment annotations not available:', e); }

  // ── Comment modal ──────────────────────────────────────────────────
  function showCommentModal(key, value) {
    if (commentModal) commentModal.remove();
    const targetId = `map-entry-${key.replace(/\s+/g, '-').toLowerCase()}`;
    commentModal = document.createElement('div');
    commentModal.innerHTML = `
      <div class="comment-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:60;"></div>
      <div class="comment-center" style="position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="comment-box" style="background:var(--task-surface);border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);max-width:512px;width:100%;max-height:80vh;display:flex;flex-direction:column;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgb(229,231,235);">
            <h3 style="font-size:14px;font-weight:600;color:var(--task-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${key}: ${value}</h3>
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

  // ── CRDT mutations ─────────────────────────────────────────────────

  function addEntry() {
    const current = store.getValue() || {};
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {};
    let newKey = 'New Key';
    let counter = 1;
    while (obj[newKey] !== undefined) newKey = `New Key ${counter++}`;
    store.update({ ...obj, [newKey]: '' });
    setKeyOrderSync([...getOrderedKeys(), newKey]);
  }

  function updateEntry(oldKey, newKey, newValue) {
    const current = store.getValue() || {};
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {};
    const updated = { ...obj };
    // Auto-deduplicate: if renaming to an existing key, append a number
    let finalKey = newKey;
    if (oldKey !== newKey && updated[newKey] !== undefined) {
      let counter = 1;
      while (updated[`${newKey} ${counter}`] !== undefined) counter++;
      finalKey = `${newKey} ${counter}`;
    }
    if (oldKey !== finalKey) {
      delete updated[oldKey];
      // Update keyOrder BEFORE store.update() — the subscribe callback fires
      // synchronously and re-renders with the current keyOrder, so it must
      // already reflect the rename to preserve ordering.
      keyOrder = keyOrder.map(k => k === oldKey ? finalKey : k);
      if (liveStateElement) liveStateElement.setLiveStateData('core-crdt-map-key-order', keyOrder);
    }
    updated[finalKey] = newValue;
    store.update(updated);
  }

  function deleteEntry(key) {
    const current = store.getValue() || {};
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {};
    const updated = { ...obj };
    delete updated[key];
    // Update keyOrder BEFORE store.update() to prevent ordering issues on re-render
    setKeyOrderSync(keyOrder.filter(k => k !== key));
    store.update(updated);
  }

  function getOrderedKeys() {
    const allKeys = Object.keys(entries);
    const seen = new Set();
    const result = [];
    for (const k of keyOrder) {
      if (allKeys.includes(k) && !seen.has(k)) { seen.add(k); result.push(k); }
    }
    for (const k of allKeys) {
      if (!seen.has(k)) { seen.add(k); result.push(k); }
    }
    return result;
  }

  // ── Rendering ──────────────────────────────────────────────────────

  function renderHeader() {
    const item = storeItems.find(s => s.id === selectedStoreId);
    titleSection.innerHTML = `
      <h1 style="font-size:32px;font-weight:700;line-height:1.2;color:var(--task-text);font-family:Inter,sans-serif;">${item?.name || 'Image Store'}</h1>
      <p style="font-size:16px;color:var(--task-text);font-family:Inter,sans-serif;">Store image name and urls</p>`;
  }

  function renderEntries() {
    const orderedKeys = getOrderedKeys();
    entryListEl.innerHTML = '';

    if (orderedKeys.length === 0) {
      entryListEl.innerHTML = '<div style="text-align:center;padding:48px 0;font-size:14px;color:var(--task-text-secondary);">No entries yet. Click + to add a key-value pair.</div>';
      return;
    }

    orderedKeys.forEach((key, index) => {
      const value = entries[key] ?? '';

      // Remote focus for this entry
      let focusUser = null, focusColor = null, focusField = 'value';
      for (const [uid, entry] of Object.entries(remoteFocuses)) {
        if (uid === localUser.userId) continue;
        if (Date.now() - (entry.timestamp || 0) > FOCUS_STALE_MS) continue;
        if (entry.entryKey === key) { focusUser = entry.name; focusColor = entry.color; focusField = entry.field || 'value'; break; }
      }

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;';
      if (dragOverIndex === index) row.style.borderTop = '2px solid rgb(1,108,221)';
      else row.style.borderTop = '2px solid transparent';

      row.innerHTML = `
        <div class="map-grip" draggable="true" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:grab;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </div>
        <div class="map-entry-row" style="flex:1;display:flex;align-items:center;gap:20px;position:relative;">
          <div style="flex:1;min-width:0;position:relative;">
            ${focusUser && focusField === 'key' ? `<div style="position:absolute;top:-16px;left:0;font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;color:white;z-index:10;background:${focusColor};white-space:nowrap;">${focusUser}</div>` : ''}
            <input class="map-key-input" value="${key.replace(/"/g, '&quot;')}" style="width:100%;background:transparent;border:none;font-size:16px;font-weight:500;color:var(--task-text);font-family:Inter,sans-serif;${focusColor && focusField === 'key' ? `outline:2px solid ${focusColor};outline-offset:2px;border-radius:4px;` : 'outline:none;'}" />
          </div>
          <div style="width:0;height:20px;flex-shrink:0;border-left:1px solid var(--task-separator);"></div>
          <div style="flex:1;min-width:0;position:relative;">
            ${focusUser && focusField === 'value' ? `<div style="position:absolute;top:-16px;left:0;font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;color:white;z-index:10;background:${focusColor};white-space:nowrap;">${focusUser}</div>` : ''}
            <input class="map-value-input" value="${String(value).replace(/"/g, '&quot;')}" style="width:100%;background:transparent;border:none;font-size:16px;font-weight:500;color:var(--task-text);font-family:Inter,sans-serif;${focusColor && focusField === 'value' ? `outline:2px solid ${focusColor};outline-offset:2px;border-radius:4px;` : 'outline:none;'}" />
          </div>
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;width:72px;justify-content:end;">
            ${(() => {
              const targetId = `map-entry-${key.replace(/\s+/g, '-').toLowerCase()}`;
              const annot = annotationDataByTargetId[targetId];
              const count = annot?.count || 0;
              const hasUnread = annot?.hasUnread || false;
              return `<button class="map-comment-btn" style="padding:6px;border:none;background:transparent;cursor:pointer;border-radius:4px;display:flex;align-items:center;gap:2px;transition:opacity 0.15s;">
                <span style="position:relative;display:inline-flex;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(152,152,152)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  ${hasUnread ? '<span style="position:absolute;top:-2px;right:-2px;width:5px;height:5px;background:#BD323C;border-radius:50%;"></span>' : ''}
                </span>
                ${count > 0 ? `<span style="font-size:9px;font-weight:500;color:rgb(152,152,152);">${count}</span>` : ''}
              </button>`;
            })()}
            <button class="map-delete-btn map-action-hover" style="padding:6px;border:none;background:transparent;cursor:pointer;border-radius:4px;opacity:0;transition:opacity 0.15s;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--task-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>`;

      // ── Drag reorder ─────────────────────────────────────────────
      const grip = row.querySelector('.map-grip');
      grip.ondragstart = () => { dragIndex = index; };
      row.ondragover = (e) => { e.preventDefault(); dragOverIndex = index; renderEntries(); };
      grip.ondragend = () => {
        if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
          const newOrder = [...getOrderedKeys()];
          const [moved] = newOrder.splice(dragIndex, 1);
          newOrder.splice(dragOverIndex, 0, moved);
          setKeyOrderSync(newOrder);
        }
        dragIndex = null; dragOverIndex = null;
        renderEntries();
      };

      // ── Key input ────────────────────────────────────────────────
      const keyInput = row.querySelector('.map-key-input');
      const valueInput = row.querySelector('.map-value-input');
      keyInput.onclick = (e) => e.stopPropagation();
      keyInput.onfocus = () => broadcastFocus(key, 'key');
      keyInput.onblur = () => {
        const newKey = keyInput.value.trim();
        if (newKey && newKey !== key) {
          updateEntry(key, newKey, valueInput.value);
        } else if (!newKey) {
          keyInput.value = key;
        }
      };

      // ── Value input (save on every keystroke) ────────────────────
      valueInput.onclick = (e) => e.stopPropagation();
      valueInput.onfocus = () => broadcastFocus(key, 'value');
      valueInput.oninput = () => {
        updateEntry(key, key, valueInput.value);
      };

      // ── Comment ──────────────────────────────────────────────────
      row.querySelector('.map-comment-btn').onclick = (e) => { e.stopPropagation(); showCommentModal(key, value); };

      // ── Delete ───────────────────────────────────────────────────
      row.querySelector('.map-delete-btn').onclick = (e) => { e.stopPropagation(); deleteEntry(key); };

      entryListEl.appendChild(row);
    });
  }

  renderHeader();
  renderEntries();

  return {
    el: root,
    destroy() {
      closeCommentModal();
      if (annotationSub) annotationSub.unsubscribe();
      if (storeUnsub) storeUnsub();
      if (liveStateSub) liveStateSub.unsubscribe();
      if (keyOrderSub) keyOrderSub.unsubscribe();
      if (store) store.destroy();
      root.remove();
    },
  };
}
