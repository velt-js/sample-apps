import React from 'react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>
) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Set ID and target attributes on AG Grid cell element for click-to-target comments
  // Using direct assignment instead of useEffect to avoid re-render issues
  if (props.eGridCell) {
    if (props.eGridCell.id !== cellId) {
      props.eGridCell.id = cellId;
    }
    // [Velt] For single-tool pattern with click-to-target: both id and data-velt-target-comment-element-id must match
    // This allows users to click the comment tool and then click any cell to add a comment
    if (props.eGridCell.getAttribute('data-velt-target-comment-element-id') !== cellId) {
      props.eGridCell.setAttribute('data-velt-target-comment-element-id', cellId);
    }
  }

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
    </div>
  );
};
