"use client";
import { VeltCommentBubbleWireframe, VeltIf } from '@veltdev/react';

const VeltCommentBubbleWf = () => {
  return (
    <VeltCommentBubbleWireframe>
      <div 
        className="flex items-center justify-center"
        style={{
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <VeltIf condition="{commentAnnotation.comments.length} > 0">
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '18.667px',
              padding: '4.667px 8px 4.667px 6.222px',
              display: 'flex',
              alignItems: 'center',
              gap: '3.111px',
              height: '28px'
            }}
          >
            <div
              style={{
                width: '15.556px',
                height: '15.556px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '11px',
                  height: '11px',
                  border: '1.5px solid white',
                  borderRadius: '6px 6px 6px 1px'
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'Urbanist, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '1.3',
                color: 'white',
                margin: 0
              }}
            >
              <VeltCommentBubbleWireframe.CommentsCount />
            </p>
          </div>
        </VeltIf>

        <VeltIf condition="{commentAnnotation.comments.length} === 0">
          <div style={{ width: '0px', height: '0px' }} />
        </VeltIf>
      </div>
    </VeltCommentBubbleWireframe>
  );
};

export default VeltCommentBubbleWf;

