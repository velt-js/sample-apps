"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

interface DiamondNodeData {
  label: string
}

export const DiamondNode = memo(({ data, selected }: NodeProps<DiamondNodeData>) => {
  return (
    <div className="relative">
      <div
        className={`
          w-20 h-20 shadow-lg bg-card border-2 transition-all duration-150 ease-in-out
          transform rotate-45 flex items-center justify-center
          ${selected ? "border-primary shadow-primary/20" : "border-border hover:border-primary/50"}
        `}
      >
        <div className="text-xs font-medium text-card-foreground text-center px-2 transform -rotate-45">
          {data.label}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-background absolute -top-1.5 left-1/2 transform -translate-x-1/2"
        aria-label="Input connection point"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-background absolute -bottom-1.5 left-1/2 transform -translate-x-1/2"
        aria-label="Output connection point"
      />
    </div>
  )
})

DiamondNode.displayName = "DiamondNode"
