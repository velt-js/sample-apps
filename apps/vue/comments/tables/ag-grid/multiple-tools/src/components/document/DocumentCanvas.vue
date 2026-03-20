<template>
  <div class="flex w-full h-screen overflow-hidden" :style="{ backgroundColor: 'var(--app-bg)' }">
    <Sidebar />
    <div class="flex-1 overflow-auto relative">
      <Header />
      <DayViewTableComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/Header.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import DayViewTableComponent from './DayViewTableComponent.vue';
import { provideSidebar } from '@/composables/useSidebar';

provideSidebar();
</script>
