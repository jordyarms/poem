import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Link as LinkIcon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterBar, { Filter } from '@/components/poems/FilterBar';
import { mockMarketData } from '@/data/mockData';

export default function MarketData() {
  const [marketType, setMarketType] = useState('');
  const [distance, setDistance] = useState('');
  const [location, setLocation] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const filters: Filter[] = [
    {
      id: 'marketType',
      type: 'select',
      label: 'Market / Role Type',
      placeholder: 'All Markets',
      value: marketType,
      onChange: setMarketType,
      options: [
        { value: 'customer-surveys', label: 'Customer Surveys' },
        { value: 'market-research', label: 'Market Research' },
        { value: 'data-entry', label: 'Data Entry' },
        { value: 'retail', label: 'Retail' },
      ],
    },
    {
      id: 'distance',
      type: 'select',
      label: 'Distance',
      placeholder: 'Any Distance',
      value: distance,
      onChange: setDistance,
      options: [
        { value: '5', label: 'Within 5 miles' },
        { value: '10', label: 'Within 10 miles' },
        { value: '25', label: 'Within 25 miles' },
        { value: '50', label: 'Within 50 miles' },
      ],
    },
    {
      id: 'location',
      type: 'select',
      label: 'Location',
      placeholder: 'All Locations',
      value: location,
      onChange: setLocation,
      options: [
        { value: 'london', label: 'London' },
        { value: 'manchester', label: 'Manchester' },
        { value: 'birmingham', label: 'Birmingham' },
        { value: 'leeds', label: 'Leeds' },
      ],
    },
    {
      id: 'timePeriod',
      type: 'select',
      label: 'Time Period',
      placeholder: 'Last 30 Days',
      value: timePeriod,
      onChange: setTimePeriod,
      options: [
        { value: '7', label: 'Last 7 Days' },
        { value: '30', label: 'Last 30 Days' },
        { value: '90', label: 'Last 90 Days' },
        { value: '365', label: 'Last Year' },
      ],
    },
  ];

  const handleClearFilters = () => {
    setMarketType('');
    setDistance('');
    setLocation('');
    setTimePeriod('');
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold">Market Data / What's Happening</h1>
        </div>
        <p className="text-muted-foreground">
          Real-time market insights and trends for your selected markets
        </p>
      </motion.div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onClearAll={handleClearFilters}
        className="mb-6"
      />

      {/* Merge Data Link */}
      <div className="mb-6">
        <button className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
          <LinkIcon className="w-4 h-4" />
          Merge data from multiple markets
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supply/Demand by Day */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Supply / Demand by Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMarketData.supplyDemandByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="supply"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Supply"
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#86efac"
                strokeWidth={2}
                dot={{ fill: '#86efac', r: 4 }}
                name="Demand"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Supply/Demand by Hour */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Supply / Demand by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMarketData.supplyDemandByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="supply"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Supply"
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#86efac"
                strokeWidth={2}
                dot={{ fill: '#86efac', r: 4 }}
                name="Demand"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Period of Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Period of Notice (hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockMarketData.noticePeriod}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Rate per Hour by Day */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Rate per Hour ($) by Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockMarketData.rateByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Rate']}
              />
              <Bar dataKey="rate" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground"
      >
        <p>
          <strong>Note:</strong> Market data is updated in real-time and reflects current supply and demand dynamics.
          Use filters to refine your analysis and identify trends in specific markets or locations.
        </p>
      </motion.div>
    </div>
  );
}
