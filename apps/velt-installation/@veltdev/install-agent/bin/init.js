#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VELT_CLI_PATH = '/Users/samarthgoel/Documents/add-velt-next-js/bin/velt.js';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function detectIDE() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, '.cursor'))) return 'cursor';
  if (fs.existsSync(path.join(cwd, '.claude'))) return 'claude';
  if (fs.existsSync(path.join(cwd, '.vscode'))) return 'vscode';
  return 'cursor'; // default
}

async function installAgents(ide) {
  const agentDir = ide === 'claude' ? '.claude/agents' : '.cursor/agents';
  const targetDir = path.join(process.cwd(), agentDir);

  ensureDir(targetDir);

  const sourceAgentDir = path.join(__dirname, '..', 'agents');
  const agentFiles = fs.readdirSync(sourceAgentDir);

  let count = 0;
  for (const file of agentFiles) {
    if (file.endsWith('.md')) {
      copyFile(
        path.join(sourceAgentDir, file),
        path.join(targetDir, file)
      );
      count++;
    }
  }

  console.log(`✓ Installed ${count} agents to ${targetDir}`);
}

async function registerAgents(ide) {
  const configDir = ide === 'claude' ? '.claude' : '.cursor';
  const projectDir = process.cwd();
  const agentsConfigPath = path.join(projectDir, configDir, 'agents.json');

  ensureDir(path.join(projectDir, configDir));

  const templatePath = path.join(__dirname, '..', '.cursor', 'agents.json.template');
  const agentsConfig = readJson(templatePath);

  writeJson(agentsConfigPath, agentsConfig);

  console.log(`✓ Registered ${agentsConfig.agents.length} agents in ${agentsConfigPath}`);
}

async function configureMCP() {
  const projectDir = process.cwd();
  const mcpConfigPath = path.join(projectDir, '.cursor', 'mcp.json');

  ensureDir(path.join(projectDir, '.cursor'));

  let mcpConfig = {};
  if (fs.existsSync(mcpConfigPath)) {
    mcpConfig = readJson(mcpConfigPath);
  }

  if (!mcpConfig.mcpServers) {
    mcpConfig.mcpServers = {};
  }

  mcpConfig.mcpServers.Velt = {
    command: "npx",
    args: ["-y", "@veltdev/mcp-server"]
  };

  writeJson(mcpConfigPath, mcpConfig);

  console.log(`✓ Configured Velt MCP server in ${mcpConfigPath}`);
}

async function storeConfig() {
  const configPath = path.join(process.cwd(), '.velt-agent-config.json');
  const config = {
    cliPath: VELT_CLI_PATH,
    installedAt: new Date().toISOString()
  };

  writeJson(configPath, config);
  console.log(`✓ Stored configuration in ${configPath}`);
}

async function main() {
  console.log('🚀 Velt Install Agent Setup\n');

  const ide = await detectIDE();
  console.log(`Detected IDE: ${ide}`);

  await installAgents(ide);
  await registerAgents(ide);
  await configureMCP();
  await storeConfig();

  console.log('\n✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('1. Restart your IDE (Cursor/Claude Code)');
  console.log('2. Run: @velt-coordinator install velt');
  console.log('3. Follow the interactive prompts\n');
}

main().catch(err => {
  console.error('Error during setup:', err);
  process.exit(1);
});
