import fs from 'fs';
import path from 'path';
import { BlogPost, BlogMetadata } from '@/app/types/blog';
import { getAllPostSlugs, getPostMetadata } from '@/content/metadata';

// Re-export the BlogPost type
export type { BlogPost, BlogMetadata };

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map((slug) => {
      const metadata = getPostMetadata(slug);
      
      if (!metadata) {
        return null;
      }

      return {
        slug,
        ...metadata
      };
    })
    .filter((post): post is BlogPost => post !== null);

  // 按日期排序，最新的在前
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): { metadata: BlogMetadata; content: string } | null {
  const metadata = getPostMetadata(slug);
  
  if (!metadata) {
    return null;
  }

  // 更新路徑以匹配新的目錄結構
  const fullPath = path.join(postsDirectory, slug, 'content.mdx');
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return {
    metadata,
    content: fileContents,
  };
}

// 新增函數：獲取所有文章的基本信息（不讀取內容）
export function getAllPostsMetadata(): BlogPost[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map((slug) => {
      const metadata = getPostMetadata(slug);
      
      if (!metadata) {
        return null;
      }

      return {
        slug,
        ...metadata
      };
    })
    .filter((post): post is BlogPost => post !== null);

  // 按日期排序，最新的在前
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}