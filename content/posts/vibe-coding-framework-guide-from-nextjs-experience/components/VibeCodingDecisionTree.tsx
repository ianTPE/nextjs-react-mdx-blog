"use client";

import React from 'react';
import mermaid from 'mermaid';

// Mermaid 決策樹圖表
const mermaidChart = `
flowchart TD
    A[🚀 你是 Vibe Coding 開發者] --> B{偏好 React 還是 Vue？}
    
    B -->|React| C{你的主要需求是什麼？}
    B -->|Vue| D[🟢 Nuxt.js<br/>Vue 生態最佳選擇]
    
    C -->|最完整生態系統| E[⭐ Next.js<br/>最推薦選擇]
    C -->|簡潔資料流| F[🔵 Remix<br/>強烈推薦]
    C -->|最大彈性| G[⭐ Next.js<br/>繼續使用]
    
    %% 樣式定義
    classDef primary fill:#10B981,stroke:#059669,stroke-width:3px,color:#fff
    classDef secondary fill:#3B82F6,stroke:#1D4ED8,stroke-width:2px,color:#fff
    classDef tertiary fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#fff
    classDef decision fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
    classDef start fill:#EF4444,stroke:#DC2626,stroke-width:3px,color:#fff
    
    %% 應用樣式
    class A start
    class B,C decision
    class E,G primary
    class F secondary
    class D tertiary
`;

export default function VibeCodingDecisionTree() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // 初始化 Mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        primaryColor: '#10B981',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#059669',
        lineColor: '#6B7280',
        secondaryColor: '#F3F4F6',
        tertiaryColor: '#E5E7EB',
        background: '#ffffff',
        mainBkg: '#ffffff',
        secondBkg: '#F9FAFB',
        tertiaryBkg: '#F3F4F6'
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        padding: 20,
        nodeSpacing: 50,
        rankSpacing: 60
      }
    });

    // 渲染圖表
    const renderChart = async () => {
      try {
        const element = document.getElementById('mermaid-decision-tree');
        if (element) {
          element.innerHTML = '';
          const { svg } = await mermaid.render('decision-tree', mermaidChart);
          element.innerHTML = svg;
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    };

    renderChart();
  }, []);

  return (
    <div className="my-8">
      {/* 圖表容器 */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🎯 Vibe Coding 框架選擇決策樹
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            根據你的偏好和需求，找到最適合的框架
          </p>
        </div>
        
        <div 
          id="mermaid-decision-tree" 
          className="flex justify-center items-center min-h-[400px] overflow-x-auto"
        >
          {!isLoaded && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span>Loading decision tree...</span>
            </div>
          )}
        </div>
      </div>

      {/* 圖例說明 */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            📊 推薦等級說明
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">最推薦 - 完美支援 Vibe Coding</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">強烈推薦 - 優秀的開發體驗</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">推薦 - Vue 生態首選</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            💡 使用建議
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• 新手建議從 Next.js 開始</li>
            <li>• 有 Vue 經驗選 Nuxt.js</li>
            <li>• 重視資料流選 Remix</li>
            <li>• 追求穩定選 Next.js</li>
          </ul>
        </div>
      </div>
    </div>
  );
}