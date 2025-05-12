# Animation Components Guide

This directory contains animation components used throughout the site. Following our performance optimization strategy, we've limited the use of Framer Motion to only specific pages and components.

## Usage Guidelines

### When to use Framer Motion components:
- On the homepage and marketing pages where rich animations enhance user experience
- For UI transitions in non-content heavy sections
- For primary interactive elements that benefit from polished animations

### When to use static alternatives:
- In blog post content and MDX rendered components
- In listing pages with multiple items (use static versions to improve performance)
- For any component that appears multiple times on a single page

## Component Pairs

Each animation component has a static alternative:

1. **MotionCard**
   - `MotionCard.tsx` - Framer Motion version for homepage and marketing
   - `MotionCard.static.tsx` - Static version for blog and content pages

2. **BlogPostContent**
   - `BlogPostContent.tsx` - Original with animations
   - `BlogPostContent.static.tsx` - Static version for better performance on content pages

## Performance Considerations

- Always use the static versions for content pages where users primarily want to read
- Remember that multiple Framer Motion components on a single page can impact performance
- Keep Framer Motion imports isolated to only the components that need them
