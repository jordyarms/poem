import {
  Search,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Wallet,
  Gauge,
} from "lucide-react";
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
  icon: typeof TrendingUp;
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
    <div className="bg-white border-[3px] border-gray-400 rounded-lg p-4">
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
      height: 160,
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

function MetricScoreCard({
  metric,
  isVelocity = false,
}: {
  metric: InterventionMetric;
  isVelocity?: boolean;
}) {
  const MetricIcon = metric.icon;

  return (
    <div className="bg-white border border-gray-400 rounded-lg p-3 flex flex-col">
      <div className="flex items-start justify-between mb-0">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-600 mb-0">
            {metric.label}
          </h4>
          <div className="flex items-baseline gap-2 mb-0">
            <span className="text-4xl font-bold text-gray-900">
              {metric.value}
            </span>
          </div>
        </div>
        <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border-purple-200 flex-shrink-0">
          <MetricIcon className="w-5 h-5" />
        </div>
      </div>
      {metric.change && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium mb-0",
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
      <div className="flex items-center justify-between mt-auto pt-2">
        <a
          href="#"
          className="text-[10px] text-purple-600 hover:text-purple-700 underline"
        >
          View graph
        </a>
        {isVelocity && (
          <span className="text-[10px] text-gray-500">
            Velocity is annualized
          </span>
        )}
      </div>
    </div>
  );
}

function InterventionRow({ intervention }: { intervention: Intervention }) {
  const actionStyles = {
    Invest: "text-emerald-700 hover:text-emerald-800",
    Donate: "text-blue-700 hover:text-blue-800",
    "Closed fund": "text-gray-600",
  };

  const isClosedFund = intervention.action === "Closed fund";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-[3px] border-gray-400 rounded-lg p-4 mb-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        {/* Left column: Title, action button, and metrics (2/3 width) */}
        <div>
          {/* Title and action link/text */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-semibold text-gray-900">
              <span className="text-purple-700">{intervention.category}:</span>{" "}
              {intervention.title}
            </h3>
            {isClosedFund ? (
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  actionStyles[intervention.action]
                )}
              >
                {intervention.action}
              </span>
            ) : (
              <a
                href="#"
                className={cn(
                  "text-sm font-medium whitespace-nowrap underline",
                  actionStyles[intervention.action]
                )}
              >
                {intervention.action}
              </a>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <MetricScoreCard metric={intervention.metrics.returnOnCapital} />
            <MetricScoreCard metric={intervention.metrics.fundSize} />
            <MetricScoreCard
              metric={intervention.metrics.velocity}
              isVelocity={true}
            />
          </div>
        </div>

        {/* Right column: Candlestick Chart (1/3 width) */}
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
    { time: "2025-05-01", open: 2.05, high: 2.12, low: 2.02, close: 2.1 },
    { time: "2025-05-02", open: 2.1, high: 2.18, low: 2.08, close: 2.15 },
    { time: "2025-05-05", open: 2.15, high: 2.22, low: 2.12, close: 2.18 },
    { time: "2025-05-06", open: 2.18, high: 2.25, low: 2.15, close: 2.22 },
    { time: "2025-05-07", open: 2.22, high: 2.28, low: 2.19, close: 2.2 },
    { time: "2025-05-08", open: 2.2, high: 2.3, low: 2.18, close: 2.28 },
    { time: "2025-05-09", open: 2.28, high: 2.35, low: 2.25, close: 2.32 },
    { time: "2025-05-12", open: 2.32, high: 2.38, low: 2.28, close: 2.3 },
    { time: "2025-05-13", open: 2.3, high: 2.4, low: 2.28, close: 2.38 },
    { time: "2025-05-14", open: 2.38, high: 2.45, low: 2.35, close: 2.42 },
    { time: "2025-05-15", open: 2.42, high: 2.5, low: 2.4, close: 2.48 },
    { time: "2025-05-16", open: 2.48, high: 2.55, low: 2.45, close: 2.52 },
    { time: "2025-05-19", open: 2.52, high: 2.58, low: 2.48, close: 2.5 },
    { time: "2025-05-20", open: 2.5, high: 2.56, low: 2.47, close: 2.54 },
    { time: "2025-05-21", open: 2.54, high: 2.62, low: 2.52, close: 2.58 },
    { time: "2025-05-22", open: 2.58, high: 2.65, low: 2.55, close: 2.6 },
    { time: "2025-05-23", open: 2.6, high: 2.68, low: 2.58, close: 2.65 },
    { time: "2025-05-27", open: 2.65, high: 2.7, low: 2.62, close: 2.67 },
    { time: "2025-05-28", open: 2.67, high: 2.75, low: 2.65, close: 2.72 },
    { time: "2025-05-29", open: 2.72, high: 2.78, low: 2.68, close: 2.7 },
    { time: "2025-05-30", open: 2.7, high: 2.8, low: 2.68, close: 2.78 },
    // { time: "2025-06-02", open: 2.78, high: 2.85, low: 2.75, close: 2.82 },
    // { time: "2025-06-03", open: 2.82, high: 2.88, low: 2.78, close: 2.8 },
    // { time: "2025-06-04", open: 2.8, high: 2.9, low: 2.78, close: 2.88 },
    // { time: "2025-06-05", open: 2.88, high: 2.95, low: 2.85, close: 2.92 },
    // { time: "2025-06-06", open: 2.92, high: 3.0, low: 2.88, close: 2.95 },
    // { time: "2025-06-09", open: 2.95, high: 3.05, low: 2.92, close: 3.0 },
    // { time: "2025-06-10", open: 3.0, high: 3.08, low: 2.98, close: 3.05 },
    // { time: "2025-06-11", open: 3.05, high: 3.12, low: 3.02, close: 3.08 },
    // { time: "2025-06-12", open: 3.08, high: 3.15, low: 3.05, close: 3.1 },
    // { time: "2025-06-13", open: 3.1, high: 3.18, low: 3.08, close: 3.15 },
    // { time: "2025-06-16", open: 3.15, high: 3.22, low: 3.12, close: 3.18 },
    // { time: "2025-06-17", open: 3.18, high: 3.25, low: 3.15, close: 3.22 },
    // { time: "2025-06-18", open: 3.22, high: 3.28, low: 3.18, close: 3.2 },
    // { time: "2025-06-19", open: 3.2, high: 3.3, low: 3.18, close: 3.28 },
    // { time: "2025-06-20", open: 3.28, high: 3.35, low: 3.25, close: 3.32 },
  ];

  const materialsData = [
    { time: "2025-05-01", open: 2.15, high: 2.25, low: 2.1, close: 2.2 },
    { time: "2025-05-02", open: 2.2, high: 2.28, low: 2.15, close: 2.18 },
    { time: "2025-05-05", open: 2.18, high: 2.22, low: 2.1, close: 2.12 },
    { time: "2025-05-06", open: 2.12, high: 2.2, low: 2.08, close: 2.18 },
    { time: "2025-05-07", open: 2.18, high: 2.3, low: 2.15, close: 2.25 },
    { time: "2025-05-08", open: 2.25, high: 2.35, low: 2.2, close: 2.22 },
    { time: "2025-05-09", open: 2.22, high: 2.28, low: 2.18, close: 2.2 },
    { time: "2025-05-12", open: 2.2, high: 2.32, low: 2.18, close: 2.3 },
    { time: "2025-05-13", open: 2.3, high: 2.42, low: 2.28, close: 2.38 },
    { time: "2025-05-14", open: 2.38, high: 2.48, low: 2.35, close: 2.4 },
    { time: "2025-05-15", open: 2.4, high: 2.5, low: 2.38, close: 2.48 },
    { time: "2025-05-16", open: 2.48, high: 2.58, low: 2.45, close: 2.52 },
    { time: "2025-05-19", open: 2.52, high: 2.6, low: 2.48, close: 2.55 },
    { time: "2025-05-20", open: 2.55, high: 2.62, low: 2.5, close: 2.52 },
    { time: "2025-05-21", open: 2.52, high: 2.58, low: 2.45, close: 2.48 },
    { time: "2025-05-22", open: 2.48, high: 2.55, low: 2.42, close: 2.5 },
    { time: "2025-05-23", open: 2.5, high: 2.6, low: 2.48, close: 2.58 },
    { time: "2025-05-27", open: 2.58, high: 2.68, low: 2.55, close: 2.62 },
    { time: "2025-05-28", open: 2.62, high: 2.7, low: 2.58, close: 2.65 },
    { time: "2025-05-29", open: 2.65, high: 2.75, low: 2.62, close: 2.72 },
    { time: "2025-05-30", open: 2.72, high: 2.82, low: 2.7, close: 2.78 },
    // { time: "2025-06-02", open: 2.78, high: 2.85, low: 2.75, close: 2.8 },
    // { time: "2025-06-03", open: 2.8, high: 2.88, low: 2.78, close: 2.85 },
    // { time: "2025-06-04", open: 2.85, high: 2.92, low: 2.82, close: 2.88 },
    // { time: "2025-06-05", open: 2.88, high: 2.95, low: 2.85, close: 2.9 },
    // { time: "2025-06-06", open: 2.9, high: 2.98, low: 2.88, close: 2.95 },
    // { time: "2025-06-09", open: 2.95, high: 3.02, low: 2.9, close: 2.92 },
    // { time: "2025-06-10", open: 2.92, high: 2.98, low: 2.88, close: 2.9 },
    // { time: "2025-06-11", open: 2.9, high: 3.0, low: 2.88, close: 2.98 },
    // { time: "2025-06-12", open: 2.98, high: 3.08, low: 2.95, close: 3.05 },
    // { time: "2025-06-13", open: 3.05, high: 3.12, low: 3.0, close: 3.08 },
    // { time: "2025-06-16", open: 3.08, high: 3.18, low: 3.05, close: 3.15 },
    // { time: "2025-06-17", open: 3.15, high: 3.22, low: 3.12, close: 3.18 },
    // { time: "2025-06-18", open: 3.18, high: 3.25, low: 3.15, close: 3.2 },
    // { time: "2025-06-19", open: 3.2, high: 3.3, low: 3.18, close: 3.28 },
    // { time: "2025-06-20", open: 3.28, high: 3.38, low: 3.25, close: 3.32 },
  ];

  const energyData = [
    { time: "2025-05-01", open: 2.35, high: 2.42, low: 2.3, close: 2.38 },
    { time: "2025-05-02", open: 2.38, high: 2.45, low: 2.35, close: 2.4 },
    { time: "2025-05-05", open: 2.4, high: 2.48, low: 2.38, close: 2.45 },
    { time: "2025-05-06", open: 2.45, high: 2.52, low: 2.42, close: 2.48 },
    { time: "2025-05-07", open: 2.48, high: 2.55, low: 2.45, close: 2.5 },
    { time: "2025-05-08", open: 2.5, high: 2.58, low: 2.48, close: 2.55 },
    { time: "2025-05-09", open: 2.55, high: 2.62, low: 2.52, close: 2.58 },
    { time: "2025-05-12", open: 2.58, high: 2.65, low: 2.55, close: 2.6 },
    { time: "2025-05-13", open: 2.6, high: 2.68, low: 2.58, close: 2.65 },
    { time: "2025-05-14", open: 2.65, high: 2.72, low: 2.62, close: 2.68 },
    { time: "2025-05-15", open: 2.68, high: 2.75, low: 2.65, close: 2.7 },
    { time: "2025-05-16", open: 2.7, high: 2.78, low: 2.68, close: 2.75 },
    { time: "2025-05-19", open: 2.75, high: 2.82, low: 2.72, close: 2.78 },
    { time: "2025-05-20", open: 2.78, high: 2.85, low: 2.75, close: 2.8 },
    { time: "2025-05-21", open: 2.8, high: 2.88, low: 2.78, close: 2.85 },
    { time: "2025-05-22", open: 2.85, high: 2.92, low: 2.82, close: 2.88 },
    { time: "2025-05-23", open: 2.88, high: 2.95, low: 2.85, close: 2.9 },
    { time: "2025-05-27", open: 2.9, high: 2.98, low: 2.88, close: 2.95 },
    { time: "2025-05-28", open: 2.95, high: 3.02, low: 2.92, close: 2.98 },
    { time: "2025-05-29", open: 2.98, high: 3.05, low: 2.95, close: 3.0 },
    { time: "2025-05-30", open: 3.0, high: 3.08, low: 2.98, close: 3.05 },
    // { time: "2025-06-02", open: 3.05, high: 3.12, low: 3.02, close: 3.08 },
    // { time: "2025-06-03", open: 3.08, high: 3.15, low: 3.05, close: 3.1 },
    // { time: "2025-06-04", open: 3.1, high: 3.18, low: 3.08, close: 3.15 },
    // { time: "2025-06-05", open: 3.15, high: 3.22, low: 3.12, close: 3.18 },
    // { time: "2025-06-06", open: 3.18, high: 3.25, low: 3.15, close: 3.2 },
    // { time: "2025-06-09", open: 3.2, high: 3.28, low: 3.18, close: 3.25 },
    // { time: "2025-06-10", open: 3.25, high: 3.32, low: 3.22, close: 3.28 },
    // { time: "2025-06-11", open: 3.28, high: 3.35, low: 3.25, close: 3.3 },
    // { time: "2025-06-12", open: 3.3, high: 3.38, low: 3.28, close: 3.35 },
    // { time: "2025-06-13", open: 3.35, high: 3.42, low: 3.32, close: 3.38 },
    // { time: "2025-06-16", open: 3.38, high: 3.45, low: 3.35, close: 3.4 },
    // { time: "2025-06-17", open: 3.4, high: 3.48, low: 3.38, close: 3.45 },
    // { time: "2025-06-18", open: 3.45, high: 3.52, low: 3.42, close: 3.48 },
    // { time: "2025-06-19", open: 3.48, high: 3.55, low: 3.45, close: 3.5 },
    // { time: "2025-06-20", open: 3.5, high: 3.58, low: 3.48, close: 3.55 },
  ];

  const weatherizationData = [
    { time: "2025-05-01", open: 3.5, high: 3.62, low: 3.42, close: 3.48 },
    { time: "2025-05-02", open: 3.48, high: 3.55, low: 3.35, close: 3.38 },
    { time: "2025-05-05", open: 3.38, high: 3.52, low: 3.32, close: 3.45 },
    { time: "2025-05-06", open: 3.45, high: 3.58, low: 3.28, close: 3.32 },
    { time: "2025-05-07", open: 3.32, high: 3.42, low: 3.15, close: 3.18 },
    { time: "2025-05-08", open: 3.18, high: 3.35, low: 3.12, close: 3.28 },
    { time: "2025-05-09", open: 3.28, high: 3.38, low: 3.08, close: 3.12 },
    { time: "2025-05-12", open: 3.12, high: 3.25, low: 2.98, close: 3.05 },
    { time: "2025-05-13", open: 3.05, high: 3.18, low: 2.95, close: 3.15 },
    { time: "2025-05-14", open: 3.15, high: 3.22, low: 2.88, close: 2.92 },
    { time: "2025-05-15", open: 2.92, high: 3.08, low: 2.82, close: 3.0 },
    { time: "2025-05-16", open: 3.0, high: 3.12, low: 2.75, close: 2.82 },
    { time: "2025-05-19", open: 2.82, high: 2.95, low: 2.68, close: 2.88 },
    { time: "2025-05-20", open: 2.88, high: 3.02, low: 2.72, close: 2.78 },
    { time: "2025-05-21", open: 2.78, high: 2.92, low: 2.62, close: 2.68 },
    { time: "2025-05-22", open: 2.68, high: 2.85, low: 2.58, close: 2.75 },
    { time: "2025-05-23", open: 2.75, high: 2.88, low: 2.55, close: 2.62 },
    { time: "2025-05-27", open: 2.62, high: 2.78, low: 2.48, close: 2.55 },
    { time: "2025-05-28", open: 2.55, high: 2.72, low: 2.42, close: 2.65 },
    { time: "2025-05-29", open: 2.65, high: 2.75, low: 2.48, close: 2.52 },
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
          icon: CircleDollarSign,
        },
        fundSize: {
          label: "Fund Size",
          value: "$12,776",
          change: { value: "7%", positive: false },
          icon: Wallet,
        },
        velocity: {
          label: "Velocity",
          value: "3.6",
          change: { value: "11%", positive: true },
          icon: Gauge,
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
          icon: CircleDollarSign,
        },
        fundSize: {
          label: "Fund Size",
          value: "$95,241",
          change: { value: "3%", positive: false },
          icon: Wallet,
        },
        velocity: {
          label: "Velocity",
          value: "N/A",
          icon: Gauge,
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
          icon: CircleDollarSign,
        },
        fundSize: {
          label: "Fund Size",
          value: "$74,336",
          change: { value: "8%", positive: true },
          icon: Wallet,
        },
        velocity: {
          label: "Velocity",
          value: "0.01",
          change: { value: "0%", positive: true },
          icon: Gauge,
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
          value: "-1.85%",
          change: { value: "2%", positive: false },
          icon: CircleDollarSign,
        },
        fundSize: {
          label: "Fund Size",
          value: "$48,920",
          change: { value: "5%", positive: false },
          icon: Wallet,
        },
        velocity: {
          label: "Velocity",
          value: "2.1",
          change: { value: "8%", positive: false },
          icon: Gauge,
        },
      },
      showChart: true,
      chartData: weatherizationData,
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Select Interventions
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-2">
        <SearchFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="flex flex-col gap-2 lg:min-w-[200px]">
          <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-[3px] border-gray-400 rounded-md hover:bg-gray-50">
            Add filters
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-[3px] border-gray-400 rounded-md hover:bg-gray-50">
            Apply carbon estimates
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-md hover:bg-purple-700">
            Create new intervention
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700">
          <strong>76 interventions found</strong> (showing data from last 7 days{" "}
          <a href="#" className="text-purple-600 hover:text-purple-700">
            change
          </a>
          )
        </p>
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
