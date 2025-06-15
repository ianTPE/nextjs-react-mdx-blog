"use client";

import React from 'react';

const ProjectFlowChart: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-2 overflow-x-auto">
      <div className="min-w-[600px] w-full">
        {/* Flowchart container */}
        <div className="relative flex flex-col gap-6">
          
          {/* Phase 1 */}
          <div className="w-full">
            <div className="text-center mb-2 font-semibold bg-gray-100 dark:bg-gray-800 py-1 rounded">第一階段</div>
            <div className="flex items-center justify-between">
              {/* Nodes */}
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-indigo-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  需求分析
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-indigo-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  技術選型
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-indigo-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  架構設計
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-indigo-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  專案結構
                </div>
              </div>
            </div>
            
            {/* Arrows */}
            <div className="relative h-4">
              <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gray-400"></div>
              <div className="absolute top-0 left-[25%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[50%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[75%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 right-[25%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[50%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[75%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
            </div>
          </div>
          
          {/* Connector between Phase 1 and Phase 2 */}
          <div className="relative h-10 flex justify-end pr-[25%]">
            <div className="absolute top-0 right-[25%] w-0.5 h-full bg-gray-400"></div>
            <div className="absolute bottom-0 right-[25%] left-[12.5%] h-0.5 bg-gray-400"></div>
            <div className="absolute bottom-0 left-[12.5%] w-0.5 h-1/2 bg-gray-400"></div>
            <div className="absolute bottom-0 left-[12.5%] w-2 h-2 border-b-2 border-l-2 border-gray-400 transform -rotate-45 -translate-x-1 translate-y-1"></div>
          </div>
          
          {/* Phase 2 */}
          <div className="w-full">
            <div className="text-center mb-2 font-semibold bg-gray-100 dark:bg-gray-800 py-1 rounded">第二階段</div>
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-red-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  資料庫設計
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-red-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  API 端點
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-red-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  業務邏輯
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-red-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  測試用例
                </div>
              </div>
            </div>
            
            {/* Arrows */}
            <div className="relative h-4">
              <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gray-400"></div>
              <div className="absolute top-0 left-[25%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[50%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[75%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 right-[25%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[50%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[75%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
            </div>
          </div>
          
          {/* Connector between Phase 2 and Phase 3 */}
          <div className="relative h-10 flex justify-end pr-[25%]">
            <div className="absolute top-0 right-[25%] w-0.5 h-full bg-gray-400"></div>
            <div className="absolute bottom-0 right-[25%] left-[12.5%] h-0.5 bg-gray-400"></div>
            <div className="absolute bottom-0 left-[12.5%] w-0.5 h-1/2 bg-gray-400"></div>
            <div className="absolute bottom-0 left-[12.5%] w-2 h-2 border-b-2 border-l-2 border-gray-400 transform -rotate-45 -translate-x-1 translate-y-1"></div>
          </div>
          
          {/* Phase 3 */}
          <div className="w-full">
            <div className="text-center mb-2 font-semibold bg-gray-100 dark:bg-gray-800 py-1 rounded">第三階段</div>
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-green-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  單元測試
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-green-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  API測試
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-green-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  效能測試
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-green-500 text-white rounded flex items-center justify-center text-sm shadow-md">
                  安全測試
                </div>
              </div>
            </div>
            
            {/* Arrows */}
            <div className="relative h-4">
              <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gray-400"></div>
              <div className="absolute top-0 left-[25%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[50%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[75%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 right-[25%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[50%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[75%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
            </div>
          </div>
          
          {/* Connector between Phase 3 and Phase 4 */}
          <div className="relative h-10 flex justify-end pr-[25%]">
            <div className="absolute top-0 right-[25%] w-0.5 h-full bg-gray-400"></div>
            <div className="absolute bottom-0 right-[25%] left-[12.5%] h-0.5 bg-gray-400"></div>
            <div className="absolute bottom-0 left-[12.5%] w-0.5 h-1/2 bg-gray-400"></div>
            <div className="absolute bottom-0 left-[12.5%] w-2 h-2 border-b-2 border-l-2 border-gray-400 transform -rotate-45 -translate-x-1 translate-y-1"></div>
          </div>
          
          {/* Phase 4 */}
          <div className="w-full">
            <div className="text-center mb-2 font-semibold bg-gray-100 dark:bg-gray-800 py-1 rounded">第四階段</div>
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-yellow-500 text-black rounded flex items-center justify-center text-sm shadow-md">
                  CI/CD 配置
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-yellow-500 text-black rounded flex items-center justify-center text-sm shadow-md">
                  容器化
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-yellow-500 text-black rounded flex items-center justify-center text-sm shadow-md">
                  雲端部署
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="w-24 h-12 bg-yellow-500 text-black rounded flex items-center justify-center text-sm shadow-md">
                  監控日誌
                </div>
              </div>
            </div>
            
            {/* Arrows */}
            <div className="relative h-4">
              <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 bg-gray-400"></div>
              <div className="absolute top-0 left-[25%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[50%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 left-[75%] w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-0 right-[25%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[50%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-[75%] w-2 h-2 border-t-2 border-r-2 border-gray-400 transform rotate-45 translate-x-1 -translate-y-1"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile optimization note */}
      <div className="text-xs text-gray-500 text-center mt-3 md:hidden">
        橫向滑動查看完整流程圖
      </div>
    </div>
  );
};

export default ProjectFlowChart;
