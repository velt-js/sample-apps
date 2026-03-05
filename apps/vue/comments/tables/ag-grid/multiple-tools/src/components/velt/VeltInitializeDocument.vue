<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useVeltClient } from '@/composables/useVeltClient';
import { useAppUser } from '@/composables/useAppUser';
import { useCurrentDocument } from '@/composables/useCurrentDocument';

const { client } = useVeltClient();
const { user } = useAppUser();
const { documentId, documentName } = useCurrentDocument();

// [Velt] Set document in Velt when user is authenticated and document ID is ready
watch(
  [client, user, documentId],
  ([veltClient, appUser, docId]) => {
    if (!veltClient || !appUser || !docId) return;

    veltClient.setDocumentId(docId, { documentName: documentName.value });
  },
  { immediate: true }
);
</script>
