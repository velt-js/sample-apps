import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import { AddMarkStep, RemoveMarkStep, ReplaceStep } from '@tiptap/pm/transform';
import { Fragment, Slice } from '@tiptap/pm/model';
import type { Mark as PMMark, MarkType, Node as PMNode } from '@tiptap/pm/model';
import type { FormatOp, SuggestionAuthor } from './types';
import {
  SUGGESTION_DELETION_MARK,
  SUGGESTION_INSERTION_MARK,
  SUGGESTION_MARK,
  pendingMarkAtPos,
  rangeOverlapsCommitted,
} from './suggestionMark';

export interface SuggestionPluginState {
  enabled: boolean;
  currentUser: SuggestionAuthor | null;
  trackedFormatMarks: ReadonlySet<string>;
}

export const suggestionPluginKey = new PluginKey<SuggestionPluginState>(
  'veltSuggestionInline',
);

export const META_SKIP = 'skip';
export const META_SET_STATE = 'setState';

function newPendingId(): string {
  const rand =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `pending:${rand}`;
}

function buildPendingWrappingAttrs(
  author: SuggestionAuthor,
  pendingId: string,
  baseTimestamp?: number,
  formatOp: FormatOp | null = null,
) {
  return {
    pendingId,
    suggestionId: null,
    targetId: null,
    kind: formatOp ? (`format-${formatOp.op}` as const) : ('pending' as const),
    oldValue: '',
    newValue: '',
    formatOp,
    userId: author.userId,
    userName: author.name,
    color: author.color,
    timestamp: baseTimestamp ?? Date.now(),
  };
}

const SUGGESTION_MARK_NAMES: ReadonlySet<string> = new Set([
  SUGGESTION_MARK,
  SUGGESTION_DELETION_MARK,
  SUGGESTION_INSERTION_MARK,
]);

function isFormatStep(step: unknown): step is AddMarkStep | RemoveMarkStep {
  return step instanceof AddMarkStep || step instanceof RemoveMarkStep;
}

function isAllOwnPendingInsertion(
  slice: Slice,
  insertionType: MarkType,
  wrappingType: MarkType,
  userId: string,
): boolean {
  let allOwn = true;
  let hasInline = false;
  slice.content.descendants((node) => {
    if (!allOwn) return false;
    if (node.isText) {
      hasInline = true;
      const ins = node.marks.find((m) => m.type === insertionType);
      const wrap = node.marks.find((m) => m.type === wrappingType);
      if (!ins || !wrap) {
        allOwn = false;
        return false;
      }
      if (wrap.attrs.userId !== userId || wrap.attrs.suggestionId) {
        allOwn = false;
        return false;
      }
    }
    return true;
  });
  return hasInline && allOwn;
}

function remapSliceForDeletion(
  slice: Slice,
  insertionType: MarkType,
  deletionType: MarkType,
  wrappingType: MarkType,
  wrappingAttrs: Record<string, unknown>,
): Slice {
  const visit = (frag: Fragment): Fragment => {
    const out: PMNode[] = [];
    frag.forEach((node) => {
      const cleaned = node.marks.filter(
        (m) =>
          m.type !== insertionType &&
          m.type !== deletionType &&
          m.type !== wrappingType,
      );
      const newMarks = cleaned.concat(
        wrappingType.create(wrappingAttrs),
        deletionType.create(),
      );
      if (node.isText) {
        out.push(node.mark(newMarks));
      } else {
        out.push(node.copy(visit(node.content)).mark(newMarks));
      }
    });
    return Fragment.from(out);
  };
  return new Slice(visit(slice.content), slice.openStart, slice.openEnd);
}

export function createInlineSuggestionPlugin() {
  return new Plugin<SuggestionPluginState>({
    key: suggestionPluginKey,

    state: {
      init: () => ({
        enabled: false,
        currentUser: null,
        trackedFormatMarks: new Set<string>([
          'bold',
          'italic',
          'strike',
          'code',
          'underline',
        ]),
      }),
      apply(tr, prev) {
        const meta = tr.getMeta(suggestionPluginKey);
        if (meta && meta.type === META_SET_STATE) {
          return { ...prev, ...meta.payload };
        }
        return prev;
      },
    },

    filterTransaction(tr, state) {
      const ps = suggestionPluginKey.getState(state);
      if (tr.getMeta(suggestionPluginKey)?.[META_SKIP]) return true;
      // Undo/redo transactions reverse already-applied edits; they must always
      // pass through the lock, otherwise users can't undo edits that have
      // since been committed (their reversal steps overlap committed ranges).
      if (tr.getMeta('history$')) return true;
      if (!ps?.enabled || !ps.currentUser) return true;
      for (const step of tr.steps) {
        if (step instanceof ReplaceStep) {
          const rs = step as unknown as { from: number; to: number };
          if (rangeOverlapsCommitted(state.doc, rs.from, rs.to)) {
            return false;
          }
        } else if (isFormatStep(step)) {
          const fs = step as unknown as { from: number; to: number; mark: PMMark };
          if (SUGGESTION_MARK_NAMES.has(fs.mark.type.name)) continue;
          if (rangeOverlapsCommitted(state.doc, fs.from, fs.to)) {
            return false;
          }
        }
      }
      return true;
    },

  });
}

/**
 * Mutates `tr` (which already carries the user's steps) by appending the
 * wrapping/insertion/deletion mark operations needed to track the edit as a
 * suggestion. Returns true if anything was added.
 *
 * This is invoked from the Tiptap extension's dispatch wrapper so the user's
 * steps and our marking steps land in PM as a SINGLE transaction — giving
 * atomic undo/redo for free.
 */
export function applySuggestionRewrite(
  tr: Transaction,
  oldState: EditorState,
  ps: SuggestionPluginState,
): boolean {
  if (!ps.enabled || !ps.currentUser) return false;
  if (tr.getMeta(suggestionPluginKey)?.[META_SKIP]) return false;
  if (tr.getMeta('history$')) return false;
  if (!tr.docChanged) return false;

  const wrappingType = oldState.schema.marks[SUGGESTION_MARK];
  const insertionType = oldState.schema.marks[SUGGESTION_INSERTION_MARK];
  const deletionType = oldState.schema.marks[SUGGESTION_DELETION_MARK];
  if (!wrappingType || !insertionType || !deletionType) return false;

  const author = ps.currentUser;

  // Snapshot the user's portion of the transaction. We append our own steps
  // afterwards; tr.mapping grows to include both.
  const userStepCount = tr.steps.length;
  type StepCtx = { step: ReplaceStep; pre: PMNode; idx: number };
  const linear: StepCtx[] = [];
  let runningDoc: PMNode = oldState.doc;
  for (let i = 0; i < userStepCount; i++) {
    const step = tr.steps[i];
    if (step instanceof ReplaceStep) {
      linear.push({ step, pre: runningDoc, idx: i });
    }
    runningDoc = tr.docs[i + 1] ?? tr.doc;
  }

  let modified = false;

  for (const { step, pre, idx } of linear) {
    const rs = step as unknown as { from: number; to: number; slice: Slice };
    const stepFrom = rs.from;
    const stepTo = rs.to;
    const slice = rs.slice;
    const insertedSize = slice.size;
    const deletedSize = stepTo - stepFrom;
    if (insertedSize === 0 && deletedSize === 0) continue;

    // Map the step's pre-doc position through every step that came after it
    // (later user steps + any of our additions so far)
    const mappedFrom = tr.mapping.slice(idx + 1).map(stepFrom);

    const neighbor = pendingMarkAtPos(tr.doc, mappedFrom, author.userId);
    const pendingId = neighbor?.pendingId ?? newPendingId();
    const baseTimestamp = neighbor?.mark.attrs.timestamp as number | undefined;
    const wrappingAttrs = buildPendingWrappingAttrs(author, pendingId, baseTimestamp);

    if (insertedSize > 0) {
      const insertedFrom = mappedFrom;
      const insertedTo = insertedFrom + insertedSize;
      tr.removeMark(insertedFrom, insertedTo, wrappingType);
      tr.removeMark(insertedFrom, insertedTo, insertionType);
      tr.removeMark(insertedFrom, insertedTo, deletionType);
      tr.addMark(insertedFrom, insertedTo, wrappingType.create(wrappingAttrs));
      tr.addMark(insertedFrom, insertedTo, insertionType.create());
      modified = true;
    }

    if (deletedSize > 0) {
      const deletedSlice = pre.slice(stepFrom, stepTo);
      if (deletedSlice.openStart > 0 || deletedSlice.openEnd > 0) continue;
      if (isAllOwnPendingInsertion(deletedSlice, insertionType, wrappingType, author.userId)) {
        continue;
      }
      const remarked = remapSliceForDeletion(
        deletedSlice,
        insertionType,
        deletionType,
        wrappingType,
        wrappingAttrs,
      );
      const insertAt = tr.mapping.slice(idx + 1).map(stepFrom);
      tr.replace(insertAt, insertAt, remarked);
      modified = true;
    }
  }

  // Phase 3a: pure-format transactions (only AddMarkStep / RemoveMarkStep,
  // no ReplaceStep among the user's steps). Apply wrapping mark on the
  // affected range so the format toggle is tracked as a suggestion.
  let userHasReplace = false;
  let userHasFormat = false;
  for (let i = 0; i < userStepCount; i++) {
    const s = tr.steps[i];
    if (s instanceof ReplaceStep) userHasReplace = true;
    if (isFormatStep(s)) userHasFormat = true;
  }
  if (!userHasReplace && userHasFormat) {
    const tracked = ps.trackedFormatMarks;
    for (let i = 0; i < userStepCount; i++) {
      const step = tr.steps[i];
      if (!isFormatStep(step)) continue;
      const fs = step as unknown as { from: number; to: number; mark: PMMark };
      if (fs.from === fs.to) continue;
      if (SUGGESTION_MARK_NAMES.has(fs.mark.type.name)) continue;
      if (tracked.size > 0 && !tracked.has(fs.mark.type.name)) continue;

      const op: 'add' | 'remove' = step instanceof AddMarkStep ? 'add' : 'remove';
      const formatOp: FormatOp = {
        markName: fs.mark.type.name,
        attrs: fs.mark.attrs ?? {},
        op,
      };
      const fromMapped = tr.mapping.slice(i + 1).map(fs.from);
      const toMapped = tr.mapping.slice(i + 1).map(fs.to);
      if (fromMapped >= toMapped) continue;

      const neighbor = pendingMarkAtPos(tr.doc, fromMapped, author.userId);
      const pendingId = neighbor?.pendingId ?? newPendingId();
      const baseTimestamp = neighbor?.mark.attrs.timestamp as number | undefined;
      const wrappingAttrs = buildPendingWrappingAttrs(author, pendingId, baseTimestamp, formatOp);
      tr.addMark(fromMapped, toMapped, wrappingType.create(wrappingAttrs));
      modified = true;
    }
  }

  if (!modified) return false;
  tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
  return true;
}
