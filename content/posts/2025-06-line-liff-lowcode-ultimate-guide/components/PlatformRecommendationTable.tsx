"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type PlatformRecommendation = {
  need: string;
  platform: string;
  reason: string;
};

const data: PlatformRecommendation[] = [
  { need: "快速 MVP", platform: "Glide", reason: "5 分鐘上線" },
  { need: "複雜邏輯", platform: "Bubble", reason: "完整功能" },
  { need: "企業應用", platform: "Creatio", reason: "可擴展性" },
  { need: "行動優先", platform: "FlutterFlow", reason: "原生體驗" },
  { need: "後端 API", platform: "Xano", reason: "強大靈活" },
];

export function PlatformRecommendationTable() {
  const columns: ColumnDef<PlatformRecommendation>[] = [
    { accessorKey: "need", header: "需求", cell: ({ row }) => <div className="font-medium">{row.getValue("need")}</div> },
    { accessorKey: "platform", header: "推薦平台" },
    { accessorKey: "reason", header: "原因" },
  ];

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="rounded-md border not-prose">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">無資料</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
