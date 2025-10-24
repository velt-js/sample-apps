import React from 'react';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconPhoto,
  IconShape,
  IconLine,
} from '@tabler/icons-react';
import { CellFormatting } from '../types';

interface ToolbarProps {
  toggleFormatting: (format: keyof CellFormatting) => void;
  setAlignment: (align: 'left' | 'center' | 'right') => void;
  handlePhotoInsert: () => void;
  handleShapesInsert: () => void;
  handleLineInsert: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  toggleFormatting,
  setAlignment,
  handlePhotoInsert,
  handleShapesInsert,
  handleLineInsert,
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

      {/* Divider */}
      <div style={{ width: '1px', height: '16px', backgroundColor: 'rgb(26, 26, 26)' }} />

      {/* Alignment */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={toolButtonRounded} onClick={() => setAlignment('left')}>
          <IconAlignLeft size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButtonRounded} onClick={() => setAlignment('center')}>
          <IconAlignCenter size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButtonRounded} onClick={() => setAlignment('right')}>
          <IconAlignRight size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '16px', backgroundColor: 'rgb(26, 26, 26)' }} />

      {/* Insert Tools */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={toolButtonRounded} onClick={handlePhotoInsert}>
          <IconPhoto size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButtonRounded} onClick={handleShapesInsert}>
          <IconShape size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <button style={toolButtonRounded} onClick={handleLineInsert}>
          <IconLine size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
        </button>
      </div>
    </div>
  );
};
