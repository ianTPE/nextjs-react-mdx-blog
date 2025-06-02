"use client";

import React from 'react';

export default function CSSDecisionTree() {
  return (
    <div className="my-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          🎯 Vibe Coding 框架選擇決策樹
        </h3>
        
        {/* 決策樹結構 */}
        <div className="flex flex-col items-center space-y-6">
          {/* 起始點 */}
          <div className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
            🚀 你是 Vibe Coding 開發者
          </div>
          
          {/* 箭頭 */}
          <div className="w-0.5 h-8 bg-gray-400"></div>
          
          {/* 第一個決策點 */}
          <div className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
            偏好 React 還是 Vue？
          </div>
          
          {/* 分支線 */}
          <div className="flex items-center justify-center w-full max-w-4xl">
            <div className="flex-1 h-0.5 bg-gray-400"></div>
            <div className="w-4 h-4 bg-gray-400 rounded-full mx-4"></div>
            <div className="flex-1 h-0.5 bg-gray-400"></div>
          </div>
          
          {/* 兩個主要分支 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* React 分支 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                React
              </div>
              <div className="w-0.5 h-6 bg-gray-400"></div>
              <div className="bg-amber-500 text-white px-4 py-2 rounded-lg text-center text-sm">
                你的主要需求是什麼？
              </div>
              <div className="w-0.5 h-6 bg-gray-400"></div>
              
              {/* React 子選項 */}
              <div className="grid grid-cols-1 gap-4 w-full">
                <div className="bg-green-500 text-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="font-semibold">⭐ Next.js</div>
                  <div className="text-sm mt-1">最完整生態系統</div>
                  <div className="text-xs mt-1 opacity-90">（我的選擇）</div>
                </div>
                <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="font-semibold">🔵 Remix</div>
                  <div className="text-sm mt-1">簡潔資料流</div>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="font-semibold">⭐ Next.js</div>
                  <div className="text-sm mt-1">最大彈性</div>
                  <div className="text-xs mt-1 opacity-90">（繼續使用）</div>
                </div>
              </div>
            </div>
            
            {/* Vue 分支 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
                Vue
              </div>
              <div className="w-0.5 h-16 bg-gray-400"></div>
              <div className="bg-purple-500 text-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="font-semibold text-lg">🟢 Nuxt.js</div>
                <div className="text-sm mt-2">Vue 生態最佳選擇</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 圖例 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">最推薦</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">完美支援 Vibe Coding</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium">強烈推薦</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">優秀的開發體驗</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium">推薦</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Vue 生態首選</p>
          </div>
        </div>
      </div>
    </div>
  );
}