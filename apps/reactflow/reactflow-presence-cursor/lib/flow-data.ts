import type { Node, Edge } from "@xyflow/react"

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "basic",
    position: { x: 250, y: 50 },
    data: { label: "Multiplayer" },
  },
  {
    id: "2",
    type: "basic",
    position: { x: 250, y: 200 },
    data: { label: "React Flow" },
  },
  {
    id: "3",
    type: "basic",
    position: { x: 400, y: 350 },
    data: { label: "flowcharts" },
  },
  {
    id: "4",
    type: "basic",
    position: { x: 100, y: 350 },
    data: { label: "Velt" },
  },
]

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    label: "and",
    animated: true,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    label: "with",
    animated: true,
  },
]
