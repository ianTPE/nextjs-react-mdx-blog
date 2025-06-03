"use client";

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define custom node types
interface CustomNodeData {
  label: React.ReactNode;
  style?: React.CSSProperties;
}

const nodeTypes = {
  default: (props: NodeProps<CustomNodeData>) => {
    return (
      <div 
        style={props.data.style} 
        className="flex items-center justify-center p-2 text-center"
      >
        {props.data.label}
      </div>
    );
  }
};

const nodes: Node[] = [
  {
    id: 'nextjs-app',
    type: 'default',
    position: { x: 200, y: 50 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">Next.js 應用程式</div>
          <div className="text-sm text-gray-600 mt-1">單體架構</div>
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
    position: { x: 50, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">前端部分</div>
          <div className="text-xs mt-1">
            • app/blog/[slug]/page.tsx<br/>
            • components/MDXRenderer.tsx
          </div>
        </div>
      )
    },
    style: {
      background: '#EFF6FF',
      border: '1px solid #3B82F6',
      borderRadius: '6px',
      width: 180,
      height: 80,
    }
  },
  {
    id: 'content',
    position: { x: 300, y: 180 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">內容存儲</div>
          <div className="text-xs mt-1">
            • content/posts/<br/>
            • *.mdx 文件
          </div>
        </div>
      )
    },
    style: {
      background: '#F0FDF4',
      border: '1px solid #22C55E',
      borderRadius: '6px',
      width: 180,
      height: 80,
    }
  },
  {
    id: 'deployment',
    position: { x: 200, y: 320 },
    data: { 
      label: (
        <div className="text-center">
          <div className="font-semibold">部署方式</div>
          <div className="text-xs mt-1">
            Vercel / Netlify<br/>
            靜態生成 (SSG)
          </div>
        </div>
      )
    },
    style: {
      background: '#FEF3C7',
      border: '1px solid #F59E0B',
      borderRadius: '6px',
      width: 180,
      height: 60,
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
    id: 'app-content',
    source: 'nextjs-app',
    target: 'content',
    style: { stroke: '#3B82F6', strokeWidth: 2 }
  },
  {
    id: 'frontend-deployment',
    source: 'frontend',
    target: 'deployment',
    style: { stroke: '#6B7280', strokeWidth: 1 }
  },
  {
    id: 'content-deployment',
    source: 'content',
    target: 'deployment',
    style: { stroke: '#6B7280', strokeWidth: 1 }
  }
];

const defaultViewport = { x: 0, y: 0, zoom: 0.8 };

const proOptions = {
  hideAttribution: true,
};

const Stage1Architecture = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 1：Next.js 單體應用</h3>
        <p className="text-sm text-gray-600 mt-1">適合：少於 1,000 篇文章</p>
      </div>
      <div style={{ width: '100%', height: '500px' }} className="rounded-lg border border-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultViewport={defaultViewport}
          proOptions={proOptions}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Stage1Architecture;