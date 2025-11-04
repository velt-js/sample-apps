import React from 'react';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react';
import { CellFormatting, ViewType } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  viewType: ViewType
) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};
  const commentContext = generateCommentContext(props.data, props.colDef.field, viewType);

  const textStyle: React.CSSProperties = {
    fontWeight: formatting.bold ? 'bold' : 'normal',
    fontStyle: formatting.italic ? 'italic' : 'normal',
    textDecoration: [
      formatting.underline ? 'underline' : '',
      formatting.strikethrough ? 'line-through' : '',
    ].filter(Boolean).join(' ') || 'none',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', padding: '0px 0px', position: 'relative' }}>
      <span style={textStyle}>{props.value}</span>
      <VeltCommentTool
        targetElementId={cellId}
        context={commentContext}
        contextOptions={{ partialMatch: true }}
        style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
      />
      <VeltCommentBubble
        context={commentContext}
        contextOptions={{ partialMatch: true }}
        style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, pointerEvents: 'auto' }}
      />
    </div>
  );
};
