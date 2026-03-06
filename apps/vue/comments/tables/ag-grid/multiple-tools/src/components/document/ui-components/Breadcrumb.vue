<template>
  <div :style="{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    alignSelf: 'flex-start',
  }">
    <div :style="{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
    }">
      <IconFolder :size="14" stroke="1.5" color="rgba(255, 255, 255, 0.52)" />
      <span :style="{
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: 1.1,
        color: 'rgba(255, 255, 255, 0.52)',
        whiteSpace: 'pre',
      }">FY2025</span>
    </div>
    <IconChevronRight :size="12" stroke="1.5" color="rgba(255, 255, 255, 0.52)" />
    <div :style="{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
    }">
      <IconFolder :size="14" stroke="1.5" color="rgba(255, 255, 255, 0.52)" />
      <span :style="{
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: 1.1,
        color: 'rgba(255, 255, 255, 0.52)',
        whiteSpace: 'pre',
      }">Marketing Spend</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFolder, IconChevronRight } from '@tabler/icons-vue';
</script>
