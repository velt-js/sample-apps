import React from 'react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  documentId: string
) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  // Create a stable location ID based on logical data row, not DOM position
  const locationId = `${documentId}-row-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // Set ID and location ID on parent AG Grid cell element
  React.useEffect(() => {
    if (props.eGridCell) {
      // Set both the element ID and the Velt location ID
      // The location ID is stable and based on data row, not DOM position
      props.eGridCell.id = cellId;
      props.eGridCell.setAttribute('data-velt-location-id', locationId);
    }
  }, [cellId, locationId, props.eGridCell]);

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
