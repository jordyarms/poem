# POEMs Prototype

**Public Official E-Markets** - An interactive, production-ready prototype for demonstrating the POEMs platform.

This prototype serves multiple purposes:
- 📸 Generate high-quality screenshots for white papers
- 🎥 Enable screen recordings for video demonstrations
- 🌐 Function as an embeddable live demo for landing pages
- 📚 Serve as a reference implementation for future development

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: Zustand (ready to use)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> **For AI Development**: See [CLAUDE.md](./CLAUDE.md) for detailed architecture guidance, development patterns, and important implementation notes when working with this codebase.

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── poems/           # POEMs-specific components
│   │   ├── ReliabilityBadge.tsx
│   │   ├── UtilizationDisplay.tsx
│   │   ├── OpportunityCard.tsx
│   │   └── StatsCard.tsx
│   └── Navigation.tsx   # Main navigation
├── pages/               # Route components
│   ├── Dashboard.tsx    # ✅ Fully implemented reference
│   ├── Opportunities.tsx
│   ├── Availability.tsx
│   ├── BusinessPools.tsx
│   ├── ChainBuilder.tsx
│   ├── MarketInterventions.tsx
│   ├── Finance.tsx
│   ├── Analytics.tsx
│   ├── Profile.tsx
│   └── Search.tsx
├── layouts/             # Layout components
│   └── RootLayout.tsx
├── data/               # Mock data layer
│   └── mockData.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── lib/                # Utilities
│   └── utils.ts
└── router.tsx          # Route configuration
```

## Available Screens

| Route | Screen | Status |
|-------|--------|--------|
| `/` | Worker Dashboard | ✅ Implemented |
| `/opportunities` | Opportunity Browser | 🚧 Placeholder |
| `/availability` | Availability Management | 🚧 Placeholder |
| `/pools` | Business Pools | 🚧 Placeholder |
| `/chains` | Chain Transaction Builder | 🚧 Placeholder |
| `/interventions` | Market Interventions | 🚧 Placeholder |
| `/finance` | Financial Management | 🚧 Placeholder |
| `/analytics` | Analytics & Reporting | 🚧 Placeholder |
| `/profile/:userId?` | Profile & Track Record | 🚧 Placeholder |
| `/search` | Search & Discovery | 🚧 Placeholder |

## Key Components

### ReliabilityBadge
Displays worker reliability grades (1-6) with color coding and optional labels.

```tsx
<ReliabilityBadge grade={1} showLabel={true} animate={true} />
```

### UtilizationDisplay
Animated progress bar for showing utilization percentages.

```tsx
<UtilizationDisplay percentage={87} label="Utilization Rate" />
```

### OpportunityCard
Interactive card component for displaying job opportunities.

```tsx
<OpportunityCard opportunity={opportunity} onApply={handleApply} />
```

### StatsCard
Metric display cards with icons, trends, and animations.

```tsx
<StatsCard
  title="Total Bookings"
  value={156}
  icon={Briefcase}
  color="blue"
  trend={{ value: 12, label: 'vs last month' }}
/>
```

## Mock Data

All mock data is located in `src/data/mockData.ts`:
- Users (workers and businesses)
- Opportunities
- Bookings
- Business Pools
- Chain Transactions
- Market Interventions
- Notifications

## Creating Screenshots

1. Start dev server: `npm run dev`
2. Navigate to the desired screen
3. Use browser dev tools to set viewport (recommended: 1920x1080)
4. Take screenshot using your preferred tool

## Recording Demos

The prototype is optimized for smooth 60fps recordings:
- All animations use Framer Motion
- Realistic timing delays simulate data loading
- Hover states and transitions are polished
- Interactive elements are cursor-friendly

## Embedding

To embed in an iframe:
1. Build for production: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Embed using: `<iframe src="https://your-demo-url.com" />`

The app is self-contained with no external dependencies.

## Design Tokens

CSS variables are defined in `src/index.css`:
- Color system (primary, secondary, muted, accent, destructive)
- Border radius
- Spacing (via Tailwind)
- Typography (via Tailwind)

Dark mode is supported via the `.dark` class.

## Next Steps

1. Implement remaining screens based on requirements
2. Add guided tour/demo mode features
3. Create auto-play sequences for key workflows
4. Optimize bundle size if needed
5. Add analytics/tracking for embedded demos

## Development Notes

- All components support animations via `animate` prop
- Mock data can be easily extended in `mockData.ts`
- Routes are configured in `src/router.tsx`
- Design tokens can be customized in `src/index.css` and `tailwind.config.js`

## License

TBD
