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

export type Tool = {
  tool: string
  purpose: string
  advantage: string
}

const data: Tool[] = [
  {
    tool: 'Zapier',
    purpose: '快速串接 1000+ 服務',
    advantage: '無需程式碼，5 分鐘完成設定',
  },
  {
    tool: 'n8n',
    purpose: '開源自動化平台',
    advantage: '完全控制，可自行架設',
  },
  {
    tool: 'Make (Integromat)',
    purpose: '複雜流程設計',
    advantage: '視覺化流程，支援條件判斷',
  },
]

export function ToolsTable() {
  const columns: ColumnDef<Tool>[] = [
    {
      accessorKey: 'tool',
      header: '工具',
      cell: ({ row }) => <div className="font-medium">{row.getValue('tool')}</div>,
    },
    {
      accessorKey: 'purpose',
      header: '用途',
      cell: ({ row }) => <div>{row.getValue('purpose')}</div>,
    },
    {
      accessorKey: 'advantage',
      header: '優勢',
      cell: ({ row }) => <div>{row.getValue('advantage')}</div>,
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
