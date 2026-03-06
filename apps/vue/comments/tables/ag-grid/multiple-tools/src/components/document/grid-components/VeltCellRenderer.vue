<template>
  <div
    ref="cellRef"
    :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%' }"
  >
    <span :style="{ ...textStyle, paddingLeft: '12px' }">{{ params.value }}</span>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }">
      <!-- [Velt] velt-comment-tool renders a button that allows users to add comments to this specific cell -->
      <!-- [Velt] target-element-id references the parent AG Grid cell with the ID set above -->
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

const props = defineProps<{ params: any }>();

const cellRef = ref<HTMLDivElement | null>(null);
const isHovered = ref(false);

const cellId = computed(() => `cell-${props.params.data.id}-${props.params.colDef.field}`);
const cellKey = computed(() => getCellFormattingKey(props.params.data.id, props.params.colDef.field));

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

// [Velt] Set ID on parent AG Grid cell element and add hover listeners to the cell
onMounted(() => {
  requestAnimationFrame(() => {
    if (!cellRef.value) return;
    parentCell = cellRef.value.closest('.ag-cell');
    if (parentCell) {
      if (parentCell.id !== cellId.value) {
        parentCell.id = cellId.value;
      }
      parentCell.addEventListener('mouseenter', handleMouseEnter);
      parentCell.addEventListener('mouseleave', handleMouseLeave);
    }
  });
});

onUnmounted(() => {
  if (parentCell) {
    parentCell.removeEventListener('mouseenter', handleMouseEnter);
    parentCell.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>
