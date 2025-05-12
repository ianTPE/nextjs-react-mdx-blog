import React from 'react';
import { GetStaticPropsContext } from 'next';
import path from 'path';
import fs from 'fs';

/**
 * 為特定博客文章動態加載局部組件的函數
 */
export function getMdxComponents(slug: string) {
  // 組件緩存
  const componentCache: Record<string, any> = {};
  
  // 組件目錄路徑
  const componentsDir = path.join(process.cwd(), 'content/posts', slug);
  
  // 如果組件目錄存在
  if (fs.existsSync(componentsDir)) {
    // 獲取所有 .tsx 文件
    const files = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.tsx') && file !== 'index.tsx');
    
    // 導入組件
    files.forEach(file => {
      const componentName = file.replace(/\.tsx$/, '');
      
      try {
        // 在這裡我們不能直接動態導入，但可以記錄組件路徑
        componentCache[componentName] = {
          path: path.join(componentsDir, file),
          name: componentName
        };
      } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
      }
    });
  }
  
  // 返回組件映射
  return componentCache;
}

/**
 * 獲取所有可用的局部組件信息，用於靜態生成
 */
export function getAllLocalComponentsInfo() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const postDirs = fs.readdirSync(postsDir);
  
  const componentsInfo: Record<string, string[]> = {};
  
  postDirs.forEach(slug => {
    const componentsDir = path.join(postsDir, slug);
    
    if (fs.statSync(componentsDir).isDirectory()) {
      try {
        const files = fs.readdirSync(componentsDir)
          .filter(file => file.endsWith('.tsx') && file !== 'index.tsx');
        
        if (files.length > 0) {
          componentsInfo[slug] = files.map(file => file.replace(/\.tsx$/, ''));
        }
      } catch (error) {
        console.error(`Error scanning components in ${slug}:`, error);
      }
    }
  });
  
  return componentsInfo;
}

/**
 * 為博客文章內容添加組件信息
 */
export function enhanceContentWithComponentInfo(content: string, slug: string) {
  const componentsInfo = getMdxComponents(slug);
  
  // 在這裡我們沒有真正導入組件，而是添加一個組件信息註釋
  // 實際的組件渲染會通過客戶端的其他方式處理
  return `
<!-- 可用的局部組件: ${Object.keys(componentsInfo).join(', ')} -->

${content}
  `;
}
