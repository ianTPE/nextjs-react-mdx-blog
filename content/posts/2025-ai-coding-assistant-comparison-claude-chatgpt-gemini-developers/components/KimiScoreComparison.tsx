import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface Score {
  dimension: string;
  score: string;
  comment: string;
}

const data: Score[] = [
  { dimension: '技術深度', score: '7/10', comment: '能理解問題，但深度不足' },
  { dimension: '實用性', score: '6/10', comment: '代碼片段可用，但缺乏整體性' },
  { dimension: '結構性', score: '7/10', comment: '回答有條理' },
  { dimension: '完整性', score: '6/10', comment: '僅涵蓋部分方面' },
  { dimension: '安全性考量', score: '5/10', comment: '提及基本安全，不深入' },
  { dimension: '創新性', score: '4/10', comment: '方案常規' },
];

const columns: ColumnDef<Score>[] = [
  {
    accessorKey: 'dimension',
    header: '維度',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'score',
    header: '評分',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'comment',
    header: '評語',
    cell: info => info.getValue(),
  },
];

export default function KimiScoreComparison() {
  const table = useReactTable<Score>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
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
