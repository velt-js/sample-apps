"use client";
import { ReactFlowProvider } from '@xyflow/react';
import { useVeltInitState } from '@veltdev/react';
import { AddNodeOnEdgeDrop } from './AddNodeOnEdgeDrop';
import { imgImage46 } from './constants';
import '@xyflow/react/dist/style.css';

export default function ReactFlowComponent() {
  // [Velt] Wait for Velt to initialize before rendering ReactFlow
  const veltInitialized = useVeltInitState();
  
  if (!veltInitialized) {
    return (
      <div
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
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );
}

