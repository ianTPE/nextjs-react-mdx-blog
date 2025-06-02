"use client";

import React from 'react';

export default function CSSDecisionTree() {
  return (
    <div className="my-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          🎯 Vibe Coding 框架選擇決策樹
        </h3>
        
        {/* 決策樹結構 */}
        <div className="flex flex-col items-center space-y-8 max-w-6xl mx-auto">
          {/* 起始點 */}
          <div className="relative">
            <div className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg text-center transform hover:scale-105 transition-transform">
              🚀 你是 Vibe Coding 開發者
            </div>
            {/* 向下箭頭 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-8 bg-gray-400 mx-auto"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
            </div>
          </div>
          
          {/* 第一個決策點 */}
          <div className="relative mt-4">
            <div className="bg-amber-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg text-center transform hover:scale-105 transition-transform">
              偏好 React 還是 Vue？
            </div>
            {/* 分叉箭頭 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
              <div className="w-0.5 h-6 bg-gray-400 mx-auto"></div>
              <div className="w-64 h-0.5 bg-gray-400 absolute top-6 left-1/2 transform -translate-x-1/2"></div>
              {/* 左箭頭 */}
              <div className="absolute top-6 left-1/2 transform -translate-x-32">
                <div className="w-0.5 h-6 bg-gray-400"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-gray-400 transform translate-x-1"></div>
              </div>
              {/* 右箭頭 */}
              <div className="absolute top-6 left-1/2 transform translate-x-32">
                <div className="w-0.5 h-6 bg-gray-400"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-gray-400 transform translate-x-1"></div>
              </div>
            </div>
          </div>
          
          {/* 兩個主要分支 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full mt-16">
            {/* React 分支 */}
            <div className="flex flex-col items-center space-y-6">
              {/* React 標籤 */}
              <div className="relative">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md text-center">
                  ⚛️ React
                </div>
                {/* 向下箭頭 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-6 bg-gray-400 mx-auto"></div>
                  <div className="w-0 h-0 border-l-3 border-r-3 border-t-6 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              </div>
              
              {/* React 子決策 */}
              <div className="relative mt-4">
                <div className="bg-amber-500 text-white px-6 py-3 rounded-lg text-center text-sm font-medium">
                  你的開發經驗？
                </div>
                {/* 雙叉箭頭 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                  <div className="w-0.5 h-4 bg-gray-400 mx-auto"></div>
                  <div className="w-32 h-0.5 bg-gray-400 absolute top-4 left-1/2 transform -translate-x-1/2"></div>
                  {/* 左箭頭 */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-16">
                    <div className="w-0.5 h-4 bg-gray-400"></div>
                    <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-400 transform translate-x-0.5"></div>
                  </div>
                  {/* 右箭頭 */}
                  <div className="absolute top-4 left-1/2 transform translate-x-16">
                    <div className="w-0.5 h-4 bg-gray-400"></div>
                    <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-400 transform translate-x-0.5"></div>
                  </div>
                </div>
              </div>
              
              {/* React 選項 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-12">
                {/* Next.js - 新手首選 */}
                <div className="group relative">
                  <div className="bg-green-500 text-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer">
                    <div className="font-bold text-lg">⭐ Next.js</div>
                    <div className="text-sm mt-1 opacity-90">新手首選，完整生態</div>
                    <div className="text-xs mt-1 bg-green-600 rounded px-2 py-1 inline-block">最推薦 👈</div>
                  </div>
                  {/* 推薦標籤 */}
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                    最推薦
                  </div>
                </div>
                
                {/* Remix */}
                <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer">
                  <div className="font-bold text-lg">🔵 Remix</div>
                  <div className="text-sm mt-1 opacity-90">創新資料處理模式</div>
                  <div className="text-xs mt-1 bg-blue-600 rounded px-2 py-1 inline-block">強烈推薦</div>
                </div>
              </div>
            </div>
            
            {/* Vue 分支 */}
            <div className="flex flex-col items-center space-y-6">
              {/* Vue 標籤 */}
              <div className="relative">
                <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-md text-center">
                  🟢 Vue
                </div>
                {/* 向下箭頭 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-12 bg-gray-400 mx-auto"></div>
                  <div className="w-0 h-0 border-l-3 border-r-3 border-t-6 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              </div>
              
              {/* Vue 結果 */}
              <div className="mt-8 group relative">
                <div className="bg-purple-500 text-white p-8 rounded-xl text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer">
                  <div className="font-bold text-2xl mb-2">🟢 Nuxt.js</div>
                  <div className="text-lg">Vue 生態最佳選擇</div>
                  <div className="text-sm mt-3 bg-purple-600 rounded px-3 py-1 inline-block">推薦</div>
                </div>
                {/* 推薦標籤 */}
                <div className="absolute -top-2 -right-2 bg-purple-300 text-purple-900 text-xs px-2 py-1 rounded-full font-bold">
                  Vue 首選
                </div>
              </div>
              
              {/* 填充空間，讓布局對齊 */}
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
        
        {/* 決策提示 */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">💡 快速決策提示</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-green-700 dark:text-green-400">
                <strong>新手？</strong><br/>選 Next.js
              </div>
              <div className="text-blue-700 dark:text-blue-400">
                <strong>重視資料流？</strong><br/>選 Remix
              </div>
              <div className="text-purple-700 dark:text-purple-400">
                <strong>Vue 開發者？</strong><br/>選 Nuxt.js
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}