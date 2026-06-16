import { SampleCodeFile } from '@/types/sample'

// Import generated code content from JSON
import codeContent from '../../generated/tiptap-suggestions-demo.json'

const BASE = '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo'

// Import all code files using ?raw
import pageContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/page.tsx?raw'
import layoutContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/layout.tsx?raw'
import tokenRouteContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/api/velt/token/route.ts?raw'
import documentContextContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/document/DocumentContext.tsx?raw'
import useCurrentDocumentContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/document/useCurrentDocument.ts?raw'
import appUserContextContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/userAuth/AppUserContext.tsx?raw'
import appProvidersContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/userAuth/AppProviders.tsx?raw'
import useAppUserContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/app/userAuth/useAppUser.ts?raw'
import veltInitializeUserContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/velt/VeltInitializeUser.tsx?raw'
import veltInitializeDocumentContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/velt/VeltInitializeDocument.tsx?raw'
import veltCollaborationContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/velt/VeltCollaboration.tsx?raw'
import veltToolsContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/velt/VeltTools.tsx?raw'
import veltCustomizationContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/velt/ui-customization/VeltCustomization.tsx?raw'
import headerContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/header/header.tsx?raw'
import documentCanvasContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/document-canvas.tsx?raw'
import tipTapComponentContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/TipTapComponent.tsx?raw'
import bubbleMenuToolbarContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx?raw'
import suggestionsTypesContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/suggestions/types.ts?raw'
import proposalContextContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/suggestions/ProposalContext.tsx?raw'
import proposalFieldsContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/suggestions/ProposalFields.tsx?raw'
import suggestionModeIndicatorContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/suggestions/SuggestionModeIndicator.tsx?raw'
import openSuggestionsPanelContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/suggestions/OpenSuggestionsPanel.tsx?raw'
import applySuggestionsContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/suggestions/ApplySuggestions.tsx?raw'
import inlineCoreExtensionContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/core/SuggestionExtension.ts?raw'
import inlineCorePluginContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/core/plugin.ts?raw'
import inlineCoreSuggestionMarkContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/core/suggestionMark.ts?raw'
import inlineCoreTypesContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/core/types.ts?raw'
import inlineCoreTargetIdsContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/core/targetIds.ts?raw'
import inlineBridgeContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/velt/VeltSuggestionBridge.tsx?raw'
import inlineSchedulerContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/velt/commitScheduler.ts?raw'
import inlineTargetGettersContent from '../../../react/suggestions/text-editors/tiptap/tiptap-suggestions-demo/components/document/TipTapComponent/suggestion/velt/useTargetGetters.ts?raw'

export const codeFiles: SampleCodeFile[] = [
  // App
  { path: `${BASE}/app/page.tsx`, language: 'typescript', content: codeContent.pageContent },
  { path: `${BASE}/app/layout.tsx`, language: 'typescript', content: codeContent.layoutContent },
  { path: `${BASE}/app/api/velt/token/route.ts`, language: 'typescript', content: codeContent.tokenRouteContent },

  // Document scoping
  { path: `${BASE}/app/document/DocumentContext.tsx`, language: 'typescript', content: codeContent.documentContextContent },
  { path: `${BASE}/app/document/useCurrentDocument.ts`, language: 'typescript', content: codeContent.useCurrentDocumentContent },

  // User Auth
  { path: `${BASE}/app/userAuth/AppUserContext.tsx`, language: 'typescript', content: codeContent.appUserContextContent },
  { path: `${BASE}/app/userAuth/AppProviders.tsx`, language: 'typescript', content: codeContent.appProvidersContent },
  { path: `${BASE}/app/userAuth/useAppUser.ts`, language: 'typescript', content: codeContent.useAppUserContent },

  // Velt collaboration (comments + notifications)
  { path: `${BASE}/components/velt/VeltInitializeUser.tsx`, language: 'typescript', content: codeContent.veltInitializeUserContent },
  { path: `${BASE}/components/velt/VeltInitializeDocument.tsx`, language: 'typescript', content: codeContent.veltInitializeDocumentContent },
  { path: `${BASE}/components/velt/VeltCollaboration.tsx`, language: 'typescript', content: codeContent.veltCollaborationContent },
  { path: `${BASE}/components/velt/VeltTools.tsx`, language: 'typescript', content: codeContent.veltToolsContent },

  // Velt UI customization
  { path: `${BASE}/components/velt/ui-customization/VeltCustomization.tsx`, language: 'typescript', content: codeContent.veltCustomizationContent },

  // Header (theme toggle, Velt tools, suggestion-mode toggle)
  { path: `${BASE}/components/header/header.tsx`, language: 'typescript', content: codeContent.headerContent },

  // Document canvas + TipTap body (comments surface)
  { path: `${BASE}/components/document/document-canvas.tsx`, language: 'typescript', content: codeContent.documentCanvasContent },
  { path: `${BASE}/components/document/TipTapComponent/TipTapComponent.tsx`, language: 'typescript', content: codeContent.tipTapComponentContent },
  { path: `${BASE}/components/document/TipTapComponent/ui/BubbleMenuToolbar.tsx`, language: 'typescript', content: codeContent.bubbleMenuToolbarContent },

  // Suggestion API layer
  { path: `${BASE}/components/suggestions/types.ts`, language: 'typescript', content: codeContent.suggestionsTypesContent },
  { path: `${BASE}/components/suggestions/ProposalContext.tsx`, language: 'typescript', content: codeContent.proposalContextContent },
  { path: `${BASE}/components/suggestions/ProposalFields.tsx`, language: 'typescript', content: codeContent.proposalFieldsContent },
  { path: `${BASE}/components/suggestions/SuggestionModeIndicator.tsx`, language: 'typescript', content: codeContent.suggestionModeIndicatorContent },
  { path: `${BASE}/components/suggestions/OpenSuggestionsPanel.tsx`, language: 'typescript', content: codeContent.openSuggestionsPanelContent },
  { path: `${BASE}/components/suggestions/ApplySuggestions.tsx`, language: 'typescript', content: codeContent.applySuggestionsContent },

  // Inline body suggestion engine (Google-Docs style): marks + ProseMirror plugin + Velt bridge
  { path: `${BASE}/components/document/TipTapComponent/suggestion/core/SuggestionExtension.ts`, language: 'typescript', content: codeContent.inlineCoreExtensionContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/core/plugin.ts`, language: 'typescript', content: codeContent.inlineCorePluginContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/core/suggestionMark.ts`, language: 'typescript', content: codeContent.inlineCoreSuggestionMarkContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/core/types.ts`, language: 'typescript', content: codeContent.inlineCoreTypesContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/core/targetIds.ts`, language: 'typescript', content: codeContent.inlineCoreTargetIdsContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/velt/VeltSuggestionBridge.tsx`, language: 'typescript', content: codeContent.inlineBridgeContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/velt/commitScheduler.ts`, language: 'typescript', content: codeContent.inlineSchedulerContent },
  { path: `${BASE}/components/document/TipTapComponent/suggestion/velt/useTargetGetters.ts`, language: 'typescript', content: codeContent.inlineTargetGettersContent }
]
