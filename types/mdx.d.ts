// types/mdx.d.ts
declare module '*.mdx' {
  import { BlogMetadata } from '@/app/types/blog';
  
  const metadata: BlogMetadata;
  export { metadata };
  
  // MDX 內容的默認導出
  const MDXContent: (props: any) => JSX.Element;
  export default MDXContent;
}
