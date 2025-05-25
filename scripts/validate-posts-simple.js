#!/usr/bin/env node

/**
 * 簡化版本的 MDX 文章驗證腳本
 * 使用 CommonJS 格式，避免 ESM 相容性問題
 * 用法: node scripts/validate-posts-simple.js
 */

const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * 從 MDX 內容提取 metadata
 */
function extractMetadata(content) {
  try {
    const metadataRegex = /^export\s+const\s+metadata\s*=\s*({[\s\S]*?});/m;
    const match = content.match(metadataRegex);
    
    if (!match) {
      throw new Error('No metadata export found');
    }

    const metadataString = match[1];
    const evalFunction = new Function(`return ${metadataString}`);
    return evalFunction();
  } catch (error) {
    throw new Error(`Failed to parse metadata: ${error.message}`);
  }
}

/**
 * 驗證 metadata
 */
function validateMetadata(metadata) {
  const required = ['title', 'date', 'author', 'excerpt'];
  
  for (const field of required) {
    if (!metadata[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (metadata.tags && !Array.isArray(metadata.tags)) {
    throw new Error('Tags must be an array');
  }

  if (isNaN(Date.parse(metadata.date))) {
    throw new Error('Invalid date format');
  }

  return true;
}

/**
 * 獲取所有文章 slugs
 */
function getAllPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(slug => {
        const mdxPath = path.join(postsDirectory, slug, 'content.mdx');
        return fs.existsSync(mdxPath);
      });
  } catch (error) {
    console.error('Failed to read posts directory:', error);
    return [];
  }
}

/**
 * 驗證所有文章
 */
function validateAllPosts() {
  console.log('🔍 Starting post validation...\\n');
  
  const slugs = getAllPostSlugs();
  const errors = [];
  const warnings = [];
  let validCount = 0;

  if (slugs.length === 0) {
    console.log('❌ No posts found to validate');
    return;
  }

  console.log(`📚 Found ${slugs.length} posts to validate\\n`);

  for (const slug of slugs) {
    try {
      console.log(`Validating: ${slug}`);
      
      const postDir = path.join(postsDirectory, slug);
      const mdxPath = path.join(postDir, 'content.mdx');

      if (!fs.existsSync(mdxPath)) {
        errors.push(`${slug}: Missing content.mdx file`);
        continue;
      }

      const content = fs.readFileSync(mdxPath, 'utf8');
      
      let metadata;
      try {
        metadata = extractMetadata(content);
        validateMetadata(metadata);
      } catch (error) {
        errors.push(`${slug}: ${error.message}`);
        continue;
      }

      // 檢查封面圖片
      if (metadata.coverImage) {
        const imagePath = path.join(process.cwd(), 'public', metadata.coverImage);
        if (!fs.existsSync(imagePath)) {
          warnings.push(`${slug}: Cover image not found: ${metadata.coverImage}`);
        }
      }

      // 檢查內容長度
      const cleanContent = content.replace(/^export\s+const\s+metadata\s*=\s*{[\s\S]*?};\s*\n*/, '');
      if (cleanContent.length < 100) {
        warnings.push(`${slug}: Content seems too short`);
      }

      console.log(`✅ ${slug}: Valid`);
      validCount++;
      
    } catch (error) {
      errors.push(`${slug}: Unexpected error: ${error.message}`);
    }
  }

  // 輸出結果
  console.log('\\n' + '='.repeat(60));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));
  
  console.log(`✅ Valid posts: ${validCount}/${slugs.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\\n❌ ERRORS:');
    errors.forEach(error => console.log(`  • ${error}`));
  }

  if (warnings.length > 0) {
    console.log('\\n⚠️  WARNINGS:');
    warnings.forEach(warning => console.log(`  • ${warning}`));
  }

  if (errors.length === 0) {
    console.log('\\n🎉 All posts validated successfully!');
    if (warnings.length > 0) {
      console.log('💡 Consider addressing the warnings above.');
    }
    process.exit(0);
  } else {
    console.log('\\n💥 Validation failed! Please fix the errors above.');
    process.exit(1);
  }
}

// 執行驗證
if (require.main === module) {
  validateAllPosts();
}

module.exports = { validateAllPosts, extractMetadata, validateMetadata };
