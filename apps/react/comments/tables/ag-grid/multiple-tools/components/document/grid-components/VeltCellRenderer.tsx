import React, { useRef, useEffect, useState } from 'react';
import { VeltCommentTool } from '@veltdev/react'; // [Velt] Component that renders a comment tool button to add comments
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (cellFormatting: Record<string, CellFormatting>) => (props: any) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Set ID on parent AG Grid cell element and add hover listeners to the cell
  useEffect(() => {
    if (cellRef.current) {
      const parentCell = cellRef.current.closest('.ag-cell');
      if (parentCell) {
        // Set the element ID
        if (parentCell.id !== cellId) {
          parentCell.id = cellId;
        }

        // Add hover listeners to the parent cell
        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        parentCell.addEventListener('mouseenter', handleMouseEnter);
        parentCell.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup listeners
        return () => {
          parentCell.removeEventListener('mouseenter', handleMouseEnter);
          parentCell.removeEventListener('mouseleave', handleMouseLeave);
        };
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
    <div
      ref={cellRef}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }}
    >
      <span style={{ ...textStyle, paddingLeft: '12px' }}>{props.value}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }}>
        {/* [Velt] VeltCommentTool renders a button that allows users to add comments to this specific cell */}
        {/* [Velt] targetElementId references the parent AG Grid cell with the ID set above */}
        {/* [Velt] Comment tool only appears on hover over the entire cell */}
        {isHovered && <VeltCommentTool targetElementId={cellId} />}
      </div>
    </div>
  );
};
