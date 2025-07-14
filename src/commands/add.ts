import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { execSync } from 'child_process';
// Using relative path to avoid module resolution issues
interface ComponentConfig {
  name: string;
  description: string;
  dependencies: string[];
  shadcnDeps?: string[];
}

interface ComponentsMap {
  [key: string]: ComponentConfig;
}

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

const COMPONENTS: ComponentsMap = {
  'button': {
    name: 'Button',
    description: 'Enhanced button component with loading states and variants',
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority']
  },
  'button-01': {
    name: 'Button_01',
    description: 'Slide to delete button with drag interaction',
    dependencies: ['framer-motion'],
    shadcnDeps: ['button']
  },
  'card': {
    name: 'Card',
    description: 'Flexible card component with header, content, and footer',
    dependencies: []
  },
  'data-table': {
    name: 'DataTable',
    description: 'Advanced data table with sorting, filtering, and pagination',
    dependencies: ['@tanstack/react-table']
  },
  'form': {
    name: 'Form',
    description: 'Form components with validation and error handling',
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod']
  },
  'dashboard': {
    name: 'Dashboard',
    description: 'Dashboard layout with sidebar and header',
    dependencies: ['lucide-react']
  },
  'auth': {
    name: 'Auth',
    description: 'Authentication components (login, register, etc.)',
    dependencies: ['zod', 'react-hook-form']
  }
};

export async function add(components: string[], options: AddOptions = {}) {
  const cwd = process.cwd();
  
  // Check if ruixen-ui is initialized
  const configPath = path.join(cwd, 'ruixen-ui.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('ruixen-ui not initialized. Run `npx ruixen-ui init` first.');
  }
  
  const config = await fs.readJson(configPath);
  
  // Validate components
  const invalidComponents = components.filter(comp => !COMPONENTS[comp]);
  if (invalidComponents.length > 0) {
    throw new Error(`Unknown components: ${invalidComponents.join(', ')}`);
  }
  
  // Check for shadcn/ui dependencies
  await checkShadcnDependencies(components, config, options);
  
  console.log(chalk.blue(`📦 Adding ${components.length} component(s)...`));
  
  for (const componentName of components) {
    const component = COMPONENTS[componentName];
    const spinner = ora(`Adding ${component.name}...`).start();
    
    try {
      const componentPath = path.join(cwd, config.aliases.ruixen.replace('@/', ''), `${componentName}.tsx`);
      
      // Check if component already exists
      if (fs.existsSync(componentPath) && !options.overwrite) {
        if (!options.yes) {
          const { overwrite } = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `${component.name} already exists. Overwrite?`,
            initial: false
          });
          
          if (!overwrite) {
            spinner.warn(`Skipped ${component.name}`);
            continue;
          }
        } else {
          spinner.warn(`Skipped ${component.name} (already exists)`);
          continue;
        }
      }
      
      // Get component content
      const componentContent = await getComponentContent(componentName);
      
      // Write component file
      await fs.writeFile(componentPath, componentContent);
      
      spinner.succeed(`Added ${component.name}`);
      
    } catch (error) {
      spinner.fail(`Failed to add ${component.name}`);
      throw error;
    }
  }
  
  // Install missing npm dependencies
  await installMissingDependencies(components, cwd);
  
  console.log(chalk.green('\n✅ Components added successfully!'));
  console.log(chalk.blue('\nUsage:'));
  components.forEach(comp => {
    const component = COMPONENTS[comp];
    console.log(chalk.gray(`import { ${component.name} } from "@/components/ruixen/${comp}";`));
  });
}

async function checkShadcnDependencies(components: string[], config: any, options: any) {
  const cwd = process.cwd();
  const missingShadcnComponents = [];
  
  for (const componentName of components) {
    const component = COMPONENTS[componentName];
    if (component.shadcnDeps) {
      for (const shadcnDep of component.shadcnDeps) {
        const shadcnPath = path.join(cwd, config.aliases.ui.replace('@/', ''), `${shadcnDep}.tsx`);
        if (!fs.existsSync(shadcnPath)) {
          missingShadcnComponents.push(shadcnDep);
        }
      }
    }
  }
  
  if (missingShadcnComponents.length > 0) {
    console.log(chalk.yellow('\n⚠️  Missing shadcn/ui components:'));
    missingShadcnComponents.forEach(comp => {
      console.log(chalk.gray(`  npx shadcn@latest add ${comp}`));
    });
    
    if (!options.yes) {
      const { continue: shouldContinue } = await prompts({
        type: 'confirm',
        name: 'continue',
        message: 'Continue without installing shadcn/ui components?',
        initial: true
      });
      
      if (!shouldContinue) {
        process.exit(0);
      }
    }
  }
}

async function installMissingDependencies(components: string[], cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const missingDeps = [];
  
  for (const componentName of components) {
    const component = COMPONENTS[componentName];
    if (component.dependencies) {
      for (const dep of component.dependencies) {
        if (!allDeps[dep]) {
          missingDeps.push(dep);
        }
      }
    }
  }
  
  if (missingDeps.length > 0) {
    console.log(chalk.yellow('\n📦 Missing npm dependencies:'));
    console.log(chalk.gray(`npm install ${missingDeps.join(' ')}`));
    console.log(chalk.blue('Please install these dependencies to use the components.'));
  }
}

async function getComponentContent(componentName: string): Promise<string> {
  const templatePath = path.join(__dirname, '..', 'templates', `${componentName}.tsx`);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template for ${componentName} not found`);
  }
  
  return await fs.readFile(templatePath, 'utf-8');
}