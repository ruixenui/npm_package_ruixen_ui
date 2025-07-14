import { Row as TableRow } from '@tanstack/react-table';

export interface ColumnDef<TData, TValue = unknown> {
  accessorKey: keyof TData | string;
  header: string | ((props: any) => React.ReactNode);
  cell?: (props: { row: TableRow<TData>; getValue: () => TValue }) => React.ReactNode;
  filterFn?: (row: TableRow<TData>, id: string, filterValue: any) => boolean;
  sortable?: boolean;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
}

export type { Row } from '@tanstack/react-table';
