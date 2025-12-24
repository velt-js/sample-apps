"use client";
import { VeltWireframe } from '@veltdev/react';
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltCommentsSidebarHeaderWf from "./VeltCommentsSidebarHeaderWf";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";
import VeltCommentDialogWf from './VeltCommentDialogWf';
import VeltReactionToolWf from './VeltReactionToolWf';
import VeltInlineCommentsSectionWf from './VeltInlineCommentsSectionWf';
import VeltCommentsSidebarFocusedThreadWf from './VeltCommentsSidebarFocusedThreadWf';
import VeltCommentsSidebarEmptyPlaceholderWf from './VeltCommentsSidebarEmptyPlaceholderWf';
import VeltNotificationWf from './VeltNotificationWf';
import VeltNotificationListItemWf from './VeltNotificationListItemWf';

export function VeltCustomization() {

  return (
    <VeltWireframe>
      <VeltSidebarButtonWf />
      <VeltCommentToolWf />
      <VeltCommentBubbleWf />
      <VeltNotificationsToolWf />
      <VeltCommentsSidebarHeaderWf />

      <VeltCommentDialogWf />
      <VeltReactionToolWf />
      <VeltInlineCommentsSectionWf />
      <VeltCommentsSidebarFocusedThreadWf />
      <VeltCommentsSidebarEmptyPlaceholderWf />
      <VeltNotificationWf />
      <VeltNotificationListItemWf />
    </VeltWireframe>
  );
}