import fs from 'fs';
import path from 'path';
import { BlogPost, BlogMetadata } from '@/app/types/blog';

// Re-export the BlogPost type
export type { BlogPost, BlogMetadata };

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * 從 MDX 文件解析 metadata
 */
export function getPostMetadata(slug: string): BlogMetadata | null {
  try {
    const mdxPath = path.join(postsDirectory, slug, 'content.mdx');
    
    if (!fs.existsSync(mdxPath)) {
      console.warn(`MDX file not found: ${mdxPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    
    // 提取 export const metadata 或 export { 語句
    const constMetadataRegex = /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};/;
    const exportObjectRegex = /export\s*\{\s*([\s\S]*?)\s*\};/;
    
    let match = fileContents.match(constMetadataRegex);
    let exportContent = '';
    let isConstExport = true;
    
    if (match) {
      exportContent = match[1];
    } else {
      match = fileContents.match(exportObjectRegex);
      if (match) {
        exportContent = match[1];
        isConstExport = false;
      } else {
        console.warn(`No metadata export statement found in ${slug}/content.mdx`);
        return null;
      }
    }
    
    // 解析 metadata 字段
    const metadata = parseMetadataFields(exportContent, isConstExport);
    
    // 驗證必要字段
    if (!validateMetadata(metadata, slug)) {
      return null;
    }
    
    return metadata as BlogMetadata;
  } catch (error) {
    console.error(`Failed to parse metadata for ${slug}:`, error);
    return null;
  }
}

/**
 * 解析 metadata 字段
 */
function parseMetadataFields(exportContent: string, isConstExport: boolean = true): Partial<BlogMetadata> {
  const metadata: Partial<BlogMetadata> = {};
  
  // 解析字符串字段
  const stringFields = ['title', 'date', 'excerpt', 'author', 'coverImage'];
  
  stringFields.forEach(field => {
    const value = parseStringField(exportContent, field);
    if (value !== null) {
      (metadata as any)[field] = value;
    }
  });
  
  // 解析 tags 數組
  const tags = parseTagsField(exportContent);
  if (tags) {
    metadata.tags = tags;
  }
  
  return metadata;
}

/**
 * 解析字符串字段
 */
function parseStringField(content: string, fieldName: string): string | null {
  // 匹配單引號字符串，支持轉義的單引號
  const regex = new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)(?<!\\\\)'`, 'g');
  const match = regex.exec(content);
  
  if (match) {
    // 處理轉義字符
    return match[1]
      .replace(/\\'/g, "'")      // 轉義的單引號
      .replace(/\\n/g, '\n')     // 轉義的換行
      .replace(/\\\\/g, '\\');   // 轉義的反斜杠
  }
  
  return null;
}

/**
 * 解析 tags 數組字段
 */
function parseTagsField(content: string): string[] | null {
  const tagsRegex = /tags:\s*\[([\s\S]*?)\]/;
  const match = content.match(tagsRegex);
  
  if (!match) {
    return null;
  }
  
  const tagsString = match[1];
  
  // 提取數組中的每個標籤
  const tagRegex = /'((?:[^'\\]|\\.)*)'/g;
  const tags: string[] = [];
  let tagMatch;
  
  while ((tagMatch = tagRegex.exec(tagsString)) !== null) {
    const tag = tagMatch[1]
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\');
    
    if (tag.trim()) {
      tags.push(tag.trim());
    }
  }
  
  return tags.length > 0 ? tags : null;
}

/**
 * 驗證 metadata 完整性
 */
function validateMetadata(metadata: Partial<BlogMetadata>, slug: string): boolean {
  const requiredFields: (keyof BlogMetadata)[] = ['title', 'date', 'excerpt', 'author', 'tags'];
  
  for (const field of requiredFields) {
    if (!metadata[field]) {
      console.warn(`Missing required field '${field}' in ${slug}`);
      return false;
    }
  }
  
  // 驗證 tags 是數組且非空
  if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) {
    console.warn(`Invalid or empty tags array in ${slug}`);
    return false;
  }
  
  return true;
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
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map((slug) => {
      const metadata = getPostMetadata(slug);
      if (!metadata) return null;
      
      return { slug, ...metadata };
    })
    .filter((post): post is BlogPost => post !== null);

  // 按日期排序，最新的在前
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * 獲取單篇文章的完整內容
 */
export function getPostBySlug(slug: string): { metadata: BlogMetadata; content: string } | null {
  try {
    const metadata = getPostMetadata(slug);
    if (!metadata) return null;

    // 讀取 MDX 文件內容
    const fullPath = path.join(postsDirectory, slug, 'content.mdx');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // 移除 export 語句，只保留 MDX 內容
    const content = removeExportStatements(fileContents);

    return {
      metadata,
      content,
    };
  } catch (error) {
    console.error(`Failed to load post ${slug}:`, error);
    return null;
  }
}

/**
 * 移除 export 語句，保留 MDX 內容
 */
function removeExportStatements(content: string): string {
  // 移除開頭的 export const metadata 或 export { 語句
  const constMetadataRegex = /^export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};\s*\n*/;
  const exportObjectRegex = /^export\s*\{\s*[\s\S]*?\s*\};\s*\n*/;
  
  let result = content.replace(constMetadataRegex, '');
  if (result === content) {
    result = content.replace(exportObjectRegex, '');
  }
  
  return result.trim();
}

/**
 * 新增函數：獲取所有文章的基本信息（不讀取內容）
 */
export function getAllPostsMetadata(): BlogPost[] {
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
export function getRecentPosts(limit: number = 5): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}