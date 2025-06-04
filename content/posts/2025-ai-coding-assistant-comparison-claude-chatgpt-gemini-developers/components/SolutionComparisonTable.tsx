import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface Solution {
  solution: string;
  pros: string;
  cons: string;
  scenario: string;
}

const data: Solution[] = [
  { solution: '@mdx-js/esbuild', pros: '快速、簡潔', cons: '功能相對簡單', scenario: '中小型項目' },
  { solution: 'next-mdx-remote', pros: '功能豐富', cons: '性能開銷大', scenario: '內容管理系統' },
];

const columns: ColumnDef<Solution>[] = [
  {
    accessorKey: 'solution',
    header: '方案',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'pros',
    header: '優點',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'cons',
    header: '缺點',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'scenario',
    header: '適用場景',
    cell: info => info.getValue(),
  },
];

export default function SolutionComparisonTable() {
  const table = useReactTable<Solution>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto my-6">
      <table className="min-w-[600px] w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700"
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="even:bg-gray-50 hover:bg-gray-200">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 p-3 text-sm text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center border border-gray-300 p-3 text-sm text-gray-500"
              >
                沒有結果。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
