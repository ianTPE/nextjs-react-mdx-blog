/**
 * 自動掃描並更新組件映射表
 * 這個腳本會自動更新 simple-component-loader.ts 文件
 */

const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(process.cwd(), 'content/posts');
const loaderFile = path.join(process.cwd(), 'lib/simple-component-loader.ts');

function scanAndUpdateMappings() {
  console.log('🔍 掃描並自動更新組件映射...\n');
  
  const postsWithComponents = [];
  
  if (!fs.existsSync(postsDirectory)) {
    console.error('文章目錄不存在:', postsDirectory);
    return;
  }
  
  const postDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  // 掃描有組件的文章
  for (const postSlug of postDirs) {
    const componentsDir = path.join(postsDirectory, postSlug, 'components');
    const indexFileTsx = path.join(componentsDir, 'index.tsx');
    const indexFileTs = path.join(componentsDir, 'index.ts');
    
    // Check for either .ts or .tsx extension
    const indexFileExists = fs.existsSync(indexFileTsx) || fs.existsSync(indexFileTs);
    const indexFile = fs.existsSync(indexFileTsx) ? indexFileTsx : indexFileTs;
    
    if (fs.existsSync(componentsDir) && indexFileExists) {
      try {
        const indexContent = fs.readFileSync(indexFile, 'utf8');
        
        // 更嚴格的導出檢查：只有真正的 export 語句才算有效
        const cleanContent = indexContent
          .replace(/\/\*[\s\S]*?\*\//g, '') // 移除塊註釋
          .replace(/\/\/.*$/gm, ''); // 移除行註釋
        
        const hasExports = /export\s+\{[^}]+\}/.test(cleanContent) || // export { ... }
                          /export\s+default/.test(cleanContent) || // export default
                          /export\s+const|let|var|function|class/.test(cleanContent) || // export const/let/var/function/class
                          /export\s+\*/.test(cleanContent); // export *
        
        if (hasExports) {
          console.log(`✅ ${postSlug}: 有組件導出`);
          postsWithComponents.push(postSlug);
        }
      } catch (error) {
        console.log(`❌ ${postSlug}: 讀取index.ts失敗`);
      }
    }
  }
  
  console.log(`\n📊 掃描結果: ${postsWithComponents.length}/${postDirs.length} 篇文章有組件\n`);
  
  // 生成新的映射代碼
  const mappingCode = generateMappingCode(postsWithComponents);
  
  // 讀取並更新 simple-component-loader.ts
  updateLoaderFile(mappingCode, postsWithComponents.length, postDirs.length);
  
  console.log('✅ 組件映射已自動更新！');
  
  return {
    postsWithComponents,
    totalPosts: postDirs.length,
    updated: true
  };
}

function generateMappingCode(postsWithComponents) {
  const mappings = postsWithComponents.map(slug => {
    return `  '${slug}': () =>
    import('../content/posts/${slug}/components/index'),`;
  }).join('\n\n');
  
  return `const componentMappings: Record<string, () => Promise<any>> = {
${mappings}
};`;
}

function updateLoaderFile(newMappingCode, postsWithComponents, totalPosts) {
  if (!fs.existsSync(loaderFile)) {
    console.error('找不到 simple-component-loader.ts 文件');
    return;
  }
  
  let content = fs.readFileSync(loaderFile, 'utf8');
  
  // 更新組件映射
  const mappingRegex = /const componentMappings: Record<string, \(\) => Promise<any>> = \{[\s\S]*?\};/;
  content = content.replace(mappingRegex, newMappingCode);
  
  // 更新統計數字
  const statsRegex = /(totalPosts: )\d+/;
  content = content.replace(statsRegex, `$1${totalPosts}`);
  
  const withoutComponentsRegex = /(postsWithoutComponents: )\d+( - Object\.keys\(componentMappings\)\.length)/;
  content = content.replace(withoutComponentsRegex, `$1${totalPosts}$2`);
  
  // 寫入文件
  fs.writeFileSync(loaderFile, content, 'utf8');
  
  console.log(`📝 已更新 simple-component-loader.ts:`);
  console.log(`   - 組件映射: ${postsWithComponents} 篇`);
  console.log(`   - 總文章數: ${totalPosts} 篇`);
}

if (require.main === module) {
  scanAndUpdateMappings();
}

module.exports = { scanAndUpdateMappings };
