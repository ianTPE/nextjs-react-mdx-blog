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
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
