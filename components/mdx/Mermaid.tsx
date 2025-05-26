"use client";

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, className }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        useMaxWidth: true,
        padding: 15
      },
      themeVariables: {
        fontSize: '16px'
      }
    });
    
    // Make sure the element exists and mermaid is loaded
    if (mermaidRef.current && typeof mermaid !== 'undefined') {
      try {
        mermaid.contentLoaded();
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    }
  }, [chart]);

  useEffect(() => {
    // 添加全局樣式來控制 Mermaid 圖表大小
    const style = document.createElement('style');
    style.textContent = `
      .mermaid-responsive {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
      }
      
      .mermaid-responsive .mermaid {
        width: 100%;
        max-width: 100%;
      }
      
      .mermaid-responsive .mermaid svg {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 400px;
      }
      
      /* 桌面端調整 */
      @media (min-width: 768px) {
        .mermaid-responsive .mermaid svg {
          min-height: 500px;
          transform: none !important;
        }
      }
      
      /* 大螢幕調整 */
      @media (min-width: 1024px) {
        .mermaid-responsive .mermaid svg {
          min-height: 600px;
        }
      }
      
      /* 手機端保持原有設定 */
      @media (max-width: 767px) {
        .mermaid-responsive .mermaid svg {
          min-height: 350px;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`my-8 overflow-x-auto ${className || ''}`}>
      <div className="mermaid-responsive">
        <div 
          className="mermaid" 
          ref={mermaidRef}
        >
          {chart}
        </div>
      </div>
    </div>
  );
};

export default Mermaid;