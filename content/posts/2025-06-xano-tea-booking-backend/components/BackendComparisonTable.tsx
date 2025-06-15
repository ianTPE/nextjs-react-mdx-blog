"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BackendComparisonTable() {
  const comparisonData = [
    {
      metric: "開發時間",
      selfBuilt: "8-12 週",
      bubble: "3-4 週",
      xano: "2-3 週",
      firebase: "4-6 週"
    },
    {
      metric: "學習曲線",
      selfBuilt: "陡峭",
      bubble: "中等",
      xano: "平緩",
      firebase: "中等"
    },
    {
      metric: "可擴展性",
      selfBuilt: "優秀",
      bubble: "有限",
      xano: "優秀",
      firebase: "優秀"
    },
    {
      metric: "可控性",
      selfBuilt: "完全",
      bubble: "有限",
      xano: "高",
      firebase: "中等"
    },
    {
      metric: "維護成本",
      selfBuilt: "高",
      bubble: "低",
      xano: "低",
      firebase: "中等"
    },
    {
      metric: "月費用",
      selfBuilt: "$500+",
      bubble: "$29-119",
      xano: "$39-149",
      firebase: "$25-100+"
    }
  ];

  // 根據不同指標設置樣式
  const getCellStyle = (metric: string, value: string) => {
    const baseStyle = "";
    
    switch (metric) {
      case "開發時間":
        if (value.includes("2-3")) return "text-green-600 font-medium";
        if (value.includes("8-12")) return "text-red-600";
        return "";
      
      case "學習曲線":
        if (value === "平緩") return "text-green-600 font-medium";
        if (value === "陡峭") return "text-red-600";
        return "";
      
      case "可擴展性":
        if (value === "優秀") return "text-green-600 font-medium";
        if (value === "有限") return "text-yellow-600";
        return "";
      
      case "可控性":
        if (value === "完全") return "text-green-600 font-medium";
        if (value === "有限") return "text-red-600";
        return "";
      
      case "維護成本":
        if (value === "低") return "text-green-600 font-medium";
        if (value === "高") return "text-red-600";
        return "";
      
      case "月費用":
        if (value.includes("39-149")) return "text-blue-600 font-medium";
        if (value.includes("500+")) return "text-red-600";
        return "";
      
      default:
        return baseStyle;
    }
  };

  return (
    <div className="not-prose w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">指標</TableHead>
            <TableHead className="font-bold">自建後端</TableHead>
            <TableHead className="font-bold">Bubble.io</TableHead>
            <TableHead className="font-bold bg-blue-50">Xano</TableHead>
            <TableHead className="font-bold">Firebase</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisonData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.metric}</TableCell>
              <TableCell className={getCellStyle(row.metric, row.selfBuilt)}>
                {row.selfBuilt}
              </TableCell>
              <TableCell className={getCellStyle(row.metric, row.bubble)}>
                {row.bubble}
              </TableCell>
              <TableCell className={`bg-blue-50 ${getCellStyle(row.metric, row.xano)}`}>
                {row.xano}
              </TableCell>
              <TableCell className={getCellStyle(row.metric, row.firebase)}>
                {row.firebase}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}