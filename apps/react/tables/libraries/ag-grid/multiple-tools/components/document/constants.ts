import { themeQuartz } from 'ag-grid-community';

// Create custom dark theme
export const customDarkTheme = themeQuartz.withParams({
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

export const COLUMN_TITLES: Record<string, string> = {
  date: 'Dates',
  x: 'X',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
};
