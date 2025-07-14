"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_table_1 = require("@tanstack/react-table");
const utils_1 = require("../../src/lib/utils");
function DataTable({ columns, data, className, onRowClick, loading = false, }) {
    const table = (0, react_table_1.useReactTable)({
        data,
        columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
    });
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center p-8", children: "Loading..." });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-full', className), children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-md border", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: table.getHeaderGroups().map((headerGroup) => ((0, jsx_runtime_1.jsx)("tr", { children: headerGroup.headers.map((header) => ((0, jsx_runtime_1.jsx)("th", { className: "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", children: header.isPlaceholder
                                    ? null
                                    : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext()) }, header.id))) }, headerGroup.id))) }), (0, jsx_runtime_1.jsx)("tbody", { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => ((0, jsx_runtime_1.jsx)("tr", { className: (0, utils_1.cn)('border-b transition-colors hover:bg-muted/50', onRowClick && 'cursor-pointer'), onClick: () => onRowClick?.(row.original), children: row.getVisibleCells().map((cell) => ((0, jsx_runtime_1.jsx)("td", { className: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", children: (0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) : ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, className: "h-24 text-center text-muted-foreground", children: "No results." }) })) })] }) }) }));
}
exports.DataTable = DataTable;
