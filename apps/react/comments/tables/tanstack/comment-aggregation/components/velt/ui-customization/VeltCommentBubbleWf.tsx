"use client";
import { VeltCommentBubbleWireframe, VeltIf } from '@veltdev/react';

const VeltCommentBubbleWf = () => {
  return (
    // [Velt] Custom wireframe for comment bubble UI
    <VeltCommentBubbleWireframe>
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              background: 'var(--app-toggle-active-bg)',
              borderRadius: '18.667px',
              padding: '4.667px 8px 4.667px 6.222px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3.111px',
              height: '28px',
              flexShrink: 0,
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                width: '15.556px',
                height: '15.556px',
                position: 'relative',
                overflow: 'clip',
                flexShrink: 0
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(50% + 0.492px)',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '11px',
                  height: '11px',
                  border: '1.5px solid var(--app-text-primary)',
                  borderRadius: '6px 6px 6px 1px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'Urbanist, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '1.3',
                color: 'var(--app-text-primary)',
                margin: 0,
                whiteSpace: 'pre',
                flexShrink: 0
              }}
            >
              <VeltCommentBubbleWireframe.CommentsCount />
            </p>
          </div>
        </div>
    </VeltCommentBubbleWireframe>
  );
};

export default VeltCommentBubbleWf;
