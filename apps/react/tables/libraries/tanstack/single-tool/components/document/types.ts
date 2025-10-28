export interface TableData {
  id: number;
  date: string;
  x: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  dateMetadata?: {
    day: number;
    month: number;
    year: number;
  };
}

export interface CellFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface SelectedCell {
  row: number; // Row ID (data.id)
  col: string; // Column field name
}

export interface SortState {
  colId: string;
  sort: 'asc' | 'desc';
}
