'use client';

import React, { useState, useEffect } from 'react';
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
  IconArrowDown,
  IconArrowUp
} from '@tabler/icons-react';
import './table-component.css';

interface TableData {
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
  row: number;
  col: number;
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
      date: `${day} ${month} ${year}`,
      x: `$${Math.floor(random() * 500) + 300}`,
      linkedin: `$${Math.floor(random() * 600) + 400}`,
      twitter: `$${Math.floor(random() * 500) + 400}`,
      instagram: `$${Math.floor(random() * 600) + 400}`,
    });
  }

  return data;
};

export const TableComponent: React.FC = () => {
  // Local state - not synced across users, resets on refresh
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [tableData, setTableData] = useState<TableData[]>(generateTableData());
  const [cellFormatting, setCellFormatting] = useState<Record<string, CellFormatting>>({});
  const { client } = useVeltClient();

  // Sorting state (local, not synced)
  const [sortColumn, setSortColumn] = useState<keyof TableData | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (client) {
      // Disable comment pin highlighter for popover mode
      client.getCommentElement().disableCommentPinHighlighter();
    }
  }, [client]);

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const isCellSelected = (row: number, col: number) => {
    return selectedCell?.row === row && selectedCell?.col === col;
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const toggleFormatting = (format: keyof CellFormatting) => {
    if (!selectedCell || !cellFormatting) return;

    const cellKey = getCellKey(selectedCell.row, selectedCell.col);
    const currentFormatting = cellFormatting[cellKey] || {};

    if (format === 'align') return; // Handle alignment separately

    setCellFormatting({
      ...cellFormatting,
      [cellKey]: {
        ...currentFormatting,
        [format]: !currentFormatting[format],
      },
    });
  };

  const setAlignment = (align: 'left' | 'center' | 'right') => {
    if (!selectedCell || !cellFormatting) return;

    const cellKey = getCellKey(selectedCell.row, selectedCell.col);
    const currentFormatting = cellFormatting[cellKey] || {};

    setCellFormatting({
      ...cellFormatting,
      [cellKey]: {
        ...currentFormatting,
        align,
      },
    });
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

  const getCellStyle = (row: number, col: number, baseStyle: React.CSSProperties): React.CSSProperties => {
    if (!cellFormatting) return baseStyle;

    const cellKey = getCellKey(row, col);
    const formatting = cellFormatting[cellKey] || {};

    return {
      ...baseStyle,
      fontWeight: formatting.bold ? 'bold' : baseStyle.fontWeight,
      fontStyle: formatting.italic ? 'italic' : 'normal',
      textDecoration: [
        formatting.underline ? 'underline' : '',
        formatting.strikethrough ? 'line-through' : '',
      ].filter(Boolean).join(' ') || 'none',
      textAlign: formatting.align || (baseStyle.textAlign as any),
    };
  };


  const isColumnSelected = (col: number) => {
    return selectedCell?.col === col;
  };

  const isRowSelected = (row: number) => {
    return selectedCell?.row === row;
  };

  const handleCellEdit = (rowData: TableData, field: keyof TableData, newValue: string) => {
    if (!tableData) return;

    // Find the original index in tableData
    const originalIndex = tableData.findIndex(row =>
      row.date === rowData.date &&
      row.x === rowData.x &&
      row.linkedin === rowData.linkedin &&
      row.twitter === rowData.twitter &&
      row.instagram === rowData.instagram
    );

    if (originalIndex === -1) return;

    const updatedData = [...tableData];
    updatedData[originalIndex] = {
      ...updatedData[originalIndex],
      [field]: newValue,
    };
    setTableData(updatedData);
  };

  const handleColumnSort = (column: keyof TableData) => {
    if (sortColumn === column) {
      // Toggle between desc -> asc -> no sort
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else {
        // Reset to no sort
        setSortColumn(null);
        setSortDirection('desc');
      }
    } else {
      // New column, start with descending
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const parsePrice = (priceString: string): number => {
    return parseInt(priceString.replace('$', ''));
  };

  const parseDate = (dateString: string): Date => {
    // Parse "1 Jan 2025" format
    const [day, month, year] = dateString.split(' ');
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return new Date(parseInt(year), monthMap[month], parseInt(day));
  };

  const getSortedData = (): TableData[] => {
    if (!tableData || !sortColumn) return tableData;

    const sorted = [...tableData].sort((a, b) => {
      if (sortColumn === 'date') {
        const dateA = parseDate(a.date).getTime();
        const dateB = parseDate(b.date).getTime();
        return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        // Sort by price for other columns
        const priceA = parsePrice(a[sortColumn]);
        const priceB = parsePrice(b[sortColumn]);
        return sortDirection === 'desc' ? priceB - priceA : priceA - priceB;
      }
    });

    return sorted;
  };

  const sortedTableData = getSortedData();

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

        {/* Table Content */}
        <div style={styles.tableContent}>
          <div style={styles.tableInner}>
            {/* Column Headers */}
            <div style={styles.headerRow}>
              <div style={{...styles.headerCell, ...styles.firstColumnHeader}}>
                <div style={styles.headerTextHidden}>
                  <p style={styles.headerTextMonoP}>-</p>
                </div>
              </div>
              <div style={{...styles.headerCell, ...(isColumnSelected(0) && styles.activeHeader)}}>
                <div style={isColumnSelected(0) ? styles.headerTextMonoSmallDiv : styles.headerTextMonoSmallDimmed}>
                  <p style={styles.headerTextMonoSmallP}>A</p>
                </div>
              </div>
              <div style={{...styles.headerCell, ...(isColumnSelected(1) && styles.activeHeader)}}>
                <div style={isColumnSelected(1) ? styles.headerTextMonoSmallDiv : styles.headerTextMonoSmallDimmed}>
                  <p style={styles.headerTextMonoSmallP}>B</p>
                </div>
              </div>
              <div style={{...styles.headerCell, ...(isColumnSelected(2) && styles.activeHeader)}}>
                <div style={isColumnSelected(2) ? styles.headerTextMonoSmallDiv : styles.headerTextMonoSmallDimmed}>
                  <p style={styles.headerTextMonoSmallP}>C</p>
                </div>
              </div>
              <div style={{...styles.headerCell, ...(isColumnSelected(3) && styles.activeHeader)}}>
                <div style={isColumnSelected(3) ? styles.headerTextMonoSmallDiv : styles.headerTextMonoSmallDimmed}>
                  <p style={styles.headerTextMonoSmallP}>D</p>
                </div>
              </div>
              <div style={{...styles.headerCell, ...(isColumnSelected(4) && styles.activeHeader)}}>
                <div style={isColumnSelected(4) ? styles.headerTextMonoSmallDiv : styles.headerTextMonoSmallDimmed}>
                  <p style={styles.headerTextMonoSmallP}>E</p>
                </div>
              </div>
            </div>

            {/* Column Title Row */}
            <div style={styles.dataRow}>
              <div style={{...styles.dataCell, ...styles.rowNumberCell, ...(isRowSelected(0) && styles.rowNumberCellActive)}}>
                <div style={isRowSelected(0) ? styles.rowNumberDiv : styles.rowNumberDivDimmed}>
                  <p style={styles.rowNumberP}>1</p>
                </div>
              </div>
              <div
                id="cell-0-0"
                style={{
                  ...styles.dataCell,
                  ...(isCellSelected(0, 0) && styles.selectedCell),
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  handleCellClick(0, 0);
                  handleColumnSort('date');
                }}
              >
                <div style={{...getCellStyle(0, 0, styles.columnTitleDiv), display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <p style={styles.columnTitleP}>Dates</p>
                  {sortColumn === 'date' && (
                    sortDirection === 'desc' ?
                      <IconArrowDown size={14} color="#ffffff" /> :
                      <IconArrowUp size={14} color="#ffffff" />
                  )}
                </div>
                <div className="comment-tool-wrapper">
                  <VeltCommentTool targetCommentElementId="cell-0-0" />
                </div>
              </div>
              <div
                id="cell-0-1"
                style={{
                  ...styles.dataCell,
                  ...(isCellSelected(0, 1) && styles.selectedCell),
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  handleCellClick(0, 1);
                  handleColumnSort('x');
                }}
              >
                <div style={{...getCellStyle(0, 1, styles.columnTitleDiv), display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <p style={styles.columnTitleP}>X</p>
                  {sortColumn === 'x' && (
                    sortDirection === 'desc' ?
                      <IconArrowDown size={14} color="#ffffff" /> :
                      <IconArrowUp size={14} color="#ffffff" />
                  )}
                </div>
                <div className="comment-tool-wrapper">
                  <VeltCommentTool targetCommentElementId="cell-0-1" />
                </div>
              </div>
              <div
                id="cell-0-2"
                style={{
                  ...styles.dataCell,
                  ...(isCellSelected(0, 2) && styles.selectedCell),
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  handleCellClick(0, 2);
                  handleColumnSort('linkedin');
                }}
              >
                <div style={{...getCellStyle(0, 2, styles.columnTitleDiv), display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <p style={styles.columnTitleP}>LinkedIn</p>
                  {sortColumn === 'linkedin' && (
                    sortDirection === 'desc' ?
                      <IconArrowDown size={14} color="#ffffff" /> :
                      <IconArrowUp size={14} color="#ffffff" />
                  )}
                </div>
                <div className="comment-tool-wrapper">
                  <VeltCommentTool targetCommentElementId="cell-0-2" />
                </div>
              </div>
              <div
                id="cell-0-3"
                style={{
                  ...styles.dataCell,
                  ...(isCellSelected(0, 3) && styles.selectedCell),
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  handleCellClick(0, 3);
                  handleColumnSort('twitter');
                }}
              >
                <div style={{...getCellStyle(0, 3, styles.columnTitleDiv), display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <p style={styles.columnTitleP}>Twitter</p>
                  {sortColumn === 'twitter' && (
                    sortDirection === 'desc' ?
                      <IconArrowDown size={14} color="#ffffff" /> :
                      <IconArrowUp size={14} color="#ffffff" />
                  )}
                </div>
                <div className="comment-tool-wrapper">
                  <VeltCommentTool targetCommentElementId="cell-0-3" />
                </div>
              </div>
              <div
                id="cell-0-4"
                style={{
                  ...styles.dataCell,
                  ...(isCellSelected(0, 4) && styles.selectedCell),
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  handleCellClick(0, 4);
                  handleColumnSort('instagram');
                }}
              >
                <div style={{...getCellStyle(0, 4, styles.columnTitleDiv), display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <p style={styles.columnTitleP}>Instagram</p>
                  {sortColumn === 'instagram' && (
                    sortDirection === 'desc' ?
                      <IconArrowDown size={14} color="#ffffff" /> :
                      <IconArrowUp size={14} color="#ffffff" />
                  )}
                </div>
                <div className="comment-tool-wrapper">
                  <VeltCommentTool targetCommentElementId="cell-0-4" />
                </div>
              </div>
            </div>

            {/* Data Rows */}
            {sortedTableData.map((row, index) => {
              const rowNum = index + 1; // Row numbers start from 1 (0 is title row)
              return (
                <div key={index} style={styles.dataRow}>
                  <div style={{...styles.dataCell, ...styles.rowNumberCell, ...(isRowSelected(rowNum) && styles.rowNumberCellActive)}}>
                    <div style={isRowSelected(rowNum) ? styles.rowNumberDiv : styles.rowNumberDivDimmed}>
                      <p style={styles.rowNumberP}>{index + 2}</p>
                    </div>
                  </div>
                  <div
                    id={`cell-${rowNum}-0`}
                    style={{
                      ...styles.dataCell,
                      ...(isCellSelected(rowNum, 0) && styles.selectedCell),
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCellClick(rowNum, 0)}
                  >
                    <div style={getCellStyle(rowNum, 0, styles.cellTextDiv)}>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        style={styles.cellTextP}
                        onBlur={(e) => handleCellEdit(row, 'date', e.currentTarget.textContent || '')}
                      >
                        {row.date}
                      </p>
                    </div>
                    <div className="comment-tool-wrapper">
                      <VeltCommentTool targetCommentElementId={`cell-${rowNum}-0`} />
                    </div>
                  </div>
                  <div
                    id={`cell-${rowNum}-1`}
                    style={{
                      ...styles.dataCell,
                      opacity: 0.8,
                      ...(isCellSelected(rowNum, 1) && styles.selectedCell),
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCellClick(rowNum, 1)}
                  >
                    <div style={getCellStyle(rowNum, 1, styles.cellTextDiv)}>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        style={styles.cellTextP}
                        onBlur={(e) => handleCellEdit(row, 'x', e.currentTarget.textContent || '')}
                      >
                        {row.x}
                      </p>
                    </div>
                    <div className="comment-tool-wrapper">
                      <VeltCommentTool targetCommentElementId={`cell-${rowNum}-1`} />
                    </div>
                  </div>
                  <div
                    id={`cell-${rowNum}-2`}
                    style={{
                      ...styles.dataCell,
                      opacity: 0.8,
                      ...(isCellSelected(rowNum, 2) && styles.selectedCell),
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCellClick(rowNum, 2)}
                  >
                    <div style={getCellStyle(rowNum, 2, styles.cellTextDiv)}>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        style={styles.cellTextP}
                        onBlur={(e) => handleCellEdit(row, 'linkedin', e.currentTarget.textContent || '')}
                      >
                        {row.linkedin}
                      </p>
                    </div>
                    <div className="comment-tool-wrapper">
                      <VeltCommentTool targetCommentElementId={`cell-${rowNum}-2`} />
                    </div>
                  </div>
                  <div
                    id={`cell-${rowNum}-3`}
                    style={{
                      ...styles.dataCell,
                      opacity: 0.8,
                      ...(isCellSelected(rowNum, 3) && styles.selectedCell),
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCellClick(rowNum, 3)}
                  >
                    <div style={getCellStyle(rowNum, 3, styles.cellTextDiv)}>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        style={styles.cellTextP}
                        onBlur={(e) => handleCellEdit(row, 'twitter', e.currentTarget.textContent || '')}
                      >
                        {row.twitter}
                      </p>
                    </div>
                    <div className="comment-tool-wrapper">
                      <VeltCommentTool targetCommentElementId={`cell-${rowNum}-3`} />
                    </div>
                  </div>
                  <div
                    id={`cell-${rowNum}-4`}
                    style={{
                      ...styles.dataCell,
                      ...(isCellSelected(rowNum, 4) && styles.selectedCell),
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCellClick(rowNum, 4)}
                  >
                    <div style={getCellStyle(rowNum, 4, styles.cellTextDiv)}>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        style={styles.cellTextP}
                        onBlur={(e) => handleCellEdit(row, 'instagram', e.currentTarget.textContent || '')}
                      >
                        {row.instagram}
                      </p>
                    </div>
                    <div className="comment-tool-wrapper">
                      <VeltCommentTool targetCommentElementId={`cell-${rowNum}-4`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
  iconWrapper14: {
    position: 'relative',
    flexShrink: 0,
    width: '14px',
    height: '14px',
  },
  iconWrapper12: {
    position: 'relative',
    flexShrink: 0,
    width: '12px',
    height: '12px',
  },
  iconWrapper20: {
    position: 'relative',
    flexShrink: 0,
    width: '20px',
    height: '20px',
  },
  icon: {
    display: 'block',
    maxWidth: 'none',
    width: '100%',
    height: '100%',
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
  tableContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
  },
  tableInner: {
    width: '100%',
    maxWidth: '1600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
  },
  headerCell: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: '1px',
    height: '48px',
    backgroundColor: '#090909',
    border: '1px solid #141414',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    flexShrink: 0,
  },
  firstColumnHeader: {
    flexGrow: 0,
    flexBasis: 'auto',
  },
  activeHeader: {
    backgroundColor: '#171717',
  },
  headerTextHidden: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'DM Mono, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 0,
    fontStyle: 'normal',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: '0.14px',
    width: '8px',
    flexShrink: 0,
    opacity: 0,
  },
  headerTextMonoP: {
    lineHeight: '16px',
    margin: 0,
  },
  headerTextMonoSmallDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'DM Mono, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 0,
    fontStyle: 'normal',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: '0.12px',
    width: '8px',
    flexShrink: 0,
    opacity: 0.5,
  },
  headerTextMonoSmallDimmed: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'DM Mono, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 0,
    fontStyle: 'normal',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: '0.12px',
    width: '8px',
    flexShrink: 0,
    opacity: 0.3,
  },
  headerTextMonoSmallP: {
    lineHeight: '16px',
    margin: 0,
  },
  dataRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
  },
  dataCell: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: '1px',
    height: '48px',
    border: '1px solid #141414',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 4px 4px 12px',
    flexShrink: 0,
    gap: '8px',
  },
  rowNumberCell: {
    flexGrow: 0,
    flexBasis: 'auto',
    height: '48px',
    backgroundColor: '#090909',
    padding: '16px 12px',
  },
  rowNumberCellActive: {
    backgroundColor: '#171717',
  },
  rowNumberDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'DM Mono, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 0,
    fontStyle: 'normal',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: '0.12px',
    width: '8px',
    flexShrink: 0,
    opacity: 0.5,
  },
  rowNumberDivDimmed: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'DM Mono, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 0,
    fontStyle: 'normal',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: '0.12px',
    width: '8px',
    flexShrink: 0,
    opacity: 0.3,
  },
  rowNumberP: {
    lineHeight: '16px',
    margin: 0,
  },
  columnTitleDiv: {
    display: 'block',
    flex: 1,
    minWidth: 0,
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 0,
    color: '#ffffff',
    letterSpacing: '0.14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  columnTitleP: {
    lineHeight: '16px',
    whiteSpace: 'pre',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cellTextDiv: {
    display: 'block',
    flex: 1,
    minWidth: 0,
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 0,
    color: '#ffffff',
    letterSpacing: '0.14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    opacity: 0.8,
  },
  cellTextP: {
    lineHeight: '16px',
    whiteSpace: 'pre',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  selectedCell: {
    border: '1px solid rgb(255, 205, 46)',
  },
};

export default TableComponent;
