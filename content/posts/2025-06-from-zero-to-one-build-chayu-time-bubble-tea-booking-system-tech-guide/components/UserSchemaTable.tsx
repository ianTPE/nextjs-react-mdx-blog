"use client";

import React from 'react';

const UserSchemaTable: React.FC = () => {
  const userFields = [
    {
      field: 'line_user_id',
      type: 'text',
      setting: 'Required, Unique',
      defaultValue: '-'
    },
    {
      field: 'display_name',
      type: 'text',
      setting: 'Required',
      defaultValue: '-'
    },
    {
      field: 'picture_url',
      type: 'text',
      setting: 'Optional',
      defaultValue: '-'
    },
    {
      field: 'phone_number',
      type: 'text',
      setting: 'Optional',
      defaultValue: '-'
    },
    {
      field: 'email',
      type: 'text',
      setting: 'Optional',
      defaultValue: '-'
    },
    {
      field: 'membership_level',
      type: 'text',
      setting: 'Required',
      defaultValue: '"bronze"'
    },
    {
      field: 'points_balance',
      type: 'number',
      setting: 'Required',
      defaultValue: '0'
    },
    {
      field: 'wallet_balance',
      type: 'number',
      setting: 'Required',
      defaultValue: '0'
    },
    {
      field: 'created_date',
      type: 'date',
      setting: 'Required',
      defaultValue: 'Current date/time'
    },
    {
      field: 'last_login',
      type: 'date',
      setting: 'Required',
      defaultValue: 'Current date/time'
    }
  ];

  return (
    <div className="not-prose my-8">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">User 資料表結構</h4>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">欄位名稱</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">類型</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">設定</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">預設值</th>
            </tr>
          </thead>
          <tbody>
            {userFields.map((field, index) => (
              <tr key={field.field} className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-4 py-3 border-r border-gray-100">
                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                    {field.field}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
                <td className="px-4 py-3 text-sm text-gray-600">
                  {field.defaultValue === '-' ? (
                    <span className="text-gray-400">-</span>
                  ) : (
                    <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      {field.defaultValue}
                    </code>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSchemaTable;