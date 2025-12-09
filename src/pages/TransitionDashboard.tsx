import { TrendingUp, TrendingDown, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: {
    sectors: string;
    geoCategory: string;
    geoSpecific: string;
    dateFrom: string;
    dateTo: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

function AggregateFilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-semibold text-purple-900 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">
            FILTERS
          </span>
          Aggregate activity for
        </span>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Sectors:</label>
          <select
            value={filters.sectors}
            onChange={(e) => onFilterChange("sectors", e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">all</option>
            <option value="agriculture">agriculture</option>
            <option value="manufacturing">manufacturing</option>
            <option value="services">services</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">geography category:</label>
          <select
            value={filters.geoCategory}
            onChange={(e) => onFilterChange("geoCategory", e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="bioregion">bioregion</option>
            <option value="city">city</option>
            <option value="county">county</option>
            <option value="state">state</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">specific:</label>
          <select
            value={filters.geoSpecific}
            onChange={(e) => onFilterChange("geoSpecific", e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Silverfen Basin">Silverfen Basin</option>
            <option value="Oakridge Valley">Oakridge Valley</option>
            <option value="Meadowbrook Region">Meadowbrook Region</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">date range:</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange("dateFrom", e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-gray-400">–</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFilterChange("dateTo", e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
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
}

function PerformanceCard({ metric }: { metric: PerformanceMetric }) {
  const Icon = metric.change.positive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        {metric.title}
      </h3>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
        <div
          className={cn(
            "flex items-center gap-0.5 text-sm font-medium",
            metric.change.positive ? "text-emerald-600" : "text-red-600"
          )}
        >
          <Icon className="w-4 h-4" />
          {metric.change.value}
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-3">{metric.subtitle}</p>
      <div className="flex gap-2 text-xs">
        {metric.link && (
          <a
            href="#"
            className="text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
          >
            View graph
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
  const radius = 60;
  const strokeWidth = 12;
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
      className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center"
    >
      <h4 className="text-sm font-semibold text-gray-900 text-center mb-2">
        {title}
      </h4>

      <div className="relative" style={{ width: radius * 2, height: radius }}>
        <svg height={radius} width={radius * 2} className="transform -rotate-0">
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
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span
            className={cn(
              "text-2xl font-bold",
              colorClasses[color as keyof typeof colorClasses]
            )}
          >
            {percentage}%
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center mt-2">{subtitle}</p>
      <a
        href="#"
        className="text-xs text-purple-600 hover:text-purple-700 mt-2 flex items-center gap-0.5"
      >
        Analysis
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

function GeographicMap() {
  return (
    <div
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-gray-300 p-4 relative"
      style={{ height: "350px" }}
    >
      {/* Map placeholder background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="map-roads"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0,40 L 80,40"
                stroke="#8B7355"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 40,0 L 40,80"
                stroke="#8B7355"
                strokeWidth="1.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-roads)" />
        </svg>
      </div>

      {/* River */}
      <div className="absolute bottom-0 right-0 w-2/5 h-3/5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0,100 Q 60,70 120,100 L 120,0 Q 80,50 0,0 Z"
            fill="#93C5FD"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Green spaces */}
      <div className="absolute top-1/4 left-1/5 w-20 h-20 bg-emerald-200 rounded-full opacity-25" />
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-emerald-200 rounded-full opacity-25" />

      {/* Availability markers */}
      <div className="absolute top-[20%] left-[30%]">
        <div className="bg-red-500 rounded-full p-2">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute top-[40%] right-[35%]">
        <div className="bg-red-500 rounded-full p-2">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute bottom-[35%] left-[45%]">
        <div className="bg-red-500 rounded-full p-2">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute top-[15%] right-[20%]">
        <div className="bg-red-500 rounded-full p-2">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute bottom-[45%] left-[20%]">
        <div className="bg-red-500 rounded-full p-2">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Info box */}
      <div className="absolute top-4 right-4 bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg max-w-[200px]">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">
          Holder Availability: East City
        </h4>
        <p className="text-xs text-gray-700">7PM – 11PM weekdays</p>
        <a
          href="#"
          className="text-xs text-purple-600 hover:text-purple-700 mt-1 inline-block"
        >
          Analysis
        </a>
      </div>
    </div>
  );
}

export default function TransitionDashboard() {
  const [filters, setFilters] = useState({
    sectors: "all",
    geoCategory: "bioregion",
    geoSpecific: "Silverfen Basin",
    dateFrom: "2024-05-01",
    dateTo: "2024-05-07",
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
    },
    {
      title: "Travel-to-Work",
      value: "1.2",
      subtitle: "Miles per Shift",
      change: { value: "7%", positive: false },
      link: true,
    },
    {
      title: "Local Produce Sales",
      value: "$21,408",
      subtitle: "Seller and Buyer within 5 miles",
      change: { value: "12%", positive: false },
      link: true,
      changeRadiusLink: true,
    },
    {
      title: "All Resale Markets",
      value: "11,381",
      subtitle: "Pre-owned Items in Time Period",
      change: { value: "2%", positive: true },
      link: true,
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Transition Dashboard
        </h1>
        {/* <p className="text-gray-600">
          Economic performance analytics and market indicators
        </p> */}
      </div>

      <AggregateFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Microeconomic Performance */}
      <div className="mb-4">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            Microeconomic Performance
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, idx) => (
            <PerformanceCard key={idx} metric={metric} />
          ))}
        </div>
      </div>

      {/* Constraints Section */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Constraints</h2>
          <a
            href="#"
            className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            More constraints
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left column: Gauges and Indicators */}
          <div className="lg:col-span-2 space-y-4">
            {/* Gauges */}
            <div className="grid grid-cols-3 gap-4">
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

            {/* Indicators - moved here */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Unpackaged Retail v. Conventional
              </h3>
              <div className="h-48 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Wavy line chart placeholder */}
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <linearGradient
                      id="wave-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#a78bfa"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,120 Q 100,80 200,100 T 400,90 T 600,110 T 800,95 T 1000,105 T 1200,100"
                    fill="none"
                    stroke="url(#wave-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0,140 Q 100,130 200,135 T 400,130 T 600,140 T 800,135 T 1000,138 T 1200,140"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-white text-sm z-10 bg-black/30 px-3 py-1 rounded">
                  Time series comparison chart
                </p>
              </div>
            </div>
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
