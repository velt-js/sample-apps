import { ref } from 'vue';
import type { TableData, CellFormatting, SelectedCell, SortState } from '../components/document/types';
import { generateTableData, getCellFormattingKey } from '../components/document/utils';

export function useTableState() {
  const selectedCell = ref<SelectedCell | null>(null);
  const rowData = ref<TableData[]>(generateTableData());
  const cellFormatting = ref<Record<string, CellFormatting>>({});
  const gridApi = ref<any>(null);
  const sortState = ref<SortState | null>(null);
  const localSortState = ref<SortState | null>(null);

  function toggleFormatting(format: keyof CellFormatting) {
    if (!selectedCell.value) return;
    if (format === 'align') return;

    const cellKey = getCellFormattingKey(selectedCell.value.row, selectedCell.value.col);
    const currentFormatting = cellFormatting.value[cellKey] || {};

    cellFormatting.value = {
      ...cellFormatting.value,
      [cellKey]: {
        ...currentFormatting,
        [format]: !currentFormatting[format as keyof CellFormatting],
      },
    };
  }

  function setAlignment(align: 'left' | 'center' | 'right') {
    if (!selectedCell.value) return;

    const cellKey = getCellFormattingKey(selectedCell.value.row, selectedCell.value.col);
    const currentFormatting = cellFormatting.value[cellKey] || {};

    cellFormatting.value = {
      ...cellFormatting.value,
      [cellKey]: {
        ...currentFormatting,
        align,
      },
    };
  }

  return {
    selectedCell,
    rowData,
    cellFormatting,
    gridApi,
    sortState,
    localSortState,
    toggleFormatting,
    setAlignment,
  };
}
