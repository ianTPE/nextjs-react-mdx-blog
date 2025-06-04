'use client';

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
  { dimension: '技術深度', score: '5/10', comment: '深度不夠' },
  { dimension: '實用性', score: '6/10', comment: '重點突出' },
  { dimension: '結構性', score: '6/10', comment: '相對簡潔' },
  { dimension: '完整性', score: '5/10', comment: '細節較少' },
  { dimension: '安全性考量', score: '5/10', comment: '基本提及' },
  { dimension: '創新性', score: '5/10', comment: '缺乏創新' },
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

export function GrokScoreComparison() {
  const table = useReactTable<Score>({
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

export default GrokScoreComparison;
