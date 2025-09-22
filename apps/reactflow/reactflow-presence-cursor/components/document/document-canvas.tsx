"use client"

import React from "react"

import type { ReactElement } from "react"

import { useCallback, useMemo, useState } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type NodeTypes,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { initialNodes, initialEdges } from "@/lib/flow-data"
import { BasicNode } from "./components/basic-node"
import { CircleNode } from "./components/circle-node"
import { DiamondNode } from "./components/diamond-node"

const nodeTypes: NodeTypes = {
  basic: BasicNode,
  circle: CircleNode,
  diamond: DiamondNode,
}

let id = 0
const getId = () => `dndnode_${id++}`

interface DocumentCanvasProps {
  onZoomIn?: () => void
  onZoomOut?: () => void
  onFitView?: () => void
  onSave?: () => void
  onExport?: () => void
  onShare?: () => void
  activeTool?: string
  onDeleteSelected?: () => void
  onCopySelected?: () => void
}

export function DocumentCanvas({
  onZoomIn,
  onZoomOut,
  onFitView,
  onSave,
  onExport,
  onShare,
  activeTool = "select",
  onDeleteSelected,
  onCopySelected,
}: DocumentCanvasProps): ReactElement {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [selectedNodes, setSelectedNodes] = useState<string[]>([])

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
    setSelectedNodes(selectedNodes.map((node) => node.id))
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedNodes.length > 0) {
          setNodes((nds) => nds.filter((node) => !selectedNodes.includes(node.id)))
          setEdges((eds) =>
            eds.filter((edge) => !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target)),
          )
          setSelectedNodes([])
        }
      }
    },
    [selectedNodes, setNodes, setEdges],
  )

  React.useEffect(() => {
    if (reactFlowInstance) {
      if (onZoomIn) {
        ;(window as any).flowZoomIn = () => reactFlowInstance.zoomIn()
      }
      if (onZoomOut) {
        ;(window as any).flowZoomOut = () => reactFlowInstance.zoomOut()
      }
      if (onFitView) {
        ;(window as any).flowFitView = () => reactFlowInstance.fitView()
      }
      if (onDeleteSelected) {
        ;(window as any).flowDeleteSelected = () => {
          if (selectedNodes.length > 0) {
            setNodes((nds) => nds.filter((node) => !selectedNodes.includes(node.id)))
            setEdges((eds) =>
              eds.filter((edge) => !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target)),
            )
            setSelectedNodes([])
          }
        }
      }
      if (onCopySelected) {
        ;(window as any).flowCopySelected = () => {
          if (selectedNodes.length > 0) {
            const nodesToCopy = nodes.filter((node) => selectedNodes.includes(node.id))
            const copiedNodes = nodesToCopy.map((node) => ({
              ...node,
              id: getId(),
              position: { x: node.position.x + 50, y: node.position.y + 50 },
              selected: false,
            }))
            setNodes((nds) => [...nds, ...copiedNodes])
          }
        }
      }
      if (onSave) {
        ;(window as any).flowSave = () => {
          const flowData = { nodes, edges }
          localStorage.setItem("flowchart-data", JSON.stringify(flowData))
          console.log("[v0] Flowchart saved to localStorage")
        }
      }
      if (onExport) {
        ;(window as any).flowExport = () => {
          const flowData = { nodes, edges }
          const dataStr = JSON.stringify(flowData, null, 2)
          const dataBlob = new Blob([dataStr], { type: "application/json" })
          const url = URL.createObjectURL(dataBlob)
          const link = document.createElement("a")
          link.href = url
          link.download = "flowchart.json"
          link.click()
          URL.revokeObjectURL(url)
        }
      }
      if (onShare) {
        ;(window as any).flowShare = async () => {
          const flowData = { nodes, edges }
          const dataStr = JSON.stringify(flowData, null, 2)

          // Try Web Share API first
          if (navigator.share && navigator.canShare) {
            try {
              await navigator.share({
                title: "My Flowchart",
                text: "Check out this flowchart I created",
                files: [new File([dataStr], "flowchart.json", { type: "application/json" })],
              })
              console.log("[v0] Flowchart shared successfully")
              return
            } catch (error) {
              console.log("[v0] Web Share API failed, falling back to clipboard")
            }
          }

          // Fallback to clipboard
          try {
            await navigator.clipboard.writeText(dataStr)
            console.log("[v0] Flowchart data copied to clipboard")
            // Show a temporary notification
            const notification = document.createElement("div")
            notification.textContent = "Flowchart data copied to clipboard!"
            notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
            document.body.appendChild(notification)
            setTimeout(() => document.body.removeChild(notification), 3000)
          } catch (clipboardError) {
            console.log("[v0] Clipboard access failed, creating download link")
            // Final fallback - create download link
            const dataBlob = new Blob([dataStr], { type: "application/json" })
            const url = URL.createObjectURL(dataBlob)
            const link = document.createElement("a")
            link.href = url
            link.download = "flowchart-share.json"
            link.click()
            URL.revokeObjectURL(url)
          }
        }
      }
    }
  }, [
    reactFlowInstance,
    selectedNodes,
    nodes,
    edges,
    onZoomIn,
    onZoomOut,
    onFitView,
    onDeleteSelected,
    onCopySelected,
    onSave,
    onExport,
    onShare,
  ])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")

      if (typeof type === "undefined" || !type) {
        return
      }

      if (!reactFlowInstance) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const nodeTypeMap: Record<string, string> = {
        rectangle: "basic",
        circle: "circle",
        diamond: "diamond",
      }

      const newNode: Node = {
        id: getId(),
        type: nodeTypeMap[type] || "basic",
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes],
  )

  const minimapStyle = useMemo(
    () => ({
      height: 120,
      backgroundColor: "var(--color-muted)",
    }),
    [],
  )

  return (
    <div className="w-full h-full bg-background" onKeyDown={onKeyDown} tabIndex={0}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-background"
        nodesDraggable={activeTool === "select"}
        nodesConnectable={activeTool === "select"}
        elementsSelectable={activeTool === "select"}
      >
        <Controls
          className="bg-card border border-border shadow-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap style={minimapStyle} className="border border-border shadow-lg" zoomable pannable />
        <Background variant="dots" gap={20} size={1} className="opacity-50" />
      </ReactFlow>
    </div>
  )
}
