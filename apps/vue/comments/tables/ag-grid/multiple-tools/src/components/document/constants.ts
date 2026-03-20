import { themeQuartz } from 'ag-grid-community';

const commonParams = {
  oddRowBackgroundColor: 'transparent',
  rowBorder: true,
  columnBorder: true,
  cellHorizontalPadding: 4,
  fontFamily: 'Urbanist, sans-serif',
  fontSize: 14,
  headerHeight: 54,
  rowHeight: 54,
  spacing: 0,
}

export const customLightTheme = themeQuartz.withParams({
  ...commonParams,
  backgroundColor: '#f5f5f5',
  foregroundColor: 'rgba(0, 0, 0, 0.8)',
  headerBackgroundColor: '#f5f5f5',
  headerTextColor: '#000000',
  rowHoverColor: 'rgba(0, 0, 0, 0.04)',
  borderColor: '#e0e0e0',
})

// Create custom dark theme
export const customDarkTheme = themeQuartz.withParams({
  ...commonParams,
  backgroundColor: '#090909',
  foregroundColor: 'rgba(255, 255, 255, 0.8)',
  headerBackgroundColor: '#090909',
  headerTextColor: '#ffffff',
  rowHoverColor: 'rgba(255, 255, 255, 0.05)',
  borderColor: '#141414',
});

export const COLUMN_TITLES: Record<string, string> = {
  date: 'Dates',
  x: 'X',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
};
