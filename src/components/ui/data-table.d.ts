import { ColumnDef } from '@tanstack/react-table';
export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
    onRowClick?: (row: TData) => void;
    loading?: boolean;
}
export declare function DataTable<TData, TValue>({ columns, data, className, onRowClick, loading, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
