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

const FileIcon = ({ type }: { type: 'tsx' | 'mdx' | 'other' }) => {
  const icons = {
    tsx: '⚛️',
    mdx: '📝',
    other: '📄'
  };
  return <span className="mr-1">{icons[type]}</span>;
};

// 樹狀結構數據 - 在每個文章目錄下加入 components/
const treeData = [
  {
    key: 'app',
    title: (
      <div className="flex items-center">
        <FolderIcon />
        <span className="font-semibold text-blue-700">app/</span>
        <span className="ml-2 text-xs text-gray-500">前端應用路由</span>
      </div>
    ),
    children: [
      {
        key: 'blog-folder',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-blue-600">blog/</span>
            <span className="ml-2 text-xs text-gray-500">部落格頁面</span>
          </div>
        ),
        children: [
          {
            key: 'slug-folder',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-purple-600 italic">[slug]/</span>
                <span className="ml-2 text-xs text-gray-500">動態路由</span>
              </div>
            ),
            children: [
              {
                key: 'slug-page',
                title: (
                  <div className="flex items-center">
                    <FileIcon type="tsx" />
                    <span className="text-gray-700">page.tsx</span>
                    <span className="ml-2 text-xs text-gray-500">文章詳情頁</span>
                  </div>
                )
              }
            ]
          },
          {
            key: 'blog-page',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">page.tsx</span>
                <span className="ml-2 text-xs text-gray-500">文章列表頁</span>
              </div>
            )
          }
        ]
      },
      {
        key: 'components',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-blue-600">components/</span>
            <span className="ml-2 text-xs text-gray-500">全域共用組件</span>
          </div>
        ),
        children: [
          {
            key: 'mdx-renderer',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">MDXRenderer.tsx</span>
                <span className="ml-2 text-xs text-gray-500">MDX 渲染器</span>
              </div>
            )
          }
        ]
      }
    ]
  },
  // 分隔線節點
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
    key: 'content',
    title: (
      <div className="flex items-center">
        <FolderIcon />
        <span className="font-semibold text-green-700">content/</span>
        <span className="ml-2 text-xs text-gray-500">文章內容存儲</span>
      </div>
    ),
    children: [
      {
        key: 'posts',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-green-600">posts/</span>
            <span className="ml-2 text-xs text-gray-500">所有文章</span>
          </div>
        ),
        children: [
          {
            key: 'post-1',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-green-500 italic">post-1/</span>
                <span className="ml-2 text-xs text-gray-500">第一篇文章</span>
              </div>
            ),
            children: [
              {
                key: 'post-1-content',
                title: (
                  <div className="flex items-center">
                    <FileIcon type="mdx" />
                    <span className="text-gray-700">content.mdx</span>
                    <span className="ml-2 text-xs text-gray-500">文章內容+元數據</span>
                  </div>
                )
              },
              {
                key: 'post-1-components',
                title: (
                  <div className="flex items-center">
                    <FolderIcon />
                    <span className="font-medium text-orange-600">components/</span>
                    <span className="ml-2 text-xs text-gray-500">本文專用組件</span>
                  </div>
                ),
                children: [
                  {
                    key: 'post-1-index',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="tsx" />
                        <span className="text-gray-700">index.ts</span>
                        <span className="ml-2 text-xs text-gray-500">組件導出</span>
                      </div>
                    )
                  },
                  {
                    key: 'post-1-chart',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="tsx" />
                        <span className="text-gray-700">CustomChart.tsx</span>
                        <span className="ml-2 text-xs text-gray-500">自定義圖表</span>
                      </div>
                    )
                  }
                ]
              }
            ]
          },
          {
            key: 'post-2',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-green-500 italic">post-2/</span>
                <span className="ml-2 text-xs text-gray-500">第二篇文章</span>
              </div>
            ),
            children: [
              {
                key: 'post-2-content',
                title: (
                  <div className="flex items-center">
                    <FileIcon type="mdx" />
                    <span className="text-gray-700">content.mdx</span>
                    <span className="ml-2 text-xs text-gray-500">文章內容+元數據</span>
                  </div>
                )
              },
              {
                key: 'post-2-components',
                title: (
                  <div className="flex items-center">
                    <FolderIcon />
                    <span className="font-medium text-orange-600">components/</span>
                    <span className="ml-2 text-xs text-gray-500">本文專用組件</span>
                  </div>
                ),
                children: [
                  {
                    key: 'post-2-index',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="tsx" />
                        <span className="text-gray-700">index.ts</span>
                        <span className="ml-2 text-xs text-gray-500">組件導出</span>
                      </div>
                    )
                  },
                  {
                    key: 'post-2-widget',
                    title: (
                      <div className="flex items-center">
                        <FileIcon type="tsx" />
                        <span className="text-gray-700">InteractiveWidget.tsx</span>
                        <span className="ml-2 text-xs text-gray-500">互動組件</span>
                      </div>
                    )
                  }
                ]
              }
            ]
          },
          {
            key: 'more-posts',
            title: (
              <div className="flex items-center">
                <span className="mr-1">⋯</span>
                <span className="text-gray-500 italic">更多文章...</span>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export default function Stage1Architecture() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 1：Next.js 單體應用架構</h3>
        <p className="text-sm text-gray-600 mt-1">
          文件系統驅動，所有功能集中在一個應用中 
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            適合 &lt; 1,000 篇文章
          </span>
        </p>
      </div>
      
      <div className="p-6">
        {/* 特點說明 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-800 mb-1">🚀 快速開發</div>
            <div className="text-blue-700 text-xs">
              直接讀取文件，無需 API 設計
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="font-semibold text-green-800 mb-1">📦 簡單部署</div>
            <div className="text-green-700 text-xs">
              一個服務包含所有功能
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="font-semibold text-purple-800 mb-1">🔍 SEO 友好</div>
            <div className="text-purple-700 text-xs">
              完全靜態生成，搜索引擎優化
            </div>
          </div>
        </div>

        {/* 項目標題 */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🏗️</span>
            <div>
              <h4 className="font-bold text-blue-800 text-lg">Next.js 應用程式</h4>
              <p className="text-sm text-blue-600">單體架構，所有功能集中管理</p>
            </div>
          </div>
        </div>

        {/* 文件結構樹 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-700">📁 項目文件結構</span>
              <span className="ml-2 text-xs text-gray-500">點擊文件夾可展開/收起</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-1"></span>
                <span>前端</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-1"></span>
                <span>內容</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-orange-100 border border-orange-300 rounded mr-1"></span>
                <span>組件</span>
              </div>
            </div>
          </div>
          
          {/* 添加自定義 CSS 來隱藏分隔線的連接線和默認圖標 */}
          <style jsx global>{`
            .custom-tree .rc-tree-treenode[data-key="separator"] .rc-tree-switcher {
              display: none;
            }
            .custom-tree .rc-tree-treenode[data-key="separator"] .rc-tree-node-content-wrapper {
              padding: 0;
            }
            /* 隱藏 rc-tree 的默認圖標 - 使用更強的選擇器 */
            .custom-tree .rc-tree-iconEle,
            .custom-tree .rc-tree-icon__docu,
            .custom-tree .rc-tree-icon__open,
            .custom-tree .rc-tree-icon__close {
              display: none !important;
            }
          `}</style>
          
          <Tree
            treeData={treeData}
            defaultExpandAll={true}
            selectable={false}
            showIcon={false}
            showLine={false}
            className="custom-tree"
            style={{
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* 組件架構說明 */}
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="font-semibold text-orange-800 mb-2">🧩 組件架構</div>
          <div className="text-sm text-orange-700 space-y-1">
            <div>• <strong>全域組件</strong>: <code className="bg-orange-100 px-1 rounded">app/components/</code> - 所有文章共用</div>
            <div>• <strong>本地組件</strong>: <code className="bg-orange-100 px-1 rounded">content/posts/[slug]/components/</code> - 文章專用</div>
            <div>• <strong>Barrel 導出</strong>: <code className="bg-orange-100 px-1 rounded">index.ts</code> 統一導出，MDX 中無需 import</div>
            <div>• <strong>覆蓋機制</strong>: 本地組件優先於全域組件</div>
          </div>
        </div>

        {/* 工作流程 */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="font-semibold text-amber-800 mb-2">⚙️ 工作流程</div>
          <div className="text-sm text-amber-700 space-y-1">
            <div>1. 在 <code className="bg-amber-100 px-1 rounded">content/posts/[slug]/</code> 創建文章目錄</div>
            <div>2. 添加 <code className="bg-amber-100 px-1 rounded">content.mdx</code> 和可選的 <code className="bg-amber-100 px-1 rounded">components/</code></div>
            <div>3. 構建時掃描所有文件，生成靜態頁面</div>
            <div>4. MDXRenderer 自動載入本地組件並渲染內容</div>
          </div>
        </div>

        {/* 升級提示 */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="font-semibold text-red-800 mb-2">🚨 升級觸發點</div>
          <div className="text-sm text-red-700 space-y-1">
            <div>• 構建時間超過 5 分鐘</div>
            <div>• 文章數量超過 1,000 篇</div>
            <div>• 需要動態更新內容</div>
            <div>• 希望提供 API 給其他應用</div>
          </div>
        </div>
      </div>
    </div>
  );
}
