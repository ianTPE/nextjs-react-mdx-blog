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

interface ScoreItem {
  factor: string;
  weight: string;
  typography: string;
  typographyBold?: boolean;
  shadcnProse: string;
  shadcnProseBold?: boolean;
  recommendation: string;
  recommendationBold?: boolean;
}

const defaultData: ScoreItem[] = [
  { factor: '維護成本', weight: '⭐⭐⭐', typography: '8/10', shadcnProse: '7/10', recommendation: 'Typography' },
  { factor: '功能靈活性', weight: '⭐⭐⭐', typography: '6/10', shadcnProse: '9/10', recommendation: 'shadcn-prose', recommendationBold: true },
  { factor: '效能表現', weight: '⭐⭐', typography: '9/10', shadcnProse: '8/10', recommendation: 'Typography' },
  { factor: '生態整合', weight: '⭐⭐⭐', typography: '5/10', shadcnProse: '10/10', recommendation: 'shadcn-prose', recommendationBold: true },
  { factor: '學習成本', weight: '⭐⭐', typography: '9/10', shadcnProse: '6/10', recommendation: 'Typography' },
  { factor: '總分', weight: '-', typography: '7.4/10', typographyBold: true, shadcnProse: '8.0/10', shadcnProseBold: true, recommendation: 'shadcn-prose', recommendationBold: true },
];

const columnHelper = createColumnHelper<ScoreItem>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<ScoreItem, any>[] = [
  columnHelper.accessor('factor', {
    header: () => '考量因素',
    cell: info => <span className="font-medium whitespace-nowrap">{info.getValue()}</span>,
    size: 20,
  }),
  columnHelper.accessor('weight', {
    header: () => '權重',
    cell: info => info.getValue(),
    size: 15,
  }),
  columnHelper.accessor('typography', {
    header: () => 'Typography',
    cell: info => info.row.original.typographyBold ? <strong>{info.getValue()}</strong> : info.getValue(),
    size: 20,
  }),
  columnHelper.accessor('shadcnProse', {
    header: () => 'shadcn-prose',
    cell: info => info.row.original.shadcnProseBold ? <strong>{info.getValue()}</strong> : info.getValue(),
    size: 20,
  }),
  columnHelper.accessor('recommendation', {
    header: () => '推薦',
    cell: info => info.row.original.recommendationBold ? <strong>{info.getValue()}</strong> : info.getValue(),
    size: 25,
  }),
];

export const ProseComparisonScoreTable: React.FC = () => {
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
                <TableHead key={header.id} style={{ width: `${header.getSize()}%` }} className={header.column.id === 'weight' ? 'text-center' : ''}>
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
                  <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}%` }} className={cell.column.id === 'weight' ? 'text-center align-middle' : ''}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                無資料。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
