import type { PostMeta, Post } from '@/types/post';

export interface PostWithContent {
  metadata: PostMeta;
  content: string;
  rawContent: string;
}

/**
 * MDX 快取管理類
 */
class MDXCache {
  private cache = new Map<string, PostWithContent>();
  private metadataCache = new Map<string, PostMeta>();
  private allPostsCache: PostMeta[] | null = null;
  private lastModified = new Map<string, number>();

  /**
   * 取得快取的文章內容
   */
  async getPost(slug: string): Promise<PostWithContent | null> {
    // 開發環境下檢查檔案是否有變更
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs');
      const path = await import('path');
      
      const filePath = path.join(process.cwd(), 'content', 'posts', slug, 'content.mdx');
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const lastMod = this.lastModified.get(slug);
        
        if (lastMod && stats.mtimeMs > lastMod) {
          // 檔案已更新，清除快取
          this.cache.delete(slug);
          this.metadataCache.delete(slug);
          this.allPostsCache = null;
        }
        
        this.lastModified.set(slug, stats.mtimeMs);
      }
    }

    if (this.cache.has(slug)) {
      return this.cache.get(slug)!;
    }

    return null;
  }

  /**
   * 設定文章快取
   */
  setPost(slug: string, post: PostWithContent): void {
    this.cache.set(slug, post);
    this.metadataCache.set(slug, post.metadata);
    // 清除 allPosts 快取，因為有新的內容
    this.allPostsCache = null;
  }

  /**
   * 取得快取的 metadata
   */
  getMetadata(slug: string): PostMeta | null {
    return this.metadataCache.get(slug) || null;
  }

  /**
   * 設定 metadata 快取
   */
  setMetadata(slug: string, metadata: PostMeta): void {
    this.metadataCache.set(slug, metadata);
    // 如果快取中有完整的文章，也更新它
    const cachedPost = this.cache.get(slug);
    if (cachedPost) {
      cachedPost.metadata = metadata;
    }
    // 清除 allPosts 快取
    this.allPostsCache = null;
  }

  /**
   * 取得所有文章快取
   */
  getAllPosts(): PostMeta[] | null {
    return this.allPostsCache;
  }

  /**
   * 設定所有文章快取
   */
  setAllPosts(posts: PostMeta[]): void {
    this.allPostsCache = posts;
  }

  /**
   * 清除指定文章的快取
   */
  clearPost(slug: string): void {
    this.cache.delete(slug);
    this.metadataCache.delete(slug);
    this.lastModified.delete(slug);
    this.allPostsCache = null;
  }

  /**
   * 清除所有快取
   */
  clear(): void {
    this.cache.clear();
    this.metadataCache.clear();
    this.allPostsCache = null;
    this.lastModified.clear();
    console.log('MDX cache cleared');
  }

  /**
   * 開發環境下清除快取
   */
  clearInDevelopment(): void {
    if (process.env.NODE_ENV === 'development') {
      this.clear();
    }
  }

  /**
   * 取得快取統計資訊
   */
  getStats(): {
    postsCount: number;
    metadataCount: number;
    hasAllPostsCache: boolean;
  } {
    return {
      postsCount: this.cache.size,
      metadataCount: this.metadataCache.size,
      hasAllPostsCache: this.allPostsCache !== null,
    };
  }

  /**
   * 預熱快取 - 載入所有文章的 metadata
   */
  async warmup(): Promise<void> {
    console.log('Warming up MDX cache...');
    
    try {
      const { getAllPostSlugs, getPostMetadata } = await import('./mdx');
      const slugs = getAllPostSlugs();
      
      for (const slug of slugs) {
        if (!this.metadataCache.has(slug)) {
          const metadata = await getPostMetadata(slug);
          if (metadata) {
            this.setMetadata(slug, metadata);
          }
        }
      }
      
      console.log(`Cache warmed up with ${this.metadataCache.size} posts`);
    } catch (error) {
      console.error('Failed to warm up cache:', error);
    }
  }
}

// 單例模式 - 全域快取實例
export const mdxCache = new MDXCache();

// 開發環境下監聽檔案變化
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  let chokidar: any;
  
  try {
    chokidar = require('chokidar');
    
    // 監聽 MDX 檔案變化
    const watcher = chokidar.watch('content/posts/**/*.mdx', {
      ignored: /node_modules/,
      persistent: true
    });
    
    watcher.on('change', (path: string) => {
      // 從檔案路徑提取 slug
      const pathParts = path.split('/');
      const slugIndex = pathParts.findIndex(part => part === 'posts');
      
      if (slugIndex !== -1 && pathParts[slugIndex + 1]) {
        const slug = pathParts[slugIndex + 1];
        mdxCache.clearPost(slug);
        console.log(`MDX cache cleared for: ${slug}`);
      }
    });
    
    watcher.on('add', () => {
      mdxCache.clear();
      console.log('New MDX file detected, full cache cleared');
    });
    
    watcher.on('unlink', () => {
      mdxCache.clear();
      console.log('MDX file deleted, full cache cleared');
    });
    
  } catch (error) {
    console.warn('File watching not available:', error instanceof Error ? error.message : String(error));
  }
}

export default mdxCache;
