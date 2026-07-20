import { useEffect, useRef } from 'react';
import { useCommitSuggestion, useRegisterTarget } from '@veltdev/react';
import type { Editor } from '@tiptap/react';
import type { Transaction } from '@tiptap/pm/state';
import {
  listPendingClusters,
  newSuggestionId,
  pendingClusterText,
  type PendingClusterSummary,
  type SuggestionKind,
} from '../core';

export interface CommitSchedulerOptions {
  debounceMs?: number;
}

const DEFAULT_DEBOUNCE = 2000;

function deriveKind(summary: PendingClusterSummary): SuggestionKind {
  if (summary.formatOp) return summary.formatOp.op === 'add' ? 'format-add' : 'format-remove';
  if (summary.hasDeletion && summary.hasInsertion) return 'replacement';
  if (summary.hasInsertion) return 'insertion';
  if (summary.hasDeletion) return 'deletion';
  return 'pending';
}

function summarize(cluster: PendingClusterSummary, editor: Editor) {
  const { oldValue, newValue, wrappingText } = pendingClusterText(
    editor.state.doc,
    cluster.pendingId,
  );
  const kind = deriveKind(cluster);
  if (kind === 'format-add' && cluster.formatOp) {
    return {
      kind,
      oldValue: wrappingText,
      newValue: `+${cluster.formatOp.markName}`,
      label: `Suggest format: add ${cluster.formatOp.markName} to "${wrappingText}"`,
    };
  }
  if (kind === 'format-remove' && cluster.formatOp) {
    return {
      kind,
      oldValue: wrappingText,
      newValue: `-${cluster.formatOp.markName}`,
      label: `Suggest format: remove ${cluster.formatOp.markName} from "${wrappingText}"`,
    };
  }
  if (kind === 'deletion')
    return { kind, oldValue, newValue, label: `Suggest delete: "${oldValue}"` };
  if (kind === 'insertion')
    return { kind, oldValue, newValue, label: `Suggest insert: "${newValue}"` };
  return { kind, oldValue, newValue, label: `Suggest edit: "${oldValue}" → "${newValue}"` };
}

export function useCommitScheduler(
  editor: Editor | null,
  enabled: boolean,
  options: CommitSchedulerOptions = {},
) {
  const { commitSuggestion } = useCommitSuggestion();
  const { registerTarget } = useRegisterTarget();
  const inFlightRef = useRef<Set<string>>(new Set());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastBlockRef = useRef<number | null>(null);
  const debounceMs = options.debounceMs ?? DEFAULT_DEBOUNCE;

  useEffect(() => {
    if (!editor || !enabled) return undefined;

    const commitCluster = async (cluster: PendingClusterSummary) => {
      if (inFlightRef.current.has(cluster.pendingId)) return;
      const info = summarize(cluster, editor);
      if (!info.oldValue && !info.newValue) return;

      const targetId = newSuggestionId();
      inFlightRef.current.add(cluster.pendingId);
      try {
        registerTarget({
          targetId,
          getter: () => {
            const { oldValue: o, newValue: n, wrappingText } = pendingClusterText(
              editor.state.doc,
              cluster.pendingId,
            );
            // No marks at all → unresolvable → stale on approve.
            if (!o && !n && !wrappingText) return undefined;
            // For format clusters return the underlying text; for content
            // clusters return the deletion-side text (empty for pure insert).
            if (cluster.formatOp) return wrappingText;
            return o;
          },
        });
        await commitSuggestion({
          targetId,
          newValue: info.newValue,
          // summary: info.label,
          metadata: {
            kind: info.kind,
            oldValue: info.oldValue,
            newValue: info.newValue,
          },
        });
        editor.commands.promotePendingCluster(cluster.pendingId, {
          suggestionId: targetId,
          targetId,
          kind: info.kind,
          oldValue: info.oldValue,
          newValue: info.newValue,
        });
      } catch (err) {
        console.error('[velt-suggestion] commit failed', cluster.pendingId, err);
      } finally {
        inFlightRef.current.delete(cluster.pendingId);
      }
    };

    const flushAll = () => {
      const clusters = listPendingClusters(editor.state.doc);
      for (const c of clusters) {
        if (!c.hasInsertion && !c.hasDeletion && !c.formatOp) continue;
        commitCluster(c);
      }
    };

    const flushExceptCaret = () => {
      const caretCluster = caretPendingClusterId(editor);
      const clusters = listPendingClusters(editor.state.doc);
      for (const c of clusters) {
        if (c.pendingId === caretCluster) continue;
        if (!c.hasInsertion && !c.hasDeletion && !c.formatOp) continue;
        commitCluster(c);
      }
    };

    const scheduleDebounce = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(flushAll, debounceMs);
    };

    const onTransaction = ({ transaction }: { transaction: Transaction }) => {
      if (!transaction.docChanged) return;
      scheduleDebounce();
    };

    const onSelectionUpdate = () => {
      const $head = editor.state.selection.$head;
      const blockDepth = $head.depth > 0 ? $head.depth : 0;
      const blockPos = blockDepth > 0 ? $head.before(blockDepth) : 0;
      if (lastBlockRef.current !== null && lastBlockRef.current !== blockPos) {
        flushExceptCaret();
      }
      lastBlockRef.current = blockPos;
    };

    const onBlur = () => {
      flushAll();
    };

    editor.on('transaction', onTransaction);
    editor.on('selectionUpdate', onSelectionUpdate);
    editor.on('blur', onBlur);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      editor.off('transaction', onTransaction);
      editor.off('selectionUpdate', onSelectionUpdate);
      editor.off('blur', onBlur);
    };
  }, [editor, enabled, commitSuggestion, registerTarget, debounceMs]);
}

function caretPendingClusterId(editor: Editor): string | null {
  const $head = editor.state.selection.$head;
  const probes = [Math.max(0, $head.pos - 1), $head.pos];
  for (const p of probes) {
    let found: string | null = null;
    editor.state.doc.nodesBetween(
      p,
      Math.min(p + 1, editor.state.doc.content.size),
      (node) => {
        if (found) return false;
        if (!node.isInline) return true;
        const m = node.marks.find(
          (mk) => mk.type.name === 'veltSuggestion' && !mk.attrs.suggestionId,
        );
        if (m && m.attrs.pendingId) {
          found = m.attrs.pendingId as string;
          return false;
        }
        return true;
      },
    );
    if (found) return found;
  }
  return null;
}
