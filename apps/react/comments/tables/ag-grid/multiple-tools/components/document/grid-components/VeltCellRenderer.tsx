import React from 'react';
import { VeltCommentTool } from '@veltdev/react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (cellFormatting: Record<string, CellFormatting>) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Set ID on the AG Grid cell element itself (not the inner div)
  React.useEffect(() => {
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
    paddingLeft: '12px',
  };

  return (
    <>
      <span style={textStyle}>{props.value}</span>
      {/* [Velt] VeltCommentTool renders a button that allows users to add comments to the AG Grid cell */}
      {/* [Velt] Positioned absolutely via CSS in ui-customization/styles.css */}
      <VeltCommentTool targetCommentElementId={cellId} />
    </>
  );
};
