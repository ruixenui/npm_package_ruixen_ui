// Add global type declarations here
declare module 'fs-extra';
declare module 'prompts';

// Add path aliases
declare module '@/lib/utils' {
  import { cn } from '../lib/utils';
  export { cn };
  // Add other exports from utils if needed
}
