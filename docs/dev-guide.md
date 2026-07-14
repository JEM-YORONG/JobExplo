# JobExplo - Development Guide

## Project Overview
JobExplo is a modern, type-safe job search application built with:
- React 19, TypeScript, Vite
- Tailwind CSS for styling
- TanStack Query for server state
- React Router for navigation
- shadcn/ui / Radix UI components

## Folder Structure
```
/\n├── public/ - Static assets\n├── src/\n│   ├── app/ - App configuration (router)\n│   ├── assets/ - Project branding\n│   ├── components/ - Reusable UI components\n│   │   ├── ui/ - Base UI primitives (button, card, etc.)\n│   │   ├── layouts/ - Page layouts\n│   │   ├── job/ - Job-specific components\n│   │   ├── search/ - Search components\n│   │   ├── salary/ - Salary components\n│   │   ├── company/ - Company components\n│   │   └── common/ - Shared utilities\n│   ├── hooks/ - Custom React hooks\n│   ├── api/ - API service layer\n│   ├── types/ - TypeScript type definitions\n│   ├── constants/ - App constants\n│   ├── utils/ - Utility functions\n│   ├── pages/ - Route page components\n│   ├── tests/ - Test setup\n│   ├── styles/ - CSS files\n│   ├── main.tsx - App entry\n│   └── App.tsx - Root component\n├── docs/ - Documentation\n├── vite.config.ts - Build configuration\n└── package.json - Dependencies
```

## Development Workflow

### 1. Environment Setup
```bash
npm install
cp .env.example .env
# Add your RapidAPI keys
npm run dev
```

### 2. Adding a New Feature
1. **Define types** in `src/types/`
2. **Create API service** in `src/api/`
3. **Create React Query hook** in `src/hooks/`
4. **Build UI components** in `src/components/`
5. **Add page** in `src/pages/`
6. **Register route** in `src/app/router.tsx`

### 3. Component Guidelines
- Use functional components with TypeScript
- Implement loading/error/empty states
- Follow accessibility best practices
- Keep components focused on single responsibility

### 4. State Management
- **Server state**: TanStack Query
- **Local UI state**: useState/useReducer
- **Global state**: Context where needed

### 5. Styling
- Tailwind CSS utility classes
- Use design tokens in `index.css`
- Mobile-first responsive design
- Use `cn()` utility for conditional classes

### 6. Testing
```bash
npm run test
```
- Unit tests with Vitest
- Component tests with Testing Library
- Test files in `src/tests/`

### 7. Code Quality
```bash
npm run lint
npm run build
```

## Implementation Checklist
- [ ] Type definitions added
- [ ] API service created
- [ ] React Query hook implemented
- [ ] UI components built
- [ ] Page component created
- [ ] Route registered
- [ ] Tests written
- [ ] Documentation updated
- [ ] Lint and build pass

## Common Patterns
**API Pattern** (src/api/jobs.ts):
- Export service functions
- Map API responses to typed models
- Handle errors gracefully

**Hook Pattern** (src/hooks/use-jobs.ts):
- Use useQuery/useMutation
- Return typed data and states
- Handle loading/error conditions

**Component Pattern**:
- Props with TypeScript interfaces
- Loading skeletons
- Error boundaries
- Empty states