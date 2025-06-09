'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Assuming shadcn/ui table components are here

type SalaryData = {
  positionType: string;
  entryLevelSalary: string;
  midSeniorSalary: string;
  medianAnnualSalary: string;
  marketCharacteristics: string;
};

const defaultData: SalaryData[] = [
  {
    positionType: '前端工程師',
    entryLevelSalary: '40K',
    midSeniorSalary: '70K',
    medianAnnualSalary: '91萬',
    marketCharacteristics: '職缺顯性高，競爭激烈',
  },
  {
    positionType: '後端工程師',
    entryLevelSalary: '50K',
    midSeniorSalary: '68K-80K',
    medianAnnualSalary: '96萬',
    marketCharacteristics: '進入門檻高，薪資成長空間大',
  },
  {
    positionType: '全端工程師',
    entryLevelSalary: '60K',
    midSeniorSalary: '76K',
    medianAnnualSalary: '120萬+',
    marketCharacteristics: '中小企業搶手，職缺總量較少',
  },
];

const columnHelper = createColumnHelper<SalaryData>();

const columns = [
  columnHelper.accessor('positionType', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">職位類型</span>,
    cell: info => <div className="text-sm text-gray-900 dark:text-gray-100 py-2 px-3 min-w-[100px]">{info.getValue()}</div>,
  }),
  columnHelper.accessor('entryLevelSalary', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">初階月薪</span>,
    cell: info => <div className="text-sm text-gray-900 dark:text-gray-100 py-2 px-3 min-w-[80px]">{info.getValue()}</div>,
  }),
  columnHelper.accessor('midSeniorSalary', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">中高階月薪</span>,
    cell: info => <div className="text-sm text-gray-900 dark:text-gray-100 py-2 px-3 min-w-[100px]">{info.getValue()}</div>,
  }),
  columnHelper.accessor('medianAnnualSalary', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">年薪中位數</span>,
    cell: info => <div className="text-sm text-gray-900 dark:text-gray-100 py-2 px-3 min-w-[100px]">{info.getValue()}</div>,
  }),
  columnHelper.accessor('marketCharacteristics', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">市場特點</span>,
    cell: info => <div className="text-sm text-gray-900 dark:text-gray-100 py-2 px-3 min-w-[200px]">{info.getValue()}</div>,
  }),
];

export function SalaryComparisonTable() {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="not-prose w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm my-6">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="px-3 py-3 text-left">
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
        <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="p-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
