# ESM Metadata 管理指南

本專案已升級為使用分散式 ESM metadata 管理，每個 MDX 檔案都在頂部包含其 metadata。

## 🚀 快速開始

### 創建新文章

1. 在 `content/posts/` 下創建新資料夾 (使用文章 slug)
2. 創建 `content.mdx` 檔案
3. 使用 VS Code 程式碼片段 `mdx-blog` 快速生成模板

```mdx
export const metadata = {
  title: 'My Amazing Blog Post',
  date: '2025-05-25',
  author: 'Ian Chou',
  excerpt: 'A comprehensive guide to...',
  tags: ['Next.js', 'MDX', 'React'],
  coverImage: '/images/posts/my-post.webp',
  readingTime: 8,
  featured: true,
  category: 'Frontend Development'
};

# My Amazing Blog Post

Your content starts here...
```

## 📁 檔案結構

```
content/posts/my-post/
├── content.mdx           # 包含 metadata + 內容
└── components/           # 可選：文章專用組件
    ├── index.ts         # 組件匯出檔
    └── CustomChart.tsx  # 自訂組件
```

## 🔧 新增的工具

### 1. Metadata 提取器 (`lib/metadata-extractor.ts`)
- 安全地從 MDX 檔案提取 ESM metadata
- 驗證 metadata 格式和必填欄位
- 型別安全的 TypeScript 支援

### 2. 快取系統 (`lib/mdx-cache.ts`)
- 記憶體快取提升開發效能
- 自動檢測檔案變更並清除快取
- 開發和生產環境的最佳化

### 3. 驗證腳本 (`scripts/validate-posts.js`)
```bash
# 驗證所有文章
npm run validate-posts

# 驗證特定文章
npm run validate-posts my-post-slug

# 建置前自動驗證
npm run build
```

### 4. VS Code 整合 (`.vscode/mdx.code-snippets`)
- `mdx-blog`: 完整的文章模板
- `mdx-meta`: 只有 metadata 的模板
- `mdx-component`: 插入組件
- `mdx-alert`: 插入警告框
- `mdx-code`: 插入程式碼區塊

## 📋 Metadata 欄位說明

### 必填欄位
- `title`: 文章標題
- `date`: 發布日期 (YYYY-MM-DD)
- `author`: 作者名稱
- `excerpt`: 文章摘要
- `tags`: 標籤陣列

### 可選欄位
- `coverImage`: 封面圖片路徑
- `readingTime`: 預估閱讀時間 (分鐘)
- `featured`: 是否為精選文章
- `category`: 文章分類
- `updatedDate`: 更新日期
- `seoKeywords`: SEO 關鍵字陣列
- `canonicalUrl`: 標準網址

## ✅ 最佳實踐

### 1. Metadata 管理
- ✅ 使用一致的日期格式 (YYYY-MM-DD)
- ✅ 提供有意義的 excerpt (150-300 字)
- ✅ 使用描述性的 tags
- ✅ 設定合理的 readingTime

### 2. 檔案組織
- ✅ 使用 kebab-case 作為 slug
- ✅ 將相關的組件放在同一資料夾
- ✅ 使用 index.ts 匯出本地組件

### 3. 開發流程
- ✅ 建立新文章後執行 `npm run validate-posts`
- ✅ 使用 VS Code 程式碼片段提升效率
- ✅ 定期檢查快取狀態

## 🔍 驗證檢查項目

驗證腳本會檢查：
- ✅ MDX 檔案是否存在
- ✅ Metadata 格式是否正確
- ✅ 必填欄位是否完整
- ✅ 封面圖片是否存在
- ✅ 組件目錄結構是否正確
- ⚠️ 內容長度是否合理
- ⚠️ 閱讀時間是否準確

## 🚨 常見錯誤

### Metadata 解析失敗
```
Error: No metadata export found in MDX file
```
**解決方案**: 確保檔案頂部有正確的 `export const metadata = {...};`

### 必填欄位缺失
```
Error: Missing required metadata field: title
```
**解決方案**: 檢查並補齊所有必填欄位

### 日期格式錯誤
```
Error: Invalid date format
```
**解決方案**: 使用 YYYY-MM-DD 格式

## 🔄 從集中式 Metadata 遷移

如果您之前使用集中式 metadata 管理：

1. 從 `content/metadata.ts` 複製每篇文章的 metadata
2. 在對應的 MDX 檔案頂部加入 `export const metadata = {...};`
3. 移除 `content/metadata.ts` 檔案
4. 執行 `npm run validate-posts` 確認遷移成功

## 🛠️ 故障排除

### 快取問題
```bash
# 清除 Next.js 快取
rm -rf .next

# 重新啟動開發伺服器
npm run dev
```

### TypeScript 錯誤
確保 `app/types/blog.ts` 包含最新的型別定義。

### 驗證失敗
檢查控制台輸出的詳細錯誤訊息，並根據提示修正。

## 📚 進階用法

### 自訂驗證規則
在 `lib/metadata-extractor.ts` 中修改 `validateMetadata` 函數。

### 擴展 Metadata 欄位
1. 更新 `app/types/blog.ts` 中的型別定義
2. 修改驗證邏輯
3. 更新 VS Code 程式碼片段

### 效能優化
快取系統會自動處理大部分效能問題，但您可以：
- 調整快取策略
- 實作更精細的檔案監聽
- 使用 SWC 或其他工具加速解析

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個 ESM metadata 管理系統！
