import { ref, provide, inject, type InjectionKey, type Ref } from 'vue';

interface SidebarContext {
  isCollapsed: Ref<boolean>;
  toggleSidebar: () => void;
}

const SidebarKey: InjectionKey<SidebarContext> = Symbol('Sidebar');

export function provideSidebar() {
  const isCollapsed = ref(true);

  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
  }

  const ctx: SidebarContext = { isCollapsed, toggleSidebar };
  provide(SidebarKey, ctx);
  return ctx;
}

export function useSidebar() {
  const ctx = inject(SidebarKey);
  if (!ctx) throw new Error('useSidebar must be used within provideSidebar');
  return ctx;
}
