import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type SolutionComparison = {
  solution: string;
  pros: string;
  cons: string;
  scenario: string;
};

const defaultData: SolutionComparison[] = [
  {
    solution: '@mdx-js/esbuild',
    pros: '快速、簡潔',
    cons: '功能相對簡單',
    scenario: '中小型項目',
  },
  {
    solution: 'next-mdx-remote',
    pros: '功能豐富',
    cons: '性能開銷大',
    scenario: '內容管理系統',
  },
];

const columnHelper = createColumnHelper<SolutionComparison>();

const columns = [
  columnHelper.accessor('solution', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">方案</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('pros', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">優點</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('cons', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">缺點</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('scenario', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">適用場景</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
];

export const TechSolutionComparisonTable: React.FC = () => {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} scope="col" className="px-4 py-3 text-left">
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
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
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
