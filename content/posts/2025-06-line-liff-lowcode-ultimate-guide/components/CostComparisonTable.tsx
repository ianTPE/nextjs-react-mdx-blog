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

export type CostComparison = {
  item: string;
  traditional: string;
  optimized: string;
  saving: string;
};

const data: CostComparison[] = [
  { item: "開發人力", traditional: "60%", optimized: "30%", saving: "50%" },
  { item: "平台費用", traditional: "10%", optimized: "5%", saving: "50%" },
  { item: "行銷獲客", traditional: "20%", optimized: "15%", saving: "25%" },
  { item: "營運支援", traditional: "10%", optimized: "10%", saving: "0%" },
  { item: "毛利率", traditional: "40%", optimized: "60%", saving: "+50%" },
];

export function CostComparisonTable() {
  const columns: ColumnDef<CostComparison>[] = [
    { accessorKey: "item", header: "成本項目", cell: ({ row }) => <div className="font-medium">{row.getValue("item")}</div> },
    { accessorKey: "traditional", header: "傳統模式" },
    { accessorKey: "optimized", header: "優化後" },
    { accessorKey: "saving", header: "節省" },
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
