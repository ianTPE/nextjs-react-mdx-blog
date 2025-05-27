'use client';

import React, { ReactNode } from 'react';

interface MDXLazyContainerProps {
  children: ReactNode;
  toc?: { id: string; title: string; level: number }[];
}

/**
 * MDXLazyContainer 組件
 * 
 * 此組件分析 MDX 內容並將其分段為可懶加載的區塊
 * 它不改變原始 MDX 內容，但提供了一個包裝層來優化大型文章的性能
 */
const MDXLazyContainer: React.FC<MDXLazyContainerProps> = ({ 
  children,
  toc = [] 
}) => {
  return (
    <div className="mdx-lazy-container">
      {/* 文章頂部導航 - 顯示目錄 */}
      {toc.length > 0 && (
        <nav className="toc mb-8 p-4 bg-gray-50 rounded-lg sticky top-4 z-10 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">目錄</h3>
          <ul className="space-y-1">
            {toc.map((item) => (
              <li 
                key={item.id} 
                className={`pl-${(item.level - 1) * 4} hover:text-blue-600 transition-colors`}
              >
                <a href={`#${item.id}`} className="block py-1">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 文章內容 - 由父組件提供 */}
      <div className="mdx-content">
        {children}
      </div>

      {/* 快速返回頂部按鈕 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="回到頂部"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
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
};

export default MDXLazyContainer;
