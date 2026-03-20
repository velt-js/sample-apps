"use client";
import { ReactFlow, useReactFlow, type Node, type Edge } from '@xyflow/react';
import { useCallback, useRef, useState, useEffect } from 'react';
// [Velt] Import the ReactFlow CRDT hook - this replaces useNodesState/useEdgesState to enable real-time multiplayer sync
import { useVeltReactFlowCrdtExtension } from '@veltdev/reactflow-crdt';
import Header from '../../header/header';
import { CustomNode } from './nodes/CustomNode';
import { SimpleNode } from './nodes/SimpleNode';
import { BottomToolbar } from './ui/BottomToolbar';
import { ZoomControls } from './ui/ZoomControls';
import { SidePanel } from './ui/SidePanel';
import {
  imgImage46,
  imgTablerIconPointer,
  getId,
  initialNodes,
  initialEdges,
  nodeOrigin,
  step2IdExport
} from './constants';

// Node types
const nodeTypes = {
  custom: CustomNode,
  simple: SimpleNode
};

export function AddNodeOnEdgeDrop() {
  // [Velt] This hook returns synchronized nodes/edges that automatically sync across all users in real-time
  // All changes through onNodesChange/onEdgesChange are automatically broadcast to other users
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
    editorId: 'react-flow-crdt-main-editor',
    initialEdges,
    initialNodes,
  });

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const { screenToFlowPosition, fitView, zoomIn, zoomOut } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(step2IdExport);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  // Center nodes on initial load
  useEffect(() => {
    // Small delay to ensure nodes are rendered
    const timer = setTimeout(() => {
      fitView({
        padding: 0.5,
        duration: 400
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  // Handle node click to select it
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setIsPanelOpen(true);

    // Update all nodes to set selected state
    onNodesChange(
      nodes.map((n) => ({
        type: 'replace',
        id: n.id,
        item: {
          ...n,
          data: {
            ...n.data,
            selected: n.id === node.id
          }
        }
      }))
    );
  }, [nodes, onNodesChange]);

  // Update node name
  const updateNodeName = useCallback((nodeId: string, newName: string) => {
    onNodesChange(
      nodes.map((n) => {
        if (n.id === nodeId) {
          return {
            type: 'replace',
            id: n.id,
            item: {
              ...n,
              position: n.position, // Preserve exact position
              data: {
                ...n.data,
                label: newName
              }
            }
          };
        }
        return {
          type: 'replace',
          id: n.id,
          item: n
        };
      })
    );
  }, [nodes, onNodesChange]);

  // Get selected node
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const onConnectEnd = useCallback(
    (event: any, connectionState: any) => {
      if (!connectionState.isValid) {
        const id = getId();
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode: Node = {
          id,
          type: 'custom',
          position: screenToFlowPosition({ x: clientX, y: clientY }),
          data: {
            id,
            label: 'New Node',
            icon: imgTablerIconPointer,
            accentColor: '#99c8e6'
          },
          origin: [0.5, 0.0],
        };
        onNodesChange([{ type: 'add', item: newNode }]);
        const newEdge = {
          id,
          source: connectionState.fromNode.id,
          target: id,
          style: { stroke: '#666666', strokeWidth: 2 }
        } as Edge;
        onEdgesChange([{ type: 'add', item: newEdge }]);
      }
    },
    [screenToFlowPosition, onNodesChange, onEdgesChange]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeData = event.dataTransfer.getData('nodeData');
      if (!nodeData) return;

      const parsedData = JSON.parse(nodeData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = getId();
      const newNode: Node = {
        id,
        type: 'custom',
        position,
        data: {
          id,
          label: parsedData.label,
          icon: parsedData.icon,
          accentColor: parsedData.accentColor
        },
        origin: [0.5, 0.0],
      };

      onNodesChange([{ type: 'add', item: newNode }]);
    },
    [screenToFlowPosition, onNodesChange]
  );

  return (
    <div
      className="react-flow-container"
      ref={reactFlowWrapper}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'var(--app-bg)'
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('${imgImage46}')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '16px 16px',
          opacity: 0.08,
          filter: 'var(--app-icon-invert)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Header with Velt Tools */}
      <Header />

      {/* [Velt] ReactFlow component from @xyflow/react enhanced with Velt CRDT capabilities
          - nodes, edges: Synchronized state from useVeltReactFlowCrdtExtension hook
          - onNodesChange, onEdgesChange, onConnect: Handlers that broadcast changes to all users in real-time
          - All other props (onConnectEnd, onNodeClick, etc.) work normally with the native ReactFlow component
      */}
      <ReactFlow
        style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          style: { stroke: '#666666', strokeWidth: 2 }
        }}
        fitView={false}
        nodeOrigin={nodeOrigin}
        proOptions={{ hideAttribution: true }}
      >
        {/* No Background component - using custom pattern */}
      </ReactFlow>

      {/* Bottom Toolbar */}
      <BottomToolbar />

      {/* Zoom Controls (Bottom Right) */}
      <ZoomControls 
        onZoomIn={() => zoomIn({ duration: 200 })}
        onZoomOut={() => zoomOut({ duration: 200 })}
      />

      {/* Side Panel (Top Right) */}
      {isPanelOpen && (
        <SidePanel
          selectedNode={selectedNode}
          onClose={() => setIsPanelOpen(false)}
          onUpdateNodeName={updateNodeName}
        />
      )}
    </div>
  );
}

