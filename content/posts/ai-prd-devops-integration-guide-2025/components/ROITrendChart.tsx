import React from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const roiTimelineData = [
  { month: '第1月', roi: -20, investment: 100, return: 80 },
  { month: '第3月', roi: -5, investment: 150, return: 145 },
  { month: '第6月', roi: 30, investment: 200, return: 260 },
  { month: '第9月', roi: 85, investment: 220, return: 407 },
  { month: '第12月', roi: 150, investment: 240, return: 600 },
  { month: '第18月', roi: 220, investment: 260, return: 832 },
];

const ROITrendChart = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">投資回報率（ROI）趨勢分析</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={roiTimelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: '金額 (萬元)', angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="roi"
            fill="#3b82f6"
            stroke="#3b82f6"
            fillOpacity={0.3}
            name="ROI"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="investment"
            stroke="#ef4444"
            name="累積投資"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="return"
            stroke="#22c55e"
            name="累積回報"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ROITrendChart;