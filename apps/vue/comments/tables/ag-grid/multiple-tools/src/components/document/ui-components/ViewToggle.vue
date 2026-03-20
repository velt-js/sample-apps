<template>
  <div :style="{
    position: 'absolute',
    left: '12px',
    top: '14px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    zIndex: 10,
  }">
    <div :style="{
      backgroundColor: 'var(--app-toggle-active-bg)',
      border: 'none',
      borderRadius: '8px',
      padding: '4px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }">
      <span :style="{
        fontFamily: 'Urbanist, sans-serif',
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '16px',
        color: 'var(--app-text-primary)',
        whiteSpace: 'pre',
        letterSpacing: '0.13px',
      }">Day View</span>
    </div>
  </div>
</template>
