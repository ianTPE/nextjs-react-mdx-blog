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
      fontFamily: 'sans-serif',
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

  return (
    <div className={`my-4 overflow-auto ${className || ''}`}>
      <div className="mermaid" ref={mermaidRef}>
        {chart}
      </div>
    </div>
  );
};

export default Mermaid;