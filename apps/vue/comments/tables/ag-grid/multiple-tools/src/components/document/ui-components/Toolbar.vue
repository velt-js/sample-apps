<template>
  <div :style="{
    position: 'absolute',
    right: '8.67px',
    top: '8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    zIndex: 10,
  }">
    <div :style="{ display: 'flex', gap: '0px' }">
      <button :style="toolButton" @click="$emit('toggleFormatting', 'bold')">
        <IconBold :size="20" stroke="1.5" :style="{ color: 'var(--app-text-secondary)' }" />
      </button>
      <button :style="toolButton" @click="$emit('toggleFormatting', 'italic')">
        <IconItalic :size="20" stroke="1.5" :style="{ color: 'var(--app-text-secondary)' }" />
      </button>
      <button :style="toolButton" @click="$emit('toggleFormatting', 'underline')">
        <IconUnderline :size="20" stroke="1.5" :style="{ color: 'var(--app-text-secondary)' }" />
      </button>
      <button :style="toolButton" @click="$emit('toggleFormatting', 'strikethrough')">
        <IconStrikethrough :size="20" stroke="1.5" :style="{ color: 'var(--app-text-secondary)' }" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
} from '@tabler/icons-vue';

import type { CellFormatting } from '../types';

defineEmits<{
  toggleFormatting: [format: keyof CellFormatting];
}>();

const toolButton = {
  backgroundColor: 'transparent',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '8px',
  flexShrink: 0,
};
</script>
