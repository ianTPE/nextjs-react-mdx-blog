import React from 'react';

interface WorkflowStep {
  step: string;
  tool: string;
  description: string;
}

const data: WorkflowStep[] = [
  { step: '需求定義與初步探索', tool: 'ChatGPT / Claude', description: '快速獲取多種方案，理解問題邊界' },
  { step: '核心代碼實現', tool: 'Claude', description: '生成高質量、可用的核心代碼' },
  { step: '安全評估階段', tool: 'Gemini', description: '深度分析安全風險，獲取企業級防護方案' },
  { step: '優化階段', tool: 'Claude + 自己思考', description: '結合AI建議與自身經驗進行優化' },
];

export default function RecommendedWorkflowTable() {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-sm font-semibold text-gray-700">步驟</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">工具</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">說明</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="p-3 text-sm text-gray-600">{item.step}</td>
                <td className="p-3 text-sm text-gray-600">{item.tool}</td>
                <td className="p-3 text-sm text-gray-600">{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="h-24 text-center p-3 text-sm text-gray-500">
                沒有結果。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
