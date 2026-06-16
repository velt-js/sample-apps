import { Mark, mergeAttributes } from '@tiptap/core';
import type { Mark as PMMark, Node as PMNode } from '@tiptap/pm/model';
import type { FormatOp, SuggestionKind, SuggestionMarkAttrs } from './types';

export const SUGGESTION_MARK = 'veltSuggestion';
export const SUGGESTION_DELETION_MARK = 'veltSuggestionDeletion';
export const SUGGESTION_INSERTION_MARK = 'veltSuggestionInsertion';

const wrappingAttrSpec = {
  pendingId: { default: '', rendered: false },
  suggestionId: { default: null as string | null, rendered: false },
  targetId: { default: null as string | null, rendered: false },
  kind: { default: 'pending' as SuggestionKind, rendered: false },
  oldValue: { default: '', rendered: false },
  newValue: { default: '', rendered: false },
  formatOp: { default: null as FormatOp | null, rendered: false },
  userId: { default: null as string | null, rendered: false },
  userName: { default: null as string | null, rendered: false },
  color: { default: '#1976d2', rendered: false },
  timestamp: { default: 0, rendered: false },
};

const renderWrappingDataAttrs = (attrs: SuggestionMarkAttrs) => {
  const committed = !!attrs.suggestionId;
  return {
    // The data-velt-suggestion-target attribute is part of Velt's protocol for
    // DOM-level target resolution. Renaming would break the integration; the
    // attribute lives here even though the mark itself is generic.
    'data-velt-suggestion-target': attrs.targetId ?? attrs.suggestionId ?? '',
    'data-velt-suggestion-id': attrs.suggestionId ?? '',
    'data-velt-pending-id': attrs.pendingId ?? '',
    'data-velt-suggestion-kind': attrs.kind,
    'data-velt-state': committed ? 'committed' : 'pending',
    'data-velt-format-op': attrs.formatOp ? JSON.stringify(attrs.formatOp) : '',
    'data-user-id': attrs.userId,
    'data-user-name': attrs.userName,
    'data-color': attrs.color,
    'data-timestamp': String(attrs.timestamp),
    style: `--velt-suggestion-color: ${attrs.color}`,
    class: `velt-suggestion ${committed ? 'velt-suggestion-committed' : 'velt-suggestion-pending'}`,
  };
};

const parseWrappingDataAttrs = (el: HTMLElement) => {
  const targetId =
    el.getAttribute('data-velt-suggestion-target') ??
    el.getAttribute('data-velt-target-id') ??
    null;
  const suggestionId = el.getAttribute('data-velt-suggestion-id') || null;
  let formatOp: FormatOp | null = null;
  const rawFormatOp = el.getAttribute('data-velt-format-op');
  if (rawFormatOp) {
    try {
      formatOp = JSON.parse(rawFormatOp) as FormatOp;
    } catch {
      formatOp = null;
    }
  }
  const attrs: Partial<SuggestionMarkAttrs> = {
    pendingId: el.getAttribute('data-velt-pending-id') ?? '',
    suggestionId,
    targetId,
    kind: (el.getAttribute('data-velt-suggestion-kind') as SuggestionKind) ?? 'pending',
    formatOp,
    userId: el.getAttribute('data-user-id') ?? null,
    userName: el.getAttribute('data-user-name') ?? null,
    color: el.getAttribute('data-color') ?? '#1976d2',
    timestamp: Number(el.getAttribute('data-timestamp')) || 0,
  };
  return attrs;
};

/**
 * Wrapping mark — carries the suggestion identity. Applied to the full range
 * spanning both the deletion and insertion halves so PM mark-merging renders
 * a single outer span. Declared first so it nests outside the inner kind marks.
 */
export const SuggestionMark = Mark.create({
  name: SUGGESTION_MARK,
  inclusive: false,
  excludes: '',
  spanning: true,

  addAttributes() {
    return wrappingAttrSpec;
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-velt-suggestion-target]',
        getAttrs: (node) => parseWrappingDataAttrs(node as HTMLElement),
      },
      {
        tag: 'span[data-velt-suggestion-id]',
        getAttrs: (node) => parseWrappingDataAttrs(node as HTMLElement),
      },
    ];
  },

  renderHTML({ mark, HTMLAttributes }) {
    const attrs = mark.attrs as SuggestionMarkAttrs;
    return [
      'span',
      mergeAttributes(HTMLAttributes, renderWrappingDataAttrs(attrs)),
      0,
    ];
  },
});

export const SuggestionDeletionMark = Mark.create({
  name: SUGGESTION_DELETION_MARK,
  inclusive: false,
  excludes: '',
  spanning: true,

  parseHTML() {
    return [{ tag: 'span[data-velt-suggestion-kind="deletion"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-velt-suggestion-kind': 'deletion',
        class: 'velt-suggestion-deletion',
      }),
      0,
    ];
  },
});

export const SuggestionInsertionMark = Mark.create({
  name: SUGGESTION_INSERTION_MARK,
  inclusive: false,
  excludes: '',
  spanning: true,

  parseHTML() {
    return [{ tag: 'span[data-velt-suggestion-kind="insertion"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-velt-suggestion-kind': 'insertion',
        class: 'velt-suggestion-insertion',
      }),
      0,
    ];
  },
});

export interface MarkRange {
  from: number;
  to: number;
  mark: PMMark;
}

interface SuggestionRanges {
  wrapping: MarkRange[];
  deletion: MarkRange[];
  insertion: MarkRange[];
}

function rangesByPredicate(
  doc: PMNode,
  predicate: (mark: PMMark) => boolean,
): SuggestionRanges {
  const out: SuggestionRanges = { wrapping: [], deletion: [], insertion: [] };
  doc.descendants((node, pos) => {
    if (!node.isInline) return true;
    const wrap = node.marks.find(
      (m) => m.type.name === SUGGESTION_MARK && predicate(m),
    );
    if (!wrap) return true;
    const range: MarkRange = { from: pos, to: pos + node.nodeSize, mark: wrap };
    out.wrapping.push(range);
    if (node.marks.some((m) => m.type.name === SUGGESTION_DELETION_MARK)) {
      out.deletion.push(range);
    }
    if (node.marks.some((m) => m.type.name === SUGGESTION_INSERTION_MARK)) {
      out.insertion.push(range);
    }
    return true;
  });
  return out;
}

export function findSuggestionRangesById(
  doc: PMNode,
  suggestionId: string,
): SuggestionRanges {
  return rangesByPredicate(doc, (m) => m.attrs.suggestionId === suggestionId);
}

export function findSuggestionRangesByPendingId(
  doc: PMNode,
  pendingId: string,
): SuggestionRanges {
  return rangesByPredicate(doc, (m) => m.attrs.pendingId === pendingId);
}

export interface PendingClusterSummary {
  pendingId: string;
  userId: string | null;
  userName: string | null;
  color: string;
  timestamp: number;
  hasDeletion: boolean;
  hasInsertion: boolean;
  formatOp: FormatOp | null;
  ranges: SuggestionRanges;
}

export function listPendingClusters(doc: PMNode): PendingClusterSummary[] {
  const seen = new Map<string, PendingClusterSummary>();
  doc.descendants((node) => {
    if (!node.isInline) return true;
    for (const m of node.marks) {
      if (m.type.name !== SUGGESTION_MARK) continue;
      if (m.attrs.suggestionId) continue;
      const pid = m.attrs.pendingId as string;
      if (!pid || seen.has(pid)) continue;
      seen.set(pid, {
        pendingId: pid,
        userId: m.attrs.userId ?? null,
        userName: m.attrs.userName ?? null,
        color: m.attrs.color ?? '#1976d2',
        timestamp: m.attrs.timestamp ?? 0,
        hasDeletion: false,
        hasInsertion: false,
        formatOp: (m.attrs.formatOp as FormatOp | null) ?? null,
        ranges: { wrapping: [], deletion: [], insertion: [] },
      });
    }
    return true;
  });
  for (const summary of seen.values()) {
    summary.ranges = findSuggestionRangesByPendingId(doc, summary.pendingId);
    summary.hasDeletion = summary.ranges.deletion.length > 0;
    summary.hasInsertion = summary.ranges.insertion.length > 0;
  }
  return Array.from(seen.values());
}

export function listCommittedSuggestionIds(doc: PMNode): string[] {
  const ids = new Set<string>();
  doc.descendants((node) => {
    if (!node.isInline) return true;
    for (const m of node.marks) {
      if (m.type.name === SUGGESTION_MARK && m.attrs.suggestionId) {
        ids.add(m.attrs.suggestionId);
      }
    }
    return true;
  });
  return Array.from(ids);
}

function mergeAdjacent(ranges: MarkRange[]): MarkRange[] {
  if (ranges.length === 0) return ranges;
  const sorted = [...ranges].sort((a, b) => a.from - b.from);
  const out: MarkRange[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = out[out.length - 1];
    const cur = sorted[i];
    if (cur.from === prev.to) {
      out[out.length - 1] = { from: prev.from, to: cur.to, mark: prev.mark };
    } else {
      out.push(cur);
    }
  }
  return out;
}

function textOfRanges(doc: PMNode, ranges: MarkRange[]): string {
  if (ranges.length === 0) return '';
  return mergeAdjacent(ranges)
    .map((r) => doc.textBetween(r.from, r.to, ' ', ' '))
    .join('');
}

export function deletionTextById(doc: PMNode, suggestionId: string): string {
  return textOfRanges(doc, findSuggestionRangesById(doc, suggestionId).deletion);
}

export function insertionTextById(doc: PMNode, suggestionId: string): string {
  return textOfRanges(doc, findSuggestionRangesById(doc, suggestionId).insertion);
}

export function wrappingTextById(doc: PMNode, suggestionId: string): string {
  return textOfRanges(doc, findSuggestionRangesById(doc, suggestionId).wrapping);
}

export function formatOpById(doc: PMNode, suggestionId: string): FormatOp | null {
  const ranges = findSuggestionRangesById(doc, suggestionId);
  if (ranges.wrapping.length === 0) return null;
  return (ranges.wrapping[0].mark.attrs.formatOp as FormatOp | null) ?? null;
}

export function pendingClusterText(doc: PMNode, pendingId: string) {
  const ranges = findSuggestionRangesByPendingId(doc, pendingId);
  return {
    oldValue: textOfRanges(doc, ranges.deletion),
    newValue: textOfRanges(doc, ranges.insertion),
    wrappingText: textOfRanges(doc, ranges.wrapping),
    ranges,
  };
}

export function pendingMarkAtPos(
  doc: PMNode,
  pos: number,
  userId: string | null,
): { pendingId: string; mark: PMMark } | null {
  if (pos < 0) return null;
  const docSize = doc.content.size;
  const probes: number[] = [];
  if (pos > 0 && pos - 1 <= docSize) probes.push(pos - 1);
  if (pos < docSize) probes.push(pos);

  for (const p of probes) {
    let result: { pendingId: string; mark: PMMark } | null = null;
    doc.nodesBetween(p, Math.min(p + 1, docSize), (node) => {
      if (result) return false;
      if (!node.isInline) return true;
      const m = node.marks.find(
        (mk) =>
          mk.type.name === SUGGESTION_MARK &&
          !mk.attrs.suggestionId &&
          (userId == null || mk.attrs.userId === userId),
      );
      if (m && m.attrs.pendingId) {
        result = { pendingId: m.attrs.pendingId, mark: m };
        return false;
      }
      return true;
    });
    if (result) return result;
  }
  return null;
}

export function rangeOverlapsCommitted(doc: PMNode, from: number, to: number): boolean {
  if (from === to) return false;
  let hit = false;
  doc.nodesBetween(from, to, (node) => {
    if (hit) return false;
    if (!node.isInline) return true;
    if (
      node.marks.some(
        (m) => m.type.name === SUGGESTION_MARK && !!m.attrs.suggestionId,
      )
    ) {
      hit = true;
      return false;
    }
    return true;
  });
  return hit;
}

export { mergeAdjacent };
