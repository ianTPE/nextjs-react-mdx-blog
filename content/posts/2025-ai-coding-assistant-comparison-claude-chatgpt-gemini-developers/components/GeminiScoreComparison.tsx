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
  { dimension: '技術深度', score: '10/10', comment: '技術分析極其深入，考慮到所有邊緣情況' },
  { dimension: '實用性', score: '6/10', comment: '過於複雜，實際使用難度大' },
  { dimension: '結構性', score: '8/10', comment: '結構清晰但信息密度過高' },
  { dimension: '完整性', score: '10/10', comment: '覆蓋了所有可能的技術細節' },
  { dimension: '安全性考量', score: '10/10', comment: '安全分析最為詳盡' },
  { dimension: '創新性', score: '3/10', comment: '技術方案相對保守' },
]

const columns: ColumnDef<Score>[] = [
  { header: '維度', accessorKey: 'dimension' },
  { header: '評分', accessorKey: 'score' },
  { header: '評語', accessorKey: 'comment' },
]

export default function GeminiScoreComparison() {
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
