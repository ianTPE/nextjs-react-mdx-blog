// lib/metadata-loader.ts
import { promises as fs } from 'fs';
import path from 'path';
import type { PostMeta } from '../types/post';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

/**
 * 動態載入單篇文章的 metadata
 */
export async function loadPostMetadata(slug: string): Promise<PostMeta | null> {
  try {
    const metadataPath = path.join(POSTS_DIRECTORY, slug, 'metadata.ts');
    
    // 檢查文件是否存在
    try {
      await fs.access(metadataPath);
    } catch {
      console.warn(`Metadata file not found: ${metadataPath}`);
      return null;
    }

    // 在 Node.js 環境中動態 import（Windows 相容性修正）
    const metadataUrl = process.platform === 'win32' 
      ? `file:///${metadataPath.replace(/\\/g, '/')}`
      : `file://${metadataPath}`;
    
    // 開發環境中清除快取，確保取得最新的 metadata
    const cacheBustingUrl = `${metadataUrl}?t=${Date.now()}`;
    const metadataModule = await import(cacheBustingUrl);
    const metadata = metadataModule.default;

    // 驗證 metadata
    return validateMetadata(metadata, slug);
  } catch (error) {
    console.error(`Error loading metadata for ${slug}:`, error);
    return null;
  }
}

/**
 * 載入所有文章的 metadata
 */
export async function loadAllPostsMetadata(): Promise<PostMeta[]> {
  try {
    const postSlugs = await getAllPostSlugs();
    const metadataPromises = postSlugs.map(slug => loadPostMetadata(slug));
    const allMetadata = await Promise.all(metadataPromises);
    
    // 過濾掉載入失敗的和草稿
    return allMetadata
      .filter((metadata): metadata is PostMeta => metadata !== null)
      .filter(metadata => metadata.published !== false);
  } catch (error) {
    console.error('Error loading all posts metadata:', error);
    return [];
  }
}

/**
 * 取得所有文章的 slug（目錄名稱）
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIRECTORY, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .filter(entry => !entry.name.startsWith('posts_backup')) // 排除備份目錄
      .map(entry => entry.name);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * 驗證 metadata 格式
 */
function validateMetadata(metadata: any, slug: string): PostMeta {
  const required = ['title', 'date', 'summary', 'tags'];
  
  for (const field of required) {
    if (!metadata[field]) {
      throw new Error(`Missing required field '${field}' in ${slug}/metadata.ts`);
    }
  }

  // 驗證日期格式
  if (isNaN(Date.parse(metadata.date))) {
    throw new Error(`Invalid date format in ${slug}/metadata.ts`);
  }

  // 確保 tags 是陣列
  if (!Array.isArray(metadata.tags)) {
    throw new Error(`Tags must be an array in ${slug}/metadata.ts`);
  }

  // 如果沒有提供 slug，使用目錄名稱
  if (!metadata.slug) {
    metadata.slug = slug;
  }

  // 預設值
  if (metadata.published === undefined) {
    metadata.published = true;
  }

  return metadata as PostMeta;
}

/**
 * 根據各種條件篩選文章
 */
export async function getFilteredPosts(options: {
  tag?: string;
  author?: string;
  published?: boolean;
  limit?: number;
  sortBy?: 'date' | 'title';
  order?: 'asc' | 'desc';
} = {}): Promise<PostMeta[]> {
  let posts = await loadAllPostsMetadata();

  // 套用篩選條件
  if (options.tag) {
    posts = posts.filter(post => post.tags.includes(options.tag!));
  }

  if (options.author) {
    posts = posts.filter(post => post.author === options.author);
  }

  if (options.published !== undefined) {
    posts = posts.filter(post => post.published === options.published);
  }

  // 排序
  const sortBy = options.sortBy || 'date';
  const order = options.order || 'desc';
  
  posts.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;
    
    if (sortBy === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    } else {
      aValue = a.title;
      bValue = b.title;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return order === 'asc' ? comparison : -comparison;
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  // 限制數量
  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
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