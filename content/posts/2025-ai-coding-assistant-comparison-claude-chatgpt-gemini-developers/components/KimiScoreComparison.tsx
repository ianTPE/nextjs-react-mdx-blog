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
  { header: '維度', accessorKey: 'dimension' },
  { header: '評分', accessorKey: 'score' },
  { header: '評語', accessorKey: 'comment' },
];

export default function KimiScoreComparison() {
  const table = useReactTable<Score>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="border p-2 text-left bg-gray-100">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
