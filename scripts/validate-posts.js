#!/usr/bin/env node

/**
 * 驗證所有 MDX 文章的 metadata 和內容格式
 * 用法: npm run validate-posts 或 node scripts/validate-posts.js
 */

import fs from 'fs';
import path from 'path';
import { extractMetadataFromFile, validateMetadata } from '../lib/metadata-extractor.js';
import { getAllPostSlugs } from '../lib/mdx.js';

interface ValidationError {
  slug: string;
  type: 'metadata' | 'file' | 'image' | 'warning';
  message: string;
}

/**
 * 驗證所有文章
 */
async function validateAllPosts(): Promise<void> {
  console.log('🔍 Starting post validation...\n');
  
  const slugs = getAllPostSlugs();
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  let validCount = 0;

  if (slugs.length === 0) {
    console.log('❌ No posts found to validate');
    return;
  }

  console.log(`📚 Found ${slugs.length} posts to validate\n`);

  for (const slug of slugs) {
    try {
      console.log(`Validating: ${slug}`);
      
      // 檢查基本檔案結構
      const postDir = path.join(process.cwd(), 'content', 'posts', slug);
      const mdxPath = path.join(postDir, 'content.mdx');

      if (!fs.existsSync(mdxPath)) {
        errors.push({
          slug,
          type: 'file',
          message: 'Missing content.mdx file'
        });
        continue;
      }

      // 驗證 MDX metadata
      let metadata;
      let content;
      
      try {
        const result = await extractMetadataFromFile(mdxPath);
        metadata = result.metadata;
        content = result.cleanContent;
      } catch (error) {
        errors.push({
          slug,
          type: 'metadata',
          message: `Metadata parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        continue;
      }

      // 驗證 metadata 完整性
      try {
        validateMetadata(metadata);
      } catch (error) {
        errors.push({
          slug,
          type: 'metadata',
          message: `Metadata validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        continue;
      }

      // 檢查封面圖片
      if (metadata.coverImage) {
        const imagePath = path.join(process.cwd(), 'public', metadata.coverImage);
        if (!fs.existsSync(imagePath)) {
          warnings.push({
            slug,
            type: 'image',
            message: `Cover image not found: ${metadata.coverImage}`
          });
        }
      }

      // 檢查內容長度
      if (content.length < 100) {
        warnings.push({
          slug,
          type: 'warning',
          message: 'Content seems too short (< 100 characters)'
        });
      }

      // 檢查 readingTime 的合理性
      if (metadata.readingTime) {
        const wordCount = content.split(/\s+/).length;
        const estimatedTime = Math.ceil(wordCount / 200); // 假設每分鐘200字
        
        if (Math.abs(metadata.readingTime - estimatedTime) > 3) {
          warnings.push({
            slug,
            type: 'warning',
            message: `ReadingTime (${metadata.readingTime}min) differs significantly from estimated time (${estimatedTime}min)`
          });
        }
      }

      // 檢查組件目錄
      const componentsDir = path.join(postDir, 'components');
      if (fs.existsSync(componentsDir)) {
        const indexPath = path.join(componentsDir, 'index.ts');
        if (!fs.existsSync(indexPath)) {
          warnings.push({
            slug,
            type: 'warning',
            message: 'Components directory exists but missing index.ts barrel file'
          });
        }
      }

      console.log(`✅ ${slug}: Valid`);
      validCount++;
      
    } catch (error) {
      errors.push({
        slug,
        type: 'file',
        message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }

  // 輸出結果
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));
  
  console.log(`✅ Valid posts: ${validCount}/${slugs.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(error => {
      console.log(`  • ${error.slug}: ${error.message}`);
    });
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(warning => {
      console.log(`  • ${warning.slug}: ${warning.message}`);
    });
  }

  if (errors.length === 0) {
    console.log('\n🎉 All posts validated successfully!');
    
    if (warnings.length > 0) {
      console.log('💡 Consider addressing the warnings above for better quality.');
    }
  } else {
    console.log('\n💥 Validation failed! Please fix the errors above.');
    process.exit(1);
  }
}

/**
 * 驗證單篇文章
 */
async function validateSinglePost(slug: string): Promise<void> {
  console.log(`🔍 Validating single post: ${slug}\n`);
  
  try {
    const postDir = path.join(process.cwd(), 'content', 'posts', slug);
    const mdxPath = path.join(postDir, 'content.mdx');

    if (!fs.existsSync(mdxPath)) {
      console.log(`❌ Post not found: ${slug}`);
      process.exit(1);
    }

    const { metadata, cleanContent } = await extractMetadataFromFile(mdxPath);
    validateMetadata(metadata);

    console.log('✅ Post validation successful!');
    console.log('\n📋 Metadata:');
    console.log(`  Title: ${metadata.title}`);
    console.log(`  Date: ${metadata.date}`);
    console.log(`  Author: ${metadata.author}`);
    console.log(`  Tags: ${metadata.tags.join(', ')}`);
    console.log(`  Content length: ${cleanContent.length} characters`);
    
    if (metadata.readingTime) {
      console.log(`  Reading time: ${metadata.readingTime} minutes`);
    }
    
  } catch (error) {
    console.log(`❌ Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

/**
 * 顯示使用說明
 */
function showHelp(): void {
  console.log(`
MDX Posts Validator

Usage:
  npm run validate-posts              Validate all posts
  npm run validate-posts -- <slug>   Validate a specific post
  npm run validate-posts -- --help   Show this help

Examples:
  npm run validate-posts
  npm run validate-posts -- nextjs-mdx-setup
  
The script will:
  ✅ Check if content.mdx files exist
  ✅ Validate ESM metadata format and required fields
  ✅ Check if cover images exist
  ✅ Verify component directory structure
  ⚠️  Warn about potential content issues
`);
}

// 主程式
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.length === 1) {
    await validateSinglePost(args[0]);
  } else {
    await validateAllPosts();
  }
}

// 執行主程式
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { validateAllPosts, validateSinglePost };
