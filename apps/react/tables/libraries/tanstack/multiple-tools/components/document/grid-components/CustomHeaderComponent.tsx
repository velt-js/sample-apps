import React from 'react';
import { SortIcon } from './SortIcon';
import { COLUMN_TITLES } from '../constants';
import { SortState } from '../types';

interface CustomHeaderComponentProps {
  localSortState: SortState | null;
  setLocalSortState: React.Dispatch<React.SetStateAction<SortState | null>>;
}

export const createCustomHeaderComponent = (
  localSortState: SortState | null,
  setLocalSortState: React.Dispatch<React.SetStateAction<SortState | null>>
) => (props: any) => {
  const title = COLUMN_TITLES[props.column.colId] || '';

  const handleSort = () => {
    const currentSort = localSortState?.colId === props.column.colId ? localSortState?.sort : null;
    // Toggle between desc and asc only
    let newSort: 'asc' | 'desc' = currentSort === 'asc' ? 'desc' : 'asc';

    // Update local state immediately for instant icon feedback
    setLocalSortState({ colId: props.column.colId, sort: newSort });

    // Update AG Grid state (will trigger onSortChanged callback)
    props.api.applyColumnState({
      state: [{ colId: props.column.colId, sort: newSort }],
      defaultState: { sort: null },
    });
  };

  const currentSort = localSortState?.colId === props.column.colId ? localSortState?.sort : null;

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
          color: '#ffffff',
          letterSpacing: '0.14px',
        }}
      >
        {title}
        <SortIcon direction={currentSort ?? null} />
      </span>
    </div>
  );
};
