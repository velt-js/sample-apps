"use client";
import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    type Node,
    type Edge
} from '@xyflow/react';
import { useCallback, useRef } from 'react';
import { useVeltInitState } from '@veltdev/react';
import { useVeltReactFlowCrdtExtension } from '@veltdev/reactflow-crdt';
import '@xyflow/react/dist/style.css';

const getId = () => crypto.randomUUID();

const step1Id = getId();
const step2Id = getId();
const step3Id = getId();
const step4Id = getId();

const initialNodes: Node[] = [
    {
        id: step1Id,
        data: { label: 'Step 1 (start)' },
        position: { x: 0, y: 50 },
    },
    {
        id: step2Id,
        data: { label: 'Step 2' },
        position: { x: 200, y: 50 },
    },
    {
        id: step3Id,
        data: { label: 'Step 3' },
        position: { x: 400, y: 50 },
    },
    {
        id: step4Id,
        type: 'output',
        data: { label: 'Step 4 (end)' },
        position: { x: 600, y: 50 },
    },
];
const initialEdges: Edge[] = [
    { id: 'e-step1-step2', source: step1Id, target: step2Id },
    { id: 'e-step2-step3', source: step2Id, target: step3Id },
    { id: 'e-step3-step4', source: step3Id, target: step4Id },
];

const nodeOrigin: [number, number] = [0.5, 0];

function AddNodeOnEdgeDrop() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
        editorId: 'react-flow-crdt-2025-09-19-v2',
        initialEdges,
        initialNodes,
    });

    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const { screenToFlowPosition } = useReactFlow();

    const onConnectEnd = useCallback(
        (event: any, connectionState: any) => {
            if (!connectionState.isValid) {
                const id = getId();
                const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
                const newNode: Node = {
                    id,
                    position: screenToFlowPosition({ x: clientX, y: clientY }),
                    data: { label: 'Node ' + id },
                    origin: [0.5, 0.0],
                };
                onNodesChange([{ type: 'add', item: newNode }]);
                const newEdge = { id, source: connectionState.fromNode.id, target: id } as Edge;
                onEdgesChange([{ type: 'add', item: newEdge }]);
            }
        },
        [screenToFlowPosition, onNodesChange, onEdgesChange]
    );

    return (
        <div
            className="react-flow-container"
            ref={reactFlowWrapper}
            style={{ width: '100%', height: '100%' }}
        >
            <ReactFlow
                style={{ backgroundColor: '#F7F9FB' }}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                fitView
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={nodeOrigin}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default function ReactFlowComponent() {
    const veltInitialized = useVeltInitState();
    if (!veltInitialized) return <div>Loading...</div>;
    return (
        <ReactFlowProvider>
            <AddNodeOnEdgeDrop />
        </ReactFlowProvider>
    );
}
