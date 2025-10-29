"use client";
import { VeltCommentBubbleWireframe, VeltIf } from '@veltdev/react'; // [Velt]

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
        {/* [Velt] Only show bubble when there are comments */}
        <VeltIf condition="{commentAnnotation.comments.length} > 0">
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
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
                  border: '1.5px solid white',
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
                color: 'white',
                margin: 0,
                whiteSpace: 'pre',
                flexShrink: 0
              }}
            >
              {/* [Velt] Display comment count */}
              <VeltCommentBubbleWireframe.CommentsCount />
            </p>
          </div>
        </VeltIf>

        <VeltIf condition="{commentAnnotation.comments.length} === 0">
          <div style={{ width: '0px', height: '0px', flexShrink: 0 }} />
        </VeltIf>
      </div>
    </VeltCommentBubbleWireframe>
  );
};

export default VeltCommentBubbleWf;
