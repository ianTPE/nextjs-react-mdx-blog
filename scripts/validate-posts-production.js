// scripts/validate-posts-production.js
const fs = require('fs');
const path = require('path');

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

async function validateAllPosts() {
  console.log('🔍 開始驗證所有文章...\n');

  try {
    const postSlugs = getPostSlugs();
    let validCount = 0;
    let errors = [];

    for (const slug of postSlugs) {
      try {
        validatePost(slug);
        console.log(`✅ ${slug}: 驗證通過`);
        validCount++;
      } catch (error) {
        console.log(`❌ ${slug}: ${error.message}`);
        errors.push(`${slug}: ${error.message}`);
      }
    }

    console.log(`\n📊 驗證結果統計:`);
    console.log(`   ✅ 通過: ${validCount} 篇`);
    console.log(`   ❌ 失敗: ${errors.length} 篇`);
    console.log(`   📝 總計: ${postSlugs.length} 篇`);

    if (errors.length > 0) {
      console.log('\n❌ 有文章驗證失敗：');
      errors.forEach(error => console.log(`   • ${error}`));
      process.exit(1);
    } else {
      console.log('\n🎉 所有文章驗證通過！');
    }

  } catch (error) {
    console.error('❌ 驗證過程發生錯誤:', error);
    process.exit(1);
  }
}

function getPostSlugs() {
  const entries = fs.readdirSync(POSTS_DIRECTORY, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .filter(entry => !entry.name.startsWith('posts_backup'))
    .map(entry => entry.name);
}

function validatePost(slug) {
  const postDir = path.join(POSTS_DIRECTORY, slug);
  const metadataPath = path.join(postDir, 'metadata.ts');
  const contentPath = path.join(postDir, 'content.mdx');

  // 檢查必要文件
  if (!fs.existsSync(metadataPath)) {
    throw new Error('缺少 metadata.ts 文件');
  }

  if (!fs.existsSync(contentPath)) {
    throw new Error('缺少 content.mdx 文件');
  }

  // 簡單的 metadata.ts 內容檢查
  const metadataContent = fs.readFileSync(metadataPath, 'utf8');
  
  const requiredFields = ['title', 'date', 'summary', 'tags'];
  for (const field of requiredFields) {
    if (!metadataContent.includes(`${field}:`)) {
      throw new Error(`metadata.ts 缺少必要欄位: ${field}`);
    }
  }

  // 檢查 MDX 內容
  const mdxContent = fs.readFileSync(contentPath, 'utf8');
  if (mdxContent.trim().length < 50) {
    throw new Error('文章內容過短');
  }
}

if (require.main === module) {
  validateAllPosts();
}

module.exports = { validateAllPosts };