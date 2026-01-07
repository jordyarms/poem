import { TrendingUp, TrendingDown, ArrowUpRight, Truck, Navigation, ShoppingBag, Package, Store } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MapboxMap, { MapMarker } from "@/components/poems/MapboxMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface FilterBarProps {
  filters: {
    sectors: string;
    geoCategory: string;
    geoSpecific: string;
    dateFrom: string;
    dateTo: string;
    year: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

function AggregateFilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="mb-4">
      <div className="text-sm font-semibold text-gray-900 mb-2">
        Aggregate activity for
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Sectors:</label>
          <Select
            value={filters.sectors}
            onValueChange={(value) => onFilterChange("sectors", value)}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value="agriculture">agriculture</SelectItem>
              <SelectItem value="manufacturing">manufacturing</SelectItem>
              <SelectItem value="services">services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">geography category:</label>
          <Select
            value={filters.geoCategory}
            onValueChange={(value) => onFilterChange("geoCategory", value)}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bioregion">bioregion</SelectItem>
              <SelectItem value="city">city</SelectItem>
              <SelectItem value="county">county</SelectItem>
              <SelectItem value="state">state</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">specific:</label>
          <Select
            value={filters.geoSpecific}
            onValueChange={(value) => onFilterChange("geoSpecific", value)}
          >
            <SelectTrigger className="w-[160px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Silverfen Basin">Silverfen Basin</SelectItem>
              <SelectItem value="Oakridge Valley">Oakridge Valley</SelectItem>
              <SelectItem value="Meadowbrook Region">
                Meadowbrook Region
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">date range:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange("dateFrom", e.target.value)}
              placeholder="MM-DD"
              className="h-8 px-2 py-1 border border-gray-400 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 w-[70px]"
            />
            <span className="text-gray-400">–</span>
            <input
              type="text"
              value={filters.dateTo}
              onChange={(e) => onFilterChange("dateTo", e.target.value)}
              placeholder="MM-DD"
              className="h-8 px-2 py-1 border border-gray-400 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 w-[70px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">in year:</label>
          <Select
            value={filters.year}
            onValueChange={(value) => onFilterChange("year", value)}
          >
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this year">this year</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

interface PerformanceMetric {
  title: string;
  value: string;
  subtitle: string;
  change: { value: string; positive: boolean };
  link?: boolean;
  changeRadiusLink?: boolean;
  icon: typeof TrendingUp;
  color?: string;
}

function PerformanceCard({ metric }: { metric: PerformanceMetric }) {
  const ChangeIcon = metric.change.positive ? TrendingUp : TrendingDown;
  const MetricIcon = metric.icon;

  const colorClasses = {
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    teal: "bg-teal-50 text-teal-600 border-teal-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-[3px] border-gray-400 rounded-lg p-3"
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg ${
            colorClasses[metric.color as keyof typeof colorClasses] ||
            colorClasses.purple
          } flex-shrink-0`}
        >
          <MetricIcon className="w-8 h-8" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-600 mb-0.5">
            {metric.title}
          </h3>
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-4xl font-bold text-gray-900">
              {metric.value}
            </span>
            <div
              className={cn(
                "flex items-center gap-0.5 text-sm font-medium",
                metric.change.positive ? "text-emerald-600" : "text-red-600"
              )}
            >
              <ChangeIcon className="w-4 h-4" />
              {metric.change.value}
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-1.5">{metric.subtitle}</p>
          <div className="flex gap-2 text-xs">
            {metric.link && (
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
              >
                View
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {metric.changeRadiusLink && (
              <>
                {metric.link && <span className="text-gray-300">|</span>}
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
                >
                  Change radius
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface GaugeProps {
  title: string;
  percentage: number;
  subtitle: string;
  color?: string;
}

function SemicircularGauge({
  title,
  percentage,
  subtitle,
  color = "purple",
}: GaugeProps) {
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    purple: "text-purple-600",
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
  };

  const strokeColors = {
    purple: "#9333ea",
    emerald: "#059669",
    blue: "#2563eb",
    amber: "#d97706",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-[3px] border-gray-400 rounded-lg p-3 flex flex-col items-center justify-between h-full"
    >
      <h4 className="text-sm font-semibold text-gray-900 text-center mb-2 min-h-[32px] flex items-center">
        {title}
      </h4>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative" style={{ width: radius * 2, height: radius }}>
          <svg
            height={radius}
            width={radius * 2}
            className="transform -rotate-0"
          >
            {/* Background arc */}
            <path
              d={`M ${
                strokeWidth / 2
              } ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
                radius * 2 - strokeWidth / 2
              } ${radius}`}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Foreground arc */}
            <path
              d={`M ${
                strokeWidth / 2
              } ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
                radius * 2 - strokeWidth / 2
              } ${radius}`}
              fill="none"
              stroke={strokeColors[color as keyof typeof strokeColors]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-end justify-center pb-1">
            <span
              className={cn(
                "text-xl font-bold",
                colorClasses[color as keyof typeof colorClasses]
              )}
            >
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-1.5 mt-2">
        <p className="text-xs text-gray-600 text-center min-h-[28px] flex items-center justify-center">
          {subtitle}
        </p>
        <a
          href="#"
          className="text-xs text-purple-600 hover:text-purple-700 flex items-center justify-center gap-0.5"
        >
          Analysis
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

function UnpackagedRetailChart() {
  // Dummy data showing unpackaged retail growth vs conventional retail (weekly)
  const data = [
    { week: "W1", unpackaged: 12.5, conventional: 42.8 },
    { week: "W2", unpackaged: 15.2, conventional: 41.5 },
    { week: "W3", unpackaged: 18.7, conventional: 40.2 },
    { week: "W4", unpackaged: 23.1, conventional: 38.9 },
    { week: "W5", unpackaged: 27.8, conventional: 37.8 },
    { week: "W6", unpackaged: 32.4, conventional: 36.2 },
    { week: "W7", unpackaged: 36.9, conventional: 35.1 },
    { week: "W8", unpackaged: 41.2, conventional: 34.5 },
  ];

  return (
    <div className="bg-white border-[3px] border-gray-400 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <Store className="w-4 h-4 text-purple-600" />
        <h3 className="text-sm font-semibold text-gray-900">
          Unpackaged Retail v. Conventional
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" domain={[0, 50]} />
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8 }}
            formatter={(value: number) => `${value}%`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="line" />
          <Line
            type="monotone"
            dataKey="unpackaged"
            stroke="#7c3aed"
            strokeWidth={2}
            name="Unpackaged Retail"
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="conventional"
            stroke="#94a3b8"
            strokeWidth={2}
            name="Conventional Retail"
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function GeographicMap() {
  // Markers for Riverside, California showing density disparity
  // Dense cluster in East City, scattered markers elsewhere
  const markers: MapMarker[] = [
    // Dense cluster in East City (Downtown Riverside)
    {
      id: "east-city-1",
      position: [33.9533, -117.3962],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    {
      id: "east-city-2",
      position: [33.9543, -117.3952],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    {
      id: "east-city-3",
      position: [33.9523, -117.3972],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    {
      id: "east-city-4",
      position: [33.9553, -117.3942],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    {
      id: "east-city-5",
      position: [33.9513, -117.3982],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    {
      id: "east-city-6",
      position: [33.9563, -117.3932],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    {
      id: "east-city-7",
      position: [33.9503, -117.3992],
      title: "Holder Availability: East City",
      description: "7PM – 11PM weekdays",
    },
    // Scattered markers in other areas
    {
      id: "north-area",
      position: [33.9733, -117.3862],
      title: "Holder Availability: North Area",
      description: "6AM – 9AM weekdays",
    },
    {
      id: "west-district",
      position: [33.9433, -117.4162],
      title: "Holder Availability: West District",
      description: "12PM – 3PM daily",
    },
    {
      id: "south-zone",
      position: [33.9233, -117.3862],
      title: "Holder Availability: South Zone",
      description: "5PM – 8PM weekends",
    },
    // Additional markers in Northeast area
    {
      id: "northeast-1",
      position: [33.9833, -117.3662],
      title: "Holder Availability: Northeast District",
      description: "8AM – 12PM weekdays",
    },
    {
      id: "northeast-2",
      position: [33.9883, -117.3612],
      title: "Holder Availability: Northeast District",
      description: "8AM – 12PM weekdays",
    },
    {
      id: "northeast-3",
      position: [33.9933, -117.3562],
      title: "Holder Availability: Northeast District",
      description: "8AM – 12PM weekdays",
    },
    {
      id: "northeast-4",
      position: [33.9783, -117.3712],
      title: "Holder Availability: Northeast District",
      description: "8AM – 12PM weekdays",
    },
    {
      id: "northeast-5",
      position: [33.9983, -117.3512],
      title: "Holder Availability: Northeast District",
      description: "8AM – 12PM weekdays",
    },
    {
      id: "northeast-6",
      position: [33.9733, -117.3762],
      title: "Holder Availability: Northeast District",
      description: "8AM – 12PM weekdays",
    },
    // Additional scattered markers across the area
    {
      id: "northwest-1",
      position: [33.9833, -117.4262],
      title: "Holder Availability: Northwest Zone",
      description: "9AM – 1PM weekdays",
    },
    {
      id: "northwest-2",
      position: [33.9933, -117.4412],
      title: "Holder Availability: Northwest Zone",
      description: "9AM – 1PM weekdays",
    },
    {
      id: "southeast-1",
      position: [33.9133, -117.3662],
      title: "Holder Availability: Southeast Area",
      description: "3PM – 7PM daily",
    },
    {
      id: "southeast-2",
      position: [33.9033, -117.3562],
      title: "Holder Availability: Southeast Area",
      description: "3PM – 7PM daily",
    },
    {
      id: "far-west",
      position: [33.9533, -117.4562],
      title: "Holder Availability: West End",
      description: "10AM – 2PM weekdays",
    },
    {
      id: "far-east",
      position: [33.9633, -117.3362],
      title: "Holder Availability: East End",
      description: "1PM – 5PM daily",
    },
    {
      id: "far-north",
      position: [34.0133, -117.3862],
      title: "Holder Availability: North End",
      description: "7AM – 11AM weekdays",
    },
    {
      id: "far-south",
      position: [33.8933, -117.3962],
      title: "Holder Availability: South End",
      description: "4PM – 8PM weekends",
    },
    {
      id: "central-west",
      position: [33.9633, -117.4362],
      title: "Holder Availability: Central West",
      description: "11AM – 3PM daily",
    },
    {
      id: "central-east",
      position: [33.9433, -117.3562],
      title: "Holder Availability: Central East",
      description: "2PM – 6PM weekdays",
    },
    {
      id: "southwest",
      position: [33.9233, -117.4262],
      title: "Holder Availability: Southwest",
      description: "8AM – 12PM weekends",
    },
    {
      id: "midtown",
      position: [33.9683, -117.3962],
      title: "Holder Availability: Midtown",
      description: "10AM – 2PM daily",
    },
  ];

  return (
    <div
      className="rounded-lg border-[3px] overflow-hidden"
      style={{ height: "440px" }}
    >
      <MapboxMap
        center={[33.9533, -117.3962]} // Riverside, California
        zoom={12}
        markers={markers}
        height="432px"
        overlayText={{
          title: "Holder Availability: East City",
          subtitle: "7PM-11PM weekdays",
          link: { text: "Analysis", href: "#" },
        }}
      />
    </div>
  );
}

export default function TransitionDashboard() {
  const [filters, setFilters] = useState({
    sectors: "all",
    geoCategory: "bioregion",
    geoSpecific: "Silverfen Basin",
    dateFrom: "05-01",
    dateTo: "05-07",
    year: "this year",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const performanceMetrics: PerformanceMetric[] = [
    {
      title: "Route Densities",
      value: "43",
      subtitle: "Drops per Hour",
      change: { value: "4%", positive: true },
      link: true,
      icon: Truck,
      color: "purple",
    },
    {
      title: "Travel-to-Work",
      value: "1.2",
      subtitle: "Miles per Shift",
      change: { value: "7%", positive: false },
      link: true,
      icon: Navigation,
      color: "purple",
    },
    {
      title: "Local Produce Sales",
      value: "$21,408",
      subtitle: "Seller and Buyer within 5 miles",
      change: { value: "12%", positive: false },
      link: true,
      changeRadiusLink: true,
      icon: ShoppingBag,
      color: "purple",
    },
    {
      title: "All Resale Markets",
      value: "11,381",
      subtitle: "Pre-owned Items in Time Period",
      change: { value: "2%", positive: true },
      link: true,
      icon: Package,
      color: "purple",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Transition Dashboard
        </h1>
      </div>

      <AggregateFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Microeconomic Performance */}
      <div className="mb-4">
        <div className="mb-3">
          <h2 className="text-base font-bold text-gray-900">
            Microeconomic Performance
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {performanceMetrics.map((metric, idx) => (
            <PerformanceCard key={idx} metric={metric} />
          ))}
        </div>
      </div>

      {/* Constraints Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Constraints</h2>
          <a
            href="#"
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            More constraints
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Left column: Gauges and Indicators */}
          <div className="lg:col-span-2 space-y-3">
            {/* Gauges */}
            <div className="grid grid-cols-3 gap-3">
              <SemicircularGauge
                title="Reclamation Skills"
                percentage={28}
                subtitle="of govt. target"
                color="purple"
              />
              <SemicircularGauge
                title="Tarpaulin Utilization"
                percentage={43}
                subtitle="of national average"
                color="purple"
              />
              <SemicircularGauge
                title="Firefighters Availability"
                percentage={55}
                subtitle="of local target for dry months"
                color="purple"
              />
            </div>

            {/* Unpackaged Retail Chart */}
            <UnpackagedRetailChart />
          </div>

          {/* Right column: Map */}
          <div className="lg:col-span-3">
            <GeographicMap />
          </div>
        </div>
      </div>
    </div>
  );
}
