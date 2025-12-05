import { ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Filter {
  id: string;
  type: 'select' | 'search' | 'date' | 'custom';
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  value?: any;
  onChange?: (value: any) => void;
  render?: () => ReactNode;
}

export interface FilterBarProps {
  filters: Filter[];
  onClearAll?: () => void;
  className?: string;
  showClearAll?: boolean;
}

export default function FilterBar({
  filters,
  onClearAll,
  className,
  showClearAll = true,
}: FilterBarProps) {
  const hasActiveFilters = filters.some((f) => {
    if (f.type === 'search') return f.value && f.value.length > 0;
    if (f.type === 'select') return f.value && f.value !== '';
    if (f.type === 'date') return f.value;
    return false;
  });

  return (
    <div className={cn('flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-lg', className)}>
      {filters.map((filter) => {
        if (filter.type === 'custom' && filter.render) {
          return (
            <div key={filter.id} className="flex-shrink-0">
              {filter.render()}
            </div>
          );
        }

        if (filter.type === 'search') {
          return (
            <div key={filter.id} className="relative flex-1 min-w-[200px]">
              {filter.label && (
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  {filter.label}
                </label>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={filter.placeholder || 'Search...'}
                  value={filter.value || ''}
                  onChange={(e) => filter.onChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {filter.value && (
                  <button
                    onClick={() => filter.onChange?.('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        }

        if (filter.type === 'select') {
          return (
            <div key={filter.id} className="flex-shrink-0">
              {filter.label && (
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  {filter.label}
                </label>
              )}
              <select
                value={filter.value || ''}
                onChange={(e) => filter.onChange?.(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-[150px]"
              >
                <option value="">{filter.placeholder || 'All'}</option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (filter.type === 'date') {
          return (
            <div key={filter.id} className="flex-shrink-0">
              {filter.label && (
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  {filter.label}
                </label>
              )}
              <input
                type="date"
                value={filter.value || ''}
                onChange={(e) => filter.onChange?.(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          );
        }

        return null;
      })}

      {showClearAll && hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="ml-auto flex-shrink-0"
        >
          <X className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      )}
    </div>
  );
}
