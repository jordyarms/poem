import { Search, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchFilters {
  status: string;
  activity: string;
  category: string;
  forCondition: string;
  item: string;
  specificFilters: string;
  geoDistance: string;
  geoFrom: string;
}

interface FundAverage {
  label: string;
  value: string;
  change: { value: string; positive: boolean };
  unit?: string;
}

interface UnifundEntry {
  lifespan: string;
  fundName: string;
  capitalDeployed: string;
  capitalRatio: string;
  currentDeposits: string;
  depositors: number;
  growthRate: string;
  cpdph: string;
  hirePeriods: string;
  coverageRange: string;
  fundNo: string;
}

function SearchFilterBar({ filters, onFilterChange }: {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Search unifunds</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Status:</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="protected">Protected</option>
            <option value="currently-active">Currently Active</option>
            <option value="all">All</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Activity:</label>
          <select
            value={filters.activity}
            onChange={(e) => onFilterChange('activity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="insurance">Insurance</option>
            <option value="investment">Investment</option>
            <option value="lending">Lending</option>
            <option value="fund-of-funds">Fund-of-Funds</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Category:</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="item-rental">Item rental</option>
            <option value="services">Services</option>
            <option value="labor">Labor</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">For:</label>
          <select
            value={filters.forCondition}
            onChange={(e) => onFilterChange('forCondition', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="while-rented">While rented</option>
            <option value="while-owned">While owned</option>
            <option value="during-use">During use</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Item:</label>
          <input
            type="text"
            value={filters.item}
            onChange={(e) => onFilterChange('item', e.target.value)}
            placeholder="e.g., bicycles"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Specific filters:</label>
          <input
            type="text"
            value={filters.specificFilters}
            onChange={(e) => onFilterChange('specificFilters', e.target.value)}
            placeholder="Nonstandard Text"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Geographic focus includes:</label>
          <input
            type="number"
            value={filters.geoDistance}
            onChange={(e) => onFilterChange('geoDistance', e.target.value)}
            placeholder="25"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">from:</label>
          <select
            value={filters.geoFrom}
            onChange={(e) => onFilterChange('geoFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="my-home">My home</option>
            <option value="my-office">My office</option>
            <option value="current-location">Current location</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function AverageMetricCard({ metric }: { metric: FundAverage }) {
  const Icon = metric.change.positive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4"
    >
      <h3 className="text-xs font-medium text-gray-600 mb-2">{metric.label}</h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
        {metric.unit && <span className="text-sm text-gray-500">{metric.unit}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium",
          metric.change.positive ? "text-emerald-600" : "text-red-600"
        )}>
          <Icon className="w-4 h-4" />
          {metric.change.value}
        </div>
        <a href="#" className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
          View graph
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

function FundsTable({ funds }: { funds: UnifundEntry[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Lifespan</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Fund Name (abbreviated)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Capital Deployed</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Capital Ratio</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Deposits</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Depositors</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth Rate</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">CpDpH</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Hire Periods</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Coverage Range</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Fund No.</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{fund.lifespan}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">{fund.fundName}</td>
                <td className="py-3 px-4 text-gray-700">{fund.capitalDeployed}</td>
                <td className="py-3 px-4 text-gray-700">{fund.capitalRatio}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">{fund.currentDeposits}</td>
                <td className="py-3 px-4 text-gray-700">{fund.depositors}</td>
                <td className={cn(
                  "py-3 px-4 font-medium",
                  fund.growthRate.startsWith('-') ? "text-red-600" : "text-emerald-600"
                )}>
                  {fund.growthRate}
                </td>
                <td className="py-3 px-4 text-gray-700">{fund.cpdph}</td>
                <td className="py-3 px-4 text-gray-700">{fund.hirePeriods}</td>
                <td className="py-3 px-4 text-gray-700">{fund.coverageRange}</td>
                <td className="py-3 px-4">
                  <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                    {fund.fundNo}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function UnifundRegistry() {
  const [filters, setFilters] = useState<SearchFilters>({
    status: 'protected',
    activity: 'insurance',
    category: 'item-rental',
    forCondition: 'while-rented',
    item: 'Bicycles',
    specificFilters: 'Nonstandard Text',
    geoDistance: '25',
    geoFrom: 'my-home',
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resultCount = 155;

  const averages: FundAverage[] = [
    { label: 'Capital Deployed', value: '79%', change: { value: '2%', positive: true } },
    { label: 'Capital Ratio', value: '37%', change: { value: '2%', positive: false } },
    { label: 'Current Deposits', value: '$13,458', change: { value: '7%', positive: true } },
    { label: 'Depositors', value: '9.2', change: { value: '11%', positive: false } },
    { label: 'Growth', value: '1.8%', change: { value: '1%', positive: true } },
    { label: 'Cost-per-Dollar-per-Hour', value: '$0.012', change: { value: '3%', positive: false } },
  ];

  const mockFunds: UnifundEntry[] = [
    {
      lifespan: '7 days',
      fundName: 'Cargo bikes ridden by employees on delivery routes',
      capitalDeployed: '95%',
      capitalRatio: '20%',
      currentDeposits: '$11,500.00',
      depositors: 5,
      growthRate: '2.6%',
      cpdph: '$0.023',
      hirePeriods: '2 hrs - 1 days',
      coverageRange: '$500 - $2,000',
      fundNo: '1564115',
    },
    {
      lifespan: '6 days',
      fundName: 'Bicycles adapted to carry small children',
      capitalDeployed: '66%',
      capitalRatio: '78%',
      currentDeposits: '$1,687,121.00',
      depositors: 157,
      growthRate: '8.4%',
      cpdph: '$0.049',
      hirePeriods: '7 days - 3 months',
      coverageRange: '$20,000 - $85,000',
      fundNo: '2456882',
    },
    {
      lifespan: '5 months',
      fundName: 'Modern Tricycles (<10 years old)',
      capitalDeployed: '94%',
      capitalRatio: '25%',
      currentDeposits: '$4,132.00',
      depositors: 3,
      growthRate: '-1.6%',
      cpdph: '$0.120',
      hirePeriods: '1 day - 6 months',
      coverageRange: '$200 - $1,000',
      fundNo: '2566544',
    },
    {
      lifespan: '5 months',
      fundName: 'Renters aged 10-12',
      capitalDeployed: '93%',
      capitalRatio: '42%',
      currentDeposits: '$50,774.00',
      depositors: 23,
      growthRate: '0.8%',
      cpdph: '$0.210',
      hirePeriods: '1hr - 12 hrs',
      coverageRange: '$50 - $900',
      fundNo: '2042728',
    },
    {
      lifespan: '10 months',
      fundName: 'Carbon fibre bikes',
      capitalDeployed: '72%',
      capitalRatio: '38%',
      currentDeposits: '$6,352.45',
      depositors: 1,
      growthRate: '0.3%',
      cpdph: '$0.180',
      hirePeriods: '3 days - 7 days',
      coverageRange: '$50 - $10,000',
      fundNo: '1964472',
    },
    {
      lifespan: '1 year',
      fundName: 'Vintage bicycles rented at organized events',
      capitalDeployed: '63%',
      capitalRatio: '60%',
      currentDeposits: '$18,227.25',
      depositors: 2,
      growthRate: '-2.3%',
      cpdph: '$0.036',
      hirePeriods: '1 hour - 6 hours',
      coverageRange: '$100 - $500',
      fundNo: '1628231',
    },
    {
      lifespan: '1.4 years',
      fundName: 'Heavily accessorized bicycles',
      capitalDeployed: '89%',
      capitalRatio: '52%',
      currentDeposits: '$854,332.04',
      depositors: 46,
      growthRate: '-4.6%',
      cpdph: '$0.331',
      hirePeriods: '1 week - 2 weeks',
      coverageRange: '$250 - $4,000',
      fundNo: '1335547',
    },
    {
      lifespan: '2 years',
      fundName: 'Pinarello Dogma range, long term rental',
      capitalDeployed: '45%',
      capitalRatio: '38%',
      currentDeposits: '$1,665,231.09',
      depositors: 4,
      growthRate: '3.2%',
      cpdph: '$0.190',
      hirePeriods: '3 months - 3 months',
      coverageRange: '$1,500 - $4,500',
      fundNo: '1332152',
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unifund Registry</h1>
        <p className="text-gray-600">Search and discover investment funds across the network</p>
      </div>

      <SearchFilterBar filters={filters} onFilterChange={handleFilterChange} />

      <p className="text-sm text-gray-700 mb-6">
        Your search returned <strong>{resultCount} unifunds</strong>
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Averages of these funds <span className="text-sm text-gray-500">(last 7 days <a href="#" className="text-purple-600 hover:text-purple-700">change</a>)</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {averages.map((metric, idx) => (
            <AverageMetricCard key={idx} metric={metric} />
          ))}
        </div>
      </div>

      {/* Returns Comparison Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Returns against all unifunds</h3>
        <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">Comparison chart placeholder - line graph showing performance vs. market</p>
        </div>
      </div>

      {/* Funds Table */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Funds returned by your search</h2>
        <FundsTable funds={mockFunds} />
      </div>
    </div>
  );
}
