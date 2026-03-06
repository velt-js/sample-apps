<template>
  <div
    @click="handleSort"
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
      padding: '4px 12px 4px 12px',
      gap: '8px',
      cursor: 'pointer',
    }"
  >
    <span
      :style="{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'Urbanist, sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        color: '#ffffff',
        letterSpacing: '0.14px',
      }"
    >
      {{ title }}
      <SortIcon :direction="currentSort" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SortIcon from './SortIcon.vue';
import { COLUMN_TITLES } from '../constants';

// AG Grid Vue passes everything (including headerComponentParams) merged into `params`
const props = defineProps<{ params: any }>();

const title = computed(() => COLUMN_TITLES[props.params.column.colId] || '');

const currentSort = computed(() => {
  const sortState = props.params.localSortState;
  return sortState?.colId === props.params.column.colId ? sortState.sort : null;
});

function handleSort() {
  const colId = props.params.column.colId;
  const sortState = props.params.localSortState;
  const current = sortState?.colId === colId ? sortState?.sort : null;
  const newSort: 'asc' | 'desc' = current === 'asc' ? 'desc' : 'asc';

  props.params.setLocalSortState({ colId, sort: newSort });

  props.params.api.applyColumnState({
    state: [{ colId, sort: newSort }],
    defaultState: { sort: null },
  });
}
</script>
