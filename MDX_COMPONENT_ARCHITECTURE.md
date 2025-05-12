# MDX 組件架構

本文檔說明了博客系統中 MDX 組件的架構和使用方法。

## 架構概述

我們的 MDX 組件架構遵循**組件/內容分離**的原則，同時支持**局部組件**和**全局組件**。

```
project/
├── app/                     # Next.js App Router
│   └── blog/
│       └── [slug]/
│           ├── page.tsx     # 動態加載 MDX 與組件
│           └── MDXRenderer.tsx # MDX 渲染器
├── content/                 # 內容文件
│   └── posts/
│       └── [post-slug]/
│           ├── content.mdx  # 文章內容
│           └── components/  # 文章專用組件
│               ├── index.ts # 組件導出索引
│               └── CustomComponent.tsx # 文章專用組件
├── components/
│   └── mdx/
│       └── global-components/ # 全局 MDX 組件
│           ├── index.ts      # 全局組件導出索引
│           └── Alert.tsx     # 全局可用的組件
└── lib/
    └── mdx-components-loader.ts # 組件加載系統
```

## 核心概念

### 1. 組件層級

系統支持兩種級別的組件:

- **全局組件**: 在 `components/mdx/global-components/` 中定義，所有文章可用
- **局部組件**: 在 `content/posts/[slug]/components/` 中定義，僅特定文章可用

### 2. 組件優先級

當全局和局部組件同名時，**局部組件優先**。這允許文章覆蓋全局組件的行為。

### 3. 使用方式

在 MDX 文件中，可以直接使用組件名稱，不需要導入:

```mdx
## 我的文章標題

<VersionComparisonTable />

<Alert type="info">這是一個提示</Alert>
```

## 添加新組件

### 添加全局組件

1. 在 `components/mdx/global-components/` 中創建組件文件
2. 將組件添加到 `components/mdx/global-components/index.ts` 中導出
3. 確保組件添加了 `'use client'` 指令 (如果它包含交互元素)

### 添加特定文章的組件

1. 在文章目錄下創建 `components` 文件夾 (如果不存在)
2. 添加組件文件，例如 `SpecialChart.tsx`
3. 在 `components/index.ts` 中導出組件
4. 在 MDX 文件中使用 `<SpecialChart />` 標籤

## 技術實現

### 組件加載流程

1. `getPostComponents` 函數為每篇文章動態加載組件
2. 首先檢查是否存在文章特定的組件目錄
3. 如果存在，加載該目錄下的所有組件
4. 合併全局組件和局部組件，優先使用局部組件
5. 將組件傳遞給 MDX 渲染器

### MDX 渲染流程

1. `page.tsx` 獲取文章內容和相關組件
2. `MDXRenderer.tsx` 負責序列化和渲染 MDX 內容
3. 使用 `next-mdx-remote` 處理 MDX 內容
4. 將組件傳遞給 `MDXRemote` 組件

## 最佳實踐

1. **明確組件職責**: 全局組件應該是通用的，局部組件應特定於文章主題
2. **保持命名一致**: 使用 PascalCase 命名所有組件
3. **添加TypeScript類型**: 為所有組件添加適當的 props 類型
4. **使用客戶端指令**: 對於交互性組件，記得添加 `'use client'` 指令
5. **組件索引文件**: 始終通過索引文件導出組件，使導入路徑保持簡潔

## 進階用法

### 1. 組件間通信

組件可以接受 props，通過 MDX 中的屬性傳遞:

```mdx
<Tabs defaultTab="react">
  <Tab id="react" label="React">React 代碼示例...</Tab>
  <Tab id="vue" label="Vue">Vue 代碼示例...</Tab>
</Tabs>
```

### 2. 動態生成內容

組件可以根據 props 動態生成內容:

```mdx
<FeatureMatrix features={['SSR', 'SSG', 'ISR']} frameworks={['Next.js', 'Gatsby', 'Remix']} />
```

### 3. 交互式組件

可以創建完全交互的組件:

```mdx
<InteractiveDemo initialCode="console.log('Hello')" />
```

## 故障排除

**問題**: "組件未定義"錯誤
**解決方案**: 確保組件已在 `index.ts` 文件中正確導出

**問題**: 組件不顯示
**解決方案**: 檢查組件名稱大小寫是否與導出一致

**問題**: 動態內容不更新
**解決方案**: 確保組件有 `'use client'` 指令

## 結論

這種架構提供了極大的靈活性，同時保持了代碼的組織和維護性。通過分離內容和組件，我們可以在保持 MDX 文件簡潔的同時，提供豐富的交互體驗。
