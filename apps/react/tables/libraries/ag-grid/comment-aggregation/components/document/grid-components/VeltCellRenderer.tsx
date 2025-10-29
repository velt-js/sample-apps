import React from 'react';
import { CellFormatting, ViewType } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  viewType: ViewType
) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Generate comment context - this is the primary identifier for aggregation
  const commentContext = generateCommentContext(
    props.data,
    props.colDef.field,
    viewType
  );

  // [Velt] Set ID on parent AG Grid cell element and add comment tool + bubble
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
        commentTool.setAttribute('context', JSON.stringify(commentContext));
        commentTool.setAttribute('context-options', JSON.stringify({ partialMatch: true }));
        commentTool.style.cssText = 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 1;';

        // Append to cell (outside ag-cell-wrapper)
        props.eGridCell.appendChild(commentTool);
      } else {
        // [Velt] Update context if it changed
        commentTool.setAttribute('context', JSON.stringify(commentContext));
      }

      // [Velt] Check if comment bubble already exists
      let commentBubble = props.eGridCell.querySelector('velt-comment-bubble');
      if (!commentBubble) {
        // [Velt] Create and append comment bubble directly to cell
        commentBubble = document.createElement('velt-comment-bubble');
        commentBubble.setAttribute('context', JSON.stringify(commentContext));
        commentBubble.setAttribute('context-options', JSON.stringify({ partialMatch: true }));
        commentBubble.setAttribute('type', 'popover');
        commentBubble.style.cssText = 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 2; pointer-events: auto;';

        // Append to cell (outside ag-cell-wrapper)
        props.eGridCell.appendChild(commentBubble);
      } else {
        // [Velt] Update context if it changed
        commentBubble.setAttribute('context', JSON.stringify(commentContext));
      }
    }

    return () => {
      // [Velt] Cleanup: remove comment tool and bubble when cell is destroyed
      if (props.eGridCell) {
        const commentTool = props.eGridCell.querySelector('velt-comment-tool');
        if (commentTool) {
          commentTool.remove();
        }
        const commentBubble = props.eGridCell.querySelector('velt-comment-bubble');
        if (commentBubble) {
          commentBubble.remove();
        }
      }
    };
  }, [cellId, props.eGridCell, commentContext]);

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
