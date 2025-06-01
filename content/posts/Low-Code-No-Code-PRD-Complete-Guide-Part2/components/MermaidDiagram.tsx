"use client";

import React, { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (ref.current && chart) {
        try {
          // 動態導入 mermaid
          const mermaid = (await import('mermaid')).default;
          
          mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
          });
          
          const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          const result = await mermaid.render(uniqueId, chart);
          if (ref.current) {
            ref.current.innerHTML = result.svg;
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (ref.current) {
            ref.current.innerHTML = `<p class="text-red-500">圖表渲染錯誤: ${error instanceof Error ? error.message : '未知錯誤'}</p>`;
          }
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div 
      ref={ref} 
      className={`flex justify-center my-6 p-4 bg-gray-50 rounded-lg border ${className}`}
    />
  );
};

export default MermaidDiagram;