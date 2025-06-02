"use client";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 自定義節點組件
const StartNode = ({ data }: { data: any }) => (
  <div className="px-6 py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg text-center min-w-[200px]">
    <div className="text-lg">🚀 {data.label}</div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const DecisionNode = ({ data }: { data: any }) => (
  <div className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold shadow-lg text-center min-w-[180px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div>{data.label}</div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const FrameworkNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md text-center min-w-[100px]">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div>{data.label}</div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const RecommendationNode = ({ data }: { data: any }) => {
  const bgColor = data.level === 'best' ? 'bg-green-500' : 
                  data.level === 'good' ? 'bg-blue-500' : 
                  data.level === 'vue' ? 'bg-purple-500' : 'bg-gray-500';
  
  return (
    <div className={`px-4 py-3 ${bgColor} text-white rounded-lg shadow-md text-center min-w-[160px] relative`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="font-bold text-sm">{data.framework}</div>
      <div className="text-xs mt-1 opacity-90">{data.description}</div>
      {data.badge && (
        <div className="text-xs mt-1 bg-black bg-opacity-20 rounded px-2 py-1 inline-block">
          {data.badge}
        </div>
      )}
      {data.isRecommended && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
          {data.recommendLevel}
        </div>
      )}
    </div>
  );
};

// 節點類型定義
const nodeTypes = {
  start: StartNode,
  decision: DecisionNode,
  framework: FrameworkNode,
  recommendation: RecommendationNode,
};

// 初始節點
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'start',
    position: { x: 400, y: 50 },
    data: { label: '你是 Vibe Coding 開發者' },
  },
  {
    id: '2',
    type: 'decision',
    position: { x: 380, y: 180 },
    data: { label: '偏好 React 還是 Vue？' },
  },
  {
    id: '3',
    type: 'framework',
    position: { x: 200, y: 320 },
    data: { label: '⚛️ React' },
  },
  {
    id: '4',
    type: 'framework',
    position: { x: 600, y: 320 },
    data: { label: '🟢 Vue' },
  },
  {
    id: '5',
    type: 'decision',
    position: { x: 180, y: 450 },
    data: { label: '你的主要需求？' },
  },
  {
    id: '6',
    type: 'recommendation',
    position: { x: 50, y: 580 },
    data: { 
      framework: '⭐ Next.js',
      description: '最完整生態系統',
      badge: '我的選擇',
      level: 'best',
      isRecommended: true,
      recommendLevel: '最推薦'
    },
  },
  {
    id: '7',
    type: 'recommendation',
    position: { x: 220, y: 580 },
    data: { 
      framework: '🔵 Remix',
      description: '簡潔資料流',
      badge: '強烈推薦',
      level: 'good'
    },
  },
  {
    id: '8',
    type: 'recommendation',
    position: { x: 390, y: 580 },
    data: { 
      framework: '⭐ Next.js',
      description: '最大彈性',
      badge: '繼續使用',
      level: 'best'
    },
  },
  {
    id: '9',
    type: 'recommendation',
    position: { x: 600, y: 450 },
    data: { 
      framework: '🟢 Nuxt.js',
      description: 'Vue 生態最佳選擇',
      badge: '推薦',
      level: 'vue',
      isRecommended: true,
      recommendLevel: 'Vue 首選'
    },
  },
];

// 初始邊線
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#374151', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    label: 'React',
    labelStyle: { fontSize: 12, fontWeight: 'bold' },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    style: { stroke: '#3B82F6', strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    label: 'Vue',
    labelStyle: { fontSize: 12, fontWeight: 'bold' },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    style: { stroke: '#10B981', strokeWidth: 2 },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    style: { stroke: '#374151', strokeWidth: 2 },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    label: '最完整生態',
    labelStyle: { fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
    style: { stroke: '#10B981', strokeWidth: 2 },
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    label: '簡潔資料流',
    labelStyle: { fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
    style: { stroke: '#3B82F6', strokeWidth: 2 },
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    label: '最大彈性',
    labelStyle: { fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
    style: { stroke: '#10B981', strokeWidth: 2 },
  },
  {
    id: 'e4-9',
    source: '4',
    target: '9',
    animated: true,
    style: { stroke: '#8B5CF6', strokeWidth: 2 },
  },
];

export default function ReactFlowDecisionTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="my-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🎯 Vibe Coding 框架選擇決策樹 (React Flow)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            互動式流程圖 - 可以拖拽、縮放、查看細節
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
            attributionPosition="bottom-left"
          >
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.type) {
                  case 'start': return '#EF4444';
                  case 'decision': return '#F59E0B';
                  case 'framework': return '#3B82F6';
                  case 'recommendation': return '#10B981';
                  default: return '#6B7280';
                }
              }}
              className="!bg-gray-50 dark:!bg-gray-800"
            />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>

      {/* 圖例說明 */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            🎮 互動功能
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• 滾輪縮放圖表</li>
            <li>• 拖拽移動節點</li>
            <li>• 右下角小地圖導航</li>
            <li>• 左下角控制按鈕</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            📊 推薦等級
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">最推薦 - Next.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">強烈推薦 - Remix</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Vue 首選 - Nuxt.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}