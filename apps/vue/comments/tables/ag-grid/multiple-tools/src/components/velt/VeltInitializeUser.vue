<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useVeltClient } from '@/composables/useVeltClient';
import { useAppUser } from '@/composables/useAppUser';
import { getVeltAuthToken } from '@/api/veltToken';

const { client } = useVeltClient();
const { user } = useAppUser();

// [Velt] Create auth provider object and pass it to the Velt client
watch(
  [client, user],
  ([veltClient, appUser]) => {
    if (!veltClient || !appUser) return;

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
  },
  { immediate: true }
);
</script>
