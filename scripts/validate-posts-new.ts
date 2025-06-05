// scripts/validate-posts-new.ts
import { promises as fs } from 'fs';
import path from 'path';
import { loadPostMetadata, getAllPostSlugs } from '../lib/metadata-loader';
import type { PostMeta } from '../types/post';

interface ValidationResult {
  slug: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 驗證所有文章的完整性
 */
async function validateAllPosts(): Promise<void> {
  console.log('🔍 開始驗證所有文章...\n');

  try {
    const slugs = await getAllPostSlugs();
    const results: ValidationResult[] = [];

    for (const slug of slugs) {
      const result = await validatePost(slug);
      results.push(result);
      
      if (result.valid) {
        console.log(`✅ ${slug}: 驗證通過`);
      } else {
        console.log(`❌ ${slug}: 驗證失敗`);
        result.errors.forEach(error => console.log(`   ⚠️  ${error}`));
      }
      
      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => console.log(`   ⚠️  ${warning}`));
      }
    }

    // 統計結果
    const validCount = results.filter(r => r.valid).length;
    const invalidCount = results.length - validCount;
    
    console.log(`\n📊 驗證結果統計:`);
    console.log(`   ✅ 通過: ${validCount} 篇`);
    console.log(`   ❌ 失敗: ${invalidCount} 篇`);
    console.log(`   📝 總計: ${results.length} 篇`);

    if (invalidCount > 0) {
      console.log('\n❌ 有文章驗證失敗，請檢查上述錯誤訊息');
      process.exit(1);
    } else {
      console.log('\n🎉 所有文章驗證通過！');
    }

  } catch (error) {
    console.error('❌ 驗證過程發生錯誤:', error);
    process.exit(1);
  }
}

/**
 * 驗證單篇文章
 */
async function validatePost(slug: string): Promise<ValidationResult> {
  const result: ValidationResult = {
    slug,
    valid: true,
    errors: [],
    warnings: []
  };

  try {
    // 1. 驗證文件結構
    await validateFileStructure(slug, result);
    
    // 2. 驗證 metadata
    await validateMetadata(slug, result);
    
    // 3. 驗證 MDX 內容
    await validateMDXContent(slug, result);

  } catch (error: any) {
    result.valid = false;
    result.errors.push(`驗證過程發生錯誤: ${error?.message || String(error)}`);
  }

  return result;
}

/**
 * 驗證文件結構
 */
async function validateFileStructure(slug: string, result: ValidationResult): Promise<void> {
  const postDir = path.join(process.cwd(), 'content', 'posts', slug);
  const metadataPath = path.join(postDir, 'metadata.ts');
  const contentPath = path.join(postDir, 'content.mdx');

  // 檢查必要文件
  try {
    await fs.access(metadataPath);
  } catch {
    result.valid = false;
    result.errors.push('缺少 metadata.ts 文件');
  }

  try {
    await fs.access(contentPath);
  } catch {
    result.valid = false;
    result.errors.push('缺少 content.mdx 文件');
  }

  // 檢查目錄結構
  try {
    const entries = await fs.readdir(postDir, { withFileTypes: true });
    const hasComponents = entries.some(entry => 
      entry.isDirectory() && entry.name === 'components'
    );
    
    if (hasComponents) {
      // 驗證 components/index.ts 是否存在
      const indexPath = path.join(postDir, 'components', 'index.ts');
      try {
        await fs.access(indexPath);
      } catch {
        result.warnings.push('建議在 components 目錄中添加 index.ts 文件');
      }
    }
  } catch (error: any) {
    result.errors.push(`無法讀取文章目錄: ${error?.message || String(error)}`);
  }
}

/**
 * 驗證 metadata
 */
async function validateMetadata(slug: string, result: ValidationResult): Promise<void> {
  try {
    const metadata = await loadPostMetadata(slug);
    
    if (!metadata) {
      result.valid = false;
      result.errors.push('無法載入 metadata');
      return;
    }

    // 驗證必要欄位
    const requiredFields = ['title', 'date', 'summary', 'tags'];
    for (const field of requiredFields) {
      if (!metadata[field as keyof PostMeta]) {
        result.valid = false;
        result.errors.push(`缺少必要欄位: ${field}`);
      }
    }

    // 驗證數據格式
    if (metadata.date && isNaN(Date.parse(metadata.date))) {
      result.valid = false;
      result.errors.push('date 日期格式不正確');
    }

    if (metadata.tags && !Array.isArray(metadata.tags)) {
      result.valid = false;
      result.errors.push('tags 必須是陣列');
    }

    // 驗證 slug 一致性
    if (metadata.slug && metadata.slug !== slug) {
      result.warnings.push(`metadata.slug (${metadata.slug}) 與目錄名稱 (${slug}) 不一致`);
    }

    // SEO 相關驗證
    if (metadata.summary && metadata.summary.length > 200) {
      result.warnings.push('summary 超過 200 字符，可能影響 SEO');
    }

    if (metadata.title && metadata.title.length > 60) {
      result.warnings.push('title 超過 60 字符，可能影響 SEO');
    }

  } catch (error: any) {
    result.valid = false;
    result.errors.push(`metadata 驗證失敗: ${error?.message || String(error)}`);
  }
}

/**
 * 驗證 MDX 內容
 */
async function validateMDXContent(slug: string, result: ValidationResult): Promise<void> {
  try {
    const contentPath = path.join(process.cwd(), 'content', 'posts', slug, 'content.mdx');
    const content = await fs.readFile(contentPath, 'utf8');

    // 檢查是否還有遺留的 ESM metadata
    const metadataRegex = /^export\s+const\s+metadata\s*=/m;
    if (metadataRegex.test(content)) {
      result.warnings.push('MDX 文件中仍包含 ESM metadata export，建議移除');
    }

    // 檢查內容長度
    if (content.trim().length < 100) {
      result.warnings.push('文章內容可能過短');
    }

    // 檢查是否有標題
    if (!content.includes('#')) {
      result.warnings.push('文章缺少標題（Markdown 標題）');
    }

  } catch (error: any) {
    result.valid = false;
    result.errors.push(`MDX 內容驗證失敗: ${error?.message || String(error)}`);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  validateAllPosts();
}

export { validateAllPosts, validatePost };