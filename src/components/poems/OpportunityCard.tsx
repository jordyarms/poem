import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReliabilityBadge from './ReliabilityBadge';
import { cn } from '@/lib/utils';
import type { Opportunity } from '@/types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply?: (id: string) => void;
  className?: string;
}

export default function OpportunityCard({
  opportunity,
  onApply,
  className,
}: OpportunityCardProps) {
  const startTime = new Date(opportunity.startTime);
  const endTime = new Date(opportunity.endTime);
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-card border border-border rounded-lg p-5 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {opportunity.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {opportunity.businessName}
          </p>
        </div>
        <ReliabilityBadge grade={opportunity.requiredGrade} size="sm" />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {opportunity.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{opportunity.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-semibold">
            ${opportunity.hourlyRate}/hr
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">
            {startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{duration}h</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {opportunity.category}
        </span>
        <Button
          size="sm"
          onClick={() => onApply?.(opportunity.id)}
          disabled={opportunity.status !== 'open'}
        >
          {opportunity.status === 'open' ? 'Apply Now' : 'Filled'}
        </Button>
      </div>
    </motion.div>
  );
}
