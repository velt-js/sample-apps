import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: [
      '@codemirror/state',
      '@codemirror/view',
      '@codemirror/language',
    ],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      '@veltdev/client',
      '@veltdev/codemirror-crdt',
      'codemirror',
      '@codemirror/state',
      '@codemirror/view',
      '@codemirror/language',
      '@codemirror/lang-javascript',
      '@codemirror/lang-css',
      '@codemirror/lang-html',
      '@codemirror/theme-one-dark',
      'y-codemirror.next',
      'yjs',
    ],
  },
});
