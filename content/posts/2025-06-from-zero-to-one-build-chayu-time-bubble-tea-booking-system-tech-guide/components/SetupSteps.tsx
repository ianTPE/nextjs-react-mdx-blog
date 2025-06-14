"use client";

import React from 'react';

interface StepItem {
  number: number;
  action: string;
  detail: string;
  highlight?: string;
}

const SetupSteps: React.FC = () => {
  const steps: StepItem[] = [
    {
      number: 1,
      action: "前往 bubble.io 註冊帳號",
      detail: "訪問官方網站並建立新的開發者帳號"
    },
    {
      number: 2,
      action: "Dashboard → \"Create new app\"",
      detail: "在主控台中點擊建立新應用程式按鈕"
    },
    {
      number: 3,
      action: "App name:",
      detail: "輸入專案名稱，建議使用有意義的命名",
      highlight: "tea-time-liff-backend"
    },
    {
      number: 4,
      action: "選擇模板",
      detail: "從可用模板中選擇網頁應用程式類型", 
      highlight: "Web app"
    },
    {
      number: 5,
      action: "確認創建",
      detail: "檢查設定無誤後，完成專案建立流程"
    }
  ];

  return (
    <div className="not-prose max-w-3xl mx-auto my-8 px-4">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 relative">
        建立 Bubble.io 專案步驟
        <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </h3>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 md:left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 z-0"></div>
        
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.number} className="relative flex items-start">
              {/* Step number circle */}
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-10 border-4 border-white">
                {step.number}
              </div>
              
              {/* Step content */}
              <div className="ml-6 flex-1">
                <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 relative">
                  {/* Arrow pointer */}
                  <div className="absolute left-[-8px] md:left-[-12px] top-5 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[8px] md:border-r-[12px] border-transparent border-r-gray-50"></div>
                  
                  <div className="text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-relaxed">
                    {step.action}
                    {step.highlight && (
                      <>
                        {" "}
                        <span className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-2 py-1 rounded-md font-mono text-sm md:text-base font-semibold border border-yellow-300">
                          {step.highlight}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed m-0">
                    {step.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SetupSteps;