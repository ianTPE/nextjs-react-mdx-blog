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

export type Cost = {
  item: string
  cost: string
  description: string
}

const data: Cost[] = [
  {
    item: '低代碼平台費用',
    cost: 'NT$3,000/月',
    description: 'Bubble 專業版',
  },
  {
    item: '網域與主機',
    cost: 'NT$1,000/月',
    description: 'AWS/GCP',
  },
  {
    item: '行銷推廣',
    cost: 'NT$10,000/月',
    description: 'Google Ads + FB',
  },
  {
    item: '人力成本',
    cost: 'NT$60,000/月',
    description: '1 人全職開發',
  },
  {
    item: '雜支',
    cost: 'NT$5,000/月',
    description: '軟體工具等',
  },
  {
    item: '總計',
    cost: 'NT$79,000/月',
    description: '約 47.4 萬/6 個月',
  },
]

export function CostTable() {
  const columns: ColumnDef<Cost>[] = [
    {
      accessorKey: 'item',
      header: '項目',
      cell: ({ row }) => <div className="font-medium">{row.getValue('item')}</div>,
    },
    {
      accessorKey: 'cost',
      header: '成本',
      cell: ({ row }) => {
        const value = row.getValue('item') === '總計' 
          ? <div className="font-bold">{row.getValue('cost')}</div>
          : <div>{row.getValue('cost')}</div>
        return value
      }
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
    <div className="rounded-md border">
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
                className={row.original.item === '總計' ? 'bg-gray-50 font-medium' : ''}
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
