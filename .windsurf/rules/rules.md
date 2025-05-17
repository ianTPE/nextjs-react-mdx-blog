# Project Rules and Guidelines

## Table of Contents
- [Responsive Design](#responsive-design)
- [Component Structure](#component-structure)
- [Code Style](#code-style)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Documentation](#documentation)

## Responsive Design

### Chart Components
- Use `sm:` breakpoint prefix for desktop-specific styles
- Apply negative margins with `-ml-2 sm:ml-0` for proper mobile alignment
- Set minimum font size to 14px for readability on mobile devices
- Optimize chart data for mobile by reducing data points when necessary
- Test all charts on mobile viewports before deployment

### Layout
- Use Tailwind's responsive prefixes (e.g., `sm:`, `md:`, `lg:`) for all layout changes
- Avoid fixed widths that could cause horizontal scrolling on mobile
- Implement proper viewport meta tags in `_document.js`
- Test all pages on multiple device sizes

## Component Structure

### File Organization
- Place components in the `/components` directory
- Group related components in subdirectories
- Use PascalCase for component file names (e.g., `ResponsiveChart.jsx`)
- Keep components small and focused on a single responsibility

### Naming Conventions
- Use descriptive, intention-revealing names
- Prefix utility components with `with` (e.g., `withMobileDetection`)
- Suffix higher-order components with `HOC`

## Code Style

### JavaScript/TypeScript
- Use ES6+ features (arrow functions, destructuring, etc.)
- Prefer functional components with hooks
- Define prop types for all components
- Use TypeScript for type safety in new components

### Styling
- Use Tailwind CSS utility classes primarily
- For complex styles, use CSS modules with `.module.css` extension
- Follow BEM naming convention for custom CSS classes
- Keep styles scoped to components when possible

## Performance

### Images
- Use Next.js `Image` component for optimized image loading
- Specify `width` and `height` for all images
- Use appropriate image formats (WebP, AVIF) when possible
- Implement lazy loading for below-the-fold content

### Code Splitting
- Use dynamic imports for heavy components
- Implement React.lazy() for route-based code splitting
- Consider using `next/dynamic` for component-level code splitting

## Accessibility

### Semantic HTML
- Use appropriate HTML5 semantic elements
- Ensure proper heading hierarchy (h1 > h2 > h3, etc.)
- Add `alt` text to all images
- Include ARIA labels where necessary

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Implement visible focus states
- Test tab order and keyboard navigation

## Documentation

### Component Documentation
- Document props with PropTypes or TypeScript interfaces
- Include usage examples in storybook or MDX
- Document any known limitations or gotchas

### Project Documentation
- Keep README.md up to date
- Document environment variables in `.env.example`
- Include setup instructions for new developers

## Git Workflow

### Branching
- Use feature branches for new features (`feature/feature-name`)
- Use bugfix branches for fixes (`bugfix/issue-description`)
- Create pull requests for code review

### Commit Messages
- Use conventional commit messages
- Keep commits small and focused
- Reference issue numbers when applicable

## Testing

### Unit Tests
- Write tests for all utility functions
- Test component rendering and interactions
- Aim for at least 80% code coverage

### E2E Tests
- Test critical user flows
- Include mobile and desktop test cases
- Run tests in CI/CD pipeline

## Continuous Integration
- Run tests on every push
- Enforce code style with linters
- Block PRs with failing tests
- Use automated deployments for staging/production

## Security
- Keep dependencies up to date
- Use environment variables for sensitive information
- Implement proper authentication and authorization
- Sanitize all user inputs

## Performance Budget
- Keep bundle size under 200KB (gzipped)
- Aim for Largest Contentful Paint (LCP) under 2.5s
- Keep Time to Interactive (TTI) under 5s on 3G networks

## Browser Support
- Support latest 2 versions of major browsers
- Ensure graceful degradation for older browsers
- Test on real devices when possible

## Monitoring
- Implement error tracking
- Monitor performance metrics
- Set up alerts for critical issues
- Regularly review analytics for UX improvements