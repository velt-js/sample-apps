"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

interface CircleNodeData {
  label: string
}

export const CircleNode = memo(({ data, selected }: NodeProps<CircleNodeData>) => {
  return (
    <div
      className={`
        w-20 h-20 shadow-lg rounded-full bg-card border-2 transition-all duration-150 ease-in-out
        flex items-center justify-center
        ${selected ? "border-primary shadow-primary/20" : "border-border hover:border-primary/50"}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-background"
        aria-label="Input connection point"
      />

      <div className="text-xs font-medium text-card-foreground text-center px-2">{data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-background"
        aria-label="Output connection point"
      />
    </div>
  )
})

CircleNode.displayName = "CircleNode"
