'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LowCodeMarketDiagram = () => {
  // 市場規模預測數據
  const marketSizeData = [
    { year: '2023', value: 24.8, description: '2023年市場規模約248億美元' },
    { year: '2025', value: 37.39, description: '2025年預估市場規模約374億美元' },
    { year: '2028', value: 68, description: '2028年預估市場規模約680億美元' },
    { year: '2030', value: 120, description: '2030年預估市場規模約1200億美元' },
    { year: '2032', value: 264.4, description: '2032年預估市場規模約2644億美元' },
  ];
  
  // 主要參與者類別
  const platformTypes = [
    { name: '企業應用開發平台', value: 35, description: 'OutSystems, Mendix, Microsoft Power Apps' },
    { name: '工作流自動化平台', value: 30, description: 'Make (Integromat), n8n, Zapier' },
    { name: 'AI應用開發平台', value: 20, description: 'Dify, Coze, GPTBots' },
    { name: '數據整合平台', value: 15, description: 'Airtable, Notion, Coda' },
  ];
  
  // 應用領域
  const applicationAreas = [
    { name: '大型企業', value: 45, description: '企業級低代碼平台提供端到端應用開發能力' },
    { name: '中小企業', value: 35, description: '快速開發應用以降低IT成本' },
    { name: '政府與公共部門', value: 10, description: '數字化轉型與改善公共服務' },
    { name: '個人開發者', value: 10, description: '獨立開發者和小型團隊' },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>低代碼/無代碼市場概況</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2>市場規模與增長趨勢</h2>
        <p style={{ color: '#666' }}>
          低代碼市場正以每年約30%的複合年增長率快速擴張，預計到2032年將達到2644億美元。
        </p>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={marketSizeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: '市場規模 (十億美元)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value}十億美元`, '市場規模']} />
              <Legend />
              <Bar dataKey="value" name="市場規模 (十億美元)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ width: '48%', minWidth: '300px' }}>
          <h2>主要平台類型</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {platformTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '市場份額']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            {platformTypes.map((type, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index % COLORS.length], marginRight: '8px' }}></div>
                <div><strong>{type.name}</strong>: {type.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '48%', minWidth: '300px' }}>
          <h2>應用領域分布</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationAreas}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {applicationAreas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '市場份額']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            {applicationAreas.map((area, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index % COLORS.length], marginRight: '8px' }}></div>
                <div><strong>{area.name}</strong>: {area.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2>市場趨勢與機會</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#0088FE' }}>AI 集成</h3>
            <p>AI 與低代碼平台的深度整合，實現更智能的應用開發和自動化流程</p>
          </div>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#00C49F' }}>公民開發者</h3>
            <p>使非技術人員能夠參與應用開發，預計將維持21%的增長率到2028年</p>
          </div>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#FFBB28' }}>定制化需求</h3>
            <p>低代碼平台基礎上的專業定制服務將成為一個增長點</p>
          </div>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#FF8042' }}>行業特化</h3>
            <p>針對特定行業的低代碼解決方案將持續受到需求</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        數據來源: Forrester Research, Fortune Business Insights, PS Market Research, Mordor Intelligence (2025年預測)
      </div>
    </div>
  );
};

export default LowCodeMarketDiagram;