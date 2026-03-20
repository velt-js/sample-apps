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
import { useTheme } from '@/composables/useTheme';
import VeltCommentBubbleWf from './VeltCommentBubbleWf.vue';
import VeltCommentToolWf from './VeltCommentToolWf.vue';
import VeltNotificationsToolWf from './VeltNotificationsToolWf.vue';
import VeltSidebarButtonWf from './VeltSidebarButtonWf.vue';
import './styles.css';

const { client } = useVeltClient();
const { resolvedTheme } = useTheme();

watch(
  [client, resolvedTheme],
  ([veltClient, theme]) => {
    if (veltClient) {
      veltClient.setDarkMode(theme === 'dark');
    }
  },
  { immediate: true }
);
</script>
