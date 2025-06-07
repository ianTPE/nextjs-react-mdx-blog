---
trigger: manual
---

# Next.js React MDX Blog Project Rules

## Project Overview
This is a well-structured Next.js blog project leveraging the App Router and MDX for flexible content management. It uses the latest stable versions of all core technologies to ensure optimal performance and development experience.

* **Next.js**: Latest version with App Router
* **React**: Latest stable release
* **TypeScript**: Latest stable release
* **MDX**: Latest stable release
* **Styling**: Tailwind CSS v4 + shadcn-prose (migrated from @tailwindcss/typography)
* **Animations**: Framer Motion

## Content Structure
本專案自 2025 年 6 月起，採用獨立 metadata 檔案與純內容分離的架構，提升維護性與型別安全：

```
/content
  /posts
    /{slug}
      content.mdx       # 純內容，無 metadata
      metadata.ts       # 獨立 ESM metadata（TypeScript 格式）
      /components
        index.ts        # Barrel file 匯出所有本地組件
        CustomChart.tsx
        ...
/lib
  metadata-loader.ts    # 載入與驗證 metadata 的工具
  mdx.ts                # 核心 MDX 處理函式
/types
  post.ts               # 型別定義
```

- **content.mdx**：僅純 Markdown + JSX 內容，不含任何 metadata。
- **metadata.ts**：每篇文章獨立的 TypeScript metadata 檔案，型別嚴謹，利於靜態分析與 IDE 支援。
- **components**：文章專屬組件目錄，適合放互動式圖表、特殊元件等。
- **components/index.ts**：統一匯出本地組件，MDX 渲染時自動注入，無需手動 import。
- **metadata-loader.ts**：動態載入與驗證 metadata 的工具，確保型別正確。
- **post.ts**：定義 PostMeta、Post 等型別。

#### Metadata 型別定義與範例

```typescript
// types/post.ts
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published: boolean;
  author?: string;
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}
```

```typescript
// content/posts/sample-post/metadata.ts
import type { PostMeta } from '../../../types/post';

const metadata: PostMeta = {
  slug: "sample-post",
  title: "Sample Blog Post",
  date: "2025-06-05",
  summary: "A comprehensive guide to...",
  tags: ["Next.js", "MDX", "React"],
  author: "Ian Chou",
  published: true,
  coverImage: "/images/posts/sample.webp"
};

export default metadata;
```

#### 為何拆分 metadata？
- **效能**：僅需 metadata 時，無需讀取整份 MDX 內容。
- **型別安全**：完整 TypeScript 支援，減少錯誤。
- **工具整合**：如 sitemap、RSS、SEO 等可直接消費 metadata。
- **維護便利**：內容與結構分離，易於 refactor。

## Typography System (shadcn-prose)
本專案已於 2025 年 6 月完成從 `@tailwindcss/typography` 遷移至 `shadcn-prose`，提供更好的 React 組件整合與型別安全。

### 核心變更
- **組件化排版**：從 CSS 類別轉為 React 組件方式
- **shadcn/ui 整合**：與現有設計系統完美統一
- **型別安全**：完整 TypeScript 支援
- **動態配置**：支援 props 傳入與條件式樣式

### 使用方式
```typescript
// 舊方式（CSS 類別）
<div className="prose prose-lg dark:prose-invert max-w-none">
  {mdxContent}
</div>

// 新方式（React 組件）
<Prose variant="blog" size="lg" className="max-w-none">
  {mdxContent}
</Prose>
```

### Prose 組件特性
- **多種變體**：支援 `default`、`blog`、`documentation` 等風格
- **尺寸控制**：`sm`、`base`、`lg`、`xl` 大小選項
- **深色模式**：自動適配 dark/light 主題
- **響應式**：跨裝置最佳化顯示
- **可擴展**：易於新增自定義變體

### 重要檔案
- `/components/ui/prose.tsx`：shadcn-prose 主要組件
- `/app/blog/[slug]/MDXRenderer.tsx`：已更新使用 Prose 組件

### 開發指引
- 所有 MDX 內容必須使用 `<Prose>` 組件包裝
- 可根據內容類型選擇適當的 `variant` 和 `size`
- 自定義樣式應透過 `className` prop 傳入
- 維持與 shadcn/ui 設計系統一致性

## Component Architecture
This project supports two categories of MDX components, with a clear override mechanism:

1. **Global Components**
   * Location: `components/mdx/global-components/`
   * Scope: Available to all posts.
   * Usage: Generic elements such as headings, alerts, code blocks, and reusable design system components.

2. **Local Components**
   * Location: `content/posts/[slug]/components/`
   * Scope: Only available within the corresponding post.
   * Usage: Post-specific interactive charts, custom visualizations, or unique content widgets.
   * **Best Practice**: Use `index.ts` barrel file to export all local components, which allows for cleaner MDX without import statements.

3. **Override Behavior**
   * When a component name exists in both global and local directories, the local component takes precedence.
   * This allows individual posts to customize or extend global behavior without changing the shared component library.

## Server and Client Components

- Next.js App Router 預設為 Server Component，需互動的元件必須加上 `"use client"`。
- 只要有下列情境，務必於檔案最上方加入 `"use client"`：
  - 使用 Chart.js、Recharts 等前端視覺化函式庫
  - 操作瀏覽器 API（如 window、document、localStorage）
  - 使用 React hooks（useState、useEffect、useRef 等）
  - 需要用戶互動（事件處理、表單等）
  - 匯入其他 client component
- 若 `index.ts` barrel file 匯出 client component，亦需加上 `"use client"`。

```typescript
// content/posts/[slug]/components/ChartComponent.tsx
"use client";

import React from 'react';
import { Chart } from 'chart.js';
// ...
```

#### 常見錯誤訊息
- 若忘記標註，Next.js 會出現：
  - `Functions cannot be passed directly to Client Components unless you explicitly expose it`
  - `Event handlers cannot be passed to Client Component props`
  - `React hooks can only be used in Client Components`
   ```typescript
   // content/posts/[slug]/components/index.ts
   "use client";
   
   import ChartComponent from './ChartComponent';
   export { ChartComponent };
   ```

3. **Build will fail** if client components are not properly marked, with errors like:
   * "Functions cannot be passed directly to Client Components unless you explicitly expose it"
   * "React hooks can only be used in Client Components"

## Local Components Best Practices

We use a barrel file approach (`index.ts`) for local components to keep MDX content clean and focused on content rather than technical details:

```typescript
// content/posts/[slug]/components/index.ts
"use client";  // Add this when exporting any client components

import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';
import CustomTable from './CustomTable';

export {
  ChartOne,
  ChartTwo,
  CustomTable
};
```

This approach provides several benefits:
* **Cleaner MDX Files**: No need for multiple import statements at the top of MDX files
* **Centralized Component Management**: All components are exported from a single location
* **Simplified Refactoring**: Component file names can be changed without updating MDX files
* **Automatic Namespacing**: When MDX is rendered, components are automatically available in the namespace

## MDX Content and Typography

### 新架構：獨立 Metadata + Prose 組件

本專案採用獨立 metadata 檔案與 shadcn-prose 組件，提供更好的維護性與型別安全：

#### 檔案結構
```
/content/posts/sample-post/
  metadata.ts     # 獨立 metadata 檔案
  content.mdx     # 純內容檔案
  /components/    # 本地組件
    index.ts      # Barrel file
    Chart.tsx
```

#### Metadata 檔案範例
```typescript
// content/posts/sample-post/metadata.ts
import type { PostMeta } from '../../../types/post';

const metadata: PostMeta = {
  slug: "sample-post",
  title: "Sample Blog Post",
  date: "2025-06-05",
  summary: "A comprehensive guide to...",
  tags: ["Next.js", "MDX", "React"],
  author: "Ian Chou",
  published: true,
  coverImage: "/images/posts/sample.webp"
};

export default metadata;
```

#### 純內容 MDX 檔案
```mdx
# Sample Post Title

Here is a post-specific chart:
<CustomChart data={chartData} />

And here is a global alert component:
<AlertBox type="warning">This is a warning message.</AlertBox>
```

#### 優點
- **純淨內容**：MDX 檔案僅包含內容，無 metadata 雜訊
- **型別安全**：完整 TypeScript 支援與 IDE 智能提示
- **渲染性能**：metadata 與內容分離載入，提升效能
- **組件自動注入**：透過 index.ts barrel file 自動載入本地組件
- **Typography 組件化**：使用 Prose 組件提供一致的排版

### Typography 應用

所有 MDX 內容會自動包裝在 Prose 組件中：

```typescript
// MDXRenderer.tsx 中的應用
<Prose variant="blog" size="lg" className="max-w-none">
  <MDXRemote source={mdxSource} components={mergedComponents} />
</Prose>
```

### 重要提醒
- **不要在 MDX 檔案中加入 metadata**：使用獨立 metadata.ts 檔案
- **不要手動 import 組件**：使用 barrel file 模式
- **Client 組件標記**：互動組件需加上 "use client" 指令
- **Prose 組件包裝**：所有內容需透過 Prose 組件渲染

## Key Files
- `/app/blog/[slug]/page.tsx` - Dynamic routes for blog posts
- `/app/blog/[slug]/MDXRenderer.tsx` - Client-side MDX rendering with Prose component
- `/lib/mdx.ts` - Core content fetching functions (updated for independent metadata)
- `/lib/metadata-loader.ts` - **NEW**: Utilities for loading independent metadata files
- `/lib/mdx-loader.ts` - Custom component loading
- `/types/post.ts` - **NEW**: TypeScript type definitions for posts
- `/components/ui/prose.tsx` - **NEW**: shadcn-prose component for typography
- `/components/mdx/MDXComponents.tsx` - Global MDX component definitions
- `/content/posts/[slug]/components/index.ts` - Barrel files for local component exports
- `/content/posts/[slug]/metadata.ts` - **NEW**: Independent metadata files
- `/content/posts/[slug]/content.mdx` - **UPDATED**: Pure content files without metadata

## Development Guidelines

### Responsive Design
- Use Tailwind's responsive prefixes (sm:, md:, lg:) for layout changes
- Charts: 14px minimum font size, optimize data for mobile, use `sm:` for desktop styles
- Apply `-ml-2 sm:ml-0` for proper mobile chart alignment
- Avoid fixed widths that cause horizontal scrolling
- Test all components on multiple device sizes

### Component Structure
- Place components in `/components` with PascalCase naming
- Group related components in subdirectories
- Keep components small and focused
- Use descriptive names; prefix utilities with `with`
- **Use index.ts barrel files** for component directories to simplify imports and MDX usage
- **Mark interactive components with "use client"** directive

### Code Style
- Use ES6+ and functional components with hooks
- Define prop types for all components
- Use TypeScript for new components
- Use Tailwind CSS primarily; CSS modules for complex styles
- Follow BEM for custom CSS classes
- Clearly distinguish between server and client components

### Performance
- Use Next.js `Image` component with specified dimensions
- Prefer WebP/AVIF formats
- Implement lazy loading for below-the-fold content
- Use dynamic imports for heavy components
- Consider `next/dynamic` for component-level code splitting
- Performance budget: 200KB bundle (gzipped), LCP < 2.5s, TTI < 5s on 3G
- Be mindful of the client/server boundary to minimize client-side JavaScript

### MDX Implementation
- Maintain separation between content and metadata using independent metadata.ts files
- **Use Prose component** for all MDX content rendering with appropriate variant and size
- Support both global and local components
- **Use index.ts barrel files** to export local components for cleaner MDX content
- **Add "use client" directive** to any component files that use interactive features or browser APIs
- Process MDX client-side with next-mdx-remote
- Use proper error handling in MDX rendering
- Test MDX content with custom components before deployment
- **Never add metadata to MDX files** - use separate metadata.ts files
- **Choose appropriate Prose variants**: `blog` for posts, `documentation` for guides, `default` for general content
- Always run a local build (`next build`) before deployment to catch client/server errors

### Typography System Guidelines
- **Always use Prose component** for MDX content rendering
- **Select appropriate variants**: Use `blog` for post content, `documentation` for technical guides
- **Size recommendations**: Use `lg` for main content, `base` for secondary content, `sm` for captions
- **Responsive considerations**: Prose component handles mobile optimization automatically
- **Custom styling**: Pass additional classes via `className` prop, maintain shadcn/ui consistency
- **Dark mode**: Prose component automatically handles dark/light theme transitions
- **Accessibility**: Prose component includes built-in accessibility enhancements

### Accessibility
- Use semantic HTML elements
- Ensure proper heading hierarchy (h1 > h2 > h3)
- Add alt text to all images
- Include ARIA labels where necessary
- Ensure keyboard accessibility
- Implement visible focus states
- Test tab order and navigation

### Documentation
- Document props with TypeScript interfaces
- Include usage examples in component files
- Keep README.md updated
- Document known limitations
- Document which components are client components

### Git Workflow
- Use feature branches (`feature/feature-name`)
- Use bugfix branches (`bugfix/issue-description`)
- Write conventional commit messages
- Reference issue numbers when applicable

### Testing
- Write tests for utility functions
- Test component rendering and interactions
- Test critical user flows
- Include mobile and desktop test cases
- Verify build process for client/server component boundaries
- **Use validation commands**: `npm run posts:validate` for metadata validation
- **Interactive post creation**: Use `npm run posts:create` for guided post setup
- **Build validation**: Automated validation runs during `npm run build`

### Security
- Keep dependencies updated
- Use environment variables for sensitive information
- Sanitize user inputs

### Browser Support
- Support latest 2 versions of major browsers
- Ensure graceful degradation for older browsers

### Common Build Issues and Solutions

**✅ Note**: As of June 2025, this project has completed two major migrations:
1. **Metadata Independence Migration**: All posts use separate metadata.ts files
2. **Typography System Migration**: All typography uses shadcn-prose components

All 42 posts have been successfully migrated and are building without errors.

1. **Client Component Error**:
   ```
   Error: Functions cannot be passed directly to Client Components unless you explicitly expose it
   ```
   Solution: Add "use client" directive at the top of component files and their index.ts exports.

2. **React Hooks Error**:
   ```
   Error: React hooks can only be used in Client Components
   ```
   Solution: Add "use client" directive to any component using React hooks.

3. **Browser API Error**:
   ```
   ReferenceError: window is not defined
   ```
   Solution: Add "use client" directive or use next/dynamic with ssr: false option.

4. **Import Cycle Error**:
   ```
   Error: Import trace for requested module contains a cycle
   ```
   Solution: Restructure imports to avoid circular dependencies between client and server components.

5. **Metadata Validation Error**:
   ```
   Error: Missing required field 'title' in post-slug/metadata.ts
   ```
   Solution: Ensure all required fields (title, date, summary, tags, published) are present in metadata.ts files. Use `npm run posts:validate` to check all posts.

6. **Typography Component Error**:
   ```
   Error: Cannot find module '@/components/ui/prose'
   ```
   Solution: Ensure shadcn-prose component is properly installed and configured. All MDX content must be wrapped in Prose component.

## Responsive Chart Component Rules

### Requirements for All Chart Components

All chart components in this project must follow these requirements to ensure proper display across devices:

1. **Container Structure**:
   * Use flexible height with minimum and maximum constraints: 
     ```jsx
     <div className="p-4 pb-8 bg-white rounded-lg shadow-md min-h-[300px] max-h-[350px] sm:min-h-[350px] sm:max-h-[400px] lg:min-h-[400px] lg:max-h-[500px] flex flex-col items-center mb-4">
     ```
   * Include bottom padding (`pb-8`) to accommodate footnotes/captions
   * Add vertical margin (`mb-4`) to prevent content overlap in MDX

2. **Responsive Configuration**:
   * Define screen breakpoint detection:
     ```typescript
     const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;
     ```
   * Adjust `maintainAspectRatio` dynamically:
     ```typescript
     maintainAspectRatio: isDesktop, // true for desktop, false for mobile
     ```
   * Position legends appropriately by screen size:
     ```typescript
     legend: {
       position: (isDesktop ? 'bottom' : 'right') as 'bottom' | 'right',
     }
     ```

3. **Type Safety**:
   * Import correct TypeScript types:
     ```typescript
     import { type TooltipItem } from 'chart.js';
     ```
   * Use proper typing for chart callbacks:
     ```typescript
     label: (context: TooltipItem<'pie'>) => { /* ... */ }
     ```
   * Use arrow functions instead of function expressions

4. **Footnotes/Caption Structure**:
   * Place captions within chart container as siblings to chart component
   * Use consistent styling:
     ```jsx
     <div className="text-sm text-gray-500 mt-2 text-center">
       *Caption text here
     </div>
     ```

Following these rules ensures charts render correctly across all devices without text overflow or display issues.

Always run `next build` locally before deployment to catch these issues early.
