"use client";

import React from 'react';

const DevelopmentAccelerationTable = () => {
  const data = [
    { 
      task: '完整生命週期開發', 
      swe1: '98%', 
      generalAI: '45%', 
      description: '從需求到部署的完整流程' 
    },
    { 
      task: '代碼重構與優化', 
      swe1: '92%', 
      generalAI: '67%', 
      description: '大型項目的架構改進' 
    },
    { 
      task: '多文件協作開發', 
      swe1: '89%', 
      generalAI: '52%', 
      description: '跨文件依賴管理和協調' 
    },
    { 
      task: '錯誤診斷與修復', 
      swe1: '76%', 
      generalAI: '58%', 
      description: '複雜 bug 的定位和解決' 
    },
    { 
      task: '單文件功能實現', 
      swe1: '72%', 
      generalAI: '61%', 
      description: '獨立模組的開發任務' 
    },
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              開發任務
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SWE-1 效率提升
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              通用 AI 工具
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              任務描述
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {item.task}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-blue-600">
                {item.swe1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.generalAI}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm text-gray-500 mt-2 px-6 pb-4">
        * 平均效率提升：SWE-1 為 77.4%，通用 AI 工具為 52.6%
      </div>
    </div>
  );
};

export default DevelopmentAccelerationTable;