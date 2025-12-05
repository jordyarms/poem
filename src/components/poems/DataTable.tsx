import { useState, ReactNode, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  selectable?: boolean;
  selectedRows?: Set<string>;
  onRowSelect?: (rowId: string) => void;
  onSelectAll?: (selected: boolean) => void;
  expandable?: boolean;
  expandedContent?: (row: T) => ReactNode;
  sortable?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  actions?: (row: T) => ReactNode;
  rowKey?: string;
  emptyState?: ReactNode;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  selectable = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,
  expandable = false,
  expandedContent,
  sortable = true,
  onSort,
  actions,
  rowKey = 'id',
  emptyState,
  className,
  striped = true,
  hoverable = true,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (key: string) => {
    if (!sortable) return;

    const direction =
      sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';

    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const allSelected = data.length > 0 && data.every((row) => selectedRows.has(row[rowKey]));

  const renderCellContent = (column: Column<T>, row: T) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    // Default renderers
    if (typeof value === 'boolean') {
      return value ? <Check className="w-4 h-4 text-emerald-600" /> : null;
    }

    if (column.key === 'rating' && typeof value === 'number') {
      return (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-3 h-3',
                i < value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
              )}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            {value.toFixed(1)}
          </span>
        </div>
      );
    }

    return value;
  };

  if (data.length === 0 && emptyState) {
    return <div className="p-8 text-center text-muted-foreground">{emptyState}</div>;
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {selectable && (
              <th className="p-3 text-left w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
            )}
            {expandable && <th className="p-3 w-12"></th>}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'p-3 text-sm font-semibold',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  column.align !== 'center' && column.align !== 'right' && 'text-left',
                  column.sortable !== false && sortable && 'cursor-pointer select-none'
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.sortable !== false && sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          'w-3 h-3 -mb-1',
                          sortConfig?.key === column.key && sortConfig.direction === 'asc'
                            ? 'text-primary'
                            : 'text-gray-300'
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          'w-3 h-3',
                          sortConfig?.key === column.key && sortConfig.direction === 'desc'
                            ? 'text-primary'
                            : 'text-gray-300'
                        )}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="p-3 text-right w-32">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const id = row[rowKey];
            const isExpanded = expandedRows.has(id);
            const isSelected = selectedRows.has(id);

            return (
              <Fragment key={id}>
                <tr
                  className={cn(
                    'border-b border-border transition-colors',
                    striped && rowIndex % 2 === 0 && 'bg-muted/20',
                    hoverable && 'hover:bg-muted/40',
                    isSelected && 'bg-primary/10'
                  )}
                >
                  {selectable && (
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onRowSelect?.(id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                  )}
                  {expandable && (
                    <td className="p-3">
                      <button
                        onClick={() => toggleExpand(id)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'p-3 text-sm',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {renderCellContent(column, row)}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-3 text-right">{actions(row)}</td>
                  )}
                </tr>
                <AnimatePresence>
                  {isExpanded && expandedContent && (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border bg-muted/30"
                    >
                      <td
                        colSpan={
                          columns.length +
                          (selectable ? 1 : 0) +
                          (expandable ? 1 : 0) +
                          (actions ? 1 : 0)
                        }
                        className="p-4"
                      >
                        {expandedContent(row)}
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
