<template>
  <svg v-if="direction === 'asc'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="#FFCD2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else-if="direction === 'desc'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="#FFCD2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="white" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 9L7 5M7 5L11 9M7 5V19" stroke="black" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="white" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21 15L17 19M17 19L13 15M17 19V5" stroke="black" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  direction: 'asc' | 'desc' | null;
}>();
</script>
