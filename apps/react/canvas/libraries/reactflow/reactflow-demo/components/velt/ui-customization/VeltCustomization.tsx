"use client";
import { VeltWireframe } from "@veltdev/react";
import { VeltComponent1Wf } from "./VeltComponent1Wf";
import { VeltComponent2Wf } from "./VeltComponent2Wf";
import VeltCommentBubbleWf from "./VeltCommentBubbleWf";
import VeltCommentToolWf from "./VeltCommentToolWf";

export function VeltCustomization() {
  return (
    <VeltWireframe>
      <VeltComponent1Wf />
      <VeltComponent2Wf />
      <VeltCommentBubbleWf />
      <VeltCommentToolWf />
    </VeltWireframe>
  );
}
