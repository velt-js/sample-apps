import React from 'react';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  documentId: string | null
) => {
  const VeltCellRenderer = (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

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
        <VeltCommentTool targetElementId={cellId} />
        <VeltCommentBubble targetElementId={cellId} />
      </div>
    </div>
  );
  };

  VeltCellRenderer.displayName = 'VeltCellRenderer';
  return VeltCellRenderer;
};
