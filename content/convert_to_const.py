import os
import re
import shutil
from pathlib import Path

def convert_export_to_const(file_path):
    """將 export { } 格式轉換為 export const metadata = { } 格式"""
    try:
        # 備份原文件
        backup_path = f"{file_path}.backup"
        shutil.copy2(file_path, backup_path)
        
        # 讀取文件內容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 檢查是否已經是 const metadata 格式
        if 'export const metadata' in content:
            print(f"  ⏭️  已經是 const metadata 格式，跳過")
            os.remove(backup_path)
            return "skipped"
        
        # 查找 export { } 格式
        export_regex = r'^export\s*\{\s*([\s\S]*?)\s*\};\s*\n*'
        match = re.search(export_regex, content, re.MULTILINE)
        
        if not match:
            print(f"  ❓ 找不到 export 語句")
            os.remove(backup_path)
            return False
        
        # 提取內容
        export_content = match.group(1).strip()
        
        # 構建新的 export const metadata 格式
        new_export = f"export const metadata = {{\n{export_content}\n}};\n\n"
        
        # 替換內容
        new_content = re.sub(export_regex, new_export, content, flags=re.MULTILINE)
        
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
    print("🔄 開始轉換 export 格式")
    print("=" * 50)
    
    # 檢查當前目錄
    if not os.path.exists('posts'):
        print("❌ 請確保在 /content 目錄下運行此腳本")
        print("   當前目錄應包含 posts/ 目錄")
        return
    
    print("📁 掃描文章目錄...")
    
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
        
        print(f"  🔄 {slug}: 正在轉換...")
        result = convert_export_to_const(mdx_file)
        
        if result == "skipped":
            skipped_count += 1
        elif result == True:
            print(f"  ✅ {slug}: 轉換成功")
            converted_count += 1
        else:
            failed_count += 1
    
    # 顯示統計結果
    print("\n" + "=" * 50)
    print("📊 轉換統計:")
    print(f"  ✅ 成功轉換: {converted_count} 篇")
    print(f"  ⏭️  已經正確: {skipped_count} 篇")
    print(f"  ❌ 轉換失敗: {failed_count} 篇")
    print(f"  📝 總計文章: {converted_count + skipped_count + failed_count} 篇")
    
    if converted_count > 0:
        print(f"\n🎉 成功轉換 {converted_count} 篇文章！")
        print("\n📝 現在文章格式為:")
        print("export const metadata = {")
        print("  title: '文章標題',")
        print("  date: '2025-05-22',")
        print("  excerpt: '文章摘要',")
        print("  author: 'Ian Chou',")
        print("  tags: ['標籤1', '標籤2'],")
        print("  coverImage: '/images/posts/封面圖片.webp'")
        print("};")
    
    print("\n✨ 轉換完成！")

if __name__ == "__main__":
    main()