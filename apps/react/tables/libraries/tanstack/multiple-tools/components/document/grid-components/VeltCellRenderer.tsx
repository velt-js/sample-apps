import React, { useRef, useEffect, useState } from 'react';
import { CellFormatting, TableData } from '../types';
import { getCellFormattingKey } from '../utils';

interface VeltCellRendererProps {
  data: TableData;
  value: any;
  columnId: string;
  cellFormatting: Record<string, CellFormatting>;
  onCellClick: () => void;
}

export const VeltCellRenderer: React.FC<VeltCellRendererProps> = ({
  data,
  value,
  columnId,
  cellFormatting,
  onCellClick,
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const cellId = `cell-${data.id}-${columnId}`;
  const cellKey = getCellFormattingKey(data.id, columnId);
  const formatting = cellFormatting[cellKey] || {};

  // Set ID on parent table cell element and add comment tool
  useEffect(() => {
    if (cellRef.current) {
      const parentCell = cellRef.current.closest('td');
      if (parentCell) {
        // Set the element ID
        if (parentCell.id !== cellId) {
          parentCell.id = cellId;
        }

        // Check if comment tool already exists
        let commentTool = parentCell.querySelector('velt-comment-tool') as HTMLElement | null;
        if (!commentTool) {
          // Create and append comment tool directly to cell
          commentTool = document.createElement('velt-comment-tool') as HTMLElement;
          commentTool.setAttribute('target-comment-element-id', cellId);
          commentTool.style.cssText = 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); z-index: 1;';

          // Append to cell (as direct child of td)
          parentCell.appendChild(commentTool);
        } else {
          // Update target-comment-element-id if it changed
          if (commentTool.getAttribute('target-comment-element-id') !== cellId) {
            commentTool.setAttribute('target-comment-element-id', cellId);
          }
        }
      }
    }

    return () => {
      // Cleanup: remove comment tool when cell is destroyed
      if (cellRef.current) {
        const parentCell = cellRef.current.closest('td');
        if (parentCell) {
          const commentTool = parentCell.querySelector('velt-comment-tool');
          if (commentTool) {
            commentTool.remove();
          }
        }
      }
    };
  }, [cellId]);

  // Update content when value changes (only when not editing)
  useEffect(() => {
    if (!isEditing && contentRef.current) {
      contentRef.current.textContent = String(value);
    }
  }, [value, isEditing]);

  const handleDoubleClick = () => {
    if (contentRef.current) {
      // Set initial content
      contentRef.current.textContent = String(value);
      // Enable editing
      contentRef.current.contentEditable = 'true';
      setIsEditing(true);

      // Focus and select all text
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.focus();
          const range = document.createRange();
          range.selectNodeContents(contentRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      });
    }
  };

  const handleBlur = () => {
    if (contentRef.current) {
      contentRef.current.contentEditable = 'false';
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (contentRef.current) {
        contentRef.current.blur();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (contentRef.current) {
        contentRef.current.textContent = String(value);
        contentRef.current.blur();
      }
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    padding: '4px 12px 4px 12px',
    textAlign: formatting.align || 'left',
    fontWeight: formatting.bold ? 'bold' : 'normal',
    fontStyle: formatting.italic ? 'italic' : 'normal',
    textDecoration: [
      formatting.underline ? 'underline' : '',
      formatting.strikethrough ? 'line-through' : '',
    ].filter(Boolean).join(' ') || 'none',
    outline: 'none',
    cursor: isEditing ? 'text' : 'default',
    userSelect: isEditing ? 'text' : 'none',
  };

  return (
    <div
      ref={cellRef}
      style={containerStyle}
      onClick={onCellClick}
      onDoubleClick={handleDoubleClick}
      data-editing={isEditing}
    >
      <div
        ref={contentRef}
        style={{ outline: 'none', minWidth: '20px' }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
