"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Database, Globe, Settings } from "lucide-react";

export default function XanoSetupSteps() {
  const steps = [
    {
      number: 1,
      title: "註冊 Xano 帳號",
      description: "前往官網創建免費帳號",
      link: "https://xano.com",
      icon: <ExternalLink className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "建立新 Instance",
      description: "chayu-time-backend",
      icon: <Database className="w-5 h-5" />,
      color: "bg-green-500",
      highlight: true
    },
    {
      number: 3,
      title: "選擇 Region",
      description: "Asia-Pacific (最佳延遲)",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      number: 4,
      title: "初始化資料庫與 API 端點",
      description: "設定基礎架構與端點配置",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="not-prose w-full space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Xano 專案創建流程
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <Card key={index} className={`relative transition-all duration-200 hover:shadow-md ${
            step.highlight ? 'ring-2 ring-blue-200 bg-blue-50' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Step Number */}
                <div className={`w-8 h-8 rounded-full ${step.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {step.number}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {step.icon}
                    <h4 className="font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    {step.highlight && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        專案名稱
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {step.description}
                  </p>
                  
                  {step.link && (
                    <a 
                      href={step.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      前往官網
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}