"use client";

import React, { useEffect, useState } from 'react';
import { 
  VictoryBar, 
  VictoryChart, 
  VictoryAxis, 
  VictoryTheme, 
  VictoryTooltip, 
  VictoryContainer
} from 'victory';

interface TechStackItem {
  category: string;
  adoption: number;
  tools: string;
  color: string;
}

const VictoryTechStackChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const techStackData: TechStackItem[] = [
    { category: 'AI 需求分析', tools: 'GPT-4, BERT, AWS Comprehend', adoption: 85, color: '#3b82f6' },
    { category: '智能編碼', tools: 'GitHub Copilot, CodeWhisperer', adoption: 75, color: '#10b981' },
    { category: '自適應流水線', tools: 'Harness AI, Azure ML', adoption: 60, color: '#f59e0b' },
    { category: '智能運維', tools: 'Moogsoft, Google AIOps', adoption: 70, color: '#ef4444' },
    { category: '數據閉環', tools: 'MLflow, Elasticsearch', adoption: 65, color: '#8b5cf6' },
  ];

  if (!isMounted) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
        <div className="w-full h-[350px] flex items-center justify-center bg-gray-50">
          <p>載入技術棧圖表...</p>
        </div>
      </div>
    );
  }

  // 根據屏幕寬度調整圖表
  const isMobile = windowWidth < 640;
  const chartWidth = isMobile ? windowWidth - 40 : 500;
  const chartHeight = 400;
  const labelFontSize = isMobile ? 10 : 12;
  const padding = isMobile 
    ? { top: 30, bottom: 50, left: 80, right: 20 } 
    : { top: 30, bottom: 50, left: 120, right: 30 };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
      <div className="flex justify-center">
        <VictoryChart
          horizontal
          domainPadding={{ x: 20 }}
          width={chartWidth}
          height={chartHeight}
          padding={padding}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryContainer 
              responsive={true}
              style={{
                touchAction: "auto"
              }}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => tick}
            style={{
              tickLabels: { 
                fontSize: labelFontSize,
                padding: 5,
                fill: "#333"
              }
            }}
          />
          <VictoryAxis
            tickFormat={(x: number) => `${x}%`}
            style={{
              tickLabels: { 
                fontSize: labelFontSize,
                fill: "#333"
              }
            }}
            domain={[0, 100]}
          />
          <VictoryBar
            data={techStackData}
            x="category"
            y="adoption"
            style={{
              data: {
                fill: ({ datum }) => datum.color,
                width: isMobile ? 15 : 20
              }
            }}
            cornerRadius={{ topRight: 4, bottomRight: 4 }}
            barRatio={0.8}
            labels={({ datum }) => `${datum.adoption}%`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  stroke: "#e5e7eb",
                  fill: "#f9fafb",
                }}
                style={{ fontSize: labelFontSize }}
              />
            }
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default VictoryTechStackChart;
