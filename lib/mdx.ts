import fs from 'fs';
import path from 'path';

import type { PostMeta, Post, Heading } from '@/types/post';
import { loadPostMetadata, loadAllPostsMetadata, postExists as checkPostExists } from './metadata-loader';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * 獲取單篇文章的 metadata
 */
export async function getPostMetadata(slug: string): Promise<PostMeta | null> {
  return loadPostMetadata(slug);
}

/**
 * 獲取所有文章 slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found: ${postsDirectory}`);
      return [];
    }

    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    
    return entries
      .filter(entry => entry.isDirectory())
      .filter(entry => !entry.name.startsWith('posts_backup')) // 排除備份目錄
      .map(entry => entry.name)
      .filter(slug => {
        // 確保目錄包含必要文件
        const metadataPath = path.join(postsDirectory, slug, 'metadata.ts');
        const contentPath = path.join(postsDirectory, slug, 'content.mdx');
        return fs.existsSync(metadataPath) && fs.existsSync(contentPath);
      });
  } catch (error) {
    console.error('Failed to read posts directory:', error);
    return [];
  }
}

/**
 * 獲取所有文章列表
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  const allPosts = await loadAllPostsMetadata();
  
  // 按日期排序，最新的在前
  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * 獲取單篇文章的完整內容
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const metadata = await loadPostMetadata(slug);
    if (!metadata) {
      console.warn(`Metadata not found for post: ${slug}`);
      return null;
    }

    const contentPath = path.join(postsDirectory, slug, 'content.mdx');
    if (!fs.existsSync(contentPath)) {
      console.warn(`Content file not found: ${contentPath}`);
      return null;
    }

    const content = fs.readFileSync(contentPath, 'utf8');

    // TODO: Re-implement headings extraction without serialize
    const headings: Heading[] = []; // Temporary empty array

    return {
      ...metadata,
      source: content, // Return raw content
      headings,
    };
  } catch (error) {
    console.error(`Failed to load post ${slug}:`, error);
    return null;
  }
}

/**
 * 檢查文章是否存在
 */
export async function postExists(slug: string): Promise<boolean> {
  return await checkPostExists(slug);
}

/**
 * 獲取最近的文章
 */
export async function getRecentPosts(limit: number = 5): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * 根據標籤獲取文章
 */
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

/**
 * 根據作者獲取文章
 */
export async function getPostsByAuthor(author: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.author === author);
}

/**
 * 獲取所有標籤
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * 獲取所有作者
 */
export async function getAllAuthors(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const authorSet = new Set<string>();
  
  allPosts.forEach(post => {
    if (post.author) {
      authorSet.add(post.author);
    }
  });
  
  return Array.from(authorSet).sort();
}

// 向後兼容的類型別名
export type BlogPost = PostMeta;
export type BlogMetadata = PostMeta;
export type PostWithContent = Post;
