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

interface CustomNodeData {
  label: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: 'nextjs-app',
    type: 'default',
    position: { x: 200, y: 30 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">Next.js 應用程式</div>
          <div className="text-sm text-gray-600 mt-1">前後端混合</div>
        </div>
      )
    },
    style: {
      background: '#3B82F6',
      color: 'white',
      border: '2px solid #1E40AF',
      borderRadius: '8px',
      width: 200,
      height: 80,
    }
  },
  {
    id: 'frontend',
    position: { x: 50, y: 150 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">前端部分</div>
          <div className="text-xs mt-1">
            • app/blog/[slug]/page.tsx<br/>
            • components/MDXRenderer.tsx<br/>
            • ISR 緩存策略
          </div>
        </div>
      )
    },
    style: {
      background: '#EFF6FF',
      border: '1px solid #3B82F6',
      borderRadius: '6px',
      width: 180,
      height: 90,
    }
  },
  {
    id: 'api-routes',
    position: { x: 300, y: 150 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">API Routes</div>
          <div className="text-xs mt-1">
            • /api/articles<br/>
            • /api/articles/[slug]<br/>
            • /api/revalidate
          </div>
        </div>
      )
    },
    style: {
      background: '#F3E8FF',
      border: '1px solid #A855F7',
      borderRadius: '6px',
      width: 180,
      height: 90,
    }
  },
  {
    id: 'database',
    position: { x: 300, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">數據庫</div>
          <div className="text-xs mt-1">
            PostgreSQL / PlanetScale<br/>
            • articles 表<br/>
            • MDX 內容存儲
          </div>
        </div>
      )
    },
    style: {
      background: '#F0FDF4',
      border: '1px solid #22C55E',
      borderRadius: '6px',
      width: 180,
      height: 90,
    }
  },
  {
    id: 'deployment',
    position: { x: 50, y: 300 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">部署方式</div>
          <div className="text-xs mt-1">
            Vercel<br/>
            ISR + API Routes
          </div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '6px',
      width: 180,
      height: 70,
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'app-frontend',
    source: 'nextjs-app',
    target: 'frontend',
    style: { stroke: '#3B82F6', strokeWidth: 2 }
  },
  {
    id: 'app-api',
    source: 'nextjs-app',
    target: 'api-routes',
    style: { stroke: '#3B82F6', strokeWidth: 2 }
  },
  {
    id: 'api-db',
    source: 'api-routes',
    target: 'database',
    label: 'SQL 查詢',
    style: { stroke: '#22C55E', strokeWidth: 2 }
  },
  {
    id: 'frontend-api',
    source: 'frontend',
    target: 'api-routes',
    label: 'fetch(/api/articles)',
    style: { stroke: '#A855F7', strokeWidth: 2 }
  },
  {
    id: 'frontend-deployment',
    source: 'frontend',
    target: 'deployment',
    style: { stroke: '#6B7280', strokeWidth: 1 }
  }
];

export default function Stage2Architecture() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 2: 前後端分離架構</h3>
        <p className="text-sm text-gray-600 mt-1">Next.js + Hono 分離式架構</p>
      </div>
      <div className="w-full h-[400px] rounded-lg border border-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          elementsSelectable={false}
        >
          <Background color="#f1f5f9" gap={16} />
          <Controls showInteractive={false} />
          <Panel position="top-right">
            <div className="bg-white p-2 rounded shadow text-xs text-gray-600">
              階段 2 架構圖
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}