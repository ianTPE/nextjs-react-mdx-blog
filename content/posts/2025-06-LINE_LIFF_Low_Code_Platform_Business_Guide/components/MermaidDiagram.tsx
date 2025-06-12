'use client';

import { useEffect, useState, useRef, type FC } from 'react';
import mermaid from 'mermaid';
import type { MermaidConfig } from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  config?: MermaidConfig;                      
}

const MermaidDiagram: FC<MermaidDiagramProps> = ({ chart, config }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  /* 只在第一次掛載時初始化 Mermaid */
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: { useMaxWidth: true },
      ...config,                // 允許外部覆寫
    });
  }, [config]);

  /* 每當 chart 文字變動，就重新渲染一次 */
  useEffect(() => {
    if (!chart) return;
    const id = `mermaid-${Date.now()}`;
    mermaid
      .render(id, chart)        // 產生 SVG 字串
      .then(({ svg }) => setSvg(svg))
      .catch(console.error);
  }, [chart]);

  /* 把 SVG 塞進容器；寬度 100%、高度自動 */
  return (
    <div
      ref={ref}
      className="w-full overflow-auto"
      style={{ maxHeight: '80vh' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
