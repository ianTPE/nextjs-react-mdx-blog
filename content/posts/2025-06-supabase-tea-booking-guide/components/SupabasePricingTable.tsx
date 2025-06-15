"use client";

import React, { useState } from 'react';

const SupabasePricingTable = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      name: 'Free',
      description: '適合個人專案與 MVP 驗證',
      price: { monthly: 0, yearly: 0 },
      popular: false,
      color: 'gray',
      features: {
        database: {
          storage: '500 MB',
          bandwidth: '2 GB',
          apiRequests: '無限制',
          realtimeConnections: '200 個同時連線',
          backups: '7 天自動備份'
        },
        auth: {
          users: '50,000 MAU',
          socialLogins: '✅ 支援',
          sso: '❌',
          advancedSecurity: '❌'
        },
        storage: {
          fileStorage: '1 GB',
          bandwidth: '2 GB',
          imageTransformation: '❌'
        },
        edgeFunctions: {
          invocations: '500,000 次/月',
          executionTime: '40 小時/月',
          customDomains: '❌'
        },
        support: '社群支援'
      }
    },
    {
      name: 'Pro',
      description: '適合生產環境與小型團隊',
      price: { monthly: 25, yearly: 300 },
      popular: true,
      color: 'green',
      features: {
        database: {
          storage: '8 GB 包含，之後 $0.125/GB',
          bandwidth: '50 GB 包含，之後 $0.09/GB',
          apiRequests: '無限制',
          realtimeConnections: '500 個同時連線',
          backups: '30 天自動備份'
        },
        auth: {
          users: '100,000 MAU',
          socialLogins: '✅ 支援',
          sso: '❌',
          advancedSecurity: '✅ 支援'
        },
        storage: {
          fileStorage: '100 GB 包含，之後 $0.021/GB',
          bandwidth: '200 GB 包含，之後 $0.09/GB',
          imageTransformation: '✅ 支援'
        },
        edgeFunctions: {
          invocations: '2,000,000 次/月',
          executionTime: '150 小時/月',
          customDomains: '✅ 支援'
        },
        support: 'Email 支援'
      }
    },
    {
      name: 'Team',
      description: '適合成長中的團隊與企業',
      price: { monthly: 599, yearly: 7188 },
      popular: false,
      color: 'purple',
      features: {
        database: {
          storage: '8 GB 包含，之後 $0.125/GB',
          bandwidth: '250 GB 包含，之後 $0.09/GB',
          apiRequests: '無限制',
          realtimeConnections: '1,500 個同時連線',
          backups: '30 天自動備份 + PITR'
        },
        auth: {
          users: '無限制',
          socialLogins: '✅ 支援',
          sso: '✅ SAML 2.0',
          advancedSecurity: '✅ 完整支援'
        },
        storage: {
          fileStorage: '100 GB 包含，之後 $0.021/GB',
          bandwidth: '200 GB 包含，之後 $0.09/GB',
          imageTransformation: '✅ 支援'
        },
        edgeFunctions: {
          invocations: '10,000,000 次/月',
          executionTime: '1,000 小時/月',
          customDomains: '✅ 支援'
        },
        support: '優先 Email + SLA 保證'
      }
    }
  ];

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colorMap = {
      gray: {
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        border: 'border-gray-200'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200'
      }
    };
    return colorMap[color as keyof typeof colorMap][variant];
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
  };

  return (
    <div className="my-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Supabase 定價方案對比
        </h3>
        <p className="text-gray-600 mb-6">
          從免費開始，隨業務成長彈性升級
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            年付
            <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
              省 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricingPlans.map((plan, index) => {
          const savings = calculateSavings(plan.price.monthly, plan.price.yearly);
          
          return (
            <div
              key={index}
              className={`relative rounded-xl border-2 ${
                plan.popular 
                  ? 'border-green-500 shadow-lg scale-105' 
                  : getColorClasses(plan.color, 'border')
              } bg-white overflow-hidden`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-medium">
                  🏆 最受歡迎
                </div>
              )}

              <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {plan.price[billingCycle] > 0 ? '/月' : '永久免費'}
                    </span>
                    
                    {billingCycle === 'yearly' && savings > 0 && (
                      <div className="text-green-600 text-sm font-medium mt-1">
                        年付省 {savings}%
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {plan.name === 'Free' ? '立即開始' : '選擇方案'}
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4 text-sm">
                  {/* Database Features */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🗄️ 資料庫</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 儲存空間: {plan.features.database.storage}</li>
                      <li>• 頻寬: {plan.features.database.bandwidth}</li>
                      <li>• 即時連線: {plan.features.database.realtimeConnections}</li>
                      <li>• 備份: {plan.features.database.backups}</li>
                    </ul>
                  </div>

                  {/* Auth Features */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🔐 認證</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 活躍用戶: {plan.features.auth.users}</li>
                      <li>• 社群登入: {plan.features.auth.socialLogins}</li>
                      <li>• SSO: {plan.features.auth.sso}</li>
                    </ul>
                  </div>

                  {/* Edge Functions */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">⚡ Edge Functions</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 調用次數: {plan.features.edgeFunctions.invocations}</li>
                      <li>• 執行時間: {plan.features.edgeFunctions.executionTime}</li>
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🎧 支援</h5>
                    <p className="text-gray-600">{plan.features.support}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tea Shop Specific Recommendations */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
        <h4 className="text-lg font-bold text-amber-900 mb-4">
          🍵 茶語時光系統建議方案
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4 border border-amber-200">
            <h5 className="font-semibold text-amber-900 mb-2">🚀 MVP 階段</h5>
            <p className="text-amber-800 mb-2">
              <strong>建議：Free 方案</strong>
            </p>
            <ul className="text-amber-700 space-y-1">
              <li>• 支援 500+ 活躍用戶</li>
              <li>• 完整功能驗證</li>
              <li>• 無需信用卡</li>
              <li>• 0 成本驗證市場</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200 shadow-md">
            <h5 className="font-semibold text-green-900 mb-2">📈 成長階段</h5>
            <p className="text-green-800 mb-2">
              <strong>建議：Pro 方案 ($25/月)</strong>
            </p>
            <ul className="text-green-700 space-y-1">
              <li>• 支援 5,000+ 活躍用戶</li>
              <li>• 完整商業功能</li>
              <li>• Email 技術支援</li>
              <li>• 性價比最高</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h5 className="font-semibold text-purple-900 mb-2">🏢 企業階段</h5>
            <p className="text-purple-800 mb-2">
              <strong>建議：Team 方案 ($599/月)</strong>
            </p>
            <ul className="text-purple-700 space-y-1">
              <li>• 無限用戶數</li>
              <li>• 企業級安全</li>
              <li>• SLA 保證</li>
              <li>• 優先支援</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          💡 所有方案都包含：PostgreSQL 資料庫、RESTful API、即時訂閱、認證系統、檔案儲存
        </p>
        <p className="mt-1">
          📞 需要企業級支援或自部署方案？
          <a href="#" className="text-green-600 hover:text-green-700 font-medium ml-1">
            聯繫銷售團隊
          </a>
        </p>
      </div>
    </div>
  );
};

export default SupabasePricingTable;