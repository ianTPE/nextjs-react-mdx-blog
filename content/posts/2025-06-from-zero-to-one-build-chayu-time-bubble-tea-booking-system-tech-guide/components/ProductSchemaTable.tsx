"use client";

import React from 'react';

const ProductSchemaTable: React.FC = () => {
  const productFields = [
    {
      field: 'name',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: '商品名稱'
    },
    {
      field: 'price',
      type: 'number',
      setting: 'Required',
      defaultValue: '-',
      note: '商品價格'
    },
    {
      field: 'category',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: 'tea/coffee/seasonal/snacks'
    },
    {
      field: 'description',
      type: 'text',
      setting: 'Optional',
      defaultValue: '-',
      note: '商品描述'
    },
    {
      field: 'image_url',
      type: 'text',
      setting: 'Optional',
      defaultValue: '-',
      note: '商品圖片 URL'
    },
    {
      field: 'rating',
      type: 'number',
      setting: 'Optional',
      defaultValue: '-',
      note: '商品評分 (1-5)'
    },
    {
      field: 'review_count',
      type: 'number',
      setting: 'Required',
      defaultValue: '0',
      note: '評價數量'
    },
    {
      field: 'preparation_time',
      type: 'number',
      setting: 'Required',
      defaultValue: '15',
      note: '製作時間（分鐘）'
    },
    {
      field: 'availability_status',
      type: 'yes/no',
      setting: 'Required',
      defaultValue: 'yes',
      note: '商品可用性'
    }
  ];

  return (
    <div className="not-prose my-8">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Products 資料表結構</h4>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">欄位名稱</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">類型</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">設定</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">預設值</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">備註</th>
            </tr>
          </thead>
          <tbody>
            {productFields.map((field, index) => (
              <tr key={field.field} className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-4 py-3 border-r border-gray-100">
                  <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">
                    {field.field}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
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

export default ProductSchemaTable;