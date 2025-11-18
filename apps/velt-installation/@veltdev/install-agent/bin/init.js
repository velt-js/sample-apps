#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const ora = require('ora');

/**
 * Detect which IDE/editor is being used
 */
function detectIDE() {
  const homeDir = os.homedir();

  // Check for Cursor
  const cursorConfigPath = path.join(homeDir, '.cursor', 'mcp.json');
  if (fs.existsSync(cursorConfigPath)) {
    return { name: 'cursor', configPath: cursorConfigPath };
  }

  // Check for Claude Code
  const claudeCodePath = path.join(homeDir, '.claude', 'config.json');
  if (fs.existsSync(claudeCodePath)) {
    return { name: 'claude-code', configPath: claudeCodePath };
  }

  // Check for VS Code
  const vscodeConfigPath = path.join(homeDir, '.vscode', 'settings.json');
  if (fs.existsSync(vscodeConfigPath)) {
    return { name: 'vscode', configPath: vscodeConfigPath };
  }

  // Default to creating Cursor config
  return { name: 'cursor', configPath: cursorConfigPath, isNew: true };
}

/**
 * Configure MCP server for Velt
 */
async function configureMCP(ide) {
  const spinner = ora('Configuring Velt MCP server...').start();

  try {
    const mcpConfigDir = path.dirname(ide.configPath);
    await fs.ensureDir(mcpConfigDir);

    let config = {};
    if (fs.existsSync(ide.configPath) && !ide.isNew) {
      config = await fs.readJSON(ide.configPath);
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

    // Add add-velt CLI command
    config.mcpServers['add-velt-cli'] = {
      command: 'node',
      args: ['${ADD_VELT_CLI_PATH}/bin/velt.js']
    };

    await fs.writeJSON(ide.configPath, config, { spaces: 2 });
    spinner.succeed('MCP server configured successfully');
    return true;
  } catch (error) {
    spinner.fail(`Failed to configure MCP: ${error.message}`);
    return false;
  }
}

/**
 * Install agent markdown files
 */
async function installAgents(targetDir) {
  const spinner = ora('Installing Velt agents...').start();

  try {
    const agentsSourceDir = path.join(__dirname, '..', 'agents');
    const agentsTargetDir = path.join(targetDir, '.claude', 'agents');

    await fs.ensureDir(agentsTargetDir);

    const agentFiles = await fs.readdir(agentsSourceDir);

    for (const file of agentFiles) {
      if (file.endsWith('.md')) {
        const sourcePath = path.join(agentsSourceDir, file);
        const targetPath = path.join(agentsTargetDir, file);
        await fs.copy(sourcePath, targetPath, { overwrite: true });
      }
    }

    spinner.succeed(`Installed ${agentFiles.length} agents to ${agentsTargetDir}`);
    return agentsTargetDir;
  } catch (error) {
    spinner.fail(`Failed to install agents: ${error.message}`);
    return null;
  }
}

/**
 * Save configuration to local file
 */
async function saveConfig(config) {
  const configPath = path.join(process.cwd(), '.velt-agent-config.json');
  await fs.writeJSON(configPath, config, { spaces: 2 });
  return configPath;
}

/**
 * Find add-velt CLI path
 */
function findAddVeltCLI() {
  // Try to find in node_modules
  const possiblePaths = [
    path.join(process.cwd(), 'node_modules', '@veltdev', 'cli'),
    path.join(process.cwd(), 'node_modules', 'add-velt-next-js'),
    path.join(os.homedir(), '.npm-global', 'lib', 'node_modules', '@veltdev', 'cli'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Default assumption
  return 'npx @veltdev/cli';
}

/**
 * Main initialization function
 */
async function init() {
  console.log(chalk.cyan.bold('\n🚀 Velt Agent Installer\n'));

  // Step 1: Detect IDE
  console.log(chalk.blue('Step 1: Detecting IDE...'));
  const ide = detectIDE();
  console.log(chalk.green(`✓ Detected: ${ide.name}`));

  // Step 2: Configure MCP
  console.log(chalk.blue('\nStep 2: Configuring MCP server...'));
  const mcpConfigured = await configureMCP(ide);
  if (!mcpConfigured) {
    console.log(chalk.yellow('⚠ MCP configuration skipped or failed'));
  }

  // Step 3: Install agents
  console.log(chalk.blue('\nStep 3: Installing agents...'));
  const agentsPath = await installAgents(process.cwd());
  if (!agentsPath) {
    console.log(chalk.red('✗ Failed to install agents'));
    process.exit(1);
  }

  // Step 4: Find add-velt CLI
  console.log(chalk.blue('\nStep 4: Locating Velt CLI...'));
  const cliPath = findAddVeltCLI();
  console.log(chalk.green(`✓ CLI path: ${cliPath}`));

  // Step 5: Save configuration
  const config = {
    ide: ide.name,
    agentsPath,
    cliPath,
    mcpConfigured,
    installedAt: new Date().toISOString()
  };

  const configPath = await saveConfig(config);

  console.log(chalk.green.bold('\n✓ Installation complete!\n'));
  console.log(chalk.cyan('Configuration saved to:'), configPath);
  console.log(chalk.cyan('Agents installed at:'), agentsPath);

  console.log(chalk.yellow.bold('\n📋 Next Steps:\n'));
  console.log(chalk.white('1. Set your environment variables:'));
  console.log(chalk.gray('   export VELT_API_KEY=your_api_key'));
  console.log(chalk.gray('   export VELT_AUTH_TOKEN=your_auth_token\n'));
  console.log(chalk.white('2. Open your IDE and invoke the coordinator agent:'));
  console.log(chalk.gray('   @velt-coordinator install velt\n'));
  console.log(chalk.white('3. Follow the agent prompts to complete installation\n'));

  console.log(chalk.green('Happy coding with Velt! 🎉\n'));
}

// Run the initialization
init().catch((error) => {
  console.error(chalk.red('Error during initialization:'), error);
  process.exit(1);
});
