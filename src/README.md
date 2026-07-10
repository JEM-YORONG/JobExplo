# React Project Structure

## src/
- **components/** - Reusable UI components
- **pages/** - Route-level page components
- **hooks/** - Custom React hooks
- **utils/** - Helper/utility functions
- **context/** - React Context providers/consumers
- **routes/** - Application routing configuration
- **theme/** - Theme tokens, colors, typography
- **providers/** - Global app providers (router, query, theme)
- **styles/** - Global styles and CSS modules
- **assets/** - Images, fonts, and other static assets

## Entry Points
- **src/index.tsx** - Main application bootstrap

## Example Component Import
```tsx
// From any file
import { ExampleComponent } from '@/components';
```