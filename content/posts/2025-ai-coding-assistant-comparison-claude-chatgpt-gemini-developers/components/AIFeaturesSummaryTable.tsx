import React from 'react';

interface AIFeature {
  ai: string;
  feature: string;
}

const data: AIFeature[] = [
  { ai: 'Claude', feature: '實用主義，開發者友好' },
  { ai: 'ChatGPT', feature: '教學導向，深度解釋' },
  { ai: 'Gemini', feature: '技術極客，安全專家' },
  { ai: 'Kimi', feature: '長文本理解，資料整合' },
  { ai: '文心一言', feature: '中文語境，創意寫作' },
  { ai: '通義千問', feature: '結構化輸出，圖文並茂' },
];

export default function AIFeaturesSummaryTable() {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-sm font-semibold text-gray-700">AI平台</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">特色總結</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="p-3 text-sm text-gray-600">{item.ai}</td>
                <td className="p-3 text-sm text-gray-600">{item.feature}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="h-24 text-center p-3 text-sm text-gray-500">
                沒有結果。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
