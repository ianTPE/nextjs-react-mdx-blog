"use client";

import React, { useState } from 'react';

const SupabaseSetupSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const setupSteps = [
    {
      title: '建立 Supabase 帳號',
      duration: '2 分鐘',
      description: '註冊免費帳號並驗證 Email',
      details: [
        '前往 supabase.com 註冊帳號',
        '使用 GitHub/Google OAuth 快速註冊',
        '驗證電子郵件地址',
        '完成 onboarding 流程'
      ],
      code: `# 或使用 CLI 註冊
npm install -g supabase
supabase login`
    },
    {
      title: '創建新專案',
      duration: '1 分鐘',
      description: '設定專案基本資訊',
      details: [
        '點擊 "New Project" 按鈕',
        '選擇組織 (Organization)',
        '設定專案名稱: chayu-time-booking',
        '選擇最近的資料庫區域 (Singapore)',
        '設定強密碼 (自動生成建議)',
        '等待專案初始化完成'
      ],
      code: `# 專案設定範例
Project Name: chayu-time-booking
Database Password: [自動生成]
Region: Southeast Asia (Singapore)`
    },
    {
      title: '取得 API 金鑰',
      duration: '1 分鐘',
      description: '複製必要的連接資訊',
      details: [
        '進入 Settings → API 頁面',
        '複製 Project URL',
        '複製 anon/public key',
        '安全保存 service_role key',
        '設定 CORS 允許的網域'
      ],
      code: `# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
    },
    {
      title: '安裝 Supabase CLI',
      duration: '3 分鐘',
      description: '設定本地開發環境',
      details: [
        '安裝 Supabase CLI 工具',
        '初始化本地專案結構',
        '連結到遠端專案',
        '啟動本地開發環境',
        '驗證連接設定'
      ],
      code: `# 安裝與設定
npm install -g supabase
supabase init
supabase login
supabase link --project-ref your-project-ref
supabase start`
    },
    {
      title: '建立資料庫 Schema',
      duration: '10 分鐘',
      description: '設計茶飲系統資料表',
      details: [
        '使用 SQL Editor 建立資料表',
        '設定 Row Level Security (RLS)',
        '建立必要的索引',
        '設定觸發器與函數',
        '建立資料庫檢視'
      ],
      code: `-- 建立用戶表範例
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  line_user_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  membership_level TEXT DEFAULT 'bronze',
  points_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 啟用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
    },
    {
      title: '設定前端整合',
      duration: '5 分鐘',
      description: '安裝並配置 Supabase Client',
      details: [
        '安裝 @supabase/supabase-js 套件',
        '建立 Supabase client 實例',
        '設定 TypeScript 類型定義',
        '測試連接與查詢',
        '設定認證流程'
      ],
      code: `# 安裝 SDK
npm install @supabase/supabase-js

# lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)`
    }
  ];

  const getStepStatus = (index: number) => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'pending';
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500';
      case 'active':
        return 'bg-blue-500 text-white border-blue-500';
      default:
        return 'bg-gray-200 text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="my-8 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
        <h3 className="text-xl font-bold mb-2">
          🚀 Supabase 專案建置步驟指南
        </h3>
        <p className="text-green-100 text-sm">
          從零開始，15 分鐘完成企業級後端設定
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">設定進度</span>
          <span className="text-sm text-gray-500">
            步驟 {activeStep + 1} / {setupSteps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((activeStep + 1) / setupSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex">
        {/* Steps Navigation */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200">
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 mb-4">設定步驟</h4>
            <div className="space-y-2">
              {setupSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      index === activeStep 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${getStepStyles(status)}`}>
                        {status === 'completed' ? '✓' : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${
                          index === activeStep ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {step.duration}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1">
          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${getStepStyles(getStepStatus(activeStep))}`}>
                  {getStepStatus(activeStep) === 'completed' ? '✓' : activeStep + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {setupSteps[activeStep].title}
                </h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {setupSteps[activeStep].duration}
                </span>
              </div>
              <p className="text-gray-600 text-sm ml-11">
                {setupSteps[activeStep].description}
              </p>
            </div>

            {/* Details */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">詳細步驟：</h4>
              <ul className="space-y-2">
                {setupSteps[activeStep].details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Example */}
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs font-medium">程式碼範例</span>
                <button className="text-gray-400 hover:text-white text-xs">
                  📋 複製
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{setupSteps[activeStep].code}</code>
              </pre>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← 上一步
              </button>
              <button
                onClick={() => setActiveStep(Math.min(setupSteps.length - 1, activeStep + 1))}
                disabled={activeStep === setupSteps.length - 1}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步 →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-green-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-green-700">
          💡 <strong>小提示：</strong> 建議按順序完成每個步驟，確保系統設定正確。遇到問題可參考 Supabase 官方文檔。
        </p>
      </div>
    </div>
  );
};

export default SupabaseSetupSteps;