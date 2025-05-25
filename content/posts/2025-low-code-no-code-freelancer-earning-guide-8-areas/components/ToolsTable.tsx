'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Tool = {
  applicationType: string;
  recommendedTools: string;
  learningCurve: string;
  marketDemand: string;
};

const data: Tool[] = [
  {
    applicationType: '電商平台',
    recommendedTools: 'Shopify、Bubble',
    learningCurve: '中等',
    marketDemand: '5星',
  },
  {
    applicationType: '內部工具',
    recommendedTools: 'Retool、Appsmith',
    learningCurve: '較高',
    marketDemand: '4星',
  },
  {
    applicationType: '行銷網站',
    recommendedTools: 'Webflow、Framer',
    learningCurve: '較低',
    marketDemand: '4星',
  },
  {
    applicationType: '表單流程',
    recommendedTools: 'Airtable、Zapier',
    learningCurve: '低',
    marketDemand: '3星',
  },
];

const columnHelper = createColumnHelper<Tool>();

const columns = [
  columnHelper.accessor('applicationType', {
    header: '應用類型',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('recommendedTools', {
    header: '推薦工具',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('learningCurve', {
    header: '學習曲線',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('marketDemand', {
    header: '市場需求',
    cell: info => {
      const value = info.getValue();
      const match = value.match(/\d+/);
      const stars = match ? Number.parseInt(match[0], 10) : 0;
      return (
        <div className="flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <span key={`star-${i}-${value}`} className={`text-lg ${i < stars ? 'text-amber-500' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
      );
    },
  }),
];

export default function ToolsTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse my-4 text-sm md:text-base">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100 dark:bg-gray-800">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
            <tr 
              key={row.id}
              className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
