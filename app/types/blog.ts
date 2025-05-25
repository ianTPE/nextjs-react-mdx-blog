export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
  category?: string;
  updatedDate?: string;
}

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
  category?: string;
  updatedDate?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
}

export interface PostWithContent {
  metadata: BlogMetadata;
  content: string;
  rawContent: string;
}
