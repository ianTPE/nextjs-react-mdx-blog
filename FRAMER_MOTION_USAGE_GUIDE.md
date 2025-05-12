# Framer Motion 使用規範

為了優化部落格的效能，我們重新架構了 Framer Motion 的使用方式。

## 使用規則

1. **限制使用範圍**
   - 只在首頁和主要行銷頁面使用 Framer Motion
   - 部落格文章內容頁面使用靜態版本的組件
   - 列表頁面（如部落格文章列表）使用靜態版本的組件

2. **組件對應表**

   | 動畫組件 | 靜態替代品 | 使用位置 |
   |---------|-----------|---------|
   | MotionCard.tsx | MotionCard.static.tsx | 動畫：首頁和行銷頁 / 靜態：部落格文章列表 |
   | BlogPostContent.tsx | BlogPostContent.static.tsx | 動畫：特色頁面 / 靜態：部落格文章內容 |
   | HomeHero.tsx | 無需替代（只用於首頁） | 首頁 |
   | MotionContainer.tsx | 無需替代（只用於首頁和行銷頁面） | 首頁和行銷頁面 |
   | BlogCardAnimated.tsx | BlogCard.tsx | 動畫：首頁 / 靜態：部落格文章列表 |

3. **文件內容**
   - MDX 內容渲染不使用 Framer Motion
   - 代碼塊和其他展示元素使用純 CSS 動畫

## 效能提升說明

通過這種方式劃分 Framer Motion 的使用範圍，我們可以：

- 減少初始加載的 JavaScript 大小
- 提高文章內容頁面的渲染速度
- 保持首頁和重要頁面的豐富動畫體驗
- 降低滾動和交互時的卡頓

## 組件使用指南

### 首頁和行銷頁面

```tsx
// 正確：在首頁使用 MotionCard
import MotionCard from '@/components/animation/MotionCard';

// 正確：在首頁使用動畫版 BlogCard
import BlogCardAnimated from '@/app/components/BlogCardAnimated';
```

### 部落格文章列表和內容頁面

```tsx
// 正確：在文章列表使用 MotionCardStatic
import MotionCardStatic from '@/components/animation/MotionCard.static';

// 正確：在文章頁面使用 BlogPostContentStatic
import BlogPostContentStatic from '@/app/components/BlogPostContent.static';
```

## 注意事項

1. 新增組件時，請評估是否需要動畫版本和靜態版本
2. 對於需要動畫效果的組件，請先建立靜態 CSS 替代方案
3. 保持兩個版本的組件界面一致，以便於維護和切換
