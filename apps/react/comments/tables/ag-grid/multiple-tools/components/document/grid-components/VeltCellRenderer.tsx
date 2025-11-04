import React from 'react';
import { VeltCommentTool} from '@veltdev/react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (cellFormatting: Record<string, CellFormatting>) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Set ID on the AG Grid cell element so VeltCommentTool can target it
  // Using useLayoutEffect for reliable DOM manipulation in both dev and production
  React.useLayoutEffect(() => {
    if (props.eGridCell) {
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

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
      <span style={{ ...textStyle, paddingLeft: '12px' }}>{props.value}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }}>
        <VeltCommentTool targetElementId={cellId} />
      </div>
    </div>
  );
};
