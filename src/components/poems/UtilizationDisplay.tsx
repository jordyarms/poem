import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface UtilizationDisplayProps {
  percentage: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  animate?: boolean;
}

const getUtilizationColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-emerald-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};

const getUtilizationTextColor = (percentage: number) => {
  if (percentage >= 80) return 'text-emerald-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-amber-600';
  return 'text-red-600';
};

const heights = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export default function UtilizationDisplay({
  percentage,
  label = 'Utilization',
  size = 'md',
  showPercentage = true,
  animate = true,
}: UtilizationDisplayProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const color = getUtilizationColor(clampedPercentage);
  const textColor = getUtilizationTextColor(clampedPercentage);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        {showPercentage && (
          <span className={cn('text-sm font-semibold', textColor)}>
            {clampedPercentage}%
          </span>
        )}
      </div>
      <div className={cn('w-full bg-secondary rounded-full overflow-hidden', heights[size])}>
        {animate ? (
          <motion.div
            className={cn('h-full rounded-full', color)}
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={cn('h-full rounded-full', color)}
            style={{ width: `${clampedPercentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
