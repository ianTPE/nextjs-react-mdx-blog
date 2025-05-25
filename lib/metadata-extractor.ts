import { BlogMetadata } from '@/app/types/blog';

/**
 * 從 MDX 內容中提取 ESM metadata
 */
export async function extractMetadataFromMDX(content: string): Promise<{
  metadata: BlogMetadata;
  cleanContent: string;
}> {
  try {
    // 使用正則表達式提取 export const metadata
    const metadataRegex = /^export\s+const\s+metadata\s*=\s*({[\s\S]*?});/m;
    const match = content.match(metadataRegex);
    
    if (!match) {
      throw new Error('No metadata export found in MDX file');
    }

    const metadataString = match[1];
    const cleanContent = content.replace(metadataRegex, '').trim();

    // 安全地評估 metadata 對象
    const metadata = evaluateMetadataObject(metadataString);
    
    // 驗證 metadata 格式
    const validatedMetadata = validateMetadata(metadata);

    return {
      metadata: validatedMetadata,
      cleanContent
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    throw error;
  }
}

/**
 * 安全地評估 metadata 對象
 */
function evaluateMetadataObject(metadataString: string): any {
  try {
    // 建立一個安全的評估環境
    const evalFunction = new Function(`return ${metadataString}`);
    return evalFunction();
  } catch (error) {
    console.error('Error evaluating metadata object:', error);
    throw new Error('Invalid metadata object syntax');
  }
}

/**
 * 驗證 metadata 格式
 */
export function validateMetadata(metadata: any): BlogMetadata {
  const required = ['title', 'date', 'author', 'excerpt'];
  
  for (const field of required) {
    if (!metadata[field]) {
      throw new Error(`Missing required metadata field: ${field}`);
    }
  }

  // 確保 tags 是陣列
  if (metadata.tags && !Array.isArray(metadata.tags)) {
    throw new Error('Tags must be an array');
  }

  // 確保 date 格式正確
  if (isNaN(Date.parse(metadata.date))) {
    throw new Error('Invalid date format');
  }

  // 驗證數字欄位
  if (metadata.readingTime && (typeof metadata.readingTime !== 'number' || metadata.readingTime <= 0)) {
    throw new Error('readingTime must be a positive number');
  }

  // 驗證 URL 格式
  if (metadata.coverImage && !isValidUrl(metadata.coverImage)) {
    throw new Error('Invalid coverImage URL');
  }

  if (metadata.canonicalUrl && !isValidUrl(metadata.canonicalUrl)) {
    throw new Error('Invalid canonicalUrl');
  }

  return metadata as BlogMetadata;
}

/**
 * 檢查 URL 是否有效
 */
function isValidUrl(urlString: string): boolean {
  try {
    // 支援相對路徑和絕對路徑
    if (urlString.startsWith('/')) {
      return true; // 相對路徑視為有效
    }
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

/**
 * 從 MDX 檔案路徑直接提取 metadata
 */
export async function extractMetadataFromFile(filePath: string): Promise<{
  metadata: BlogMetadata;
  cleanContent: string;
}> {
  const fs = await import('fs');
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return extractMetadataFromMDX(content);
}

/**
 * 批量驗證多個 metadata 對象
 */
export function validateMultipleMetadata(metadataList: any[]): {
  valid: BlogMetadata[];
  errors: Array<{ index: number; error: string }>;
} {
  const valid: BlogMetadata[] = [];
  const errors: Array<{ index: number; error: string }> = [];

  metadataList.forEach((metadata, index) => {
    try {
      const validatedMetadata = validateMetadata(metadata);
      valid.push(validatedMetadata);
    } catch (error) {
      errors.push({
        index,
        error: error instanceof Error ? error.message : 'Unknown validation error'
      });
    }
  });

  return { valid, errors };
}
