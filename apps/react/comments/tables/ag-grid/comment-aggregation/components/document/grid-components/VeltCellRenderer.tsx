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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
      <span style={{ ...textStyle, paddingLeft: '12px' }}>{props.value}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }}>
        <VeltCommentTool
          targetElementId={cellId}
          context={commentContext}
          contextOptions={{ partialMatch: true }}
        />
        <VeltCommentBubble
          context={commentContext}
          contextOptions={{ partialMatch: true }}
        />
      </div>
    </div>
  );
};
