<template>
  <div :style="{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'var(--app-surface)',
    borderRadius: '8px',
    padding: '2px',
    gap: '2px',
  }">
    <button
      v-for="opt in options"
      :key="opt.value"
      @click="setTheme(opt.value)"
      :title="opt.label"
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '28px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: theme === opt.value ? 'var(--app-toggle-active-bg)' : 'transparent',
        color: theme === opt.value ? 'var(--app-text-primary)' : 'var(--app-text-tertiary)',
        transition: 'background-color 0.15s, color 0.15s',
      }"
    >
      <component :is="opt.icon" :size="16" :stroke-width="1.5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-vue'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const options = [
  { value: 'light' as const, icon: IconSun, label: 'Light' },
  { value: 'dark' as const, icon: IconMoon, label: 'Dark' },
  { value: 'system' as const, icon: IconDeviceDesktop, label: 'System' },
]
</script>
