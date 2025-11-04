import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react';
import { CellFormatting, ViewType } from '../types';
import { getCellFormattingKey, generateCommentContext } from '../utils';

export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  viewType: ViewType
) => (props: any) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // [Velt] Generate comment context - this is the primary identifier for aggregation
  const commentContext = generateCommentContext(
    props.data,
    props.colDef.field,
    viewType
  );

  // [Velt] Client-side only mount check to prevent SSR issues
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // [Velt] Set ID on parent AG Grid cell element and set up portal container
  useEffect(() => {
    if (!isMounted || !props.eGridCell) return;

    // Set cell ID if not already set
    if (props.eGridCell.id !== cellId) {
      props.eGridCell.id = cellId;
    }

    // Create or reuse a dedicated portal container with a unique ID
    const portalId = `velt-portal-${cellId}`;
    let portal = props.eGridCell.querySelector(`#${portalId}`) as HTMLElement;

    if (!portal) {
      portal = document.createElement('div');
      portal.id = portalId;
      portal.className = 'velt-portal-container';
      portal.style.cssText = 'position: absolute; right: 4px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 4px; pointer-events: auto; z-index: 2;';
      props.eGridCell.appendChild(portal);
    }

    // Add hover listener to cell to show/hide comment tool
    const handleMouseEnter = () => {
      if (portal) {
        portal.setAttribute('data-hover', 'true');
      }
    };
    const handleMouseLeave = () => {
      if (portal) {
        portal.removeAttribute('data-hover');
      }
    };

    props.eGridCell.addEventListener('mouseenter', handleMouseEnter);
    props.eGridCell.addEventListener('mouseleave', handleMouseLeave);

    setPortalContainer(portal);

    return () => {
      // Clean up event listeners
      props.eGridCell.removeEventListener('mouseenter', handleMouseEnter);
      props.eGridCell.removeEventListener('mouseleave', handleMouseLeave);

      // Clean up the portal container when component unmounts
      if (portal && portal.parentNode) {
        portal.parentNode.removeChild(portal);
      }
      setPortalContainer(null);
    };
  }, [cellId, props.eGridCell, isMounted]);

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
    <>
      <div ref={cellRef} style={containerStyle}>
        <span style={textStyle}>{props.value}</span>
      </div>

      {/* [Velt] Portal Velt components directly into the pre-styled portal container (client-side only) */}
      {isMounted && portalContainer && createPortal(
        <>
          {/* [Velt] Comment Tool - will show on hover when no comments exist */}
          <VeltCommentTool
            targetElementId={cellId}
            context={commentContext}
            contextOptions={{ partialMatch: true }}
          />

          {/* [Velt] Comment Bubble - will show when comments exist */}
          <VeltCommentBubble
            context={commentContext}
            contextOptions={{ partialMatch: true }}
          />
        </>,
        portalContainer
      )}
    </>
  );
};
