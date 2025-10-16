import type { Node } from '@xyflow/react';
import { imgTablerIconTrash } from '../constants';

type SidePanelProps = {
  selectedNode: Node | undefined;
  onClose: () => void;
  onUpdateNodeName: (nodeId: string, newName: string) => void;
}

export function SidePanel({ selectedNode, onClose, onUpdateNodeName }: SidePanelProps) {
  if (!selectedNode) return null;

  return (
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
          onClick={onClose}
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
              if (selectedNode?.id) {
                onUpdateNodeName(selectedNode.id, e.target.value);
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
  );
}

