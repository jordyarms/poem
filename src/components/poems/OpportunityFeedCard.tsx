import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Award, Heart } from 'lucide-react';
import { OpportunityFeedItem } from '@/types';
import { Button } from '@/components/ui/button';

interface OpportunityFeedCardProps {
  opportunity: OpportunityFeedItem;
  onViewDetails?: (id: string) => void;
}

const categoryConfig = {
  investment: {
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    accentColor: 'bg-purple-600',
    icon: TrendingUp,
    label: 'Investment Opportunity',
  },
  buyers: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    accentColor: 'bg-blue-600',
    icon: Users,
    label: 'Buyer Opportunity',
  },
  benefits: {
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    accentColor: 'bg-emerald-600',
    icon: Award,
    label: 'Benefit Opportunity',
  },
  social: {
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    accentColor: 'bg-amber-600',
    icon: Heart,
    label: 'Social Opportunity',
  },
};

export default function OpportunityFeedCard({ opportunity, onViewDetails }: OpportunityFeedCardProps) {
  const config = categoryConfig[opportunity.category];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      className={`bg-card border ${config.borderColor} rounded-lg overflow-hidden group cursor-pointer`}
      onClick={() => onViewDetails?.(opportunity.id)}
    >
      {/* Image */}
      {opportunity.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={opportunity.image}
            alt={opportunity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className={`absolute top-3 right-3 ${config.accentColor} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
            <Icon className="w-3 h-3" />
            {config.label.replace(' Opportunity', '')}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {opportunity.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {opportunity.description}
        </p>

        {/* Metrics */}
        <div className="flex items-center gap-4 mb-4">
          {opportunity.primaryMetric && (
            <div className={`${config.bgColor} ${config.textColor} px-3 py-2 rounded-md flex-1`}>
              <div className="text-xs font-medium opacity-75">{opportunity.primaryMetric.label}</div>
              <div className="text-lg font-bold">{opportunity.primaryMetric.value}</div>
            </div>
          )}

          {opportunity.secondaryMetric && (
            <div className={`${config.bgColor} ${config.textColor} px-3 py-2 rounded-md flex-1`}>
              <div className="text-xs font-medium opacity-75">{opportunity.secondaryMetric.label}</div>
              <div className="text-lg font-bold">{opportunity.secondaryMetric.value}</div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
        >
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
