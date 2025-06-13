import React from "react";

/**
 * 茶語時光 LIFF 預約系統 - 系統架構圖
 * 手機端、LIFF 應用（Next.js PWA）、Bubble 後端
 * 使用 Tailwind CSS 實現響應式與美觀
 */
const SystemArchitectureDiagram: React.FC = () => (
  <div className="w-full flex flex-col items-center my-8 px-2 not-prose">
    {/* 提示水平滾動（僅在手機版顯示） */}
    <div className="sm:hidden text-xs text-gray-500 mb-2">← 左右滑動查看全圖 →</div>
    
    {/* 可滾動容器 */}
    <div className="w-full overflow-x-auto pb-2">
      {/* 水平排列的區塊與箭頭 - 從桌面版到手機版保持結構一致 */}
      <div className="flex flex-row items-center justify-start sm:justify-center gap-x-3 md:gap-x-4 w-max sm:w-full max-w-4xl mx-auto">
        {/* Column 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-md p-4 flex flex-col items-center min-w-[115px] sm:min-w-[130px] md:min-w-[150px]">
            <span className="font-bold text-green-600 text-base">LINE 用戶端</span>
            <span className="text-xs text-gray-500 mt-1">User端</span>
          </div>
          <span className="text-gray-400 text-2xl mt-2">↓</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">用戶互動</span>
        </div>

        {/* Horizontal Arrow 1 */}
        <div className="flex items-center justify-center px-1 md:px-2">
          <div className="transform -translate-y-6">
            <span className="text-3xl text-gray-400">&#8596;</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white dark:bg-neutral-900 border border-blue-400 dark:border-blue-600 rounded-lg shadow-md p-4 flex flex-col items-center min-w-[115px] sm:min-w-[130px] md:min-w-[150px]">
            <span className="font-bold text-blue-600 text-base">LIFF 應用</span>
            <span className="text-xs text-gray-500 mt-1">(Next.js PWA)</span>
          </div>
          <span className="text-gray-400 text-2xl mt-2">↓</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">前端邏輯處理</span>
        </div>

        {/* Horizontal Arrow 2 */}
        <div className="flex items-center justify-center px-1 md:px-2">
          <div className="transform -translate-y-6">
            <span className="text-3xl text-gray-400">&#8596;</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white dark:bg-neutral-900 border border-purple-400 dark:border-purple-600 rounded-lg shadow-md p-4 flex flex-col items-center min-w-[115px] sm:min-w-[130px] md:min-w-[150px]">
            <span className="font-bold text-purple-600 text-base">Bubble 後端</span>
            <span className="text-xs text-gray-500 mt-1">No-code</span>
          </div>
          <span className="text-gray-400 text-2xl mt-2">↓</span>
          <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">資料存儲 & API</span>
        </div>
      </div>
    </div>
  </div>
);

export default SystemArchitectureDiagram;
