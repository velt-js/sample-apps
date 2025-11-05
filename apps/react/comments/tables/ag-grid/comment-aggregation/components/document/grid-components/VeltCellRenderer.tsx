import React from 'react';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react'; // [Velt] Components for comment tool button and comment bubble display
import { CellFormatting, ViewType } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils'; // [Velt] Utility functions for cell formatting and comment context

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  viewType: ViewType
) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};
  const commentContext = generateCommentContext(props.data, props.colDef.field, viewType);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }}>
        {/* [Velt] VeltCommentTool renders a button that allows users to add comments to this specific cell */}
        {/* [Velt] context provides metadata about the cell (row, column, view type) to organize and filter comments */}
        <VeltCommentTool
          context={commentContext}
          contextOptions={{ partialMatch: true }}
        />
        {/* [Velt] VeltCommentBubble displays the total number of comments on this cell */}
        {/* [Velt] It shows comment indicators and allows users to view existing comments */}
        {/* [Velt] contextOptions.partialMatch enables showing comments when context partially matches */}
        <VeltCommentBubble
          context={commentContext}
          contextOptions={{ partialMatch: true }}
        />
      </div>
    </div>
  );
};
