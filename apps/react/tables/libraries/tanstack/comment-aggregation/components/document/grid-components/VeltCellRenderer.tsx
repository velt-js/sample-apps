import React, { useRef, useEffect } from 'react';
import { CellFormatting, ViewType, TableData } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils';

interface VeltCellRendererProps {
  data: TableData;
  value: any;
  columnId: string;
  cellFormatting: Record<string, CellFormatting>;
  viewType: ViewType;
  onCellClick: () => void;
}

export const VeltCellRenderer: React.FC<VeltCellRendererProps> = ({
  data,
  value,
  columnId,
  cellFormatting,
  viewType,
  onCellClick,
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const cellId = `cell-${data.id}-${columnId}`;
  const cellKey = getCellFormattingKey(data.id, columnId);
  const formatting = cellFormatting[cellKey] || {};

  // Generate comment context - this is the primary identifier for aggregation
  const commentContext = generateCommentContext(data, columnId, viewType);

  // Add Velt comment tool and bubble to the cell
  useEffect(() => {
    if (cellRef.current) {
      const parentCell = cellRef.current.closest('td');
      if (parentCell) {
        // Set ID on parent table cell
        if (parentCell.id !== cellId) {
          parentCell.id = cellId;
        }

        // Check if comment tool already exists
        let commentTool = parentCell.querySelector('velt-comment-tool');
        if (!commentTool) {
          // Create and append comment tool directly to cell
          commentTool = document.createElement('velt-comment-tool');
          commentTool.setAttribute('context', JSON.stringify(commentContext));
          commentTool.setAttribute('context-options', JSON.stringify({ partialMatch: true }));
          commentTool.setAttribute('style', 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 1;');

          // Append to cell
          parentCell.appendChild(commentTool);
        } else {
          // Update context if it changed
          commentTool.setAttribute('context', JSON.stringify(commentContext));
        }

        // Check if comment bubble already exists
        let commentBubble = parentCell.querySelector('velt-comment-bubble');
        if (!commentBubble) {
          // Create and append comment bubble directly to cell
          commentBubble = document.createElement('velt-comment-bubble');
          commentBubble.setAttribute('context', JSON.stringify(commentContext));
          commentBubble.setAttribute('context-options', JSON.stringify({ partialMatch: true }));
          commentBubble.setAttribute('type', 'popover');
          commentBubble.setAttribute('style', 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 2; pointer-events: auto;');

          // Append to cell
          parentCell.appendChild(commentBubble);
        } else {
          // Update context if it changed
          commentBubble.setAttribute('context', JSON.stringify(commentContext));
        }
      }
    }

    return () => {
      // Cleanup: remove comment tool and bubble when cell is destroyed
      if (cellRef.current) {
        const parentCell = cellRef.current.closest('td');
        if (parentCell) {
          const commentTool = parentCell.querySelector('velt-comment-tool');
          if (commentTool) {
            commentTool.remove();
          }
          const commentBubble = parentCell.querySelector('velt-comment-bubble');
          if (commentBubble) {
            commentBubble.remove();
          }
        }
      }
    };
  }, [cellId, commentContext]);

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
    <div ref={cellRef} style={containerStyle} onClick={onCellClick}>
      <span style={textStyle}>{value}</span>
    </div>
  );
};
