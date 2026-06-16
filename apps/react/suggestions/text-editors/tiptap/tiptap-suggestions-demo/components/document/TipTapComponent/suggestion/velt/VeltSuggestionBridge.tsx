'use client'

import { useEffect, useMemo } from 'react';
import {
  useSuggestionEventCallback,
  useSuggestionModeState,
  useUnregisterTarget,
  useVeltEventCallback,
} from '@veltdev/react';
import type { Editor } from '@tiptap/react';
import { useTargetGetters } from './useTargetGetters';
import { useCommitScheduler } from './commitScheduler';
import type { SuggestionAuthor } from '../core';

interface Props {
  editor: Editor | null;
}

function colorFromUserId(userId: string | null | undefined): string {
  if (!userId) return '#1976d2';
  let h = 0;
  for (let i = 0; i < userId.length; i++) h = (h * 31 + userId.charCodeAt(i)) % 360;
  return `hsl(${h}, 65%, 42%)`;
}

export const VeltSuggestionBridge = ({ editor }: Props) => {
  useTargetGetters(editor);

  const { unregisterTarget } = useUnregisterTarget();
  const enabled = !!useSuggestionModeState();
  const currentUser = useVeltEventCallback('userUpdate');

  const author: SuggestionAuthor | null = useMemo(() => {
    if (!currentUser?.userId) return null;
    return {
      userId: currentUser.userId,
      name: currentUser.name ?? 'Unknown',
      color: colorFromUserId(currentUser.userId),
    };
  }, [currentUser?.userId, currentUser?.name]);

  useEffect(() => {
    if (!editor) return;
    editor.commands.setSuggestionPluginEnabled(enabled);
  }, [editor, enabled]);

  useEffect(() => {
    if (!editor) return;
    editor.commands.setSuggestionPluginAuthor(author);
  }, [editor, author]);

  useCommitScheduler(editor, enabled);

  const approved = useSuggestionEventCallback('suggestionApproved');
  const rejected = useSuggestionEventCallback('suggestionRejected');
  const stale = useSuggestionEventCallback('suggestionStale');

  useEffect(() => {
    const id = approved?.suggestion?.targetId;
    if (!editor || !id) return;
    editor.commands.replaceWithNewValueById(id);
    unregisterTarget(id);
  }, [approved, editor, unregisterTarget]);

  useEffect(() => {
    const id = rejected?.suggestion?.targetId;
    if (!editor || !id) return;
    editor.commands.removeMarkById(id);
    unregisterTarget(id);
  }, [rejected, editor, unregisterTarget]);

  useEffect(() => {
    const id = stale?.suggestion?.targetId;
    if (!editor || !id) return;
    editor.commands.removeMarkById(id);
    unregisterTarget(id);
  }, [stale, editor, unregisterTarget]);

  return null;
};
