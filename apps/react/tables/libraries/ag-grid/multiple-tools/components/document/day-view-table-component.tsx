'use client';

import React, { useEffect, useMemo, useCallback } from 'react';
import { VeltComments, useVeltClient } from '@veltdev/react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './day-view-table-component.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Import modularized components and utilities
import { customDarkTheme } from './constants';
import { dateComparator } from './utils';
import { createCustomHeaderComponent } from './grid-components/CustomHeaderComponent';
import { RowNumberRenderer } from './grid-components/RowNumberRenderer';
import { createVeltCellRenderer } from './grid-components/VeltCellRenderer';
import { Breadcrumb } from './ui-components/Breadcrumb';
import { ViewToggle } from './ui-components/ViewToggle';
import { Toolbar } from './ui-components/Toolbar';
import { styles } from './styles';
import { useTableState } from './hooks/useTableState';

export const TableComponent: React.FC = () => {
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();
  const {
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
  } = useTableState();

  // Sync localSortState with sortState (when AG Grid updates)
  useEffect(() => {
    if (sortState) {
      setLocalSortState(sortState);
    }
  }, [sortState]);

  // Update header highlighting when selection changes
  useEffect(() => {
    if (gridApi) {
      // Remove all previous highlighting
      document.querySelectorAll('.ag-header-cell').forEach(el => {
        el.classList.remove('header-selected');
      });
      document.querySelectorAll('.ag-pinned-left-cols-container .ag-cell').forEach(el => {
        el.classList.remove('row-selected');
      });

      if (selectedCell) {
        // Add highlighting to selected column header
        const colElement = document.querySelector(`[col-id="${selectedCell.col}"]`);
        if (colElement) {
          colElement.classList.add('header-selected');
        }

        // Add highlighting to selected row number
        const allCells = document.querySelectorAll('.ag-pinned-left-cols-container .ag-cell');
        allCells.forEach(cell => {
          const row = cell.closest('.ag-row');
          if (row) {
            const rowNode = gridApi.getRowNode(selectedCell.row.toString());
            if (rowNode && row.getAttribute('row-id') === selectedCell.row.toString()) {
              cell.classList.add('row-selected');
            }
          }
        });
      }
    }
  }, [selectedCell, gridApi]);

  // Create header component with sorting
  const headerComponent = useMemo(() => {
    return createCustomHeaderComponent(localSortState, setLocalSortState);
  }, [localSortState]);

  // [Velt] Cell Renderer with Velt formatting
  const veltCellRenderer = useMemo(() => {
    return createVeltCellRenderer(cellFormatting);
  }, [cellFormatting]);

  // Column Definitions
  const columnDefs = useMemo(() => [
    {
      headerName: '',
      field: 'rowNumber' as any,
      width: 50,
      pinned: 'left' as const,
      lockPosition: true,
      suppressHeaderMenuButton: true,
      sortable: false,
      editable: false,
      cellRenderer: RowNumberRenderer,
      headerComponent: () => (
        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '14px',
          opacity: 0,
        }}>
          -
        </div>
      ),
      cellStyle: {
        backgroundColor: '#090909',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      field: 'date' as any,
      headerName: 'Dates',
      headerComponent: headerComponent,
      editable: true,
      sortable: true,
      comparator: dateComparator,
      cellRenderer: veltCellRenderer,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'x' as any,
      headerName: 'X',
      headerComponent: headerComponent,
      editable: true,
      sortable: true,
      cellRenderer: veltCellRenderer,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'linkedin' as any,
      headerName: 'LinkedIn',
      headerComponent: headerComponent,
      editable: true,
      sortable: true,
      cellRenderer: veltCellRenderer,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'facebook' as any,
      headerName: 'Facebook',
      headerComponent: headerComponent,
      editable: true,
      sortable: true,
      cellRenderer: veltCellRenderer,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'instagram' as any,
      headerName: 'Instagram',
      headerComponent: headerComponent,
      editable: true,
      sortable: true,
      cellRenderer: veltCellRenderer,
      flex: 1,
      minWidth: 120,
    },
  ], [veltCellRenderer, headerComponent]);

  // Default column properties
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    editable: true,
  }), []);

  // AG Grid event handlers
  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
    params.api.applyColumnState({
      state: [{ colId: 'date', sort: 'asc' }],
      defaultState: { sort: null },
    });
    setSortState({ colId: 'date', sort: 'asc' });
    setLocalSortState({ colId: 'date', sort: 'asc' });
  }, []);

  const onSortChanged = useCallback((params: any) => {
    const columnState = params.api.getColumnState();
    const sortedColumn = columnState.find((col: any) => col.sort !== null);
    setSortState(sortedColumn ? { colId: sortedColumn.colId, sort: sortedColumn.sort } : null);
  }, []);

  const onCellClicked = useCallback((params: any) => {
    if (params.data) {
      setSelectedCell({
        row: params.data.id,
        col: params.colDef.field,
      });
    }
  }, []);

  const onCellValueChanged = useCallback((params: any) => {
    setRowData(prevData => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex(row => row.id === params.data.id);
      if (rowIndex !== -1) {
        updatedData[rowIndex] = { ...params.data };
      }
      return updatedData;
    });
  }, []);

  return (
    <div style={styles.container}>
      <Breadcrumb />

      <div style={styles.tableContainer}>
        <ViewToggle />

        <Toolbar
          toggleFormatting={toggleFormatting}
        />

        <div style={styles.gridWrapper}>
          <AgGridReact
            theme={customDarkTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onSortChanged={onSortChanged}
            onCellClicked={onCellClicked}
            onCellValueChanged={onCellValueChanged}
            domLayout="normal"
            enableCellTextSelection={true}
            ensureDomOrder={true}
            animateRows={false}
            suppressRowHoverHighlight={false}
            suppressAnimationFrame={false}
            suppressCellFocus={false}
            getRowId={(params) => params.data.id.toString()}
          />
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
