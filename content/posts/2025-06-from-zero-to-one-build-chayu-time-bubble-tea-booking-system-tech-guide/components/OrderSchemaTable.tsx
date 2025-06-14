"use client";

import React from 'react';

const OrderSchemaTable: React.FC = () => {
  const orderFields = [
    {
      field: 'user',
      type: 'User',
      setting: 'Required',
      defaultValue: '-',
      note: '關聯到 User 表'
    },
    {
      field: 'store',
      type: 'Store',
      setting: 'Required',
      defaultValue: '-',
      note: '關聯到 Store 表'
    },
    {
      field: 'order_items',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: 'JSON 格式儲存購物車'
    },
    {
      field: 'total_amount',
      type: 'number',
      setting: 'Required',
      defaultValue: '-',
      note: '訂單總金額'
    },
    {
      field: 'payment_method',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: '付款方式'
    },
    {
      field: 'order_status',
      type: 'text',
      setting: 'Required',
      defaultValue: '"pending"',
      note: '訂單狀態'
    },
    {
      field: 'order_type',
      type: 'text',
      setting: 'Required',
      defaultValue: '-',
      note: 'pickup_now/pickup_scheduled'
    },
    {
      field: 'scheduled_time',
      type: 'date',
      setting: 'Optional',
      defaultValue: '-',
      note: '預約時間'
    },
    {
      field: 'created_time',
      type: 'date',
      setting: 'Required',
      defaultValue: 'Current date/time',
      note: '建立時間'
    },
    {
      field: 'completed_time',
      type: 'date',
      setting: 'Optional',
      defaultValue: '-',
      note: '完成時間'
    }
  ];

  return (
    <div className="not-prose my-8">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Orders 資料表結構</h4>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">欄位名稱</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">類型</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">設定</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">預設值</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">備註</th>
            </tr>
          </thead>
          <tbody>
            {orderFields.map((field, index) => (
              <tr key={field.field} className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-4 py-3 border-r border-gray-100">
                  <code className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-sm font-mono">
                    {field.field}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    field.type === 'User' || field.type === 'Store' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-teal-100 text-teal-800'
                  }`}>
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

export default OrderSchemaTable;