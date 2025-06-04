import React from 'react'

interface AIScore {
  dimension: string
  score: string
  comment: string
}

const data: AIScore[] = [
  { dimension: '技術深度', score: '9/10', comment: '深入理解 MDX 編譯和 SSR 機制' },
  { dimension: '實用性', score: '10/10', comment: '代碼可直接運行，結構完整' },
  { dimension: '結構性', score: '10/10', comment: '層次清晰，邏輯連貫' },
  { dimension: '完整性', score: '9/10', comment: '涵蓋所有關鍵環節' },
  { dimension: '安全性考量', score: '9/10', comment: '詳細的安全建議' },
  { dimension: '創新性', score: '9/10', comment: '提供管理界面等創新建議' },
]

export default function AIScoreComparisonTable() {
  return (
    <div className="overflow-x-auto"> {/* Add a wrapper for horizontal scrolling on small screens */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">維度</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評分</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評語</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{item.dimension}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{item.score}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{item.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
