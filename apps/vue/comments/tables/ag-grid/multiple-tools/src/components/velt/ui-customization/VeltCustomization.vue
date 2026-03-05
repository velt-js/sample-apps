<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useVeltClient } from '@/composables/useVeltClient';
import './styles.css';

const { client } = useVeltClient();

// [Velt] Enable dark mode
watch(
  client,
  (veltClient) => {
    if (veltClient) {
      veltClient.setDarkMode(true);
    }
  },
  { immediate: true }
);
</script>
