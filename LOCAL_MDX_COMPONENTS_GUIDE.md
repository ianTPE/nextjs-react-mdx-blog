# 使用局部 MDX 組件的指南

本指南說明如何在每篇博客文章中使用局部 MDX 組件，讓每篇文章可以有自己獨特的組件。

## 基本原則

在我們的博客系統中，有兩種使用自定義組件的方式：
1. **全局組件**：放在 `components/mdx/` 目錄下，所有文章都可以直接使用
2. **局部組件**：放在每篇文章自己的目錄下，只有該文章可以使用

本指南著重說明第二種方式：局部組件。

## 如何創建和使用局部組件

### 步驟 1：創建組件文件

在您的博客文章目錄中創建組件文件，例如：
```
content/posts/your-post-slug/YourComponent.tsx
```

組件示例：
```tsx
'use client';

import React from 'react';

interface YourComponentProps {
  title?: string;
  // 其他屬性...
}

export default function YourComponent({ title = "預設標題" }: YourComponentProps) {
  return (
    <div className="my-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      {/* 其他組件內容... */}
    </div>
  );
}
```

### 步驟 2：在 MDX 文件中導入和使用

在同一目錄的 `content.mdx` 文件中導入並使用您的組件：

```mdx
---
title: '您的文章標題'
date: '2024-05-01'
author: '作者名稱'
excerpt: '文章摘要...'
tags: ['標籤1', '標籤2']
---

import YourComponent from './YourComponent';

# 文章標題

這是文章內容的開頭...

<YourComponent title="自定義標題" />

更多文章內容...
```

## 支持的組件類型

您可以創建各種類型的組件：

1. **數據展示組件**：如表格、圖表、比較卡片等
2. **互動組件**：如選項卡、折疊面板、輪播圖等
3. **特殊格式組件**：如程式碼範例、注意事項框、引用塊等

## 最佳實踐

1. **命名規範**：使用 PascalCase 命名組件文件和組件本身
2. **局部性原則**：如果組件只在一篇文章中使用，就放在該文章目錄下
3. **添加 `'use client'` 指令**：如果組件包含互動元素，記得添加此指令
4. **類型定義**：使用 TypeScript 接口清晰定義組件屬性
5. **樣式隔離**：確保組件樣式不會影響其他內容

## 已知限制

1. 在開發模式下，當您修改局部組件時，可能需要重新啟動開發服務器
2. 不要在局部組件中導入大型庫，以避免增加不必要的頁面大小
3. 如果多篇文章需要同一個組件，考慮將其移至全局組件目錄

## 示例：版本比較表

查看 `content/posts/getting-started-with-nextjs/` 目錄中的 `VersionComparisonTable.tsx` 作為示例。

## 如何判斷應該使用局部組件還是全局組件？

- **使用局部組件**：當組件非常特定於某篇文章，不太可能在其他文章中重用
- **使用全局組件**：當組件可能在多篇文章中使用，或者是常見的展示模式

## 故障排除

如果您在使用局部組件時遇到問題：

1. 確保導入路徑正確（`./YourComponent`）
2. 確保組件文件名與導入名稱完全一致（包括大小寫）
3. 檢查組件是否有語法錯誤
4. 如果更改未生效，嘗試重新啟動開發服務器
