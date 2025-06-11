/**
 * 智能預構建腳本
 * 自動檢查組件映射是否需要更新，如果需要則自動更新
 */

const fs = require('fs');
const path = require('path');
const { scanAndUpdateMappings } = require('./update-component-mappings');

const postsDirectory = path.join(process.cwd(), 'content/posts');
const loaderFile = path.join(process.cwd(), 'lib/simple-component-loader.ts');

function smartPrebuild() {
  console.log('🧠 智能預構建開始...\n');
  
  // 檢查組件映射是否需要同步
  const syncResult = checkMappingsSync();
  
  if (syncResult.needsUpdate) {
    console.log('🔧 執行自動更新...');
    scanAndUpdateMappings();
    console.log('✅ 組件映射已自動同步！\n');
  } else {
    console.log('✅ 組件映射已是最新狀態\n');
  }
  
  // 返回結果給後續腳本使用
  return syncResult;
}

function checkMappingsSync() {
  console.log('🔍 檢查組件映射是否需要同步...\n');
  
  // 掃描當前文章狀態
  const currentPostsWithComponents = scanCurrentPosts();
  
  // 讀取現有映射
  const existingMappings = parseExistingMappings();
  
  // 比較差異
  const comparison = comparePostStates(currentPostsWithComponents, existingMappings);
  
  if (comparison.needsUpdate) {
    console.log('📝 檢測到組件映射需要更新:');
    
    if (comparison.added.length > 0) {
      console.log(`   ✅ 新增組件: ${comparison.added.join(', ')}`);
    }
    
    if (comparison.removed.length > 0) {
      console.log(`   ❌ 移除組件: ${comparison.removed.join(', ')}`);
    }
    
    if (comparison.modified.length > 0) {
      console.log(`   🔄 修改組件: ${comparison.modified.join(', ')}`);
    }
    
    console.log('');
  }
  
  return {
    needsUpdate: comparison.needsUpdate,
    current: currentPostsWithComponents,
    existing: existingMappings,
    changes: comparison
  };
}

function scanCurrentPosts() {
  const postsWithComponents = [];
  
  if (!fs.existsSync(postsDirectory)) {
    return postsWithComponents;
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
        
        // 更嚴格的導出檢查：只有真正的 export 語句才算有效
        const cleanContent = indexContent
          .replace(/\/\*[\s\S]*?\*\//g, '') // 移除塊註釋
          .replace(/\/\/.*$/gm, ''); // 移除行註釋
        
        const hasExports = /export\s+\{[^}]+\}/.test(cleanContent) || // export { ... }
                          /export\s+default/.test(cleanContent) || // export default
                          /export\s+const|let|var|function|class/.test(cleanContent) || // export const/let/var/function/class
                          /export\s+\*/.test(cleanContent); // export *
        
        if (hasExports) {
          postsWithComponents.push(postSlug);
        }
      } catch (error) {
        // 忽略讀取錯誤，視為無組件
      }
    }
  }
  
  return postsWithComponents.sort();
}

function parseExistingMappings() {
  if (!fs.existsSync(loaderFile)) {
    return [];
  }
  
  try {
    const content = fs.readFileSync(loaderFile, 'utf8');
    const mappingMatch = content.match(/const componentMappings: Record<string, \(\) => Promise<any>> = \{([\s\S]*?)\};/);
    
    if (!mappingMatch) {
      return [];
    }
    
    const mappingContent = mappingMatch[1];
    const slugMatches = mappingContent.match(/'([^']+)':/g);
    
    if (!slugMatches) {
      return [];
    }
    
    return slugMatches.map(match => match.replace(/['':]/g, '')).sort();
  } catch (error) {
    console.warn('讀取現有映射時出錯:', error.message);
    return [];
  }
}

function comparePostStates(current, existing) {
  const added = current.filter(slug => !existing.includes(slug));
  const removed = existing.filter(slug => !current.includes(slug));
  const modified = []; // 可以擴展檢查組件文件的修改時間
  
  return {
    needsUpdate: added.length > 0 || removed.length > 0 || modified.length > 0,
    added,
    removed,
    modified,
    current,
    existing
  };
}

if (require.main === module) {
  smartPrebuild();
}

module.exports = { 
  smartPrebuild, 
  checkMappingsSync,
  scanCurrentPosts,
  parseExistingMappings 
};
