# React Project Structure

## src/
- **components/** - Reusable UI components
- **features/** - Feature-based modules (jobs, search)
- **pages/** - Route-level page components
- **hooks/** - Custom React hooks
- **utils/** - Helper/utility functions
- **styles/** - Global styles and CSS modules
- **assets/** - Images, fonts, and other static assets
- **tests/** - Test files

## Entry Points
- **src/index.tsx** - Main application bootstrap

## Example Component Import
```tsx
// From any file
import { ExampleComponent } from '@/components';
```