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
  {
    id: 'stage1',
    type: 'input',
    position: { x: 50, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">階段 1</div>
          <div className="text-sm mt-1">Next.js 單體應用</div>
          <div className="text-xs text-white mt-2">
            • 文件系統驅動<br/>
            • 構建時生成靜態頁面<br/>
            • 適合：少於 1,000 篇文章
          </div>
        </div>
      )
    },
    style: {
      background: '#3B82F6',
      color: 'white',
      border: '2px solid #1E40AF',
      borderRadius: '12px',
      width: 200,
      height: 130,
    }
  },
  {
    id: 'trigger1',
    position: { x: 125, y: 200 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-semibold text-orange-600">升級觸發點：</div>
          <div>• 構建時間過長<br/>• 文章數量增長</div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '8px',
      width: 150,
      height: 65,
    }
  },
  {
    id: 'stage2',
    position: { x: 300, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">階段 2</div>
          <div className="text-sm mt-1">Next.js + API Routes</div>
          <div className="text-xs text-white mt-2">
            • 數據庫驅動<br/>
            • API Routes 處理邏輯<br/>
            • 適合：1,000-10,000 篇
          </div>
        </div>
      )
    },
    style: {
      background: '#A855F7',
      color: 'white',
      border: '2px solid #7C3AED',
      borderRadius: '12px',
      width: 200,
      height: 130,
    }
  },
  {
    id: 'trigger2',
    position: { x: 375, y: 200 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-semibold text-orange-600">升級觸發點：</div>
          <div>• 需要真正分離<br/>• 多客戶端支援</div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '8px',
      width: 150,
      height: 65,
    }
  },
  {
    id: 'stage3',
    position: { x: 550, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">階段 3</div>
          <div className="text-sm mt-1">真正前後端分離</div>
          <div className="text-xs text-white mt-2">
            • Hono 獨立部署<br/>
            • 真正的前後端分離<br/>
            • 適合：10,000+ 篇文章
          </div>
        </div>
      )
    },
    style: {
      background: '#DC2626',
      color: 'white',
      border: '2px solid #B91C1C',
      borderRadius: '12px',
      width: 200,
      height: 130,
    }
  },
  {
    id: 'benefits1',
    position: { x: 50, y: 320 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-semibold text-green-600">優勢：</div>
          <div>• 簡單快速<br/>• 部署簡單<br/>• SEO 友好</div>
        </div>
      )
    },
    style: {
      background: '#F0FDF4',
      border: '1px solid #22C55E',
      borderRadius: '8px',
      width: 200,
      height: 80,
    }
  },
  {
    id: 'benefits2',
    position: { x: 300, y: 320 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-semibold text-green-600">優勢：</div>
          <div>• 性能提升<br/>• 動態更新<br/>• 具備 API</div>
        </div>
      )
    },
    style: {
      background: '#F0FDF4',
      border: '1px solid #22C55E',
      borderRadius: '8px',
      width: 200,
      height: 80,
    }
  },
  {
    id: 'benefits3',
    position: { x: 550, y: 320 },
    data: { 
      label: (
        <div className="text-center text-xs">
          <div className="font-semibold text-green-600">優勢：</div>
          <div>• 極致性能<br/>• 無限擴展<br/>• 技術靈活</div>
        </div>
      )
    },
    style: {
      background: '#F0FDF4',
      border: '1px solid #22C55E',
      borderRadius: '8px',
      width: 200,
      height: 80,
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'stage1-trigger1',
    source: 'stage1',
    target: 'trigger1',
    style: { stroke: '#F59E0B', strokeWidth: 2 }
  },
  {
    id: 'trigger1-stage2',
    source: 'trigger1',
    target: 'stage2',
    style: { stroke: '#A855F7', strokeWidth: 3 },
    animated: true
  },
  {
    id: 'stage2-trigger2',
    source: 'stage2',
    target: 'trigger2',
    style: { stroke: '#F59E0B', strokeWidth: 2 }
  },
  {
    id: 'trigger2-stage3',
    source: 'trigger2',
    target: 'stage3',
    style: { stroke: '#DC2626', strokeWidth: 3 },
    animated: true
  },
  {
    id: 'stage1-benefits1',
    source: 'stage1',
    target: 'benefits1',
    style: { stroke: '#22C55E', strokeWidth: 1 }
  },
  {
    id: 'stage2-benefits2',
    source: 'stage2',
    target: 'benefits2',
    style: { stroke: '#22C55E', strokeWidth: 1 }
  },
  {
    id: 'stage3-benefits3',
    source: 'stage3',
    target: 'benefits3',
    style: { stroke: '#22C55E', strokeWidth: 1 }
  }
];

export default function EvolutionOverview() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">MDX 部落格架構演進路線圖</h3>
        <p className="text-sm text-gray-600 mt-1">三階段漸進式升級策略</p>
      </div>
      <div className="w-full h-[600px] rounded-lg border border-gray-200">
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
              演進架構圖
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}