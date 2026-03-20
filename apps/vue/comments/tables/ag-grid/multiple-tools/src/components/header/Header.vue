<template>
  <div
    class="absolute top-0 right-0 z-50"
    :style="{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
      padding: '16px',
    }"
  >
    <ThemeToggle />
    <VeltTools />
  </div>
</template>

<script setup lang="ts">
import VeltTools from '@/components/velt/VeltTools.vue';
import ThemeToggle from '@/components/theme/ThemeToggle.vue';
</script>
