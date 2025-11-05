# Master Sample App - Single Page Architecture

## 📋 Overview

This is a scalable Next.js application for displaying multiple sample apps in a unified interface. All samples are displayed on a **single page** without routing - samples are switched dynamically by changing state.

## 🎯 Key Features

- ✅ **Single Page Application**: No routing, all samples load on one page
- ✅ **Dynamic Sample Switching**: Switch between samples via state management
- ✅ **Configuration-Driven**: Add new samples by creating config files
- ✅ **Monorepo Code Integration**: Automatically fetches code from local sample apps
- ✅ **Side-by-Side Demos**: Display iframe demos with code view
- ✅ **Works Locally & on Vercel**: Seamless deployment to production

## 📁 Project Structure

```
master-sample-app/
├── app/
│   ├── page.tsx                      # Main page with sample switching
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
│
├── samples/                          # Sample Definitions
│   ├── index.ts                      # Sample registry & helper functions
│   └── [sample-name]/               # Individual sample folder
│       ├── metadata.ts              # Sample configuration
│       └── code-files.ts            # Code file paths
│
├── components/
│   ├── viewer/                      # Sample viewer components
│   │   ├── sample-viewer.tsx       # Main viewer orchestrator
│   │   ├── top-bar.tsx             # Dynamic top bar
│   │   ├── iframe-pair.tsx         # Iframe display
│   │   └── code-display.tsx        # GitHub code fetcher
│   ├── sidebar.tsx                  # Navigation sidebar
│   ├── theme-provider.tsx           # Theme management
│   └── ui/                          # shadcn/ui components
│
├── types/
│   └── sample.ts                    # TypeScript interfaces
│
└── lib/
    └── utils.ts                     # Utility functions
```

## 🚀 Adding a New Sample

### Step 1: Create Sample Folder
```
/samples/your-sample-name/
```

### Step 2: Create `metadata.ts`
```typescript
import { SampleMetadata } from '@/types/sample'

const metadata: SampleMetadata = {
  id: 'your-sample-name',              // Unique identifier
  title: 'YOUR SAMPLE · DEMO',         // Display title
  category: 'feature',                 // 'feature' or 'app-type'
  section: 'Comments',                 // Optional sidebar section
  iframeUrl: 'https://your-demo.com',  // Demo URL
  githubUrl: 'https://github.com/user/repo',
  githubRepoPath: 'user/repo',         // For code fetching
  isDefault: false                     // Set one as default
}

export default metadata
```

### Step 3: Create `code-files.ts`
```typescript
import { SampleCodeFile } from '@/types/sample'

export const codeFiles: SampleCodeFile[] = [
  {
    // Path relative to sample-apps root (e.g., apps/react/...)
    path: 'apps/react/your-category/your-sample/src/YourComponent.tsx',
    language: 'typescript'             // Language for highlighting
  }
]
```

### Step 4: Register in `/samples/index.ts`
```typescript
import yourSampleMeta from './your-sample-name/metadata'
import { codeFiles as yourSampleCodeFiles } from './your-sample-name/code-files'

export const SAMPLES: Record<string, Sample> = {
  'tiptap-crdt': { /* existing */ },
  
  // Add your sample here:
  'your-sample-name': {
    metadata: yourSampleMeta,
    codeFiles: yourSampleCodeFiles
  }
}
```

### Step 5: Update Sidebar (Future Enhancement)
Currently the sidebar is static. To make it dynamic, you can:
- Import `getAllSamples()` from `/samples`
- Map samples to sidebar items
- Use `onSampleSelect` to switch samples

**That's it!** Your sample is now available in the app.

## 🔄 How It Works

### State Management
```typescript
// In app/page.tsx
const [currentSampleId, setCurrentSampleId] = useState('tiptap-crdt')
const currentSample = getSampleById(currentSampleId)

// Switch samples by changing state:
setCurrentSampleId('new-sample-id')
```

### Sample Switching Flow
1. User clicks sidebar item (or trigger changes state)
2. `currentSampleId` state updates
3. `getSampleById()` fetches new sample config
4. `SampleViewer` re-renders with new sample data
5. Iframes and code display update automatically

### No Routing
- ✅ Single URL: Always at `/`
- ✅ Faster switching (no page reload)
- ✅ Simpler architecture
- ✅ All samples share app shell (sidebar, theme, etc.)

## 🎨 Component Architecture

### Data Flow
```
samples/index.ts (Registry)
        ↓
app/page.tsx (State Management)
        ↓
components/sidebar.tsx (Selection)
        ↓
components/viewer/sample-viewer.tsx (Display)
        ↓
├─ top-bar.tsx (Title, GitHub link)
├─ iframe-pair.tsx (Demo display)
└─ code-display.tsx (GitHub code fetch)
```

### Sample Viewer Props
```typescript
<SampleViewer 
  sample={currentSample}          // Current sample data
  sidebarOpen={sidebarOpen}       // Sidebar state
  onSidebarToggle={toggleSidebar} // Toggle handler
/>
```

## 📦 Configuration Reference

### SampleMetadata Interface
```typescript
interface SampleMetadata {
  id: string                    // Unique ID (used for switching)
  title: string                 // Display in top bar
  category: "feature" | "app-type"
  section?: string              // Sidebar grouping
  iframeUrl: string            // Primary demo URL
  iframeUrl2?: string          // Secondary URL (optional)
  githubUrl: string            // GitHub repo link
  githubRepoPath?: string      // 'owner/repo' for fetching
  isDefault?: boolean          // Default sample on load
}
```

### SampleCodeFile Interface
```typescript
interface SampleCodeFile {
  path: string      // File path in GitHub repo
  language: string  // Language identifier
}
```

## 🛠️ Available Functions

From `/samples/index.ts`:

```typescript
// Get sample by ID
getSampleById(id: string): Sample | undefined

// Get default sample
getDefaultSample(): Sample

// Get all samples
getAllSamples(): Sample[]

// Filter by category
getSamplesByCategory(category: 'feature' | 'app-type'): Sample[]

// Filter by section
getSamplesBySection(section: string): Sample[]
```

## 🎯 Example: Dynamic Sidebar

To make the sidebar dynamic (future enhancement):

```typescript
import { getAllSamples } from '@/samples'

export function Sidebar({ currentSampleId, onSampleSelect }) {
  const samples = getAllSamples()
  
  return (
    <>
      {samples.map(sample => (
        <button
          key={sample.metadata.id}
          onClick={() => onSampleSelect(sample.metadata.id)}
          className={cn(
            currentSampleId === sample.metadata.id && "bg-secondary"
          )}
        >
          {sample.metadata.title}
        </button>
      ))}
    </>
  )
}
```

## 📊 Current Samples

- **tiptap-crdt**: Tiptap CRDT demo (default)

## 🚦 Development

### Local Development

```bash
# From the monorepo root (sample-apps/)
npm install

# Run only master-sample-app
cd apps/master-sample-app
npm run dev

# Or run all apps (from root)
npm run dev
```

### Deployment to Vercel

1. **Import your repository** to Vercel
2. **Project Settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/master-sample-app`
   - Build Command: `npm run build`
   - Install Command: `cd ../.. && npm install`
3. **Deploy**

The app will automatically have access to all sample app source code in the monorepo.

## 🔧 Troubleshooting

### Code not loading
- Verify file paths in `code-files.ts` are relative to `sample-apps/` root
- Example: `apps/react/comments/tables/ag-grid/single-tool/...`
- Check file paths exist in the monorepo
- Check browser console and Network tab for API errors
- Verify the API route at `/api/read-file` is working

### Sample not switching
- Verify sample ID matches exactly
- Check sample is registered in `/samples/index.ts`
- Ensure `onSampleSelect` is properly connected

### Build errors
- Run `npm run build` to check for TypeScript errors
- Verify all imports are correct
- Check sample metadata follows the interface

### Vercel deployment issues
- Ensure Root Directory is set to `apps/master-sample-app`
- Verify Install Command includes `cd ../.. && npm install`
- Check build logs for any file access errors
- The entire monorepo should be accessible during build and runtime

## 📝 Notes

- **No Routing**: All samples on one page, switched via state
- **Performance**: Iframes reload when sample changes
- **Code Fetching**: Server-side API route reads from local monorepo
- **Monorepo Structure**: Leverages turborepo workspace structure
- **Sidebar**: Dynamic navigation tree based on folder structure
- **Production Ready**: Works seamlessly on Vercel with proper configuration

## 🎉 Benefits

1. **Simple**: One page, no routing complexity
2. **Fast**: No page reloads when switching samples
3. **Scalable**: Add unlimited samples via config
4. **Type-Safe**: Full TypeScript support
5. **Maintainable**: Clear separation of concerns
6. **Flexible**: Easy to extend with new features

