/**
 * 動態加載特定博客文章的MDX組件
 * 這個檔案實現了一個系統，可以根據文章slug動態加載該文章的自定義組件
 * 
 * @deprecated 這個檔案已被 universal-component-loader.ts 取代
 * 為了向後相容，現在使用通用組件加載器
 */

import { cache } from 'react';
import { loadPostComponents } from './simple-component-loader';

/**
 * @deprecated 使用 loadPostComponents 來自 universal-component-loader
 */
export const getPostComponents = cache(async (slug: string) => {
  const result = await loadPostComponents(slug);
  return result.components;
});
