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
    id: 'nextjs-frontend',
    type: 'input',
    position: { x: 50, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">Next.js 前端</div>
          <div className="text-sm text-gray-600 mt-1">純前端應用</div>
        </div>
      )
    },
    style: {
      background: '#3B82F6',
      color: 'white',
      border: '2px solid #1E40AF',
      borderRadius: '8px',
      width: 160,
      height: 80,
    }
  },
  {
    id: 'hono-api',
    type: 'default',
    position: { x: 350, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">Hono API 服務</div>
          <div className="text-sm text-gray-600 mt-1">獨立後端</div>
        </div>
      )
    },
    style: {
      background: '#DC2626',
      color: 'white',
      border: '2px solid #B91C1C',
      borderRadius: '8px',
      width: 160,
      height: 80,
    }
  },
  {
    id: 'frontend-features',
    position: { x: 50, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">前端功能</div>
          <div className="text-xs mt-1">
            • app/blog/[slug]/<br/>
            • components/<br/>
            • lib/api.ts
          </div>
        </div>
      )
    },
    style: {
      background: '#EFF6FF',
      border: '1px solid #3B82F6',
      borderRadius: '6px',
      width: 160,
      height: 80,
    }
  },
  {
    id: 'api-features',
    position: { x: 350, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">API 功能</div>
          <div className="text-xs mt-1">
            • routes/articles.ts<br/>
            • middleware/auth.ts<br/>
            • middleware/cache.ts
          </div>
        </div>
      )
    },
    style: {
      background: '#FEF2F2',
      border: '1px solid #DC2626',
      borderRadius: '6px',
      width: 160,
      height: 80,
    }
  },
  {
    id: 'vercel-deploy',
    position: { x: 50, y: 320 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">部署：Vercel</div>
          <div className="text-xs mt-1">
            域名：blog.com<br/>
            ISR + SSG
          </div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '6px',
      width: 160,
      height: 70,
    }
  },
  {
    id: 'cf-deploy',
    position: { x: 350, y: 320 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">部署：Cloudflare Workers</div>
          <div className="text-xs mt-1">
            域名：api.blog.com<br/>
            邊緣計算
          </div>
        </div>
      )
    },
    style: {
      background: '#FDF4FF',
      border: '1px solid #C084FC',
      borderRadius: '6px',
      width: 160,
      height: 70,
    }
  },
  {
    id: 'storage-layer',
    position: { x: 200, y: 450 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold">數據存儲層</div>
          <div className="text-xs mt-1">
            • PostgreSQL (主數據庫)<br/>
            • Redis (緩存)<br/>
            • Cloudflare R2 (文件)<br/>
            • Elasticsearch (搜索)
          </div>
        </div>
      )
    },
    style: {
      background: '#F0FDF4',
      border: '2px solid #22C55E',
      borderRadius: '8px',
      width: 200,
      height: 100,
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'frontend-api',
    source: 'nextjs-frontend',
    target: 'hono-api',
    label: 'HTTPS API 調用',
    style: { stroke: '#7C3AED', strokeWidth: 3 },
    animated: true
  },
  {
    id: 'frontend-features',
    source: 'nextjs-frontend',
    target: 'frontend-features',
    style: { stroke: '#3B82F6', strokeWidth: 2 }
  },
  {
    id: 'api-features',
    source: 'hono-api',
    target: 'api-features',
    style: { stroke: '#DC2626', strokeWidth: 2 }
  },
  {
    id: 'frontend-vercel',
    source: 'frontend-features',
    target: 'vercel-deploy',
    style: { stroke: '#F59E0B', strokeWidth: 2 }
  },
  {
    id: 'api-cf',
    source: 'api-features',
    target: 'cf-deploy',
    style: { stroke: '#C084FC', strokeWidth: 2 }
  },
  {
    id: 'api-storage',
    source: 'hono-api',
    target: 'storage-layer',
    label: '數據存取',
    style: { stroke: '#22C55E', strokeWidth: 2 }
  }
];

export default function Stage3Architecture() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 3：完全分離架構（Next.js + Hono）</h3>
        <p className="text-sm text-gray-600 mt-1">適合：10,000 篇文章以上</p>
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
          <Background color="#f1f5f9" gap={16} />
          <Controls showInteractive={false} />
          <Panel position="top-right">
            <div className="bg-white p-2 rounded shadow text-xs text-gray-600">
              階段 3 架構圖
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}