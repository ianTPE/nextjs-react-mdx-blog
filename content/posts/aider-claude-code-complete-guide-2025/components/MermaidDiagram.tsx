"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Reset states
    setIsLoading(true);
    setError(null);
    
    // Clear the container first
    containerRef.current.innerHTML = '';
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    // Configure mermaid to be compact on all devices
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: isMobile ? 12 : 14,
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        useMaxWidth: true,
        padding: isMobile ? 8 : 12,
        nodeSpacing: isMobile ? 15 : 20,
        rankSpacing: isMobile ? 30 : 40
      },
      sequence: {
        useMaxWidth: true,
        width: isMobile ? 120 : 180,
        height: isMobile ? 30 : 50
      },
      journey: {
        useMaxWidth: true
      },
      gantt: {
        useMaxWidth: true
      }
    });
    
    // Process chart content for mobile if needed
    let processedChart = chart;
    if (isMobile) {
      // For flowcharts, prefer TD (top-down) layout on mobile
      processedChart = processedChart.replace(/flowchart\s+LR/g, 'flowchart TD');
      
      // Simplify labels for mobile when possible
      processedChart = processedChart.replace(/"([^"]+)\s*\(([^\)]+)\)"/g, '"$1"');
    }
    
    try {
      const id = `mermaid-diagram-${Date.now()}`;
      mermaid.render(id, processedChart).then((result) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = result.svg;
          
          // Add styling to constrain the SVG size on all devices
          const svg = containerRef.current.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', '100%');
            // Use CSS for height control instead of the SVG height attribute
            svg.removeAttribute('height');
            svg.style.height = 'auto';
            svg.style.maxWidth = '100%';
            
            // Constrain maximum size on desktop
            if (!isMobile) {
              svg.style.maxHeight = '400px';
              svg.style.transform = 'scale(0.85)';
              svg.style.transformOrigin = 'center top';
            }
            
            // Make tap targets larger on mobile
            if (isMobile) {
              const clickableElements = svg.querySelectorAll('g[class*="node"], g[class*="cluster"]');
              for (const el of clickableElements) {
                el.setAttribute('style', `${el.getAttribute('style') || ''}; cursor: pointer; touch-action: manipulation;`);
              }
            }
          }
          
          setIsLoading(false);
        }
      }).catch(err => {
        console.error('Error in mermaid render:', err);
        setError('圖表渲染失敗');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error rendering Mermaid diagram:', error);
      setError('圖表渲染失敗');
      setIsLoading(false);
    }
    
    // Responsive handling
    const handleResize = () => {
      // Re-render on significant size changes
      if (containerRef.current) {
        const wasMobile = isMobile;
        const nowMobile = window.innerWidth < 768;
        
        if (wasMobile !== nowMobile) {
          // Reload the diagram if switching between mobile/desktop
          window.location.reload();
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chart]);

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
