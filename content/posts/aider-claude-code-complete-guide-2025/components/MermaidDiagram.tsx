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
    
    // Configure mermaid with compact settings
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: window.innerWidth < 768 ? 12 : 14,
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        useMaxWidth: true,
        padding: window.innerWidth < 768 ? 8 : 12,
        nodeSpacing: window.innerWidth < 768 ? 15 : 20,
        rankSpacing: window.innerWidth < 768 ? 30 : 40
      },
      sequence: {
        useMaxWidth: true,
        width: window.innerWidth < 768 ? 120 : 180,
        height: window.innerWidth < 768 ? 30 : 50
      },
      journey: {
        useMaxWidth: true
      },
      gantt: {
        useMaxWidth: true
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
    
    // Process chart content for mobile if needed
    let processedChart = chart;
    if (isMobile) {
      // For flowcharts, prefer TD (top-down) layout on mobile
      processedChart = processedChart.replace(/flowchart\s+LR/g, 'flowchart TD');
      // Simplify labels for mobile when possible
      processedChart = processedChart.replace(/"([^"]+)\s*\(([^\)]+)\)"/g, '"$1"');
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
      
      // Apply CSS styles
      svg.style.width = '100%';
      svg.style.height = 'auto';
      svg.style.maxWidth = '100%';
      
      // Desktop-specific styles
      if (!isMobile) {
        svg.style.maxHeight = '350px';
        svg.style.transform = 'scale(0.8)';
        svg.style.transformOrigin = 'center top';
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
    <div className="relative my-6 mx-auto w-full max-w-2xl">
      <div 
        ref={containerRef}
        className="overflow-auto mx-auto max-w-full py-2 rounded-lg"
        style={{ 
          scrollbarWidth: 'thin',
          maxHeight: '60vh',
          width: '100%'
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
