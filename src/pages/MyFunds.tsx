import { TrendingUp, DollarSign, Droplets, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string;
  change?: { value: string; positive: boolean };
  link?: string;
  icon: typeof TrendingUp;
  color?: string;
}

function MetricCard({ title, value, change, link, icon: Icon, color = 'purple' }: MetricCardProps) {
  const colorClasses = {
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-3"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <h3 className="text-xs font-medium text-gray-600 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <span className={`text-xs font-medium ${change.positive ? 'text-emerald-600' : 'text-red-600'}`}>
            {change.positive ? '↑' : '↓'} {change.value}
          </span>
        )}
      </div>

      {link && (
        <a href="#" className="text-xs text-purple-600 hover:text-purple-700 mt-2 inline-flex items-center gap-1">
          {link}
          <ArrowUpRight className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
}

interface LiquidityCardProps {
  title: string;
  periods: { label: string; value: string }[];
  link?: string;
}

function LiquidityCard({ title, periods, link }: LiquidityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white border border-gray-200 rounded-lg p-3"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border-blue-200">
          <Droplets className="w-5 h-5" />
        </div>
      </div>

      <h3 className="text-xs font-medium text-gray-600 mb-3">{title}</h3>

      <div className="grid grid-cols-3 gap-3">
        {periods.map((period) => (
          <div key={period.label}>
            <p className="text-xs text-gray-500 mb-1">{period.label}</p>
            <p className="text-xl font-bold text-gray-900">{period.value}</p>
          </div>
        ))}
      </div>

      {link && (
        <a href="#" className="text-xs text-purple-600 hover:text-purple-700 mt-2 inline-flex items-center gap-1">
          {link}
          <ArrowUpRight className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
}

interface AccountInfoProps {
  balance: string;
  autoPlaced: string;
  autoReturning: { amount: string; date: string };
  commitments: { date: string; description: string; amount: string }[];
}

function AccountInfo({ balance, autoPlaced, autoReturning, commitments }: AccountInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-gray-200 rounded-lg p-3"
    >
      <h3 className="text-base font-semibold text-gray-900 mb-3">Current Account</h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Balance:</span>
          <span className="text-sm font-semibold text-gray-900">{balance}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Auto-placed:</span>
          <span className="text-sm font-semibold text-gray-900">{autoPlaced}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Auto-returning:</span>
          <span className="text-sm font-medium text-gray-700">
            {autoReturning.amount}, {autoReturning.date}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-600 block mb-1.5">Commitments:</span>
          {commitments.map((commitment, idx) => (
            <div key={idx} className="text-xs text-gray-700 mb-1">
              {commitment.date}, {commitment.description}, {commitment.amount}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-600">Alerts:</span>
          <span className="text-xs text-gray-500">None</span>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <a href="#" className="text-xs text-purple-600 hover:text-purple-700">
          Move money
        </a>
        <span className="text-gray-300">|</span>
        <a href="#" className="text-xs text-purple-600 hover:text-purple-700">
          Change settings
        </a>
        <span className="text-gray-300">|</span>
        <a href="#" className="text-xs text-purple-600 hover:text-purple-700">
          View transactions
        </a>
      </div>
    </motion.div>
  );
}

interface FundEntry {
  date: string;
  invested: string;
  stake: string;
  fundCategory: string;
  fundPurpose: string[];
  geography: string;
  fundNo: string;
}

interface FundsTableProps {
  funds: FundEntry[];
}

function ReturnsTrackingChart() {
  // Dummy data for the last 7 days showing daily returns
  const data = [
    { day: 'Mon', returns: 2.85 },
    { day: 'Tue', returns: 2.92 },
    { day: 'Wed', returns: 2.88 },
    { day: 'Thu', returns: 3.01 },
    { day: 'Fri', returns: 3.08 },
    { day: 'Sat', returns: 3.12 },
    { day: 'Sun', returns: 3.15 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-gray-200 rounded-lg p-3"
    >
      <h3 className="text-base font-semibold text-gray-900 mb-3">Returns Tracking (last 7 days)</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11 }}
            stroke="#6b7280"
          />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="#6b7280"
            domain={[2.5, 3.5]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8 }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Returns']}
          />
          <Line
            type="monotone"
            dataKey="returns"
            stroke="#059669"
            strokeWidth={2}
            dot={{ r: 3, fill: '#059669' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

function FundsTable({ funds }: FundsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-3 mt-4"
    >
      <h3 className="text-base font-semibold text-gray-900 mb-3">Cash Deployed (8 unifunds)</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Date</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Invested</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">My Stake</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Fund Purpose</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Geography</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Fund No.</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 text-gray-700 text-xs">{fund.date}</td>
                <td className="py-2 px-2 text-gray-900 font-medium text-xs">{fund.invested}</td>
                <td className="py-2 px-2 text-gray-700 text-xs">{fund.stake}</td>
                <td className="py-2 px-2 text-gray-700 text-xs">{fund.fundPurpose.join(' ')}</td>
                <td className="py-2 px-2 text-gray-700 text-xs">{fund.geography}</td>
                <td className="py-2 px-2 text-xs">
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    {fund.fundNo}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function MyFunds() {
  const mockFunds: FundEntry[] = [
    {
      date: 'May 13',
      invested: '$250.00',
      stake: '12%',
      fundCategory: 'Investment',
      fundPurpose: ['Worker development', 'Upskilling', 'Recycling Industries'],
      geography: '10 miles home',
      fundNo: '1245269',
    },
    {
      date: 'Mar 27',
      invested: '$500.00',
      stake: '100%',
      fundCategory: 'Insurance',
      fundPurpose: ['Parametric', 'Weather', 'Events'],
      geography: 'Countywide',
      fundNo: '137669',
    },
    {
      date: 'Feb 18',
      invested: '$250.00',
      stake: '0.2%',
      fundCategory: 'Fund-of-Funds',
      fundPurpose: ['Sector focus', 'Services for pet owners', 'Min return: 4%'],
      geography: 'Nationwide',
      fundNo: '1205056',
    },
    {
      date: 'Feb 9',
      invested: '$82.50',
      stake: '3%',
      fundCategory: 'Lending',
      fundPurpose: ['Max period: 14 days', 'Max loan: $80', 'Min. Reliability: Level 3'],
      geography: '5 miles radius',
      fundNo: '879',
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Funds</h1>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <MetricCard
          title="Currently Invested"
          value="$1,653"
          icon={DollarSign}
          link="Investment accounts"
          color="purple"
        />

        <MetricCard
          title="Total Return"
          value="$3.15"
          change={{ value: '9%', positive: true }}
          icon={TrendingUp}
          link="Returns breakdown"
          color="green"
        />

        <LiquidityCard
          title="Current Liquidity"
          periods={[
            { label: '24 hours', value: '17%' },
            { label: '7 days', value: '31%' },
            { label: '28 days', value: '58%' },
          ]}
          link="Liquidity tracker"
        />
      </div>

      {/* Account Info and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        <AccountInfo
          balance="$99.99"
          autoPlaced="$875"
          autoReturning={{ amount: '$580', date: 'May 27' }}
          commitments={[
            { date: 'May 28', description: 'Rent', amount: '$780' },
          ]}
        />

        <ReturnsTrackingChart />
      </div>

      {/* Funds Table */}
      <FundsTable funds={mockFunds} />
    </div>
  );
}
