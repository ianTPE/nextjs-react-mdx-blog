// lib/mdx-new.ts
import { promises as fs } from 'fs';
import path from 'path';
import { loadPostMetadata } from './metadata-loader';
import type { PostMeta, Post } from '../types/post';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export interface PostWithContent extends Post {
  rawContent: string;
}

/**
 * 根據 slug 取得完整的文章資料（metadata + content）
 */
export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  try {
    // 1. 載入 metadata
    const metadata = await loadPostMetadata(slug);
    if (!metadata) {
      return null;
    }

    // 2. 載入 MDX 內容
    const content = await loadMDXContent(slug);
    if (!content) {
      return null;
    }

    return {
      ...metadata,
      content,
      rawContent: content
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

/**
 * 載入純 MDX 內容（不包含 metadata）
 */
async function loadMDXContent(slug: string): Promise<string | null> {
  try {
    const contentPath = path.join(POSTS_DIRECTORY, slug, 'content.mdx');
    const content = await fs.readFile(contentPath, 'utf8');
    
    // MDX 文件現在應該是純內容，但為了向後相容，我們還是檢查並移除任何遺留的 metadata export
    const cleanContent = removeMetadataExport(content);
    
    return cleanContent;
  } catch (error) {
    console.error(`Error loading MDX content for ${slug}:`, error);
    return null;
  }
}

/**
 * 移除 MDX 中的 metadata export（向後相容）
 */
function removeMetadataExport(content: string): string {
  const metadataRegex = /^export\s+const\s+metadata\s*=\s*({[\s\S]*?});?\s*$/m;
  return content.replace(metadataRegex, '').trim();
}

/**
 * 取得相關文章（基於 tags 的相似度）
 */
export async function getRelatedPosts(
  currentSlug: string, 
  limit: number = 3
): Promise<PostMeta[]> {
  try {
    const currentPost = await loadPostMetadata(currentSlug);
    if (!currentPost) return [];

    const { loadAllPostsMetadata } = await import('./metadata-loader');
    const allPosts = await loadAllPostsMetadata();
    
    // 計算與當前文章的相關度（基於共同 tags）
    const relatedPosts = allPosts
      .filter(post => post.slug !== currentSlug)
      .map(post => ({
        post,
        score: calculateRelatedness(currentPost.tags, post.tags)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);

    return relatedPosts;
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
}

/**
 * 計算兩個 tag 陣列的相關度
 */
function calculateRelatedness(tags1: string[], tags2: string[]): number {
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  return commonTags.length;
}

/**
 * 檢查文章是否存在
 */
export async function postExists(slug: string): Promise<boolean> {
  try {
    const postDir = path.join(POSTS_DIRECTORY, slug);
    const metadataPath = path.join(postDir, 'metadata.ts');
    const contentPath = path.join(postDir, 'content.mdx');
    
    // 檢查必要文件是否都存在
    await Promise.all([
      fs.access(metadataPath),
      fs.access(contentPath)
    ]);
    
    return true;
  } catch {
    return false;
  }
}

// 重新導出常用函數
export { 
  loadPostMetadata, 
  loadAllPostsMetadata, 
  getAllPostSlugs,
  getFilteredPosts
} from './metadata-loader';