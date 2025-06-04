'use client';

import React from 'react';

interface Score {
  dimension: string;
  score: string;
  comment: string;
}

const data: Score[] = [
  { dimension: '技術深度', score: '5/10', comment: '深度不夠' },
  { dimension: '實用性', score: '6/10', comment: '重點突出' },
  { dimension: '結構性', score: '6/10', comment: '相對簡潔' },
  { dimension: '完整性', score: '5/10', comment: '細節較少' },
  { dimension: '安全性考量', score: '5/10', comment: '基本提及' },
  { dimension: '創新性', score: '5/10', comment: '缺乏創新' },
];

export function GrokScoreComparison() {
  return (
    <div className="w-full overflow-x-auto my-6">
      <table className="min-w-[600px] w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">維度</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評分</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評語</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{item.dimension}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{item.score}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{item.comment}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="h-24 text-center border border-gray-300 p-3 text-sm text-gray-500">
                沒有結果。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GrokScoreComparison;
