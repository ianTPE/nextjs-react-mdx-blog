'use client';

import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import dynamic from 'next/dynamic';

// 動態導入 MDX 內容以避免 SSR 時的 hydration 問題
const MDXContent = dynamic(() => import('./content.mdx'), {
  loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded-md" />,
  ssr: false,
});

// 文章目錄結構
const tableOfContents = [
  { id: 'market-insights', title: '全球市場洞察：變革的規模與速度', level: 2 },
  { id: 'market-size-growth', title: '市場規模爆發式增長', level: 3 },
  { id: 'enterprise-adoption', title: '企業採用率飆升', level: 3 },
  { id: 'development-efficiency', title: '開發效率革命性提升', level: 3 },
  { id: 'talent-structure', title: '人才結構重新洗牌', level: 3 },
  { id: 'regional-market-analysis', title: '區域市場分析', level: 2 },
  { id: 'backend-solutions', title: '六大後端解決方案深度剖析', level: 2 },
  { id: 'workflow-automation', title: '工作流程自動化', level: 3 },
  { id: 'api-development', title: 'API 開發與管理', level: 3 },
  { id: 'headless-cms', title: 'Headless CMS 內容管理', level: 3 },
  { id: 'realtime-data', title: '即時資料處理', level: 3 },
  { id: 'graphql-integration', title: 'GraphQL 整合', level: 3 },
  { id: 'enterprise-security', title: '企業級安全架構', level: 3 },
  { id: 'case-studies', title: '實戰案例：從需求到變現', level: 2 },
  { id: 'action-plan', title: '行動建議：立即開始你的後端開發轉型', level: 2 },
];

/**
 * 將 MDX 內容分成多個懶加載區段
 * 使用標題作為分隔點
 */
export default function BackendDevelopmentGuidePage() {
  // 自定義組件，用於增強 MDX 渲染
  const components = {
    // 替換 h2 和 h3 標籤，自動添加 ID 用於導航
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = String(children).toLowerCase().replace(/\s+/g, '-');
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = String(children).toLowerCase().replace(/\s+/g, '-');
      return <h3 id={id} {...props}>{children}</h3>;
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 頁面標題區 - 始終立即載入 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          2025後端開發完全攻略：低程式碼1870億市場機遇與6大賺錢技術路線圖
        </h1>
        
        {/* 文章元數據 */}
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">2025-05-27</span>
          <span>作者: Ian Chou</span>
        </div>
        
        {/* 文章標籤 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Backend Development', 'Low-Code', 'No-Code'].map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        
        {/* 摘要 - 始終立即載入 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 italic text-gray-700">
          在AI與低程式碼革命的浪潮下，後端開發正經歷前所未有的轉型機遇。本文深入解析預計2030年達1870億美元的低程式碼市場，為後端開發者提供完整的變現路線圖...
        </div>
      </div>
      
      {/* 目錄導航 */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg sticky top-4 z-10 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">目錄</h3>
        <ul className="space-y-1">
          {tableOfContents.map((item) => (
            <li 
              key={item.id} 
              className={`ml-${(item.level - 2) * 4} hover:text-blue-600 transition-colors`}
            >
              <a href={`#${item.id}`} className="block py-1">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* MDX 內容 - 使用 MDXProvider 提供自定義組件 */}
      <div className="prose prose-lg max-w-none">
        <MDXProvider components={components}>
          <MDXContent />
        </MDXProvider>
      </div>
      
      {/* 快速返回頂部按鈕 */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="回到頂部"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
          role="img"
        >
          <title>向上箭頭</title>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </div>
  );
}
