"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    type Node,
    type Edge,
    type NodeTypes
} from '@xyflow/react';
import { useVeltInitState } from '@veltdev/react';
import { veltReactFlowStore } from '@veltdev/reactflow-crdt';
import '@xyflow/react/dist/style.css';
// Use existing custom nodes so sidebar DnD works
import { BasicNode } from '@/components/document/components/basic-node';
import { CircleNode } from '@/components/document/components/circle-node';
import { DiamondNode } from '@/components/document/components/diamond-node';

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
const nodeTypes = {
    basic: BasicNode as any,
    circle: CircleNode as any,
    diamond: DiamondNode as any,
} as unknown as NodeTypes;

type ReactFlowComponentProps = {
    activeTool?: string;
};

function AddNodeOnEdgeDrop({ activeTool = 'select' }: ReactFlowComponentProps) {
    const storeRef = useRef<ReturnType<typeof veltReactFlowStore> | null>(null);
    if (!storeRef.current) {
        storeRef.current = veltReactFlowStore({
            editorId: 'react-flow-crdt-2025-09-19-v2',
            initialEdges,
            initialNodes,
        });
    }
    const useFlowStore = storeRef.current;

    const nodes = useFlowStore((s) => s.nodes);
    const edges = useFlowStore((s) => s.edges);
    const onNodesChange = useFlowStore((s) => s.onNodesChange);
    const onEdgesChange = useFlowStore((s) => s.onEdgesChange);
    const onConnect = useFlowStore((s) => s.onConnect);
    const setNodes = useFlowStore((s) => s.setNodes);
    const setEdges = useFlowStore((s) => s.setEdges);

    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const { screenToFlowPosition, zoomIn, zoomOut, fitView } = useReactFlow();

    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Persist and hydrate flow state per document id
    const storageKey = React.useMemo(() => {
        const anyWindow = typeof window !== 'undefined' ? (window as any) : undefined;
        const getDocument = anyWindow?.__VELT__?.getDocument;
        const doc = typeof getDocument === 'function' ? getDocument() : undefined;
        const documentId = doc?.documentId || 'general-document-1';
        return `flowchart-data-${documentId}`;
    }, []);

    useEffect(() => {
        try {
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null;
            if (raw) {
                const parsed = JSON.parse(raw) as { nodes?: Node[]; edges?: Edge[] };
                if (Array.isArray(parsed.nodes)) setNodes(parsed.nodes as Node[]);
                if (Array.isArray(parsed.edges)) setEdges(parsed.edges as Edge[]);
            }
        } catch {}
        setIsHydrated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    useEffect(() => {
        if (!isHydrated) return;
        try {
            if (typeof window !== 'undefined') {
                const dataStr = JSON.stringify({ nodes, edges });
                window.localStorage.setItem(storageKey, dataStr);
            }
        } catch {}
    }, [nodes, edges, storageKey, isHydrated]);

    // If nothing persisted and store is empty after hydration, seed initial graph
    useEffect(() => {
        if (!isHydrated) return;
        const hasGraph = Array.isArray(nodes) && nodes.length > 0;
        if (!hasGraph) {
            setNodes(initialNodes);
            setEdges(initialEdges);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated]);

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
                setNodes([...nodes, newNode]);
                const newEdge = { id, source: connectionState.fromNode.id, target: id } as Edge;
                setEdges([...edges, newEdge]);
            }
        },
        [screenToFlowPosition, nodes, edges, setNodes, setEdges]
    );

    // Expose toolbar/sidebar actions on window for existing UI
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).flowZoomIn = () => zoomIn();
            (window as any).flowZoomOut = () => zoomOut();
            (window as any).flowFitView = () => fitView();

            (window as any).flowDeleteSelected = () => {
                if (selectedNodes.length > 0) {
                    setNodes(nodes.filter((n) => !selectedNodes.includes(n.id)));
                    setEdges(
                        edges.filter(
                            (e) => !selectedNodes.includes(e.source) && !selectedNodes.includes(e.target)
                        )
                    );
                }
            };

            (window as any).flowCopySelected = () => {
                if (selectedNodes.length > 0) {
                    const nodesToCopy = nodes.filter((n) => selectedNodes.includes(n.id));
                    const copiedNodes = nodesToCopy.map((n) => ({
                        ...n,
                        id: getId(),
                        position: { x: n.position.x + 50, y: n.position.y + 50 },
                        selected: false,
                    }));
                    setNodes([...nodes, ...copiedNodes]);
                }
            };

            (window as any).flowAddNode = () => {
                const anyWindow = window as any;
                const selectedType: string | undefined = anyWindow.flowSelectedNodeType;
                if (selectedNodes.length > 0) {
                    const base = nodes.find((n) => n.id === selectedNodes[0]);
                    const offset = 120;
                    const newNode: Node = {
                        id: getId(),
                        type: (selectedType as string) || (base?.type as string) || 'basic',
                        position: base
                            ? { x: base.position.x + offset, y: base.position.y }
                            : { x: 100, y: 100 },
                        data: { label: 'New node' },
                    };
                    setNodes([...nodes, newNode]);
                    // Optionally connect from base to new node
                    if (base) {
                        const newEdge: Edge = { id: getId(), source: base.id, target: newNode.id } as Edge;
                        setEdges([...edges, newEdge]);
                    }
                } else {
                    // No selection -> drop a node at a default spot
                    const newNode: Node = {
                        id: getId(),
                        type: (selectedType as string) || 'basic',
                        position: { x: 100, y: 100 },
                        data: { label: 'New node' },
                    };
                    setNodes([...nodes, newNode]);
                }
            };

            (window as any).flowSave = () => {
                const flowData = { nodes, edges };
                localStorage.setItem('flowchart-data', JSON.stringify(flowData));
                console.log('[v0] Flowchart saved to localStorage');
            };

            (window as any).flowExport = () => {
                const flowData = { nodes, edges };
                const dataStr = JSON.stringify(flowData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'flowchart.json';
                link.click();
                URL.revokeObjectURL(url);
            };

            (window as any).flowShare = async () => {
                const flowData = { nodes, edges };
                const dataStr = JSON.stringify(flowData, null, 2);
                if (navigator.share && (navigator as any).canShare) {
                    try {
                        await navigator.share({
                            title: 'My Flowchart',
                            text: 'Check out this flowchart I created',
                            files: [new File([dataStr], 'flowchart.json', { type: 'application/json' })],
                        });
                        console.log('[v0] Flowchart shared successfully');
                        return;
                    } catch (e) {
                        console.log('[v0] Web Share API failed, falling back to clipboard');
                    }
                }
                try {
                    await navigator.clipboard.writeText(dataStr);
                    console.log('[v0] Flowchart data copied to clipboard');
                } catch (clipboardError) {
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'flowchart-share.json';
                    link.click();
                    URL.revokeObjectURL(url);
                }
            };
        }
    }, [zoomIn, zoomOut, fitView, nodes, edges, selectedNodes, setNodes, setEdges]);

    const onSelectionChange = useCallback(({ nodes: nextNodes }: { nodes: Node[] }) => {
        setSelectedNodes(nextNodes.map((n) => n.id));
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) return;
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const nodeTypeMap: Record<string, string> = {
                rectangle: 'basic',
                circle: 'circle',
                diamond: 'diamond',
            };
            const newNode: Node = {
                id: getId(),
                type: nodeTypeMap[type] || 'basic',
                position,
                data: { label: `${type} node` },
            };
            setNodes([...nodes, newNode]);
        },
        [screenToFlowPosition, nodes, setNodes]
    );

    return (
        <div
            className="react-flow-container"
            ref={reactFlowWrapper}
            style={{ width: '100%', height: '100%' }}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <ReactFlow
                style={{ backgroundColor: '#F7F9FB' }}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                onSelectionChange={onSelectionChange}
                fitView
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={nodeOrigin}
                nodeTypes={nodeTypes}
                nodesDraggable={true}
                nodesConnectable={activeTool === 'select'}
                elementsSelectable={true}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default function ReactFlowComponent(props: ReactFlowComponentProps) {
    const veltInitialized = useVeltInitState();
    if (!veltInitialized) return <div>Loading...</div>;
    return (
        <ReactFlowProvider>
            <AddNodeOnEdgeDrop {...props} />
        </ReactFlowProvider>
    );
}
