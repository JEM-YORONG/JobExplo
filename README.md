# JobExplo Documentation

## Project Purpose
JobExplo is a modern job search platform designed to connect professionals with opportunities. It features:
- Real-time job search with filters
- Salary insights and company data
- User-friendly interface
- API-powered job marketplace

## User Guide
1. **Home Page**: Browse featured jobs or use search bar
2. **Jobs Page**: Filter by location, salary, experience
3. **Job Details**: View full description, apply via links
4. **Salary Insights**: Compare compensation data
5. **Companies Page**: Explore employers

## Development Guide
### Folder Structure
```
/\n├── src/\n│   ├── components/ - Reusable UI elements\n│   ├── pages/ - Main pages (Home, Jobs, Salary)\n│   ├── api/ - API integrations\n│   ├── types/ - Type definitions\n├── docs/ - Documentation files\n...```

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query
- **Routing**: React Router
- **APIs**: RapidAPI integration (https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)

## Implementation Process
1. Define feature requirements
2. Create corresponding components
3. Integrate with routing
4. Add API calls (api/jobs.ts pattern)
5. Implement state management
6. Write tests
7. Build and deploy