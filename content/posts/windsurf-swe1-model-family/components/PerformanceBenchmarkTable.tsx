"use client";

import React from 'react';

const PerformanceBenchmarkTable = () => {
  const data = [
    {
      benchmark: 'HumanEval+',
      swe1: '89.2%',
      claude: '88.4%',
      gpt: '84.1%',
      description: '程式碼生成準確性'
    },
    {
      benchmark: 'SWE-bench',
      swe1: '68.9%',
      claude: '70.3%',
      gpt: '54.6%',
      description: 'GitHub 問題修復'
    },
    {
      benchmark: 'MFC-500',
      swe1: '94.2%',
      claude: '87.6%',
      gpt: '79.4%',
      description: '多文件上下文理解'
    },
    {
      benchmark: 'End-to-End',
      swe1: '5.6/6',
      claude: '5.8/6',
      gpt: '4.8/6',
      description: '完整軟體工程任務'
    },
    {
      benchmark: '開發加速',
      swe1: '77.4%',
      claude: '52.6%',
      gpt: '48.3%',
      description: '實際開發效率提升'
    }
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              基準測試
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SWE-1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claude 3.7 Sonnet
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GPT-4.1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              測試內容
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => {
            // Determine winner for highlighting
            const scores = [
              { model: 'swe1', value: item.swe1 },
              { model: 'claude', value: item.claude },
              { model: 'gpt', value: item.gpt }
            ];
            
            // Simple comparison logic (you might need to adjust this based on the actual scoring system)
            const getHighestScore = (scores: typeof scores) => {
              const numericScores = scores.map(s => {
                const num = parseFloat(s.value.replace(/[%/]/g, ''));
                return { ...s, numValue: num };
              });
              const highest = numericScores.reduce((prev, current) => 
                current.numValue > prev.numValue ? current : prev
              );
              return highest.model;
            };
            
            const winner = getHighestScore(scores);
            
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.benchmark}
                </td>
                <td className={`px-6 py-4 text-sm ${winner === 'swe1' ? 'font-bold text-blue-600' : 'text-blue-600'}`}>
                  {item.swe1}
                </td>
                <td className={`px-6 py-4 text-sm ${winner === 'claude' ? 'font-bold text-green-600' : 'text-gray-900'}`}>
                  {item.claude}
                </td>
                <td className={`px-6 py-4 text-sm ${winner === 'gpt' ? 'font-bold text-purple-600' : 'text-gray-900'}`}>
                  {item.gpt}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-sm text-gray-500 mt-2 px-6 pb-4">
        * 最高分以粗體顯示。數據來源：DevBenchmark Labs 獨立評測
      </div>
    </div>
  );
};

export default PerformanceBenchmarkTable;