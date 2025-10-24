'use client';

import React, { useState, useEffect } from 'react';
import { VeltComments, VeltCommentTool, useVeltClient } from '@veltdev/react';
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

const tableData: TableData[] = generateTableData();

// Figma asset URLs
const imgFrame = "http://localhost:3845/assets/209587c08c306a5d8ea4baadd1252bb9a8a07f4e.svg";
const imgTablerIconChevronRight = "http://localhost:3845/assets/583003e84220653f4b462b3834513dcd22c65261.svg";
const imgFrame1 = "http://localhost:3845/assets/de7453bbd8e7dd9c53026c34b499633a4a2ccc06.svg";
const imgTablerIconBold = "http://localhost:3845/assets/8a6bef95ce180e8134c2c6237820497ad9923bed.svg";
const imgTablerIconItalic = "http://localhost:3845/assets/06f941657cf3dedd924fb74eba5e98e70c24d91c.svg";
const imgTablerIconUnderline = "http://localhost:3845/assets/562e8943c33607ee26c45093bb2682f405b8dc9c.svg";
const imgTablerIconStrikethrough = "http://localhost:3845/assets/2ce2305ea8b962573f60e0b7f3db929b815a216d.svg";
const imgLine180 = "http://localhost:3845/assets/3579bb5816dcfb8ad8cec34a63e757dadb3af18b.svg";
const imgTablerIconAlignLeft = "http://localhost:3845/assets/1958436804ed78d5a48539bc5ee30508416177ec.svg";
const imgTablerIconAlignCenter = "http://localhost:3845/assets/4c8e6f0e74453bff611c837f8222d5bc1ce09318.svg";
const imgTablerIconAlignRight = "http://localhost:3845/assets/1f1737f280a66283c478c40464de3ad68f21e88c.svg";
const imgTablerIconPhoto = "http://localhost:3845/assets/fc538f485d08afce9065966af893cbfe90ab5b5d.svg";
const imgTablerIconTriangleSquareCircle = "http://localhost:3845/assets/a1276b76c15fe1091c13cebe529377af99dc0b51.svg";
const imgTablerIconLine = "http://localhost:3845/assets/e1bb298cc386ae6cf97f2bcb191e9a8d6b85d6bb.svg";

export const TableComponent: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [cellFormatting, setCellFormatting] = useState<Record<string, CellFormatting>>({});
  const { client } = useVeltClient();

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
    if (!selectedCell) return;

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
    if (!selectedCell) return;

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
    };
  };

  const getCellAlignment = (row: number, col: number): React.CSSProperties => {
    const cellKey = getCellKey(row, col);
    const formatting = cellFormatting[cellKey] || {};

    if (formatting.align) {
      return {
        display: 'flex',
        justifyContent: formatting.align === 'left' ? 'flex-start' : formatting.align === 'center' ? 'center' : 'flex-end',
        width: '100%',
      };
    }

    return {};
  };

  const isColumnSelected = (col: number) => {
    return selectedCell?.col === col;
  };

  const isRowSelected = (row: number) => {
    return selectedCell?.row === row;
  };

  return (
    <div style={styles.container}>
      {/* Breadcrumb Navigation */}
      <div style={styles.breadcrumb}>
        <div style={styles.breadcrumbItem}>
          <div style={styles.iconWrapper14}>
            <img alt="" style={styles.icon} src={imgFrame} />
          </div>
          <span style={styles.breadcrumbText}>FY2025</span>
        </div>
        <div style={styles.iconWrapper12}>
          <img alt="" style={styles.icon} src={imgTablerIconChevronRight} />
        </div>
        <div style={styles.breadcrumbItem}>
          <div style={styles.iconWrapper14}>
            <img alt="" style={styles.icon} src={imgFrame1} />
          </div>
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
              <div style={styles.iconWrapper20}>
                <img alt="Bold" style={styles.icon} src={imgTablerIconBold} />
              </div>
            </button>
            <button style={styles.toolButton} onClick={() => toggleFormatting('italic')}>
              <div style={styles.iconWrapper20}>
                <img alt="Italic" style={styles.icon} src={imgTablerIconItalic} />
              </div>
            </button>
            <button style={styles.toolButton} onClick={() => toggleFormatting('underline')}>
              <div style={styles.iconWrapper20}>
                <img alt="Underline" style={styles.icon} src={imgTablerIconUnderline} />
              </div>
            </button>
            <button style={styles.toolButton} onClick={() => toggleFormatting('strikethrough')}>
              <div style={styles.iconWrapper20}>
                <img alt="Strikethrough" style={styles.icon} src={imgTablerIconStrikethrough} />
              </div>
            </button>
          </div>

          <div style={styles.toolbarDividerWrapper}>
            <div style={styles.toolbarDividerInner} />
          </div>

          <div style={styles.toolbarSection}>
            <button style={styles.toolButtonRounded} onClick={() => setAlignment('left')}>
              <div style={styles.iconWrapper20}>
                <img alt="Align Left" style={styles.icon} src={imgTablerIconAlignLeft} />
              </div>
            </button>
            <button style={styles.toolButtonRounded} onClick={() => setAlignment('center')}>
              <div style={styles.iconWrapper20}>
                <img alt="Align Center" style={styles.icon} src={imgTablerIconAlignCenter} />
              </div>
            </button>
            <button style={styles.toolButtonRounded} onClick={() => setAlignment('right')}>
              <div style={styles.iconWrapper20}>
                <img alt="Align Right" style={styles.icon} src={imgTablerIconAlignRight} />
              </div>
            </button>
          </div>

          <div style={styles.toolbarDividerWrapper}>
            <div style={styles.toolbarDividerInner} />
          </div>

          <div style={styles.toolbarSection}>
            <button style={styles.toolButtonRounded} onClick={handlePhotoInsert}>
              <div style={styles.iconWrapper20}>
                <img alt="Photo" style={styles.icon} src={imgTablerIconPhoto} />
              </div>
            </button>
            <button style={styles.toolButtonRounded} onClick={handleShapesInsert}>
              <div style={styles.iconWrapper20}>
                <img alt="Shapes" style={styles.icon} src={imgTablerIconTriangleSquareCircle} />
              </div>
            </button>
            <button style={styles.toolButtonRounded} onClick={handleLineInsert}>
              <div style={styles.iconWrapper20}>
                <img alt="Line" style={styles.icon} src={imgTablerIconLine} />
              </div>
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
                onClick={() => handleCellClick(0, 0)}
              >
                <div style={getCellStyle(0, 0, styles.columnTitleDiv)}>
                  <p style={styles.columnTitleP}>Dates</p>
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
                onClick={() => handleCellClick(0, 1)}
              >
                <div style={getCellStyle(0, 1, styles.columnTitleDiv)}>
                  <p style={styles.columnTitleP}>X</p>
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
                onClick={() => handleCellClick(0, 2)}
              >
                <div style={getCellStyle(0, 2, styles.columnTitleDiv)}>
                  <p style={styles.columnTitleP}>LinkedIn</p>
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
                onClick={() => handleCellClick(0, 3)}
              >
                <div style={getCellStyle(0, 3, styles.columnTitleDiv)}>
                  <p style={styles.columnTitleP}>Twitter</p>
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
                onClick={() => handleCellClick(0, 4)}
              >
                <div style={getCellStyle(0, 4, styles.columnTitleDiv)}>
                  <p style={styles.columnTitleP}>Instagram</p>
                </div>
                <div className="comment-tool-wrapper">
                  <VeltCommentTool targetCommentElementId="cell-0-4" />
                </div>
              </div>
            </div>

            {/* Data Rows */}
            {tableData.map((row, index) => {
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
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                    onClick={() => handleCellClick(rowNum, 0)}
                  >
                    <div style={getCellStyle(rowNum, 0, styles.cellTextDiv)}>
                      <p style={styles.cellTextP}>{row.date}</p>
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
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                    onClick={() => handleCellClick(rowNum, 1)}
                  >
                    <div style={getCellStyle(rowNum, 1, styles.cellTextDiv)}>
                      <p style={styles.cellTextP}>{row.x}</p>
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
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                    onClick={() => handleCellClick(rowNum, 2)}
                  >
                    <div style={getCellStyle(rowNum, 2, styles.cellTextDiv)}>
                      <p style={styles.cellTextP}>{row.linkedin}</p>
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
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                    onClick={() => handleCellClick(rowNum, 3)}
                  >
                    <div style={getCellStyle(rowNum, 3, styles.cellTextDiv)}>
                      <p style={styles.cellTextP}>{row.twitter}</p>
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
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                    onClick={() => handleCellClick(rowNum, 4)}
                  >
                    <div style={getCellStyle(rowNum, 4, styles.cellTextDiv)}>
                      <p style={styles.cellTextP}>{row.instagram}</p>
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
    minHeight: '100vh',
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
    display: 'flex',
    justifyContent: 'center',
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
    minHeight: '1px',
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
    minHeight: '1px',
    border: '1px solid #141414',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    flexShrink: 0,
  },
  rowNumberCell: {
    flexGrow: 0,
    flexBasis: 'auto',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 0,
    color: '#ffffff',
    letterSpacing: '0.14px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  columnTitleP: {
    lineHeight: '16px',
    whiteSpace: 'pre',
    margin: 0,
  },
  cellTextDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Urbanist, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 0,
    color: '#ffffff',
    letterSpacing: '0.14px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    opacity: 0.8,
  },
  cellTextP: {
    lineHeight: '16px',
    whiteSpace: 'pre',
    margin: 0,
  },
  selectedCell: {
    border: '1px solid rgb(255, 205, 46)',
  },
};

export default TableComponent;
