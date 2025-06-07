'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ComparisonItem {
  item: string;
  original: string;
  newVersion: string;
}

const defaultData: ComparisonItem[] = [
  { item: '實現方式', original: 'CSS 類名', newVersion: 'React 組件' },
  { item: '配置位置', original: 'tailwind.config.ts', newVersion: 'components/ui/prose.tsx' },
  { item: '樣式應用', original: '`prose prose-lg dark:prose-invert`', newVersion: '`<Prose>` 組件包裝' },
  { item: '自定義程度', original: 'Tailwind 配置', newVersion: 'React props + CSS 類' },
];

const columnHelper = createColumnHelper<ComparisonItem>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<ComparisonItem, any>[] = [
  columnHelper.accessor('item', {
    header: () => '項目',
    cell: info => <span className="font-medium">{info.getValue()}</span>,
    size: 25,
  }),
  columnHelper.accessor('original', {
    header: () => '原始 (Typography)',
    cell: info => info.getValue(),
    size: 37.5,
  }),
  columnHelper.accessor('newVersion', {
    header: () => '新版 (shadcn-prose)',
    cell: info => info.getValue(),
    size: 37.5,
  }),
];

export const TypographyVsShadcnProseTable: React.FC = () => {
  const [data] = React.useState(() => [...defaultData]);

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="not-prose overflow-x-auto my-6 rounded-md border">
      <Table>
        <TableHeader>
          {tableInstance.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead 
                  key={header.id} 
                  style={{ width: `${header.getSize()}%` }}
                  className="px-6 py-4 text-left align-middle font-medium whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {tableInstance.getRowModel().rows.length ? (
            tableInstance.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell 
                    key={cell.id} 
                    style={{ width: `${cell.column.getSize()}%` }}
                    className="px-6 py-4 align-middle leading-relaxed"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center px-6 py-4">
                無資料。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
