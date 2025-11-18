# @veltdev/install-agent

**Agent-powered installer for Velt** - Discovers, customizes, adapts, validates, and finalizes Velt integrations based on your codebase, frameworks, folder structures, and library usage.

## Overview

This package provides an intelligent, AI-powered installation system for [Velt](https://velt.dev) that:

1. **Installs** Velt via the official CLI (`add-velt-next-js`)
2. **Discovers** your codebase structure, frameworks, and libraries
3. **Customizes** the integration for your specific setup
4. **Validates** the installation comprehensively
5. **Reports** detailed results and next steps

## Features

- **Automatic IDE Detection** - Supports Cursor, Claude Code, and VS Code
- **MCP Integration** - Connects to Velt MCP server for documentation and examples
- **Intelligent Agents** - 8 specialized agents handle different aspects of installation
- **Library-Specific Integration** - Automatic detection and integration for:
  - Data grids: AG-Grid, TanStack Table
  - Editors: Tiptap, Lexical, Slate, CodeMirror
  - Canvas: ReactFlow, Excalidraw
- **Framework Support** - Next.js App Router and Pages Router
- **Comprehensive Validation** - File structure, dependencies, TypeScript, and build checks

## Installation

### Step 1: Initialize the Agent System

Run the initialization command in your Next.js project:

```bash
npx @veltdev/install-agent
```

This will:
- Detect your IDE (Cursor/Claude Code/VS Code)
- Install agent files to `.claude/agents/`
- Configure Velt MCP in your IDE
- Create `.velt-agent-config.json`

**Expected output:**

```
🚀 Velt Agent Installer

Step 1: Detecting IDE...
✓ Detected: cursor

Step 2: Configuring MCP server...
✓ MCP server configured successfully

Step 3: Installing agents...
✓ Installed 8 agents to /path/to/.claude/agents

Step 4: Locating Velt CLI...
✓ CLI path: npx @veltdev/cli

✓ Installation complete!

📋 Next Steps:

1. Set your environment variables:
   export VELT_API_KEY=your_api_key
   export VELT_AUTH_TOKEN=your_auth_token

2. Open your IDE and invoke the coordinator agent:
   @velt-coordinator install velt

3. Follow the agent prompts to complete installation
```

### Step 2: Set Environment Variables

Before running the installation, set your Velt credentials:

```bash
export VELT_API_KEY=your_velt_api_key
export VELT_AUTH_TOKEN=your_velt_auth_token
```

Get your credentials from [Velt Console](https://console.velt.dev).

### Step 3: Run the Installation Agent

Open your IDE (Cursor, Claude Code, or VS Code) and invoke the coordinator agent:

```
@velt-coordinator install velt
```

The agent will guide you through:

1. **Requirements Gathering**
   - Target directory selection
   - Feature selection (Comments, Presence, Notifications, CRDT)
   - Comment type selection (if applicable)

2. **CLI Installation**
   - Runs official Velt CLI
   - Installs base configuration

3. **Discovery**
   - Analyzes your codebase
   - Detects frameworks and libraries
   - Identifies project structure

4. **Customization**
   - Adapts authentication setup
   - Configures library-specific integrations
   - Cleans up unselected features
   - Fetches MCP examples

5. **Validation**
   - Verifies file structure
   - Checks dependencies
   - Validates TypeScript (if applicable)
   - Tests provider placement
   - Runs feature-specific checks

6. **Final Report**
   - Comprehensive summary
   - Files modified
   - Next steps
   - Troubleshooting guide

## Agent Architecture

The installer uses 8 specialized agents:

### 1. Coordinator Agent (`coordinator.md`)
Orchestrates the entire installation workflow. Entry point for the installation process.

**Invoke:** `@velt-coordinator install velt`

### 2. Discovery Agent (`discovery.md`)
Analyzes your codebase to detect:
- Next.js version and router type
- TypeScript usage
- Styling libraries (Tailwind, MUI, Chakra)
- Data grids (AG-Grid, TanStack Table)
- Editors (Tiptap, Lexical, Slate, CodeMirror)
- Canvas tools (ReactFlow, Excalidraw)

**Invoke:** `@velt-discovery` (usually called by coordinator)

### 3. Customization Agent (`customization.md`)
Orchestrates customization by launching sub-agents for different aspects of the integration.

**Invoke:** `@velt-customization` (usually called by coordinator)

### 4. Auth Adapter Agent (`auth-adapter.md`)
Ensures proper authentication setup:
- VeltProvider placement
- Auth route configuration
- Environment variables
- User initialization
- Integration with auth libraries (NextAuth, Clerk, Supabase)

**Invoke:** `@velt-auth-adapter` (usually called by customization agent)

### 5. Comments Adapter Agent (`comments-adapter.md`)
Implements library-specific comment targeting:
- AG-Grid cell/row comments
- TanStack Table cell comments
- Tiptap inline comments
- Lexical inline comments
- CodeMirror line comments
- ReactFlow node/edge comments

**Invoke:** `@velt-comments-adapter` (usually called by customization agent)

### 6. Cleanup Agent (`cleanup.md`)
Removes unselected features and unused code:
- Removes unselected Velt components
- Cleans up imports
- Removes unused dependencies
- Cleans up CSS/styling

**Invoke:** `@velt-cleanup` (usually called by customization agent)

### 7. Validation Agent (`validation.md`)
Performs comprehensive QA checks:
- File structure validation
- Dependency checks
- TypeScript compilation
- Provider placement
- Feature-specific validation
- Build validation

**Invoke:** `@velt-validation validate` (usually called by coordinator)

### 8. MCP Helper Agent (`mcp-helper.md`)
Queries Velt MCP server for:
- Integration examples
- Best practices
- Code snippets
- Library-specific guides

**Invoke:** `@velt-mcp-helper` (usually called by customization agent)

## Supported Libraries

### Data Grids
- **AG-Grid** (`ag-grid-react`) - Cell, row, and column commenting
- **TanStack Table** (`@tanstack/react-table`) - Cell and row commenting

### Rich Text Editors
- **Tiptap** (`@tiptap/react`) - Inline comments with extension
- **Lexical** (`lexical`) - Inline comments with plugin
- **Slate** (`slate`) - Inline annotation comments
- **CodeMirror** (`codemirror`) - Line and selection comments

### Canvas/Diagram Tools
- **ReactFlow** (`reactflow`) - Node and edge comments
- **Excalidraw** (`@excalidraw/excalidraw`) - Shape annotation

### Styling Libraries
- Tailwind CSS
- Material-UI (MUI)
- Chakra UI
- Styled Components
- Emotion

### Auth Libraries
- NextAuth.js / Auth.js
- Clerk
- Supabase Auth
- Auth0

## Directory Structure

After installation, your project will have:

```
your-project/
├── .claude/
│   └── agents/
│       ├── coordinator.md
│       ├── discovery.md
│       ├── customization.md
│       ├── auth-adapter.md
│       ├── comments-adapter.md
│       ├── cleanup.md
│       ├── validation.md
│       └── mcp-helper.md
├── .velt-agent-config.json
├── app/                          # or pages/
│   ├── layout.tsx                # VeltProvider added
│   └── api/
│       └── velt-auth/
│           └── route.ts          # Auth endpoint
└── .env.local                    # Velt credentials
```

## Testing Your Installation

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Each Feature

**Comments:**
- Navigate to a page with comments enabled
- Click the comment tool or click on a commentable element
- Add a test comment
- Verify comment appears and persists

**Presence:**
- Open your app in two browser windows
- Verify you see presence indicators for both users
- Check cursor positions update in real-time

**Notifications:**
- Create a comment or perform an action
- Check if notification appears
- Verify notification panel shows all notifications

**CRDT (if applicable):**
- Open collaborative editor in two windows
- Type in one window
- Verify changes appear in real-time in the other window

### 3. Run Build

```bash
npm run build
```

Ensure the build completes without errors.

### 4. Run Validation Agent

You can re-run validation at any time:

```
@velt-validation validate
```

This will check:
- File structure
- Dependencies
- TypeScript compilation
- Provider placement
- Feature functionality

## Troubleshooting

### Issue: MCP Server Not Configured

**Symptom:** Agents can't query Velt MCP for examples

**Solution:**
1. Check `~/.cursor/mcp.json` (or equivalent for your IDE)
2. Ensure `velt-mcp` server is configured
3. Restart your IDE

### Issue: VeltProvider Not Found

**Symptom:** Error: "VeltProvider is not defined"

**Solution:**
1. Verify `@veltdev/react` is installed: `npm list @veltdev/react`
2. Check import statement in your layout file
3. Ensure 'use client' directive is present (App Router)

### Issue: Comments Not Appearing

**Symptom:** Comment tool doesn't work or comments don't show

**Solution:**
1. Verify VeltComments component is rendered
2. Check comment mode is configured correctly
3. For popover mode, ensure elements have `data-velt-comment-id`
4. Check browser console for errors

### Issue: TypeScript Errors

**Symptom:** TS errors related to Velt components

**Solution:**
1. Ensure `@veltdev/react` is in dependencies (not devDependencies)
2. Run `npm install` to ensure types are installed
3. Restart TypeScript server in your IDE
4. Check `tsconfig.json` includes node_modules

### Issue: Build Fails

**Symptom:** `npm run build` fails with Velt-related errors

**Solution:**
1. Run validation agent: `@velt-validation validate`
2. Check for client/server component mismatches
3. Ensure environment variables are loaded
4. Verify all imports are correct

## Manual Installation

If you prefer manual installation without agents:

1. **Install Velt CLI:**
   ```bash
   npx @veltdev/cli add --all
   ```

2. **Configure .env.local:**
   ```env
   VELT_API_KEY=your_api_key
   VELT_AUTH_TOKEN=your_auth_token
   ```

3. **Add VeltProvider to layout:**
   ```typescript
   import { VeltProvider } from '@veltdev/react'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <VeltProvider>
             {children}
           </VeltProvider>
         </body>
       </html>
     )
   }
   ```

4. **Add Velt components as needed:**
   ```typescript
   import { VeltComments, VeltPresence } from '@veltdev/react'
   ```

## Configuration

### Agent Configuration

Agent behavior can be customized by editing the agent markdown files in `.claude/agents/`.

### MCP Configuration

MCP server configuration is in `~/.cursor/mcp.json` (or equivalent).

Example:
```json
{
  "mcpServers": {
    "velt-mcp": {
      "command": "npx",
      "args": ["-y", "@veltdev/mcp-server"],
      "env": {
        "VELT_API_KEY": "${VELT_API_KEY}",
        "VELT_AUTH_TOKEN": "${VELT_AUTH_TOKEN}"
      }
    }
  }
}
```

### Velt Configuration

Velt features can be configured via component props:

```typescript
<VeltComments
  mode="popover"
  customClassName="my-comments"
  priority={true}
/>

<VeltPresence
  floorPlan={true}
  docked={false}
/>
```

See [Velt documentation](https://docs.velt.dev) for all configuration options.

## Updating

To update the agent system:

```bash
npx @veltdev/install-agent@latest
```

This will:
- Update agent files to latest versions
- Preserve your customizations
- Update MCP configuration if needed

## Uninstalling

To remove Velt from your project:

1. **Remove dependencies:**
   ```bash
   npm uninstall @veltdev/react @veltdev/react-tiptap @veltdev/react-lexical
   ```

2. **Remove Velt components from your code:**
   - Remove VeltProvider from layout
   - Remove all Velt component usage
   - Remove Velt imports

3. **Remove configuration files:**
   ```bash
   rm -rf .claude/agents/
   rm .velt-agent-config.json
   ```

4. **Remove environment variables:**
   - Remove VELT_API_KEY and VELT_AUTH_TOKEN from `.env.local`

5. **Remove auth route:**
   - Delete `app/api/velt-auth/` directory

## Support

- **Documentation:** [https://docs.velt.dev](https://docs.velt.dev)
- **Support Email:** support@velt.dev
- **Discord:** [https://discord.gg/velt](https://discord.gg/velt)
- **GitHub Issues:** [https://github.com/veltdev/install-agent/issues](https://github.com/veltdev/install-agent/issues)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Claude Code](https://claude.com/claude-code)
- Powered by [Anthropic Claude](https://www.anthropic.com)
- Integration with [Velt](https://velt.dev)

---

**Made with ❤️ by the Velt team**
