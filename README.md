# Next.js MDX 博客

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

一個基於 Next.js 和 MDX 的現代化博客系統，專注於性能、可訪問性和開發體驗。

## 功能特點

- ⚡ **極速加載**：使用 Next.js 13+ App Router 和 React Server Components
- 📝 **強大的內容管理**：支持 MDX 和 Markdown
- 🎨 **響應式設計**：完美適配移動端和桌面端
- 🚀 **優化的性能**：自動圖片優化、代碼分割等
- ♿ **無障礙優先**：遵循 WCAG 2.1 標準
- 🔍 **SEO 友好**：自動生成 sitemap 和 RSS 訂閱

## 快速開始

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

## 項目結構

```
.
├── .github/               # GitHub 工作流程
├── .husky/                # Git 鉤子
├── app/                   # Next.js 13+ App Router
│   ├── api/               # API 路由
│   ├── blog/              # 博客文章
│   └── (marketing)/       # 營銷頁面
├── components/            # 可重用組件
│   ├── ui/                # UI 組件
│   └── icons/             # SVG 圖標
├── config/                # 配置文件
├── content/               # MDX 內容
├── lib/                   # 工具函數
├── public/                # 靜態文件
├── styles/                # 全局樣式
└── types/                 # TypeScript 類型定義
```

## 添加新文章

1. 在 `content/posts` 目錄下創建新文件夾
2. 添加 `content.mdx` 文件（文章內容）
3. 添加 `metadata.ts` 文件（文章元數據）

示例 `metadata.ts`:

```typescript
export const metadata = {
  title: '文章標題',
  date: '2023-01-01',
  description: '文章描述',
  tags: ['標籤1', '標籤2'],
  coverImage: '/images/posts/example.jpg',
  published: true,
};
```

## 開發規範

請參閱 [CONTRIBUTING.md](CONTRIBUTING.md) 了解代碼風格、提交規範和貢獻指南。

## 性能優化

- 圖片優化：使用 Next.js Image 組件
- 字體優化：使用 `next/font`
- 代碼分割：自動路由級代碼分割
- 靜態生成：預渲染頁面以獲得最佳性能

## 許可證

本項目採用 [MIT 許可證](LICENSE)。
