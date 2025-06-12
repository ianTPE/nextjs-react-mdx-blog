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

export type Timeline = {
  quarter: string
  revenue: string
  customers: string
  teamSize: string
  keyTask: string
}

const data: Timeline[] = [
  {
    quarter: 'Q1',
    revenue: '50 萬',
    customers: '20',
    teamSize: '2 人',
    keyTask: '產品市場契合',
  },
  {
    quarter: 'Q2',
    revenue: '150 萬',
    customers: '50',
    teamSize: '3 人',
    keyTask: '銷售流程建立',
  },
  {
    quarter: 'Q3',
    revenue: '300 萬',
    customers: '100',
    teamSize: '5 人',
    keyTask: '第二產品線',
  },
  {
    quarter: 'Q4',
    revenue: '500 萬',
    customers: '200',
    teamSize: '8 人',
    keyTask: '規模化系統',
  },
]

export function TimelineTable() {
  const columns: ColumnDef<Timeline>[] = [
    {
      accessorKey: 'quarter',
      header: '時程',
      cell: ({ row }) => <div className="font-medium">{row.getValue('quarter')}</div>,
    },
    {
      accessorKey: 'revenue',
      header: '營收目標',
      cell: ({ row }) => <div>{row.getValue('revenue')}</div>,
    },
    {
      accessorKey: 'customers',
      header: '客戶數',
      cell: ({ row }) => <div>{row.getValue('customers')}</div>,
    },
    {
      accessorKey: 'teamSize',
      header: '團隊規模',
      cell: ({ row }) => <div>{row.getValue('teamSize')}</div>,
    },
    {
      accessorKey: 'keyTask',
      header: '關鍵任務',
      cell: ({ row }) => <div>{row.getValue('keyTask')}</div>,
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
