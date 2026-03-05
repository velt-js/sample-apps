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

// [Velt] Identify user with Velt when both client and user are available
watch(
  [client, user],
  async ([veltClient, appUser]) => {
    if (!veltClient || !appUser) return;

    try {
      const authToken = await getVeltAuthToken({
        userId: appUser.userId,
        organizationId: appUser.organizationId,
        email: appUser.email,
        isAdmin: false,
      });

      veltClient.identify(appUser, { authToken });
    } catch (err) {
      console.error('Failed to identify user with Velt:', err);
    }
  },
  { immediate: true }
);
</script>
