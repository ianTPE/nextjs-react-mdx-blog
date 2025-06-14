"use client";

import React from 'react';

const StoreSchemaTable: React.FC = () => {
  const storeFields = [
    {
      field: 'name',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: '門市名稱'
    },
    {
      field: 'address',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: '門市地址'
    },
    {
      field: 'phone',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: '門市電話'
    },
    {
      field: 'operating_hours',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: '營業時間'
    },
    {
      field: 'current_queue_count',
      type: 'number',
      setting: 'Required',
      defaultValue: '0',
      note: '目前排隊人數'
    },
    {
      field: 'average_wait_time',
      type: 'number',
      setting: 'Required',
      defaultValue: '10',
      note: '平均等待時間（分鐘）'
    },
    {
      field: 'latitude',
      type: 'number',
      setting: 'Optional',
      defaultValue: '-',
      note: '緯度'
    },
    {
      field: 'longitude',
      type: 'number',
      setting: 'Optional',
      defaultValue: '-',
      note: '經度'
    }
  ];

  return (
    <div className="not-prose my-8">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Stores 資料表結構</h4>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">欄位名稱</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">類型</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">設定</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">預設值</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">備註</th>
            </tr>
          </thead>
          <tbody>
            {storeFields.map((field, index) => (
              <tr key={field.field} className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-4 py-3 border-r border-gray-100">
                  <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-mono">
                    {field.field}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                    {field.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    field.setting.includes('Required') 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {field.setting}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  {field.defaultValue === '-' ? (
                    <span className="text-gray-400">-</span>
                  ) : (
                    <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      {field.defaultValue}
                    </code>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {field.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreSchemaTable;