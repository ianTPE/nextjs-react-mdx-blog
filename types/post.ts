export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published: boolean;
  author?: string;
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}