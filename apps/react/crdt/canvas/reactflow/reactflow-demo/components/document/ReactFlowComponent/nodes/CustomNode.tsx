import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { VeltCommentBubble, VeltCommentTool } from '@veltdev/react';
import type { CustomNodeData } from '../types';

// Custom Node Component matching Figma design
export function CustomNode({ data }: NodeProps) {
  const { label, icon, accentColor, selected } = data as CustomNodeData;
  const nodeId = (data as CustomNodeData).id || 'unknown';

  return (
    <div
      id={nodeId}
      data-id={nodeId}
      style={{
        background: 'var(--app-node-bg)',
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
        style={{
          fontFamily: 'Urbanist, sans-serif',
          fontWeight: 400,
          fontSize: '20.625px',
          lineHeight: '1.3',
          color: 'var(--app-text-primary)',
          margin: 0,
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 1
        }}
      >
        {label}
      </p>

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

