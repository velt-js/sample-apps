# Velt Install Agent System

**Status:** ✅ Functional - Core implementation complete with documented limitations

## Overview

The Velt Install Agent System is a local package that enables customers to install and customize Velt features in their Next.js projects using Claude Code/Cursor agents. The system combines the power of the existing `add-velt-next-js` CLI with intelligent agent-based customization.

## Architecture

```
@veltdev/install-agent/
├── package.json                         # Package definition (no external deps)
├── bin/
│   └── init.js                          # Setup script (installs agents + MCP)
├── agents/
│   ├── coordinator.md                   # Main orchestrator
│   ├── discovery.md                     # Framework/library detection
│   ├── customization.md                 # Adaptation logic
│   ├── auth-adapter.md                  # Auth/provider customization
│   ├── comments-adapter.md              # Library-specific comment patterns
│   ├── cleanup.md                       # Remove unused features
│   ├── validation.md                    # QA checks (30-point checklist)
│   └── mcp-helper.md                    # MCP query utilities
└── .cursor/
    ├── mcp.json.template                # MCP server configuration
    └── agents.json.template             # Agent registration config

External Dependency:
- CLI Path: /Users/samarthgoel/Documents/add-velt-next-js/bin/velt.js
```

## Implementation Status vs. Proposed Plan

### ✅ Completed Features

#### 1. Package Structure
- [x] Created complete directory structure
- [x] All 8 agent .md files with comprehensive instructions
- [x] No external dependencies (uses native Node.js `fs` module)
- [x] Executable init script with proper permissions

#### 2. Init Script (`bin/init.js`)
- [x] Detects IDE (Cursor, Claude Code, VS Code)
- [x] Copies all agent .md files to `.cursor/agents/`
- [x] Configures Velt MCP server
- [x] Stores CLI path in `.velt-agent-config.json`
- [x] Creates `.cursor/agents.json` for agent registration
- [x] Runs without npm install (zero dependencies)

#### 3. Agent Files
All agents implemented with detailed workflows:
- [x] **Coordinator** - Complete 12-step installation workflow
- [x] **Discovery** - Library detection (AG-Grid, Tiptap, ReactFlow, CodeMirror, etc.)
- [x] **Customization** - Tailwind, Styled Components, dark mode support
- [x] **Auth Adapter** - Environment setup, VeltProvider config, user identification
- [x] **Comments Adapter** - Library-specific comment integration patterns
- [x] **Cleanup** - Removes unused features and files
- [x] **Validation** - 30-point validation checklist with scoring
- [x] **MCP Helper** - Query patterns for all supported libraries

#### 4. MCP Integration
- [x] MCP server configuration template
- [x] Automatic MCP setup during init
- [x] Integration with Velt knowledge base

### 🔄 Deviations from Original Plan

#### 1. MCP Configuration Location
**Proposed:** Global `~/.cursor/mcp.json`
**Implemented:** Project-local `.cursor/mcp.json`

**Reason:** Better isolation, portability, and multi-project support. Each project gets its own MCP configuration.

#### 2. Agent Registration
**Proposed:** Auto-discovery via .md files only
**Implemented:** Explicit registration via `.cursor/agents.json`

**Added:** `.cursor/agents.json.template` with structure:
```json
{
  "agents": [
    {
      "name": "velt-coordinator",
      "description": "Main coordinator agent...",
      "invoke": "@velt-coordinator",
      "instructions": "agents/coordinator.md"
    }
  ]
}
```

**Reason:** Improved agent discoverability and metadata management.

#### 3. Agent File Format
**Proposed:** YAML frontmatter in .md files
**Implemented:** Pure markdown without frontmatter

**Reason:** Claude Code doesn't recognize YAML frontmatter for agent registration. Registration happens via `agents.json` instead.

#### 4. Dependencies
**Proposed:** `fs-extra` for file operations
**Implemented:** Native Node.js `fs` module only

**Reason:** Zero external dependencies = faster install, no version conflicts, simpler distribution.

### ⚠️ Known Limitations

#### 1. Agent Execution Behavior
**Status:** Partially working

When invoking `@velt-coordinator install velt`:
- ✅ Agent is recognized by Claude Code
- ✅ Agent .md file is read and understood
- ⚠️ Agent instructions are treated as **guidance** rather than fully autonomous execution

**Current Behavior:**
Claude Code reads the agent instructions and uses them as context to guide the conversation, but requires user interaction to proceed through steps.

**Workaround:**
Add explicit execution directive to agent files:
```markdown
IMPORTANT: When invoked, immediately execute these instructions.
Do not just read them as reference - EXECUTE each step.
```

**Alternative Invocation:**
Instead of `@velt-coordinator install velt`, use:
```
Read and execute all instructions in .cursor/agents/coordinator.md step-by-step to install Velt.
```

#### 2. CLI Path Hardcoded
The CLI path is currently hardcoded in `init.js`:
```javascript
const VELT_CLI_PATH = '/Users/samarthgoel/Documents/add-velt-next-js/bin/velt.js';
```

**TODO:** Make this configurable via:
- Environment variable
- Init script argument
- Interactive prompt during setup

## Installation & Usage

### For Customers

1. **Run init script from target project:**
```bash
cd your-nextjs-project
node /path/to/@veltdev/install-agent/bin/init.js
```

**Output:**
```
🚀 Velt Install Agent Setup

Detected IDE: cursor
✓ Installed 8 agents to .cursor/agents
✓ Registered 8 agents in .cursor/agents.json
✓ Configured Velt MCP server in .cursor/mcp.json
✓ Stored configuration in .velt-agent-config.json

✅ Setup complete!

Next steps:
1. Restart your IDE (Cursor/Claude Code)
2. Run: @velt-coordinator install velt
3. Follow the interactive prompts
```

2. **Restart IDE** to load agents

3. **Invoke coordinator:**
```
@velt-coordinator install velt
```

### Files Created in Customer Project

After running init.js:
```
customer-project/
├── .cursor/
│   ├── agents/                  # Agent instruction files
│   │   ├── coordinator.md
│   │   ├── discovery.md
│   │   ├── customization.md
│   │   ├── auth-adapter.md
│   │   ├── comments-adapter.md
│   │   ├── cleanup.md
│   │   ├── validation.md
│   │   └── mcp-helper.md
│   ├── agents.json              # Agent registration
│   └── mcp.json                 # Velt MCP server config
└── .velt-agent-config.json      # CLI path storage
```

## Agent Workflows

### Coordinator Agent
**Trigger:** `@velt-coordinator install velt`

**Workflow:**
1. Ask customer: Directory, API key, Auth token
2. Ask: Which features? (Comments, Presence, Notifications, Recordings, Cursors)
3. If Comments: Ask comment type (Freestyle, Popover, Inline, Page)
4. Run CLI: `node /path/to/velt.js add --all`
5. Launch Discovery agent
6. Launch Customization agent
7. Launch Comments adapter (if applicable)
8. Launch Auth adapter
9. Launch Cleanup agent
10. Launch Validation agent
11. Present installation report

### Discovery Agent
**Purpose:** Analyze project structure and detect libraries

**Detects:**
- Next.js version and router type (App/Pages)
- TypeScript vs JavaScript
- Text editors: Tiptap, Lexical, CodeMirror, Slate, Quill, ProseMirror
- Tables: AG-Grid, TanStack Table
- Canvas: ReactFlow
- Styling: Tailwind, Styled Components, Emotion, Material-UI, Chakra UI
- Auth: NextAuth, Clerk, Auth0, custom

**Output:** JSON report with recommendations

### Customization Agent
**Purpose:** Apply library-specific customizations

**Customizations:**
- Tailwind CSS integration
- Dark mode support
- Component library theming
- Responsive design
- Accessibility enhancements
- Performance optimization (lazy loading, code splitting)

### Auth Adapter Agent
**Purpose:** Configure authentication and environment

**Tasks:**
- Update `.env.local` with API keys
- Configure VeltProvider in layout
- Set up user identification (static or dynamic)
- Create JWT token API route
- Implement document identification
- Add TypeScript environment types

### Comments Adapter Agent
**Purpose:** Add library-specific comment integration

**Supported Libraries:**
- **Tiptap:** Inline comments, text selection
- **AG-Grid:** Cell-level comments, location tracking
- **ReactFlow:** Node/edge comments, canvas collaboration
- **CodeMirror:** Line-level comments
- **Lexical:** Text selection comments
- **Generic HTML:** Freestyle comments

### Cleanup Agent
**Purpose:** Remove unused features and files

**Removes based on selection:**
- Unused Velt components
- Unused API routes
- Demo/example files
- Unused imports and dependencies
- Unused styles

### Validation Agent
**Purpose:** Run 30-point validation checklist

**Categories:**
1. Environment & Configuration (5 points)
2. Provider Setup (5 points)
3. Authentication (5 points)
4. Feature Implementation (10 points)
5. Code Quality & Cleanup (5 points)

**Scoring:**
- 28-30: Excellent
- 24-27: Good
- 20-23: Acceptable
- <20: Needs fixes

**Output:** Comprehensive JSON + Markdown report

### MCP Helper Agent
**Purpose:** Query Velt MCP for library-specific patterns

**Query Patterns:**
- Library integration guides
- Code examples
- Best practices
- Common patterns
- Troubleshooting

## Technical Details

### init.js Functions

```javascript
// Detect IDE (cursor, claude, vscode)
async function detectIDE()

// Copy agent .md files to target directory
async function installAgents(ide)

// Create agents.json registration file
async function registerAgents(ide)

// Configure Velt MCP server
async function configureMCP()

// Store CLI path for agents
async function storeConfig()
```

### Zero Dependencies
Uses only Node.js built-ins:
- `fs` - File operations
- `path` - Path manipulation
- `JSON` - Configuration parsing

### Cross-Platform Support
- ✅ macOS
- ✅ Linux
- ✅ Windows (with minor path adjustments)

## Supported Libraries

### Text Editors
- Tiptap ✅
- Lexical ✅
- CodeMirror ✅
- Slate ✅
- Quill ✅
- ProseMirror ✅
- BlockNote ✅

### Tables
- AG-Grid ✅
- TanStack Table ✅

### Canvas
- ReactFlow ✅
- Fabric.js (planned)

### Styling
- Tailwind CSS ✅
- Styled Components ✅
- Emotion ✅
- Material-UI ✅
- Chakra UI ✅
- Ant Design ✅

### Authentication
- NextAuth.js ✅
- Clerk ✅
- Auth0 ✅
- Custom auth ✅

## Future Enhancements

### High Priority
1. **Make CLI path configurable** - Remove hardcoded path
2. **Improve agent autonomy** - Research Claude Code agent execution model
3. **Add more library support** - Fabric.js, more table libraries
4. **Error recovery** - Automatic rollback on failures

### Medium Priority
5. **npm package** - Publish to npm registry
6. **Testing suite** - Unit tests for init.js
7. **CI/CD** - Automated testing and deployment
8. **Documentation site** - Interactive guides and examples

### Low Priority
9. **GUI installer** - Visual setup wizard
10. **Telemetry** - Anonymous usage analytics (opt-in)
11. **Update checker** - Notify about new versions

## Troubleshooting

### Agent not recognized
**Problem:** `@velt-coordinator` doesn't autocomplete

**Solutions:**
1. Verify `.cursor/agents.json` exists
2. Restart IDE completely (not just reload)
3. Check `.cursor/agents/coordinator.md` exists
4. Try alternative invocation: "Read and execute .cursor/agents/coordinator.md"

### MCP server not loading
**Problem:** Velt MCP queries fail

**Solutions:**
1. Check `.cursor/mcp.json` exists
2. Verify MCP server configuration:
```json
{
  "mcpServers": {
    "Velt": {
      "command": "npx",
      "args": ["-y", "@veltdev/mcp-server"]
    }
  }
}
```
3. Restart IDE
4. Check internet connection (MCP requires network)

### CLI path not found
**Problem:** Error: "Cannot find velt.js"

**Solutions:**
1. Update CLI path in `.velt-agent-config.json`
2. Verify CLI exists at path
3. Update `init.js` with correct path before running

## Development

### Local Testing

1. **Make changes to agent files or init.js**

2. **Test init script:**
```bash
cd test-project
node /path/to/install-agent/bin/init.js
```

3. **Verify files created:**
```bash
ls -la .cursor/agents/
cat .cursor/agents.json
cat .cursor/mcp.json
```

4. **Test agent invocation:**
- Restart IDE
- Type `@velt-coordinator install velt`
- Verify behavior

### Modifying Agents

Agent .md files are pure markdown with instructions. To modify:

1. Edit agent file in `agents/coordinator.md`
2. Update execution directive if needed
3. Test by re-running init.js in test project
4. Restart IDE and invoke agent

### Agent File Structure

```markdown
# Agent Name

IMPORTANT: When invoked, immediately execute these instructions.

You are [description of agent role].

When invoked with "@agent-name", you must [trigger behavior].

## Workflow

Execute the following steps:

### Step 1: [Task]
[Detailed instructions]

### Step 2: [Task]
[Detailed instructions]

## Tools to Use

- `Read`: [when to use]
- `Edit`: [when to use]
- `Task`: [when to use]

## Output

Return [expected output format]
```

## Contributing

### Making Changes
1. Fork the repository
2. Create feature branch
3. Test thoroughly with real Next.js projects
4. Update README if needed
5. Submit pull request

### Testing Checklist
- [ ] init.js runs without errors
- [ ] All 8 agent files copied correctly
- [ ] agents.json created with correct structure
- [ ] mcp.json created with Velt server config
- [ ] Agents recognized in IDE after restart
- [ ] Agent instructions are clear and actionable
- [ ] No external dependencies introduced

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or contributions:
- GitHub Issues: [repository URL]
- Documentation: https://docs.velt.dev
- Discord: https://discord.gg/velt
- Email: support@velt.dev

## Version History

### v1.0.0 (Current)
- ✅ Initial implementation
- ✅ All 8 agents created
- ✅ Zero-dependency init script
- ✅ Agent registration via agents.json
- ✅ Project-local MCP configuration
- ⚠️ Agent execution guidance mode (not fully autonomous)

---

**Built with ❤️ for the Velt community**
