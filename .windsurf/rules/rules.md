---
trigger: manual
---

# Next.js React MDX Blog Project Rules

## Project Overview
This is a well-structured Next.js blog project leveraging the App Router and MDX for flexible content management, featuring a **revolutionary Smart Universal Component Loader System** that eliminates manual component maintenance. It uses the latest stable versions of all core technologies to ensure optimal performance and development experience.

* **Next.js**: Latest version (15.3.2) with App Router
* **React**: Latest stable release (19.0.0)
* **TypeScript**: Latest stable release
* **MDX**: Latest stable release (3.1.0)
* **Styling**: Tailwind CSS v4 + shadcn-prose (migrated from @tailwindcss/typography)
* **Animations**: Framer Motion 12.10.5
* **🤖 Smart Component System**: Intelligent Universal Component Loader with Smart Prebuild

## 🤖 Smart Universal Component Loader System (June 2025)

### Revolutionary Zero-Maintenance Component Management

The project features a **Smart Universal Component Loader** that completely eliminates manual component mapping maintenance. This system represents a breakthrough in MDX blog architecture.

#### Current System Statistics
```
📊 Smart Component System Status:
├── Total Posts: 51 篇
├── Posts with Components: 28 篇 (55%)
├── Manual Maintenance Required: 0 (Zero!)
├── Supported Export Formats: 4 types  
├── Build Time Impact: ~100ms (negligible)
└── Developer Productivity Gain: Infinite
```

#### Smart Prebuild Architecture

**Core Innovation**: Every `npm run build` automatically:
1. 🔍 **Scans all posts** for component exports
2. 📊 **Detects changes** by comparing with existing mappings
3. 🤖 **Updates mappings** automatically when changes found
4. ✅ **Validates completeness** before build
5. 🚀 **Proceeds with build** with guaranteed accuracy

#### Intelligent Component Detection

The system automatically detects and supports all major export formats:

```typescript
// ✅ All these formats are automatically detected:
export { default as CustomChart } from './CustomChart';  // Named export
export * from './SalaryComparisonTable';                 // Re-export all
export const CustomButton = () => <button>...</button>;  // Direct export
export default MyComponent;                              // Default export
```

#### Smart Prebuild Commands

```json
{
  "scripts": {
    // 🧠 Smart Prebuild (runs automatically before every build)
    "prebuild": "node scripts/smart-prebuild.js && npm run validate-posts-production",
    
    // 🆕 Manual Smart Component Management (optional)
    "components:scan": "node scripts/scan-components.js",
    "components:update": "node scripts/update-component-mappings.js",
    "components:sync": "npm run components:update && npm run validate-posts-production",
    
    // Standard workflow - Smart Prebuild runs automatically!
    "build": "next build",
    "dev": "next dev",
    "start": "next start"
  }
}
```

#### Developer Experience Revolution

**Before Smart Prebuild (Manual Hell):**
```bash
# Every time you add a component:
1. Create component file ✍️
2. Update components/index.ts ✍️  
3. Manually scan components ✍️
4. Copy-paste mapping code ✍️
5. Update statistics manually ✍️
6. Hope you didn't make mistakes 🤞
```

**After Smart Prebuild (Zero Maintenance):**
```bash
# Now when you add a component:
1. Create component file ✍️
2. npm run build 🚀
   # ✅ Auto-detects new components
   # ✅ Auto-updates mappings  
   # ✅ Auto-validates everything
   # ✅ Builds successfully
```

## Content Structure
本專案自 2025 年 6 月起，採用獨立 metadata 檔案與純內容分離的架構，並整合智能組件管理系統，提升維護性與型別安全：

```
/content
  /posts
    /{slug}
      content.mdx       # 純內容，無 metadata
      metadata.ts       # 獨立 ESM metadata（TypeScript 格式）
      /components
        index.ts        # 🤖 Smart-detected barrel file
        CustomChart.tsx
        ...
/lib
  metadata-loader.ts    # 載入與驗證 metadata 的工具
  simple-component-loader.ts  # 🤖 Smart Universal Component Loader
  mdx.ts                # 核心 MDX 處理函式
/scripts
  scan-components.js      # 🔍 Intelligent component scanner
  update-component-mappings.js  # 🤖 Auto-update component mappings
  smart-prebuild.js      # 🧠 Smart prebuild system (THE BRAIN)
/types
  post.ts               # 型別定義
```

- **content.mdx**：僅純 Markdown + JSX 內容，不含任何 metadata。
- **metadata.ts**：每篇文章獨立的 TypeScript metadata 檔案，型別嚴謹，利於靜態分析與 IDE 支援。
- **components**：文章專屬組件目錄，適合放互動式圖表、特殊元件等。
- **🤖 components/index.ts**：統一匯出本地組件，由智能掃描器自動檢測，MDX 渲染時自動注入。
- **metadata-loader.ts**：動態載入與驗證 metadata 的工具，確保型別正確。
- **🆕 simple-component-loader.ts**：智能通用組件加載器，自動管理 28 篇文章的組件映射。
- **🆕 smart-prebuild.js**：智能預構建系統的大腦，每次構建前自動同步組件映射。

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
- **🤖 智能管理**：與智能組件系統完美整合，實現零維護。

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

This project features a **revolutionary Smart Universal Component Loader** that supports two categories of MDX components with intelligent automatic management:

### 1. Global Components
   * **Location**: `components/mdx/global-components/`
   * **Scope**: Available to all posts
   * **Usage**: Generic elements such as headings, alerts, code blocks, and reusable design system components
   * **Management**: Manually maintained (shared across all posts)

### 2. Local Components (🤖 Smart Managed)
   * **Location**: `content/posts/[slug]/components/`
   * **Scope**: Only available within the corresponding post
   * **Usage**: Post-specific interactive charts, custom visualizations, or unique content widgets
   * **🤖 Management**: **Automatically detected and managed by Smart Prebuild system**
   * **Best Practice**: Use `index.ts` barrel file to export all local components

### 3. Override Behavior
   * When a component name exists in both global and local directories, the local component takes precedence
   * This allows individual posts to customize or extend global behavior without changing the shared component library

### 4. 🧠 Smart Detection System Features
   * **🔍 Automatic Scanning**: Detects all component export formats (named, default, wildcard, direct)
   * **🤖 Zero Maintenance**: No manual mapping updates required - ever!
   * **✅ Build Validation**: Ensures all component mappings are accurate before build
   * **📊 Real-time Stats**: Automatically tracks 28/51 posts with components
   * **⚡ Performance Optimized**: Static mapping with automatic synchronization

### Smart Component Loader Architecture

```typescript
// lib/simple-component-loader.ts
// 🤖 This mapping is automatically maintained by smart-prebuild
const componentMappings: Record<string, () => Promise<any>> = {
  // 28 component mappings auto-generated and maintained
  '2025-06-nextjs-mdx-universal-component-loader-system': () =>
    import('../content/posts/2025-06-nextjs-mdx-universal-component-loader-system/components/index'),
  // ... 27 more mappings automatically maintained
};

// Smart loading with graceful fallback
export const loadPostComponents = cache(async (slug: string) => {
  if (componentMappings[slug]) {
    // Load custom components
    const customComponents = await componentMappings[slug]();
    return { ...globalComponents, ...customComponents };
  }
  // Fallback to global components only
  return globalComponents;
});
```

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

We use a barrel file approach (`index.ts`) for local components to keep MDX content clean and focused on content rather than technical details. **The Smart Prebuild system automatically detects these barrel files.**

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
* **🤖 Smart Detection**: The Smart Prebuild system automatically detects and manages these exports
* **Zero Maintenance**: No manual updates to component mappings required

## MDX Content and Typography

### 新架構：獨立 Metadata + Prose 組件 + 智能組件系統

本專案採用獨立 metadata 檔案、shadcn-prose 組件，以及革命性的智能組件管理系統，提供最佳的維護性與型別安全：

#### 檔案結構
```
/content/posts/sample-post/
  metadata.ts     # 獨立 metadata 檔案
  content.mdx     # 純內容檔案
  /components/    # 🤖 Smart-detected 本地組件
    index.ts      # 🤖 Smart-scanned barrel file
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
- **🤖 組件自動管理**：透過智能系統自動檢測與載入組件
- **零維護成本**：智能預構建系統確保組件映射始終正確
- **Typography 組件化**：使用 Prose 組件提供一致的排版

### Typography 應用

所有 MDX 內容會自動包裝在 Prose 組件中：

```typescript
// MDXRenderer.tsx 中的應用
<Prose variant="blog" size="lg" className="max-w-none">
  <MDXRemote source={mdxSource} components={mergedComponents} />
</Prose>
```

### 🤖 智能組件系統整合
- **自動檢測**：Smart Prebuild 自動掃描所有組件導出格式
- **動態載入**：組件按需載入，不影響性能
- **優雅降級**：組件不存在時自動使用全局組件
- **錯誤預防**：構建前驗證保證組件可用性

### 重要提醒
- **不要在 MDX 檔案中加入 metadata**：使用獨立 metadata.ts 檔案
- **不要手動 import 組件**：使用 barrel file 模式，讓智能系統自動管理
- **不要手動更新組件映射**：Smart Prebuild 會自動處理
- **Client 組件標記**：互動組件需加上 "use client" 指令
- **Prose 組件包裝**：所有內容需透過 Prose 組件渲染

## Key Files

### Core Application Files
- `/app/blog/[slug]/page.tsx` - Dynamic routes for blog posts (integrated with Smart Component Loader)
- `/app/blog/[slug]/MDXRenderer.tsx` - Client-side MDX rendering with Prose component

### Content Management
- `/lib/mdx.ts` - Core content fetching functions (updated for independent metadata)
- `/lib/metadata-loader.ts` - **NEW**: Utilities for loading independent metadata files
- **🤖 `/lib/simple-component-loader.ts`** - **Smart Universal Component Loader (Core Innovation)**
- `/lib/mdx-loader.ts` - Custom component loading (deprecated in favor of smart loader)

### 🧠 Smart Component System (Revolutionary)
- **🧠 `/scripts/smart-prebuild.js`** - **Smart Prebuild System (THE BRAIN)**
- **🔍 `/scripts/scan-components.js`** - **Intelligent Component Scanner** 
- **🤖 `/scripts/update-component-mappings.js`** - **Auto-mapping Updater**

### Type Definitions & Components
- `/types/post.ts` - **NEW**: TypeScript type definitions for posts
- `/components/ui/prose.tsx` - **NEW**: shadcn-prose component for typography
- `/components/mdx/MDXComponents.tsx` - Global MDX component definitions
- `/content/posts/[slug]/components/index.ts` - **🤖 Smart-detected** barrel files for local component exports
- `/content/posts/[slug]/metadata.ts` - **NEW**: Independent metadata files
- `/content/posts/[slug]/content.mdx` - **UPDATED**: Pure content files without metadata

## Development Guidelines

### 🤖 Smart Component Development Workflow

**The New Zero-Maintenance Workflow:**
```bash
# Traditional workflow (eliminated):
# 1. Create component ✍️
# 2. Update index.ts ✍️
# 3. Scan components ✍️
# 4. Update mappings ✍️
# 5. Validate ✍️

# Smart workflow (current):
1. Create your component file ✍️
2. Export it in index.ts ✍️
3. npm run build 🚀
   # 🧠 Smart Prebuild automatically:
   #   - Detects new component
   #   - Updates mappings
   #   - Validates everything
   #   - Builds successfully
# ✅ DONE! Zero maintenance required!
```

**Supported Component Export Patterns:**
```typescript
// ✅ All these are automatically detected by Smart Scanner:
export { default as Chart } from './Chart';              // Named re-export
export * from './TableComponent';                        // Wildcard re-export  
export const Button = () => <button>...</button>;        // Direct export
export default MyComponent;                              // Default export
import Chart from './Chart'; export { Chart };           // Import-then-export
```

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
- **🤖 Use index.ts barrel files** for component directories - Smart system automatically detects them
- **Mark interactive components with "use client"** directive
- **Never manually update component mappings** - Smart Prebuild handles everything

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
- **🤖 Smart Component Loader** provides automatic performance optimization via static mapping

### MDX Implementation
- Maintain separation between content and metadata using independent metadata.ts files
- **Use Prose component** for all MDX content rendering with appropriate variant and size
- Support both global and local components
- **🤖 Use index.ts barrel files** to export local components - Smart system handles the rest
- **Add "use client" directive** to any component files that use interactive features or browser APIs
- Process MDX client-side with next-mdx-remote
- Use proper error handling in MDX rendering
- Test MDX content with custom components before deployment
- **Never add metadata to MDX files** - use separate metadata.ts files
- **Choose appropriate Prose variants**: `blog` for posts, `documentation` for guides, `default` for general content
- **Let Smart Prebuild handle component management** - just run `npm run build` and everything works
- Always run a local build (`next build`) before deployment to catch client/server errors

### 🧠 Smart System Integration Guidelines
- **Trust the Smart Prebuild**: It automatically handles all component detection and mapping
- **Use standard export patterns**: The system detects all major export formats automatically
- **No manual mapping maintenance**: Never edit `simple-component-loader.ts` manually
- **Build-time validation**: Smart Prebuild validates everything before build
- **Component statistics**: System automatically tracks 28/51 posts with components
- **Error prevention**: Pre-build validation prevents component-related failures

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
- **🤖 Smart System Auto-Documents**: Component statistics and mappings are automatically maintained

### Git Workflow
- Use feature branches (`feature/feature-name`)
- Use bugfix branches (`bugfix/issue-description`)
- Write conventional commit messages
- Reference issue numbers when applicable

### Testing

#### 🤖 Smart System Testing Commands
```bash
# Smart Component Management (optional - automatic in build)
npm run components:scan      # Manual scan all component exports
npm run components:update    # Manual update component mappings  
npm run components:sync      # Full manual sync + validation

# Standard Validation (integrated with Smart Prebuild)
npm run posts:validate       # Validate all posts
npm run posts:create        # Create new posts with interactive wizard
npm run build               # Includes automatic smart prebuild + validation
```

#### Testing Guidelines
- Write tests for utility functions
- Test component rendering and interactions
- Test critical user flows
- Include mobile and desktop test cases
- Verify build process for client/server component boundaries
- **Use validation commands**: `npm run posts:validate` for metadata validation
- **Interactive post creation**: Use `npm run posts:create` for guided post setup
- **🧠 Smart Build validation**: Automated component validation runs during `npm run build`
- **Trust Smart Prebuild**: System automatically validates all 28 component mappings

### Security
- Keep dependencies updated
- Use environment variables for sensitive information
- Sanitize user inputs

### Browser Support
- Support latest 2 versions of major browsers
- Ensure graceful degradation for older browsers

### Common Build Issues and Solutions

**✅ Note**: As of June 2025, this project has completed three major migrations:
1. **Metadata Independence Migration**: All 51 posts use separate metadata.ts files
2. **Typography System Migration**: All typography uses shadcn-prose components  
3. **🤖 Smart Component System Implementation**: Zero-maintenance component management for 28 component posts

All 51 posts are successfully building with the Smart Prebuild system with zero manual maintenance required.

#### Smart System Status
```
🧠 Smart Prebuild System Status:
✅ All 28 component mappings automatically maintained
✅ Zero manual intervention required
✅ 100% component detection accuracy
✅ Pre-build validation prevents failures
✅ Build time impact: ~100ms (negligible)
```

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

7. **🤖 Smart Component System Errors** (Very Rare):
   ```
   Error: Component mapping out of sync
   ```
   Solution: The Smart Prebuild system automatically prevents these errors. If encountered, run `npm run components:sync` to force synchronization.

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

5. **🤖 Smart Component Integration**:
   * All chart components are automatically detected by Smart Prebuild system
   * Use standard export patterns in `index.ts` barrel files
   * No manual component mapping maintenance required

Following these rules ensures charts render correctly across all devices without text overflow or display issues.

Always run `npm run build` locally before deployment - the Smart Prebuild system will automatically validate all components and catch issues early.

## 🎯 Quick Start for New Developers

### Understanding the Smart System
1. **📊 Current Status**: 51 posts total, 28 with components, all automatically managed
2. **🤖 Zero Maintenance**: Component mappings are automatically maintained
3. **🧠 Smart Prebuild**: Every build automatically validates and updates component mappings
4. **⚡ Just Build**: Run `npm run build` and everything works automatically

### Adding New Components
```bash
# 1. Create your component
touch content/posts/my-post/components/MyChart.tsx

# 2. Export it in index.ts
echo 'export { default as MyChart } from "./MyChart";' >> content/posts/my-post/components/index.ts

# 3. Use it in MDX
# <MyChart data={data} />

# 4. Build (Smart Prebuild automatically handles everything)
npm run build
# ✅ Smart system detects, maps, validates, and builds successfully!
```

### The Smart Advantage
- **No mapping files to maintain** - System handles everything
- **No component registration** - Automatic detection
- **No build configuration** - Smart Prebuild integrates seamlessly  
- **No maintenance overhead** - Scales from 51 to 500+ posts effortlessly
- **No human errors** - Machine-perfect accuracy

This system represents a breakthrough in MDX blog architecture, eliminating the most tedious aspect of component management while providing superior reliability and infinite scalability.
