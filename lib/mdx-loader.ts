/**
 * 動態加載特定博客文章的MDX組件
 * 這個檔案實現了一個系統，可以根據文章slug動態加載該文章的自定義組件
 */

import path from 'path';
import fs from 'fs';
import { cache } from 'react';

// 使用React的cache功能確保同一個請求中不會重複加載組件
export const getPostComponents = cache(async (slug: string) => {
  try {
    // 檢查該文章是否有自定義組件目錄
    const componentsDir = path.join(process.cwd(), 'content/posts', slug, 'components');
    
    if (!fs.existsSync(componentsDir)) {
      console.log(`No custom components directory found for post: ${slug}`);
      // 如果找不到組件目錄，只返回全局組件
      const globalComps = await import('@/components/mdx/global-components');
      return globalComps;
    }

    // 嘗試導入局部組件
    try {
      const postComponents = await import(`@content/posts/${slug}/components/index`);
      const globalComponents = await import('@/components/mdx/global-components');
      
      // 合併全局和局部組件，優先使用局部組件
      return {
        ...globalComponents,
        ...postComponents
      };
    } catch (importError) {
      console.error(`Error importing components for ${slug}:`, importError);
      // 如果導入出錯，返回全局組件
      const globalComps = await import('@/components/mdx/global-components');
      return globalComps;
    }
  } catch (error) {
    console.error(`Error loading components for post ${slug}:`, error);
    // 如果任何錯誤發生，返回全局組件
    const globalComps = await import('@/components/mdx/global-components');
    return globalComps;
  }
});
