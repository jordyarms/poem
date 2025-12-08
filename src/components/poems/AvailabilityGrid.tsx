import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { AvailabilityGridProps, TimeSlot } from '@/types/availability';

const getSlotColor = (
  slot: TimeSlot,
  mode: 'select' | 'display' | 'heatmap'
): string => {
  if (mode === 'select') {
    return slot.available
      ? 'bg-emerald-100 border-emerald-300 hover:bg-emerald-200'
      : 'bg-gray-50 border-gray-200 hover:bg-gray-100';
  }

  if (mode === 'display') {
    if (slot.booked) {
      return 'bg-blue-500 border-blue-600 text-white';
    }
    return slot.available
      ? 'bg-emerald-100 border-emerald-300'
      : 'bg-gray-50 border-gray-200';
  }

  if (mode === 'heatmap') {
    const count = slot.count || 0;
    // Monochrome blue gradient based on worker density
    if (count === 0) return 'bg-white border-gray-200 text-gray-400';
    if (count === 1) return 'bg-blue-50 border-blue-100 text-blue-700';
    if (count === 2) return 'bg-blue-100 border-blue-200 text-blue-800';
    if (count <= 4) return 'bg-blue-200 border-blue-300 text-blue-900';
    if (count <= 6) return 'bg-blue-300 border-blue-400 text-blue-900';
    if (count <= 8) return 'bg-blue-400 border-blue-500 text-white';
    return 'bg-blue-500 border-blue-600 text-white'; // 9+ workers
  }

  return 'bg-gray-50 border-gray-200';
};

const getSlotLabel = (
  slot: TimeSlot,
  mode: 'select' | 'display' | 'heatmap',
  showNumbers: boolean
): string => {
  if (mode === 'heatmap' && showNumbers) {
    return slot.count?.toString() || '0';
  }
  if (mode === 'display' && slot.booked) {
    return '✓';
  }
  return '';
};

export default function AvailabilityGrid({
  mode,
  data,
  onSlotClick,
  showNumbers = false,
  timeRange = { start: 6, end: 18 },
  timeIncrement = 60,
  dateRange,
  disabled = false,
  className,
}: AvailabilityGridProps) {
  const hours: number[] = [];
  for (let h = timeRange.start; h < timeRange.end; h += timeIncrement / 60) {
    hours.push(h);
  }

  const formatTime = (hour: number): string => {
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return m > 0 ? `${displayHour}:${m.toString().padStart(2, '0')}${period}` : `${displayHour}${period}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSlotClick = (dayIndex: number, hourIndex: number) => {
    if (disabled || !onSlotClick) return;
    const slot = data[dayIndex]?.[hourIndex];
    if (slot) {
      onSlotClick(dayIndex, hourIndex, slot);
    }
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div className="min-w-[600px]">
        {/* Header with dates */}
        <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `100px repeat(${dateRange.length}, 1fr)` }}>
          <div className="text-sm font-medium text-muted-foreground"></div>
          {dateRange.map((date, idx) => (
            <div
              key={idx}
              className="text-center text-xs font-semibold text-foreground p-2 bg-muted rounded-md"
            >
              {formatDate(date)}
            </div>
          ))}
        </div>

        {/* Time slots grid */}
        {hours.map((hour, hourIdx) => (
          <div
            key={hourIdx}
            className="grid gap-1 mb-1"
            style={{ gridTemplateColumns: `100px repeat(${dateRange.length}, 1fr)` }}
          >
            {/* Time label */}
            <div className="text-sm font-medium text-muted-foreground flex items-center pr-2">
              {formatTime(hour)}
            </div>

            {/* Day slots */}
            {dateRange.map((_, dayIdx) => {
              const slot = data[dayIdx]?.[hourIdx];
              if (!slot) return <div key={dayIdx} className="h-12" />;

              const colorClass = getSlotColor(slot, mode);
              const label = getSlotLabel(slot, mode, showNumbers);
              const isClickable = !disabled && mode !== 'display';

              return (
                <motion.button
                  key={dayIdx}
                  whileHover={isClickable ? { scale: 1.05 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  onClick={() => handleSlotClick(dayIdx, hourIdx)}
                  disabled={disabled || mode === 'display'}
                  className={cn(
                    'h-12 border-2 rounded-md transition-colors text-xs font-semibold',
                    'flex items-center justify-center',
                    colorClass,
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  {label}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs">
        {mode === 'select' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border-2 border-gray-200 rounded"></div>
              <span>Unavailable</span>
            </div>
          </>
        )}
        {mode === 'display' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border-2 border-gray-200 rounded"></div>
              <span>Blocked</span>
            </div>
          </>
        )}
        {mode === 'heatmap' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
              <span>None</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-50 border-2 border-blue-100 rounded"></div>
              <span>1-2 workers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 border-2 border-blue-300 rounded"></div>
              <span>3-5 workers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 border-2 border-blue-500 rounded"></div>
              <span>6+ workers</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
