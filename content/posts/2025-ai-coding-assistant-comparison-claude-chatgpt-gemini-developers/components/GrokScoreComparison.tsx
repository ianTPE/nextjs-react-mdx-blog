'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

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
    // cell: ({ row }) => <div className="font-medium">{row.getValue('dimension')}</div>, // Keep original cell rendering for now
  },
  {
    accessorKey: 'score',
    header: '評分',
    // cell: ({ row }) => <div>{row.getValue('score')}</div>, // Keep original cell rendering for now
  },
  {
    accessorKey: 'comment',
    header: '評語',
    // cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue('comment')}</div>, // Keep original cell rendering for now
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
      <div className="rounded-md border min-w-[600px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  沒有結果。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default GrokScoreComparison;
