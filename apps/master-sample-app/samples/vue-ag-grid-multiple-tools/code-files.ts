import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/vue-ag-grid-multiple-tools.json'

// Import all code files using ?raw
import appVueContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/App.vue?raw'
import mainTsContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/main.ts?raw'
import veltTokenContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/api/veltToken.ts?raw'

// Composables
import useVeltClientContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/composables/useVeltClient.ts?raw'
import useTableStateContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/composables/useTableState.ts?raw'
import useSidebarContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/composables/useSidebar.ts?raw'
import useCurrentDocumentContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/composables/useCurrentDocument.ts?raw'
import useAppUserContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/composables/useAppUser.ts?raw'

// Velt Components
import veltCollaborationContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltCollaboration.vue?raw'
import veltInitializeUserContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltInitializeUser.vue?raw'
import veltInitializeDocumentContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltInitializeDocument.vue?raw'
import veltToolsContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltTools.vue?raw'

// Velt UI Customization
import veltCustomizationContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltCustomization.vue?raw'
import veltCommentToolWfContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltCommentToolWf.vue?raw'
import veltCommentBubbleWfContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltCommentBubbleWf.vue?raw'
import veltSidebarButtonWfContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltSidebarButtonWf.vue?raw'
import veltNotificationsToolWfContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltNotificationsToolWf.vue?raw'
import veltUiStylesContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/styles.css?raw'

// Document Components
import documentCanvasContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/DocumentCanvas.vue?raw'
import dayViewTableContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/DayViewTableComponent.vue?raw'
import dayViewTableCssContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/day-view-table-component.css?raw'
import typesContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/types.ts?raw'
import utilsContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/utils.ts?raw'
import constantsContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/constants.ts?raw'
import stylesContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/styles.ts?raw'

// Grid Components
import veltCellRendererContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/VeltCellRenderer.vue?raw'
import customHeaderComponentContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/CustomHeaderComponent.vue?raw'
import rowNumberRendererContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/RowNumberRenderer.vue?raw'
import rowNumberHeaderComponentContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/RowNumberHeaderComponent.vue?raw'
import sortIconContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/SortIcon.vue?raw'

// UI Components
import breadcrumbContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/ui-components/Breadcrumb.vue?raw'
import viewToggleContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/ui-components/ViewToggle.vue?raw'
import toolbarContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/document/ui-components/Toolbar.vue?raw'

// Header & Sidebar
import headerContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/header/Header.vue?raw'
import sidebarContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/components/sidebar/Sidebar.vue?raw'

// Global Styles
import globalsCssContent from '../../../vue/comments/tables/ag-grid/multiple-tools/src/styles/globals.css?raw'

export const codeFiles: SampleCodeFile[] = [
  // App Entry
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/App.vue', language: 'vue', content: codeContent.appVueContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/main.ts', language: 'typescript', content: codeContent.mainTsContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/api/veltToken.ts', language: 'typescript', content: codeContent.veltTokenContent },

  // Composables
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/composables/useVeltClient.ts', language: 'typescript', content: codeContent.useVeltClientContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/composables/useTableState.ts', language: 'typescript', content: codeContent.useTableStateContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/composables/useSidebar.ts', language: 'typescript', content: codeContent.useSidebarContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/composables/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/composables/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },

  // Velt Components
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltCollaboration.vue', language: 'vue', content: codeContent.veltCollaborationContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltInitializeUser.vue', language: 'vue', content: codeContent.veltInitializeUserContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltInitializeDocument.vue', language: 'vue', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/VeltTools.vue', language: 'vue', content: codeContent.veltToolsContent },

  // Velt UI Customization
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltCustomization.vue', language: 'vue', content: codeContent.veltCustomizationContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltCommentToolWf.vue', language: 'vue', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltCommentBubbleWf.vue', language: 'vue', content: codeContent.veltCommentBubbleWfContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltSidebarButtonWf.vue', language: 'vue', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/VeltNotificationsToolWf.vue', language: 'vue', content: codeContent.veltNotificationsToolWfContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/velt/ui-customization/styles.css', language: 'css', content: codeContent.veltUiStylesContent },

  // Document Components
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/DocumentCanvas.vue', language: 'vue', content: codeContent.documentCanvasContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/DayViewTableComponent.vue', language: 'vue', content: codeContent.dayViewTableContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/day-view-table-component.css', language: 'css', content: codeContent.dayViewTableCssContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/types.ts', language: 'typescript', content: codeContent.typesContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/utils.ts', language: 'typescript', content: codeContent.utilsContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/constants.ts', language: 'typescript', content: codeContent.constantsContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/styles.ts', language: 'typescript', content: codeContent.stylesContent },

  // Grid Components
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/VeltCellRenderer.vue', language: 'vue', content: codeContent.veltCellRendererContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/CustomHeaderComponent.vue', language: 'vue', content: codeContent.customHeaderComponentContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/RowNumberRenderer.vue', language: 'vue', content: codeContent.rowNumberRendererContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/RowNumberHeaderComponent.vue', language: 'vue', content: codeContent.rowNumberHeaderComponentContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/grid-components/SortIcon.vue', language: 'vue', content: codeContent.sortIconContent },

  // UI Components
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/ui-components/Breadcrumb.vue', language: 'vue', content: codeContent.breadcrumbContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/ui-components/ViewToggle.vue', language: 'vue', content: codeContent.viewToggleContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/document/ui-components/Toolbar.vue', language: 'vue', content: codeContent.toolbarContent },

  // Header & Sidebar
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/header/Header.vue', language: 'vue', content: codeContent.headerContent },
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/components/sidebar/Sidebar.vue', language: 'vue', content: codeContent.sidebarContent },

  // Styles
  { path: 'apps/vue/comments/tables/ag-grid/multiple-tools/src/styles/globals.css', language: 'css', content: codeContent.globalsCssContent },
]
