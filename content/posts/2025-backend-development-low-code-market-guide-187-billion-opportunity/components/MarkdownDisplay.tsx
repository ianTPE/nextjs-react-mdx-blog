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
        .markdown-content ul {
          list-style-type: none;
          padding-left: 0;
          margin-top: 0.5rem;
        }
        
        .markdown-content li {
          padding: 0.5rem 0;
          margin-left: 1.5rem;
          position: relative;
          display: flex;
          align-items: flex-start;
        }
        
        .markdown-content li:before {
          content: '•';
          position: absolute;
          left: -1.5rem;
          color: #3b82f6;
        }
        
        .markdown-content input[type='checkbox'] {
          margin-right: 0.75rem;
          margin-top: 0.125rem;
          width: 1.25rem;
          height: 1.25rem;
          border: 1.5px solid #d1d5db;
          border-radius: 0.25rem;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-color: white;
          cursor: pointer;
          position: relative;
        }
        
        .markdown-content input[type='checkbox']:checked {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        
        .markdown-content input[type='checkbox']:checked:after {
          content: '';
          position: absolute;
          left: 0.4rem;
          top: 0.25rem;
          width: 0.3rem;
          height: 0.6rem;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .markdown-content h2 {
          color: #1f2937;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        .markdown-content h3 {
          color: #374151;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .markdown-content p {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.625;
        }
        
        .markdown-content li p {
          margin: 0;
        }
      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
