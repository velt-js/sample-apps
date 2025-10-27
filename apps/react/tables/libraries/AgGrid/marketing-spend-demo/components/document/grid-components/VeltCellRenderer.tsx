import React from 'react';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react';
import { CellFormatting, ViewType } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  viewType: ViewType
) => (props: any) => {
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // Generate comment context - this is the primary identifier for aggregation
  const commentContext = generateCommentContext(
    props.data,
    props.colDef.field,
    viewType
  );

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
    <div style={containerStyle}>
      <span style={textStyle}>{props.value}</span>
      {/* Removed targetCommentElementId - rely on context for aggregation */}
      <VeltCommentTool
        context={commentContext}
        contextOptions={{ partialMatch: true }}
      />
      <VeltCommentBubble
        context={commentContext}
        contextOptions={{ partialMatch: true }}
      />
    </div>
  );
};
