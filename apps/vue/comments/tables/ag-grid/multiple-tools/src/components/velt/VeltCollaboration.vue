<template>
  <VeltInitializeDocument />
  <!-- [Velt] Comments with popover mode -->
  <velt-comments
    popover-mode="true"
    shadow-dom="false"
    text-mode="false"
    comment-pin-highlighter="false"
    dialog-on-hover="false"
  ></velt-comments>
  <!-- [Velt] Comments sidebar -->
  <velt-comments-sidebar group-config='{"enable": false}'></velt-comments-sidebar>
  <VeltCustomization />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useVeltClient } from '@/composables/useVeltClient';
import { useAppUser } from '@/composables/useAppUser';
import VeltInitializeDocument from './VeltInitializeDocument.vue';
import VeltCustomization from './ui-customization/VeltCustomization.vue';

const { client } = useVeltClient();
const { isUserLoggedIn } = useAppUser();

// [Velt] Sign out user when user logs out
watch(
  [isUserLoggedIn, client],
  ([loggedIn, veltClient]) => {
    if (loggedIn === false && veltClient) {
      veltClient.signOutUser();
    }
  }
);
</script>
