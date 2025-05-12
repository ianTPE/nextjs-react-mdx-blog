# 使用自定義 MDX 組件

本文檔提供如何在你的 MDX 部落格文章中使用自定義組件的指南，特別是新增的 `VersionComparisonTable` 組件。

## VersionComparisonTable 使用方法

在你的 MDX 文件中，你可以直接使用 `<VersionComparisonTable>` 組件。以下是一個例子：

```mdx
---
title: 'Next.js 15 新功能一覽'
date: '2023-11-15'
author: 'Ian Chen'
excerpt: '探索 Next.js 15 帶來的所有新功能和改進'
tags: ['Next.js', 'React', 'Web Development']
---

# Next.js 15 新功能一覽

Next.js 15 已經發布，帶來了許多令人興奮的新功能和改進。以下是版本比較：

<VersionComparisonTable 
  version1="Next.js 14" 
  version2="Next.js 15"
  items={[
    { 
      feature: "Turbopack", 
      v1: "實驗性支持", 
      v2: "穩定版" 
    },
    { 
      feature: "React 版本", 
      v1: "18.2", 
      v2: "19.0" 
    },
    { 
      feature: "Server Components", 
      v1: "支持但有限制", 
      v2: "完全支持" 
    },
    { 
      feature: "Edge Runtime", 
      v1: "較少功能", 
      v2: "功能豐富" 
    },
    { 
      feature: "構建時間", 
      v1: "較慢", 
      v2: "提升約 40%" 
    }
  ]} 
/>

## 其他新功能

...其餘文章內容...
```

## 注意事項

1. MDX 組件必須以 JSX 語法使用，包括正確的閉合標籤
2. 對於組件屬性中的數據，使用花括號 `{}` 包裹 JavaScript 表達式
3. 確保組件名稱與導入的名稱完全匹配，包括大小寫
4. 在你的任何 MDX 文件中，只要導入了組件，就可以直接使用

## 添加更多自定義組件

如果你想添加更多自定義組件，請按照以下步驟：

1. 在 `components/mdx/` 目錄下創建新的組件
2. 在 `components/mdx/MDXComponents.tsx` 文件中導入並添加該組件
3. 在 `app/components/MDXContent.tsx` 中也導入並添加該組件
4. 現在你可以在任何 MDX 文件中使用這個新組件了

## 故障排除

如果你在使用自定義組件時遇到問題：

- 確保組件名稱拼寫正確，包括大小寫
- 檢查是否提供了所有必需的屬性
- 在開發模式下啟動應用程序，以便查看詳細的錯誤信息
- 如果遇到 "Component is not defined" 錯誤，檢查是否已在 MDXContent.tsx 中正確導入並添加了該組件
