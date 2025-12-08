import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  CalendarCheck,
  Award,
  Users,
  Link as LinkIcon,
  TrendingUp,
  Wallet,
  BarChart3,
  User,
  Search,
  Building,
  Target,
  Truck,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme, ViewMode } from '@/contexts/ThemeContext';
import ModeSwitcher from './ModeSwitcher';

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  modes: ViewMode[];
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, modes: ['worker', 'business', 'policy'] },

  // Worker-specific
  { path: '/opportunities', label: 'Opportunities', icon: Briefcase, modes: ['worker'] },
  { path: '/availability', label: 'My Availability', icon: Calendar, modes: ['worker'] },
  { path: '/roles', label: 'My Roles', icon: Award, modes: ['worker'] },
  { path: '/market-data', label: 'Market Data', icon: TrendingUp, modes: ['worker'] },

  // Business-specific
  { path: '/booking', label: 'Make Booking', icon: CalendarCheck, modes: ['business'] },
  { path: '/select-workers', label: 'Select Workers', icon: Users, modes: ['business'] },
  { path: '/requirements', label: 'Requirements', icon: LinkIcon, modes: ['business'] },
  { path: '/packages', label: 'Packages', icon: Building, modes: ['business'] },
  { path: '/pools', label: 'Worker Pools', icon: Users, modes: ['business'] },
  { path: '/intervention', label: 'Interventions', icon: Target, modes: ['business'] },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, modes: ['business'] },

  // Policy-specific
  { path: '/my-funds', label: 'My Funds', icon: Wallet, modes: ['policy'] },
  { path: '/mornings-routes', label: 'Morning Routes', icon: Truck, modes: ['policy'] },
  { path: '/unifund-registry', label: 'Unifund Registry', icon: Coins, modes: ['policy'] },

  // Shared
  { path: '/finance', label: 'Finance', icon: Wallet, modes: ['worker', 'business'] },
  { path: '/profile', label: 'Profile', icon: User, modes: ['worker', 'business', 'policy'] },
  { path: '/search', label: 'Search', icon: Search, modes: ['worker', 'business', 'policy'] },
];

export default function Navigation() {
  const location = useLocation();
  const { viewMode } = useTheme();

  // Filter navigation items based on current mode
  const visibleNavItems = navItems.filter((item) => item.modes.includes(viewMode));

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-md flex items-center justify-center',
                  viewMode === 'worker' && 'bg-emerald-600',
                  viewMode === 'business' && 'bg-blue-600',
                  viewMode === 'policy' && 'bg-purple-600'
                )}
              >
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">POEMs</span>
            </Link>

            {/* Mode Badge */}
            <div
              className={cn(
                'hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium',
                viewMode === 'worker' && 'bg-emerald-100 text-emerald-700',
                viewMode === 'business' && 'bg-blue-100 text-blue-700',
                viewMode === 'policy' && 'bg-purple-100 text-purple-700'
              )}
            >
              {viewMode === 'worker' && '🟢 Worker'}
              {viewMode === 'business' && '🔵 Business'}
              {viewMode === 'policy' && '🟣 Policy'}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive && viewMode === 'worker' && 'bg-emerald-600 text-white',
                    isActive && viewMode === 'business' && 'bg-blue-600 text-white',
                    isActive && viewMode === 'policy' && 'bg-purple-600 text-white',
                    !isActive && 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-4">
            <ModeSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4 grid grid-cols-5 gap-2">
          {visibleNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center space-y-1 px-2 py-2 rounded-md text-xs transition-colors',
                  isActive && viewMode === 'worker' && 'bg-emerald-600 text-white',
                  isActive && viewMode === 'business' && 'bg-blue-600 text-white',
                  isActive && viewMode === 'policy' && 'bg-purple-600 text-white',
                  !isActive && 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="truncate w-full text-center">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
