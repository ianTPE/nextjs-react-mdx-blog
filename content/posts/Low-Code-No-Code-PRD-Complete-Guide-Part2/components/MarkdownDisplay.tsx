"use client";

import React from 'react';

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content, className = "" }) => {
  return (
    <div className={`my-4 p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r ${className}`}>
      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono overflow-x-auto">
        {content}
      </pre>
    </div>
  );
};

export default MarkdownDisplay;