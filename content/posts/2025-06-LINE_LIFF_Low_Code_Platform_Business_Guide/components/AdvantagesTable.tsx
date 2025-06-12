'use client'

import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type Advantage = {
  advantage: string
  description: string
}

const data: Advantage[] = [
  {
    advantage: '開發速度提升 5 倍',
    description: '從傳統的 2-6 個月縮短到 1-4 週',
  },
  {
    advantage: '成本降低 70%',
    description: '減少對專業工程師的依賴',
  },
  {
    advantage: '維護簡單',
    description: '業務人員可自行調整，無需 IT 介入',
  },
  {
    advantage: '快速迭代',
    description: '即時響應市場變化，快速調整功能',
  },
  {
    advantage: '規模化潛力',
    description: '一套解決方案可服務多個客戶',
  },
]

export function AdvantagesTable() {
  const columns: ColumnDef<Advantage>[] = [
    {
      accessorKey: 'advantage',
      header: '優勢',
      cell: ({ row }) => <div className="font-medium">{row.getValue('advantage')}</div>,
    },
    {
      accessorKey: 'description',
      header: '說明',
      cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border not-prose">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
