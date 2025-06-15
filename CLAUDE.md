# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server with Turbo (recommended)
npm run dev

# Development server with Webpack
npm run dev:webpack

# Build for production
npm run build

# Build with Turbo
npm run build:turbo

# Start production server
npm start

# Lint code
npm run lint

# Post validation and management
npm run posts:validate      # Validate all posts using new TypeScript validator
npm run posts:create        # Interactive post creation
npm run posts:list          # List all posts (supports --published, --drafts, --tag flags)

# Component management
npm run components:scan     # Scan for component usage
npm run components:update   # Update component mappings
npm run components:sync     # Update mappings and validate posts

# Legacy validation commands
npm run validate-posts              # Advanced validation
npm run validate-posts-simple       # Simple validation
npm run validate-posts-production   # Production validation
```

## Architecture Overview

This is a Next.js 15+ MDX blog system with a unique **ESM Metadata Architecture** that separates content from metadata for better maintainability.

### Key Architectural Concepts

**ESM Metadata System**: Each blog post consists of three parts:
- `metadata.ts` - Standalone ESM file containing post metadata (title, date, tags, etc.)
- `content.mdx` - Pure MDX content without frontmatter
- `components/` - Optional directory for post-specific React components

**Universal Component Loader**: Custom system (`lib/universal-component-loader.ts`) that:
- Dynamically loads post-specific components at runtime
- Merges global components with local components
- Provides caching and fallback mechanisms
- Supports both SSR and client-side rendering

**Dynamic Metadata Loading**: Runtime metadata loading system (`lib/metadata-loader.ts`) that:
- Uses `eval()` to dynamically execute TypeScript metadata files
- Validates metadata structure and required fields
- Provides filtering and sorting capabilities

### Directory Structure

```
content/posts/[slug]/
├── metadata.ts          # ESM metadata export
├── content.mdx          # Pure MDX content
└── components/          # Post-specific components
    ├── index.ts         # Component exports
    └── *.tsx           # Component implementations
```

### Component System

**Global Components**: Located in `components/mdx/global-components/`
- Available to all posts automatically
- Includes common UI components (Alert, Callout, YouTube, etc.)

**Local Components**: Located in `content/posts/[slug]/components/`
- Post-specific components that override global ones
- Must export through `index.ts` file
- Loaded dynamically at runtime

**Component Priority**: Local components override global components with the same name.

### Critical Development Patterns

**Post Creation Workflow**:
1. Use `npm run posts:create` for interactive creation
2. Edit `content.mdx` for main content
3. Add custom components if needed in `components/` directory
4. Validate with `npm run posts:validate`

**Metadata Structure** (required fields in `metadata.ts`):
```typescript
const metadata: PostMeta = {
  slug: "post-slug",           // Required
  title: "Post Title",         // Required  
  date: "2025-06-15",         // Required (YYYY-MM-DD)
  summary: "Post summary",     // Required
  tags: ["tag1", "tag2"],     // Required (array)
  published: true,            // Required (boolean)
  author: "Author Name",      // Optional
  coverImage: "/path/image"   // Optional
};
```

**Component Loading Pattern**:
```typescript
// In components/index.ts
"use client";
import MyComponent from './MyComponent';
export { MyComponent };
```

### Build System Configuration

**Next.js Configuration**: 
- Uses `@next/mdx` with custom rehype/remark plugins
- Turbopack support with content path aliases
- Webpack fallback configuration for compatibility

**TypeScript Paths**:
- `@/*` maps to root directory
- `@content/*` maps to `./content/*`

**Validation System**: Multiple validation scripts for different environments:
- Development: `posts:validate` (TypeScript-based)
- Production: `validate-posts-production` (comprehensive checks)
- Simple: `validate-posts-simple` (basic validation)

## Development Best Practices

1. **Always use the post management scripts** instead of manually creating directories
2. **Validate posts before committing** with `npm run posts:validate`
3. **Use TypeScript for all components** including post-specific ones
4. **Follow the ESM metadata pattern** - never use frontmatter in MDX files
5. **Test both development and build modes** due to different component loading strategies
6. **Use Turbo mode for development** (`npm run dev`) for better performance

## Common Issues and Solutions

**Component Not Loading**: Check that components are properly exported in `components/index.ts` and use `"use client"` directive for interactive components.

**Metadata Validation Errors**: Ensure all required fields are present and dates follow YYYY-MM-DD format.

**Build Failures**: Run `npm run posts:validate` to catch content issues before building.

**Windows Compatibility**: Scripts are designed to work on Windows with WSL and native environments.