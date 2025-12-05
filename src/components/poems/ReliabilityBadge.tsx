import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReliabilityGrade } from '@/types';

interface ReliabilityBadgeProps {
  grade: ReliabilityGrade;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
}

const gradeColors: Record<ReliabilityGrade, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  2: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  3: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  4: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  5: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  6: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
};

const gradeLabels: Record<ReliabilityGrade, string> = {
  1: 'Exceptional',
  2: 'Excellent',
  3: 'Good',
  4: 'Fair',
  5: 'Needs Improvement',
  6: 'New/Unrated',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

export default function ReliabilityBadge({
  grade,
  size = 'md',
  showLabel = false,
  animate = true,
}: ReliabilityBadgeProps) {
  const colors = gradeColors[grade];
  const label = gradeLabels[grade];

  const BadgeContent = (
    <div
      className={cn(
        'inline-flex items-center space-x-1 rounded-full border font-semibold',
        colors.bg,
        colors.text,
        colors.border,
        sizes[size]
      )}
    >
      <span>Grade {grade}</span>
      {showLabel && <span className="font-normal">· {label}</span>}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
}
