// SpreadJS workbook configuration

// XLSX workbook loaded into the viewer. Self-hosted in /public because MESCIUS
// does not publish a stable public sample-xlsx URL.
export const SAMPLE_XLSX = '/sample.xlsx'

// Deterministic workbook used when the URL carries `?testDoc=1`.
export const TEST_XLSX = '/velt-test-document.xlsx'

// [Velt] Editor id used to scope comment annotations to this viewer instance.
export const EDITOR_ID = 'spreadjs'

export const SHEET_NAV_ITEMS = [
  { id: 'sheet-sales', label: 'Sales', sheetName: 'Sales' },
  { id: 'sheet-summary', label: 'Summary', sheetName: 'Summary' },
] as const
