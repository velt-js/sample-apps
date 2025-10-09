"use client";
import { VeltWireframe } from "@veltdev/react";
import { VeltComponent1Wf } from "./VeltComponent1Wf";
import { VeltComponent2Wf } from "./VeltComponent2Wf";

export function VeltCustomization() {
  return (
    <VeltWireframe>
      <VeltComponent1Wf />
      <VeltComponent2Wf />
    </VeltWireframe>
  );
}
