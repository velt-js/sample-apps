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
  statusRow.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#eab308;"></span><span style="font-size:12px;color:var(--app-text-tertiary);">Connecting...</span>';
  innerWrap.appendChild(statusRow);

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

    // [Velt] Subscribe to store changes (local + remote)
    storeUnsub = store.subscribe((newEntries) => {
      entries = (newEntries && typeof newEntries === 'object' && !Array.isArray(newEntries)) ? newEntries : {};
      const active = document.activeElement;
      if (active && entryListEl.contains(active) && active.tagName === 'INPUT') return;
      renderEntries();
    });

    // [Velt] Seed UI with current CRDT value
    const initVal = store.getValue();
    entries = (initVal && typeof initVal === 'object' && !Array.isArray(initVal)) ? initVal : {};

  } catch (error) {
    console.error('[MapStoreEditor] Failed to initialize store:', error);
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
    if (oldKey !== newKey) delete updated[oldKey];
    updated[newKey] = newValue;
    store.update(updated);
    if (oldKey !== newKey) setKeyOrderSync(getOrderedKeys().map(k => k === oldKey ? newKey : k));
  }

  function deleteEntry(key) {
    const current = store.getValue() || {};
    const obj = (current && typeof current === 'object' && !Array.isArray(current)) ? current : {};
    const updated = { ...obj };
    delete updated[key];
    store.update(updated);
    setKeyOrderSync(getOrderedKeys().filter(k => k !== key));
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
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;width:36px;justify-content:end;">
            <button class="map-delete-btn map-action-hover" style="padding:4px;border:none;background:transparent;cursor:pointer;border-radius:4px;opacity:0;transition:opacity 0.15s;">
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
      keyInput.onclick = (e) => e.stopPropagation();
      keyInput.onfocus = () => broadcastFocus(key, 'key');
      keyInput.onblur = () => {
        if (keyInput.value.trim() && keyInput.value !== key) {
          updateEntry(key, keyInput.value.trim(), value);
        } else if (!keyInput.value.trim()) {
          keyInput.value = key;
        }
      };

      // ── Value input (save on every keystroke) ────────────────────
      const valueInput = row.querySelector('.map-value-input');
      valueInput.onclick = (e) => e.stopPropagation();
      valueInput.onfocus = () => broadcastFocus(key, 'value');
      valueInput.oninput = () => {
        updateEntry(key, key, valueInput.value);
      };

      // ── Delete ───────────────────────────────────────────────────
      row.querySelector('.map-delete-btn').onclick = (e) => { e.stopPropagation(); deleteEntry(key); };

      entryListEl.appendChild(row);
    });
  }

  renderHeader();
  renderEntries();
  statusRow.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span><span style="font-size:12px;color:var(--app-text-tertiary);">Synced</span>';

  return {
    el: root,
    destroy() {
      if (storeUnsub) storeUnsub();
      if (liveStateSub) liveStateSub.unsubscribe();
      if (keyOrderSub) keyOrderSub.unsubscribe();
      if (store) store.destroy();
      root.remove();
    },
  };
}
