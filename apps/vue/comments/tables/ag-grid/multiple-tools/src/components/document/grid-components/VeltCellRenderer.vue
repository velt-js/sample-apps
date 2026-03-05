<template>
  <div
    ref="cellRef"
    :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }"
  >
    <span :style="{ ...textStyle, paddingLeft: '12px' }">{{ params.value }}</span>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }">
      <!-- [Velt] Comment tool only appears on hover over the entire cell -->
      <velt-comment-tool
        v-if="isHovered"
        :target-element-id="cellId"
      ></velt-comment-tool>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { CellFormatting } from '../types';
import { getCellFormattingKey } from '../utils';

// AG Grid Vue passes everything (including cellRendererParams) merged into `params`
const props = defineProps<{ params: any }>();

const cellRef = ref<HTMLDivElement | null>(null);
const isHovered = ref(false);

const cellId = computed(() => `cell-${props.params.data.id}-${props.params.colDef.field}`);
const cellKey = computed(() => getCellFormattingKey(props.params.data.id, props.params.colDef.field));

// cellFormatting comes from cellRendererParams, merged into params
const formatting = computed<CellFormatting>(() => {
  const cf = props.params.cellFormatting || {};
  return cf[cellKey.value] || {};
});

const textStyle = computed(() => ({
  fontWeight: formatting.value.bold ? 'bold' : 'normal',
  fontStyle: formatting.value.italic ? 'italic' : 'normal',
  textDecoration: [
    formatting.value.underline ? 'underline' : '',
    formatting.value.strikethrough ? 'line-through' : '',
  ].filter(Boolean).join(' ') || 'none',
}));

let parentCell: Element | null = null;
const handleMouseEnter = () => { isHovered.value = true; };
const handleMouseLeave = () => { isHovered.value = false; };

onMounted(() => {
  if (cellRef.value) {
    parentCell = cellRef.value.closest('.ag-cell');
    if (parentCell) {
      if (parentCell.id !== cellId.value) {
        parentCell.id = cellId.value;
      }
      parentCell.addEventListener('mouseenter', handleMouseEnter);
      parentCell.addEventListener('mouseleave', handleMouseLeave);
    }
  }
});

onUnmounted(() => {
  if (parentCell) {
    parentCell.removeEventListener('mouseenter', handleMouseEnter);
    parentCell.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>
