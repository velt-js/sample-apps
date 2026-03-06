<template>
  <template v-if="client">
    <!-- [Velt] Show online users -->
    <velt-presence></velt-presence>
    <!-- [Velt] Toggle comments sidebar -->
    <velt-sidebar-button></velt-sidebar-button>
    <!-- [Velt] Notifications panel -->
    <velt-notifications-tool
      settings="true"
      shadow-dom="false"
      tab-config='{"forYou":{"name":"For You","enable":true},"documents":{"name":"Documents","enable":true},"all":{"name":"All","enable":true}}'
    ></velt-notifications-tool>
  </template>
</template>

<script setup lang="ts">
import { useVeltClient } from '@/composables/useVeltClient';

const { client } = useVeltClient();
</script>
