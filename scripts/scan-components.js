/**
 * 掃描所有文章的組件並生成映射
 */

const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(process.cwd(), 'content/posts');

function scanPostComponents() {
  console.log('🔍 掃描所有文章的組件...\n');
  
  const postsWithComponents = [];
  const postsWithoutComponents = [];
  
  if (!fs.existsSync(postsDirectory)) {
    console.error('文章目錄不存在:', postsDirectory);
    return;
  }
  
  const postDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
    
  for (const postSlug of postDirs) {
    const componentsDir = path.join(postsDirectory, postSlug, 'components');
    const indexFile = path.join(componentsDir, 'index.ts');
    
    if (fs.existsSync(componentsDir) && fs.existsSync(indexFile)) {
      try {
        const indexContent = fs.readFileSync(indexFile, 'utf8');
        
        // 檢查是否有export語句（更嚴格的檢查）
        const hasExports = indexContent.includes('export') && 
                          !indexContent.trim().startsWith('/**') && 
                          !indexContent.includes('we\'re not exporting any specific components') &&
                          !indexContent.includes('這裡將導出此文章的自定義組件') &&
                          !/^\s*\/\//.test(indexContent.trim()) && // 不以註釋開始
                          indexContent.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').trim().length > 0; // 移除註釋後有內容
        
        if (hasExports) {
          console.log(`✅ ${postSlug}: 有組件導出`);
          postsWithComponents.push(postSlug);
        } else {
          console.log(`❌ ${postSlug}: 無組件導出 (空index.ts)`);
          postsWithoutComponents.push(postSlug);
        }
      } catch (error) {
        console.log(`❌ ${postSlug}: 讀取index.ts失敗 - ${error.message}`);
        postsWithoutComponents.push(postSlug);
      }
    } else {
      // 沒有components目錄或index.ts文件
      const hasComponentsDir = fs.existsSync(componentsDir);
      const hasIndexFile = fs.existsSync(indexFile);
      
      if (!hasComponentsDir) {
        console.log(`⚪ ${postSlug}: 無components目錄`);
      } else if (!hasIndexFile) {
        console.log(`❌ ${postSlug}: 有components目錄但無index.ts`);
      }
      
      postsWithoutComponents.push(postSlug);
    }
  }
  
  console.log('\n📊 掃描結果統計:');
  console.log(`   ✅ 有組件: ${postsWithComponents.length} 篇`);
  console.log(`   ❌ 無組件: ${postsWithoutComponents.length} 篇`);
  console.log(`   📝 總計: ${postDirs.length} 篇\n`);
  
  // 生成組件映射代碼
  console.log('🔧 生成的組件映射代碼:\n');
  console.log('const componentMappings: Record<string, () => Promise<any>> = {');
  
  postsWithComponents.forEach(slug => {
    console.log(`  '${slug}': () =>`);
    console.log(`    import('../content/posts/${slug}/components/index'),`);
    console.log('');
  });
  
  console.log('};');
  
  console.log('\n📝 有組件的文章列表:');
  postsWithComponents.forEach(slug => {
    console.log(`  - ${slug}`);
  });
  
  return {
    postsWithComponents,
    postsWithoutComponents,
    total: postDirs.length
  };
}

if (require.main === module) {
  scanPostComponents();
}

module.exports = { scanPostComponents };
