/**
 * Core Editor Component with Velt CRDT
 *
 * Vanilla JS implementation using createVeltStore from @veltdev/crdt
 * for real-time collaborative text editing with live cursors.
 */

import { createVeltStore } from '@veltdev/crdt';
import { initialContent } from './constants.js';
import { getUser } from '../../../lib/user.js';

const STORE_ID = 'core-crdt-notepad-1';
const CURSOR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
const CURSOR_STALE_MS = 30000;

function hashToIndex(str, len) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % len;
}

// ── Mirror helpers: map character offsets to pixel positions ─────────

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
}

function syncMirrorStyles(textarea, mirror) {
  const computed = window.getComputedStyle(textarea);
  const props = [
    'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'wordSpacing', 'textIndent', 'whiteSpace', 'wordWrap', 'overflowWrap',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderWidth', 'boxSizing', 'width',
  ];
  for (const p of props) {
    mirror.style[p] = computed[p];
  }
}

function getOffsetCoords(textarea, mirror, offset, content) {
  syncMirrorStyles(textarea, mirror);
  mirror.innerHTML = escapeHTML(content.substring(0, offset)) + '<span id="__m">|</span>';
  const marker = mirror.querySelector('#__m');
  if (!marker) return null;
  const mr = marker.getBoundingClientRect();
  const tr = textarea.getBoundingClientRect();
  return { top: mr.top - tr.top + textarea.scrollTop, left: mr.left - tr.left };
}

function getSelectionRects(textarea, mirror, start, end, content) {
  if (start === end) return [];
  syncMirrorStyles(textarea, mirror);
  mirror.innerHTML =
    escapeHTML(content.substring(0, start)) +
    '<span id="__sel">' + escapeHTML(content.substring(start, end)) + '</span>' +
    escapeHTML(content.substring(end));
  const span = mirror.querySelector('#__sel');
  if (!span) return [];
  const range = document.createRange();
  range.selectNodeContents(span);
  const clientRects = range.getClientRects();
  const tr = textarea.getBoundingClientRect();
  const rects = [];
  for (let i = 0; i < clientRects.length; i++) {
    const r = clientRects[i];
    if (r.width === 0 && r.height === 0) continue;
    rects.push({
      top: r.top - tr.top + textarea.scrollTop,
      left: r.left - tr.left,
      width: r.width,
      height: r.height,
    });
  }
  return rects;
}

/**
 * Create the core CRDT editor
 * @param {HTMLElement} container - Container to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {Object} user - Current user object
 * @returns {Promise<Object>} - Component API with store, destroy
 */
export async function createCoreEditor(container, veltClient, user) {
  let store = null;
  let currentText = '';
  let cursors = {};
  let liveStateSubscription = null;
  let storeUnsubscribe = null;
  let renderRAF = null;

  // Local user info for cursor broadcasting
  const localUser = {
    userId: user?.userId || 'anonymous',
    name: user?.name || 'Anonymous',
    color: CURSOR_COLORS[hashToIndex(user?.userId || user?.name || '', CURSOR_COLORS.length)],
  };

  // ── Build DOM ──────────────────────────────────────────────────────

  // Scroll container
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'absolute inset-0 overflow-y-auto pb-20';

  // Centered content
  const centeredWrapper = document.createElement('div');
  centeredWrapper.className = 'flex justify-center pt-[51px] px-4';

  const contentCol = document.createElement('div');
  contentCol.className = 'w-full max-w-[850px]';

  // Status indicator
  const statusRow = document.createElement('div');
  statusRow.className = 'flex items-center gap-1.5 mb-2 px-1';

  const statusDot = document.createElement('span');
  statusDot.className = 'inline-block rounded-full shrink-0';
  Object.assign(statusDot.style, { width: '8px', height: '8px', backgroundColor: '#eab308' });

  const statusLabel = document.createElement('span');
  statusLabel.className = 'text-xs';
  statusLabel.style.color = 'var(--app-text-tertiary)';
  statusLabel.textContent = 'Connecting\u2026';

  statusRow.appendChild(statusDot);
  statusRow.appendChild(statusLabel);
  contentCol.appendChild(statusRow);

  // Card
  const card = document.createElement('div');
  card.className = 'border border-solid rounded-[16px] min-h-[880px]';
  card.style.padding = '42px 56px 64px 56px';
  card.style.backgroundColor = 'var(--app-surface)';
  card.style.borderColor = 'var(--app-surface-border)';

  // Textarea wrapper (relative for cursor overlay)
  const textareaWrapper = document.createElement('div');
  textareaWrapper.className = 'w-full max-w-[738px] relative';

  // Textarea
  const textarea = document.createElement('textarea');
  textarea.className = 'core-editor-textarea';
  textarea.placeholder = 'Start typing...';
  textarea.spellcheck = false;
  textarea.value = '';

  // Hidden mirror div for pixel measurement
  const mirror = document.createElement('div');
  mirror.setAttribute('aria-hidden', 'true');
  Object.assign(mirror.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'hidden',
  });

  // Cursor overlay container
  const cursorOverlay = document.createElement('div');
  cursorOverlay.style.pointerEvents = 'none';

  textareaWrapper.appendChild(textarea);
  textareaWrapper.appendChild(mirror);
  textareaWrapper.appendChild(cursorOverlay);
  card.appendChild(textareaWrapper);
  contentCol.appendChild(card);
  centeredWrapper.appendChild(contentCol);
  scrollContainer.appendChild(centeredWrapper);
  container.appendChild(scrollContainer);

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

  // ── Cursor rendering ───────────────────────────────────────────────

  function renderCursors() {
    cursorOverlay.innerHTML = '';
    const now = Date.now();

    const remoteCursors = Object.entries(cursors || {})
      .filter(([uid]) => uid !== localUser.userId)
      .filter(([, c]) => now - c.timestamp < CURSOR_STALE_MS);

    for (const [uid, cursor] of remoteCursors) {
      const start = Math.min(cursor.anchor, cursor.head);
      const end = Math.max(cursor.anchor, cursor.head);
      const hasSelection = start !== end;

      // Selection highlights
      if (hasSelection) {
        const selRects = getSelectionRects(textarea, mirror, start, end, currentText);
        for (const rect of selRects) {
          const sel = document.createElement('div');
          Object.assign(sel.style, {
            position: 'absolute',
            top: rect.top + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            backgroundColor: cursor.color,
            opacity: '0.25',
            zIndex: '5',
            pointerEvents: 'none',
            borderRadius: '2px',
          });
          cursorOverlay.appendChild(sel);
        }
      }

      // Caret
      const caretCoords = getOffsetCoords(textarea, mirror, cursor.head, currentText);
      if (caretCoords) {
        const caretWrapper = document.createElement('div');
        Object.assign(caretWrapper.style, {
          position: 'absolute',
          top: caretCoords.top + 'px',
          left: caretCoords.left + 'px',
          zIndex: '10',
          pointerEvents: 'none',
        });

        // Caret line
        const caretLine = document.createElement('div');
        Object.assign(caretLine.style, {
          width: '2px',
          height: '1.2em',
          backgroundColor: cursor.color,
        });

        // Name label
        const nameLabel = document.createElement('div');
        Object.assign(nameLabel.style, {
          position: 'absolute',
          top: '-1.4em',
          left: '-1px',
          backgroundColor: cursor.color,
          color: '#fff',
          fontSize: '11px',
          fontWeight: '600',
          padding: '1px 6px',
          borderRadius: '3px 3px 3px 0',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 'normal',
        });
        nameLabel.textContent = cursor.name;

        caretWrapper.appendChild(caretLine);
        caretWrapper.appendChild(nameLabel);
        cursorOverlay.appendChild(caretWrapper);
      }
    }
  }

  // ── Cursor broadcasting ────────────────────────────────────────────

  let liveStateElement = null;

  function broadcastCursor() {
    if (!liveStateElement) return;
    const newCursors = {
      ...cursors,
      [localUser.userId]: {
        name: localUser.name,
        color: localUser.color,
        anchor: textarea.selectionStart,
        head: textarea.selectionEnd,
        timestamp: Date.now(),
      },
    };
    cursors = newCursors;
    liveStateElement.setLiveStateData('core-crdt-cursors', newCursors);
  }

  // ── Event handlers ─────────────────────────────────────────────────

  function handleInput() {
    if (store) {
      store.update(textarea.value);
    }
    currentText = textarea.value;
    setTimeout(broadcastCursor, 0);
  }

  function handleCursorEvent() {
    broadcastCursor();
    scheduleRenderCursors();
  }

  function scheduleRenderCursors() {
    if (renderRAF) cancelAnimationFrame(renderRAF);
    renderRAF = requestAnimationFrame(renderCursors);
  }

  textarea.addEventListener('input', handleInput);
  textarea.addEventListener('select', handleCursorEvent);
  textarea.addEventListener('click', handleCursorEvent);
  textarea.addEventListener('keyup', handleCursorEvent);

  // ── Initialize CRDT store ──────────────────────────────────────────

  try {
    console.log('[CoreEditor] Creating CRDT store...');
    store = await createVeltStore({
      id: STORE_ID,
      type: 'text',
      initialValue: initialContent,
      veltClient: veltClient,
    });

    if (!store) {
      throw new Error('Failed to create CRDT store');
    }

    console.log('[CoreEditor] Store created successfully');

    // Seed textarea with current value
    currentText = store.getValue() || '';
    textarea.value = currentText;

    // Mark as connecting initially, then synced once subscribe fires
    updateStatus('connecting', false);

    // Subscribe to store changes (local + remote)
    let firstSync = true;
    storeUnsubscribe = store.subscribe((newText) => {
      currentText = typeof newText === 'string' ? newText : '';

      // First subscribe callback confirms we're connected and synced
      if (firstSync) {
        firstSync = false;
        updateStatus('connected', true);
      }

      // Only update textarea if it's not focused (to avoid cursor jump)
      if (document.activeElement !== textarea) {
        textarea.value = currentText;
      } else {
        // If focused, update carefully preserving cursor position
        const selStart = textarea.selectionStart;
        const selEnd = textarea.selectionEnd;
        textarea.value = currentText;
        textarea.selectionStart = selStart;
        textarea.selectionEnd = selEnd;
      }
      scheduleRenderCursors();
    });

    // If store.getValue() returned content, we're already synced
    if (currentText) {
      updateStatus('connected', true);
    }

  } catch (error) {
    console.error('[CoreEditor] Failed to initialize store:', error);
    updateStatus('disconnected', false);
  }

  // ── Initialize live cursors (separate try/catch so store status isn't affected) ──

  try {
    liveStateElement = veltClient.getLiveStateSyncElement();
    if (liveStateElement) {
      const sub = liveStateElement.getLiveStateData('core-crdt-cursors', { listenToNewChangesOnly: true }).subscribe((data) => {
        if (data) {
          cursors = data;
          scheduleRenderCursors();
        }
      });
      liveStateSubscription = sub;
      console.log('[CoreEditor] Live cursors initialized');
    }
  } catch (error) {
    console.error('[CoreEditor] Failed to initialize live cursors:', error);
  }

  return {
    store,
    scrollContainer,
    destroy() {
      textarea.removeEventListener('input', handleInput);
      textarea.removeEventListener('select', handleCursorEvent);
      textarea.removeEventListener('click', handleCursorEvent);
      textarea.removeEventListener('keyup', handleCursorEvent);

      if (renderRAF) cancelAnimationFrame(renderRAF);
      if (storeUnsubscribe) storeUnsubscribe();
      if (liveStateSubscription) liveStateSubscription.unsubscribe?.();
      if (store && store.destroy) store.destroy();

      scrollContainer.remove();
    },
  };
}
