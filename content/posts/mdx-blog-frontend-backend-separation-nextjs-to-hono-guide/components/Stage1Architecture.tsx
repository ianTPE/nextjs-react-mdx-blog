// 檔名：Stage1DirectoryTree.tsx
"use client";

import React from 'react';
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

// 自訂 Node 的 data 接口
interface CustomNodeData {
  // 這兩行是你真正需要的屬性
  label: React.ReactNode;
  style?: React.CSSProperties;

  // 增加這一行，讓它符合 Record<string, unknown>
  [key: string]: unknown;
}


// 自訂一個簡單的 node types：只把 data.style 套用到外層 div，並把 label 擺中間
const nodeTypes = {
  default: ({ data }: { data: CustomNodeData }) => (
    <div 
      style={data.style} 
      className="flex items-center justify-center text-center p-1"
    >
      {data.label}
    </div>
  )
};

//
// 下面把整棵「Next.js 應用程式」目錄，拆成一棵樹的 Nodes 與 Edges：
//

const initialNodes: Node<CustomNodeData>[] = [
  // 根節點：Next.js 應用程式
  {
    id: 'root',
    type: 'default',
    position: { x: 200, y: 20 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold text-lg">Next.js 應用程式</div>
        </div>
      ),
      style: {
        background: '#3B82F6',
        color: 'white',
        border: '2px solid #1E40AF',
        borderRadius: '8px',
        padding: '4px',
        width: 200,
        height: 40,
      }
    }
  },

  // ----------------------------------------
  //  第一層：app/  (x:100, y:120)  和 content/ (x:300, y:120)
  // ----------------------------------------
  {
    id: 'app-folder',
    type: 'default',
    position: { x: 100, y: 120 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-semibold">app/</div>
        </div>
      ),
      style: {
        background: '#EFF6FF',
        color: '#1E3A8A',
        border: '1px solid #3B82F6',
        borderRadius: '6px',
        padding: '4px',
        width: 100,
        height: 30,
      }
    }
  },
  {
    id: 'content-folder',
    type: 'default',
    position: { x: 300, y: 120 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-semibold">content/</div>
        </div>
      ),
      style: {
        background: '#F0FDF4',
        color: '#166534',
        border: '1px solid #22C55E',
        borderRadius: '6px',
        padding: '4px',
        width: 100,
        height: 30,
      }
    }
  },

  // ----------------------------------------
  //  第二層 (app/ 底下)：blog/  (x:50, y:220)    components/ (x:150, y:220)
  // ----------------------------------------
  {
    id: 'blog-folder',
    type: 'default',
    position: { x: 50, y: 220 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-semibold">blog/</div>
        </div>
      ),
      style: {
        background: '#EFF6FF',
        color: '#1E3A8A',
        border: '1px solid #3B82F6',
        borderRadius: '6px',
        padding: '4px',
        width: 80,
        height: 30,
      }
    }
  },
  {
    id: 'components-folder',
    type: 'default',
    position: { x: 150, y: 220 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-semibold">components/</div>
        </div>
      ),
      style: {
        background: '#EFF6FF',
        color: '#1E3A8A',
        border: '1px solid #3B82F6',
        borderRadius: '6px',
        padding: '4px',
        width: 100,
        height: 30,
      }
    }
  },

  // ----------------------------------------
  //  第二層 (content/ 底下)：posts/  (x:300, y:220)
  // ----------------------------------------
  {
    id: 'posts-folder',
    type: 'default',
    position: { x: 300, y: 220 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-semibold">posts/</div>
        </div>
      ),
      style: {
        background: '#F0FDF4',
        color: '#166534',
        border: '1px solid #22C55E',
        borderRadius: '6px',
        padding: '4px',
        width: 80,
        height: 30,
      }
    }
  },

  // ----------------------------------------
  //  第三層 (blog/ 底下)：[slug]/ (x:50, y:320)   page.tsx (x:50, y:360)
  // ----------------------------------------
  {
    id: 'slug-folder',
    type: 'default',
    position: { x: 50, y: 320 },
    data: {
      label: (
        <div className="text-center">
          <div className="italic">[slug]/</div>
        </div>
      ),
      style: {
        background: '#EFF6FF',
        color: '#1E3A8A',
        border: '1px solid #3B82F6',
        borderRadius: '6px',
        padding: '4px',
        width: 80,
        height: 30,
      }
    }
  },
  {
    id: 'blog-page',
    type: 'default',
    position: { x: 50, y: 380 },
    data: {
      label: (
        <div className="text-center text-xs">
          <div>page.tsx</div>
        </div>
      ),
      style: {
        background: '#FFFFFF',
        color: '#374151',
        border: '1px solid #6B7280',
        borderRadius: '4px',
        padding: '2px',
        width: 70,
        height: 24,
      }
    }
  },

  // ----------------------------------------
  //  第三層 (components/ 底下)：MDXRenderer.tsx (x:150, y:300)
  // ----------------------------------------
  {
    id: 'mdx-renderer',
    type: 'default',
    position: { x: 150, y: 300 },
    data: {
      label: (
        <div className="text-center text-xs">
          <div>MDXRenderer.tsx</div>
        </div>
      ),
      style: {
        background: '#FFFFFF',
        color: '#374151',
        border: '1px solid #6B7280',
        borderRadius: '4px',
        padding: '2px',
        width: 100,
        height: 24,
      }
    }
  },

  // ----------------------------------------
  //  第三層 (posts/ 底下)：post-1/ (x:260, y:300)    post-2/ (x:340, y:300)
  // ----------------------------------------
  {
    id: 'post1-folder',
    type: 'default',
    position: { x: 260, y: 300 },
    data: {
      label: (
        <div className="text-center">
          <div className="italic">post-1/</div>
        </div>
      ),
      style: {
        background: '#F0FDF4',
        color: '#166534',
        border: '1px solid #22C55E',
        borderRadius: '6px',
        padding: '4px',
        width: 80,
        height: 30,
      }
    }
  },
  {
    id: 'post2-folder',
    type: 'default',
    position: { x: 340, y: 300 },
    data: {
      label: (
        <div className="text-center">
          <div className="italic">post-2/</div>
        </div>
      ),
      style: {
        background: '#F0FDF4',
        color: '#166534',
        border: '1px solid #22C55E',
        borderRadius: '6px',
        padding: '4px',
        width: 80,
        height: 30,
      }
    }
  },

  // ----------------------------------------
  //  第四層：post-1/content.mdx (x:260, y:360)   post-2/content.mdx (x:340, y:360)
  // ----------------------------------------
  {
    id: 'post1-content',
    type: 'default',
    position: { x: 260, y: 360 },
    data: {
      label: (
        <div className="text-center text-xs">
          <div>content.mdx</div>
        </div>
      ),
      style: {
        background: '#FFFFFF',
        color: '#374151',
        border: '1px solid #6B7280',
        borderRadius: '4px',
        padding: '2px',
        width: 80,
        height: 24,
      }
    }
  },
  {
    id: 'post2-content',
    type: 'default',
    position: { x: 340, y: 360 },
    data: {
      label: (
        <div className="text-center text-xs">
          <div>content.mdx</div>
        </div>
      ),
      style: {
        background: '#FFFFFF',
        color: '#374151',
        border: '1px solid #6B7280',
        borderRadius: '4px',
        padding: '2px',
        width: 80,
        height: 24,
      }
    }
  },
];

const initialEdges: Edge[] = [
  // 根 -> 第一層
  { id: 'e-root-app', source: 'root', target: 'app-folder', style: { stroke: '#3B82F6', strokeWidth: 2 } },
  { id: 'e-root-content', source: 'root', target: 'content-folder', style: { stroke: '#22C55E', strokeWidth: 2 } },

  // app-folder -> 第二層 (blog & components)
  { id: 'e-app-blog', source: 'app-folder', target: 'blog-folder', style: { stroke: '#3B82F6', strokeWidth: 1 } },
  { id: 'e-app-components', source: 'app-folder', target: 'components-folder', style: { stroke: '#3B82F6', strokeWidth: 1 } },

  // blog-folder -> [slug]
  { id: 'e-blog-slug', source: 'blog-folder', target: 'slug-folder', style: { stroke: '#3B82F6', strokeWidth: 1 } },
  // slug-folder -> page.tsx
  { id: 'e-slug-page', source: 'slug-folder', target: 'blog-page', style: { stroke: '#6B7280', strokeWidth: 1 } },

  // components-folder -> MDXRenderer.tsx
  { id: 'e-components-mdx', source: 'components-folder', target: 'mdx-renderer', style: { stroke: '#6B7280', strokeWidth: 1 } },

  // content-folder -> posts/
  { id: 'e-content-posts', source: 'content-folder', target: 'posts-folder', style: { stroke: '#22C55E', strokeWidth: 1 } },

  // posts-folder -> post-1/  &  post-2/
  { id: 'e-posts-post1', source: 'posts-folder', target: 'post1-folder', style: { stroke: '#22C55E', strokeWidth: 1 } },
  { id: 'e-posts-post2', source: 'posts-folder', target: 'post2-folder', style: { stroke: '#22C55E', strokeWidth: 1 } },

  // post-1/ -> post-1/content.mdx
  { id: 'e-post1-content', source: 'post1-folder', target: 'post1-content', style: { stroke: '#6B7280', strokeWidth: 1 } },
  // post-2/ -> post-2/content.mdx
  { id: 'e-post2-content', source: 'post2-folder', target: 'post2-content', style: { stroke: '#6B7280', strokeWidth: 1 } },
];

const Stage1DirectoryTree = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const proOptions = { hideAttribution: true };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">目錄結構 (Stage 1)</h3>
        <p className="text-sm text-gray-600 mt-1">Next.js 單體應用程式的資料夾與檔案細節</p>
      </div>

      <div style={{ width: '100%', height: '550px' }} className="rounded-lg border border-gray-200">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <Panel position="top-right">
            <div className="bg-white p-2 rounded shadow text-xs text-gray-600">
              目錄樹狀圖
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Stage1DirectoryTree;
