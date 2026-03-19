import React from 'react';
import { IconFolder, IconChevronRight } from '@tabler/icons-react';

export const Breadcrumb: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px',
      alignSelf: 'flex-start',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
      }}>
        <IconFolder size={14} stroke={1.5} style={{ color: 'var(--app-text-tertiary)' }} />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: 1.1,
          color: 'var(--app-text-tertiary)',
          whiteSpace: 'pre',
        }}>FY2025</span>
      </div>
      <IconChevronRight size={12} stroke={1.5} style={{ color: 'var(--app-text-tertiary)' }} />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
      }}>
        <IconFolder size={14} stroke={1.5} style={{ color: 'var(--app-text-tertiary)' }} />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: 1.1,
          color: 'var(--app-text-tertiary)',
          whiteSpace: 'pre',
        }}>Marketing Spend</span>
      </div>
    </div>
  );
};
