'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownDisplay.module.css'; // 導入 CSS Modules

interface MarkdownDisplayProps {
  content: string;
  className?: string; // 外部傳入的 class，用於額外的自訂樣式
}

const MarkdownDisplay = ({ content, className = '' }: MarkdownDisplayProps) => {
  // 合併 CSS Modules 的 class 和外部傳入的 class
  // .trim() 用於防止 className 為空時產生多餘空格
  const combinedClassName = `${styles.markdownContainer} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;