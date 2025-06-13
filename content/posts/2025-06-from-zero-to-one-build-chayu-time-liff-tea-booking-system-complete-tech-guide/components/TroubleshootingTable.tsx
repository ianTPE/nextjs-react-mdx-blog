"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TroubleshootingTable: React.FC = () => {
  const troubleshootingData = [
    {
      problem: "LIFF 初始化失敗",
      solution: "檢查 LIFF ID 是否正確，確認網域已註冊"
    },
    {
      problem: "無法取得用戶資料", 
      solution: "確認已通過 LINE 登入認證"
    },
    {
      problem: "訊息發送失敗",
      solution: "檢查是否在 LINE 內部瀏覽器環境"
    },
    {
      problem: "開發環境測試",
      solution: "使用 ngrok 或類似工具建立 HTTPS 環境"
    }
  ];

  return (
    <div className="my-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-semibold">問題</TableHead>
            <TableHead className="font-semibold">解決方法</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {troubleshootingData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                {item.problem}
              </TableCell>
              <TableCell className="text-slate-600 dark:text-slate-400">
                {item.solution}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TroubleshootingTable;