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

export type Risk = {
  type: string
  probability: string
  impact: string
  level: string
  mitigation: string
}

const data: Risk[] = [
  {
    type: '資料外洩',
    probability: '中',
    impact: '高',
    level: '高',
    mitigation: '加密、稽核、保險',
  },
  {
    type: '系統當機',
    probability: '低',
    impact: '高',
    level: '中',
    mitigation: '備援、監控、SLA',
  },
  {
    type: '法規違反',
    probability: '低',
    impact: '極高',
    level: '高',
    mitigation: '法遵審查、顧問',
  },
  {
    type: '平台終止服務',
    probability: '極低',
    impact: '高',
    level: '中',
    mitigation: '多平台策略',
  },
  {
    type: '競爭者模仿',
    probability: '高',
    impact: '中',
    level: '中',
    mitigation: '持續創新、專利',
  },
]

export function RiskTable() {
  const columns: ColumnDef<Risk>[] = [
    {
      accessorKey: 'type',
      header: '風險類型',
      cell: ({ row }) => <div className="font-medium">{row.getValue('type')}</div>,
    },
    {
      accessorKey: 'probability',
      header: '發生機率',
      cell: ({ row }) => <div>{row.getValue('probability')}</div>,
    },
    {
      accessorKey: 'impact',
      header: '影響程度',
      cell: ({ row }) => <div>{row.getValue('impact')}</div>,
    },
    {
      accessorKey: 'level',
      header: '風險等級',
      cell: ({ row }) => {
        const level = row.getValue('level') as string
        return (
          <div className={
            level === '高' ? 'text-red-500 font-medium' : 
            level === '中' ? 'text-yellow-500' : 'text-green-500'
          }>
            {level}
          </div>
        )
      },
    },
    {
      accessorKey: 'mitigation',
      header: '因應措施',
      cell: ({ row }) => <div>{row.getValue('mitigation')}</div>,
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
