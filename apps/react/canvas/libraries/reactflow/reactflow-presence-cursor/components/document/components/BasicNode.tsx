"use client"

import { Handle, Position, type NodeProps } from "@xyflow/react"
import { IconGripVertical } from "@tabler/icons-react"

export function BasicNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-[rgb(var(--surface))] border border-[rgb(var(--border))] min-w-[150px]">
      <div className="flex items-center gap-2">
        <IconGripVertical size={16} className="text-[rgb(var(--text-muted))]" />
        <div className="font-medium text-[rgb(var(--text))]">{data.label}</div>
      </div>

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-[rgb(var(--primary))]" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-[rgb(var(--primary))]" />
    </div>
  )
}
