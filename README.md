This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Why Separate Metadata (metadata.ts) from MDX/TSX Content?

**Best Practice: Always keep metadata (like title, date, tags, excerpt, coverImage, etc) in a separate file, such as `metadata.ts`, instead of mixing YAML frontmatter or `export const ...` in your MDX/TSX content files.**

### Why?

- **Parsing Conflicts**: MDX loaders and TypeScript/JSX compilers may compete to parse the same file. If you use YAML frontmatter in `.tsx` files, or forget to configure MDX plugins, you'll get syntax errors (like `Unexpected token`).
- **Plugin/Config Required**: MDX does not support frontmatter by default. You must install and configure plugins like `remark-frontmatter` and `remark-mdx-frontmatter` for correct parsing. Missing these will break your build.
- **Extension Matters**: Only `.mdx` files with proper loader config can use frontmatter. `.tsx` files will always error on YAML blocks.
- **Maintenance & Clarity**: Keeping all metadata in one place (`metadata.ts`) makes your codebase much easier to maintain, update, and debug.
- **Performance**: Separating metadata allows faster and more reliable builds, as metadata can be loaded and indexed independently.

### CommonMark and Metadata

- CommonMark (the Markdown standard) does **not** define or require frontmatter or metadata blocks. Frontmatter is an ecosystem convention, not a standard.
- Some tools (like Jekyll, Hugo, Docusaurus) support YAML frontmatter, but this is not portable or universal.
- MDX supports metadata via plugins, or by using ESM exports (e.g. `export const title = ...`), but this is not CommonMark standard.

### Recommended Approach

- Store all metadata in a single `metadata.ts` (or `.js`, `.json`, etc) file, and import/use as needed.
- Keep your MDX/TSX files focused on content and components, not metadata.

#### Example

```typescript
// content/metadata.ts
export const postsMetadata = {
  'my-article': {
    title: '我的文章',
    date: '2025-05-12',
    tags: ['CommonMark', 'metadata']
  }
};
```

```mdx
// content/posts/my-article/content.mdx
import { postsMetadata } from '../metadata';

# {postsMetadata['my-article'].title}

內容正文...
```

**Summary:**
- Separating metadata makes your project more robust, maintainable, and avoids confusing build errors.
- This is especially important for complex MDX/TSX projects with lots of React components.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
