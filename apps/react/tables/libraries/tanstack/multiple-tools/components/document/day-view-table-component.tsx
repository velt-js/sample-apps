'use client';

import React, { useEffect, useMemo, useCallback, useState, useRef } from 'react';
import { VeltComments, useVeltClient } from '@veltdev/react'; // [Velt]
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import './day-view-table-component.css';

// Import modularized components and utilities
import { dateComparator } from './utils';
import { CustomHeaderComponent } from './grid-components/CustomHeaderComponent';
import { RowNumberRenderer } from './grid-components/RowNumberRenderer';
import { VeltCellRenderer } from './grid-components/VeltCellRenderer';
import { Breadcrumb } from './ui-components/Breadcrumb';
import { ViewToggle } from './ui-components/ViewToggle';
import { Toolbar } from './ui-components/Toolbar';
import { styles } from './styles';
import { useTableState } from './hooks/useTableState';
import { TableData } from './types';

export const TableComponent: React.FC = () => {
  // [Velt] Get Velt client instance
  const { client } = useVeltClient();
  const {
    selectedCell,
    setSelectedCell,
    rowData,
    cellFormatting,
    setSortState,
    localSortState,
    setLocalSortState,
    toggleFormatting,
  } = useTableState();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Velt
  useEffect(() => {
    if (client) {
      client.getCommentElement().disableCommentPinHighlighter();
    }
  }, [client]);

  // TanStack Table sorting state
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: false }]);

  // Sync localSortState with sorting (when TanStack Table updates)
  useEffect(() => {
    if (sorting.length > 0) {
      const sortedColumn = sorting[0];
      const newSortState = {
        colId: sortedColumn.id,
        sort: sortedColumn.desc ? 'desc' as const : 'asc' as const,
      };
      setLocalSortState(newSortState);
      setSortState(newSortState);
    } else {
      setLocalSortState(null);
      setSortState(null);
    }
  }, [sorting, setLocalSortState, setSortState]);

  // Update header highlighting when selection changes
  useEffect(() => {
    if (tableContainerRef.current) {
      // Remove all previous highlighting
      document.querySelectorAll('.tanstack-header-cell').forEach(el => {
        el.classList.remove('header-selected');
      });
      document.querySelectorAll('.tanstack-row-number-cell').forEach(el => {
        el.classList.remove('row-selected');
      });

      if (selectedCell) {
        // Add highlighting to selected column header
        const colElement = document.querySelector(`[data-column-id="${selectedCell.col}"]`);
        if (colElement) {
          colElement.classList.add('header-selected');
        }

        // Add highlighting to selected row number
        const rowElement = document.querySelector(`[data-row-id="${selectedCell.row}"]`);
        if (rowElement) {
          rowElement.classList.add('row-selected');
        }
      }
    }
  }, [selectedCell]);

  // Custom sort function for date column
  const dateSortFn = (rowA: any, rowB: any, columnId: string) => {
    const valueA = rowA.getValue(columnId);
    const valueB = rowB.getValue(columnId);
    return dateComparator(valueA, valueB);
  };

  // Column Definitions
  const columns = useMemo<ColumnDef<TableData>[]>(() => [
    {
      id: 'rowNumber',
      header: () => (
        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '14px',
          opacity: 0,
        }}>
          -
        </div>
      ),
      cell: ({ row }) => <RowNumberRenderer rowIndex={row.index} />,
      size: 50,
      enableSorting: false,
      enableResizing: false,
    },
    {
      accessorKey: 'date',
      id: 'date',
      header: ({ column }) => (
        <CustomHeaderComponent
          column={column}
          title="Dates"
          localSortState={localSortState}
          setLocalSortState={setLocalSortState}
          setSorting={setSorting}
        />
      ),
      cell: ({ row, column }) => (
        <VeltCellRenderer
          data={row.original}
          value={row.getValue('date')}
          columnId={column.id}
          cellFormatting={cellFormatting}
          onCellClick={() => {
            setSelectedCell({
              row: row.original.id,
              col: column.id,
            });
          }}
        />
      ),
      sortingFn: dateSortFn,
      size: 150,
      minSize: 150,
    },
    {
      accessorKey: 'x',
      id: 'x',
      header: ({ column }) => (
        <CustomHeaderComponent
          column={column}
          title="X"
          localSortState={localSortState}
          setLocalSortState={setLocalSortState}
          setSorting={setSorting}
        />
      ),
      cell: ({ row, column }) => (
        <VeltCellRenderer
          data={row.original}
          value={row.getValue('x')}
          columnId={column.id}
          cellFormatting={cellFormatting}
          onCellClick={() => {
            setSelectedCell({
              row: row.original.id,
              col: column.id,
            });
          }}
        />
      ),
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: 'linkedin',
      id: 'linkedin',
      header: ({ column }) => (
        <CustomHeaderComponent
          column={column}
          title="LinkedIn"
          localSortState={localSortState}
          setLocalSortState={setLocalSortState}
          setSorting={setSorting}
        />
      ),
      cell: ({ row, column }) => (
        <VeltCellRenderer
          data={row.original}
          value={row.getValue('linkedin')}
          columnId={column.id}
          cellFormatting={cellFormatting}
          onCellClick={() => {
            setSelectedCell({
              row: row.original.id,
              col: column.id,
            });
          }}
        />
      ),
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: 'facebook',
      id: 'facebook',
      header: ({ column }) => (
        <CustomHeaderComponent
          column={column}
          title="Facebook"
          localSortState={localSortState}
          setLocalSortState={setLocalSortState}
          setSorting={setSorting}
        />
      ),
      cell: ({ row, column }) => (
        <VeltCellRenderer
          data={row.original}
          value={row.getValue('facebook')}
          columnId={column.id}
          cellFormatting={cellFormatting}
          onCellClick={() => {
            setSelectedCell({
              row: row.original.id,
              col: column.id,
            });
          }}
        />
      ),
      size: 120,
      minSize: 120,
    },
    {
      accessorKey: 'instagram',
      id: 'instagram',
      header: ({ column }) => (
        <CustomHeaderComponent
          column={column}
          title="Instagram"
          localSortState={localSortState}
          setLocalSortState={setLocalSortState}
          setSorting={setSorting}
        />
      ),
      cell: ({ row, column }) => (
        <VeltCellRenderer
          data={row.original}
          value={row.getValue('instagram')}
          columnId={column.id}
          cellFormatting={cellFormatting}
          onCellClick={() => {
            setSelectedCell({
              row: row.original.id,
              col: column.id,
            });
          }}
        />
      ),
      size: 120,
      minSize: 120,
    },
  ], [cellFormatting, localSortState, setLocalSortState, setSelectedCell]);

  // TanStack Table instance
  const table = useReactTable({
    data: rowData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  return (
    <div style={styles.container}>
      <Breadcrumb />

      <VeltComments
        popoverTriangleComponent={true}
        popoverMode={true}
        shadowDom={false}
        textMode={false}
      />

      <div style={styles.tableContainer}>
        <ViewToggle />

        <Toolbar
          toggleFormatting={toggleFormatting}
        />

        <div style={styles.gridWrapper} ref={tableContainerRef}>
          <div className="tanstack-table-container">
            <table className="tanstack-table">
              <thead className="tanstack-table-header">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="tanstack-table-header-row">
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={header.id}
                        className={`tanstack-header-cell ${index === 0 ? 'pinned-left' : ''}`}
                        data-column-id={header.column.id}
                        style={{
                          width: header.column.getSize(),
                          minWidth: header.column.columnDef.minSize,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="tanstack-table-body">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="tanstack-table-row">
                    {row.getVisibleCells().map((cell, index) => {
                      const isSelected = selectedCell?.row === row.original.id && selectedCell?.col === cell.column.id;
                      return (
                        <td
                          key={cell.id}
                          className={`tanstack-table-cell ${index === 0 ? 'tanstack-row-number-cell pinned-left' : ''} ${isSelected ? 'cell-selected' : ''}`}
                          data-row-id={row.original.id}
                          data-column-id={cell.column.id}
                          style={{
                            width: cell.column.getSize(),
                            minWidth: cell.column.columnDef.minSize,
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
