import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Solution = {
  solution: string;
  advantages: string;
  disadvantages: string;
  suitableScenarios: string;
};

const data: Solution[] = [
  {
    solution: '@mdx-js/esbuild',
    advantages: '快速、簡潔',
    disadvantages: '功能相對簡單',
    suitableScenarios: '中小型項目',
  },
  {
    solution: 'next-mdx-remote',
    advantages: '功能豐富',
    disadvantages: '性能開銷大',
    suitableScenarios: '內容管理系統',
  },
];

export default function TechSolutionComparisonTable() {
  const columnHelper = createColumnHelper<Solution>();

  const columns = [
    columnHelper.accessor('solution', {
      header: '方案',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('advantages', {
      header: '優點',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('disadvantages', {
      header: '缺點',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('suitableScenarios', {
      header: '適用場景',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border shadow-sm bg-white dark:bg-gray-800">
        <thead className="bg-purple-500 dark:bg-purple-700 text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className="border border-gray-300 p-3 text-left text-sm font-semibold"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="even:bg-gray-50 hover:bg-gray-200">
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className="border border-gray-300 p-3 text-sm text-gray-800"
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
