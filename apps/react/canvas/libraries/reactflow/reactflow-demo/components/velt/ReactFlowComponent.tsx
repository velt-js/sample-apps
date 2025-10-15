"use client";
import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    type Node,
    type Edge,
    type NodeProps,
    Handle,
    Position
} from '@xyflow/react';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useVeltInitState, VeltCommentBubble, VeltCommentTool } from '@veltdev/react';
import { useVeltReactFlowCrdtExtension } from '@veltdev/reactflow-crdt';
import Header from '../header/header';
import '@xyflow/react/dist/style.css';

// Local Icon URLs (from /public/icons/)
const imgImage46 = "/background-pattern.png";
const imgTablerIconHandStop = "/icons/hand-stop.svg";
const imgTablerIconArrowBackUp = "/icons/arrow-back-up.svg";
const imgTablerIconArrowBackUp1 = "/icons/arrow-redo.svg";
const imgTablerIconPlayerPlayFilled = "/icons/player-play.svg";
// Slack Message node - filled play button
const imgTablerIconPlayerPlayFilled1 = "/icons/player-play-filled.svg";
// Bandwidth Agent node - main pointer
const imgTablerIconPointer = "/icons/pointer.svg";
// OCR Agent node - alt pointer
const imgTablerIconPointer1 = "/icons/pointer.svg";
// Parser node - function icon
const imgTablerIconFunction = "/icons/function.svg";
const imgTablerIconPlus = "/icons/plus.svg";
const imgTablerIconMinus = "/icons/minus.svg";
const imgTablerIconTrash = "/icons/trash.svg";

const getId = () => crypto.randomUUID();

// Type for node data
type CustomNodeData = {
    id?: string;
    label: string;
    icon: string;
    accentColor: string;
    showBadge?: boolean;
    badgeCount?: number;
    selected?: boolean;
}

// Custom Node Component matching Figma design
function CustomNode({ data }: NodeProps) {
    const { label, icon, accentColor, selected } = data as CustomNodeData;
    const nodeId = (data as CustomNodeData).id || 'unknown';

    return (
        <div
            id={nodeId}
            data-id={nodeId}
            style={{
                background: '#1d1d1d',
                borderRadius: '17.75px',
                padding: '0',
                width: 'max-content',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                gap: '9.6px',
                paddingLeft: '7.5px',
                paddingRight: '15px',
                position: 'relative',
                border: '2px solid transparent',
                borderColor: selected ? '#046ded' : 'transparent',
                boxSizing: 'border-box'
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#666666', border: 'none', width: '8px', height: '8px' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#666666', border: 'none', width: '8px', height: '8px' }}
            />

            {/* Icon container */}
            <div
                style={{
                    background: accentColor || '#99e6d0',
                    borderRadius: '11.25px',
                    padding: '7.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '37.14px',
                    height: '37.14px',
                    flexShrink: 0
                }}
            >
                <img
                    src={icon}
                    alt=""
                    style={{
                        width: '22.14px',
                        height: '22.14px',
                        display: 'block'
                    }}
                />
            </div>

            {/* Label */}
            <p
                data-velt-target-comment-element-id={nodeId}
                style={{
                    fontFamily: 'Urbanist, sans-serif',
                    fontWeight: 400,
                    fontSize: '20.625px',
                    lineHeight: '1.3',
                    color: 'white',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {label}
            </p>

            {/* Comment Actions - inline with node content */}
            <div
                style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingLeft: '12px',
                    flexShrink: 0
                }}
            >
                <VeltCommentBubble targetElementId={nodeId} />
                <VeltCommentTool targetElementId={nodeId} />
            </div>
        </div>
    );
}

// Simple Node Component (for Slack Message)
function SimpleNode({ data }: NodeProps) {
    const { label, icon, accentColor, selected } = data as CustomNodeData;
    const nodeId = (data as CustomNodeData).id || 'unknown';

    return (
        <div
            id={nodeId}
            data-id={nodeId}
            style={{
                background: '#1d1d1d',
                borderRadius: '17.75px',
                height: '48px',
                width: 'max-content',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                paddingLeft: '5.95px',
                paddingRight: '15px',
                gap: '9.6px',
                border: '2px solid transparent',
                borderColor: selected ? '#046ded' : 'transparent',
                boxSizing: 'border-box'
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#666666', border: 'none', width: '8px', height: '8px' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#666666', border: 'none', width: '8px', height: '8px' }}
            />

            {/* Icon */}
            <div
                style={{
                    background: accentColor || '#99e6d0',
                    borderRadius: '11.25px',
                    padding: '7.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '37.14px',
                    height: '37.14px',
                    flexShrink: 0
                }}
            >
                <img
                    src={icon}
                    alt=""
                    style={{
                        width: '22.5px',
                        height: '22.5px',
                        display: 'block'
                    }}
                />
            </div>

            {/* Label */}
            <p
                data-velt-target-comment-element-id={nodeId}
                style={{
                    fontFamily: 'Urbanist, sans-serif',
                    fontWeight: 400,
                    fontSize: '20.625px',
                    lineHeight: '1.3',
                    color: 'white',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {label}
            </p>

            {/* Comment Actions - inline with node content */}
            <div
                style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingLeft: '12px',
                    flexShrink: 0
                }}
            >
                <VeltCommentBubble targetElementId={nodeId} />
                <VeltCommentTool targetElementId={nodeId} />
            </div>
        </div>
    );
}

// Node types
const nodeTypes = {
    custom: CustomNode,
    simple: SimpleNode
};

const step1Id = getId();
const step2Id = getId();
const step3Id = getId();
const step4Id = getId();

const initialNodes: Node[] = [
    {
        id: step1Id,
        type: 'simple',
        data: {
            id: step1Id,
            label: 'Slack Message',
            icon: imgTablerIconPlayerPlayFilled1,
            accentColor: '#99e6d0'
        },
        position: { x: 200, y: 240 },
    },
    {
        id: step2Id,
        type: 'custom',
        data: {
            id: step2Id,
            label: 'Parser',
            icon: imgTablerIconFunction,
            accentColor: '#f7c44e',
            showBadge: false,
            badgeCount: 0,
            selected: true
        },
        position: { x: 450, y: 200 },
    },
    {
        id: step3Id,
        type: 'custom',
        data: {
            id: step3Id,
            label: 'Bandwidth Agent',
            icon: imgTablerIconPointer,
            accentColor: '#99c8e6'
        },
        position: { x: 700, y: 280 },
    },
    {
        id: step4Id,
        type: 'custom',
        data: {
            id: step4Id,
            label: 'OCR Agent',
            icon: imgTablerIconPointer1,
            accentColor: '#99c8e6'
        },
        position: { x: 700, y: 390 },
    },
];

const initialEdges: Edge[] = [
    {
        id: 'e-step1-step2',
        source: step1Id,
        target: step2Id,
        style: { stroke: '#666666', strokeWidth: 2 }
    },
    {
        id: 'e-step2-step3',
        source: step2Id,
        target: step3Id,
        style: { stroke: '#666666', strokeWidth: 2 }
    },
    {
        id: 'e-step2-step4',
        source: step2Id,
        target: step4Id,
        style: { stroke: '#666666', strokeWidth: 2 }
    },
];

const nodeOrigin: [number, number] = [0, 0];

function AddNodeOnEdgeDrop() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
        editorId: 'react-flow-crdt-2025-10-10',
        initialEdges,
        initialNodes,
    });

    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const { screenToFlowPosition, setViewport, fitView, zoomIn, zoomOut } = useReactFlow();
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(step2Id);
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
    const veltInitialized = useVeltInitState();

    // Center nodes on initial load
    useEffect(() => {
        // Small delay to ensure nodes are rendered
        const timer = setTimeout(() => {
            fitView({ padding: 0.2, duration: 400 });
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
                background: '#000000'
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
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* Header with Velt Tools */}
            <Header />

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
            >
                {/* No Background component - using custom pattern */}
            </ReactFlow>

            {/* Bottom Toolbar */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#121212',
                    borderRadius: '32px',
                    padding: '4px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    zIndex: 5
                }}
            >
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '32px'
                    }}
                >
                    <img src={imgTablerIconHandStop} alt="Hand" style={{ width: '20px', height: '20px' }} />
                </button>
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '32px'
                    }}
                >
                    <img src={imgTablerIconArrowBackUp} alt="Undo" style={{ width: '20px', height: '20px' }} />
                </button>
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '32px'
                    }}
                >
                    <img src={imgTablerIconArrowBackUp1} alt="Redo" style={{ width: '20px', height: '20px' }} />
                </button>
                <button
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: 'none',
                        padding: '8px 12px 8px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '32px'
                    }}
                >
                    <img src={imgTablerIconPlayerPlayFilled} alt="Play" style={{ width: '20px', height: '20px' }} />
                    <span
                        style={{
                            fontFamily: 'Urbanist, sans-serif',
                            fontWeight: 700,
                            fontSize: '14px',
                            color: 'white',
                            letterSpacing: '-0.56px'
                        }}
                    >
                        Preview
                    </span>
                </button>
            </div>

            {/* Zoom Controls (Bottom Right) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '9.22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 5
                }}
            >
                <button
                    style={{
                        background: '#141414',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '32px'
                    }}
                    onClick={() => zoomIn({ duration: 200 })}
                >
                    <img src={imgTablerIconPlus} alt="Zoom In" style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                    style={{
                        background: '#141414',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '32px'
                    }}
                    onClick={() => zoomOut({ duration: 200 })}
                >
                    <img src={imgTablerIconMinus} alt="Zoom Out" style={{ width: '16px', height: '16px' }} />
                </button>
            </div>

            {/* Side Panel (Top Right) */}
            {isPanelOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '48px',
                        right: '20px',
                        width: '295px',
                        background: '#131313',
                        borderRadius: '20px',
                        padding: '20px',
                        boxShadow: '0px -24px 100px 0px rgba(0, 0, 0, 0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        zIndex: 5
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <p
                                style={{
                                    fontFamily: 'Urbanist, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    lineHeight: '1.3',
                                    color: 'white',
                                    margin: 0
                                }}
                            >
                                Functions
                            </p>
                            <p
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '1.3',
                                    color: 'white',
                                    opacity: 0.52,
                                    margin: 0
                                }}
                            >
                                Run JS functions using data
                            </p>
                        </div>
                        <button
                            onClick={() => setIsPanelOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img src={imgTablerIconTrash} alt="Close" style={{ width: '16px', height: '16px' }} />
                        </button>
                    </div>

                {/* Name Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '1.3',
                            color: 'white',
                            opacity: 0.52,
                            margin: 0
                        }}
                    >
                        Name
                    </p>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid #f7c44e',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            type="text"
                            value={(selectedNode?.data?.label as string) || ''}
                            onChange={(e) => {
                                if (selectedNodeId) {
                                    updateNodeName(selectedNodeId, e.target.value);
                                }
                            }}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '1.3',
                                color: 'white',
                                margin: 0,
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* JS Code Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <p
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '1.3',
                                color: 'white',
                                opacity: 0.52,
                                margin: 0
                            }}
                        >
                            JS Code
                        </p>
                        <p
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '1.3',
                                color: 'white',
                                opacity: 0.32,
                                margin: 0
                            }}
                        >
                            Available variables: $value$
                        </p>
                    </div>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '4px 8px',
                            height: '91px',
                            display: 'flex',
                            gap: '10px',
                            fontFamily: 'Fira Code, monospace',
                            fontSize: '12px',
                            color: 'white'
                        }}
                    >
                        <div
                            style={{
                                lineHeight: '1.9',
                                opacity: 0.32,
                                whiteSpace: 'pre'
                            }}
                        >
                            01{'\n'}02
                        </div>
                        <div style={{ flex: 1, lineHeight: '1.9' }}>
                            <div>
                                console.<span style={{ color: '#ffb330' }}>log</span>(<span style={{ color: '#239ada' }}>$value$</span>)
                            </div>
                            <div>
                                <span style={{ color: '#ff7830' }}>return</span> <span style={{ color: '#239ada' }}>$value$</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}

export default function ReactFlowComponent() {
    const veltInitialized = useVeltInitState();
    if (!veltInitialized)
        return <div
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
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    return (
        <ReactFlowProvider>
            <AddNodeOnEdgeDrop />
        </ReactFlowProvider>
    );
}
