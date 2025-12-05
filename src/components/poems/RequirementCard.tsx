import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface RequirementCardProps {
  id: string;
  title: string;
  icon: ReactNode;
  onRemove: () => void;
  onRefine?: () => void;
  children: ReactNode;
  canAlignWith?: Array<{ id: string; label: string }>;
  onAlignChange?: (alignWithId: string | null) => void;
  alignedWith?: string | null;
  className?: string;
}

export default function RequirementCard({
  id,
  title,
  icon,
  onRemove,
  onRefine,
  children,
  canAlignWith,
  onAlignChange,
  alignedWith,
  className,
}: RequirementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn('bg-card border border-border rounded-lg p-5 shadow-sm', className)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">{icon}</div>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-xs text-muted-foreground">Requirement #{id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onRefine && (
            <Button variant="outline" size="sm" onClick={onRefine}>
              Refine
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onRemove} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mb-4">{children}</div>

      {/* Alignment Option */}
      {canAlignWith && canAlignWith.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm font-medium">Align with:</label>
            <select
              value={alignedWith || ''}
              onChange={(e) => onAlignChange?.(e.target.value || null)}
              className="flex-1 px-3 py-1.5 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">None (specify manually)</option>
              {canAlignWith.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {alignedWith && (
            <p className="text-xs text-muted-foreground mt-2 ml-6">
              This requirement will automatically use the same location, date, and time as the selected requirement.
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
