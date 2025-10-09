# ReactFlow Playground Sample

## Overview

This sample demonstrates a **multi-origin iframe playground** for testing ReactFlow collaboration features. It displays two different ReactFlow apps side-by-side, each from a different origin, allowing them to have separate `localStorage` and enabling proper multi-user testing.

## Configuration

### Dual Iframe Setup

- **Iframe 1**: `https://reactflow-master-sample-app.vercel.app/`
  - This is the deployed version of the master-sample-app's ReactFlow implementation
  
- **Iframe 2**: `https://reactflow-master-app.vercel.app/`
  - This is the standalone ReactFlow master app deployment

### Why Different Origins?

When testing collaboration features locally with two iframes from the same origin (e.g., both from `localhost:3000`), they **share the same localStorage**. This means:

- Both iframes would show the same logged-in user
- Cursors would appear identical
- Multi-user collaboration testing becomes impossible

By using **different origins** (different domains), each iframe has:
- ✅ Separate `localStorage` 
- ✅ Independent user sessions
- ✅ Distinct cursors and presence
- ✅ True multi-user collaboration testing

## How to Use

1. **Navigate to the sample**:
   - Open the master-sample-app at `http://localhost:3000`
   - Click on the sidebar: `CRDT > ReactFlow Playground`

2. **Test multi-user collaboration**:
   - In the **left iframe**, log in as one user (e.g., Michael Scott)
   - In the **right iframe**, log in as another user (e.g., Jim Halpert)
   - Make changes in one iframe and see them reflected in the other
   - Observe different cursors and presence indicators

3. **Toggle views**:
   - Use the **Code/Demo** toggle in the top bar
   - **Demo mode**: Full-screen dual iframes
   - **Code mode**: Split view with code on the left, iframes on the right

## Technical Details

### Files Created

- `metadata.ts` - Sample configuration with dual iframe URLs
- `code-files.ts` - Code file references for display
- Updated `samples/index.ts` - Registered the new sample
- Updated `components/sidebar.tsx` - Added navigation item

### Architecture

This sample leverages the existing master-sample-app architecture:

```
samples/reactflow-playground/
├── metadata.ts          # Dual iframe configuration
├── code-files.ts        # Code references
└── README.md           # This file

Integration points:
├── samples/index.ts     # Sample registry
├── components/sidebar.tsx  # Navigation
└── components/viewer/sample-viewer.tsx  # Renders iframes
```

### Sample Metadata

```typescript
{
  id: 'reactflow-playground',
  title: 'REACTFLOW · PLAYGROUND',
  category: 'feature',
  section: 'ReactFlow',
  iframeUrl: 'https://reactflow-master-sample-app.vercel.app/',
  iframeUrl2: 'https://reactflow-master-app.vercel.app/',
  displayMode: 'dual',
  githubUrl: 'https://github.com/velt-js/sample-apps/...',
  githubRepoPath: 'velt-js/sample-apps'
}
```

## Testing Scenarios

Use this playground to verify:

1. **Multi-user presence** - Different users show distinct cursors
2. **Real-time sync** - Changes in one iframe appear in the other
3. **CRDT operations** - Concurrent edits are properly merged
4. **User isolation** - Each iframe maintains its own user session
5. **Cross-origin collaboration** - Different origins can collaborate seamlessly

## Related Samples

- **ReactFlow CRDT** - Single iframe ReactFlow implementation
- **Cursors Playground** - Angular-based multi-origin cursor testing

## Comparison with Local Testing

### ❌ Same-Origin Iframes (localhost:3000 + localhost:3000)
- Shared localStorage
- Same user in both iframes
- Identical cursors
- Can't test multi-user scenarios

### ✅ Multi-Origin Iframes (This Sample)
- Separate localStorage
- Different users in each iframe
- Distinct cursors
- True multi-user testing

## Future Enhancements

- Add URL query parameters for auto-login
- Support for more than two simultaneous instances
- Network throttling for latency testing
- Side-by-side comparison of different versions

