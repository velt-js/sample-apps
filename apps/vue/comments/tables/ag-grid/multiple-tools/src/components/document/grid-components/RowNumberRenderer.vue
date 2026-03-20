<template>
  <div :style="{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    color: 'var(--app-text-muted)',
    letterSpacing: '0.12px',
  }">
    {{ params.node.rowIndex + 1 }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ params: any }>();
</script>
