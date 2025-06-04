import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

interface Score {
  dimension: string
  score: string
  comment: string
}

const data: Score[] = [
  { dimension: '技術深度', score: '9/10', comment: '深入解釋技術原理和選擇理由' },
  { dimension: '實用性', score: '8/10', comment: '代碼示例好但略顯複雜' },
  { dimension: '結構性', score: '8/10', comment: '邏輯清晰但稍顯冗長' },
  { dimension: '完整性', score: '8/10', comment: '覆蓋全面但重點不夠突出' },
  { dimension: '安全性考量', score: '8/10', comment: '安全考慮詳細' },
  { dimension: '創新性', score: '8/10', comment: '提供多種技術方案對比' },
]

const columns: ColumnDef<Score>[] = [
  { header: '維度', accessorKey: 'dimension' },
  { header: '評分', accessorKey: 'score' },
  { header: '評語', accessorKey: 'comment' },
]

export default function ChatGPTScoreComparison() {
  const table = useReactTable<Score>({
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
  )
}
