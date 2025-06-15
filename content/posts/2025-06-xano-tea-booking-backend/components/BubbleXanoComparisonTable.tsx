"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BubbleXanoComparisonTable() {
  const comparisonData = [
    {
      feature: "資料庫",
      bubble: "簡化的資料存儲",
      xano: "真正的 PostgreSQL",
      advantage: "企業級可靠性"
    },
    {
      feature: "API 設計",
      bubble: "固定的工作流程格式", 
      xano: "完全自定義 RESTful API",
      advantage: "更靈活的架構"
    },
    {
      feature: "版本控制",
      bubble: "基礎版本管理",
      xano: "Git-like 分支管理", 
      advantage: "專業開發流程"
    },
    {
      feature: "商業邏輯",
      bubble: "視覺化流程（受限）",
      xano: "JavaScript + 無代碼混合",
      advantage: "複雜邏輯支援"
    },
    {
      feature: "環境管理", 
      bubble: "Development/Live",
      xano: "Dev/Staging/Production",
      advantage: "標準 DevOps 流程"
    },
    {
      feature: "可擴展性",
      bubble: "平台限制較多",
      xano: "高度可擴展",
      advantage: "企業級應用"
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">特性</TableHead>
            <TableHead className="font-bold">Bubble.io</TableHead>
            <TableHead className="font-bold">Xano</TableHead>
            <TableHead className="font-bold">優勢</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisonData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.feature}</TableCell>
              <TableCell>{row.bubble}</TableCell>
              <TableCell>{row.xano}</TableCell>
              <TableCell className="text-green-600 font-medium">{row.advantage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}