<template>
  <!-- [Velt] Wireframe customization container -->
  <velt-wireframe>
    <VeltCommentBubbleWf />
    <VeltCommentToolWf />
    <VeltNotificationsToolWf />
    <VeltSidebarButtonWf />
  </velt-wireframe>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useVeltClient } from '@/composables/useVeltClient';
import VeltCommentBubbleWf from './VeltCommentBubbleWf.vue';
import VeltCommentToolWf from './VeltCommentToolWf.vue';
import VeltNotificationsToolWf from './VeltNotificationsToolWf.vue';
import VeltSidebarButtonWf from './VeltSidebarButtonWf.vue';
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
