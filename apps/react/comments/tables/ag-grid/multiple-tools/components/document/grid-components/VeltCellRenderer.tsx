import React from 'react';
import { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

export const createVeltCellRenderer = (cellFormatting: Record<string, CellFormatting>) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Set ID on parent AG Grid cell element and add comment tool
  React.useEffect(() => {
    if (props.eGridCell) {
      if (props.eGridCell.id !== cellId) {
        props.eGridCell.id = cellId;
      }

      // [Velt] Check if comment tool already exists
      let commentTool = props.eGridCell.querySelector('velt-comment-tool');
      if (!commentTool) {
        // [Velt] Create and append comment tool directly to cell
        commentTool = document.createElement('velt-comment-tool');
        commentTool.setAttribute('target-comment-element-id', cellId);
        commentTool.style.cssText = 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 1;';

        // Append to cell (outside ag-cell-wrapper)
        props.eGridCell.appendChild(commentTool);
      } else {
        // [Velt] Update target-comment-element-id if it changed
        if (commentTool.getAttribute('target-comment-element-id') !== cellId) {
          commentTool.setAttribute('target-comment-element-id', cellId);
        }
      }
    }

    return () => {
      // [Velt] Cleanup: remove comment tool when cell is destroyed
      if (props.eGridCell) {
        const commentTool = props.eGridCell.querySelector('velt-comment-tool');
        if (commentTool) {
          commentTool.remove();
        }
      }
    };
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
