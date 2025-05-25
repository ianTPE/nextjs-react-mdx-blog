import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, Any

def read_metadata_ts():
    """讀取並解析 metadata.ts 文件"""
    metadata_file = Path('metadata.ts')
    
    if not metadata_file.exists():
        print("❌ 找不到 metadata.ts 文件")
        return {}
    
    print("📖 讀取 metadata.ts...")
    
    with open(metadata_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取 postsMetadata 對象的內容
    # 使用正則表達式找到 postsMetadata 的定義
    pattern = r"export const postsMetadata.*?=\s*({.*?});"
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print("❌ 無法解析 metadata.ts 中的 postsMetadata")
        return {}
    
    metadata_str = match.group(1)
    
    # 手動解析 TypeScript 物件字面值
    metadata = {}
    
    # 找到每個文章的 metadata
    article_pattern = r"'([^']+)':\s*({[^}]*?coverImage:[^}]*?})"
    articles = re.findall(article_pattern, metadata_str, re.DOTALL)
    
    for slug, article_data in articles:
        try:
            # 解析單個文章的 metadata
            article_metadata = parse_article_metadata(article_data)
            if article_metadata:
                metadata[slug] = article_metadata
                print(f"  ✓ 解析文章: {slug}")
        except Exception as e:
            print(f"  ❌ 解析 {slug} 失敗: {e}")
    
    print(f"📊 總共解析了 {len(metadata)} 篇文章的 metadata")
    return metadata

def parse_article_metadata(data_str):
    """解析單個文章的 metadata"""
    metadata = {}
    
    # 解析各個字段
    fields = ['title', 'date', 'excerpt', 'author', 'coverImage']
    
    for field in fields:
        pattern = rf"{field}:\s*'([^']*(?:\\'[^']*)*)'?"
        match = re.search(pattern, data_str)
        if match:
            value = match.group(1).replace("\\'", "'")  # 處理轉義的單引號
            metadata[field] = value
    
    # 特殊處理 tags 陣列
    tags_pattern = r"tags:\s*\[([^\]]*)\]"
    tags_match = re.search(tags_pattern, data_str)
    if tags_match:
        tags_str = tags_match.group(1)
        # 提取所有標籤
        tag_pattern = r"'([^']*)'"
        tags = re.findall(tag_pattern, tags_str)
        metadata['tags'] = tags
    
    return metadata

def generate_metadata_export(metadata):
    """生成 ESM export 字符串"""
    lines = ["export {"]
    
    for key, value in metadata.items():
        if key == 'tags' and isinstance(value, list):
            # 處理標籤陣列
            tags_str = ', '.join([f"'{tag.replace(chr(39), chr(92)+chr(39))}'" for tag in value])
            lines.append(f"  {key}: [{tags_str}],")
        else:
            # 處理字符串值，轉義單引號
            escaped_value = str(value).replace("'", "\\'").replace('\n', '\\n')
            lines.append(f"  {key}: '{escaped_value}',")
    
    lines.append("};")
    lines.append("")  # 空行分隔
    
    return '\n'.join(lines)

def check_if_already_converted(file_path):
    """檢查 MDX 文件是否已經包含 metadata export"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            first_lines = f.read(200)  # 只讀前200個字符
            return 'export {' in first_lines
    except Exception:
        return False

def convert_mdx_file(file_path, metadata):
    """轉換單個 MDX 文件"""
    try:
        # 備份原文件
        backup_path = f"{file_path}.backup"
        shutil.copy2(file_path, backup_path)
        
        # 讀取原文件內容
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # 生成 metadata export
        metadata_export = generate_metadata_export(metadata)
        
        # 合併內容
        new_content = metadata_export + original_content
        
        # 寫入新內容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        # 刪除備份文件（轉換成功）
        os.remove(backup_path)
        
        return True
        
    except Exception as e:
        # 如果出錯，恢復備份
        if os.path.exists(backup_path):
            shutil.copy2(backup_path, file_path)
            os.remove(backup_path)
        print(f"    ❌ 轉換失敗: {e}")
        return False

def main():
    """主程序"""
    print("🚀 開始 MDX Metadata 批量轉換")
    print("=" * 50)
    
    # 檢查當前目錄
    if not os.path.exists('metadata.ts') or not os.path.exists('posts'):
        print("❌ 請確保在 /content 目錄下運行此腳本")
        print("   當前目錄應包含 metadata.ts 和 posts/ 目錄")
        return
    
    # 讀取 metadata
    all_metadata = read_metadata_ts()
    if not all_metadata:
        print("❌ 無法讀取 metadata，程序終止")
        return
    
    print("\n📁 掃描文章目錄...")
    
    posts_dir = Path('posts')
    converted_count = 0
    skipped_count = 0
    failed_count = 0
    
    # 遍歷所有文章目錄
    for article_dir in posts_dir.iterdir():
        if not article_dir.is_dir():
            continue
            
        slug = article_dir.name
        mdx_file = article_dir / 'content.mdx'
        
        if not mdx_file.exists():
            print(f"  ⚠️  {slug}: 找不到 content.mdx")
            continue
        
        # 檢查是否已經轉換
        if check_if_already_converted(mdx_file):
            print(f"  ⏭️  {slug}: 已經包含 metadata export，跳過")
            skipped_count += 1
            continue
        
        # 檢查是否有對應的 metadata
        if slug not in all_metadata:
            print(f"  ❓ {slug}: metadata.ts 中找不到對應的 metadata")
            failed_count += 1
            continue
        
        # 轉換文件
        print(f"  🔄 {slug}: 正在轉換...")
        if convert_mdx_file(mdx_file, all_metadata[slug]):
            print(f"  ✅ {slug}: 轉換成功")
            converted_count += 1
        else:
            failed_count += 1
    
    # 顯示統計結果
    print("\n" + "=" * 50)
    print("📊 轉換統計:")
    print(f"  ✅ 成功轉換: {converted_count} 篇")
    print(f"  ⏭️  已經轉換: {skipped_count} 篇")
    print(f"  ❌ 轉換失敗: {failed_count} 篇")
    print(f"  📝 總計文章: {converted_count + skipped_count + failed_count} 篇")
    
    if converted_count > 0:
        print(f"\n🎉 成功轉換 {converted_count} 篇文章！")
        print("\n📝 下一步:")
        print("1. 檢查轉換後的文件是否正確")
        print("2. 更新代碼邏輯以從 MDX 文件讀取 metadata")
        print("3. 測試文章頁面是否正常顯示")
        print("4. 完成後可以移除或重構 metadata.ts")
    
    print("\n✨ 轉換完成！")

if __name__ == "__main__":
    main()