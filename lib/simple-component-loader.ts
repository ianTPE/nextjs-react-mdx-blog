/**
 * 簡化版組件加載器
 * 
 * 這個版本避免了複雜的動態導入，改為使用靜態映射
 * 更穩定且易於維護
 */

import { cache } from 'react';

// 全局組件導入
import * as globalComponents from '@/components/mdx/global-components';

/**
 * 靜態組件映射
 * 通過腳本自動掃描生成，只包含真正有組件導出的文章（24篇）
 */
const componentMappings: Record<string, () => Promise<any>> = {
  '2025-06-from-zero-to-one-build-chayu-time-bubble-tea-booking-system-tech-guide': () =>
    import('../content/posts/2025-06-from-zero-to-one-build-chayu-time-bubble-tea-booking-system-tech-guide/components/index'),

  '2025-06-from-zero-to-one-build-chayu-time-liff-tea-booking-system-complete-tech-guide': () =>
    import('../content/posts/2025-06-from-zero-to-one-build-chayu-time-liff-tea-booking-system-complete-tech-guide/components/index'),

  '2025-06-line-liff-lowcode-ultimate-guide': () =>
    import('../content/posts/2025-06-line-liff-lowcode-ultimate-guide/components/index'),

  '2025-06-LINE_LIFF_Low_Code_Platform_Business_Guide': () =>
    import('../content/posts/2025-06-LINE_LIFF_Low_Code_Platform_Business_Guide/components/index'),

  '2025-06-nextjs-mdx-universal-component-loader-system': () =>
    import('../content/posts/2025-06-nextjs-mdx-universal-component-loader-system/components/index'),

  '2025-06-shadcn-prose-migration-guide': () =>
    import('../content/posts/2025-06-shadcn-prose-migration-guide/components/index'),

  '2025-06-taiwan-software-engineer-job-market-analysis': () =>
    import('../content/posts/2025-06-taiwan-software-engineer-job-market-analysis/components/index'),

  '2025-ai-coding-assistant-comparison-claude-chatgpt-gemini-developers': () =>
    import('../content/posts/2025-ai-coding-assistant-comparison-claude-chatgpt-gemini-developers/components/index'),

  '2025-backend-development-low-code-market-guide-187-billion-opportunity': () =>
    import('../content/posts/2025-backend-development-low-code-market-guide-187-billion-opportunity/components/index'),

  '2025-freelancer-guide-low-code-no-code-development-applications-ranking': () =>
    import('../content/posts/2025-freelancer-guide-low-code-no-code-development-applications-ranking/components/index'),

  '2025-low-code-cybersecurity-freelance-guide-soar-engineer-remote-work': () =>
    import('../content/posts/2025-low-code-cybersecurity-freelance-guide-soar-engineer-remote-work/components/index'),

  '2025-low-code-no-code-freelancer-earning-guide-8-areas': () =>
    import('../content/posts/2025-low-code-no-code-freelancer-earning-guide-8-areas/components/index'),

  '2025-low-code-no-code-freelancing-complete-guide-90-day-plan': () =>
    import('../content/posts/2025-low-code-no-code-freelancing-complete-guide-90-day-plan/components/index'),

  '2025-no-code-app-platform-comparison-adalo-bubble-glide': () =>
    import('../content/posts/2025-no-code-app-platform-comparison-adalo-bubble-glide/components/index'),

  'ai-anxiety-syndrome-survival-guide': () =>
    import('../content/posts/ai-anxiety-syndrome-survival-guide/components/index'),

  'ai-prd-devops-integration-guide-2025': () =>
    import('../content/posts/ai-prd-devops-integration-guide-2025/components/index'),

  'aider-claude-code-complete-guide-2025': () =>
    import('../content/posts/aider-claude-code-complete-guide-2025/components/index'),

  'chasing-ghosts-tailwind-typography-debugging-nightmares': () =>
    import('../content/posts/chasing-ghosts-tailwind-typography-debugging-nightmares/components/index'),

  'coderabbit-windsurf-six-key-differences-2025': () =>
    import('../content/posts/coderabbit-windsurf-six-key-differences-2025/components/index'),

  'cursor-ai-12-best-practices': () =>
    import('../content/posts/cursor-ai-12-best-practices/components/index'),

  'freelancer-income-guide-2025-fullstack-frontend-backend': () =>
    import('../content/posts/freelancer-income-guide-2025-fullstack-frontend-backend/components/index'),

  'getting-started-with-nextjs': () =>
    import('../content/posts/getting-started-with-nextjs/components/index'),

  'low-code-no-code-market-trends-2025-career-transition': () =>
    import('../content/posts/low-code-no-code-market-trends-2025-career-transition/components/index'),

  'Low-Code-No-Code-PRD-Complete-Guide-Part2': () =>
    import('../content/posts/Low-Code-No-Code-PRD-Complete-Guide-Part2/components/index'),

  'mdx-blog-frontend-backend-separation-nextjs-to-s3-guide': () =>
    import('../content/posts/mdx-blog-frontend-backend-separation-nextjs-to-s3-guide/components/index'),

  'mdx-blog-setup': () =>
    import('../content/posts/mdx-blog-setup/components/index'),

  'Parser_Prompting_Symbol_System_Full_Reference': () =>
    import('../content/posts/Parser_Prompting_Symbol_System_Full_Reference/components/index'),

  'product-logic-shift-ai': () =>
    import('../content/posts/product-logic-shift-ai/components/index'),

  'sfbt-practical-guide-youth-counseling-techniques': () =>
    import('../content/posts/sfbt-practical-guide-youth-counseling-techniques/components/index'),

  'vibe-coding-framework-guide-from-nextjs-experience': () =>
    import('../content/posts/vibe-coding-framework-guide-from-nextjs-experience/components/index'),

  'web-deployment-platforms-2025': () =>
    import('../content/posts/web-deployment-platforms-2025/components/index'),

  'windsurf-swe1-model-family': () =>
    import('../content/posts/windsurf-swe1-model-family/components/index'),
};

/**
 * 組件加載結果類型
 */
interface ComponentLoadResult {
  components: Record<string, React.ComponentType<any>>;
  hasCustomComponents: boolean;
  loadedFrom: 'cache' | 'static-mapping' | 'global-only';
}

/**
 * 加載文章組件的主要函數
 */
async function loadComponents(slug: string): Promise<ComponentLoadResult> {
  // 檢查是否有靜態映射
  if (componentMappings[slug]) {
    try {
      const customComponentsModule = await componentMappings[slug]();
      
      // 提取所有非默認導出的組件
      const customComponents: Record<string, React.ComponentType<any>> = {};
      Object.keys(customComponentsModule).forEach(key => {
        if (key !== 'default' && typeof customComponentsModule[key] === 'function') {
          customComponents[key] = customComponentsModule[key];
        }
      });
      
      // 合併全局組件和自定義組件
      const allComponents = {
        ...globalComponents,
        ...customComponents
      };
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[ComponentLoader] Loaded ${Object.keys(customComponents).length} custom components for ${slug}`);
      }
      
      return {
        components: allComponents,
        hasCustomComponents: Object.keys(customComponents).length > 0,
        loadedFrom: 'static-mapping'
      };
      
    } catch (error) {
      console.error(`[ComponentLoader] Failed to load components for ${slug}:`, error);
      
      // 失敗時使用全局組件
      return {
        components: { ...globalComponents },
        hasCustomComponents: false,
        loadedFrom: 'global-only'
      };
    }
  }
  
  // 沒有映射時使用全局組件
  return {
    components: { ...globalComponents },
    hasCustomComponents: false,
    loadedFrom: 'global-only'
  };
}

// 導出緩存的加載函數
export const loadPostComponents = cache(loadComponents);

// 導出類型
export type { ComponentLoadResult };

// 工具函數：檢查文章是否有自定義組件
export function hasCustomComponents(slug: string): boolean {
  return slug in componentMappings;
}

// 工具函數：獲取所有有自定義組件的文章列表
export function getPostsWithCustomComponents(): string[] {
  return Object.keys(componentMappings);
}

// 工具函數：獲取統計信息
export function getComponentStats() {
  return {
    totalPosts: 56, // 總文章數 (更新)
    postsWithComponents: Object.keys(componentMappings).length,
    postsWithoutComponents: 56 - Object.keys(componentMappings).length,
    componentMappings: Object.keys(componentMappings)
  };
}

export default { 
  loadPostComponents, 
  hasCustomComponents, 
  getPostsWithCustomComponents,
  getComponentStats 
};
