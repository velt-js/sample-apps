import React from 'react';
import { Column } from '@tanstack/react-table';
import { SortIcon } from './SortIcon';
import { SortState, TableData } from '../types';

interface CustomHeaderComponentProps {
  column: Column<TableData, unknown>;
  title: string;
  localSortState: SortState | null;
  setLocalSortState: React.Dispatch<React.SetStateAction<SortState | null>>;
  setSorting: React.Dispatch<React.SetStateAction<any>>;
}

export const CustomHeaderComponent: React.FC<CustomHeaderComponentProps> = ({
  column,
  title,
  localSortState,
  setLocalSortState,
  setSorting,
}) => {
  const handleSort = () => {
    const currentSort = localSortState?.colId === column.id ? localSortState?.sort : null;
    // Toggle between desc and asc only
    const newSort: 'asc' | 'desc' = currentSort === 'asc' ? 'desc' : 'asc';

    // Update local state immediately for instant icon feedback
    setLocalSortState({ colId: column.id, sort: newSort });

    // Update TanStack Table state
    setSorting([{ id: column.id, desc: newSort === 'desc' }]);
  };

  const currentSort = localSortState?.colId === column.id ? localSortState?.sort : null;

  return (
    <div
      onClick={handleSort}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: '4px 12px 4px 12px',
        gap: '8px',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Urbanist, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--app-text-primary)',
          letterSpacing: '0.14px',
        }}
      >
        {title}
        <SortIcon direction={currentSort ?? null} />
      </span>
    </div>
  );
};
