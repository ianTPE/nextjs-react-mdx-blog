"use client";

import ReactFlow, { Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes: Node[] = [
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

const edges: Edge[] = [
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
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 2：Next.js + API Routes（偽分離）</h3>
        <p className="text-sm text-gray-600 mt-1">適合：1,000 至 10,000 篇文章</p>
      </div>
      <div style={{ width: '100%', height: 450 }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background color="#f1f5f9" gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}