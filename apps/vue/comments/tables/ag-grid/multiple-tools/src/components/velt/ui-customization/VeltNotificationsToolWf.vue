<template>
  <!-- [Velt] Custom wireframe for notifications tool UI -->
  <velt-notifications-tool-wireframe>
    <div
      :style="{
        background: 'var(--app-border)',
        borderRadius: '23.333px',
        padding: '5.833px 4px 5.833px 7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3.889px',
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
          src="/icons/bell-icon.svg"
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
        <velt-notifications-tool-unread-count-wireframe></velt-notifications-tool-unread-count-wireframe>
      </div>
    </div>
  </velt-notifications-tool-wireframe>
</template>
