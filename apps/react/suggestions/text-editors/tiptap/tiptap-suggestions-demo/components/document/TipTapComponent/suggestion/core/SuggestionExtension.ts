import { Extension } from '@tiptap/core';
import {
  SUGGESTION_DELETION_MARK,
  SUGGESTION_INSERTION_MARK,
  SUGGESTION_MARK,
  SuggestionDeletionMark,
  SuggestionInsertionMark,
  SuggestionMark,
  findSuggestionRangesById,
  findSuggestionRangesByPendingId,
  mergeAdjacent,
} from './suggestionMark';
import {
  META_SET_STATE,
  META_SKIP,
  applySuggestionRewrite,
  createInlineSuggestionPlugin,
  suggestionPluginKey,
} from './plugin';
import type { SuggestionAuthor, SuggestionKind, SuggestionMarkAttrs } from './types';

export interface SuggestionMetaOptions {
  enableSuggestReplacement: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    veltSuggestion: {
      applySuggestionMark: (
        attrs: SuggestionMarkAttrs,
        range: { from: number; to: number },
      ) => ReturnType;
      replaceWithNewValueById: (suggestionId: string) => ReturnType;
      removeMarkById: (suggestionId: string) => ReturnType;
      promotePendingCluster: (
        pendingId: string,
        next: {
          suggestionId: string;
          targetId: string;
          kind: SuggestionKind;
          oldValue: string;
          newValue: string;
        },
      ) => ReturnType;
      setSuggestionPluginEnabled: (enabled: boolean) => ReturnType;
      setSuggestionPluginAuthor: (author: SuggestionAuthor | null) => ReturnType;
    };
  }
}

export const SuggestionMeta = Extension.create<SuggestionMetaOptions>({
  name: 'veltSuggestionMeta',

  addOptions() {
    return {
      enableSuggestReplacement: true,
    };
  },

  addProseMirrorPlugins() {
    return [createInlineSuggestionPlugin()];
  },

  /**
   * Install a dispatchTransaction wrapper on the editor view so the user's
   * steps and our suggestion-marking steps land in PM as a SINGLE transaction.
   * That gives atomic undo/redo for every kind of edit (typing, paste, delete,
   * structural — anything) without the customer having to write any wiring.
   */
  onCreate() {
    const view = this.editor.view;
    const previous = view.props.dispatchTransaction;
    view.setProps({
      dispatchTransaction(tr) {
        // 'this' at runtime is the EditorView, but PM types it loosely. We
        // already captured the view reference via closure; use it.
        const ps = suggestionPluginKey.getState(view.state);
        if (ps) applySuggestionRewrite(tr, view.state, ps);
        if (previous) previous.call(view, tr);
        else view.updateState(view.state.apply(tr));
      },
    });
  },

  addCommands() {
    return {
      applySuggestionMark:
        (attrs, range) =>
        ({ state, tr, dispatch }) => {
          const wrap = state.schema.marks[SUGGESTION_MARK];
          const del = state.schema.marks[SUGGESTION_DELETION_MARK];
          const ins = state.schema.marks[SUGGESTION_INSERTION_MARK];
          if (!wrap || !del || !ins) return false;

          const { from, to } = range;
          const wrappingMark = wrap.create(attrs);
          const newValueText =
            (attrs.newValue ?? '').trim().length > 0 ? attrs.newValue : '';

          if (attrs.kind === 'insertion') {
            if (newValueText.length === 0) return false;
            const insertedFrom = from;
            const insertedTo = from + newValueText.length;
            tr.insert(insertedFrom, state.schema.text(newValueText));
            tr.addMark(insertedFrom, insertedTo, wrappingMark);
            tr.addMark(insertedFrom, insertedTo, ins.create());
          } else if (attrs.kind === 'deletion') {
            if (from === to) return false;
            tr.addMark(from, to, wrappingMark);
            tr.addMark(from, to, del.create());
          } else {
            if (from === to) return false;
            const oldFrom = from;
            const oldTo = to;
            const newFrom = oldTo;
            const newLen = newValueText.length;

            if (newLen > 0) {
              tr.insert(newFrom, state.schema.text(newValueText));
            }
            const newTo = newFrom + newLen;

            tr.addMark(oldFrom, newTo, wrappingMark);
            tr.addMark(oldFrom, oldTo, del.create());
            if (newLen > 0) {
              tr.addMark(newFrom, newTo, ins.create());
            }
          }

          tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
          if (dispatch) dispatch(tr);
          return true;
        },

      replaceWithNewValueById:
        (suggestionId) =>
        ({ state, tr, dispatch }) => {
          const ranges = findSuggestionRangesById(state.doc, suggestionId);
          if (ranges.wrapping.length === 0) return false;

          const wrap = state.schema.marks[SUGGESTION_MARK];
          const ins = state.schema.marks[SUGGESTION_INSERTION_MARK];

          // Format-change branch: just drop the wrapping mark.
          // The proposed format mark (or its absence) was already applied
          // when the user made the edit; accept = leave it as-is.
          const wrappingMark = ranges.wrapping[0].mark;
          if (wrappingMark.attrs.formatOp) {
            const wrappingMerged = mergeAdjacent(ranges.wrapping);
            for (const r of [...wrappingMerged].reverse()) {
              if (wrap) tr.removeMark(r.from, r.to, wrap);
            }
            tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
            if (dispatch) dispatch(tr);
            return true;
          }

          const deletion = mergeAdjacent(ranges.deletion);
          const insertion = mergeAdjacent(ranges.insertion);

          for (const r of [...insertion].reverse()) {
            if (wrap) tr.removeMark(r.from, r.to, wrap);
            if (ins) tr.removeMark(r.from, r.to, ins);
          }
          for (const r of [...deletion].reverse()) {
            tr.delete(r.from, r.to);
          }

          tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
          if (dispatch) dispatch(tr);
          return true;
        },

      removeMarkById:
        (suggestionId) =>
        ({ state, tr, dispatch }) => {
          const ranges = findSuggestionRangesById(state.doc, suggestionId);
          if (ranges.wrapping.length === 0) return false;

          const wrap = state.schema.marks[SUGGESTION_MARK];
          const del = state.schema.marks[SUGGESTION_DELETION_MARK];

          // Format-change branch: revert the proposed format op and drop wrapping.
          const wrappingMark = ranges.wrapping[0].mark;
          const formatOp = wrappingMark.attrs.formatOp as
            | { markName: string; attrs: Record<string, unknown>; op: 'add' | 'remove' }
            | null;
          if (formatOp) {
            const wrappingMerged = mergeAdjacent(ranges.wrapping);
            const formatMarkType = state.schema.marks[formatOp.markName];
            for (const r of [...wrappingMerged].reverse()) {
              if (formatMarkType) {
                if (formatOp.op === 'add') {
                  // Reject add → strip the proposed format mark.
                  tr.removeMark(r.from, r.to, formatMarkType);
                } else {
                  // Reject remove → re-apply the format mark with original attrs.
                  tr.addMark(r.from, r.to, formatMarkType.create(formatOp.attrs));
                }
              }
              if (wrap) tr.removeMark(r.from, r.to, wrap);
            }
            tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
            if (dispatch) dispatch(tr);
            return true;
          }

          const insertion = mergeAdjacent(ranges.insertion);
          const deletion = mergeAdjacent(ranges.deletion);

          for (const r of [...deletion].reverse()) {
            if (wrap) tr.removeMark(r.from, r.to, wrap);
            if (del) tr.removeMark(r.from, r.to, del);
          }
          for (const r of [...insertion].reverse()) {
            tr.delete(r.from, r.to);
          }

          tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
          if (dispatch) dispatch(tr);
          return true;
        },

      promotePendingCluster:
        (pendingId, next) =>
        ({ state, tr, dispatch }) => {
          const ranges = findSuggestionRangesByPendingId(state.doc, pendingId);
          if (ranges.wrapping.length === 0) return false;

          const wrap = state.schema.marks[SUGGESTION_MARK];
          if (!wrap) return false;

          const merged = mergeAdjacent(ranges.wrapping);
          for (const r of [...merged].reverse()) {
            const oldMark = r.mark;
            const newAttrs = {
              ...oldMark.attrs,
              suggestionId: next.suggestionId,
              targetId: next.targetId,
              kind: next.kind,
              oldValue: next.oldValue,
              newValue: next.newValue,
            };
            tr.removeMark(r.from, r.to, wrap);
            tr.addMark(r.from, r.to, wrap.create(newAttrs));
          }

          tr.setMeta(suggestionPluginKey, { [META_SKIP]: true });
          tr.setMeta('addToHistory', false);
          if (dispatch) dispatch(tr);
          return true;
        },

      setSuggestionPluginEnabled:
        (enabled) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta(suggestionPluginKey, {
              type: META_SET_STATE,
              payload: { enabled },
            });
            dispatch(tr);
          }
          return true;
        },

      setSuggestionPluginAuthor:
        (author) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta(suggestionPluginKey, {
              type: META_SET_STATE,
              payload: { currentUser: author },
            });
            dispatch(tr);
          }
          return true;
        },
    };
  },
});

export const SuggestionExtensions = (options: Partial<SuggestionMetaOptions> = {}) => [
  // Order matters — SuggestionMark first → outermost in renderHTML nesting.
  SuggestionMark,
  SuggestionDeletionMark,
  SuggestionInsertionMark,
  SuggestionMeta.configure(options),
];
