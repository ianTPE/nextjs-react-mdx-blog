# Next.js MDX 博客

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

一個基於 Next.js 和 MDX 的現代化博客系統，專注於性能、可訪問性和開發體驗。

## 🚀 功能特點

- ⚡ **極速加載**：使用 Next.js 15+ App Router 和 React Server Components
- 📝 **強大的內容管理**：支持 MDX 和獨立 ESM metadata
- 🎨 **響應式設計**：完美適配移動端和桌面端
- 🚀 **優化的性能**：自動圖片優化、代碼分割等
- ♿ **無障礙優先**：遵循 WCAG 2.1 標準
- 🔍 **SEO 友好**：自動生成 sitemap 和 RSS 訂閱
- 🛠️ **工程化工具**：完整的內容驗證和管理腳本

## 📦 快速開始

### 環境要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn

### 安裝依賴

```bash
npm install
# 或
yarn install
```

### 開發模式

```bash
npm run dev
# 或
yarn dev
```

然後在瀏覽器中打開 [http://localhost:3000](http://localhost:3000)

### 生產構建

```bash
npm run build
npm start
```

## 📁 項目結構

```
.
├── app/                   # Next.js 15+ App Router
│   ├── api/               # API 路由
│   ├── blog/              # 博客文章路由
│   └── (marketing)/       # 營銷頁面
├── components/            # 可重用組件
│   ├── ui/                # UI 組件
│   ├── mdx/               # MDX 全局組件
│   └── icons/             # SVG 圖標
├── content/               # MDX 內容
│   └── posts/             # 博客文章
│       └── [slug]/        # 單篇文章目錄
│           ├── metadata.ts    # 獨立的文章元數據
│           ├── content.mdx    # 文章內容
│           └── components/    # 文章專用組件
├── lib/                   # 工具函數
│   ├── metadata-loader.ts # metadata 加載器
│   └── mdx.ts            # 傳統 MDX 處理器
├── scripts/               # 工具腳本
│   ├── validate-posts-new.ts  # 文章驗證
│   ├── create-post.ts     # 創建新文章
│   └── list-posts.ts      # 文章列表管理
├── types/                 # TypeScript 類型定義
└── public/                # 靜態文件
```

## ✨ 內容管理系統

本博客使用現代化的 **ESM Metadata** 系統，每篇文章都有獨立的 metadata 文件：

### 創建新文章

```bash
# 互動式創建新文章
npm run posts:create

# 腳本會引導你填寫：
# - 文章標題
# - Slug（URL 路徑）
# - 作者
# - 摘要
# - 標籤
```

### 文章管理

```bash
# 驗證所有文章
npm run posts:validate

# 列出所有文章
npm run posts:list

# 列出已發布的文章
npm run posts:list -- --published

# 列出草稿文章
npm run posts:list -- --drafts

# 列出特定標籤的文章
npm run posts:list -- --tag "Next.js"
```

### 文章結構

每篇文章包含三個部分：

#### 1. metadata.ts - 文章元數據
```typescript
// content/posts/my-article/metadata.ts
import type { PostMeta } from '../../../types/post';

const metadata: PostMeta = {
  slug: "my-article",
  title: "我的文章標題",
  date: "2025-06-05",
  summary: "這是一篇關於...",
  tags: ["Next.js", "React"],
  published: true,
  author: "Ian Chou",
  coverImage: "/images/posts/my-article.webp"
};

export default metadata;
```

#### 2. content.mdx - 文章內容
```markdown
# 我的文章標題

這裡是文章內容...

## 使用自定義組件

<CustomChart data={chartData} />
```

#### 3. components/ - 文章專用組件
```typescript
// content/posts/my-article/components/index.ts
"use client";

import CustomChart from './CustomChart';
export { CustomChart };
```

## 🛠️ 開發工作流程

### 1. 開發新文章
```bash
npm run posts:create     # 創建文章框架
# 編輯 content.mdx       # 撰寫內容
# 添加自定義組件         # 如果需要
npm run posts:validate   # 驗證文章
npm run dev             # 預覽效果
```

### 2. 發布文章
```bash
# 在 metadata.ts 中設置
published: true

npm run posts:validate   # 最終驗證
npm run build           # 構建生產版本
```

### 3. 管理現有文章
```bash
npm run posts:list -- --drafts    # 查看待發布文章
npm run posts:list -- --published # 查看已發布文章
```

## 🔧 配置選項

### ESM Metadata 字段

- **slug**: URL 路徑（必需）
- **title**: 文章標題（必需）
- **date**: 發布日期（必需）
- **summary**: 文章摘要（必需）
- **tags**: 標籤陣列（必需）
- **published**: 是否發布（必需）
- **author**: 作者（可選）
- **coverImage**: 封面圖片（可選）

### MDX 組件支援

- **全局組件**: 位於 `components/mdx/global-components/`
- **本地組件**: 位於 `content/posts/[slug]/components/`
- **組件優先級**: 本地組件會覆蓋同名的全局組件

## 📊 性能優化

- **圖片優化**: 使用 Next.js Image 組件
- **字體優化**: 使用 `next/font`
- **代碼分割**: 自動路由級代碼分割
- **靜態生成**: 預渲染頁面以獲得最佳性能
- **元數據快取**: 開發環境中的智能快取機制

## 🔍 SEO 優化

每篇文章自動生成：
- Open Graph 標籤
- Twitter Cards
- JSON-LD 結構化數據
- 自動 sitemap
- RSS 訂閱支援

## 🧪 測試和驗證

```bash
# 驗證所有文章格式
npm run posts:validate

# 檢查構建
npm run build

# 運行 linting
npm run lint
```

## 🚀 部署

推薦部署平台：
- **Vercel**: 零配置部署
- **Netlify**: 靜態網站部署
- **Cloudflare Pages**: 全球 CDN

```bash
# 部署前檢查
npm run posts:validate
npm run build

# Vercel 部署
vercel --prod
```

## 🤝 貢獻指南

1. Fork 此倉庫
2. 創建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 開啟 Pull Request

## 📝 更新日誌

### v2.0.0 - ESM Metadata 系統
- ✨ 獨立的 ESM metadata 文件
- 🛠️ 完整的內容管理工具
- 🔧 Windows 相容性改進
- 📦 TypeScript 完整支援

### v1.0.0 - 初始版本
- 🚀 Next.js 15 + MDX 3.0
- ⚡ App Router 支援
- 🎨 Tailwind CSS 整合

## 📄 許可證

本項目採用 [MIT 許可證](LICENSE)。

## 🙏 致謝

感謝所有貢獻者和開源社群的支持！

---

⭐ 如果這個項目對你有幫助，請給它一個星星！