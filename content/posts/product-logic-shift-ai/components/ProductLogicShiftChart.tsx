'use client';

import React from 'react';

const ProductLogicShiftChart: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-white">
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="bg-purple-600 text-white rounded-lg p-4 text-center">
          <h1 className="text-2xl font-bold">產品邏輯從操作變為托付</h1>
        </div>
        
        {/* Core Perspective */}
        <div className="border-2 border-purple-600 rounded-lg p-4">
          <h2 className="text-xl font-bold text-purple-600 mb-3">核心觀點</h2>
          <div className="space-y-2">
            <p>「用戶不是在"用AI"，而是把活兒用給它。」</p>
            <p>「我們要做的，是接得住托付，幹得了閉環。」</p>
            <p>「用戶委託任務後去幹別的，AI自動完成後交付結果。」</p>
          </div>
        </div>
        
        {/* Past vs Present Comparison */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Past */}
          <div className="flex-1 border-2 border-red-500 rounded-lg p-4">
            <h2 className="text-xl font-bold text-red-500 mb-3">過去：操作型邏輯</h2>
            <ul className="space-y-3">
              {[
                "用戶需要掌握工具操作",
                "頻繁點擊與輸入",
                "用戶參與每個環節",
                "工具輔助人工作",
                "功能導向界面"
              ].map((item, index) => (
                <li key={`past-${index}`} className="flex items-start">
                  <div className="h-4 w-4 rounded-full bg-red-500 mt-1 mr-2"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Transition arrow for medium screens and up */}
          <div className="hidden md:flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
            </svg>
          </div>
          
          {/* Present */}
          <div className="flex-1 border-2 border-green-500 rounded-lg p-4">
            <h2 className="text-xl font-bold text-green-500 mb-3">現在：托付型邏輯</h2>
            <ul className="space-y-3">
              {[
                "用戶只需清晰表達意圖",
                "一次性委託任務",
                "用戶只確認最終結果",
                "AI執行完整工作流",
                "結果導向界面"
              ].map((item, index) => (
                <li key={`present-${index}`} className="flex items-start">
                  <div className="h-4 w-4 rounded-full bg-green-500 mt-1 mr-2"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Example */}
        <div className="border-2 border-blue-500 rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-500 mb-3">案例：複購活動策劃</h2>
          <div className="space-y-2">
            <p>用戶只需說：「安排一次複購活動」</p>
            <p>AI自動：生成文案、設計優惠、群發計劃、運營跟進</p>
          </div>
        </div>
        
        {/* First Principles */}
        <div className="border-2 border-purple-600 rounded-lg p-4">
          <h2 className="text-xl font-bold text-purple-600 mb-3">第一性原理拆解</h2>
          <ul className="space-y-3">
            {[
              "使用者真正需求：結果而非過程",
              "AI價值轉變：從工具到代理人的身份躍遷",
              "信任機制：從操作可靠性到結果可靠性",
              "商業本質：釋放人類注意力，提升決策層級"
            ].map((item, index) => (
              <li key={`principle-${index}`} className="flex items-start">
                <div className="h-4 w-4 rounded-full bg-purple-600 mt-1 mr-2"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Signature */}
        <div className="text-right">
          <p className="text-gray-600">奇思方舟</p>
        </div>
      </div>
    </div>
  );
};

export default ProductLogicShiftChart;
