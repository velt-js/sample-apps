"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

interface BasicNodeData {
  label: string
}

export const BasicNode = memo(({ data, selected }: NodeProps<BasicNodeData>) => {
  return (
    <div
      className={`
        px-4 py-2 shadow-lg rounded-lg bg-card border-2 transition-all duration-150 ease-in-out
        ${selected ? "border-primary shadow-primary/20" : "border-border hover:border-primary/50"}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-background"
        aria-label="Input connection point"
      />

      <div className="text-sm font-medium text-card-foreground text-center min-w-[80px]">{data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-background"
        aria-label="Output connection point"
      />
    </div>
  )
})

BasicNode.displayName = "BasicNode"
