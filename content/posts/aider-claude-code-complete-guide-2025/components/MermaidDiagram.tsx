"use client";

import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Initialize Mermaid once on component mount
  useEffect(() => {
    // Check if we're on mobile
    setIsMobile(window.innerWidth < 768);
    
    // Configure mermaid with Context7-inspired responsive settings
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: window.innerWidth < 768 ? 12 : 16, // 桌面使用更大字體
      maxTextSize: window.innerWidth < 768 ? 50000 : 90000,
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        useMaxWidth: true,
        padding: window.innerWidth < 768 ? 8 : 16, // 桌面更大間距
        nodeSpacing: window.innerWidth < 768 ? 15 : 30, // 桌面更大節點間距
        rankSpacing: window.innerWidth < 768 ? 30 : 50 // 桌面更大層級間距
      },
      sequence: {
        useMaxWidth: true,
        wrap: window.innerWidth < 768, // 手機上自動換行
        width: window.innerWidth < 768 ? 120 : 200, // 桌面更寬
        height: window.innerWidth < 768 ? 30 : 60 // 桌面更高
      },
      journey: {
        useMaxWidth: true
      },
      gantt: {
        useMaxWidth: true,
        displayMode: window.innerWidth < 768 ? 'compact' : undefined // 手機緊湊模式，桌面使用默認
      },
      // 新增其他圖表類型的響應式配置
      xyChart: {
        width: window.innerWidth < 768 ? 350 : 900,
        height: window.innerWidth < 768 ? 250 : 600
      },
      sankey: {
        width: window.innerWidth < 768 ? 350 : 800,
        height: window.innerWidth < 768 ? 250 : 400
      }
    });
    
    // Handle resize events
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (currentIsMobile !== isMobile) {
        setIsMobile(currentIsMobile);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]); // Empty dependency array - only run once on mount
  
  // Render diagram whenever chart or isMobile changes
  useEffect(() => {
    if (!chart) return;
    
    setIsLoading(true);
    setError(null);
    
    // Process chart content with Context7-inspired optimizations
    let processedChart = chart;
    if (isMobile) {
      // For flowcharts, prefer TD (top-down) layout on mobile
      processedChart = processedChart.replace(/flowchart\s+LR/g, 'flowchart TD');
      // Simplify labels for mobile when possible
      processedChart = processedChart.replace(/"([^"]+)\s*\(([^\)]+)\)"/g, '"$1"');
      
      // 添加手機優化的前置配置（如果圖表沒有的話）
      if (!processedChart.includes('---\nconfig:') && !processedChart.includes('%%{init:')) {
        const mobileConfig = `---
config:
  theme: 'default'
  themeVariables:
    fontSize: '12px'
  flowchart:
    useMaxWidth: true
    htmlLabels: true
---
`;
        processedChart = mobileConfig + processedChart;
      }
    } else {
      // 桌面版優化：確保有最大寬度限制
      if (!processedChart.includes('---\nconfig:') && !processedChart.includes('%%{init:')) {
        const desktopConfig = `---
config:
  theme: 'default'
  themeVariables:
    fontSize: '14px'
  flowchart:
    useMaxWidth: true
    htmlLabels: true
---
`;
        processedChart = desktopConfig + processedChart;
      }
    }
    
    // Use mermaid.render() which returns a Promise with SVG
    const id = `mermaid-${Date.now()}`;
    
    try {
      mermaid.render(id, processedChart)
        .then(result => {
          // Store SVG content in state instead of directly manipulating DOM
          setSvgContent(result.svg);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to render mermaid diagram:', err);
          setError('圖表渲染失敗');
          setIsLoading(false);
        });
    } catch (err) {
      console.error('Error in mermaid rendering:', err);
      setError('圖表渲染失敗');
      setIsLoading(false);
    }
  }, [chart, isMobile]);
  
  // Apply styles after SVG is rendered via dangerouslySetInnerHTML
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;
    
    // Apply styles to the SVG element after it's been added to the DOM
    const applyStylesToSvg = () => {
      if (!containerRef.current) return;
      
      const svg = containerRef.current.querySelector('svg') as SVGSVGElement | null;
      if (!svg) return;
      
      // Remove height attribute and set CSS height instead
      svg.removeAttribute('height');
      
      // Apply CSS styles with better desktop scaling
      svg.style.width = '100%';
      svg.style.height = 'auto';
      svg.style.maxWidth = '100%';
      
      // 根據圖表類型和復雜度智能調整大小
      if (!isMobile) {
        // 檢測圖表類型和復雜度
        const isFlowchart = chart.includes('flowchart');
        const isTimeline = chart.includes('timeline');
        const isJourney = chart.includes('journey');
        const nodeCount = (chart.match(/-->/g) || []).length; // 估算節點數量
        
        let maxHeight = '70vh'; // 桌面最大高度限制為視窗高度的70%
        let minHeight = '400px'; // 默認最小高度
        let minWidth = '400px'; // 桌面最小寬度
        
        if (isFlowchart) {
          // 流程圖：根據節點數量調整
          if (nodeCount > 15) {
            maxHeight = '80vh'; // 複雜流程圖允許更高
            minHeight = '500px';
            minWidth = '600px'; // 複雜圖表需要更寬
          } else if (nodeCount > 8) {
            maxHeight = '70vh'; // 中等流程圖
            minHeight = '450px';
            minWidth = '500px';
          } else {
            maxHeight = '60vh'; // 簡單流程圖
            minHeight = '400px';
            minWidth = '400px';
          }
        } else if (isTimeline || isJourney) {
          maxHeight = '50vh'; // 時間線類型較扁平
          minHeight = '300px';
          minWidth = '600px'; // 時間線通常較寬
        }
        
        svg.style.maxHeight = maxHeight;
        svg.style.minHeight = minHeight;
        svg.style.minWidth = minWidth; // 確保桌面有足夠寬度
        svg.style.transform = 'none';
        svg.style.transformOrigin = 'center top';
        
        // 針對窄圖表和垂直流程圖進行更積極的放大
        const svgWidth = svg.viewBox.baseVal.width;
        const svgHeight = svg.viewBox.baseVal.height;
        const aspectRatio = svgHeight / svgWidth;
        
        if (svgWidth < 800) { // 提高閾值，更多圖表會被放大
          let scaleX = 1;
          
          // 對於垂直流程圖（高寬比 > 2），更積極地水平放大
          if (aspectRatio > 2) {
            scaleX = Math.min(3, 800 / svgWidth); // 垂直圖表可以放大到3倍
          } else {
            scaleX = Math.min(2.5, 600 / svgWidth); // 其他圖表最多2.5倍
          }
          
          if (scaleX > 1.1) { // 只有需要明顯縮放時才應用
            svg.style.transform = `scaleX(${scaleX})`;
            svg.style.transformOrigin = 'left top';
            console.log(`Applied scaleX: ${scaleX} for vertical flowchart (aspect ratio: ${aspectRatio.toFixed(2)})`);
          }
        }
        
        console.log(`Applied maxHeight: ${maxHeight}, minHeight: ${minHeight}, minWidth: ${minWidth} to chart with ${nodeCount} connections, SVG: ${svgWidth}x${svgHeight}`);
      }
      
      // Mobile-specific styles
      if (isMobile) {
        const clickableElements = svg.querySelectorAll('g[class*="node"], g[class*="cluster"]');
        for (const el of clickableElements) {
          const element = el as SVGElement;
          element.style.cursor = 'pointer';
          element.style.touchAction = 'manipulation';
        }
      }
    };
    
    // Run after a small delay to ensure the SVG is in the DOM
    const timer = setTimeout(applyStylesToSvg, 0);
    return () => clearTimeout(timer);
  }, [svgContent, isMobile]);

  return (
    <div className="relative my-6 mx-auto w-full max-w-4xl"> {/* 增加桌面最大寬度 */}
      <div 
        ref={containerRef}
        className="overflow-auto mx-auto max-w-full py-2 rounded-lg"
        style={{ 
          scrollbarWidth: 'thin',
          maxHeight: isMobile ? '60vh' : '80vh', // 桌面也設定最大高度
          minHeight: isMobile ? 'auto' : (() => {
            // 根據圖表復雜度設置容器最小高度
            const nodeCount = (chart.match(/-->/g) || []).length;
            const isTimeline = chart.includes('timeline') || chart.includes('journey');
            
            if (isTimeline) return '320px';
            if (nodeCount > 15) return '500px'; // 降低最小高度
            if (nodeCount > 8) return '450px';
            return '400px';
          })(),
          width: '100%',
          // 桌面整體縮放
          transform: !isMobile ? 'scale(1.2)' : 'none',
          transformOrigin: !isMobile ? 'center top' : 'initial',
          // 使用 margin 來補償縮放後的空間
          marginBottom: !isMobile ? '10%' : '0'
        }}
      >
        {isLoading && (
          <div className="flex justify-center items-center h-24 text-gray-500 dark:text-gray-400">
            <div className="animate-pulse">載入圖表中...</div>
          </div>
        )}
        
        {/* Use dangerouslySetInnerHTML to insert the SVG content */}
        {!isLoading && !error && (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        )}
      </div>
      
      {error && (
        <div className="text-center text-red-500 dark:text-red-400 text-sm mt-2">
          {error}
        </div>
      )}
      
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span className="md:hidden">※ 可左右滑動查看完整圖表</span>
      </div>
    </div>
  );
};

export default MermaidDiagram;
