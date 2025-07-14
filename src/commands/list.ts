import chalk from 'chalk';

const COMPONENTS = {
  'button': {
    name: 'Button',
    description: 'Enhanced button component with loading states and variants',
    status: 'stable'
  },
  'button-01': {
    name: 'Button_01',
    description: 'Slide to delete button with drag interaction',
    status: 'stable'
  },
  'card': {
    name: 'Card',
    description: 'Flexible card component with header, content, and footer',
    status: 'stable'
  },
  'data-table': {
    name: 'DataTable',
    description: 'Advanced data table with sorting, filtering, and pagination',
    status: 'beta'
  },
  'form': {
    name: 'Form',
    description: 'Form components with validation and error handling',
    status: 'stable'
  },
  'dashboard': {
    name: 'Dashboard',
    description: 'Dashboard layout with sidebar and header',
    status: 'stable'
  },
  'auth': {
    name: 'Auth',
    description: 'Authentication components (login, register, etc.)',
    status: 'stable'
  }
};

export async function list() {
  console.log(chalk.blue('📦 Available ruixen-ui components:\n'));
  
  Object.entries(COMPONENTS).forEach(([key, component]) => {
    const statusColor = component.status === 'stable' ? 'green' : 'yellow';
    const statusBadge = chalk[statusColor](`[${component.status}]`);
    
    console.log(`${chalk.bold(component.name)} ${statusBadge}`);
    console.log(`  ${chalk.gray(component.description)}`);
    console.log(`  ${chalk.cyan(`npx ruixen-ui add ${key}`)}\n`);
  });
  
  console.log(chalk.gray('Usage: npx ruixen-ui add <component-name>'));
  console.log(chalk.gray('Example: npx ruixen-ui add button card form'));
}