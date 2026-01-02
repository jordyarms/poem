import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createChart, ColorType } from "lightweight-charts";

interface SearchFilters {
  focus: string;
  purpose: string;
  geoDistance: string;
  geoFrom: string;
}

interface InterventionMetric {
  label: string;
  value: string;
  change?: { value: string; positive: boolean };
}

interface Intervention {
  category: string;
  title: string;
  action: "Invest" | "Donate" | "Closed fund";
  metrics: {
    returnOnCapital: InterventionMetric;
    fundSize: InterventionMetric;
    velocity: InterventionMetric;
  };
  showChart: boolean;
  chartData?: any[];
}

function SearchFilterBar({
  filters,
  onFilterChange,
}: {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4 text-purple-600" />
        <h2 className="text-base font-semibold text-gray-900">
          Search interventions
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Focus:</label>
          <Select
            value={filters.focus}
            onValueChange={(value) => onFilterChange("focus", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="climate-objectives">
                Climate objectives
              </SelectItem>
              <SelectItem value="economic-development">
                Economic development
              </SelectItem>
              <SelectItem value="social-equity">Social equity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Purpose:</label>
          <Select
            value={filters.purpose}
            onValueChange={(value) => onFilterChange("purpose", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="donation">Donation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">
            Geographic range includes:
          </label>
          <Select
            value={filters.geoDistance}
            onValueChange={(value) => onFilterChange("geoDistance", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="100">100 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">of:</label>
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

function InterventionCandlestickChart({ data }: { data: any[] }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "#6b7280",
      },
      width: chartContainerRef.current.clientWidth,
      height: 200,
      grid: {
        vertLines: { color: "#f3f4f6" },
        horzLines: { color: "#f3f4f6" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#e5e7eb",
      },
      rightPriceScale: {
        borderColor: "#e5e7eb",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#059669",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#059669",
      wickDownColor: "#dc2626",
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
}

function MetricScoreCard({ metric }: { metric: InterventionMetric }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <h4 className="text-xs font-medium text-gray-600 mb-1.5">
        {metric.label}
      </h4>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-bold text-gray-900">{metric.value}</span>
      </div>
      {metric.change && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            metric.change.positive ? "text-emerald-600" : "text-red-600"
          )}
        >
          {metric.change.positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {metric.change.value}
        </div>
      )}
    </div>
  );
}

function InterventionRow({ intervention }: { intervention: Intervention }) {
  const actionStyles = {
    Invest: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    Donate: "text-blue-700 bg-blue-50 border border-blue-200",
    "Closed fund": "text-gray-700 bg-gray-100 border border-gray-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left column: Title, action button, and metrics */}
        <div>
          {/* Title and action button */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">
              <span className="text-purple-700">{intervention.category}:</span>{" "}
              {intervention.title}
            </h3>
            <span
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap",
                actionStyles[intervention.action]
              )}
            >
              {intervention.action}
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <MetricScoreCard metric={intervention.metrics.returnOnCapital} />
            <MetricScoreCard metric={intervention.metrics.fundSize} />
            <MetricScoreCard metric={intervention.metrics.velocity} />
          </div>
        </div>

        {/* Right column: Candlestick Chart */}
        {intervention.showChart && intervention.chartData && (
          <div className="flex items-center">
            <InterventionCandlestickChart data={intervention.chartData} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SelectInterventions() {
  const [filters, setFilters] = useState<SearchFilters>({
    focus: "climate-objectives",
    purpose: "all",
    geoDistance: "25",
    geoFrom: "my-home",
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Generate varied candlestick data for each intervention
  const employmentData = [
    { time: "2025-11-18", open: 2.05, high: 2.12, low: 2.02, close: 2.10 },
    { time: "2025-11-19", open: 2.10, high: 2.18, low: 2.08, close: 2.15 },
    { time: "2025-11-20", open: 2.15, high: 2.22, low: 2.12, close: 2.18 },
    { time: "2025-11-21", open: 2.18, high: 2.25, low: 2.15, close: 2.22 },
    { time: "2025-11-22", open: 2.22, high: 2.28, low: 2.19, close: 2.20 },
    { time: "2025-11-25", open: 2.20, high: 2.30, low: 2.18, close: 2.28 },
    { time: "2025-11-26", open: 2.28, high: 2.35, low: 2.25, close: 2.32 },
    { time: "2025-11-27", open: 2.32, high: 2.38, low: 2.28, close: 2.30 },
    { time: "2025-11-28", open: 2.30, high: 2.40, low: 2.28, close: 2.38 },
    { time: "2025-11-29", open: 2.38, high: 2.45, low: 2.35, close: 2.42 },
    { time: "2025-12-02", open: 2.42, high: 2.50, low: 2.40, close: 2.48 },
    { time: "2025-12-03", open: 2.48, high: 2.55, low: 2.45, close: 2.52 },
  ];

  const materialsData = [
    { time: "2025-11-18", open: 2.15, high: 2.25, low: 2.10, close: 2.20 },
    { time: "2025-11-19", open: 2.20, high: 2.28, low: 2.15, close: 2.18 },
    { time: "2025-11-20", open: 2.18, high: 2.22, low: 2.10, close: 2.12 },
    { time: "2025-11-21", open: 2.12, high: 2.20, low: 2.08, close: 2.18 },
    { time: "2025-11-22", open: 2.18, high: 2.30, low: 2.15, close: 2.25 },
    { time: "2025-11-25", open: 2.25, high: 2.35, low: 2.20, close: 2.22 },
    { time: "2025-11-26", open: 2.22, high: 2.28, low: 2.18, close: 2.20 },
    { time: "2025-11-27", open: 2.20, high: 2.32, low: 2.18, close: 2.30 },
    { time: "2025-11-28", open: 2.30, high: 2.42, low: 2.28, close: 2.38 },
    { time: "2025-11-29", open: 2.38, high: 2.48, low: 2.35, close: 2.40 },
    { time: "2025-12-02", open: 2.40, high: 2.50, low: 2.38, close: 2.48 },
    { time: "2025-12-03", open: 2.48, high: 2.58, low: 2.45, close: 2.52 },
  ];

  const energyData = [
    { time: "2025-11-18", open: 2.35, high: 2.42, low: 2.30, close: 2.38 },
    { time: "2025-11-19", open: 2.38, high: 2.45, low: 2.35, close: 2.40 },
    { time: "2025-11-20", open: 2.40, high: 2.48, low: 2.38, close: 2.45 },
    { time: "2025-11-21", open: 2.45, high: 2.52, low: 2.42, close: 2.48 },
    { time: "2025-11-22", open: 2.48, high: 2.55, low: 2.45, close: 2.50 },
    { time: "2025-11-25", open: 2.50, high: 2.58, low: 2.48, close: 2.55 },
    { time: "2025-11-26", open: 2.55, high: 2.62, low: 2.52, close: 2.58 },
    { time: "2025-11-27", open: 2.58, high: 2.65, low: 2.55, close: 2.60 },
    { time: "2025-11-28", open: 2.60, high: 2.68, low: 2.58, close: 2.65 },
    { time: "2025-11-29", open: 2.65, high: 2.72, low: 2.62, close: 2.68 },
    { time: "2025-12-02", open: 2.68, high: 2.75, low: 2.65, close: 2.70 },
    { time: "2025-12-03", open: 2.70, high: 2.78, low: 2.68, close: 2.75 },
  ];

  const interventions: Intervention[] = [
    {
      category: "EMPLOYMENT",
      title: "Paths Out of Oil",
      action: "Invest",
      metrics: {
        returnOnCapital: {
          label: "Return on Capital",
          value: "2.30%",
          change: { value: "1%", positive: true },
        },
        fundSize: {
          label: "Fund Size",
          value: "$12,776",
          change: { value: "7%", positive: false },
        },
        velocity: {
          label: "Velocity",
          value: "3.6",
          change: { value: "11%", positive: true },
        },
      },
      showChart: true,
      chartData: employmentData,
    },
    {
      category: "MATERIALS",
      title: "Green Concrete",
      action: "Donate",
      metrics: {
        returnOnCapital: {
          label: "Return on Capital",
          value: "0.00%",
        },
        fundSize: {
          label: "Fund Size",
          value: "$95,241",
          change: { value: "3%", positive: false },
        },
        velocity: {
          label: "Velocity",
          value: "N/A",
        },
      },
      showChart: true,
      chartData: materialsData,
    },
    {
      category: "ENERGY",
      title: "Small Turbine Installations",
      action: "Closed fund",
      metrics: {
        returnOnCapital: {
          label: "Return on Capital",
          value: "0.40%",
          change: { value: "1%", positive: true },
        },
        fundSize: {
          label: "Fund Size",
          value: "$74,336",
          change: { value: "8%", positive: true },
        },
        velocity: {
          label: "Velocity",
          value: "0.01",
          change: { value: "0%", positive: true },
        },
      },
      showChart: true,
      chartData: energyData,
    },
    {
      category: "SKILLING",
      title: "Weatherization",
      action: "Invest",
      metrics: {
        returnOnCapital: {
          label: "Return on Capital",
          value: "",
        },
        fundSize: {
          label: "Fund Size",
          value: "",
        },
        velocity: {
          label: "Velocity",
          value: "",
        },
      },
      showChart: false,
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Select Interventions
        </h1>
      </div>

      <SearchFilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-700">
          <strong>76 interventions found</strong> (showing data from last 7 days{" "}
          <a href="#" className="text-purple-600 hover:text-purple-700">
            change
          </a>
          )
        </p>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Add filters
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Apply carbon estimates
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-md hover:bg-purple-700">
            Create new intervention
          </button>
        </div>
      </div>

      {/* Intervention Results */}
      <div>
        {interventions.map((intervention, idx) => (
          <InterventionRow key={idx} intervention={intervention} />
        ))}
      </div>
    </div>
  );
}
