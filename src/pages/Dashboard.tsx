import { Briefcase, DollarSign, TrendingUp, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/poems/StatsCard';
import ReliabilityBadge from '@/components/poems/ReliabilityBadge';
import UtilizationDisplay from '@/components/poems/UtilizationDisplay';
import OpportunityCard from '@/components/poems/OpportunityCard';
import { Button } from '@/components/ui/button';
import { getCurrentUser, mockOpportunities, mockNotifications, mockWorkerProfiles } from '@/data/mockData';
import { useTheme } from '@/contexts/ThemeContext';

export default function Dashboard() {
  const { viewMode, userName, organizationName } = useTheme();
  const currentUser = getCurrentUser();
  const recentOpportunities = mockOpportunities.filter(opp => opp.status === 'open').slice(0, 3);
  const recentNotifications = mockNotifications.slice(0, 3);

  const handleApply = (opportunityId: string) => {
    console.log('Applying to opportunity:', opportunityId);
    // In a real app, this would trigger the application flow
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {userName}
            </h1>
            <p className="text-sm text-muted-foreground">{organizationName}</p>
          </div>
          {viewMode === 'worker' && (
            <ReliabilityBadge grade={currentUser.reliabilityGrade} showLabel />
          )}
        </div>
        <p className="text-muted-foreground">
          {viewMode === 'worker'
            ? "Here's what's happening with your POEMs activity today"
            : 'Your business operations and workforce at a glance'}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {viewMode === 'worker' ? (
          <>
            <StatsCard
              title="Total Bookings"
              value={currentUser.totalBookings}
              subtitle="All-time bookings"
              icon={Briefcase}
              color="emerald"
              trend={{ value: 12, label: 'vs last month' }}
            />
            <StatsCard
              title="Completed"
              value={currentUser.completedBookings}
              subtitle={`${((currentUser.completedBookings / currentUser.totalBookings) * 100).toFixed(1)}% success rate`}
              icon={TrendingUp}
              color="emerald"
              trend={{ value: 5, label: 'vs last month' }}
            />
            <StatsCard
              title="Earnings (Est.)"
              value="$12,480"
              subtitle="This month"
              icon={DollarSign}
              color="purple"
              trend={{ value: 18, label: 'vs last month' }}
            />
            <StatsCard
              title="Upcoming"
              value={5}
              subtitle="Confirmed bookings"
              icon={Calendar}
              color="amber"
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Available Workers"
              value={mockWorkerProfiles.length}
              subtitle="In your pools"
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="Active Bookings"
              value={18}
              subtitle="Currently staffed"
              icon={Briefcase}
              color="blue"
              trend={{ value: 8, label: 'vs last month' }}
            />
            <StatsCard
              title="Monthly Spend"
              value="$47,850"
              subtitle="This month"
              icon={DollarSign}
              color="purple"
              trend={{ value: -5, label: 'vs last month' }}
            />
            <StatsCard
              title="Avg Cost/Hour"
              value="$24.50"
              subtitle="Across all roles"
              icon={TrendingUp}
              color="amber"
            />
          </>
        )}
      </div>

      {/* Performance/Metrics Section */}
      {viewMode === 'worker' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <UtilizationDisplay
                percentage={currentUser.utilization}
                label="Utilization Rate"
                size="lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                <p className="text-3xl font-bold text-foreground">{currentUser.rating}</p>
                <p className="text-xs text-muted-foreground">out of 5.0</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-foreground">
                  {((currentUser.completedBookings / currentUser.totalBookings) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentUser.completedBookings}/{currentUser.totalBookings} bookings
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'business' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Pool Utilization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <UtilizationDisplay percentage={68} label="Worker Pool Utilization" size="lg" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Avg Worker Rating</p>
                <p className="text-3xl font-bold text-foreground">4.6</p>
                <p className="text-xs text-muted-foreground">across all workers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Fill Rate</p>
                <p className="text-3xl font-bold text-foreground">94%</p>
                <p className="text-xs text-muted-foreground">bookings staffed</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {viewMode === 'worker' ? 'Recommended Opportunities' : 'Upcoming Bookings'}
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {viewMode === 'worker' ? (
              recentOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <OpportunityCard opportunity={opportunity} onApply={handleApply} />
                </motion.div>
              ))
            ) : (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Customer Survey - Retail Chain</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {i === 1 ? 'Tomorrow' : i === 2 ? 'In 3 days' : 'Next week'} · 8 workers
                          assigned
                        </p>
                        <div className="flex gap-2 text-xs">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Manchester
                          </span>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                            Confirmed
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£1,920</p>
                        <p className="text-xs text-muted-foreground">Total cost</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.read ? 'bg-muted' : 'bg-primary'
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.createdAt.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
