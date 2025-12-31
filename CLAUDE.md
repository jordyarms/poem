# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**POEMs Prototype** - Public Official E-Markets interactive prototype built with React 18, TypeScript, and Vite. This is a demo/prototype application designed for generating screenshots, screen recordings, and serving as a live embeddable demo.

## Essential Commands

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Type check + production build
npm run preview          # Preview production build at port 3000
npm run lint             # Run ESLint

# Type checking
tsc -b                   # Check types (runs before build)
```

## Architecture Overview

### Three View Modes System

The application supports three distinct user perspectives, controlled by `ThemeContext`:

1. **Worker View** (default) - Individual worker perspective
   - User: "Yvonne Chen" from "Springfield Workers Co-op"
   - Primary color: emerald/green

2. **Business View** - Employer/business perspective
   - User: "Mark Anderson" from "Acme Insights Inc"
   - Primary color: blue/sky

3. **Policy View** - Government/public agency perspective
   - User: "Sarah Williams" from "Regional Development Fund"
   - Primary color: purple/violet

**Important**: View mode persists in localStorage. Each mode has different navigation items and UI colors defined in `src/components/Navigation.tsx` and `src/contexts/ThemeContext.tsx`.

### Core Architecture Patterns

**Data Flow**:
- All data is mock data from `src/data/mockData.ts` (no backend)
- Types defined in `src/types/index.ts`
- No state management library actively used (Zustand installed but unused)
- Component state only via React hooks

**Routing**:
- React Router v7 configured in `src/router.tsx`
- All routes wrapped in `RootLayout` which provides Navigation
- Navigation items differ based on view mode

**Styling**:
- Tailwind CSS v4 with design tokens in `src/index.css`
- Theme-aware colors via `getThemeColor()` helper
- shadcn/ui base components in `src/components/ui/`
- POEMs-specific components in `src/components/poems/`

**Component Structure**:
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (Button, etc.)
│   ├── poems/           # Domain-specific reusable components
│   ├── Navigation.tsx   # Mode-aware navigation bar
│   ├── ModeSwitcher.tsx # View mode selector dropdown
│   └── NavDropdown.tsx  # Navigation dropdown groups
├── pages/               # Route components (Dashboard, Opportunities, etc.)
├── layouts/             # RootLayout wrapper
├── contexts/            # ThemeContext for view mode
├── data/                # mockData.ts for all mock data
├── types/               # TypeScript interfaces
└── lib/                 # Utilities (cn() for className merging)
```

### Key Reusable Components

**POEMs Components** (`src/components/poems/`):
- `ReliabilityBadge` - Worker reliability grades 1-6 with color coding
- `UtilizationDisplay` - Animated progress bars
- `OpportunityCard` - Job opportunity cards
- `StatsCard` - Metric display with icons and trends
- `DataTable` - Sortable, filterable tables
- `FilterBar` - Search and filter controls
- `AvailabilityGrid` - Calendar/time slot grid
- `WorkerDetailPanel` - Sliding detail panel
- `OpportunityFeedCard` - Feed item cards
- `Map` - Leaflet map integration

**Animations**: All use Framer Motion. Most components support an `animate` prop.

### Pages by Implementation Status

**Fully Implemented**:
- `Dashboard` - Reference implementation
- `MyFunds` - Fund management with charts
- `ThisMorningsRoutes` - Route planning
- `MyChecks` - Check management
- `Opportunities` - Opportunity browser
- `Availability` - Availability management
- `SelectWorkers` - Worker selection interface
- `Requirements` - Multi-step requirements form
- `Packages` - Package selection
- `CreateIntervention` - Market intervention form
- `MakeBooking` - Booking creation

**Placeholder Only**:
- `Analytics`, `BusinessPools`, `ChainBuilder`, `Finance`, `MarketInterventions`, `Profile`, `Search`

### Important Implementation Notes

1. **Navigation Configuration**: Each view mode has different nav items. When adding routes, update the appropriate section in `navigationConfig` in `src/components/Navigation.tsx`.

2. **Theme-Aware Colors**: Use `useTheme()` hook to get current view mode, then use conditional classes:
   ```tsx
   const { viewMode } = useTheme();
   className={cn(
     viewMode === 'worker' && 'bg-emerald-500',
     viewMode === 'business' && 'bg-blue-500',
     viewMode === 'policy' && 'bg-purple-500'
   )}
   ```

3. **Mock Data Structure**: When extending mock data, follow existing patterns in `src/data/mockData.ts`. External images use pravatar.cc and Unsplash URLs.

4. **TypeScript**: The codebase has zero TypeScript errors. Maintain this standard. Avoid `any` types (though some exist in mockData for heatmaps).

5. **Path Aliases**: Use `@/` for imports (resolves to `src/`):
   ```tsx
   import { cn } from '@/lib/utils';
   import { useTheme } from '@/contexts/ThemeContext';
   ```

6. **Build Optimization**: Production builds:
   - Remove console.logs automatically (terser config)
   - Code split into react-vendor and ui-vendor chunks
   - Target bundle: ~260KB gzipped

### Known Technical Debt

Reference `TECHNICAL_DEBT.md` for detailed issues. Key items:

**High Priority**:
- No error boundaries
- No form validation
- No loading/error states for async actions

**Medium Priority**:
- Some `any` types in mockData
- Duplicated input styling (should extract to components)
- Limited accessibility attributes
- Missing navigation links for some routes

**Low Priority**:
- Console.log statements (removed in production builds)

### Development Workflow

1. **Adding a New Page**:
   - Create component in `src/pages/`
   - Add route to `src/router.tsx`
   - Add nav item to appropriate view mode in `src/components/Navigation.tsx`
   - Add types to `src/types/index.ts` if needed
   - Add mock data to `src/data/mockData.ts`

2. **Creating New Components**:
   - POEMs-specific → `src/components/poems/`
   - Generic UI → `src/components/ui/` (use shadcn/ui pattern)
   - Use TypeScript interfaces for props
   - Support theme-aware colors where applicable

3. **Styling Conventions**:
   - Use Tailwind utility classes
   - Theme variables from `src/index.css` (e.g., `bg-background`, `text-foreground`)
   - Consistent spacing: `px-3 py-2` for inputs, `p-6` for cards
   - Use `cn()` from `@/lib/utils` for conditional classes

4. **Charts and Visualizations**:
   - Line/bar charts: use Recharts
   - Candlestick charts: use lightweight-charts v4.2.1
   - Maps: use react-leaflet + leaflet

### Important Gotchas

1. **lightweight-charts version**: Must use v4.2.1 for candlestick support (v4.3+ removed it)
2. **Vite dev server**: Runs on port 3000, not 5173
3. **View mode state**: Persists in localStorage as 'poems-view-mode'
4. **Navigation structure**: Some pages like SelectWorkers, Requirements, Packages aren't in main nav - accessed via flows
5. **No test suite**: This is a prototype - no tests configured
