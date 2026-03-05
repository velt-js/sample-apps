<template>
  <div :style="styles.container">
    <Breadcrumb />

    <div :style="styles.tableContainer">
      <ViewToggle />

      <Toolbar @toggle-formatting="toggleFormatting" />

      <div :style="styles.gridWrapper">
        <ag-grid-vue
          :theme="customDarkTheme"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :domLayout="'normal'"
          :enableCellTextSelection="true"
          :ensureDomOrder="true"
          :animateRows="false"
          :suppressRowHoverHighlight="false"
          :suppressAnimationFrame="false"
          :suppressCellFocus="false"
          :getRowId="getRowId"
          @grid-ready="onGridReady"
          @sort-changed="onSortChanged"
          @cell-clicked="onCellClicked"
          @cell-value-changed="onCellValueChanged"
          style="width: 100%; height: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, markRaw } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './day-view-table-component.css';

import { customDarkTheme } from './constants';
import { dateComparator } from './utils';
import CustomHeaderComponent from './grid-components/CustomHeaderComponent.vue';
import RowNumberRenderer from './grid-components/RowNumberRenderer.vue';
import RowNumberHeaderComponent from './grid-components/RowNumberHeaderComponent.vue';
import VeltCellRenderer from './grid-components/VeltCellRenderer.vue';
import Breadcrumb from './ui-components/Breadcrumb.vue';
import ViewToggle from './ui-components/ViewToggle.vue';
import Toolbar from './ui-components/Toolbar.vue';
import { styles } from './styles';
import { useTableState } from '@/composables/useTableState';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const {
  selectedCell,
  rowData,
  cellFormatting,
  gridApi,
  sortState,
  localSortState,
  toggleFormatting,
} = useTableState();

// Sync localSortState with sortState
watch(sortState, (newVal) => {
  if (newVal) {
    localSortState.value = newVal;
  }
});

// Update header highlighting when selection changes
watch(selectedCell, (newSelectedCell) => {
  if (gridApi.value) {
    document.querySelectorAll('.ag-header-cell').forEach(el => {
      el.classList.remove('header-selected');
    });
    document.querySelectorAll('.ag-pinned-left-cols-container .ag-cell').forEach(el => {
      el.classList.remove('row-selected');
    });

    if (newSelectedCell) {
      const colElement = document.querySelector(`[col-id="${newSelectedCell.col}"]`);
      if (colElement) {
        colElement.classList.add('header-selected');
      }

      const allCells = document.querySelectorAll('.ag-pinned-left-cols-container .ag-cell');
      allCells.forEach(cell => {
        const row = cell.closest('.ag-row');
        if (row) {
          const rowNode = gridApi.value.getRowNode(newSelectedCell.row.toString());
          if (rowNode && row.getAttribute('row-id') === newSelectedCell.row.toString()) {
            cell.classList.add('row-selected');
          }
        }
      });
    }
  }
});

function setLocalSort(state: any) {
  localSortState.value = state;
}

const columnDefs = computed(() => [
  {
    headerName: '',
    field: 'rowNumber' as any,
    width: 50,
    pinned: 'left' as const,
    lockPosition: true,
    suppressHeaderMenuButton: true,
    sortable: false,
    editable: false,
    cellRenderer: markRaw(RowNumberRenderer),
    headerComponent: markRaw(RowNumberHeaderComponent),
    cellStyle: {
      backgroundColor: '#090909',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  {
    field: 'date' as any,
    headerName: 'Dates',
    headerComponent: markRaw(CustomHeaderComponent),
    headerComponentParams: {
      localSortState: localSortState.value,
      setLocalSortState: setLocalSort,
    },
    editable: true,
    sortable: true,
    comparator: dateComparator,
    cellRenderer: markRaw(VeltCellRenderer),
    cellRendererParams: {
      cellFormatting: cellFormatting.value,
    },
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'x' as any,
    headerName: 'X',
    headerComponent: markRaw(CustomHeaderComponent),
    headerComponentParams: {
      localSortState: localSortState.value,
      setLocalSortState: setLocalSort,
    },
    editable: true,
    sortable: true,
    cellRenderer: markRaw(VeltCellRenderer),
    cellRendererParams: {
      cellFormatting: cellFormatting.value,
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'linkedin' as any,
    headerName: 'LinkedIn',
    headerComponent: markRaw(CustomHeaderComponent),
    headerComponentParams: {
      localSortState: localSortState.value,
      setLocalSortState: setLocalSort,
    },
    editable: true,
    sortable: true,
    cellRenderer: markRaw(VeltCellRenderer),
    cellRendererParams: {
      cellFormatting: cellFormatting.value,
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'facebook' as any,
    headerName: 'Facebook',
    headerComponent: markRaw(CustomHeaderComponent),
    headerComponentParams: {
      localSortState: localSortState.value,
      setLocalSortState: setLocalSort,
    },
    editable: true,
    sortable: true,
    cellRenderer: markRaw(VeltCellRenderer),
    cellRendererParams: {
      cellFormatting: cellFormatting.value,
    },
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'instagram' as any,
    headerName: 'Instagram',
    headerComponent: markRaw(CustomHeaderComponent),
    headerComponentParams: {
      localSortState: localSortState.value,
      setLocalSortState: setLocalSort,
    },
    editable: true,
    sortable: true,
    cellRenderer: markRaw(VeltCellRenderer),
    cellRendererParams: {
      cellFormatting: cellFormatting.value,
    },
    flex: 1,
    minWidth: 120,
  },
]);

const defaultColDef = {
  resizable: true,
  sortable: true,
  editable: true,
};

function getRowId(params: any) {
  return params.data.id.toString();
}

function onGridReady(params: any) {
  gridApi.value = params.api;
  params.api.applyColumnState({
    state: [{ colId: 'date', sort: 'asc' }],
    defaultState: { sort: null },
  });
  sortState.value = { colId: 'date', sort: 'asc' };
  localSortState.value = { colId: 'date', sort: 'asc' };
}

function onSortChanged(params: any) {
  const columnState = params.api.getColumnState();
  const sortedColumn = columnState.find((col: any) => col.sort !== null);
  sortState.value = sortedColumn ? { colId: sortedColumn.colId, sort: sortedColumn.sort } : null;
}

function onCellClicked(params: any) {
  if (params.data) {
    selectedCell.value = {
      row: params.data.id,
      col: params.colDef.field,
    };
  }
}

function onCellValueChanged(params: any) {
  const idx = rowData.value.findIndex(row => row.id === params.data.id);
  if (idx !== -1) {
    rowData.value[idx] = { ...params.data };
  }
}
</script>
