export interface TimeSlot {
  day: Date;
  hour: number; // 0-23
  available: boolean;
  booked?: boolean;
  count?: number; // for heatmap mode
  metadata?: {
    bookingId?: string;
    workerCount?: number;
    utilization?: number;
  };
}

export type AvailabilityMode = 'select' | 'display' | 'heatmap';

export interface AvailabilityGridProps {
  mode: AvailabilityMode;
  data: TimeSlot[][];
  onSlotClick?: (day: number, hour: number, slot: TimeSlot) => void;
  showNumbers?: boolean; // for heatmap mode
  timeRange?: { start: number; end: number }; // default 6-18 (6AM-6PM)
  timeIncrement?: number; // minutes (default 60)
  dateRange: Date[];
  disabled?: boolean;
  className?: string;
}
