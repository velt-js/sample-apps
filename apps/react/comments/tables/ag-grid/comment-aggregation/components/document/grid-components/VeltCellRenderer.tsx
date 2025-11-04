import React, { useRef, useEffect } from 'react';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react';
import { CellFormatting, ViewType } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  viewType: ViewType
) => (props: any) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Generate comment context - this is the primary identifier for aggregation
  const commentContext = generateCommentContext(
    props.data,
    props.colDef.field,
    viewType
  );

  // [Velt] Set ID on parent AG Grid cell element
  useEffect(() => {
    if (props.eGridCell && props.eGridCell.id !== cellId) {
      props.eGridCell.id = cellId;
    }
  }, [cellId, props.eGridCell]);

  const textStyle: React.CSSProperties = {
    fontWeight: formatting.bold ? 'bold' : 'normal',
    fontStyle: formatting.italic ? 'italic' : 'normal',
    textDecoration: [
      formatting.underline ? 'underline' : '',
      formatting.strikethrough ? 'line-through' : '',
    ].filter(Boolean).join(' ') || 'none',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    padding: '4px 12px 4px 12px',
    textAlign: formatting.align || 'left',
    position: 'relative',
  };

  return (
    <div ref={cellRef} style={containerStyle}>
      <span style={textStyle}>{props.value}</span>

      {/* [Velt] Comment Tool - will show on hover when no comments exist */}
      <VeltCommentTool
        targetElementId={cellId}
        context={commentContext}
        contextOptions={{ partialMatch: true }}
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      />

      {/* [Velt] Comment Bubble - will show when comments exist */}
      <VeltCommentBubble
        context={commentContext}
        contextOptions={{ partialMatch: true }}
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
};
