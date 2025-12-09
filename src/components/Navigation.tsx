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
  Building,
  Target,
  Truck,
  Coins,
  Activity,
  Shield,
  Layers,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import ModeSwitcher from './ModeSwitcher';
import NavDropdown from './NavDropdown';

interface NavLink {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
}

interface NavGroup {
  type: 'group';
  label: string;
  icon: typeof LayoutDashboard;
  items: NavLink[];
}

interface NavSingleLink {
  type: 'link';
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
}

type NavItem = NavSingleLink | NavGroup;

interface NavConfig {
  worker: NavItem[];
  business: NavItem[];
  policy: NavItem[];
}

const navigationConfig: NavConfig = {
  worker: [
    { type: 'link', path: '/', label: 'Dashboard', icon: LayoutDashboard },
    {
      type: 'group',
      label: 'My Work',
      icon: Briefcase,
      items: [
        { path: '/opportunities', label: 'Opportunities', icon: Briefcase },
        { path: '/availability', label: 'My Availability', icon: Calendar },
        { path: '/roles', label: 'My Roles', icon: Award },
        { path: '/my-checks', label: 'My Checks', icon: Shield },
      ],
    },
    { type: 'link', path: '/market-data', label: 'Market Data', icon: TrendingUp },
    { type: 'link', path: '/finance', label: 'Finance', icon: Wallet },
    { type: 'link', path: '/profile', label: 'Profile', icon: User },
  ],
  business: [
    { type: 'link', path: '/', label: 'Dashboard', icon: LayoutDashboard },
    {
      type: 'group',
      label: 'Hiring',
      icon: Users,
      items: [
        { path: '/booking', label: 'Make Booking', icon: CalendarCheck },
        { path: '/select-workers', label: 'Select Workers', icon: Users },
        { path: '/requirements', label: 'Requirements', icon: LinkIcon },
      ],
    },
    {
      type: 'group',
      label: 'Management',
      icon: Layers,
      items: [
        { path: '/packages', label: 'Packages', icon: Building },
        { path: '/pools', label: 'Worker Pools', icon: Users },
        { path: '/intervention', label: 'Interventions', icon: Target },
      ],
    },
    { type: 'link', path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { type: 'link', path: '/finance', label: 'Finance', icon: Wallet },
    { type: 'link', path: '/profile', label: 'Profile', icon: User },
  ],
  policy: [
    { type: 'link', path: '/', label: 'Dashboard', icon: LayoutDashboard },
    {
      type: 'group',
      label: 'Programs',
      icon: Settings,
      items: [
        { path: '/my-funds', label: 'My Funds', icon: Wallet },
        { path: '/mornings-routes', label: 'Morning Routes', icon: Truck },
        { path: '/unifund-registry', label: 'Unifund Registry', icon: Coins },
        { path: '/transition-dashboard', label: 'Transition Dashboard', icon: Activity },
      ],
    },
    { type: 'link', path: '/profile', label: 'Profile', icon: User },
  ],
};

export default function Navigation() {
  const location = useLocation();
  const { viewMode } = useTheme();

  // Get navigation items based on current mode
  const visibleNavItems = navigationConfig[viewMode];

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
            {visibleNavItems.map((item, index) => {
              if (item.type === 'link') {
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
              } else {
                return (
                  <NavDropdown
                    key={`group-${index}`}
                    label={item.label}
                    icon={item.icon}
                    items={item.items}
                    viewMode={viewMode}
                  />
                );
              }
            })}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-4">
            <ModeSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4 grid grid-cols-5 gap-2">
          {visibleNavItems
            .filter((item) => item.type === 'link')
            .slice(0, 5)
            .map((item) => {
              if (item.type === 'link') {
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
              }
              return null;
            })}
        </div>
      </div>
    </nav>
  );
}
