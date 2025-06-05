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
      <table className="min-w-full border-collapse rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-green-50 dark:bg-green-900">
            {table.getHeaderGroups().map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="p-3 text-left text-sm font-semibold text-green-800 dark:text-green-200"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="even:bg-gray-50 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className="p-3 text-sm text-gray-800 dark:text-gray-200 font-medium"
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
