import { Search, TrendingUp, TrendingDown, ArrowUpRight, Percent, Wallet, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  icon: typeof TrendingUp;
  color?: string;
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

function SearchFilterBar({
  filters,
  onFilterChange,
}: {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
}) {
  return (
    <div className="bg-white border-[3px] border-gray-400 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-purple-600" />
        <h2 className="text-base font-semibold text-gray-900">
          Search unifunds
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Status:</label>
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="protected">Protected</SelectItem>
              <SelectItem value="currently-active">Currently Active</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Activity:</label>
          <Select
            value={filters.activity}
            onValueChange={(value) => onFilterChange("activity", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="lending">Lending</SelectItem>
              <SelectItem value="fund-of-funds">Fund-of-Funds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Category:</label>
          <Select
            value={filters.category}
            onValueChange={(value) => onFilterChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="item-rental">Item rental</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="labor">Labor</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">For:</label>
          <Select
            value={filters.forCondition}
            onValueChange={(value) => onFilterChange("forCondition", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="while-rented">While rented</SelectItem>
              <SelectItem value="while-owned">While owned</SelectItem>
              <SelectItem value="during-use">During use</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Item:</label>
          <Input
            type="text"
            value={filters.item}
            onChange={(e) => onFilterChange("item", e.target.value)}
            placeholder="e.g., bicycles"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Specific filters:
          </label>
          <Input
            type="text"
            value={filters.specificFilters}
            onChange={(e) => onFilterChange("specificFilters", e.target.value)}
            placeholder="Nonstandard Text"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Geographic focus includes:
          </label>
          <Input
            type="text"
            value={filters.geoDistance}
            onChange={(e) => onFilterChange("geoDistance", e.target.value)}
            placeholder="25 miles"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">from:</label>
          <Select
            value={filters.geoFrom}
            onValueChange={(value) => onFilterChange("geoFrom", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="my-home">My home</SelectItem>
              <SelectItem value="my-office">My office</SelectItem>
              <SelectItem value="current-location">Current location</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function AverageMetricCard({ metric }: { metric: FundAverage }) {
  const ChangeIcon = metric.change.positive ? TrendingUp : TrendingDown;
  const MetricIcon = metric.icon;

  const colorClasses = {
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-400 rounded-lg p-3"
    >
      <div className="flex items-start gap-2 mb-2">
        <div
          className={`p-1.5 rounded-lg ${
            colorClasses[metric.color as keyof typeof colorClasses] ||
            colorClasses.purple
          } flex-shrink-0`}
        >
          <MetricIcon className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-medium text-gray-600 flex-1 pt-1">
          {metric.label}
        </h3>
      </div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-4xl font-bold text-gray-900">{metric.value}</span>
        {metric.unit && (
          <span className="text-xs text-gray-500">{metric.unit}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            metric.change.positive ? "text-emerald-600" : "text-red-600"
          )}
        >
          <ChangeIcon className="w-3 h-3" />
          {metric.change.value}
        </div>
        <a
          href="#"
          className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
        >
          View
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

function ReturnsChart({ coloredTitle = false }: { coloredTitle?: boolean }) {
  // Enhanced dummy data showing more interesting performance patterns
  const data = [
    { month: "Jan", yourFunds: 4.2, allFunds: 4.5 },
    { month: "Feb", yourFunds: 3.8, allFunds: 4.1 },
    { month: "Mar", yourFunds: 5.1, allFunds: 4.3 },
    { month: "Apr", yourFunds: 6.8, allFunds: 4.7 },
    { month: "May", yourFunds: 7.2, allFunds: 5.2 },
    { month: "Jun", yourFunds: 6.9, allFunds: 5.8 },
    { month: "Jul", yourFunds: 8.4, allFunds: 6.1 },
    { month: "Aug", yourFunds: 9.1, allFunds: 6.4 },
    { month: "Sep", yourFunds: 10.3, allFunds: 6.9 },
    { month: "Oct", yourFunds: 9.8, allFunds: 7.2 },
    { month: "Nov", yourFunds: 11.2, allFunds: 7.5 },
    { month: "Dec", yourFunds: 12.4, allFunds: 7.8 },
  ];

  return (
    <div className="bg-white border-[3px] border-gray-400 rounded-lg overflow-hidden">
      <h3
        className={cn(
          "text-base font-semibold px-3 py-2.5",
          coloredTitle
            ? "bg-emerald-50 text-emerald-900 border-b-[3px] border-emerald-100"
            : "text-gray-900 pt-3"
        )}
      >
        Returns against all unifunds
      </h3>
      <div className={coloredTitle ? "px-3 pb-3 pt-3" : ""}>
        <ResponsiveContainer width="100%" height={232}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              label={{
                value: "Return %",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12 },
              }}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} iconType="line" />
            <Line
              type="monotone"
              dataKey="yourFunds"
              stroke="#7c3aed"
              strokeWidth={2}
              name="Your Funds"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="allFunds"
              stroke="#94a3b8"
              strokeWidth={2}
              name="All Unifunds (Avg)"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function FundsTable({
  funds,
  coloredTitle = false,
}: {
  funds: UnifundEntry[];
  coloredTitle?: boolean;
}) {
  return (
    <div className="bg-white border-[3px] border-gray-400 rounded-lg overflow-hidden">
      <h2
        className={cn(
          "text-base font-semibold px-3 py-2.5",
          coloredTitle
            ? "bg-blue-50 text-blue-900 border-b-[3px] border-blue-100"
            : "text-gray-900 border-b border-gray-400"
        )}
      >
        Funds returned by your search
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-400">
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Lifespan
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Fund Name (abbreviated)
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Capital Deployed
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Capital Ratio
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Current Deposits
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Current Depositors
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Growth Rate
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                CpDpH
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Hire Periods
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Coverage Range
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700 text-xs">
                Fund No.
              </th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.lifespan}
                </td>
                <td className="py-2 px-3 text-gray-900 font-medium text-xs">
                  {fund.fundName}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.capitalDeployed}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.capitalRatio}
                </td>
                <td className="py-2 px-3 text-gray-900 font-medium text-xs">
                  {fund.currentDeposits}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.depositors}
                </td>
                <td
                  className={cn(
                    "py-2 px-3 font-medium text-xs",
                    fund.growthRate.startsWith("-")
                      ? "text-red-600"
                      : "text-emerald-600"
                  )}
                >
                  {fund.growthRate}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.cpdph}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.hirePeriods}
                </td>
                <td className="py-2 px-3 text-gray-700 text-xs">
                  {fund.coverageRange}
                </td>
                <td className="py-2 px-3 text-xs">
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
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
    status: "protected",
    activity: "insurance",
    category: "item-rental",
    forCondition: "while-rented",
    item: "Bicycles",
    specificFilters: "Nonstandard Text",
    geoDistance: "25 miles",
    geoFrom: "my-home",
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resultCount = 155;

  const averages: FundAverage[] = [
    {
      label: "Capital Deployed",
      value: "79%",
      change: { value: "2%", positive: true },
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "Capital Ratio",
      value: "37%",
      change: { value: "2%", positive: false },
      icon: Percent,
      color: "blue",
    },
    {
      label: "Current Deposits",
      value: "$13,458",
      change: { value: "7%", positive: true },
      icon: Wallet,
      color: "green",
    },
    {
      label: "Depositors",
      value: "9.2",
      change: { value: "11%", positive: false },
      icon: Users,
      color: "amber",
    },
    {
      label: "Growth",
      value: "1.8%",
      change: { value: "1%", positive: true },
      icon: TrendingUp,
      color: "orange",
    },
    {
      label: "Cost-per-Dollar-per-Hour",
      value: "$0.012",
      change: { value: "3%", positive: false },
      icon: Clock,
      color: "purple",
    },
  ];

  const mockFunds: UnifundEntry[] = [
    {
      lifespan: "7 days",
      fundName: "Cargo bikes ridden by employees on delivery routes",
      capitalDeployed: "95%",
      capitalRatio: "20%",
      currentDeposits: "$11,500.00",
      depositors: 5,
      growthRate: "2.6%",
      cpdph: "$0.023",
      hirePeriods: "2 hrs - 1 days",
      coverageRange: "$500 - $2,000",
      fundNo: "1564115",
    },
    {
      lifespan: "6 days",
      fundName: "Bicycles adapted to carry small children",
      capitalDeployed: "66%",
      capitalRatio: "78%",
      currentDeposits: "$1,687,121.00",
      depositors: 157,
      growthRate: "8.4%",
      cpdph: "$0.049",
      hirePeriods: "7 days - 3 months",
      coverageRange: "$20,000 - $85,000",
      fundNo: "2456882",
    },
    {
      lifespan: "5 months",
      fundName: "Modern Tricycles (<10 years old)",
      capitalDeployed: "94%",
      capitalRatio: "25%",
      currentDeposits: "$4,132.00",
      depositors: 3,
      growthRate: "-1.6%",
      cpdph: "$0.120",
      hirePeriods: "1 day - 6 months",
      coverageRange: "$200 - $1,000",
      fundNo: "2566544",
    },
    {
      lifespan: "5 months",
      fundName: "Renters aged 10-12",
      capitalDeployed: "93%",
      capitalRatio: "42%",
      currentDeposits: "$50,774.00",
      depositors: 23,
      growthRate: "0.8%",
      cpdph: "$0.210",
      hirePeriods: "1hr - 12 hrs",
      coverageRange: "$50 - $900",
      fundNo: "2042728",
    },
    {
      lifespan: "10 months",
      fundName: "Carbon fibre bikes",
      capitalDeployed: "72%",
      capitalRatio: "38%",
      currentDeposits: "$6,352.45",
      depositors: 1,
      growthRate: "0.3%",
      cpdph: "$0.180",
      hirePeriods: "3 days - 7 days",
      coverageRange: "$50 - $10,000",
      fundNo: "1964472",
    },
    {
      lifespan: "1 year",
      fundName: "Vintage bicycles rented at organized events",
      capitalDeployed: "63%",
      capitalRatio: "60%",
      currentDeposits: "$18,227.25",
      depositors: 2,
      growthRate: "-2.3%",
      cpdph: "$0.036",
      hirePeriods: "1 hour - 6 hours",
      coverageRange: "$100 - $500",
      fundNo: "1628231",
    },
    {
      lifespan: "1.4 years",
      fundName: "Heavily accessorized bicycles",
      capitalDeployed: "89%",
      capitalRatio: "52%",
      currentDeposits: "$854,332.04",
      depositors: 46,
      growthRate: "-4.6%",
      cpdph: "$0.331",
      hirePeriods: "1 week - 2 weeks",
      coverageRange: "$250 - $4,000",
      fundNo: "1335547",
    },
    {
      lifespan: "2 years",
      fundName: "Pinarello Dogma range, long term rental",
      capitalDeployed: "45%",
      capitalRatio: "38%",
      currentDeposits: "$1,665,231.09",
      depositors: 4,
      growthRate: "3.2%",
      cpdph: "$0.190",
      hirePeriods: "3 months - 3 months",
      coverageRange: "$1,500 - $4,500",
      fundNo: "1332152",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Unifund Registry</h1>
      </div>

      <SearchFilterBar filters={filters} onFilterChange={handleFilterChange} />

      <p className="text-sm text-gray-700 mb-4">
        Your search returned <strong>{resultCount} unifunds</strong>
      </p>

      {/* Desktop: Side by side layout for Averages and Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        {/* Averages Section - 3x2 grid */}
        <div className="lg:col-span-3 bg-white border-[3px] border-gray-400 rounded-lg overflow-hidden">
          <h2 className="bg-purple-50 text-purple-900 text-base font-semibold px-3 py-2.5 border-b-[3px] border-purple-100">
            Averages of these funds{" "}
            <span className="text-xs text-purple-700">
              (last 7 days{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                change
              </a>
              )
            </span>
          </h2>
          <div className="p-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {averages.map((metric, idx) => (
                <AverageMetricCard key={idx} metric={metric} />
              ))}
            </div>
          </div>
        </div>

        {/* Returns Chart Section */}
        <div className="lg:col-span-2">
          <ReturnsChart coloredTitle={true} />
        </div>
      </div>

      {/* Funds Table */}
      <div className="mb-4">
        <FundsTable funds={mockFunds} coloredTitle={true} />
      </div>
    </div>
  );
}
