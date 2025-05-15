/**
 * 動態加載特定博客文章的MDX組件
 * 這個檔案實現了一個系統，可以根據文章slug動態加載該文章的自定義組件
 */

import path from 'path';
import fs from 'fs';
import { cache } from 'react';

// 使用React的cache功能確保同一個請求中不會重複加載組件
// Import global components
import * as globalComponents from '@/components/mdx/global-components';

export const getPostComponents = cache(async (slug: string) => {
  try {
    // 檢查該文章是否有自定義組件目錄
    const componentsDir = path.join(process.cwd(), 'content/posts', slug, 'components');
    
    if (!fs.existsSync(componentsDir)) {
      console.log(`No custom components directory found for post: ${slug}`);
      // 返回全局組件
      return { ...globalComponents };
    }

    // 嘗試導入局部組件
    try {
      // 注意：這裡我們僅返回模塊，而不是模塊的預設導出，來避免序列化問題
      const postComponents = await import(`@content/posts/${slug}/components/index`);
      
      // 合併全局組件和局部組件
      return { 
        ...globalComponents,
        ...postComponents
      };
    } catch (importError) {
      console.error(`Error importing components for ${slug}:`, importError);
      // 如果導入出錯，返回全局組件
      return { ...globalComponents };
    }
  } catch (error) {
    console.error(`Error loading components for post ${slug}:`, error);
    // 如果任何錯誤發生，返回全局組件
    return { ...globalComponents };
  }
});