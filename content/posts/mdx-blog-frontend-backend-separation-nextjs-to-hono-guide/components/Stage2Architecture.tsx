"use client";

import React, { useState } from 'react';

// 图标组件
const FolderIcon = () => <span className="mr-2">📁</span>;
const FileIcon = ({ type }: { type: 'tsx' | 'sql' | 'api' | 'other' }) => {
  const icons = { tsx: '⚛️', sql: '🗄️', api: '🔗', other: '📄' };
  return <span className="mr-2">{icons[type]}</span>;
};

const ChevronDown = () => (
  <svg className="w-4 h-4 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-4 h-4 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// 树节点接口
interface TreeNode {
  key: string;
  title: React.ReactNode;
  children?: TreeNode[];
  isLeaf?: boolean;
  selectable?: boolean;
  disabled?: boolean;
}

// 递归树组件
interface TreeItemProps {
  node: TreeNode;
  level: number;
  defaultExpanded?: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, level, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;
  
  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const paddingLeft = level * 20; // 每层缩进 20px

  return (
    <div className="select-none">
      {/* 当前节点 */}
      <div 
        className={`flex items-center py-1 ${hasChildren ? 'cursor-pointer' : ''} hover:bg-gray-50`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={toggleExpanded}
      >
        {/* 展开/收合图标 */}
        <div className="w-4 h-4 flex items-center justify-center mr-1">
          {hasChildren ? (
            isExpanded ? <ChevronDown /> : <ChevronRight />
          ) : null}
        </div>
        
        {/* 节点内容 */}
        <div className="flex-1 text-sm leading-relaxed">
          {node.title}
        </div>
      </div>
      
      {/* 子节点 */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem 
              key={child.key} 
              node={child} 
              level={level + 1}
              defaultExpanded={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 主树组件
interface TreeProps {
  data: TreeNode[];
  defaultExpandAll?: boolean;
}

const Tree: React.FC<TreeProps> = ({ data, defaultExpandAll = false }) => {
  return (
    <div className="text-gray-700">
      {data.map((node) => (
        <TreeItem 
          key={node.key} 
          node={node} 
          level={0}
          defaultExpanded={defaultExpandAll}
        />
      ))}
    </div>
  );
};

// 树状结构数据
const treeData: TreeNode[] = [
  {
    key: 'nextjs-app',
    title: <div className="font-medium text-gray-800">🏗️ Next.js 應用程式 (前後端混合)</div>,
    children: [
      {
        key: 'frontend-section',
        title: <div className="font-medium text-purple-700">🎨 前端部分</div>,
        children: [
          {
            key: 'blog-pages',
            title: <div><FolderIcon />app/blog/ - 部落格頁面</div>,
            children: [
              { 
                key: 'blog-list', 
                title: <div><FileIcon type="tsx" />page.tsx - 文章列表</div>,
                isLeaf: true
              },
              {
                key: 'blog-detail-folder',
                title: <div><FolderIcon />[slug]/ - 動態路由</div>,
                children: [
                  { 
                    key: 'blog-detail', 
                    title: <div><FileIcon type="tsx" />page.tsx - 文章詳情</div>,
                    isLeaf: true
                  }
                ]
              }
            ]
          },
          {
            key: 'components',
            title: <div><FolderIcon />components/ - 共用組件</div>,
            children: [
              { 
                key: 'mdx-renderer', 
                title: <div><FileIcon type="tsx" />MDXRenderer.tsx</div>,
                isLeaf: true
              }
            ]
          }
        ]
      },
      {
        key: 'api-section',
        title: <div className="font-medium text-blue-700">🔗 API Routes 部分</div>,
        children: [
          {
            key: 'api-folder',
            title: <div><FolderIcon />app/api/ - API 路由</div>,
            children: [
              {
                key: 'articles-folder',
                title: <div><FolderIcon />articles/ - 文章 API</div>,
                children: [
                  { 
                    key: 'articles-list-api', 
                    title: <div><FileIcon type="api" />route.ts - GET /api/articles</div>,
                    isLeaf: true
                  },
                  {
                    key: 'articles-detail-folder',
                    title: <div><FolderIcon />[slug]/ - 動態 API</div>,
                    children: [
                      { 
                        key: 'articles-detail-api', 
                        title: <div><FileIcon type="api" />route.ts - GET /api/articles/[slug]</div>,
                        isLeaf: true
                      }
                    ]
                  }
                ]
              },
              {
                key: 'revalidate-folder',
                title: <div><FolderIcon />revalidate/ - ISR</div>,
                children: [
                  { 
                    key: 'revalidate-api', 
                    title: <div><FileIcon type="api" />route.ts - POST /api/revalidate</div>,
                    isLeaf: true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'api-connection',
    title: (
      <div className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-full border-t border-gray-300 border-dashed"></div>
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
            <span className="text-lg">↓</span>
            <span className="font-semibold text-sm">API 調用</span>
            <span className="text-lg">↓</span>
          </div>
          <div className="w-full border-t border-gray-300 border-dashed"></div>
        </div>
      </div>
    ),
    selectable: false,
    disabled: true,
    isLeaf: true
  },
  {
    key: 'database',
    title: <div className="font-medium text-green-700">🗄️ 數據庫層 (PostgreSQL)</div>,
    children: [
      {
        key: 'articles-table',
        title: <div><FileIcon type="sql" />articles 表</div>,
        children: [
          { 
            key: 'article-fields', 
            title: (
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded border">
                <div className="mb-1"><strong>主要字段：</strong></div>
                <div>• id (主鍵) - 文章唯一標識</div>
                <div>• slug (唯一) - URL 友好標識</div>
                <div>• title - 文章標題</div>
                <div>• content (MDX) - 文章內容</div>
                <div>• metadata (JSON) - 元數據</div>
                <div>• created_at, updated_at - 時間戳</div>
              </div>
            ),
            isLeaf: true 
          }
        ]
      },
      {
        key: 'tags-table',
        title: <div><FileIcon type="sql" />tags 表 (可選)</div>,
        children: [
          { 
            key: 'tag-fields', 
            title: (
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded border">
                <div className="mb-1"><strong>字段結構：</strong></div>
                <div>• id (主鍵) - 標籤唯一標識</div>
                <div>• name - 標籤名稱</div>
                <div>• slug (唯一) - URL 友好標識</div>
                <div>• article_count - 文章數量</div>
              </div>
            ),
            isLeaf: true 
          }
        ]
      }
    ]
  }
];

export default function Stage2Architecture() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 2：Next.js + API Routes（偽前後端分離）</h3>
        <p className="text-sm text-gray-600 mt-1">
          數據庫驅動，API Routes 處理邏輯
          <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            適合 1,000 - 10,000 篇文章
          </span>
        </p>
      </div>
      
      <div className="p-6">
        {/* 特點說明 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="font-semibold text-purple-800 mb-1">⚡ 性能提升</div>
            <div className="text-purple-700 text-xs">構建時間不受文章數量影響</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-800 mb-1">🔄 動態更新</div>
            <div className="text-blue-700 text-xs">API + ISR 實現即時內容更新</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="font-semibold text-green-800 mb-1">📦 保持簡單</div>
            <div className="text-green-700 text-xs">仍是單一服務部署</div>
          </div>
        </div>

        {/* 架構樹狀圖 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="mb-4">
            <span className="font-semibold text-gray-700">🏗️ 架構組成</span>
            <span className="ml-2 text-xs text-gray-500">點擊可展開詳細結構</span>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <Tree data={treeData} defaultExpandAll={true} />
          </div>
        </div>

        {/* 數據流向 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-semibold text-blue-800 mb-2">🔄 數據流向</div>
          <div className="text-sm text-blue-700 space-y-1">
            <div>1. 用戶請求 → /blog/[slug]</div>
            <div>2. 頁面呼叫 → /api/articles/[slug]</div>
            <div>3. API 查詢 → 數據庫獲取 MDX</div>
            <div>4. 內容渲染 → MDXRenderer</div>
          </div>
        </div>

        {/* 優勢與限制 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-semibold text-green-800 mb-2">✅ 主要優勢</div>
            <div className="text-sm text-green-700 space-y-1">
              <div>• 性能大幅提升</div>
              <div>• 支援動態更新</div>
              <div>• 具備真正 API</div>
              <div>• 部署簡單</div>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="font-semibold text-amber-800 mb-2">⚠️ 現有限制</div>
            <div className="text-sm text-amber-700 space-y-1">
              <div>• 前後端耦合</div>
              <div>• API Routes 性能有限</div>
              <div>• 無法獨立部署</div>
              <div>• 團隊協作受限</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
