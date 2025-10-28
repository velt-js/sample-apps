import { useState, useCallback } from 'react';
import { TableData, CellFormatting, SelectedCell, SortState } from '../types';
import { generateTableData, getCellFormattingKey } from '../utils';

export const useTableState = () => {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [rowData, setRowData] = useState<TableData[]>(generateTableData());
  const [cellFormatting, setCellFormatting] = useState<Record<string, CellFormatting>>({});
  const [gridApi, setGridApi] = useState<any>(null);
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [localSortState, setLocalSortState] = useState<SortState | null>(null);

  const toggleFormatting = useCallback((format: keyof CellFormatting) => {
    if (!selectedCell) return;
    if (format === 'align') return;

    const cellKey = getCellFormattingKey(selectedCell.row, selectedCell.col);
    const currentFormatting = cellFormatting[cellKey] || {};

    setCellFormatting(prev => ({
      ...prev,
      [cellKey]: {
        ...currentFormatting,
        [format]: !currentFormatting[format],
      },
    }));
  }, [selectedCell, cellFormatting]);

  return {
    selectedCell,
    setSelectedCell,
    rowData,
    setRowData,
    cellFormatting,
    gridApi,
    setGridApi,
    sortState,
    setSortState,
    localSortState,
    setLocalSortState,
    toggleFormatting,
  };
};
