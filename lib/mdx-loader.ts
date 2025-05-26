/**
 * 動態加載特定博客文章的MDX組件
 * 這個檔案實現了一個系統，可以根據文章slug動態加載該文章的自定義組件
 */

import path from 'path';
import fs from 'fs';
import { cache } from 'react';

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
      // 使用動態導入但避免序列化問題
      const postComponentsModule = await import(`@content/posts/${slug}/components/index`);
      
      // 只提取組件名稱，避免序列化函數
      const componentNames = Object.keys(postComponentsModule).filter(key => key !== 'default');
      
      // 創建一個只包含組件名稱的對象，實際組件將在客戶端載入
      const postComponents: Record<string, any> = {};
      componentNames.forEach(name => {
        if (postComponentsModule[name]) {
          postComponents[name] = postComponentsModule[name];
        }
      });
      
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