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

export type Pricing = {
  plan: string
  features: string
  price: string
  target: string
}

const data: Pricing[] = [
  {
    plan: '基礎版',
    features: '預約 + 會員管理',
    price: 'NT$2,000',
    target: '個人工作室',
  },
  {
    plan: '專業版',
    features: '+ 行銷工具 + API',
    price: 'NT$6,000',
    target: '中小企業',
  },
  {
    plan: '企業版',
    features: '+ 客製化 + 專屬支援',
    price: 'NT$20,000+',
    target: '連鎖品牌',
  },
]

export function PricingTable() {
  const columns: ColumnDef<Pricing>[] = [
    {
      accessorKey: 'plan',
      header: '方案',
      cell: ({ row }) => <div className="font-medium">{row.getValue('plan')}</div>,
    },
    {
      accessorKey: 'features',
      header: '功能',
      cell: ({ row }) => <div>{row.getValue('features')}</div>,
    },
    {
      accessorKey: 'price',
      header: '月費',
      cell: ({ row }) => <div>{row.getValue('price')}</div>,
    },
    {
      accessorKey: 'target',
      header: '目標客群',
      cell: ({ row }) => <div>{row.getValue('target')}</div>,
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
