"use client";

import React from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

// 自定義圖標組件
const FolderIcon = ({ expanded }: { expanded?: boolean }) => (
  <span className="mr-1">
    {expanded ? '📂' : '📁'}
  </span>
);

const FileIcon = ({ type }: { type: 'tsx' | 'sql' | 'api' | 'other' }) => {
  const icons = {
    tsx: '⚛️',
    sql: '🗄️',
    api: '🔗',
    other: '📄'
  };
  return <span className="mr-1">{icons[type]}</span>;
};

// 階段2架構：Next.js + API Routes + 數據庫
const treeData = [
  {
    key: 'nextjs-app',
    title: (
      <div className="flex items-center">
        <span className="text-lg mr-2">🏗️</span>
        <div>
          <span className="font-bold text-blue-700 text-lg">Next.js 應用程式</span>
          <div className="text-xs text-blue-600">前後端混合架構</div>
        </div>
      </div>
    ),
    children: [
      {
        key: 'frontend-section',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">🎨</span>
            <div>
              <span className="font-semibold text-blue-700">前端部分</span>
              <div className="text-xs text-gray-500">使用者介面與頁面</div>
            </div>
          </div>
        ),
        children: [
          {
            key: 'blog-pages',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-blue-600">app/blog/</span>
                <span className="ml-2 text-xs text-gray-500">部落格頁面</span>
              </div>
            ),
            children: [
              {
                key: 'blog-list-page',
                title: (
                  <div className="flex items-center">
                    <FileIcon type="tsx" />
                    <span className="text-gray-700">page.tsx</span>
                    <span className="ml-2 text-xs text-gray-500">文章列表頁 (呼叫 /api/articles)</span>
                  </div>
                )
              },
              {
                key: 'blog-detail-folder',
                title: (
                  <div className="flex items-center">
                    <FolderIcon />
                    <span className="font-medium text-purple-600 italic">[slug]/</span>
                    <span className="ml-2 text-xs text-gray-500">動態路由</span>
                  </div>
                ),
                children: [
                  {
                    key: 'blog-detail-page',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="tsx" />
                        <span className="text-gray-700">page.tsx</span>
                        <span className="ml-2 text-xs text-gray-500">文章詳情頁 (呼叫 /api/articles/[slug])</span>
                      </div>
                    )
                  }
                ]
              }
            ]
          },
          {
            key: 'frontend-components',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-blue-600">components/</span>
                <span className="ml-2 text-xs text-gray-500">共用組件</span>
              </div>
            ),
            children: [
              {
                key: 'mdx-renderer',
                title: (
                  <div className="flex items-center">
                    <FileIcon type="tsx" />
                    <span className="text-gray-700">MDXRenderer.tsx</span>
                    <span className="ml-2 text-xs text-gray-500">渲染來自資料庫的 MDX</span>
                  </div>
                )
              }
            ]
          }
        ]
      },
      {
        key: 'api-section',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">🔗</span>
            <div>
              <span className="font-semibold text-purple-700">API Routes 部分</span>
              <div className="text-xs text-gray-500">內建 API 端點</div>
            </div>
          </div>
        ),
        children: [
          {
            key: 'api-folder',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-purple-600">app/api/</span>
                <span className="ml-2 text-xs text-gray-500">API 路由</span>
              </div>
            ),
            children: [
              {
                key: 'articles-api-folder',
                title: (
                  <div className="flex items-center">
                    <FolderIcon />
                    <span className="font-medium text-purple-600">articles/</span>
                    <span className="ml-2 text-xs text-gray-500">文章 API</span>
                  </div>
                ),
                children: [
                  {
                    key: 'articles-list-api',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="api" />
                        <span className="text-gray-700">route.ts</span>
                        <span className="ml-2 text-xs text-gray-500">GET /api/articles (列表)</span>
                      </div>
                    )
                  },
                  {
                    key: 'articles-detail-folder',
                    title: (
                      <div className="flex items-center">
                        <FolderIcon />
                        <span className="font-medium text-purple-600 italic">[slug]/</span>
                        <span className="ml-2 text-xs text-gray-500">動態 API 路由</span>
                      </div>
                    ),
                    children: [
                      {
                        key: 'articles-detail-api',
                        title: (
                          <div className="flex items-center">
                            <FileIcon type="api" />
                            <span className="text-gray-700">route.ts</span>
                            <span className="ml-2 text-xs text-gray-500">GET /api/articles/[slug]</span>
                          </div>
                        )
                      }
                    ]
                  }
                ]
              },
              {
                key: 'revalidate-api',
                title: (
                  <div className="flex items-center">
                    <FolderIcon />
                    <span className="font-medium text-purple-600">revalidate/</span>
                    <span className="ml-2 text-xs text-gray-500">ISR 重新驗證</span>
                  </div>
                ),
                children: [
                  {
                    key: 'revalidate-route',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="api" />
                        <span className="text-gray-700">route.ts</span>
                        <span className="ml-2 text-xs text-gray-500">POST /api/revalidate</span>
                      </div>
                    )
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // 分隔線
  {
    key: 'separator',
    title: (
      <div className="py-2">
        <hr className="border-gray-300 border-dashed" />
      </div>
    ),
    selectable: false,
    disabled: true,
    isLeaf: true
  },
  {
    key: 'database-layer',
    title: (
      <div className="flex items-center">
        <span className="text-lg mr-2">🗄️</span>
        <div>
          <span className="font-bold text-green-700 text-lg">數據庫層</span>
          <div className="text-xs text-green-600">PostgreSQL / PlanetScale</div>
        </div>
      </div>
    ),
    children: [
      {
        key: 'articles-table',
        title: (
          <div className="flex items-center">
            <FileIcon type="sql" />
            <span className="font-semibold text-green-600">articles 表</span>
            <span className="ml-2 text-xs text-gray-500">存儲所有文章數據</span>
          </div>
        ),
        children: [
          {
            key: 'article-fields',
            title: (
              <div className="text-xs text-gray-600 leading-relaxed">
                <div>• id (主鍵)</div>
                <div>• slug (唯一標識)</div>
                <div>• title (標題)</div>
                <div>• content (MDX 內容)</div>
                <div>• metadata (JSON: 作者、標籤等)</div>
                <div>• view_count (瀏覽次數)</div>
                <div>• created_at, updated_at</div>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'tags-table',
        title: (
          <div className="flex items-center">
            <FileIcon type="sql" />
            <span className="font-semibold text-green-600">tags 表</span>
            <span className="ml-2 text-xs text-gray-500">標籤管理 (可選)</span>
          </div>
        ),
        children: [
          {
            key: 'tag-fields',
            title: (
              <div className="text-xs text-gray-600 leading-relaxed">
                <div>• id, name, slug</div>
                <div>• article_count</div>
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
            <div className="text-purple-700 text-xs">
              構建時間不受文章數量影響
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-800 mb-1">🔄 動態更新</div>
            <div className="text-blue-700 text-xs">
              API + ISR 實現即時內容更新
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="font-semibold text-green-800 mb-1">📦 保持簡單</div>
            <div className="text-green-700 text-xs">
              仍是單一服務部署
            </div>
          </div>
        </div>

        {/* 架構說明 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-700">🏗️ 架構組成</span>
              <span className="ml-2 text-xs text-gray-500">點擊可展開詳細結構</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-1"></span>
                <span>前端</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-100 border border-purple-300 rounded mr-1"></span>
                <span>API</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-1"></span>
                <span>數據庫</span>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            .custom-tree .rc-tree-treenode[data-key="separator"] .rc-tree-switcher {
              display: none;
            }
            .custom-tree .rc-tree-treenode[data-key="separator"] .rc-tree-node-content-wrapper {
              padding: 0;
            }
          `}</style>
          
          <Tree
            treeData={treeData}
            defaultExpandAll={true}
            selectable={false}
            className="custom-tree"
            style={{
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* 數據流向 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-semibold text-blue-800 mb-2">🔄 數據流向</div>
          <div className="text-sm text-blue-700 space-y-1">
            <div>1. <strong>用戶請求</strong>: 訪問 <code className="bg-blue-100 px-1 rounded">/blog/[slug]</code></div>
            <div>2. <strong>頁面呼叫</strong>: <code className="bg-blue-100 px-1 rounded">fetch('/api/articles/[slug]')</code></div>
            <div>3. <strong>API 查詢</strong>: API Routes 查詢資料庫獲取 MDX 內容</div>
            <div>4. <strong>內容渲染</strong>: MDXRenderer 渲染返回的 MDX 內容</div>
          </div>
        </div>

        {/* 優勢與缺點 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-semibold text-green-800 mb-2">✅ 主要優勢</div>
            <div className="text-sm text-green-700 space-y-1">
              <div>• 性能大幅提升，構建時間固定</div>
              <div>• 支援動態更新和 ISR</div>
              <div>• 具備真正的 API 端點</div>
              <div>• 部署仍然簡單</div>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="font-semibold text-amber-800 mb-2">⚠️ 現有限制</div>
            <div className="text-sm text-amber-700 space-y-1">
              <div>• 前後端仍在同一項目中</div>
              <div>• API Routes 性能有限</div>
              <div>• 無法獨立部署和擴展</div>
              <div>• 團隊協作仍有耦合</div>
            </div>
          </div>
        </div>

        {/* 升級提示 */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="font-semibold text-red-800 mb-2">🚨 升級到階段 3 的時機</div>
          <div className="text-sm text-red-700 space-y-1">
            <div>• 需要支援移動應用或多個前端</div>
            <div>• API 性能成為瓶頸</div>
            <div>• 前後端團隊希望獨立開發</div>
            <div>• 需要微服務架構的靈活性</div>
          </div>
        </div>
      </div>
    </div>
  );
}