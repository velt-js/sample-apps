<template>
  <VeltInitializeUser />
  <VeltCollaboration />
  <DocumentCanvas />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initVelt } from '@veltdev/client';
import { useVeltClient } from '@/composables/useVeltClient';
import { provideAppUser } from '@/composables/useAppUser';
import VeltInitializeUser from '@/components/velt/VeltInitializeUser.vue';
import VeltCollaboration from '@/components/velt/VeltCollaboration.vue';
import DocumentCanvas from '@/components/document/DocumentCanvas.vue';

// [Velt] Replace with your own API key from https://console.velt.dev
const VELT_API_KEY = '6xTcUFtlYAlCdh11zrKB';

const { setClient } = useVeltClient();

// Provide app user context
provideAppUser();

// [Velt] Initialize Velt client
onMounted(async () => {
  const client = await initVelt(VELT_API_KEY);
  setClient(client);
});
</script>
