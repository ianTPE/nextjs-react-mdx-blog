"use client";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 自定义节点样式
const nodeTypes = {
  // 根节点样式
  rootNode: ({ data }: { data: any }) => (
    <div className="px-6 py-4 shadow-lg rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-300">
      <div className="font-bold text-lg text-center">{data.label}</div>
    </div>
  ),
  // 场景节点样式
  scenarioNode: ({ data }: { data: any }) => (
    <div className="px-4 py-3 shadow-md rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white border-2 border-blue-300 min-w-[200px]">
      <div className="font-semibold text-sm text-center">{data.label}</div>
    </div>
  ),
  // AI工具节点样式
  aiNode: ({ data }: { data: any }) => (
    <div className={`px-4 py-3 shadow-md rounded-lg border-2 min-w-[180px] ${data.style}`}>
      <div className="font-medium text-sm text-center">{data.label}</div>
      {data.description && (
        <div className="text-xs mt-1 text-center opacity-90">{data.description}</div>
      )}
    </div>
  ),
  // 详细说明节点样式
  detailNode: ({ data }: { data: any }) => (
    <div className="px-3 py-2 shadow-sm rounded-md bg-gray-50 border border-gray-300 max-w-[200px]">
      <div className="text-xs text-gray-700 text-center">{data.label}</div>
    </div>
  ),
};

const AIDecisionTree: React.FC = () => {
  // 定义节点
  const initialNodes: Node[] = [
    // 根节点
    {
      id: '1',
      type: 'rootNode',
      position: { x: 400, y: 50 },
      data: { label: '🤔 技術問題' },
      sourcePosition: Position.Bottom,
    },
    
    // 四个主要场景
    {
      id: '2',
      type: 'scenarioNode',
      position: { x: 100, y: 200 },
      data: { label: '📖 學習新技術' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '3',
      type: 'scenarioNode',
      position: { x: 350, y: 200 },
      data: { label: '⚡ 快速原型' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '4',
      type: 'scenarioNode',
      position: { x: 600, y: 200 },
      data: { label: '🏢 企業級架構' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '5',
      type: 'scenarioNode',
      position: { x: 850, y: 200 },
      data: { label: '📋 標準化開發' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },

    // AI工具选择节点
    // 学习新技术
    {
      id: '6',
      type: 'aiNode',
      position: { x: 50, y: 320 },
      data: { 
        label: '🥇 ChatGPT + Claude',
        style: 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white border-cyan-300'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    
    // 快速原型
    {
      id: '7',
      type: 'aiNode',
      position: { x: 300, y: 320 },
      data: { 
        label: '🚀 Claude + DeepSeek',
        style: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white border-purple-300'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    
    // 企业级架构
    {
      id: '8',
      type: 'aiNode',
      position: { x: 550, y: 320 },
      data: { 
        label: '🛡️ Gemini + Claude',
        style: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white border-amber-300'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    
    // 标准化开发
    {
      id: '9',
      type: 'aiNode',
      position: { x: 800, y: 320 },
      data: { 
        label: '⚙️ Claude + 其他輔助',
        style: 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-300'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },

    // 详细说明节点
    {
      id: '10',
      type: 'detailNode',
      position: { x: 50, y: 440 },
      data: { label: 'ChatGPT 解釋原理\n+ Claude 提供實現' },
      targetPosition: Position.Top,
    },
    {
      id: '11',
      type: 'detailNode',
      position: { x: 300, y: 440 },
      data: { label: 'DeepSeek 基礎框架\n+ Claude 完整實現' },
      targetPosition: Position.Top,
    },
    {
      id: '12',
      type: 'detailNode',
      position: { x: 550, y: 440 },
      data: { label: 'Gemini 安全設計\n+ Claude 核心實現' },
      targetPosition: Position.Top,
    },
    {
      id: '13',
      type: 'detailNode',
      position: { x: 800, y: 440 },
      data: { label: 'Claude 主要實現\n+ 其他平台交叉驗證' },
      targetPosition: Position.Top,
    },
  ];

  // 定义边
  const initialEdges: Edge[] = [
    // 从根节点到四个场景
    { 
      id: 'e1-2', 
      source: '1', 
      target: '2', 
      animated: true,
      style: { stroke: '#8B5CF6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    },
    { 
      id: 'e1-3', 
      source: '1', 
      target: '3', 
      animated: true,
      style: { stroke: '#8B5CF6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    },
    { 
      id: 'e1-4', 
      source: '1', 
      target: '4', 
      animated: true,
      style: { stroke: '#8B5CF6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    },
    { 
      id: 'e1-5', 
      source: '1', 
      target: '5', 
      animated: true,
      style: { stroke: '#8B5CF6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    },

    // 从场景到AI工具选择
    { 
      id: 'e2-6', 
      source: '2', 
      target: '6',
      style: { stroke: '#06B6D4', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#06B6D4' },
    },
    { 
      id: 'e3-7', 
      source: '3', 
      target: '7',
      style: { stroke: '#8B5CF6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    },
    { 
      id: 'e4-8', 
      source: '4', 
      target: '8',
      style: { stroke: '#F59E0B', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' },
    },
    { 
      id: 'e5-9', 
      source: '5', 
      target: '9',
      style: { stroke: '#10B981', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' },
    },

    // 从AI工具到详细说明
    { 
      id: 'e6-10', 
      source: '6', 
      target: '10',
      style: { stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' },
    },
    { 
      id: 'e7-11', 
      source: '7', 
      target: '11',
      style: { stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' },
    },
    { 
      id: 'e8-12', 
      source: '8', 
      target: '12',
      style: { stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' },
    },
    { 
      id: 'e9-13', 
      source: '9', 
      target: '13',
      style: { stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94A3B8' },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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
        
        <div style={{ width: '100%', height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{
              padding: 0.1,
              includeHiddenNodes: false,
            }}
            attributionPosition="bottom-left"
          >
            <Background 
              color="#f1f5f9" 
              gap={20} 
              size={1}
              variant="dots" 
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
              nodeColor={(node) => {
                switch (node.type) {
                  case 'rootNode':
                    return '#8B5CF6';
                  case 'scenarioNode':
                    return '#3B82F6';
                  case 'aiNode':
                    return '#10B981';
                  default:
                    return '#6B7280';
                }
              }}
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
                <li>• 實線箭頭表示主要推薦路徑</li>
                <li>• 虛線箭頭表示具體實施策略</li>
                <li>• 使用右上角控制器可縮放和移動</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">🎨 顏色說明：</h4>
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