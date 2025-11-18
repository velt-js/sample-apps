#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

/**
 * Simple colors for console output
 */
const colors = {
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

/**
 * Copy directory recursively
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Detect which IDE/editor is being used
 */
function detectIDE() {
  const homeDir = os.homedir();

  // Check for Cursor
  const cursorConfigPath = path.join(homeDir, '.cursor', 'mcp.json');
  if (fs.existsSync(path.dirname(cursorConfigPath))) {
    return { name: 'cursor', configPath: cursorConfigPath };
  }

  // Check for Claude Code
  const claudeCodePath = path.join(homeDir, '.claude', 'config.json');
  if (fs.existsSync(path.dirname(claudeCodePath))) {
    return { name: 'claude-code', configPath: claudeCodePath };
  }

  // Default to creating Cursor config
  return { name: 'cursor', configPath: cursorConfigPath, isNew: true };
}

/**
 * Configure MCP server for Velt
 */
function configureMCP(ide) {
  console.log('Configuring Velt MCP server...');

  try {
    const mcpConfigDir = path.dirname(ide.configPath);
    if (!fs.existsSync(mcpConfigDir)) {
      fs.mkdirSync(mcpConfigDir, { recursive: true });
    }

    let config = {};
    if (fs.existsSync(ide.configPath) && !ide.isNew) {
      config = JSON.parse(fs.readFileSync(ide.configPath, 'utf-8'));
    }

    // Ensure mcpServers object exists
    if (!config.mcpServers) {
      config.mcpServers = {};
    }

    // Add Velt MCP server configuration
    config.mcpServers['velt-mcp'] = {
      command: 'npx',
      args: ['-y', '@veltdev/mcp-server'],
      env: {
        VELT_API_KEY: '${VELT_API_KEY}',
        VELT_AUTH_TOKEN: '${VELT_AUTH_TOKEN}'
      }
    };

    fs.writeFileSync(ide.configPath, JSON.stringify(config, null, 2));
    console.log(colors.green('✓ MCP server configured successfully'));
    return true;
  } catch (error) {
    console.log(colors.red(`✗ Failed to configure MCP: ${error.message}`));
    return false;
  }
}

/**
 * Install agent markdown files
 */
function installAgents(targetDir) {
  console.log('Installing Velt agents...');

  try {
    const agentsSourceDir = path.join(__dirname, '..', 'agents');
    const agentsTargetDir = path.join(targetDir, '.claude', 'agents');

    if (!fs.existsSync(agentsTargetDir)) {
      fs.mkdirSync(agentsTargetDir, { recursive: true });
    }

    const agentFiles = fs.readdirSync(agentsSourceDir);
    let count = 0;

    for (const file of agentFiles) {
      if (file.endsWith('.md')) {
        const sourcePath = path.join(agentsSourceDir, file);
        const targetPath = path.join(agentsTargetDir, file);
        fs.copyFileSync(sourcePath, targetPath);
        count++;
      }
    }

    console.log(colors.green(`✓ Installed ${count} agents to ${agentsTargetDir}`));
    return agentsTargetDir;
  } catch (error) {
    console.log(colors.red(`✗ Failed to install agents: ${error.message}`));
    return null;
  }
}

/**
 * Save configuration to local file
 */
function saveConfig(config, targetDir) {
  const configPath = path.join(targetDir, '.velt-agent-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  return configPath;
}

/**
 * Main initialization function
 */
function init() {
  console.log(colors.cyan(colors.bold('\n🚀 Velt Agent Installer\n')));

  // Get target directory from command line or use current directory
  const targetDir = process.argv[2] || process.cwd();

  console.log(colors.cyan(`Target directory: ${targetDir}\n`));

  // Step 1: Detect IDE
  console.log(colors.cyan('Step 1: Detecting IDE...'));
  const ide = detectIDE();
  console.log(colors.green(`✓ Detected: ${ide.name}\n`));

  // Step 2: Configure MCP
  console.log(colors.cyan('Step 2: Configuring MCP server...'));
  const mcpConfigured = configureMCP(ide);
  if (!mcpConfigured) {
    console.log(colors.yellow('⚠ MCP configuration skipped or failed\n'));
  } else {
    console.log();
  }

  // Step 3: Install agents
  console.log(colors.cyan('Step 3: Installing agents...'));
  const agentsPath = installAgents(targetDir);
  if (!agentsPath) {
    console.log(colors.red('✗ Failed to install agents'));
    process.exit(1);
  }
  console.log();

  // Step 4: Find add-velt CLI
  console.log(colors.cyan('Step 4: Locating Velt CLI...'));
  const cliPath = 'npx @veltdev/cli';
  console.log(colors.green(`✓ CLI path: ${cliPath}\n`));

  // Step 5: Save configuration
  const config = {
    ide: ide.name,
    agentsPath,
    cliPath,
    mcpConfigured,
    installedAt: new Date().toISOString()
  };

  const configPath = saveConfig(config, targetDir);

  console.log(colors.green(colors.bold('✓ Installation complete!\n')));
  console.log(colors.cyan('Configuration saved to:'), configPath);
  console.log(colors.cyan('Agents installed at:'), agentsPath);

  console.log(colors.yellow(colors.bold('\n📋 Next Steps:\n')));
  console.log(colors.cyan('1. Set your environment variables:'));
  console.log('   export VELT_API_KEY=your_api_key');
  console.log('   export VELT_AUTH_TOKEN=your_auth_token\n');
  console.log(colors.cyan('2. Open your IDE and invoke the coordinator agent:'));
  console.log('   @velt-coordinator install velt\n');
  console.log(colors.cyan('3. Follow the agent prompts to complete installation\n'));

  console.log(colors.green('Happy coding with Velt! 🎉\n'));
}

// Run the initialization
init();
