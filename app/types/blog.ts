export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
}
