"use client";

import React from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const AIDecisionTree: React.FC = () => {
  // 简化的节点定义
  const nodes: Node[] = [
    // 根节点
    {
      id: '1',
      position: { x: 400, y: 50 },
      data: { label: '🤔 技術問題' },
      style: {
        background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
        color: 'white',
        border: '2px solid #8B5CF6',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        minWidth: '150px',
        textAlign: 'center',
      },
    },
    
    // 四个场景节点
    {
      id: '2',
      position: { x: 100, y: 200 },
      data: { label: '📖 學習新技術' },
      style: {
        background: 'linear-gradient(to right, #3B82F6, #1D4ED8)',
        color: 'white',
        border: '2px solid #3B82F6',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '14px',
        fontWeight: '600',
        minWidth: '130px',
        textAlign: 'center',
      },
    },
    {
      id: '3',
      position: { x: 300, y: 200 },
      data: { label: '⚡ 快速原型' },
      style: {
        background: 'linear-gradient(to right, #3B82F6, #1D4ED8)',
        color: 'white',
        border: '2px solid #3B82F6',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '14px',
        fontWeight: '600',
        minWidth: '130px',
        textAlign: 'center',
      },
    },
    {
      id: '4',
      position: { x: 500, y: 200 },
      data: { label: '🏢 企業級架構' },
      style: {
        background: 'linear-gradient(to right, #3B82F6, #1D4ED8)',
        color: 'white',
        border: '2px solid #3B82F6',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '14px',
        fontWeight: '600',
        minWidth: '130px',
        textAlign: 'center',
      },
    },
    {
      id: '5',
      position: { x: 700, y: 200 },
      data: { label: '📋 標準化開發' },
      style: {
        background: 'linear-gradient(to right, #3B82F6, #1D4ED8)',
        color: 'white',
        border: '2px solid #3B82F6',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '14px',
        fontWeight: '600',
        minWidth: '130px',
        textAlign: 'center',
      },
    },

    // AI工具选择节点
    {
      id: '6',
      position: { x: 50, y: 350 },
      data: { label: '🥇 ChatGPT + Claude' },
      style: {
        background: 'linear-gradient(to right, #06B6D4, #0891B2)',
        color: 'white',
        border: '2px solid #06B6D4',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '12px',
        fontWeight: '600',
        minWidth: '150px',
        textAlign: 'center',
      },
    },
    {
      id: '7',
      position: { x: 250, y: 350 },
      data: { label: '🚀 Claude + DeepSeek' },
      style: {
        background: 'linear-gradient(to right, #8B5CF6, #7C3AED)',
        color: 'white',
        border: '2px solid #8B5CF6',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '12px',
        fontWeight: '600',
        minWidth: '150px',
        textAlign: 'center',
      },
    },
    {
      id: '8',
      position: { x: 450, y: 350 },
      data: { label: '🛡️ Gemini + Claude' },
      style: {
        background: 'linear-gradient(to right, #F59E0B, #D97706)',
        color: 'white',
        border: '2px solid #F59E0B',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '12px',
        fontWeight: '600',
        minWidth: '150px',
        textAlign: 'center',
      },
    },
    {
      id: '9',
      position: { x: 650, y: 350 },
      data: { label: '⚙️ Claude + 其他輔助' },
      style: {
        background: 'linear-gradient(to right, #10B981, #059669)',
        color: 'white',
        border: '2px solid #10B981',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '12px',
        fontWeight: '600',
        minWidth: '150px',
        textAlign: 'center',
      },
    },
  ];

  // 简化的边定义
  const edges: Edge[] = [
    // 从根节点到场景
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    { id: 'e1-4', source: '1', target: '4', animated: true },
    { id: 'e1-5', source: '1', target: '5', animated: true },
    
    // 从场景到AI工具
    { id: 'e2-6', source: '2', target: '6' },
    { id: 'e3-7', source: '3', target: '7' },
    { id: 'e4-8', source: '4', target: '8' },
    { id: 'e5-9', source: '5', target: '9' },
  ];

  return (
    <div className="w-full my-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            🎯 AI選擇決策樹：場景驅動的選擇框架
          </h3>
          <p className="text-sm text-gray-600 text-center mt-1">
            根據技術問題類型，選擇最適合的AI工具組合
          </p>
        </div>
        
        <div className="w-full h-[500px] relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            attributionPosition="bottom-left"
            defaultEdgeOptions={{
              style: { 
                strokeWidth: 3,
                stroke: '#8B5CF6'
              },
            }}
            style={{ 
              background: '#f8fafc',
            }}
          >
            <Background 
              color="#e2e8f0" 
              gap={16} 
              size={1}
              variant={BackgroundVariant.Dots}
            />
            <Controls 
              position="top-right"
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <MiniMap 
              nodeColor={() => '#8B5CF6'}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
          </ReactFlow>
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">💡 使用說明：</h4>
              <ul className="space-y-1">
                <li>• 從技術問題開始，選擇對應場景</li>
                <li>• 動畫線條表示主要推薦路徑</li>
                <li>• 實線箭頭表示具體實施策略</li>
                <li>• 使用右上角控制器可縮放和移動</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">🎨 說明：</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span>問題起點</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>使用場景</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
                  <span>學習首選</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>標準開發</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDecisionTree;