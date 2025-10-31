import React from 'react';
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

  // [Velt] Set ID and attributes on parent AG Grid cell element
  React.useEffect(() => {
    if (props.eGridCell) {
      // [Velt] Set the element ID
      props.eGridCell.id = cellId;
      // [Velt] For single-tool pattern: add data-velt-target-comment-element-id
      // This allows the single comment tool to attach comments to this specific cell
      // Both id and data-velt-target-comment-element-id must have the same value
      props.eGridCell.setAttribute('data-velt-target-comment-element-id', cellId);
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
  };

  return (
    <div style={containerStyle}>
      <span style={textStyle}>{props.value}</span>
    </div>
  );
  };

  VeltCellRenderer.displayName = 'VeltCellRenderer';
  return VeltCellRenderer;
};
