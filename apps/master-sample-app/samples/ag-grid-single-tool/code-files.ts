import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/ag-grid-single-tool.json'

// Import all code files using ?raw
import pageContent from '../../../react/comments/tables/ag-grid/single-tool/app/page.tsx?raw'
import layoutContent from '../../../react/comments/tables/ag-grid/single-tool/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/tables/ag-grid/single-tool/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/tables/ag-grid/single-tool/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/tables/ag-grid/single-tool/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/tables/ag-grid/single-tool/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/tables/ag-grid/single-tool/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import documentCanvasContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/document-canvas.tsx?raw'
import dayViewTableContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/day-view-table-component.tsx?raw'
import selectedCellContextContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/SelectedCellContext.tsx?raw'
import veltCellRendererContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/grid-components/VeltCellRenderer.tsx?raw'
import rowNumberRendererContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/grid-components/RowNumberRenderer.tsx?raw'
import customHeaderComponentContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/grid-components/CustomHeaderComponent.tsx?raw'
import sortIconContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/grid-components/SortIcon.tsx?raw'
import breadcrumbContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/ui-components/Breadcrumb.tsx?raw'
import toolbarContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/ui-components/Toolbar.tsx?raw'
import viewToggleContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/ui-components/ViewToggle.tsx?raw'
import useTableStateContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/hooks/useTableState.ts?raw'
import typesContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/types.ts?raw'
import utilsContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/utils.ts?raw'
import constantsContent from '../../../react/comments/tables/ag-grid/single-tool/components/document/constants.ts?raw'
import headerContent from '../../../react/comments/tables/ag-grid/single-tool/components/header/header.tsx?raw'
import sidebarContextContent from '../../../react/comments/tables/ag-grid/single-tool/components/sidebar/SidebarContext.tsx?raw'
import sidebarContent from '../../../react/comments/tables/ag-grid/single-tool/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/page.tsx', language: 'typescript', content: codeContent.pageContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/layout.tsx', language: 'typescript', content: codeContent.layoutContent },
  
  // Document
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/document/DocumentContext.tsx', language: 'typescript', content: codeContent.documentContextContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/document/useCurrentDocument.ts', language: 'typescript', content: codeContent.useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/userAuth/AppUserContext.tsx', language: 'typescript', content: codeContent.appUserContextContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/userAuth/AppProviders.tsx', language: 'typescript', content: codeContent.appProvidersContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/app/userAuth/useAppUser.ts', language: 'typescript', content: codeContent.useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/VeltCollaboration.tsx', language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/VeltTools.tsx', language: 'typescript', content: codeContent.veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: codeContent.veltCustomizationContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: codeContent.veltCommentToolWfContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: codeContent.veltSidebarButtonWfContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: codeContent.veltNotificationsToolWfContent },
  
  // Document Canvas
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/document-canvas.tsx', language: 'typescript', content: codeContent.documentCanvasContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/day-view-table-component.tsx', language: 'typescript', content: codeContent.dayViewTableContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/SelectedCellContext.tsx', language: 'typescript', content: codeContent.selectedCellContextContent },
  
  // Grid Components
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/grid-components/VeltCellRenderer.tsx', language: 'typescript', content: codeContent.veltCellRendererContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/grid-components/RowNumberRenderer.tsx', language: 'typescript', content: codeContent.rowNumberRendererContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/grid-components/CustomHeaderComponent.tsx', language: 'typescript', content: codeContent.customHeaderComponentContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/grid-components/SortIcon.tsx', language: 'typescript', content: codeContent.sortIconContent },
  
  // UI Components
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/ui-components/Breadcrumb.tsx', language: 'typescript', content: codeContent.breadcrumbContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/ui-components/Toolbar.tsx', language: 'typescript', content: codeContent.toolbarContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/ui-components/ViewToggle.tsx', language: 'typescript', content: codeContent.viewToggleContent },
  
  // Hooks & Utils
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/hooks/useTableState.ts', language: 'typescript', content: codeContent.useTableStateContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/types.ts', language: 'typescript', content: codeContent.typesContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/utils.ts', language: 'typescript', content: codeContent.utilsContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/document/constants.ts', language: 'typescript', content: codeContent.constantsContent },
  
  // Header & Sidebar
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/header/header.tsx', language: 'typescript', content: codeContent.headerContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/sidebar/SidebarContext.tsx', language: 'typescript', content: codeContent.sidebarContextContent },
  { path: 'apps/react/comments/tables/ag-grid/single-tool/components/sidebar/sidebar.tsx', language: 'typescript', content: codeContent.sidebarContent }
]
