import React from 'react';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
} from '@tabler/icons-react';
import { CellFormatting } from '../types';

interface ToolbarProps {
  toggleFormatting: (format: keyof CellFormatting) => void;
  visible?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  toggleFormatting,
  visible = true,
}) => {
  const toolButton: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '8px',
    flexShrink: 0,
  };

  const toolButtonRounded: React.CSSProperties = {
    ...toolButton,
    borderRadius: '32px',
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute',
      right: '8.67px',
      top: '8px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px',
      zIndex: 10,
    }}>
      {/* Text Formatting */}
      <div style={{ display: 'flex', gap: '0px' }}>
        <button style={toolButton} onClick={() => toggleFormatting('bold')}>
          <IconBold size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButton} onClick={() => toggleFormatting('italic')}>
          <IconItalic size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButton} onClick={() => toggleFormatting('underline')}>
          <IconUnderline size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButton} onClick={() => toggleFormatting('strikethrough')}>
          <IconStrikethrough size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
      </div>

      {/* Removed insert tools (photo, shape, line) and alignment buttons */}
    </div>
  );
};
