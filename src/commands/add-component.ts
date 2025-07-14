const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const chalk = require('chalk');
const { prompt } = require('enquirer');

const execAsync = promisify(exec);

interface ComponentConfig {
  name: string;
  category: string;
  files: string[];
  dependencies?: string[];
}

async function getAvailableComponents(): Promise<ComponentConfig[]> {
  const componentsDir = path.join(__dirname, '../../components/ruixen/components');
  const categories = await fs.readdir(componentsDir);
  
  const components: ComponentConfig[] = [];
  
  for (const category of categories) {
    const categoryPath = path.join(componentsDir, category);
    const stat = await fs.stat(categoryPath);
    
    if (stat.isDirectory()) {
      const componentDirs = await fs.readdir(categoryPath);
      
      for (const componentDir of componentDirs) {
        const componentPath = path.join(categoryPath, componentDir);
        const componentStat = await fs.stat(componentPath);
        
        if (componentStat.isDirectory()) {
          components.push({
            name: componentDir,
            category,
            files: (await fs.readdir(componentPath))
              .filter((file: string) => file.endsWith('.tsx') || file.endsWith('.ts'))
          });
        }
      }
    }
  }
  
  return components;
}

export async function addComponent(componentName?: string, options: { all?: boolean } = {}) {
  try {
    const components = await getAvailableComponents();
    
    if (components.length === 0) {
      console.error(chalk.red('No components found!'));
      return;
    }
    
    let selectedComponents = components;
    
    if (!options.all && !componentName) {
      const { selected } = await (prompt as any)({
        type: 'multiselect',
        name: 'selected',
        message: 'Select components to add',
        choices: components.map(c => ({
          name: `${c.category}/${c.name}`,
          value: `${c.category}/${c.name}`,
        })),
      });
      
      selectedComponents = components.filter(c => 
        selected.includes(`${c.category}/${c.name}`)
      );
    } else if (componentName) {
      selectedComponents = components.filter(c => 
        c.name.toLowerCase() === componentName.toLowerCase() ||
        `${c.category}/${c.name}`.toLowerCase() === componentName.toLowerCase()
      );
      
      if (selectedComponents.length === 0) {
        console.error(chalk.red(`Component "${componentName}" not found!`));
        return;
      }
    }
    
    // Create components directory if it doesn't exist
    const targetDir = path.join(process.cwd(), 'components/ui');
    await fs.ensureDir(targetDir);
    
    // Copy components
    for (const component of selectedComponents) {
      const sourceDir = path.join(__dirname, `../../components/ruixen/components/${component.category}/${component.name}`);
      const targetComponentDir = path.join(targetDir, component.name);
      
      await fs.ensureDir(targetComponentDir);
      
      for (const file of component.files) {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetComponentDir, file);
        
        // Replace @/ imports with relative paths
        let content = await fs.readFile(sourceFile, 'utf-8');
        content = content.replace(
          /from "@\/components\/ui\/([^"]+)"/g, 
          'from "../$1"'
        );
        
        await fs.writeFile(targetFile, content);
      }
      
      console.log(chalk.green(`✓ Added ${component.category}/${component.name}`));
    }
    
    console.log(chalk.green('\nComponents added successfully!'));
    
  } catch (error) {
    console.error(chalk.red('Error adding components:'), error);
  }
}
