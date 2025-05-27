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
    <div className={`markdown-content ${className}`}>
      <style jsx global>{`
        .markdown-content {
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border-left: 4px solid #3b82f6;
          margin: 1.5rem 0;
        }
        
        .markdown-content ul {
          list-style-type: none;
          padding-left: 0;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        
        .markdown-content li {
          padding: 0.75rem 0;
          margin-left: 2rem;
          position: relative;
          display: flex;
          align-items: center;
          color: #374151;
          font-size: 1rem;
        }
        
        .markdown-content li:before {
          content: '';
          position: absolute;
          left: -1.5rem;
        }
        
        /* 移除普通列表項的默認點 */
        .markdown-content ul li:has(input[type='checkbox']) {
          display: flex;
          align-items: center;
        }
        
        /* 處理複選框樣式 */
        .markdown-content input[type='checkbox'] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          border: 2px solid #d1d5db;
          border-radius: 0.25rem;
          margin-right: 0.75rem;
          position: relative;
          cursor: pointer;
          vertical-align: middle;
          background-color: white;
          margin-top: -1px;
        }
        
        .markdown-content input[type='checkbox']:checked {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        
        .markdown-content input[type='checkbox']:checked:after {
          content: '';
          position: absolute;
          left: 0.45rem;
          top: 0.2rem;
          width: 0.35rem;
          height: 0.7rem;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .markdown-content input[type='checkbox']:hover {
          border-color: #3b82f6;
        }
        
        .markdown-content h2 {
          color: #1f2937;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.75rem;
        }
        
        .markdown-content h3 {
          color: #374151;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .markdown-content p {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.625;
          color: #4b5563;
        }
        
        .markdown-content li p {
          margin: 0;
        }
        
        /* 添加分隔線 */
        .markdown-content h2 + h3 {
          margin-top: 0.5rem;
        }
        
        /* 調整列表項前的點 */
        .markdown-content li:not(:has(input[type='checkbox']))::before {
          content: '•';
          color: #3b82f6;
          font-size: 1.5rem;
          position: absolute;
          left: -1.25rem;
          top: 0.5rem;
          line-height: 0.75;
        }
      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
