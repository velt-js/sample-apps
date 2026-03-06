<template>
  <VeltInitializeUser />
  <VeltCollaboration v-if="client" />
  <DocumentCanvas />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initVelt } from '@veltdev/client';
import { useVeltClient } from '@/composables/useVeltClient';
import { provideAppUser } from '@/composables/useAppUser';
import { getVeltAuthToken } from '@/api/veltToken';
import VeltInitializeUser from '@/components/velt/VeltInitializeUser.vue';
import VeltCollaboration from '@/components/velt/VeltCollaboration.vue';
import DocumentCanvas from '@/components/document/DocumentCanvas.vue';

// [Velt] Replace with your own API key from https://console.velt.dev
const VELT_API_KEY = '6xTcUFtlYAlCdh11zrKB';

const { client, setClient } = useVeltClient();

// Provide app user context
const { user } = provideAppUser();

// [Velt] Initialize Velt client
onMounted(async () => {
  const veltClient = await initVelt(VELT_API_KEY);

  // [Velt] Set auth provider with user and token generator
  const appUser = user.value;
  if (appUser) {
    veltClient.setVeltAuthProvider({
      user: appUser,
      retryConfig: { retryCount: 3, retryDelay: 1000 },
      generateToken: async () => {
        return await getVeltAuthToken({
          userId: appUser.userId,
          organizationId: appUser.organizationId,
          email: appUser.email,
          isAdmin: false,
        });
      },
    });
  }

  setClient(veltClient);
});
</script>
