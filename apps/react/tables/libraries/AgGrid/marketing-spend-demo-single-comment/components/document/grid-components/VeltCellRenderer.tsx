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

  // Set ID and location ID on parent AG Grid cell element and add comment tool
  React.useEffect(() => {
    if (props.eGridCell) {
      // Set both the element ID and the Velt location ID
      // The location ID is stable and based on data row, not DOM position
      props.eGridCell.id = cellId;
      props.eGridCell.setAttribute('data-velt-location-id', locationId);

      // Check if comment tool already exists
      let commentTool = props.eGridCell.querySelector('velt-comment-tool');
      if (!commentTool) {
        // Create and append comment tool directly to cell
        commentTool = document.createElement('velt-comment-tool');
        commentTool.setAttribute('target-comment-element-id', cellId);
        commentTool.style.cssText = 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 1;';

        // Append to cell (outside ag-cell-wrapper)
        props.eGridCell.appendChild(commentTool);
      } else {
        // Update target-comment-element-id when cell is recycled
        commentTool.setAttribute('target-comment-element-id', cellId);
      }
    }

    return () => {
      // Cleanup: remove comment tool and location ID when cell data changes
      if (props.eGridCell) {
        const commentTool = props.eGridCell.querySelector('velt-comment-tool');
        if (commentTool) {
          commentTool.remove();
        }
        // Note: We don't remove the location ID here because AG Grid might
        // recycle this cell immediately for another row, and we want to avoid
        // any timing issues where Velt might see the cell without a location ID
      }
    };
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
