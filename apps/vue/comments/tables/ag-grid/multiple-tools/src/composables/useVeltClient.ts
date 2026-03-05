import { ref, type Ref } from 'vue';

// Shared Velt client instance across the app
const veltClient: Ref<any> = ref(null);

export function useVeltClient() {
  function setClient(client: any) {
    veltClient.value = client;
  }

  return {
    client: veltClient,
    setClient,
  };
}
