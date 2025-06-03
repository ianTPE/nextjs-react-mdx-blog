"use client";

import React from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

// 图标组件
const FolderIcon = () => <span className="mr-1">📁</span>;
const FileIcon = ({ type }: { type: 'tsx' | 'sql' | 'api' | 'other' }) => {
  const icons = { tsx: '⚛️', sql: '🗄️', api: '🔗', other: '📄' };
  return <span className="mr-1">{icons[type]}</span>;
};

// 前端部分的树状结构数据
const frontendTreeData = [
  {
    key: 'frontend-section',
    title: <div className="font-semibold text-purple-700">🎨 前端部分</div>,
    children: [
      {
        key: 'blog-pages',
        title: <div><FolderIcon />app/blog/</div>,
        children: [
          { 
            key: 'blog-list', 
            title: <div><FileIcon type="tsx" />page.tsx - 文章列表</div> 
          },
          {
            key: 'blog-detail-folder',
            title: <div><FolderIcon />[slug]/</div>,
            children: [
              { 
                key: 'blog-detail', 
                title: <div><FileIcon type="tsx" />page.tsx - 文章詳情</div> 
              }
            ]
          }
        ]
      },
      {
        key: 'components',
        title: <div><FolderIcon />components/</div>,
        children: [
          { 
            key: 'mdx-renderer', 
            title: <div><FileIcon type="tsx" />MDXRenderer.tsx</div> 
          }
        ]
      },
      {
        key: 'content-folder',
        title: <div><FolderIcon />content/ - 本地組件</div>,
        children: [
          {
            key: 'posts-folder',
            title: <div><FolderIcon />posts/</div>,
            children: [
              {
                key: 'example-post',
                title: <div><FolderIcon />example-post/</div>,
                children: [
                  {
                    key: 'local-components',
                    title: <div><FolderIcon />components/ - 文章專用組件</div>,
                    children: [
                      { 
                        key: 'components-index', 
                        title: <div><FileIcon type="tsx" />index.ts - 組件導出</div> 
                      },
                      { 
                        key: 'custom-chart', 
                        title: <div><FileIcon type="tsx" />DataChart.tsx - 數據圖表</div> 
                      },
                      { 
                        key: 'api-demo', 
                        title: <div><FileIcon type="tsx" />APIDemo.tsx - API 演示</div> 
                      }
                    ]
                  }
                ]
              },
              {
                key: 'more-posts-fe',
                title: (
                  <div className="flex items-center">
                    <span className="mr-1">⋯</span>
                    <span className="text-gray-500 italic">更多文章組件...</span>
                  </div>
                )
              }
            ]
          }
        ]
      }
    ]
  }
];

// API Routes 部分的树状结构数据
const apiTreeData = [
  {
    key: 'api-section',
    title: <div className="font-semibold text-blue-700">🔗 API Routes 部分</div>,
    children: [
      {
        key: 'api-folder',
        title: <div><FolderIcon />app/api/</div>,
        children: [
          {
            key: 'articles-folder',
            title: <div><FolderIcon />articles/</div>,
            children: [
              { 
                key: 'articles-list-api', 
                title: <div><FileIcon type="api" />route.ts - GET /api/articles</div> 
              },
              {
                key: 'articles-detail-folder',
                title: <div><FolderIcon />[slug]/</div>,
                children: [
                  { 
                    key: 'articles-detail-api', 
                    title: <div><FileIcon type="api" />route.ts - GET /api/articles/[slug]</div> 
                  }
                ]
              }
            ]
          },
          {
            key: 'revalidate-folder',
            title: <div><FolderIcon />revalidate/</div>,
            children: [
              { 
                key: 'revalidate-api', 
                title: <div><FileIcon type="api" />route.ts - POST /api/revalidate</div> 
              }
            ]
          }
        ]
      }
    ]
  }
];

// 数据库的树状结构数据
const databaseTreeData = [
  {
    key: 'database',
    title: <div className="font-bold text-green-700 text-base">🗄️ PostgreSQL/PlanetScale</div>,
    children: [
      {
        key: 'articles-table',
        title: <div><FileIcon type="sql" />articles 表</div>,
        children: [
          { 
            key: 'article-id', 
            title: <div className="text-sm text-gray-700">id (主鍵)</div>,
            isLeaf: true 
          },
          { 
            key: 'article-slug', 
            title: <div className="text-sm text-gray-700">slug (唯一)</div>,
            isLeaf: true 
          },
          { 
            key: 'article-title', 
            title: <div className="text-sm text-gray-700">title</div>,
            isLeaf: true 
          },
          { 
            key: 'article-content', 
            title: <div className="text-sm text-gray-700">content (MDX 文本)</div>,
            isLeaf: true 
          },
          { 
            key: 'article-metadata', 
            title: <div className="text-sm text-gray-700">metadata (JSON)</div>,
            isLeaf: true 
          },
          { 
            key: 'article-created', 
            title: <div className="text-sm text-gray-700">created_at</div>,
            isLeaf: true 
          },
          { 
            key: 'article-updated', 
            title: <div className="text-sm text-gray-700">updated_at</div>,
            isLeaf: true 
          }
        ]
      },
      {
        key: 'tags-table',
        title: <div><FileIcon type="sql" />tags 表 (可選)</div>,
        children: [
          { 
            key: 'tag-id', 
            title: <div className="text-sm text-gray-700">id (主鍵)</div>,
            isLeaf: true 
          },
          { 
            key: 'tag-name', 
            title: <div className="text-sm text-gray-700">name</div>,
            isLeaf: true 
          },
          { 
            key: 'tag-slug', 
            title: <div className="text-sm text-gray-700">slug (唯一)</div>,
            isLeaf: true 
          },
          { 
            key: 'tag-count', 
            title: <div className="text-sm text-gray-700">article_count</div>,
            isLeaf: true 
          }
        ]
      }
    ]
  }
];

// CSS 样式
const treeStyles = `
  .stage2-tree .rc-tree-iconEle {
    display: none !important;
  }
  .stage2-tree .rc-tree-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 450px;
  }
`;

export default function Stage2Architecture() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: treeStyles }} />
      
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

        {/* 項目標題 */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🏗️</span>
            <div>
              <h4 className="font-bold text-blue-800 text-lg">Next.js 應用程式</h4>
              <p className="text-sm text-blue-600">假前後端分離，API Routes 處理邏輯</p>
            </div>
          </div>
        </div>

        {/* 前端部分架構圖 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <div className="mb-3">
            <span className="font-semibold text-gray-700">🎨 前端部分架構</span>
            <span className="ml-2 text-xs text-gray-500">頁面路由、組件與本地組件</span>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <Tree
              treeData={frontendTreeData}
              defaultExpandAll={true}
              selectable={false}
              showIcon={false}
              showLine={false}
              className="stage2-tree"
              style={{ fontSize: '14px', lineHeight: '1.8' }}
            />
          </div>
        </div>

        {/* 組件工作方式說明 */}
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="font-semibold text-orange-800 mb-2">🧩 本地組件運作方式</div>
          <div className="text-sm text-orange-700 space-y-1">
            <div>• <strong>數據庫驅動</strong>: MDX 內容從資料庫獲取，而非文件系統</div>
            <div>• <strong>組件載入</strong>: MDXRenderer 動態載入對應的本地組件</div>
            <div>• <strong>混合渲染</strong>: 數據庫內容 + 本地組件的完美結合</div>
            <div>• <strong>性能優化</strong>: 組件按需載入，支援 code splitting</div>
          </div>
        </div>

        {/* API Routes 部分架構圖 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <div className="mb-3">
            <span className="font-semibold text-gray-700">🔗 API Routes 架構</span>
            <span className="ml-2 text-xs text-gray-500">後端 API 路由處理</span>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <Tree
              treeData={apiTreeData}
              defaultExpandAll={true}
              selectable={false}
              showIcon={false}
              showLine={false}
              className="stage2-tree"
              style={{ fontSize: '14px', lineHeight: '1.8' }}
            />
          </div>
        </div>

        {/* API 調用標示 */}
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

        {/* 數據庫架構圖 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="mb-3">
            <span className="font-semibold text-gray-700">🗄️ 數據庫結構</span>
            <span className="ml-2 text-xs text-gray-500">PostgreSQL/PlanetScale 表結構</span>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <Tree
              treeData={databaseTreeData}
              defaultExpandAll={true}
              selectable={false}
              showIcon={false}
              showLine={false}
              className="stage2-tree"
              style={{ fontSize: '14px', lineHeight: '1.8' }}
            />
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
