"use client";

import React from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';

type PricingPlan = {
  scenario: string;
  aider: string;
  claudeCode: string;
  monthlyCost: string;
};

const data: PricingPlan[] = [
  {
    scenario: '日常開發',
    aider: '$0.5-2/天',
    claudeCode: '$2-10/天',
    monthlyCost: '$15-75',
  },
  {
    scenario: '大型專案',
    aider: '$2-5/天',
    claudeCode: '$5-25/天',
    monthlyCost: '$50-225',
  },
  {
    scenario: '企業級使用',
    aider: '$5-15/天',
    claudeCode: '$15-50/天',
    monthlyCost: '$150-487',
  },
];

const columnHelper = createColumnHelper<PricingPlan>();

const columns = [
  columnHelper.accessor('scenario', {
    header: '使用場景',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('aider', {
    header: 'Aider (Claude Sonnet)',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('claudeCode', {
    header: 'Claude Code',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('monthlyCost', {
    header: '每月預估成本',
    cell: info => info.getValue(),
  }),
];

const PricingTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse min-w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100 dark:bg-gray-800">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border border-gray-300 dark:border-gray-700 p-2 text-left font-medium"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border border-gray-300 dark:border-gray-700 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
