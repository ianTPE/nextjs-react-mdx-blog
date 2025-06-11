/**
 * 通用組件加載器
 * 
 * 這個模塊提供了一個通用的解決方案來動態加載MDX文章的自定義組件
 * 支持Server Side Rendering (SSR) 和客戶端渲染
 */

import fs from 'fs';
import path from 'path';
import { cache } from 'react';

// 全局組件導入
import * as globalComponents from '@/components/mdx/global-components';

/**
 * 組件加載結果類型
 */
interface ComponentLoadResult {
  components: Record<string, React.ComponentType<any>>;
  hasCustomComponents: boolean;
  loadedFrom: 'cache' | 'filesystem' | 'global-only';
}

/**
 * 組件加載器配置
 */
interface LoaderConfig {
  enableCache: boolean;
  enableFallback: boolean;
  logLevel: 'none' | 'error' | 'warn' | 'info' | 'debug';
}

const defaultConfig: LoaderConfig = {
  enableCache: true,
  enableFallback: true,
  logLevel: 'warn'
};

/**
 * 日誌工具
 */
class Logger {
  constructor(private level: LoaderConfig['logLevel']) {}

  debug(message: string, ...args: any[]) {
    if (this.level === 'debug') console.log(`[ComponentLoader] ${message}`, ...args);
  }

  info(message: string, ...args: any[]) {
    if (['debug', 'info'].includes(this.level)) console.info(`[ComponentLoader] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]) {
    if (['debug', 'info', 'warn'].includes(this.level)) console.warn(`[ComponentLoader] ${message}`, ...args);
  }

  error(message: string, ...args: any[]) {
    if (this.level !== 'none') console.error(`[ComponentLoader] ${message}`, ...args);
  }
}

/**
 * 組件元數據
 */
interface ComponentMetadata {
  name: string;
  path: string;
  size?: number;
  lastModified?: Date;
}

/**
 * 通用組件加載器類
 */
class UniversalComponentLoader {
  private config: LoaderConfig;
  private logger: Logger;
  private componentCache = new Map<string, Record<string, React.ComponentType<any>>>();
  private metadataCache = new Map<string, ComponentMetadata[]>();

  constructor(config: Partial<LoaderConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.logger = new Logger(this.config.logLevel);
  }

  /**
   * 檢查文章是否有自定義組件目錄
   */
  private hasCustomComponentsDirectory(slug: string): boolean {
    const componentsDir = path.join(process.cwd(), 'content/posts', slug, 'components');
    const indexFile = path.join(componentsDir, 'index.ts');
    
    this.logger.debug(`Checking components directory for ${slug}: ${componentsDir}`);
    
    return fs.existsSync(componentsDir) && fs.existsSync(indexFile);
  }

  /**
   * 獲取組件目錄的元數據
   */
  private getComponentMetadata(slug: string): ComponentMetadata[] {
    const cacheKey = `metadata_${slug}`;
    
    if (this.config.enableCache && this.metadataCache.has(cacheKey)) {
      return this.metadataCache.get(cacheKey)!;
    }

    const componentsDir = path.join(process.cwd(), 'content/posts', slug, 'components');
    const metadata: ComponentMetadata[] = [];

    try {
      if (fs.existsSync(componentsDir)) {
        const files = fs.readdirSync(componentsDir);
        
        for (const file of files) {
          if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const filePath = path.join(componentsDir, file);
            const stats = fs.statSync(filePath);
            
            metadata.push({
              name: path.basename(file, path.extname(file)),
              path: filePath,
              size: stats.size,
              lastModified: stats.mtime
            });
          }
        }
      }
    } catch (error) {
      this.logger.error(`Failed to read component metadata for ${slug}:`, error);
    }

    if (this.config.enableCache) {
      this.metadataCache.set(cacheKey, metadata);
    }

    return metadata;
  }

  /**
   * 動態加載組件的核心方法
   */
  private async loadComponentsFromPath(slug: string): Promise<Record<string, React.ComponentType<any>>> {
    const cacheKey = `components_${slug}`;
    
    // 檢查緩存
    if (this.config.enableCache && this.componentCache.has(cacheKey)) {
      this.logger.debug(`Loading components for ${slug} from cache`);
      return this.componentCache.get(cacheKey)!;
    }

    let components: Record<string, React.ComponentType<any>> = {};

    try {
      // 使用絕對路徑進行動態導入
      const componentsPath = path.join(process.cwd(), 'content/posts', slug, 'components/index');
      this.logger.debug(`Attempting to import components from: ${componentsPath}`);
      
      // 使用 require 代替 import 來避免構建警告
      const moduleImport = require(componentsPath);
      
      // 提取所有非默認導出的組件
      Object.keys(moduleImport).forEach(key => {
        if (key !== 'default' && typeof moduleImport[key] === 'function') {
          components[key] = moduleImport[key];
          this.logger.debug(`Loaded component: ${key}`);
        }
      });

      // 緩存結果
      if (this.config.enableCache) {
        this.componentCache.set(cacheKey, components);
      }

      this.logger.info(`Successfully loaded ${Object.keys(components).length} components for ${slug}`);
      
    } catch (error) {
      this.logger.warn(`Failed to load custom components for ${slug}:`, error);
      
      if (!this.config.enableFallback) {
        throw error;
      }
    }

    return components;
  }

  /**
   * 主要的組件加載方法
   */
  async loadComponents(slug: string): Promise<ComponentLoadResult> {
    this.logger.debug(`Starting component loading for slug: ${slug}`);

    // 檢查是否有自定義組件
    const hasCustomComponents = this.hasCustomComponentsDirectory(slug);
    
    if (!hasCustomComponents) {
      this.logger.debug(`No custom components found for ${slug}, using global components only`);
      return {
        components: { ...globalComponents },
        hasCustomComponents: false,
        loadedFrom: 'global-only'
      };
    }

    // 獲取組件元數據
    const metadata = this.getComponentMetadata(slug);
    this.logger.debug(`Found ${metadata.length} component files for ${slug}`);

    // 加載自定義組件
    const customComponents = await this.loadComponentsFromPath(slug);
    
    // 合併全局組件和自定義組件（自定義組件優先）
    const allComponents = {
      ...globalComponents,
      ...customComponents
    };

    this.logger.info(`Total components loaded for ${slug}: ${Object.keys(allComponents).length} (${Object.keys(customComponents).length} custom + ${Object.keys(globalComponents).length} global)`);

    return {
      components: allComponents,
      hasCustomComponents: Object.keys(customComponents).length > 0,
      loadedFrom: this.componentCache.has(`components_${slug}`) ? 'cache' : 'filesystem'
    };
  }

  /**
   * 清理緩存
   */
  clearCache(slug?: string): void {
    if (slug) {
      this.componentCache.delete(`components_${slug}`);
      this.metadataCache.delete(`metadata_${slug}`);
      this.logger.debug(`Cleared cache for ${slug}`);
    } else {
      this.componentCache.clear();
      this.metadataCache.clear();
      this.logger.debug('Cleared all caches');
    }
  }

  /**
   * 獲取加載統計信息
   */
  getStats(): {
    cachedComponents: number;
    cachedMetadata: number;
    totalCacheSize: number;
  } {
    return {
      cachedComponents: this.componentCache.size,
      cachedMetadata: this.metadataCache.size,
      totalCacheSize: this.componentCache.size + this.metadataCache.size
    };
  }
}

// 創建單例實例
const componentLoader = new UniversalComponentLoader({
  enableCache: true,
  enableFallback: true,
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'warn'
});

// 導出緩存的加載函數
export const loadPostComponents = cache(async (slug: string): Promise<ComponentLoadResult> => {
  return componentLoader.loadComponents(slug);
});

// 導出其他實用函數
export const clearComponentCache = (slug?: string) => componentLoader.clearCache(slug);
export const getComponentStats = () => componentLoader.getStats();

// 導出類型
export type { ComponentLoadResult, ComponentMetadata };

// 默認導出
export default componentLoader;
