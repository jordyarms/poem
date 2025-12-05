import { motion } from 'framer-motion';
import { Users, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface AnalysisPanelProps {
  beneficiariesCount: number;
  overlappingInterventions?: number;
  publicInterventions?: number;
  estimatedImpact?: string;
  warnings?: string[];
  suggestions?: string[];
}

export default function AnalysisPanel({
  beneficiariesCount,
  overlappingInterventions = 0,
  publicInterventions = 0,
  estimatedImpact,
  warnings = [],
  suggestions = [],
}: AnalysisPanelProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="pb-3 border-b border-border">
        <h3 className="font-bold text-lg">Real-Time Analysis</h3>
        <p className="text-xs text-muted-foreground">Updates based on your criteria</p>
      </div>

      {/* Beneficiaries Count */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">Beneficiaries Identified</span>
        </div>
        <div className="text-3xl font-bold text-emerald-900">{beneficiariesCount.toLocaleString()}</div>
        <p className="text-xs text-emerald-700 mt-1">workers match your criteria</p>
      </motion.div>

      {/* Overlapping Interventions */}
      {overlappingInterventions > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Overlapping Interventions</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{overlappingInterventions}</div>
          <p className="text-xs text-amber-700 mt-1">
            ({publicInterventions} are public)
          </p>
        </div>
      )}

      {/* Estimated Impact */}
      {estimatedImpact && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Estimated Impact</span>
          </div>
          <p className="text-sm text-blue-900 font-semibold">{estimatedImpact}</p>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Warnings
          </h4>
          {warnings.map((warning, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-700">
              {warning}
            </div>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Suggestions
          </h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-700">
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="pt-4 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Coverage:</span>
          <span className="font-semibold">
            {beneficiariesCount > 0 ? ((beneficiariesCount / 8500) * 100).toFixed(1) : 0}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Precision:</span>
          <span className="font-semibold">{beneficiariesCount > 2000 ? 'Low' : beneficiariesCount > 500 ? 'Medium' : 'High'}</span>
        </div>
      </div>
    </div>
  );
}
