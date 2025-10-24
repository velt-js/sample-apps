'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VeltComments, VeltCommentTool, useVeltClient } from '@veltdev/react';
import {
  IconFolder,
  IconChevronRight,
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
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';
import './table-component.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Create custom dark theme
const customDarkTheme = themeQuartz.withParams({
  backgroundColor: '#090909',
  foregroundColor: 'rgba(255, 255, 255, 0.8)',
  headerBackgroundColor: '#090909',
  headerTextColor: '#ffffff',
  oddRowBackgroundColor: 'transparent',
  rowHoverColor: 'rgba(255, 255, 255, 0.05)',
  borderColor: '#141414',
  rowBorder: true,
  columnBorder: true,
  cellHorizontalPadding: 4,
  fontFamily: 'Urbanist, sans-serif',
  fontSize: 14,
  headerHeight: 54,
  rowHeight: 54,
  spacing: 0,
});

interface TableData {
  id: number;
  date: string;
  x: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

interface CellFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface SelectedCell {
  row: number; // Row ID (data.id)
  col: string; // Column field name
}

// Seeded random number generator for consistent SSR/client hydration
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
};

// Generate 100 rows of data with deterministic values
const generateTableData = (): TableData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data: TableData[] = [];
  const random = seededRandom(12345); // Fixed seed for consistency

  for (let i = 0; i < 100; i++) {
    const day = (i % 28) + 1;
    const month = months[Math.floor(i / 28) % 12];
    const year = 2025;

    data.push({
      id: i,
      date: `${day} ${month} ${year}`,
      x: `$${Math.floor(random() * 500) + 300}`,
      linkedin: `$${Math.floor(random() * 600) + 400}`,
      twitter: `$${Math.floor(random() * 500) + 400}`,
      instagram: `$${Math.floor(random() * 600) + 400}`,
    });
  }

  return data;
};

// Get cell formatting key
const getCellFormattingKey = (rowId: number, field: string) => `${rowId}-${field}`;

// Custom Cell Renderer with Velt Comments and Formatting
const VeltCellRendererWithFormatting = (cellFormatting: Record<string, CellFormatting>) => (props: any) => {
  const cellId = `cell-${props.data.id}-${props.colDef.field}`;
  const cellKey = getCellFormattingKey(props.data.id, props.colDef.field);
  const formatting = cellFormatting[cellKey] || {};

  // Set ID on parent AG Grid cell element
  React.useEffect(() => {
    if (props.eGridCell && props.eGridCell.id !== cellId) {
      props.eGridCell.id = cellId;
    }
  }, [cellId]);

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
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '4px 4px 4px 12px',
    gap: '8px',
    textAlign: formatting.align || 'left',
  };

  return (
    <>
      <div style={containerStyle}>
        <span style={textStyle}>{props.value}</span>
        <div className="comment-tool-wrapper">
          <VeltCommentTool targetCommentElementId={cellId} />
        </div>
      </div>
    </>
  );
};

// Custom Header Component with Column Letters
const CustomHeaderComponent = (props: any) => {
  // Map field names to letters: date=A, x=B, linkedin=C, twitter=D, instagram=E
  const fieldToLetter: Record<string, string> = {
    date: 'A',
    x: 'B',
    linkedin: 'C',
    twitter: 'D',
    instagram: 'E',
  };
  const letter = fieldToLetter[props.column.colId] || '';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      fontFamily: 'DM Mono, monospace',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.5)',
      letterSpacing: '0.12px'
    }}>
      {letter}
    </div>
  );
};

// Row Number Cell Renderer
const RowNumberRenderer = (props: any) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      fontFamily: 'DM Mono, monospace',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.5)',
      letterSpacing: '0.12px'
    }}>
      {props.node.rowIndex + 2}
    </div>
  );
};

// Sort Icon Component
const SortIcon = ({ direction }: { direction: 'asc' | 'desc' | null }) => {
  if (direction === 'asc') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="#FFCD2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else if (direction === 'desc') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="#FFCD2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else {
    // Neutral state - both arrows grayed out
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="black" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
};

// Custom Title Row Renderer Factory (for pinned top row)
const createTitleRowRenderer = (sortState: { colId: string; sort: 'asc' | 'desc' } | null) => (props: any) => {
  const cellId = `title-${props.colDef.field}`;
  const columnTitles: Record<string, string> = {
    date: 'Dates',
    x: 'X',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
  };
  const title = columnTitles[props.colDef.field] || '';

  // Set ID on parent AG Grid cell element
  React.useEffect(() => {
    if (props.eGridCell && props.eGridCell.id !== cellId) {
      props.eGridCell.id = cellId;
    }
  }, [cellId]);

  const handleSort = () => {
    const currentSort = sortState?.colId === props.colDef.field ? sortState.sort : null;
    // Toggle between desc and asc only
    let newSort: 'asc' | 'desc' = currentSort === 'asc' ? 'desc' : 'asc';

    props.api.applyColumnState({
      state: [{ colId: props.colDef.field, sort: newSort }],
      defaultState: { sort: null },
    });
  };

  const currentSort = sortState?.colId === props.colDef.field ? sortState.sort : null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '4px 4px 4px 12px',
        gap: '8px',
        cursor: 'pointer',
      }}
      onClick={handleSort}
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
        <SortIcon direction={currentSort} />
      </span>
      <div className="comment-tool-wrapper">
        <VeltCommentTool targetCommentElementId={cellId} />
      </div>
    </div>
  );
};

export const TableComponent: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [rowData, setRowData] = useState<TableData[]>(generateTableData());
  const [cellFormatting, setCellFormatting] = useState<Record<string, CellFormatting>>({});
  const [gridApi, setGridApi] = useState<any>(null);
  const [sortState, setSortState] = useState<{ colId: string; sort: 'asc' | 'desc' } | null>(null);
  const { client } = useVeltClient();

  // Pinned top row data (column titles)
  const pinnedTopRowData = useMemo(() => [{
    id: -1,
    date: 'Dates',
    x: 'X',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
  }], []);

  useEffect(() => {
    if (client) {
      // Disable comment pin highlighter for popover mode
      client.getCommentElement().disableCommentPinHighlighter();
    }
  }, [client]);

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

  // Conditional Cell Renderer (Title row or Data cell)
  const conditionalCellRenderer = useCallback((params: any) => {
    if (params.node.rowPinned === 'top') {
      const TitleRowRenderer = createTitleRowRenderer(sortState);
      return TitleRowRenderer(params);
    }
    const VeltRenderer = VeltCellRendererWithFormatting(cellFormatting);
    return VeltRenderer(params);
  }, [cellFormatting, sortState]);

  // Date comparator function to properly sort dates
  const dateComparator = useCallback((valueA: string, valueB: string) => {
    // Parse date strings like "1 Apr 2025" into Date objects
    const parseDate = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split(' ');
      const monthMap: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      return new Date(parseInt(year), monthMap[month], parseInt(day));
    };

    const dateA = parseDate(valueA);
    const dateB = parseDate(valueB);

    return dateA.getTime() - dateB.getTime();
  }, []);

  // Column Definitions
  const columnDefs = useMemo(() => [
    {
      headerName: '',
      field: 'rowNumber',
      width: 50,
      pinned: 'left',
      lockPosition: true,
      suppressMenu: true,
      sortable: false,
      editable: false,
      cellRenderer: (params: any) => {
        if (params.node.rowPinned === 'top') {
          return (
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              1
            </div>
          );
        }
        return RowNumberRenderer(params);
      },
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
      field: 'date',
      headerName: 'Dates',
      headerComponent: CustomHeaderComponent,
      editable: (params: any) => params.node.rowPinned !== 'top',
      sortable: true,
      comparator: dateComparator,
      cellRenderer: conditionalCellRenderer,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'x',
      headerName: 'X',
      headerComponent: CustomHeaderComponent,
      editable: (params: any) => params.node.rowPinned !== 'top',
      sortable: true,
      cellRenderer: conditionalCellRenderer,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'linkedin',
      headerName: 'LinkedIn',
      headerComponent: CustomHeaderComponent,
      editable: (params: any) => params.node.rowPinned !== 'top',
      sortable: true,
      cellRenderer: conditionalCellRenderer,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'twitter',
      headerName: 'Twitter',
      headerComponent: CustomHeaderComponent,
      editable: (params: any) => params.node.rowPinned !== 'top',
      sortable: true,
      cellRenderer: conditionalCellRenderer,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'instagram',
      headerName: 'Instagram',
      headerComponent: CustomHeaderComponent,
      editable: (params: any) => params.node.rowPinned !== 'top',
      sortable: true,
      cellRenderer: conditionalCellRenderer,
      flex: 1,
      minWidth: 120,
    },
  ], [conditionalCellRenderer, dateComparator]);

  // Default column properties
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    editable: true,
  }), []);

  // Grid ready handler
  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);

    // Set default sort on date column (ascending)
    params.api.applyColumnState({
      state: [{ colId: 'date', sort: 'asc' }],
      defaultState: { sort: null },
    });

    // Initialize sort state
    setSortState({ colId: 'date', sort: 'asc' });
  }, []);

  // Sort changed handler
  const onSortChanged = useCallback((params: any) => {
    const columnState = params.api.getColumnState();
    const sortedColumn = columnState.find((col: any) => col.sort !== null);

    if (sortedColumn) {
      setSortState({ colId: sortedColumn.colId, sort: sortedColumn.sort });
    } else {
      setSortState(null);
    }
  }, []);

  // Cell click handler
  const onCellClicked = useCallback((params: any) => {
    if (params.node.rowPinned !== 'top' && params.data) {
      setSelectedCell({
        row: params.data.id,
        col: params.colDef.field,
      });
    }
  }, []);

  // Cell value changed handler
  const onCellValueChanged = useCallback((params: any) => {
    console.log('Cell value changed:', params);
    // Update row data with new value
    setRowData(prevData => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex(row => row.id === params.data.id);
      if (rowIndex !== -1) {
        updatedData[rowIndex] = { ...params.data };
      }
      return updatedData;
    });
  }, []);

  const toggleFormatting = (format: keyof CellFormatting) => {
    if (!selectedCell) return;

    const cellKey = getCellFormattingKey(selectedCell.row, selectedCell.col);
    const currentFormatting = cellFormatting[cellKey] || {};

    if (format === 'align') return;

    setCellFormatting(prev => ({
      ...prev,
      [cellKey]: {
        ...currentFormatting,
        [format]: !currentFormatting[format],
      },
    }));
  };

  const setAlignment = (align: 'left' | 'center' | 'right') => {
    if (!selectedCell) return;

    const cellKey = getCellFormattingKey(selectedCell.row, selectedCell.col);
    const currentFormatting = cellFormatting[cellKey] || {};

    setCellFormatting(prev => ({
      ...prev,
      [cellKey]: {
        ...currentFormatting,
        align,
      },
    }));
  };

  const handlePhotoInsert = () => {
    if (!selectedCell) {
      alert('Please select a cell first');
      return;
    }
    alert('Photo insertion tool clicked! In a full implementation, this would open a file picker.');
  };

  const handleShapesInsert = () => {
    if (!selectedCell) {
      alert('Please select a cell first');
      return;
    }
    alert('Shapes tool clicked! In a full implementation, this would open a shapes menu.');
  };

  const handleLineInsert = () => {
    if (!selectedCell) {
      alert('Please select a cell first');
      return;
    }
    alert('Line tool clicked! In a full implementation, this would allow drawing lines.');
  };

  return (
    <div style={styles.container}>
      {/* Breadcrumb Navigation */}
      <div style={styles.breadcrumb}>
        <div style={styles.breadcrumbItem}>
          <IconFolder size={14} stroke={1.5} color="rgba(255, 255, 255, 0.52)" />
          <span style={styles.breadcrumbText}>FY2025</span>
        </div>
        <IconChevronRight size={12} stroke={1.5} color="rgba(255, 255, 255, 0.52)" />
        <div style={styles.breadcrumbItem}>
          <IconFolder size={14} stroke={1.5} color="rgba(255, 255, 255, 0.52)" />
          <span style={styles.breadcrumbText}>Marketing Spend</span>
        </div>
      </div>

      {/* Velt Comments - Popover Mode with Triangle */}
      <VeltComments
        popoverTriangleComponent={true}
        popoverMode={true}
        shadowDom={false}
        textMode={false}
      />

      {/* Table Container */}
      <div style={styles.tableContainer}>
        {/* View Toggle */}
        <div style={styles.viewToggle}>
          <button style={styles.viewButtonActive}>
            <span style={styles.viewButtonTextActive}>Day View</span>
          </button>
          <button style={styles.viewButton}>
            <span style={styles.viewButtonText}>Weekly View</span>
          </button>
          <button style={styles.viewButton}>
            <span style={styles.viewButtonText}>Monthly View</span>
          </button>
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <div style={styles.toolbarSectionNoGap}>
            <button style={styles.toolButton} onClick={() => toggleFormatting('bold')}>
              <IconBold size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButton} onClick={() => toggleFormatting('italic')}>
              <IconItalic size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButton} onClick={() => toggleFormatting('underline')}>
              <IconUnderline size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButton} onClick={() => toggleFormatting('strikethrough')}>
              <IconStrikethrough size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
          </div>

          <div style={styles.toolbarDividerWrapper}>
            <div style={styles.toolbarDividerInner} />
          </div>

          <div style={styles.toolbarSection}>
            <button style={styles.toolButtonRounded} onClick={() => setAlignment('left')}>
              <IconAlignLeft size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButtonRounded} onClick={() => setAlignment('center')}>
              <IconAlignCenter size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButtonRounded} onClick={() => setAlignment('right')}>
              <IconAlignRight size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
          </div>

          <div style={styles.toolbarDividerWrapper}>
            <div style={styles.toolbarDividerInner} />
          </div>

          <div style={styles.toolbarSection}>
            <button style={styles.toolButtonRounded} onClick={handlePhotoInsert}>
              <IconPhoto size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButtonRounded} onClick={handleShapesInsert}>
              <IconShape size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
            <button style={styles.toolButtonRounded} onClick={handleLineInsert}>
              <IconLine size={20} stroke={1.5} color="rgba(255, 255, 255, 0.7)" />
            </button>
          </div>
        </div>

        {/* AG Grid Table */}
        <div style={styles.gridWrapper}>
          <AgGridReact
            theme={customDarkTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pinnedTopRowData={pinnedTopRowData}
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#000000',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px',
    paddingTop: '80px',
    gap: '16px',
  },
  breadcrumb: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    alignSelf: 'flex-start',
  },
  breadcrumbItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  breadcrumbText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.1,
    color: 'rgba(255, 255, 255, 0.52)',
    whiteSpace: 'pre',
  },
  tableContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1600px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#090909',
    borderRadius: '8px',
    overflow: 'hidden',
    paddingTop: '56px',
    paddingBottom: '16px',
  },
  viewToggle: {
    position: 'absolute',
    left: '12px',
    top: '14px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    zIndex: 10,
  },
  viewButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonTextActive: {
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '16px',
    color: '#ffffff',
    whiteSpace: 'pre',
    letterSpacing: '0.13px',
  },
  viewButtonText: {
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '16px',
    color: 'rgba(255, 255, 255, 0.52)',
    whiteSpace: 'pre',
    letterSpacing: '0.13px',
  },
  toolbar: {
    position: 'absolute',
    right: '8.67px',
    top: '8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    zIndex: 10,
  },
  toolbarSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '8px',
    flexShrink: 0,
  },
  toolbarSectionNoGap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '0px',
    flexShrink: 0,
  },
  toolButton: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '8px',
    flexShrink: 0,
  },
  toolButtonRounded: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '8px',
    flexShrink: 0,
  },
  toolbarDividerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
    width: '1px',
    height: '16px',
  },
  toolbarDividerInner: {
    width: '1px',
    height: '16px',
    backgroundColor: 'rgb(26, 26, 26)',
    flexShrink: 0,
  },
  gridWrapper: {
    width: '100%',
    height: '100%',
    padding: '16px',
  },
};

export default TableComponent;
