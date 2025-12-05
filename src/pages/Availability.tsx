import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, TrendingUp, Info } from 'lucide-react';
import AvailabilityGrid from '@/components/poems/AvailabilityGrid';
import StatsCard from '@/components/poems/StatsCard';
import { Button } from '@/components/ui/button';
import { TimeSlot } from '@/types/availability';
import { getCurrentUser, mockBookings } from '@/data/mockData';

export default function Availability() {
  const currentUser = getCurrentUser();
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, 1 = next week

  // Generate dates for the next 7 days
  const dateRange = useMemo(() => {
    const dates: Date[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (selectedWeek * 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [selectedWeek]);

  // Generate time slot data
  const generateTimeSlots = (): TimeSlot[][] => {
    const slots: TimeSlot[][] = [];

    dateRange.forEach((date) => {
      const daySlots: TimeSlot[] = [];
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof weeklyPattern;

      // Simple weekly pattern (9-5 weekdays)
      const weeklyPattern = {
        monday: [{ start: 9, end: 17 }],
        tuesday: [{ start: 9, end: 17 }],
        wednesday: [{ start: 9, end: 17 }],
        thursday: [{ start: 9, end: 17 }],
        friday: [{ start: 9, end: 17 }],
        saturday: [],
        sunday: [],
      };

      for (let hour = 6; hour < 18; hour++) {
        const pattern = weeklyPattern[dayOfWeek] || [];
        const isAvailable = pattern.some(p => hour >= p.start && hour < p.end);

        // Check if there's a booking at this time
        const hasBooking = mockBookings.some(booking => {
          const bookingStart = new Date(booking.startTime);
          const bookingDate = bookingStart.toDateString();
          const currentDate = date.toDateString();
          const bookingHour = bookingStart.getHours();

          return bookingDate === currentDate && bookingHour === hour;
        });

        daySlots.push({
          day: date,
          hour,
          available: isAvailable,
          booked: hasBooking,
        });
      }

      slots.push(daySlots);
    });

    return slots;
  };

  const timeSlotData = useMemo(() => generateTimeSlots(), [dateRange]);

  const handleSlotClick = (dayIndex: number, hourIndex: number, slot: TimeSlot) => {
    console.log('Clicked slot:', { dayIndex, hourIndex, slot });
    // In a real app, this would toggle availability
  };

  // Calculate stats
  const totalHoursAvailable = timeSlotData.flat().filter(s => s.available).length;
  const totalHoursBooked = timeSlotData.flat().filter(s => s.booked).length;
  const availableRate = totalHoursAvailable > 0
    ? Math.round((totalHoursBooked / totalHoursAvailable) * 100)
    : 0;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Availability for Work</h1>
        <p className="text-muted-foreground">
          Manage your weekly availability and view upcoming bookings
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Utilization"
          value={`${currentUser.utilization}%`}
          subtitle="Current week"
          icon={TrendingUp}
          color="emerald"
        />
        <StatsCard
          title="Hours Available"
          value={totalHoursAvailable}
          subtitle="This week"
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="Hours Booked"
          value={totalHoursBooked}
          subtitle={`${availableRate}% of available time`}
          icon={Calendar}
          color="purple"
        />
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold mb-1">How to use availability management</p>
          <p>Click on time slots to toggle your availability. Green slots are available, blue slots are booked, and gray slots are blocked.</p>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button
            variant={selectedWeek === 0 ? 'default' : 'outline'}
            onClick={() => setSelectedWeek(0)}
            size="sm"
          >
            Current Week
          </Button>
          <Button
            variant={selectedWeek === 1 ? 'default' : 'outline'}
            onClick={() => setSelectedWeek(1)}
            size="sm"
          >
            Next Week
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {dateRange[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {dateRange[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Availability Grid - Display Mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
        <AvailabilityGrid
          mode="display"
          data={timeSlotData}
          dateRange={dateRange}
          timeRange={{ start: 6, end: 18 }}
          timeIncrement={60}
          onSlotClick={handleSlotClick}
        />
      </motion.div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-3">
        <Button variant="outline">
          Copy Last Week's Pattern
        </Button>
        <Button variant="outline">
          Set Regular Hours
        </Button>
        <Button variant="outline">
          Block Time Off
        </Button>
      </div>
    </div>
  );
}
