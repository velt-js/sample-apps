import { SampleCodeFile } from '@/types/sample'

// Import all code files using ?raw
import pageContent from '../../../react/comments/tables/tanstack/single-tool/app/page.tsx?raw'
import layoutContent from '../../../react/comments/tables/tanstack/single-tool/app/layout.tsx?raw'
import documentContextContent from '../../../react/comments/tables/tanstack/single-tool/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/comments/tables/tanstack/single-tool/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/comments/tables/tanstack/single-tool/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/comments/tables/tanstack/single-tool/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/comments/tables/tanstack/single-tool/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltCustomization.tsx?raw'
import veltCommentToolWfContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltCommentToolWf.tsx?raw'
import veltSidebarButtonWfContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltSidebarButtonWf.tsx?raw'
import veltNotificationsToolWfContent from '../../../react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltNotificationsToolWf.tsx?raw'
import documentCanvasContent from '../../../react/comments/tables/tanstack/single-tool/components/document/document-canvas.tsx?raw'
import dayViewTableContent from '../../../react/comments/tables/tanstack/single-tool/components/document/day-view-table-component.tsx?raw'
import veltCellRendererContent from '../../../react/comments/tables/tanstack/single-tool/components/document/grid-components/VeltCellRenderer.tsx?raw'
import rowNumberRendererContent from '../../../react/comments/tables/tanstack/single-tool/components/document/grid-components/RowNumberRenderer.tsx?raw'
import customHeaderComponentContent from '../../../react/comments/tables/tanstack/single-tool/components/document/grid-components/CustomHeaderComponent.tsx?raw'
import sortIconContent from '../../../react/comments/tables/tanstack/single-tool/components/document/grid-components/SortIcon.tsx?raw'
import breadcrumbContent from '../../../react/comments/tables/tanstack/single-tool/components/document/ui-components/Breadcrumb.tsx?raw'
import toolbarContent from '../../../react/comments/tables/tanstack/single-tool/components/document/ui-components/Toolbar.tsx?raw'
import viewToggleContent from '../../../react/comments/tables/tanstack/single-tool/components/document/ui-components/ViewToggle.tsx?raw'
import useTableStateContent from '../../../react/comments/tables/tanstack/single-tool/components/document/hooks/useTableState.ts?raw'
import typesContent from '../../../react/comments/tables/tanstack/single-tool/components/document/types.ts?raw'
import utilsContent from '../../../react/comments/tables/tanstack/single-tool/components/document/utils.ts?raw'
import constantsContent from '../../../react/comments/tables/tanstack/single-tool/components/document/constants.ts?raw'
import headerContent from '../../../react/comments/tables/tanstack/single-tool/components/header/header.tsx?raw'
import sidebarContextContent from '../../../react/comments/tables/tanstack/single-tool/components/sidebar/SidebarContext.tsx?raw'
import sidebarContent from '../../../react/comments/tables/tanstack/single-tool/components/sidebar/sidebar.tsx?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/page.tsx', language: 'typescript', content: pageContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/layout.tsx', language: 'typescript', content: layoutContent },
  
  // Document
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/document/DocumentContext.tsx', language: 'typescript', content: documentContextContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/document/useCurrentDocument.ts', language: 'typescript', content: useCurrentDocumentContent },
  
  // User Auth
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/userAuth/AppUserContext.tsx', language: 'typescript', content: appUserContextContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/userAuth/AppProviders.tsx', language: 'typescript', content: appProvidersContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/app/userAuth/useAppUser.ts', language: 'typescript', content: useAppUserContent },
  
  // Velt Components
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/VeltInitializeUser.tsx', language: 'typescript', content: veltInitializeUserContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/VeltInitializeDocument.tsx', language: 'typescript', content: veltInitializeDocumentContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/VeltCollaboration.tsx', language: 'typescript', content: veltCollaborationContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/VeltTools.tsx', language: 'typescript', content: veltToolsContent },
  
  // Velt UI Customization
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltCustomization.tsx', language: 'typescript', content: veltCustomizationContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltCommentToolWf.tsx', language: 'typescript', content: veltCommentToolWfContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltSidebarButtonWf.tsx', language: 'typescript', content: veltSidebarButtonWfContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/velt/ui-customization/VeltNotificationsToolWf.tsx', language: 'typescript', content: veltNotificationsToolWfContent },
  
  // Document Canvas
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/document-canvas.tsx', language: 'typescript', content: documentCanvasContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/day-view-table-component.tsx', language: 'typescript', content: dayViewTableContent },
  
  // Grid Components
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/grid-components/VeltCellRenderer.tsx', language: 'typescript', content: veltCellRendererContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/grid-components/RowNumberRenderer.tsx', language: 'typescript', content: rowNumberRendererContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/grid-components/CustomHeaderComponent.tsx', language: 'typescript', content: customHeaderComponentContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/grid-components/SortIcon.tsx', language: 'typescript', content: sortIconContent },
  
  // UI Components
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/ui-components/Breadcrumb.tsx', language: 'typescript', content: breadcrumbContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/ui-components/Toolbar.tsx', language: 'typescript', content: toolbarContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/ui-components/ViewToggle.tsx', language: 'typescript', content: viewToggleContent },
  
  // Hooks & Utils
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/hooks/useTableState.ts', language: 'typescript', content: useTableStateContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/types.ts', language: 'typescript', content: typesContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/utils.ts', language: 'typescript', content: utilsContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/document/constants.ts', language: 'typescript', content: constantsContent },
  
  // Header & Sidebar
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/header/header.tsx', language: 'typescript', content: headerContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/sidebar/SidebarContext.tsx', language: 'typescript', content: sidebarContextContent },
  { path: 'apps/react/comments/tables/tanstack/single-tool/components/sidebar/sidebar.tsx', language: 'typescript', content: sidebarContent }
]
