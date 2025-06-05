"use client";

import React, { useState } from 'react';

// 图标组件
const FolderIcon = ({ expanded }: { expanded?: boolean }) => (
  <span className="mr-2">
    {expanded ? '📂' : '📁'}
  </span>
);

const FileIcon = ({ type }: { type: 'tsx' | 'api' | 'config' | 'other' }) => {
  const icons = {
    tsx: '⚛️',
    api: '🔗',
    config: '⚙️',
    other: '📄'
  };
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
    key: 'frontend-service',
    title: (
      <div className="flex items-center">
        <span className="text-lg mr-2">🎨</span>
        <div>
          <span className="font-bold text-blue-700 text-lg">Next.js 前端服務</span>
          <div className="text-xs text-blue-600">純前端應用，獨立部署</div>
        </div>
      </div>
    ),
    children: [
      {
        key: 'frontend-pages',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-blue-600">app/blog/</span>
            <span className="ml-2 text-xs text-gray-500">頁面路由</span>
          </div>
        ),
        children: [
          {
            key: 'blog-list-page-fe',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">page.tsx</span>
                <span className="ml-2 text-xs text-gray-500">文章列表 (呼叫 api.blog.com)</span>
              </div>
            ),
            isLeaf: true
          },
          {
            key: 'blog-detail-folder-fe',
            title: (
              <div className="flex items-center">
                <FolderIcon />
                <span className="font-medium text-purple-600 italic">[slug]/</span>
                <span className="ml-2 text-xs text-gray-500">動態路由</span>
              </div>
            ),
            children: [
              {
                key: 'blog-detail-page-fe',
                title: (
                  <div className="flex items-center">
                    <FileIcon type="tsx" />
                    <span className="text-gray-700">page.tsx</span>
                    <span className="ml-2 text-xs text-gray-500">文章詳情 (跨域 API 呼叫)</span>
                  </div>
                ),
                isLeaf: true
              }
            ]
          }
        ]
      },
      {
        key: 'frontend-lib',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-blue-600">lib/</span>
            <span className="ml-2 text-xs text-gray-500">工具庫</span>
          </div>
        ),
        children: [
          {
            key: 'api-client',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">api.ts</span>
                <span className="ml-2 text-xs text-gray-500">API 客戶端 (HTTPS 呼叫)</span>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'frontend-deployment',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">🚀</span>
            <div>
              <span className="font-semibold text-amber-600">部署: Vercel</span>
              <div className="text-xs text-gray-500">域名: blog.com | ISR + SSG</div>
            </div>
          </div>
        ),
        isLeaf: true
      }
    ]
  },
  // 分隔線
  {
    key: 'separator1',
    title: (
      <div className="py-3">
        <hr className="border-gray-300 border-dashed" />
      </div>
    ),
    selectable: false,
    disabled: true,
    isLeaf: true
  },
  {
    key: 'backend-service',
    title: (
      <div className="flex items-center">
        <span className="text-lg mr-2">🔗</span>
        <div>
          <span className="font-bold text-red-700 text-lg">Hono API 服務</span>
          <div className="text-xs text-red-600">獨立後端，邊緣計算</div>
        </div>
      </div>
    ),
    children: [
      {
        key: 'api-routes',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-red-600">src/routes/</span>
            <span className="ml-2 text-xs text-gray-500">API 路由</span>
          </div>
        ),
        children: [
          {
            key: 'articles-routes',
            title: (
              <div className="flex items-center">
                <FileIcon type="api" />
                <span className="text-gray-700">articles.ts</span>
                <span className="ml-2 text-xs text-gray-500">文章 CRUD API</span>
              </div>
            ),
            isLeaf: true
          },
          {
            key: 'auth-routes',
            title: (
              <div className="flex items-center">
                <FileIcon type="api" />
                <span className="text-gray-700">auth.ts</span>
                <span className="ml-2 text-xs text-gray-500">認證 API</span>
              </div>
            ),
            isLeaf: true
          },
          {
            key: 'search-routes',
            title: (
              <div className="flex items-center">
                <FileIcon type="api" />
                <span className="text-gray-700">search.ts</span>
                <span className="ml-2 text-xs text-gray-500">搜索 API</span>
              </div>
            ),
            isLeaf: true
          },
          {
            key: 'upload-routes',
            title: (
              <div className="flex items-center">
                <FileIcon type="api" />
                <span className="text-gray-700">upload.ts</span>
                <span className="ml-2 text-xs text-gray-500">文件上傳 API</span>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'api-middleware',
        title: (
          <div className="flex items-center">
            <FolderIcon />
            <span className="font-medium text-red-600">src/middleware/</span>
            <span className="ml-2 text-xs text-gray-500">中間件</span>
          </div>
        ),
        children: [
          {
            key: 'auth-middleware',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">auth.ts</span>
                <span className="ml-2 text-xs text-gray-500">JWT 認證</span>
              </div>
            ),
            isLeaf: true
          },
          {
            key: 'cache-middleware',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">cache.ts</span>
                <span className="ml-2 text-xs text-gray-500">KV 緩存</span>
              </div>
            ),
            isLeaf: true
          },
          {
            key: 'cors-middleware',
            title: (
              <div className="flex items-center">
                <FileIcon type="tsx" />
                <span className="text-gray-700">cors.ts</span>
                <span className="ml-2 text-xs text-gray-500">跨域處理</span>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'api-config',
        title: (
          <div className="flex items-center">
            <FileIcon type="config" />
            <span className="font-medium text-red-600">wrangler.toml</span>
            <span className="ml-2 text-xs text-gray-500">CF Workers 配置</span>
          </div>
        ),
        isLeaf: true
      },
      {
        key: 'backend-deployment',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">☁️</span>
            <div>
              <span className="font-semibold text-purple-600">部署: Cloudflare Workers</span>
              <div className="text-xs text-gray-500">域名: api.blog.com | 全球邊緣節點</div>
            </div>
          </div>
        ),
        isLeaf: true
      }
    ]
  },
  // 分隔線
  {
    key: 'separator2',
    title: (
      <div className="py-3">
        <hr className="border-gray-300 border-dashed" />
      </div>
    ),
    selectable: false,
    disabled: true,
    isLeaf: true
  },
  {
    key: 'storage-layer',
    title: (
      <div className="flex items-center">
        <span className="text-lg mr-2">🗄️</span>
        <div>
          <span className="font-bold text-green-700 text-lg">數據存儲層</span>
          <div className="text-xs text-green-600">多元化存儲解決方案</div>
        </div>
      </div>
    ),
    children: [
      {
        key: 'postgresql',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">🐘</span>
            <div>
              <span className="font-semibold text-green-600">PostgreSQL</span>
              <div className="text-xs text-gray-500">主數據庫 (PlanetScale/Neon)</div>
            </div>
          </div>
        ),
        children: [
          {
            key: 'pg-tables',
            title: (
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded border">
                <div className="mb-1"><strong>數據表：</strong></div>
                <div>• articles, tags, users</div>
                <div>• 事務支援、關聯查詢</div>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'redis',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">⚡</span>
            <div>
              <span className="font-semibold text-green-600">Redis</span>
              <div className="text-xs text-gray-500">緩存層 (Upstash)</div>
            </div>
          </div>
        ),
        children: [
          {
            key: 'redis-cache',
            title: (
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded border">
                <div className="mb-1"><strong>緩存策略：</strong></div>
                <div>• API 響應緩存</div>
                <div>• 搜索結果緩存</div>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'r2-storage',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">📦</span>
            <div>
              <span className="font-semibold text-green-600">Cloudflare R2</span>
              <div className="text-xs text-gray-500">對象存儲</div>
            </div>
          </div>
        ),
        children: [
          {
            key: 'r2-files',
            title: (
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded border">
                <div className="mb-1"><strong>存儲內容：</strong></div>
                <div>• 圖片、文件上傳</div>
                <div>• CDN 加速</div>
              </div>
            ),
            isLeaf: true
          }
        ]
      },
      {
        key: 'elasticsearch',
        title: (
          <div className="flex items-center">
            <span className="text-lg mr-2">🔍</span>
            <div>
              <span className="font-semibold text-green-600">Elasticsearch</span>
              <div className="text-xs text-gray-500">全文搜索</div>
            </div>
          </div>
        ),
        children: [
          {
            key: 'es-search',
            title: (
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded border">
                <div className="mb-1"><strong>搜索功能：</strong></div>
                <div>• 文章全文搜索</div>
                <div>• 標籤、分類索引</div>
              </div>
            ),
            isLeaf: true
          }
        ]
      }
    ]
  }
];

export default function Stage3Architecture() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">階段 3：Next.js 前端 + 獨立 API 層（真正分離）</h3>
        <p className="text-sm text-gray-600 mt-1">
          完全前後端分離，微服務架構
          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
            適合 10,000+ 篇文章、多客戶端
          </span>
        </p>
      </div>
      
      <div className="p-6">
        {/* 特點說明 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="font-semibold text-red-800 mb-1">⚡ 極致性能</div>
            <div className="text-red-700 text-xs">
              邊緣計算，全球 &lt; 50ms 延遲
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-800 mb-1">🔧 技術靈活</div>
            <div className="text-blue-700 text-xs">
              可隨時更換前後端技術棧
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="font-semibold text-purple-800 mb-1">📱 多客戶端</div>
            <div className="text-purple-700 text-xs">
              支援 Web、移動端、第三方整合
            </div>
          </div>
        </div>

        {/* 架構說明 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-700">🏗️ 微服務架構</span>
              <span className="ml-2 text-xs text-gray-500">每個服務獨立開發、部署、擴展</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-1"></span>
                <span>前端</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-1"></span>
                <span>後端</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-1"></span>
                <span>存儲</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <Tree data={treeData} defaultExpandAll={true} />
          </div>
        </div>

        {/* 服務通信 */}
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="font-semibold text-purple-800 mb-2">🔄 服務間通信</div>
          <div className="text-sm text-purple-700 space-y-1">
            <div>1. <strong>前端 → API</strong>: HTTPS 跨域呼叫 <code className="bg-purple-100 px-1 rounded">api.blog.com</code></div>
            <div>2. <strong>認證機制</strong>: JWT Token 驗證</div>
            <div>3. <strong>緩存策略</strong>: 多層緩存 (CDN + KV + Redis)</div>
            <div>4. <strong>錯誤處理</strong>: 優雅降級與重試機制</div>
          </div>
        </div>

        {/* 性能優勢 */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="font-semibold text-green-800 mb-2">🚀 性能提升</div>
          <div className="text-sm text-green-700 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-1">API 響應時間</div>
              <div className="text-xs">• 階段2: 50-100ms</div>
              <div className="text-xs text-green-600">• 階段3: 5-15ms ⚡</div>
            </div>
            <div>
              <div className="font-medium mb-1">全球延遲</div>
              <div className="text-xs">• 傳統服務器: 200-500ms</div>
              <div className="text-xs text-green-600">• 邊緣計算: &lt; 50ms 🌍</div>
            </div>
          </div>
        </div>

        {/* 優勢與挑戰 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-semibold text-green-800 mb-2">✅ 架構優勢</div>
            <div className="text-sm text-green-700 space-y-1">
              <div>• 真正的前後端分離</div>
              <div>• 無限水平擴展能力</div>
              <div>• 團隊完全獨立開發</div>
              <div>• 技術棧選擇靈活</div>
              <div>• 支援多客戶端</div>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="font-semibold text-amber-800 mb-2">⚠️ 實施挑戰</div>
            <div className="text-sm text-amber-700 space-y-1">
              <div>• 架構複雜度較高</div>
              <div>• 需要協調多個服務部署</div>
              <div>• 學習成本相對較高</div>
              <div>• 初期開發投入較大</div>
              <div>• 需要專業運維知識</div>
            </div>
          </div>
        </div>

        {/* 適用場景 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-semibold text-blue-800 mb-2">🎯 最適合的場景</div>
          <div className="text-sm text-blue-700 space-y-1">
            <div>• 📊 大規模部落格 (10,000+ 篇文章)</div>
            <div>• 📱 需要支援移動應用</div>
            <div>• 👥 多個前端應用共享 API</div>
            <div>• 🌍 全球用戶群體</div>
            <div>• 🚀 對性能有極高要求</div>
            <div>• 👨‍💻 有專業的前後端團隊</div>
          </div>
        </div>
      </div>
    </div>
  );
}
