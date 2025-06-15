"use client";

import React, { useState } from 'react';

const ThreePlatformCostComparison = () => {
  const [userScale, setUserScale] = useState<'startup' | 'growth' | 'enterprise'>('growth');

  const costData = {
    startup: {
      label: '新創階段 (500-2K 用戶)',
      timeframe: '月費用',
      bubble: {
        plan: 'Professional',
        baseCost: 29,
        additionalCosts: {
          apiCalls: 0, // 包含在方案內
          storage: 0,
          bandwidth: 0
        },
        totalCost: 29,
        limitations: ['API 調用有限', '500 MAU 限制', '有 Bubble 品牌']
      },
      xano: {
        plan: 'Launch',
        baseCost: 85,
        additionalCosts: {
          apiCalls: 0,
          storage: 0,
          bandwidth: 0
        },
        totalCost: 85,
        limitations: ['25k API 調用/月', '1GB 資料庫', '基礎支援']
      },
      supabase: {
        plan: 'Pro',
        baseCost: 25,
        additionalCosts: {
          apiCalls: 0, // 無限制
          storage: 0, // 8GB 包含
          bandwidth: 0 // 50GB 包含
        },
        totalCost: 25,
        limitations: ['100k MAU', '8GB 資料庫', '50GB 頻寬']
      }
    },
    growth: {
      label: '成長階段 (5K-50K 用戶)',
      timeframe: '月費用',
      bubble: {
        plan: 'Production',
        baseCost: 115,
        additionalCosts: {
          apiCalls: 50, // 額外 API 調用費用
          storage: 20,
          bandwidth: 30
        },
        totalCost: 215,
        limitations: ['擴展成本高', '效能瓶頸', '平台依賴']
      },
      xano: {
        plan: 'Scale',
        baseCost: 185,
        additionalCosts: {
          apiCalls: 25,
          storage: 15,
          bandwidth: 20
        },
        totalCost: 245,
        limitations: ['API 調用計費', '額外儲存費用', '有限客製化']
      },
      supabase: {
        plan: 'Pro',
        baseCost: 25,
        additionalCosts: {
          apiCalls: 0, // 仍然無限制
          storage: 12, // 額外 4GB × $0.125
          bandwidth: 9 // 額外 10GB × $0.09
        },
        totalCost: 46,
        limitations: ['按用量計費', '可預測成本', '完全控制']
      }
    },
    enterprise: {
      label: '企業階段 (100K+ 用戶)',
      timeframe: '月費用',
      bubble: {
        plan: 'Custom',
        baseCost: 1000,
        additionalCosts: {
          apiCalls: 300,
          storage: 200,
          bandwidth: 500
        },
        totalCost: 2000,
        limitations: ['極高成本', '效能限制', '需要重新架構']
      },
      xano: {
        plan: 'Enterprise',
        baseCost: 1000,
        additionalCosts: {
          apiCalls: 150,
          storage: 100,
          bandwidth: 200
        },
        totalCost: 1450,
        limitations: ['企業級支援', '但仍有平台限制', '定制成本高']
      },
      supabase: {
        plan: 'Team / Self-hosted',
        baseCost: 599,
        additionalCosts: {
          apiCalls: 0,
          storage: 50, // 大量額外儲存
          bandwidth: 180 // 大量額外頻寬
        },
        totalCost: 829,
        limitations: ['可自部署', '完全控制', '線性擴展成本']
      }
    }
  };

  const scaleOptions = [
    { key: 'startup', label: '新創階段', icon: '🚀', users: '500-2K 用戶' },
    { key: 'growth', label: '成長階段', icon: '📈', users: '5K-50K 用戶' },
    { key: 'enterprise', label: '企業階段', icon: '🏢', users: '100K+ 用戶' }
  ];

  const currentData = costData[userScale];

  const getSavingsPercentage = (cost: number, compareTo: number) => {
    return Math.round(((compareTo - cost) / compareTo) * 100);
  };

  const getCostColor = (platform: 'bubble' | 'xano' | 'supabase') => {
    const costs = [currentData.bubble.totalCost, currentData.xano.totalCost, currentData.supabase.totalCost];
    const minCost = Math.min(...costs);
    const platformCost = currentData[platform].totalCost;
    
    if (platformCost === minCost) return 'border-green-500 bg-green-50';
    if (platformCost <= minCost * 1.5) return 'border-yellow-500 bg-yellow-50';
    return 'border-red-500 bg-red-50';
  };

  const getTextColor = (platform: 'bubble' | 'xano' | 'supabase') => {
    const costs = [currentData.bubble.totalCost, currentData.xano.totalCost, currentData.supabase.totalCost];
    const minCost = Math.min(...costs);
    const platformCost = currentData[platform].totalCost;
    
    if (platformCost === minCost) return 'text-green-700';
    if (platformCost <= minCost * 1.5) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="my-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          三平台成本效益分析
        </h3>
        <p className="text-gray-600">
          不同業務規模下的真實成本對比
        </p>
      </div>

      {/* Scale Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {scaleOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setUserScale(option.key as any)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                userScale === option.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg mb-1">{option.icon}</span>
                <span className="font-semibold">{option.label}</span>
                <span className="text-xs text-gray-500">{option.users}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scale Info */}
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          {currentData.label} - {currentData.timeframe}
        </h4>
      </div>

      {/* Cost Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { key: 'bubble' as const, name: 'Bubble.io', icon: '🫧', color: 'blue' },
          { key: 'xano' as const, name: 'Xano', icon: '⚡', color: 'purple' },
          { key: 'supabase' as const, name: 'Supabase', icon: '🚀', color: 'green' }
        ].map((platform) => {
          const data = currentData[platform.key];
          const isLowest = data.totalCost === Math.min(currentData.bubble.totalCost, currentData.xano.totalCost, currentData.supabase.totalCost);
          
          return (
            <div
              key={platform.key}
              className={`relative rounded-xl border-2 ${getCostColor(platform.key)} ${
                isLowest ? 'shadow-lg scale-105' : ''
              } bg-white overflow-hidden`}
            >
              {isLowest && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 text-xs font-medium">
                  💰 最經濟選擇
                </div>
              )}

              <div className={`p-6 ${isLowest ? 'pt-8' : ''}`}>
                {/* Platform Header */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-xl">{platform.icon}</span>
                    <h4 className="text-lg font-bold text-gray-900">{platform.name}</h4>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-100 rounded px-2 py-1 inline-block">
                    {data.plan} 方案
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">基礎方案</span>
                    <span className="font-semibold">${data.baseCost}</span>
                  </div>
                  
                  {data.additionalCosts.apiCalls > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">額外 API 調用</span>
                      <span className="text-sm">+${data.additionalCosts.apiCalls}</span>
                    </div>
                  )}
                  
                  {data.additionalCosts.storage > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">額外儲存</span>
                      <span className="text-sm">+${data.additionalCosts.storage}</span>
                    </div>
                  )}
                  
                  {data.additionalCosts.bandwidth > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">額外頻寬</span>
                      <span className="text-sm">+${data.additionalCosts.bandwidth}</span>
                    </div>
                  )}

                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">總計</span>
                    <span className={`text-xl font-bold ${getTextColor(platform.key)}`}>
                      ${data.totalCost}/月
                    </span>
                  </div>
                </div>

                {/* Savings Badge */}
                {!isLowest && (
                  <div className="text-center mb-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      比最低價貴 ${data.totalCost - Math.min(currentData.bubble.totalCost, currentData.xano.totalCost, currentData.supabase.totalCost)}/月
                    </span>
                  </div>
                )}

                {/* Limitations */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">限制與特色</h5>
                  <ul className="space-y-1">
                    {data.limitations.map((limitation, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="mr-1">•</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Annual Cost Projection */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-6">
        <h4 className="text-lg font-bold text-blue-900 mb-4">
          📊 年度成本預估 ({currentData.label})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: 'bubble' as const, name: 'Bubble.io', icon: '🫧' },
            { key: 'xano' as const, name: 'Xano', icon: '⚡' },
            { key: 'supabase' as const, name: 'Supabase', icon: '🚀' }
          ].map((platform) => {
            const monthlyTotal = currentData[platform.key].totalCost;
            const annualTotal = monthlyTotal * 12;
            const supabaseAnnual = currentData.supabase.totalCost * 12;
            const savings = annualTotal - supabaseAnnual;
            
            return (
              <div key={platform.key} className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span>{platform.icon}</span>
                  <span className="font-semibold text-gray-900">{platform.name}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${annualTotal.toLocaleString()}
                </div>
                {platform.key !== 'supabase' && savings > 0 && (
                  <div className="text-sm text-red-600">
                    比 Supabase 多 ${savings.toLocaleString()}
                  </div>
                )}
                {platform.key === 'supabase' && (
                  <div className="text-sm text-green-600 font-medium">
                    🏆 年度最佳選擇
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <h4 className="text-lg font-bold text-green-900 mb-4">
          💰 投資回報率 (ROI) 分析
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-green-900 mb-3">成本效益排名</h5>
            <div className="space-y-2">
              {[
                { name: 'Supabase', cost: currentData.supabase.totalCost, rank: 1 },
                { name: 'Bubble.io', cost: currentData.bubble.totalCost, rank: 2 },
                { name: 'Xano', cost: currentData.xano.totalCost, rank: 3 }
              ].sort((a, b) => a.cost - b.cost).map((platform, index) => (
                <div key={platform.name} className="flex items-center justify-between bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-green-500 text-white' : 
                      index === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{platform.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">${platform.cost}/月</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-green-900 mb-3">選擇 Supabase 的節省</h5>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">vs Bubble.io</span>
                  <span className="font-bold text-green-600">
                    省 ${(currentData.bubble.totalCost - currentData.supabase.totalCost) * 12}/年
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">vs Xano</span>
                  <span className="font-bold text-green-600">
                    省 ${(currentData.xano.totalCost - currentData.supabase.totalCost) * 12}/年
                  </span>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-3 border border-green-300 mt-3">
                <div className="text-center">
                  <div className="text-sm text-green-700">3年累積節省</div>
                  <div className="text-xl font-bold text-green-900">
                    ${Math.max(
                      (currentData.bubble.totalCost - currentData.supabase.totalCost) * 36,
                      (currentData.xano.totalCost - currentData.supabase.totalCost) * 36
                    ).toLocaleString()}+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreePlatformCostComparison;