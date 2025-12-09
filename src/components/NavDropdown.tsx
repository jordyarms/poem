import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ViewMode } from '@/contexts/ThemeContext';

interface DropdownItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavDropdownProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: DropdownItem[];
  viewMode: ViewMode;
}

export default function NavDropdown({ label, icon: Icon, items, viewMode }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAnyItemActive = items.some((item) => location.pathname === item.path);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
          isAnyItemActive && viewMode === 'worker' && 'bg-emerald-600 text-white',
          isAnyItemActive && viewMode === 'business' && 'bg-blue-600 text-white',
          isAnyItemActive && viewMode === 'policy' && 'bg-purple-600 text-white',
          !isAnyItemActive && 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full pt-2 -mt-2">
          <div className="w-48 bg-white border border-gray-200 rounded-md shadow-xl py-1">
            {items.map((item) => {
              const ItemIcon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm transition-colors',
                    isActive && viewMode === 'worker' && 'bg-emerald-50 text-emerald-700 font-medium',
                    isActive && viewMode === 'business' && 'bg-blue-50 text-blue-700 font-medium',
                    isActive && viewMode === 'policy' && 'bg-purple-50 text-purple-700 font-medium',
                    !isActive && 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <ItemIcon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
