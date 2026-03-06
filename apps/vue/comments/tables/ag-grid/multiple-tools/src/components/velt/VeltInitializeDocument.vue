<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useVeltClient } from '@/composables/useVeltClient';
import { useAppUser } from '@/composables/useAppUser';
import { useCurrentDocument } from '@/composables/useCurrentDocument';

const { client } = useVeltClient();
const { user } = useAppUser();
const { documentId, documentName } = useCurrentDocument();

// [Velt] Wait for Velt user to be authenticated before setting document
const veltUser = ref<any>(null);
let userSub: any = null;

watch(
  client,
  (veltClient) => {
    userSub?.unsubscribe();
    if (!veltClient) return;
    userSub = veltClient.getCurrentUser().subscribe((u: any) => {
      veltUser.value = u;
    });
  },
  { immediate: true }
);

onUnmounted(() => userSub?.unsubscribe());

// [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
let lastSetDocId: string | null = null;

watch(
  [client, veltUser, user, documentId],
  ([veltClient, authUser, appUser, docId]) => {
    if (!veltClient || !authUser || !appUser || !docId) return;
    if (docId === lastSetDocId) return;

    lastSetDocId = docId;
    veltClient.setDocuments([
      { id: docId, metadata: { documentName: documentName.value } },
    ]);
  },
  { immediate: true }
);
</script>
