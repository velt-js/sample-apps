<template>
  <!-- [Velt] Custom wireframe for sidebar button UI -->
  <velt-sidebar-button-wireframe>
    <div
      :style="{
        background: 'var(--app-border)',
        borderRadius: '24px',
        padding: '6px 7px 6px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '28px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        flexShrink: 0
      }"
    >
      <div
        :style="{
          width: '19.444px',
          height: '19.444px',
          position: 'relative',
          flexShrink: 0
        }"
      >
        <img
          src="/icons/inbox-icon.svg"
          alt=""
          :style="{
            width: '100%',
            height: '100%',
            display: 'block',
            filter: 'var(--app-icon-invert)'
          }"
        />
      </div>
      <div
        :style="{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '1.5',
          color: 'var(--app-text-primary)',
          whiteSpace: 'pre',
          flexShrink: 0
        }"
      >
        <velt-sidebar-button-comments-count-wireframe></velt-sidebar-button-comments-count-wireframe>
      </div>
    </div>
  </velt-sidebar-button-wireframe>
</template>
