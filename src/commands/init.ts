import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import type { InitOptions } from '../types';

export async function init(options: InitOptions = {}) {
  const cwd = process.cwd();
  
  console.log(chalk.blue('🚀 Initializing ruixen-ui...'));
  
  // Check if this is a Next.js project
  const packageJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('No package.json found. Please run this command in a Next.js project.');
  }
  
  const packageJson = await fs.readJson(packageJsonPath);
  const isNextProject = packageJson.dependencies?.next || packageJson.devDependencies?.next;
  
  if (!isNextProject) {
    console.log(chalk.yellow('⚠️  This doesn\'t appear to be a Next.js project. ruixen-ui is optimized for Next.js.'));
    
    if (!options.yes) {
      const { continue: shouldContinue } = await prompts({
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to continue anyway?',
        initial: false
      });
      
      if (!shouldContinue) {
        process.exit(0);
      }
    }
  }
  
  const spinner = ora('Setting up ruixen-ui configuration...').start();
  
  try {
    // Create ruixen-ui config
    const configPath = path.join(cwd, 'ruixen-ui.json');
    const config = {
      $schema: "https://ruixen.com/schema.json",
      style: "default",
      rsc: true,
      tsx: !options.javascript,
      tailwind: {
        config: "tailwind.config.js",
        css: "app/globals.css",
        baseColor: "neutral",
        cssVariables: true,
        prefix: ""
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        ruixen: "@/components/ruixen"
      }
    };
    
    await fs.writeJson(configPath, config, { spaces: 2 });
    
    // Create directories
    await fs.ensureDir(path.join(cwd, 'components/ruixen'));
    await fs.ensureDir(path.join(cwd, 'lib'));
    
    // Create utils file
    const utilsPath = path.join(cwd, 'lib/utils.ts');
    const utilsContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
`;
    
    await fs.writeFile(utilsPath, utilsContent);
    
    // Update package.json with required dependencies
    const requiredDeps = [
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'lucide-react',
      '@radix-ui/react-slot'
    ];
    
    const missingDeps = requiredDeps.filter(dep => 
      !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
    );
    
    if (missingDeps.length > 0) {
      spinner.text = 'Installing required dependencies...';
      // Here you would typically run npm install, but for this example we'll just show the message
      console.log(chalk.yellow(`\n📦 Please install the following dependencies:`));
      console.log(chalk.gray(`npm install ${missingDeps.join(' ')}`));
    }
    
    spinner.succeed('ruixen-ui initialized successfully!');
    
    console.log(chalk.green('\n✅ Setup complete!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.gray('1. Run: npx ruixen-ui add button'));
    console.log(chalk.gray('2. Start using ruixen-ui components in your project'));
    console.log(chalk.gray('3. Check out the docs: https://ruixen-ui.com'));
    
  } catch (error) {
    spinner.fail('Failed to initialize ruixen-ui');
    throw error;
  }
}