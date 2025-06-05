// scripts/create-post.ts
import { promises as fs } from 'fs';
import path from 'path';
import readline from 'readline';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

interface PostConfig {
  slug: string;
  title: string;
  author: string;
  summary: string;
  tags: string[];
}

/**
 * 互動式創建新文章
 */
async function createPost() {
  console.log('📝 創建新文章\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const config = await collectPostInfo(rl);
    await generatePostFiles(config);
    
    console.log('\n✅ 文章創建成功！');
    console.log(`\n📁 文章位置: content/posts/${config.slug}/`);
    console.log('\n下一步:');
    console.log('1. 編輯 content.mdx 添加文章內容');
    console.log('2. 如需要，在 components/ 目錄添加自定義組件');
    console.log('3. 執行 npm run posts:validate 驗證文章');
    console.log('4. 執行 npm run dev 預覽文章');

  } catch (error) {
    console.error('❌ 創建文章失敗:', error);
  } finally {
    rl.close();
  }
}

/**
 * 收集文章資訊
 */
async function collectPostInfo(rl: readline.Interface): Promise<PostConfig> {
  const ask = (question: string): Promise<string> => {
    return new Promise(resolve => {
      rl.question(question, resolve);
    });
  };

  const title = await ask('文章標題: ');
  if (!title.trim()) {
    throw new Error('文章標題不能為空');
  }

  // 自動生成 slug
  const defaultSlug = generateSlug(title);
  const slugInput = await ask(`文章 slug (${defaultSlug}): `);
  const slug = slugInput.trim() || defaultSlug;

  // 檢查 slug 是否已存在
  const postDir = path.join(POSTS_DIRECTORY, slug);
  try {
    await fs.access(postDir);
    throw new Error(`文章 slug "${slug}" 已存在`);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const author = await ask('作者 (Ian Chou): ') || 'Ian Chou';
  const summary = await ask('文章摘要: ');
  
  if (!summary.trim()) {
    throw new Error('文章摘要不能為空');
  }

  const tagsInput = await ask('標籤 (用逗號分隔): ');
  const tags = tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  if (tags.length === 0) {
    throw new Error('至少需要一個標籤');
  }

  return {
    slug,
    title,
    author,
    summary,
    tags
  };
}

/**
 * 生成文章文件
 */
async function generatePostFiles(config: PostConfig) {
  const postDir = path.join(POSTS_DIRECTORY, config.slug);
  const componentsDir = path.join(postDir, 'components');

  // 創建目錄
  await fs.mkdir(postDir, { recursive: true });
  await fs.mkdir(componentsDir, { recursive: true });

  // 生成 metadata.ts
  const metadataContent = generateMetadataFile(config);
  await fs.writeFile(
    path.join(postDir, 'metadata.ts'),
    metadataContent,
    'utf8'
  );

  // 生成 content.mdx
  const mdxContent = generateMDXFile(config);
  await fs.writeFile(
    path.join(postDir, 'content.mdx'),
    mdxContent,
    'utf8'
  );

  // 生成 components/index.ts
  const componentsIndex = generateComponentsIndex();
  await fs.writeFile(
    path.join(componentsDir, 'index.ts'),
    componentsIndex,
    'utf8'
  );

  console.log(`📁 已創建目錄: ${postDir}`);
  console.log(`📄 已創建文件: metadata.ts`);
  console.log(`📄 已創建文件: content.mdx`);
  console.log(`📄 已創建文件: components/index.ts`);
}

/**
 * 生成 metadata.ts 文件內容
 */
function generateMetadataFile(config: PostConfig): string {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return `// content/posts/${config.slug}/metadata.ts
import type { PostMeta } from '../../../types/post';

const metadata: PostMeta = {
  slug: "${config.slug}",
  title: "${config.title}",
  date: "${now}",
  summary: "${config.summary}",
  tags: ${JSON.stringify(config.tags)},
  published: false, // 設為 false 表示草稿
  author: "${config.author}",
};

export default metadata;
`;
}

/**
 * 生成 content.mdx 文件內容
 */
function generateMDXFile(config: PostConfig): string {
  return `# ${config.title}

${config.summary}

## 介紹

在這裡開始編寫你的文章內容...

## 主要內容

### 子標題 1

內容...

### 子標題 2

內容...

## 結論

總結你的文章...

---

*如需要自定義組件，可以在 \`components/\` 目錄中添加，並在 \`components/index.ts\` 中導出。*
`;
}

/**
 * 生成 components/index.ts 文件內容
 */
function generateComponentsIndex(): string {
  return `// content/posts/[slug]/components/index.ts
"use client";

// 在這裡導出你的自定義組件
// 例如:
// import CustomChart from './CustomChart';
// export { CustomChart };

// 目前沒有自定義組件
export {};
`;
}

/**
 * 從標題生成 slug
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格轉成連字符
    .replace(/-+/g, '-') // 多個連字符合併
    .trim();
}

// 執行腳本
if (require.main === module) {
  createPost();
}

export { createPost };