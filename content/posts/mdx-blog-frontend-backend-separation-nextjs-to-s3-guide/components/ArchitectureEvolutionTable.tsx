"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 定義數據類型
type ContentArchitecture = {
  stage: string
  articleCount: string
  architecture: string
  useCase: string
}

// 表格數據
const data: ContentArchitecture[] = [
  {
    stage: "第一階段",
    articleCount: "1-1000 篇",
    architecture: "文件系統",
    useCase: "個人部落格、小型團隊",
  },
  {
    stage: "第二階段",
    articleCount: "1000-5000 篇",
    architecture: "資料庫驅動",
    useCase: "正規技術團隊",
  },
  {
    stage: "第三階段",
    articleCount: "5000+ 篇",
    architecture: "混合架構 + CI/CD",
    useCase: "大型內容平台",
  },
]

// 定義列
const columns: ColumnDef<ContentArchitecture>[] = [
  {
    accessorKey: "stage",
    header: "階段",
    cell: ({ row }) => <div className="font-medium text-center">{row.getValue("stage")}</div>,
  },
  {
    accessorKey: "articleCount",
    header: "文章數量",
    cell: ({ row }) => <div className="text-center">{row.getValue("articleCount")}</div>,
  },
  {
    accessorKey: "architecture",
    header: "架構方案",
    cell: ({ row }) => <div className="text-center">{row.getValue("architecture")}</div>,
  },
  {
    accessorKey: "useCase",
    header: "適用場景",
    cell: ({ row }) => <div className="text-center">{row.getValue("useCase")}</div>,
  },
]

export default function ArchitectureEvolutionTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6 overflow-x-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">內容管理架構演進階段</h2>
        <p className="text-muted-foreground text-center">根據文章數量選擇合適的技術架構方案</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center font-semibold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  沒有數據
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground text-center">共 {table.getRowModel().rows.length} 個階段</div>
    </div>
  )
}
