// Main export file for ruixen-ui components
import { ColumnDef, Row } from '@tanstack/react-table';

// Button
export { Button, buttonVariants } from './components/ui/button';
export type { ButtonProps } from './components/ui/button';

// Card
import { CardHeader } from './components/ui/card';
import { CardFooter } from './components/ui/card';
import { CardTitle } from './components/ui/card';
import { CardDescription } from './components/ui/card';
import { CardContent } from './components/ui/card';
import { Card } from './components/ui/card';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

// Form
export * from './components/ui/form';

// Data Table
export { DataTable } from './components/ui/data-table';
export type { ColumnDef, Row };

// Utility exports
export { cn } from './lib/utils';

// Types
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: Row<TData>) => void;
  loading?: boolean;
  pageSize?: number;
  pageCount?: number;
  onPaginationChange?: (pagination: any) => void;
}

export interface FormBuilderProps {
  form: any;
  onSubmit: (values: any) => void;
  children: React.ReactNode;
  className?: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password';
  onSubmit: (values: any) => void;
  loading?: boolean;
  error?: string | null;
}