"use client";

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      });
      
      // Clear the container first
      containerRef.current.innerHTML = '';
      
      try {
        const id = `mermaid-diagram-${Date.now()}`;
        mermaid.render(id, chart).then((result) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = result.svg;
          }
        });
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="text-red-500">Error rendering diagram</div>`;
        }
      }
    }
  }, [chart]);

  return (
    <div className="my-6 overflow-x-auto" ref={containerRef}>
      <div className="text-center text-gray-500 dark:text-gray-400">Loading diagram...</div>
    </div>
  );
};

export default MermaidDiagram;
