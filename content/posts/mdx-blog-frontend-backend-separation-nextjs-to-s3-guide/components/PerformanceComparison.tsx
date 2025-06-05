"use client";

import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  // 指標標題
  {
    id: 'metrics-title',
    position: { x: 50, y: 20 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">性能指標</div>
        </div>
      )
    },
    style: {
      background: '#1F2937',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      width: 120,
      height: 50,
    }
  },
  
  // 階段標題
  {
    id: 'stage1-title',
    position: { x: 200, y: 20 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold">階段 1</div>
          <div className="text-xs">文件系統</div>
        </div>
      )
    },
    style: {
      background: '#3B82F6',
      color: 'white',
      borderRadius: '8px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'stage2-title',
    position: { x: 350, y: 20 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold">階段 2</div>
          <div className="text-xs">API Routes</div>
        </div>
      )
    },
    style: {
      background: '#A855F7',
      color: 'white',
      borderRadius: '8px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'stage3-title',
    position: { x: 500, y: 20 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold">階段 3</div>
          <div className="text-xs">Hono API</div>
        </div>
      )
    },
    style: {
      background: '#DC2626',
      color: 'white',
      borderRadius: '8px',
      width: 120,
      height: 50,
    }
  },

  // 構建時間
  {
    id: 'build-time-label',
    position: { x: 50, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold text-sm">構建時間</div>
          <div className="text-xs text-gray-600">(10K 文章)</div>
        </div>
      )
    },
    style: {
      background: '#F9FAFB',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'build-time-1',
    position: { x: 200, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-red-600">45 分鐘</div>
          <div className="text-xs">😰 很慢</div>
        </div>
      )
    },
    style: {
      background: '#FEE2E2',
      border: '1px solid #F87171',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'build-time-2',
    position: { x: 350, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-yellow-600">3 分鐘</div>
          <div className="text-xs">😊 不錯</div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #FBBF24',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'build-time-3',
    position: { x: 500, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-green-600">2 分鐘</div>
          <div className="text-xs">🚀 很快</div>
        </div>
      )
    },
    style: {
      background: '#D1FAE5',
      border: '1px solid #34D399',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },

  // API 響應時間
  {
    id: 'api-response-label',
    position: { x: 50, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold text-sm">API 響應</div>
          <div className="text-xs text-gray-600">時間</div>
        </div>
      )
    },
    style: {
      background: '#F9FAFB',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'api-response-1',
    position: { x: 200, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-gray-500">N/A</div>
          <div className="text-xs">無 API</div>
        </div>
      )
    },
    style: {
      background: '#F3F4F6',
      border: '1px solid #9CA3AF',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'api-response-2',
    position: { x: 350, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-yellow-600">50-100ms</div>
          <div className="text-xs">😐 普通</div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #FBBF24',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'api-response-3',
    position: { x: 500, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-green-600">5-15ms</div>
          <div className="text-xs">⚡ 極快</div>
        </div>
      )
    },
    style: {
      background: '#D1FAE5',
      border: '1px solid #34D399',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },

  // 可擴展性
  {
    id: 'scalability-label',
    position: { x: 50, y: 260 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold text-sm">可擴展性</div>
        </div>
      )
    },
    style: {
      background: '#F9FAFB',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'scalability-1',
    position: { x: 200, y: 260 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-red-600">差</div>
          <div className="text-xs">❌ 受限</div>
        </div>
      )
    },
    style: {
      background: '#FEE2E2',
      border: '1px solid #F87171',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'scalability-2',
    position: { x: 350, y: 260 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-yellow-600">中等</div>
          <div className="text-xs">⚠️ 有限</div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #FBBF24',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  },
  {
    id: 'scalability-3',
    position: { x: 500, y: 260 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-green-600">優秀</div>
          <div className="text-xs">✅ 無限</div>
        </div>
      )
    },
    style: {
      background: '#D1FAE5',
      border: '1px solid #34D399',
      borderRadius: '6px',
      width: 120,
      height: 50,
    }
  }
];

const initialEdges: Edge[] = [
  // 改進箭頭 - 構建時間
  {
    id: 'build-improve-1',
    source: 'build-time-1',
    target: 'build-time-2',
    label: '15x 改善',
    style: { stroke: '#10B981', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'build-improve-2',
    source: 'build-time-2',
    target: 'build-time-3',
    label: '1.5x 改善',
    style: { stroke: '#10B981', strokeWidth: 2 },
    animated: true
  },
  
  // 改進箭頭 - API 響應
  {
    id: 'api-improve-1',
    source: 'api-response-2',
    target: 'api-response-3',
    label: '5x 改善',
    style: { stroke: '#10B981', strokeWidth: 2 },
    animated: true
  },
  
  // 改進箭頭 - 可擴展性
  {
    id: 'scalability-improve-1',
    source: 'scalability-1',
    target: 'scalability-2',
    style: { stroke: '#10B981', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'scalability-improve-2',
    source: 'scalability-2',
    target: 'scalability-3',
    style: { stroke: '#10B981', strokeWidth: 2 },
    animated: true
  }
];

export default function PerformanceComparison() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">架構演進前後性能比較</h3>
        <p className="text-sm text-gray-600 mt-1">三階段架構優化效果對比</p>
      </div>
      <div className="w-full h-[500px] rounded-lg border border-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          elementsSelectable={false}
        >
          <Background color="#f1f5f9" gap={20} />
          <Controls showInteractive={false} />
          <Panel position="top-right">
            <div className="bg-white p-2 rounded shadow text-xs text-gray-600">
              性能比較圖
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}