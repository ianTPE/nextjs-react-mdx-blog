// scripts/list-posts.ts
import { loadAllPostsMetadata } from '../lib/metadata-loader';

/**
 * 列出所有文章
 */
async function listAllPosts() {
  try {
    console.log('📚 載入所有文章...\n');
    
    const posts = await loadAllPostsMetadata();
    
    if (posts.length === 0) {
      console.log('📭 沒有找到任何文章');
      return;
    }

    console.log(`📖 找到 ${posts.length} 篇文章:\n`);

    // 按日期排序，最新的在前
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const post of sortedPosts) {
      const publishedIcon = post.published ? '✅' : '📝';
      const tagsStr = post.tags.join(', ');
      
      console.log(`${publishedIcon} ${post.title}`);
      console.log(`   📅 日期: ${post.date}`);
      console.log(`   👤 作者: ${post.author || 'Unknown'}`);
      console.log(`   🏷️  標籤: ${tagsStr}`);
      console.log(`   📝 摘要: ${post.summary.substring(0, 100)}${post.summary.length > 100 ? '...' : ''}`);
      console.log(`   🔗 Slug: ${post.slug}`);
      console.log('');
    }

    // 統計信息
    const publishedCount = posts.filter(p => p.published).length;
    const draftCount = posts.length - publishedCount;
    
    console.log('📊 統計信息:');
    console.log(`   已發布: ${publishedCount} 篇`);
    console.log(`   草稿: ${draftCount} 篇`);
    console.log(`   總計: ${posts.length} 篇`);

    // 標籤統計
    const tagCounts = new Map<string, number>();
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    if (tagCounts.size > 0) {
      console.log('\n🏷️  標籤統計:');
      const sortedTags = Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // 顯示前10個最常用的標籤

      sortedTags.forEach(([tag, count]) => {
        console.log(`   ${tag}: ${count} 篇`);
      });
    }

  } catch (error) {
    console.error('❌ 載入文章失敗:', error);
    process.exit(1);
  }
}

/**
 * 列出特定條件的文章
 */
async function listPostsByCondition() {
  const args = process.argv.slice(2);
  
  if (args.includes('--published')) {
    await listPublishedPosts();
  } else if (args.includes('--drafts')) {
    await listDraftPosts();
  } else if (args.includes('--tag')) {
    const tagIndex = args.indexOf('--tag');
    const tag = args[tagIndex + 1];
    if (tag) {
      await listPostsByTag(tag);
    } else {
      console.error('❌ 請提供標籤名稱: --tag <標籤名稱>');
    }
  } else {
    await listAllPosts();
  }
}

/**
 * 列出已發布的文章
 */
async function listPublishedPosts() {
  try {
    const posts = await loadAllPostsMetadata();
    const publishedPosts = posts.filter(p => p.published);
    
    console.log(`📚 已發布的文章 (${publishedPosts.length} 篇):\n`);
    
    publishedPosts.forEach(post => {
      console.log(`✅ ${post.title} (${post.date})`);
    });
  } catch (error) {
    console.error('❌ 載入文章失敗:', error);
  }
}

/**
 * 列出草稿文章
 */
async function listDraftPosts() {
  try {
    const posts = await loadAllPostsMetadata();
    const draftPosts = posts.filter(p => !p.published);
    
    console.log(`📝 草稿文章 (${draftPosts.length} 篇):\n`);
    
    draftPosts.forEach(post => {
      console.log(`📝 ${post.title} (${post.date})`);
    });
  } catch (error) {
    console.error('❌ 載入文章失敗:', error);
  }
}

/**
 * 列出特定標籤的文章
 */
async function listPostsByTag(tag: string) {
  try {
    const posts = await loadAllPostsMetadata();
    const taggedPosts = posts.filter(p => p.tags.includes(tag));
    
    console.log(`🏷️  標籤 "${tag}" 的文章 (${taggedPosts.length} 篇):\n`);
    
    taggedPosts.forEach(post => {
      const publishedIcon = post.published ? '✅' : '📝';
      console.log(`${publishedIcon} ${post.title} (${post.date})`);
    });
  } catch (error) {
    console.error('❌ 載入文章失敗:', error);
  }
}

// 顯示幫助信息
function showHelp() {
  console.log(`
📚 文章列表工具

用法:
  npm run posts:list                 列出所有文章
  npm run posts:list -- --published  列出已發布的文章
  npm run posts:list -- --drafts     列出草稿文章
  npm run posts:list -- --tag <標籤>  列出特定標籤的文章

範例:
  npm run posts:list -- --tag "Next.js"
  `);
}

// 執行腳本
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
  } else {
    listPostsByCondition();
  }
}

export { listAllPosts, listPublishedPosts, listDraftPosts, listPostsByTag };