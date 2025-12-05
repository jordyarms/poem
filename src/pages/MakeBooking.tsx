import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Edit, ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react';
import AvailabilityGrid from '@/components/poems/AvailabilityGrid';
import { Button } from '@/components/ui/button';
import {
  mockBookingAccounts,
  mockBookingRoles,
  mockBookingLocations,
  generateWorkerHeatmap,
} from '@/data/mockData';

export default function MakeBooking() {
  const [selectedAccount, setSelectedAccount] = useState('acc-1');
  const [selectedRole, setSelectedRole] = useState('role-survey');
  const [selectedLocation, setSelectedLocation] = useState('loc-1');
  const [weekOffset, setWeekOffset] = useState(0);

  // Generate dates for the current week + offset
  const dateRange = useMemo(() => {
    const dates: Date[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (weekOffset * 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [weekOffset]);

  // Generate heatmap data
  const heatmapData = useMemo(() => generateWorkerHeatmap(), [weekOffset]);

  const selectedAccountData = mockBookingAccounts.find(acc => acc.id === selectedAccount);
  const selectedRoleData = mockBookingRoles.find(role => role.id === selectedRole);
  const selectedLocationData = mockBookingLocations.find(loc => loc.id === selectedLocation);

  const handleSlotClick = (dayIndex: number, hourIndex: number) => {
    console.log('Selected booking slot:', { dayIndex, hourIndex });
    // In a real app, this would open a booking confirmation dialog
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header - Business Blue Theme */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Make a Booking</h1>
        </div>
        <p className="text-muted-foreground">
          Select available time slots and book workers for your requirements
        </p>
      </motion.div>

      {/* Booking Details - Editable Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-6 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Selection */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-2">
              <span>(1) Account</span>
              <Edit className="w-4 h-4 text-blue-600 cursor-pointer" />
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {mockBookingAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {selectedAccountData && (
              <p className="text-xs text-muted-foreground mt-1">
                Balance: ${selectedAccountData.balance.toFixed(2)}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-2">
              <span>(2) Role</span>
              <Edit className="w-4 h-4 text-blue-600 cursor-pointer" />
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {mockBookingRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location Selection */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-2">
              <span>(3) Location</span>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Map
                </button>
                <Edit className="w-4 h-4 text-blue-600 cursor-pointer" />
              </div>
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {mockBookingLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            {selectedLocationData && (
              <p className="text-xs text-muted-foreground mt-1">
                {selectedLocationData.address}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(weekOffset - 1)}
            disabled={weekOffset <= 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">
            {dateRange[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {dateRange[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(weekOffset + 1)}
            disabled={weekOffset >= 4}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedRoleData?.name} availability
        </p>
      </div>

      {/* Worker Availability Heatmap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-lg p-6 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Worker Availability</h2>
        <AvailabilityGrid
          mode="heatmap"
          data={heatmapData}
          dateRange={dateRange}
          timeRange={{ start: 6, end: 18 }}
          timeIncrement={60}
          showNumbers
          onSlotClick={handleSlotClick}
        />
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
          <LinkIcon className="w-4 h-4" />
          Enter detailed Sessions
        </button>

        <div className="flex gap-3">
          <Button variant="outline">
            Save Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Continue to Worker Selection
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900"
      >
        <p>
          <strong>How it works:</strong> Click on time slots to see available workers. Darker blue indicates more workers available.
          Numbers show the exact count of qualified workers for each time slot.
        </p>
      </motion.div>
    </div>
  );
}
