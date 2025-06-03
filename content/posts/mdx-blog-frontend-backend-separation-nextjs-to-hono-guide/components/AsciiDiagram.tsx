'use client';
import React from 'react';

interface AsciiDiagramProps {
  content: string;
  className?: string;
}

const AsciiDiagram: React.FC<AsciiDiagramProps> = ({ content, className = '' }) => {
  return (
    <pre
      className={`ascii-diagram ${className}`}
      style={{
        fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        whiteSpace: 'pre',
        display: 'block',
        overflow: 'auto',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e5e7eb',
        borderRadius: '0.375rem',
        padding: '1rem',
        color: '#333',
        fontSize: '0.875rem',
        lineHeight: '1.25',
        textAlign: 'left',
        margin: '1.5rem 0',
      }}
    >
      {content}
    </pre>
  );
};

export default AsciiDiagram;
