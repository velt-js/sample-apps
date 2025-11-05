import React, { useRef, useEffect } from 'react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils'; // [Velt] Utility function to generate unique keys for cell-level formatting

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  documentId: string | null
) => {
  const VeltCellRenderer = (props: any) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Set ID and target attributes on parent AG Grid cell element for click-to-target comments
  useEffect(() => {
    if (cellRef.current) {
      const parentCell = cellRef.current.closest('.ag-cell');
      if (parentCell) {
        // [Velt] Set the element ID
        parentCell.id = cellId;
        // [Velt] For single-tool pattern with click-to-target: both id and data-velt-target-comment-element-id must match
        // This allows users to click the comment tool and then click any cell to add a comment
        parentCell.setAttribute('data-velt-target-comment-element-id', cellId);
      }
    }
  }, [cellId]);

  const textStyle: React.CSSProperties = {
    fontWeight: formatting.bold ? 'bold' : 'normal',
    fontStyle: formatting.italic ? 'italic' : 'normal',
    textDecoration: [
      formatting.underline ? 'underline' : '',
      formatting.strikethrough ? 'line-through' : '',
    ].filter(Boolean).join(' ') || 'none',
  };

  return (
    <div ref={cellRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}>
      <span style={{ ...textStyle, paddingLeft: '12px' }}>{props.value}</span>
    </div>
  );
  };

  VeltCellRenderer.displayName = 'VeltCellRenderer';
  return VeltCellRenderer;
};
