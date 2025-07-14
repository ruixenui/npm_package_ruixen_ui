#!/usr/bin/env node

const { Command } = require('commander');
const { init } = require('./commands/init');
const { addComponent } = require('./commands/add-component');
const { list } = require('./commands/list');

// Simple logging functions with ANSI colors
const error = (message: string): void => {
  console.error(`\x1b[31mError: ${message}\x1b[0m`);
};

const success = (message: string): void => {
  console.log(`\x1b[32m${message}\x1b[0m`);
};

const program = new Command();

program
  .name('ruixen-ui')
  .description('Ruixen UI component library CLI')
  .version('1.0.1');

program
  .command('init')
  .description('Initialize a new project with Ruixen UI')
  .option('-y, --yes', 'Skip confirmation prompt')
  .option('--typescript', 'Initialize with TypeScript (default)')
  .option('--javascript', 'Initialize with JavaScript')
  .option('--tailwind <config>', 'Tailwind config file (default: tailwind.config.js)')
  .option('--css <path>', 'Path to CSS file (default: src/app/globals.css)')
  .option('--components <path>', 'Path to components directory (default: components/ui)')
  .option('--force', 'Force installation')
  .action(init);

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-a, --all', 'Add all available components')
  .action(async (components: string[] = [], options: { all?: boolean } = {}) => {
    try {
      if (components.length === 0 && !options.all) {
        // Interactive mode - show component selection
        await addComponent();
      } else if (options.all) {
        // Add all components
        await addComponent(undefined, { all: true });
      } else {
        console.log('\x1b[33mNo components found to add. Please specify components to add or use --all to add all components\x1b[0m');
        for (const component of components) {
          await addComponent(component);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      error(message);
      console.error(`\x1b[31mError: ${message}\x1b[0m`);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available components')
  .action(async () => {
    try {
      await list();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      error(message);
      process.exit(1);
    }
  });

program.parse();