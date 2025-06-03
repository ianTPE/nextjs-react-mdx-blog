"use client";

import React from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

// 图标组件
const FolderIcon = () => <span className="mr-1">📁</span>;
const FileIcon = ({ type }: { type: 'tsx' | 'sql' | 'api' | 'other' }) => {
  const icons: Record<string, string> = {
    tsx: '⚛️',
    sql: '🗄️',
    api: '🔗',
    other: '📄'
  };
  return <span className="mr-1">{icons[type]}</span>;
};

// 树状结构数据
const treeData = [
  {
    key: 'nextjs-app',
    title: <div>🏗️ Next.js 應用程式 (前後端混合)</div>,
    children: [
      {
        key: 'frontend-section',
        title: <div>🎨 前端部分</div>,
        children: [
          {
            key: 'blog-pages',
            title: <div><FolderIcon />app/blog/ - 部落格頁面</div>,
            children: [
              { key: 'blog-list', title: <div><FileIcon type="tsx" />page.tsx - 文章列表</div> },
              {
                key: 'blog-detail-folder',
                title: <div><FolderIcon />[slug]/ - 動態路由</div>,
                children: [
                  { key: 'blog-detail', title: <div><FileIcon type="tsx" />page.tsx - 文章詳情</div> }
                ]
              }
            ]
          },
          {
            key: 'components',
            title: <div><FolderIcon />components/ - 共用組件</div>,
            children: [
              { key: 'mdx-renderer', title: <div><FileIcon type="tsx" />MDXRenderer.tsx</div> }
            ]
          }
        ]
      },
      {
        key: 'api-section',
        title: <div>🔗 API Routes 部分</div>,
        children: [
          {
            key: 'api-folder',
            title: <div><FolderIcon />app/api/ - API 路由</div>,
            children: [
              {
                key: 'articles-folder',
                title: <div><FolderIcon />articles/ - 文章 API</div>,
                children: [
                  { key: 'articles-list-api', title: <div><FileIcon type="api" />route.ts - GET /api/articles</div> },
                  {
                    key: 'articles-detail-folder',
                    title: <div><FolderIcon />[slug]/ - 動態 API</div>,
                    children: [
                      { key: 'articles-detail-api', title: <div><FileIcon type="api" />route.ts - GET /api/articles/[slug]</div> }
                    ]
                  }
                ]
              },
              {
                key: 'revalidate-folder',
                title: <div><FolderIcon />revalidate/ - ISR</div>,
                children: [
                  { key: 'revalidate-api', title: <div><FileIcon type="api" />route.ts - POST /api/revalidate</div> }
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
      <div className="flex items-center justify-center py-4">
        <div className="flex flex-col items-center gap-2">
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
    title: <div>🗄️ 數據庫層 (PostgreSQL)</div>,
    children: [
      {
        key: 'articles-table',
        title: <div><FileIcon type="sql" />articles 表</div>,
        children: [
          {
            key: 'article-fields',
            title: (
              <div className="space-y-1">
                <div className="text-xs">id (主鍵), slug (唯一), title</div>
                <div className="text-xs">content (MDX), metadata (JSON)</div>
                <div className="text-xs">created_at, updated_at</div>
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
              <div className="space-y-1">
                <div className="text-xs">id (主鍵), name, slug (唯一)</div>
                <div className="text-xs">article_count</div>
              </div>
            ),
            isLeaf: true
          }
        ]
      }
    ]
  }
];

// 组件样式覆盖：针对 article-fields 和 tag-fields 这两项做 override
const treeStyles = `
  /* 1. 对于要多行显示的 <li> 节点（article-fields、tag-fields）取消固定高度和溢出隐藏 */
  .architecture-tree .rc-tree-treenode[data-key="article-fields"],
  .architecture-tree .rc-tree-treenode[data-key="tag-fields"] {
    height: auto !important;
    line-height: initial !important;
  }

  /* 2. 对这个节点里面的 .rc-tree-node-content-wrapper 也设为自适应高度，并且顶部对齐 */
  .architecture-tree .rc-tree-treenode[data-key="article-fields"] .rc-tree-node-content-wrapper,
  .architecture-tree .rc-tree-treenode[data-key="tag-fields"] .rc-tree-node-content-wrapper {
    height: auto !important;
    align-items: flex-start !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  /* 3. 让 .rc-tree-title 本身可以正常换行，不再用单行截断 */
  .architecture-tree .rc-tree-treenode[data-key="article-fields"] .rc-tree-title,
  .architecture-tree .rc-tree-treenode[data-key="tag-fields"] .rc-tree-title {
    display: block !important;
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: unset !important;
    max-width: none !important;
  }

  /* 4. 隐藏 api-connection 节点默认的树状开关箭头（因为它本身是“虚线+文字”的装饰，不需要展开折叠箭头） */
  .architecture-tree .rc-tree-treenode[data-key="api-connection"] .rc-tree-switcher {
    display: none !important;
  }
  .architecture-tree .rc-tree-treenode[data-key="api-connection"] .rc-tree-node-content-wrapper {
    padding: 0 !important;
  }

  /* 5. 调整所有节点标题的最大宽度，避免过长内容被截断 */
  .architecture-tree .rc-tree-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
  }
`;

export default function Stage2Architecture() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* 把自定义 CSS 插入到页面头部 */}
      <style dangerouslySetInnerHTML={{ __html: treeStyles }} />

      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          階段 2：Next.js + API Routes（偽前後端分離）
        </h3>
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
          <div className="mb-3">
            <span className="font-semibold text-gray-700">🏗️ 架構組成</span>
            <span className="ml-2 text-xs text-gray-500">點擊可展開詳細結構</span>
          </div>

          <Tree
            treeData={treeData}
            defaultExpandAll={true}
            selectable={false}
            className="architecture-tree"
            style={{ fontSize: '14px', lineHeight: '1.8' }}
          />
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
