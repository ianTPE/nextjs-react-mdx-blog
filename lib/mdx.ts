import fs from 'fs';
import path from 'path';
import { BlogPost, BlogMetadata, PostWithContent } from '@/app/types/blog';
import { extractMetadataFromMDX, validateMetadata } from './metadata-extractor';
import { mdxCache } from './mdx-cache';

// Re-export the BlogPost type
export type { BlogPost, BlogMetadata, PostWithContent };

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * 從 MDX 文件解析 metadata
 */
export async function getPostMetadata(slug: string): Promise<BlogMetadata | null> {
  try {
    // 先檢查快取
    const cachedMetadata = mdxCache.getMetadata(slug);
    if (cachedMetadata) {
      return cachedMetadata;
    }

    const mdxPath = path.join(postsDirectory, slug, 'content.mdx');
    
    if (!fs.existsSync(mdxPath)) {
      console.warn(`MDX file not found: ${mdxPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    
    // 使用新的 ESM metadata 提取機制
    const { metadata } = await extractMetadataFromMDX(fileContents);
    
    // 快取 metadata
    mdxCache.setMetadata(slug, metadata);
    
    return metadata;
  } catch (error) {
    console.error(`Failed to parse metadata for ${slug}:`, error);
    return null;
  }
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
      .map(entry => entry.name)
      .filter(slug => {
        // 確保目錄包含 content.mdx 文件
        const mdxPath = path.join(postsDirectory, slug, 'content.mdx');
        return fs.existsSync(mdxPath);
      });
  } catch (error) {
    console.error('Failed to read posts directory:', error);
    return [];
  }
}

/**
 * 獲取所有文章列表
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // 先檢查快取
  const cachedPosts = mdxCache.getAllPosts();
  if (cachedPosts) {
    return cachedPosts;
  }

  const slugs = getAllPostSlugs();
  
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const metadata = await getPostMetadata(slug);
      if (!metadata) return null;
      
      return { slug, ...metadata };
    })
  );

  const validPosts = posts.filter((post): post is BlogPost => post !== null);

  // 按日期排序，最新的在前
  const sortedPosts = validPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 快取結果
  mdxCache.setAllPosts(sortedPosts);

  return sortedPosts;
}

/**
 * 獲取單篇文章的完整內容
 */
export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  try {
    // 先檢查快取
    const cachedPost = await mdxCache.getPost(slug);
    if (cachedPost) {
      return cachedPost;
    }

    // 讀取 MDX 文件內容
    const fullPath = path.join(postsDirectory, slug, 'content.mdx');
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`MDX file not found: ${fullPath}`);
      return null;
    }

    const rawContent = fs.readFileSync(fullPath, 'utf8');
    
    // 使用新的 ESM metadata 提取機制
    const { metadata, cleanContent } = await extractMetadataFromMDX(rawContent);
    
    // Debug: Check if cleanContent is properly processed
    console.log('Raw content length:', rawContent.length);
    console.log('Clean content length:', cleanContent.length);
    console.log('Clean content preview:', cleanContent.substring(0, 300));

    const postWithContent: PostWithContent = {
      metadata,
      content: cleanContent,
      rawContent
    };

    // 快取結果
    mdxCache.setPost(slug, postWithContent);

    return postWithContent;
  } catch (error) {
    console.error(`Failed to load post ${slug}:`, error);
    return null;
  }
}

/**
 * 新增函數：獲取所有文章的基本信息（不讀取內容）
 */
export async function getAllPostsMetadata(): Promise<BlogPost[]> {
  return getAllPosts();
}

/**
 * 檢查文章是否存在
 */
export function postExists(slug: string): boolean {
  const mdxPath = path.join(postsDirectory, slug, 'content.mdx');
  return fs.existsSync(mdxPath);
}

/**
 * 獲取最近的文章
 */
export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * 向後兼容：同步版本的 getPostMetadata（已棄用）
 * @deprecated 請使用異步版本的 getPostMetadata
 */
export function getPostMetadataSync(slug: string): BlogMetadata | null {
  console.warn('getPostMetadataSync is deprecated, please use getPostMetadata (async version)');
  
  try {
    const mdxPath = path.join(postsDirectory, slug, 'content.mdx');
    
    if (!fs.existsSync(mdxPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    
    // 使用簡單的正則表達式解析（同步版本）
    const metadataRegex = /^export\s+const\s+metadata\s*=\s*({[\s\S]*?});/m;
    const match = fileContents.match(metadataRegex);
    
    if (!match) {
      return null;
    }

    try {
      const evalFunction = new Function(`return ${match[1]}`);
      const metadata = evalFunction();
      return validateMetadata(metadata);
    } catch (error) {
      console.error(`Failed to parse metadata for ${slug}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Failed to read post ${slug}:`, error);
    return null;
  }
}