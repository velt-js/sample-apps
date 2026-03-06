import { ref, computed } from 'vue';

export function useCurrentDocument() {
  const documentId = ref<string | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  let docId = urlParams.get('documentId');

  if (docId) {
    documentId.value = docId;
    localStorage.setItem('ag-grid-document-id', docId);
  } else {
    const stored = localStorage.getItem('ag-grid-document-id');
    if (stored) {
      docId = stored;
    } else {
      docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('ag-grid-document-id', docId);
    }

    const newUrl = `${window.location.pathname}?documentId=${docId}`;
    window.history.pushState({}, '', newUrl);
    documentId.value = docId;
  }

  const documentName = computed(() => 'AG Grid Table');

  return {
    documentId,
    documentName,
  };
}
