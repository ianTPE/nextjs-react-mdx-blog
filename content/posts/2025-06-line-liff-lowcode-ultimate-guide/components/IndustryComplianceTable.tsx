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

export type IndustryCompliance = {
  industry: string;
  regulation: string;
  requirement: string;
  solution: string;
};

const data: IndustryCompliance[] = [
  { industry: "醫療", regulation: "醫療法、個資法", requirement: "病歷保存、醫師驗證", solution: "Blaze.tech + 加密儲存" },
  { industry: "金融", regulation: "金管會規範", requirement: "KYC、AML、交易記錄", solution: "Creatio + 區塊鏈" },
  { industry: "教育", regulation: "兒少保護法", requirement: "家長同意、內容審查", solution: "年齡驗證 + 內容過濾" },
  { industry: "電商", regulation: "消保法", requirement: "七天鑑賞、退換貨", solution: "自動化退貨流程" },
];

export function IndustryComplianceTable() {
  const columns: ColumnDef<IndustryCompliance>[] = [
    { accessorKey: "industry", header: "產業", cell: ({ row }) => <div className="font-medium">{row.getValue("industry")}</div> },
    { accessorKey: "regulation", header: "主要法規" },
    { accessorKey: "requirement", header: "關鍵要求" },
    { accessorKey: "solution", header: "解決方案" },
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
