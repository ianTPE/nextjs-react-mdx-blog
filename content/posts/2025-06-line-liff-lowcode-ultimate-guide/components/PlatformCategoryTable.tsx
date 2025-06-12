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

export type PlatformCategory = {
  category: string;
  platforms: string;
  feature: string;
  scenario: string;
};

const data: PlatformCategory[] = [
  {
    category: "通用型",
    platforms: "Bubble, OutSystems",
    feature: "功能全面",
    scenario: "各類應用",
  },
  {
    category: "企業級",
    platforms: "Creatio, Mendix",
    feature: "CRM/ERP 整合",
    scenario: "大型企業",
  },
  {
    category: "行動優先",
    platforms: "FlutterFlow, Adalo",
    feature: "原生 App 體驗",
    scenario: "行動應用",
  },
  {
    category: "後端專精",
    platforms: "Xano, Supabase",
    feature: "API 優先",
    scenario: "複雜邏輯",
  },
  {
    category: "現場作業",
    platforms: "AppSheet, TrackVia",
    feature: "離線功能",
    scenario: "工業應用",
  },
  {
    category: "合規特化",
    platforms: "Blaze.tech",
    feature: "內建合規",
    scenario: "金融醫療",
  },
];

export function PlatformCategoryTable() {
  const columns: ColumnDef<PlatformCategory>[] = [
    {
      accessorKey: "category",
      header: "類別",
      cell: ({ row }) => <div className="font-medium">{row.getValue("category")}</div>,
    },
    {
      accessorKey: "platforms",
      header: "代表平台",
    },
    {
      accessorKey: "feature",
      header: "特色",
    },
    {
      accessorKey: "scenario",
      header: "適用場景",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                無資料
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
