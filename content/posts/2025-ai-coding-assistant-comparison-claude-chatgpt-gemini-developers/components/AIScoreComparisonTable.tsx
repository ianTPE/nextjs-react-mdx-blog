import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

interface AIScore {
  dimension: string
  score: string
  comment: string
}

const data: AIScore[] = [
  { dimension: '技術深度', score: '9/10', comment: '深入理解 MDX 編譯和 SSR 機制' },
  { dimension: '實用性', score: '10/10', comment: '代碼可直接運行，結構完整' },
  { dimension: '結構性', score: '10/10', comment: '層次清晰，邏輯連貫' },
  { dimension: '完整性', score: '9/10', comment: '涵蓋所有關鍵環節' },
  { dimension: '安全性考量', score: '9/10', comment: '詳細的安全建議' },
  { dimension: '創新性', score: '9/10', comment: '提供管理界面等創新建議' },
]

const columns: ColumnDef<AIScore>[] = [
  {
    header: '維度',
    accessorKey: 'dimension',
  },
  {
    header: '評分',
    accessorKey: 'score',
  },
  {
    header: '評語',
    accessorKey: 'comment',
  },
]

export default function AIScoreComparisonTable() {
  const table = useReactTable<AIScore>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="border p-2 text-left bg-gray-100">
                {flexRender(
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
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border p-2">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
