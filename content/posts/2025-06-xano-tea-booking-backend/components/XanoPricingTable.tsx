"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function XanoPricingTable() {
  const pricingData = [
    {
      plan: "Starter Plan",
      price: "$39/month",
      features: [
        "無限 API 請求",
        "PostgreSQL 資料庫", 
        "5GB 檔案存儲",
        "基礎監控"
      ],
      suitableFor: "小型到中型應用",
      highlight: false
    },
    {
      plan: "Professional Plan",
      price: "$99/month",
      features: [
        "進階功能支援",
        "多環境管理",
        "進階監控與分析", 
        "優先技術支援"
      ],
      suitableFor: "企業級應用",
      highlight: true
    },
    {
      plan: "Enterprise Plan", 
      price: "$149+/month",
      features: [
        "專屬資源配置",
        "SLA 保證",
        "自定義整合",
        "專屬客戶經理"
      ],
      suitableFor: "大型企業應用",
      highlight: false
    }
  ];

  return (
    <div className="not-prose w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">方案</TableHead>
            <TableHead className="font-bold">價格</TableHead>
            <TableHead className="font-bold">主要功能</TableHead>
            <TableHead className="font-bold">適用對象</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricingData.map((plan, index) => (
            <TableRow key={index} className={plan.highlight ? "bg-blue-50" : ""}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {plan.plan}
                  {plan.highlight && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      推薦
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-semibold text-green-600">
                {plan.price}
              </TableCell>
              <TableCell>
                <ul className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {plan.suitableFor}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}