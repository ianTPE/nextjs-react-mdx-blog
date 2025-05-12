# 如何在 MDX 文章中使用自定義組件

本文是一個示例，說明如何在 MDX 文章中使用自定義組件，特別是 `VersionComparisonTable` 組件。

## 示例：Next.js 15 與 14 版本比較文章

以下是一個使用 `VersionComparisonTable` 組件的文章示例：

```mdx
---
title: 'Next.js 15 入門指南'
date: '2024-04-25'
author: 'Ian Chen'
excerpt: '了解 Next.js 15 的新功能和改進，以及如何從 Next.js 14 遷移。'
tags: ['Next.js', 'React', 'Web Development']
coverImage: '/images/getting-started-with-nextjs.jpg'
---

## Next.js 15 與 14 版本的主要差異

Next.js 15 在 14 版本的基礎上進行了多項重要改進和功能強化。以下是主要差異：

<VersionComparisonTable />

## Next.js 15 的重大優勢與新特性

Next.js 15 在原有 App Router、Server Components、Edge Rendering 等基礎上，進一步強化了開發效率、效能與 DX（Developer Experience）。

// 文章其餘部分...
```

## 关键点

請注意在上述例子中：

1. MDX 文件中沒有 import 語句。這是因為在我們的配置中，所有自定義組件都已經在 `MDXContent.tsx` 中註冊
2. 直接使用 `<VersionComparisonTable />` 標簽即可調用組件
3. 所有 MDX 文件都可以訪問這些全局註冊的組件，不需要在每個文件中單獨導入

## 故障排除

如果你在博客文章中使用 `VersionComparisonTable` 組件時遇到問題：

1. 確保你的 `app/components/MDXContent.tsx` 文件已經正確導入並註冊了該組件
2. 確保組件名稱的大小寫完全一致
3. 不要嘗試在 MDX 文件中使用 import 語句導入該組件，應該使用全局註冊的方式
4. 如果需要修改組件展示的數據，應該修改 `components/mdx/VersionComparisonTable.tsx` 文件中的 `features` 數組

## 擴展閱讀

有關 MDX 組件使用的更多信息，請參考項目中的 `USING_CUSTOM_MDX_COMPONENTS.md` 文件。
