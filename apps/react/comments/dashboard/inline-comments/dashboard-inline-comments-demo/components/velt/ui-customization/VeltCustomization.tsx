"use client";
import { VeltWireframe } from '@veltdev/react';
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";
import VeltCommentsSidebarHeaderWf from "./VeltCommentsSidebarHeaderWf";
import VeltNotificationsToolWf from "./VeltNotificationsToolWf";
import VeltSidebarButtonWf from "./VeltSidebarButtonWf";
import "./styles.css";

export function VeltCustomization() {

  return (
    <VeltWireframe>
      <VeltSidebarButtonWf />
      <VeltCommentToolWf />
      <VeltCommentBubbleWf />
      <VeltNotificationsToolWf />
      <VeltCommentsSidebarHeaderWf />
    </VeltWireframe>
  );
}