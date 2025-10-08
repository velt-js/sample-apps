# Architecture Overview

## 🏗️ Single Page Architecture

This application uses a **single-page architecture** where all samples are loaded on one page and switched dynamically through state management.

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser (/)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      app/page.tsx                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  State: currentSampleId = "tiptap-crdt"               │ │
│  │  currentSample = getSampleById(currentSampleId)       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
            │                              │
            ▼                              ▼
┌─────────────────────┐      ┌──────────────────────────────┐
│  Sidebar Component  │      │   SampleViewer Component     │
│                     │      │                              │
│  Props:             │      │  Props:                      │
│  - currentSampleId  │      │  - sample (current)          │
│  - onSampleSelect() │      │  - sidebarOpen               │
│                     │      │  - onSidebarToggle()         │
│  Future:            │      │                              │
│  - Dynamic list     │      │                              │
│    from registry    │      │                              │
└─────────────────────┘      └──────────────────────────────┘
                                          │
                                          ▼
                      ┌───────────────────────────────────────┐
                      │                                       │
                      ▼                                       ▼
            ┌──────────────────┐              ┌──────────────────────┐
            │    TopBar        │              │   Main Content       │
            │                  │              │                      │
            │  Props:          │              │  Demo mode:          │
            │  - title         │              │  └─ IframePair       │
            │  - githubUrl     │              │                      │
            │  - mode toggle   │              │  Code mode:          │
            └──────────────────┘              │  ├─ CodeDisplay      │
                                              │  ├─ IframePair       │
                                              │  └─ Placeholder      │
                                              └──────────────────────┘
                                                          │
                      ┌───────────────────────────────────┴────────┐
                      ▼                                            ▼
            ┌──────────────────┐                      ┌─────────────────────┐
            │  IframePair      │                      │   CodeDisplay       │
            │                  │                      │                     │
            │  Props:          │                      │  Props:             │
            │  - url           │                      │  - codeFiles[]      │
            │  - secondUrl     │                      │  - githubRepoPath   │
            │                  │                      │                     │
            │  Displays 2      │                      │  Fetches code from  │
            │  side-by-side    │                      │  GitHub and         │
            │  iframes         │                      │  displays           │
            └──────────────────┘                      └─────────────────────┘
```

## 📦 Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    samples/index.ts                          │
│                  (Configuration Registry)                    │
│                                                              │
│  SAMPLES = {                                                 │
│    'tiptap-crdt': {                                         │
│      metadata: { id, title, urls, github, ... },            │
│      codeFiles: [{ path, language }]                        │
│    },                                                        │
│    'sample-2': { ... },                                     │
│    'sample-3': { ... }                                      │
│  }                                                           │
└──────────────────────────────────────────────────────────────┘
                          │
                          │ Import & Access
                          ▼
┌──────────────────────────────────────────────────────────────┐
│                     app/page.tsx                             │
│                  (State Management)                          │
│                                                              │
│  const [currentSampleId, setCurrentSampleId] =              │
│    useState('tiptap-crdt')                                  │
│                                                              │
│  const currentSample = getSampleById(currentSampleId)       │
└──────────────────────────────────────────────────────────────┘
                          │
                          │ Pass as Props
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              components/viewer/sample-viewer.tsx             │
│                    (Display Layer)                           │
│                                                              │
│  Receives 'sample' object with all config                   │
│  Distributes to child components                            │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 Sample Switching Flow

```
User Action
    │
    ├─ Clicks sidebar item (future)
    ├─ URL parameter change (future)  
    └─ Default load
         │
         ▼
    setCurrentSampleId('new-id')
         │
         ▼
    State updates in app/page.tsx
         │
         ▼
    getSampleById() retrieves new sample config
         │
         ▼
    React re-renders SampleViewer with new props
         │
         ▼
    ┌──────────────────────────────────┐
    │  Components update:              │
    │  - TopBar: new title & GitHub    │
    │  - IframePair: new URLs          │
    │  - CodeDisplay: fetch new code   │
    └──────────────────────────────────┘
```

## 🧩 Component Hierarchy

```
app/page.tsx (Client Component)
│
├─ Sidebar
│   └─ ThemeToggle
│
└─ SampleViewer
    │
    ├─ TopBar
    │   ├─ Mode toggle (Code/Demo)
    │   ├─ Title (from sample.metadata.title)
    │   └─ GitHub button (sample.metadata.githubUrl)
    │
    └─ Main Content (conditional on mode)
        │
        ├─ Demo Mode:
        │   └─ IframePair (full screen)
        │
        └─ Code Mode:
            ├─ CodeDisplay (left)
            └─ Right Panel
                ├─ IframePair (top)
                └─ Placeholder (bottom)
```

## 📝 File Organization

### Configuration Layer
```
/samples/
├── index.ts              # Central registry, exports all samples
└── [sample-name]/        # Each sample is a folder
    ├── metadata.ts       # Sample configuration
    └── code-files.ts     # Code file definitions
```

### Application Layer
```
/app/
├── layout.tsx            # Root layout (theme, fonts, analytics)
├── page.tsx              # Main page with state management
└── globals.css           # Global styles
```

### Component Layer
```
/components/
├── viewer/               # Sample-specific viewer components
│   ├── sample-viewer.tsx  # Orchestrates sample display
│   ├── top-bar.tsx        # Dynamic top bar
│   ├── iframe-pair.tsx    # Iframe container
│   └── code-display.tsx   # GitHub code fetcher
│
├── sidebar.tsx           # Navigation sidebar (currently static)
├── theme-provider.tsx    # Theme context
├── theme-toggle.tsx      # Dark/light mode toggle
└── ui/                   # shadcn/ui components
```

### Type Layer
```
/types/
└── sample.ts             # TypeScript interfaces
    ├── SampleMetadata    # Sample configuration
    ├── SampleCodeFile    # Code file definition
    └── Sample            # Complete sample structure
```

## 🎯 Design Principles

### 1. Single Source of Truth
- All sample configurations in `/samples/` directory
- Each sample is self-contained in its own folder
- Registry exports unified access to all samples

### 2. Configuration Over Code
- No hardcoded values in components
- All sample-specific data comes from config
- Easy to add/modify samples without touching components

### 3. Component Reusability
- Viewer components are generic and reusable
- Props-based customization
- No sample-specific logic in components

### 4. Type Safety
- TypeScript interfaces ensure consistency
- Compile-time validation of sample configs
- IntelliSense support for development

### 5. Separation of Concerns
```
Configuration → State Management → Display
   (samples)        (app/page)      (components)
```

## 🚀 Advantages of This Architecture

### Single Page Benefits
- ✅ **No routing complexity**: Simpler codebase
- ✅ **Faster switching**: No page reloads
- ✅ **Shared state**: Sidebar, theme persist
- ✅ **Simpler deployment**: No route management

### Configuration-Driven Benefits
- ✅ **Scalable**: Add samples without code changes
- ✅ **Maintainable**: Clear structure, easy to find
- ✅ **Type-safe**: Compile-time guarantees
- ✅ **Testable**: Isolated configurations

### Component Architecture Benefits
- ✅ **Reusable**: Components work for any sample
- ✅ **Composable**: Easy to add/remove features
- ✅ **Predictable**: Props-based, no hidden state
- ✅ **Debuggable**: Clear data flow

## 🔮 Future Enhancements

### Dynamic Sidebar
```typescript
// Make sidebar render from sample registry
const samples = getAllSamples()
const grouped = groupBy(samples, 'category')

return (
  <nav>
    {Object.entries(grouped).map(([category, items]) => (
      <Section key={category} title={category}>
        {items.map(sample => (
          <SampleItem 
            sample={sample}
            isActive={currentSampleId === sample.metadata.id}
            onClick={() => onSampleSelect(sample.metadata.id)}
          />
        ))}
      </Section>
    ))}
  </nav>
)
```

### URL State Management
```typescript
// Add URL params for bookmarking
const searchParams = useSearchParams()
const sampleId = searchParams.get('sample') || 'default'

// Update URL when switching
const handleSampleSelect = (id: string) => {
  setCurrentSampleId(id)
  router.push(`?sample=${id}`, { scroll: false })
}
```

### Code File Tabs
```typescript
// Support multiple code files with tabs
<Tabs>
  {sample.codeFiles.map(file => (
    <Tab key={file.path} label={file.path}>
      <CodeDisplay file={file} />
    </Tab>
  ))}
</Tabs>
```

### Search & Filter
```typescript
// Add sample search
const [search, setSearch] = useState('')
const filtered = samples.filter(s => 
  s.metadata.title.toLowerCase().includes(search.toLowerCase())
)
```

## 📊 Current vs. Original

### Original Structure
- ❌ Hardcoded values in components
- ❌ Single sample only
- ❌ Difficult to extend
- ❌ No clear separation

### Current Structure
- ✅ Configuration-driven
- ✅ Multi-sample support
- ✅ Easy to extend (3-step process)
- ✅ Clear separation of concerns
- ✅ Type-safe
- ✅ Scalable architecture

## ✨ Summary

This architecture provides a **solid foundation** for a scalable sample app repository while maintaining **simplicity** and **ease of use**. The single-page approach keeps things simple while the configuration system makes it easy to add unlimited samples.

