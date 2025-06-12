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

export type PricingPlan = {
  plan: string;
  features: string;
  price: string;
  extra: string;
};

const data: PricingPlan[] = [
  { plan: "Starter", features: "基礎功能 + 100 用戶", price: "NT$2,000/月", extra: "免費遷移服務" },
  { plan: "Growth", features: "+ API + 自動化 + 1,000 用戶", price: "NT$8,000/月", extra: "專屬客戶成功經理" },
  { plan: "Scale", features: "+ 白標 + 無限用戶", price: "NT$25,000/月", extra: "優先技術支援" },
  { plan: "Enterprise", features: "完全客製化", price: "客製報價", extra: "SLA 保證" },
];

export function PricingPlanTable() {
  const columns: ColumnDef<PricingPlan>[] = [
    { accessorKey: "plan", header: "方案", cell: ({ row }) => <div className="font-medium">{row.getValue("plan")}</div> },
    { accessorKey: "features", header: "功能" },
    { accessorKey: "price", header: "定價" },
    { accessorKey: "extra", header: "附加價值" },
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
