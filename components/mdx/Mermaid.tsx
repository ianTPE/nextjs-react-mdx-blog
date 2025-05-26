"use client";

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, className }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        useMaxWidth: false, // 改為 false，我們手動控制寬度
        padding: 20
      },
      themeVariables: {
        fontSize: '16px'
      }
    });
  }, []);

  useEffect(() => {
    const renderMermaid = async () => {
      if (mermaidRef.current && containerRef.current) {
        try {
          // 清空之前的內容
          mermaidRef.current.innerHTML = chart;
          
          // 渲染 Mermaid
          await mermaid.run({
            nodes: [mermaidRef.current]
          });
          
          // 渲染完成後，手動調整 SVG 樣式
          const svg = mermaidRef.current.querySelector('svg');
          if (svg) {
            // 移除限制性的內聯樣式
            svg.style.maxHeight = 'none';
            svg.style.height = 'auto';
            svg.style.transform = 'none';
            svg.style.width = '100%';
            svg.style.maxWidth = '100%';
            
            // 根据屏幕大小设置最小高度
            const isMobile = window.innerWidth < 768;
            const minHeight = isMobile ? '350px' : '500px';
            svg.style.minHeight = minHeight;
            
            // 確保SVG可見性
            svg.setAttribute('viewBox', svg.getAttribute('viewBox') || '0 0 800 600');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <>
      <div className={`my-8 overflow-x-auto ${className || ''}`} ref={containerRef}>
        <div className="flex justify-center items-center w-full">
          <div 
            className="mermaid w-full" 
            ref={mermaidRef}
            style={{
              minHeight: '400px',
              textAlign: 'center'
            }}
          />
        </div>
      </div>
      
      {/* 強制覆蓋 Mermaid 的內聯樣式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .mermaid svg {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: none !important;
            transform: none !important;
            min-height: 400px !important;
          }
          
          @media (min-width: 768px) {
            .mermaid svg {
              min-height: 500px !important;
            }
          }
          
          @media (min-width: 1024px) {
            .mermaid svg {
              min-height: 600px !important;
            }
          }
          
          @media (max-width: 767px) {
            .mermaid svg {
              min-height: 350px !important;
            }
          }
        `
      }} />
    </>
  );
};

export default Mermaid;