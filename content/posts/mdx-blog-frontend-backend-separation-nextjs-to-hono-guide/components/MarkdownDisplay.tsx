'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

const MarkdownDisplay = ({ content, className = '' }: MarkdownDisplayProps) => {
  return (
    <div className={`markdown-display-container ${className}`}>
      <style jsx global>{`
        .markdown-display-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        /* 主要標題樣式 - 風險：技術倡急，失去學習動力 */
        .markdown-display-container h2 {
          background-color: #2563eb;
          color: white;
          padding: 1rem 1.5rem;
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        /* 標題中的冒號和點號處理 */
        .markdown-display-container h2::after {
          content: '';
        }
        
        /* 次級標題樣式 - 應對策略 */
        .markdown-display-container h3 {
          background-color: #f3f4f6;
          color: #374151;
          padding: 0.75rem 1.5rem;
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          border-top: 1px solid #e5e7eb;
        }
        
        /* 內容區域樣式 */
        .markdown-display-container ul {
          background-color: white;
          margin: 0;
          padding: 1.5rem;
          list-style: none;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        
        /* 最後一個 ul 元素的底部圓角 */
        .markdown-display-container > *:last-child {
          border-radius: 0 0 0.5rem 0.5rem;
        }
        
        /* 列表項樣式 */
        .markdown-display-container li {
          display: flex;
          align-items: flex-start;
          padding: 0.75rem 0;
          margin: 0;
          color: #374151;
          font-size: 1rem;
          line-height: 1.5;
        }
        
        /* 複選框樣式 */
        .markdown-display-container input[type='checkbox'] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #d1d5db;
          border-radius: 0.25rem;
          margin-right: 0.75rem;
          margin-top: 0.125rem;
          flex-shrink: 0;
          background-color: white;
          cursor: pointer;
          position: relative;
          transition: all 0.15s ease-in-out;
        }
        
        .markdown-display-container input[type='checkbox']:hover {
          border-color: #9ca3af;
        }
        
        .markdown-display-container input[type='checkbox']:checked {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        
        .markdown-display-container input[type='checkbox']:checked::after {
          content: '';
          position: absolute;
          left: 0.35rem;
          top: 0.15rem;
          width: 0.3rem;
          height: 0.6rem;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        /* 列表項文字樣式 */
        .markdown-display-container li p {
          margin: 0;
          flex: 1;
        }
        
        /* 分隔不同的卡片區塊 */
        .markdown-display-container h2:not(:first-child) {
          margin-top: 1.5rem;
        }
        
        /* 確保每個區塊都有適當的邊框 */
        .markdown-display-container {
          > h2 {
            & + h3 {
              border-top: none;
            }
            & + ul {
              border-top: 1px solid #e5e7eb;
            }
          }
        }
        
        /* 段落樣式 */
        .markdown-display-container p {
          margin: 0.75rem 0;
          line-height: 1.625;
          color: #4b5563;
        }
        
        /* 修正第一個元素的圓角 */
        .markdown-display-container > *:first-child {
          margin-top: 0;
        }
        
        /* 為整個容器添加間距 */
        .markdown-display-container {
          margin: 1.5rem 0;
        }
        
        /* 確保卡片之間有適當的間距 */
        .markdown-display-container h2 ~ h2 {
          margin-top: 2rem;
        }
        
        /* 移除任何默認的列表樣式 */
        .markdown-display-container li::before {
          content: none;
        }
        
        .markdown-display-container li::marker {
          content: none;
        }
        
        /* Code block styling for ASCII art */
        .markdown-display-container pre {
          background-color: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 0.25rem;
          padding: 1rem;
          margin: 1rem 0;
          overflow-x: auto;
          white-space: pre;
        }
        
        .markdown-display-container code {
          font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875rem;
          line-height: 1.5;
          white-space: pre;
          display: block;
          color: #374151;
        }
        
        /* Override any whitespace transformation */
        .markdown-display-container pre > code {
          white-space: pre !important;
        }
      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;