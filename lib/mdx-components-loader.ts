'use server';

/**
 * 動態加載特定博客文章的MDX組件
 * 這個文件實現了一個系統，可以根據文章slug動態加載該文章的自定義組件
 */

import path from 'path';
import fs from 'fs';
import { cache } from 'react';

// 默認MDX全局組件，當找不到特定組件時使用
import * as globalComponents from '@/components/mdx/global-components';

// 使用React的cache功能確保同一個請求中不會重複加載組件
export const getPostComponents = cache(async (slug: string) => {
  try {
    // 檢查該文章是否有自定義組件目錄
    const componentsDir = path.join(process.cwd(), 'content/posts', slug, 'components');
    if (!fs.existsSync(componentsDir)) {
      console.log(`No custom components directory found for post: ${slug}`);
      return globalComponents;
    }

    // 動態導入該文章的組件索引
    const localComponentsModule = await import(`@content/posts/${slug}/components/index`);
    
    // 合併局部組件和全局組件，優先使用局部組件
    return {
      ...globalComponents,
      ...localComponentsModule
    };
  } catch (error) {
    console.error(`Error loading components for post ${slug}:`, error);
    // 如果加載失敗，使用全局組件作為後備
    return globalComponents;
  }
});

// 創建一個組件選擇器函數，可以根據名稱獲取組件
export function getComponentByName(name: string, components: Record<string, any>) {
  // 嘗試獲取請求的組件
  const Component = components[name];
  
  if (!Component) {
    console.warn(`Component '${name}' not found, using fallback`);
    // 返回一個警告組件作為後備
    return function FallbackComponent(props: any) {
      return (
        <div className="p-4 border border-yellow-500 bg-yellow-50 rounded">
          <p className="text-yellow-700">
            組件 "{name}" 未找到。請確保該組件已正確導出。
          </p>
        </div>
      );
    };
  }
  
  return Component;
}
