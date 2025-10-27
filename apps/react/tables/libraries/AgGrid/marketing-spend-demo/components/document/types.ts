export interface TableData {
  id: number;
  date: string;
  x: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  dateMetadata?: {
    day: number;             // 1-31
    month: number;           // 1-12
    year: number;            // 2025
    week: number;            // ISO week number (1-53)
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

export type ViewType = 'day' | 'week' | 'month';

export interface CommentContext {
  channel: string;           // "linkedin" | "facebook" | "instagram" | "x"
  day?: number;              // Only in day view
  week?: number;             // In day & week views
  month: number;
  year: number;
}
