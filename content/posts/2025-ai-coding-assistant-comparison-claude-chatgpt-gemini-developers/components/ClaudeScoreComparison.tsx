import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface Score {
  dimension: string
  score: string
  comment: string
}

const data: Score[] = [
  { dimension: '技術深度', score: '9/10', comment: '深入理解 MDX 編譯和 SSR 機制' },
  { dimension: '實用性', score: '10/10', comment: '代碼可直接運行，結構完整' },
  { dimension: '結構性', score: '10/10', comment: '層次清晰，邏輯連貫' },
  { dimension: '完整性', score: '9/10', comment: '涵蓋所有關鍵環節' },
  { dimension: '安全性考量', score: '9/10', comment: '詳細的安全建議' },
  { dimension: '創新性', score: '9/10', comment: '提供管理界面等創新建議' },
]

const columns: ColumnDef<Score>[] = [
  { header: '維度', accessorKey: 'dimension' },
  { header: '評分', accessorKey: 'score' },
  { header: '評語', accessorKey: 'comment' },
]

export default function ClaudeScoreComparison() {
  const table = useReactTable<Score>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="w-full overflow-x-auto my-6">
      <div className="rounded-md border min-w-[600px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap h-auto !py-0 px-4 text-left align-middle font-medium leading-tight">
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
                    <TableCell key={cell.id} className="whitespace-nowrap !py-0 px-4 align-middle leading-tight">
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
