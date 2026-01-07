import {
  TrendingUp,
  DollarSign,
  Droplets,
  ArrowUpRight,
  CreditCard,
  BarChart3,
  Coins,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MetricCardProps {
  title: string;
  value: string;
  change?: { value: string; positive: boolean };
  link?: string;
  icon: typeof TrendingUp;
  color?: string;
  periodSelector?: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  };
}

function MetricCard({
  title,
  value,
  change,
  link,
  icon: Icon,
  color = "purple",
  periodSelector,
}: MetricCardProps) {
  const colorClasses = {
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-[3px] border-gray-400 rounded-lg p-3"
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          } flex-shrink-0`}
        >
          <Icon className="w-8 h-8" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-600 mb-0.5">{title}</h3>

          {periodSelector && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs text-gray-600">over:</span>
              <Select
                value={periodSelector.value}
                onValueChange={periodSelector.onChange}
              >
                <SelectTrigger className="h-5 w-auto border-0 border-b border-gray-300 rounded-none px-1 py-0 text-xs focus:ring-0 focus:border-gray-600 bg-transparent hover:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="!shadow-none border border-gray-200">
                  {periodSelector.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <p
              className={`${
                periodSelector ? "text-4xl" : "text-5xl"
              } font-bold text-gray-900`}
            >
              {value}
            </p>
            {change && (
              <span
                className={`text-xs font-medium ${
                  change.positive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {change.positive ? "↑" : "↓"} {change.value}
              </span>
            )}
          </div>

          {link && (
            <a
              href="#"
              className="text-xs text-purple-600 hover:text-purple-700 mt-2 inline-flex items-center gap-1"
            >
              {link}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
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
      className="bg-white border-[3px] border-gray-400 rounded-lg p-3"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
          <Droplets className="w-8 h-8" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>

          <div className="grid grid-cols-3 gap-3">
            {periods.map((period) => (
              <div key={period.label}>
                <p className="text-xs text-gray-500 mb-1">{period.label}</p>
                <p className="text-4xl font-bold text-gray-900">
                  {period.value}
                </p>
              </div>
            ))}
          </div>

          {link && (
            <a
              href="#"
              className="text-xs text-purple-600 hover:text-purple-700 mt-2 inline-flex items-center gap-1"
            >
              {link}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface SparklineProps {
  data: number[];
}

function Sparkline({ data }: SparklineProps) {
  // Transform data for recharts
  const chartData = data.map((value, index) => ({ value, index }));

  // Determine if trend is positive or negative
  const isPositive = data[data.length - 1] >= data[0];

  return (
    <ResponsiveContainer width={80} height={30}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositive ? "#059669" : "#dc2626"}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface AccountInfoProps {
  balance: string;
  autoPlaced: string;
  autoReturning: { amount: string; date: string };
  commitments: { date: string; description: string; amount: string }[];
  coloredTitle?: boolean;
}

function AccountInfo({
  balance,
  autoPlaced,
  autoReturning,
  commitments,
  coloredTitle = false,
}: AccountInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border-[3px] border-gray-400 rounded-lg overflow-hidden"
    >
      <div
        className={`${
          coloredTitle
            ? "bg-purple-50 border-b-[3px] border-purple-100 px-3 py-2.5"
            : "px-3 pt-3"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${coloredTitle ? "" : "mb-3"}`}
        >
          <CreditCard
            className={`w-4 h-4 ${
              coloredTitle ? "text-purple-600" : "text-purple-600"
            }`}
          />
          <h3
            className={`text-base font-semibold ${
              coloredTitle ? "text-purple-900" : "text-gray-900"
            }`}
          >
            Current Account
          </h3>
        </div>
      </div>

      <div className={`px-3 pb-3 ${coloredTitle ? "pt-3" : ""}`}>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Balance:</span>
            <span className="text-md font-semibold text-gray-900">
              {balance}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Auto-placed:</span>
            <span className="text-md font-semibold text-gray-900">
              {autoPlaced}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Auto-returning:</span>
            <span className="text-md font-medium text-gray-700">
              {autoReturning.amount}, {autoReturning.date}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-400">
            <span className="text-sm text-gray-600 block mb-1.5">
              Commitments:
            </span>
            {commitments.map((commitment, idx) => (
              <div key={idx} className="text-md text-gray-700 mb-1">
                {commitment.date}, {commitment.description}, {commitment.amount}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-400">
            <span className="text-sm text-gray-600">Alerts:</span>
            <span className="text-sm text-gray-500">None</span>
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
  sparklineData: number[];
  geography: string;
  fundNo: string;
}

interface FundsTableProps {
  funds: FundEntry[];
  coloredTitle?: boolean;
}

interface ReturnsTrackingChartProps {
  coloredTitle?: boolean;
}

function ReturnsTrackingChart({
  coloredTitle = false,
}: ReturnsTrackingChartProps = {}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "#6b7280",
        fontSize: 11,
      },
      width: chartContainerRef.current.clientWidth - 24,
      height: 240,
      rightPriceScale: {
        borderColor: "#e5e7eb",
      },
      timeScale: {
        borderColor: "#e5e7eb",
        timeVisible: false,
        secondsVisible: false,
      },
      grid: {
        vertLines: {
          color: "#e5e7eb",
        },
        horzLines: {
          color: "#e5e7eb",
        },
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#059669",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#059669",
      wickDownColor: "#dc2626",
    });

    // Dummy candlestick data for the last 30 days showing realistic volatility
    // Using timestamps for Nov 12 - Dec 11, 2025
    const data = [
      { time: "2025-11-12", open: 2.45, high: 2.52, low: 2.41, close: 2.48 },
      { time: "2025-11-13", open: 2.48, high: 2.55, low: 2.46, close: 2.51 },
      { time: "2025-11-14", open: 2.51, high: 2.54, low: 2.47, close: 2.49 },
      { time: "2025-11-15", open: 2.49, high: 2.58, low: 2.48, close: 2.56 },
      { time: "2025-11-16", open: 2.56, high: 2.62, low: 2.54, close: 2.59 },
      { time: "2025-11-17", open: 2.59, high: 2.61, low: 2.52, close: 2.54 },
      { time: "2025-11-18", open: 2.54, high: 2.6, low: 2.51, close: 2.58 },
      { time: "2025-11-19", open: 2.58, high: 2.66, low: 2.57, close: 2.64 },
      { time: "2025-11-20", open: 2.64, high: 2.68, low: 2.61, close: 2.62 },
      { time: "2025-11-21", open: 2.62, high: 2.69, low: 2.6, close: 2.67 },
      { time: "2025-11-22", open: 2.67, high: 2.73, low: 2.65, close: 2.71 },
      { time: "2025-11-23", open: 2.71, high: 2.75, low: 2.68, close: 2.7 },
      { time: "2025-11-24", open: 2.7, high: 2.72, low: 2.65, close: 2.66 },
      { time: "2025-11-25", open: 2.66, high: 2.74, low: 2.65, close: 2.72 },
      { time: "2025-11-26", open: 2.72, high: 2.79, low: 2.71, close: 2.77 },
      { time: "2025-11-27", open: 2.77, high: 2.82, low: 2.75, close: 2.8 },
      { time: "2025-11-28", open: 2.8, high: 2.84, low: 2.78, close: 2.81 },
      { time: "2025-11-29", open: 2.81, high: 2.83, low: 2.76, close: 2.78 },
      { time: "2025-11-30", open: 2.78, high: 2.85, low: 2.77, close: 2.83 },
      { time: "2025-12-01", open: 2.83, high: 2.88, low: 2.81, close: 2.86 },
      { time: "2025-12-02", open: 2.86, high: 2.91, low: 2.84, close: 2.89 },
      { time: "2025-12-03", open: 2.89, high: 2.93, low: 2.85, close: 2.87 },
      { time: "2025-12-04", open: 2.87, high: 2.9, low: 2.83, close: 2.85 },
      { time: "2025-12-05", open: 2.85, high: 2.94, low: 2.84, close: 2.92 },
      { time: "2025-12-06", open: 2.92, high: 2.98, low: 2.9, close: 2.96 },
      { time: "2025-12-07", open: 2.96, high: 3.02, low: 2.94, close: 2.99 },
      { time: "2025-12-08", open: 2.99, high: 3.05, low: 2.96, close: 3.01 },
      { time: "2025-12-09", open: 3.01, high: 3.12, low: 3.0, close: 3.08 },
      { time: "2025-12-10", open: 3.08, high: 3.18, low: 3.06, close: 3.12 },
      { time: "2025-12-11", open: 3.12, high: 3.2, low: 3.1, close: 3.15 },
    ];

    candlestickSeries.setData(data);

    // Fit content to view
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border-[3px] border-gray-400 rounded-lg overflow-hidden"
    >
      <div
        className={`${
          coloredTitle
            ? "bg-emerald-50 border-b-[3px] border-emerald-100 px-3 py-2.5"
            : "px-3 pt-3"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${coloredTitle ? "" : "mb-3"}`}
        >
          <BarChart3
            className={`w-4 h-4 ${
              coloredTitle ? "text-emerald-600" : "text-purple-600"
            }`}
          />
          <h3
            className={`text-base font-semibold ${
              coloredTitle ? "text-emerald-900" : "text-gray-900"
            }`}
          >
            Aggregate Portfolio Performance (last 30 days)
          </h3>
        </div>
      </div>
      <div
        className={coloredTitle ? "px-3 pb-3 pt-3" : ""}
        ref={chartContainerRef}
      />
    </motion.div>
  );
}

function FundsTable({ funds, coloredTitle = false }: FundsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white border-[3px] border-gray-200 rounded-lg overflow-hidden mt-4"
    >
      <div
        className={`${
          coloredTitle
            ? "bg-blue-50 border-b-[3px] border-blue-100 px-3 py-2.5"
            : "px-3 pt-3"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${coloredTitle ? "" : "mb-3"}`}
        >
          <Coins
            className={`w-4 h-4 ${
              coloredTitle ? "text-blue-600" : "text-purple-600"
            }`}
          />
          <h3
            className={`text-base font-semibold ${
              coloredTitle ? "text-blue-900" : "text-gray-900"
            }`}
          >
            Cash Deployed (8 unifunds)
          </h3>
        </div>
      </div>

      <div className={`overflow-x-auto ${coloredTitle ? "px-3 pb-3" : ""}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                Date
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                Invested
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                My Stake
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                Trend
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                Fund Category
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                Fund Purpose
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
                Geography
              </th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">
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
                <td className="py-2 px-2 text-gray-700 text-xs">{fund.date}</td>
                <td className="py-2 px-2 text-gray-900 font-medium text-xs">
                  {fund.invested}
                </td>
                <td className="py-2 px-2 text-gray-700 text-xs">
                  {fund.stake}
                </td>
                <td className="py-2 px-2">
                  <Sparkline data={fund.sparklineData} />
                </td>
                <td className="py-2 px-2 text-gray-700 text-xs">
                  {fund.fundCategory}
                </td>
                <td className="py-2 px-2 text-gray-700 text-xs">
                  {fund.fundPurpose.join(", ")}
                </td>
                <td className="py-2 px-2 text-gray-700 text-xs">
                  {fund.geography}
                </td>
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
  const [returnPeriod, setReturnPeriod] = useState("7days");

  const mockFunds: FundEntry[] = [
    {
      date: "May 13",
      invested: "$250.00",
      stake: "12%",
      fundCategory: "Investment",
      fundPurpose: ["Worker development", "Upskilling", "Recycling Industries"],
      sparklineData: [2.1, 2.3, 1.2, 1.6, 2.7, 2.5, 2.9, 3.1, 3.2, 3.1],
      geography: "10 miles home",
      fundNo: "1245269",
    },
    {
      date: "Mar 27",
      invested: "$500.00",
      stake: "100%",
      fundCategory: "Insurance",
      fundPurpose: ["Parametric", "Weather", "Events"],
      sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
      geography: "Countywide",
      fundNo: "137669",
    },
    {
      date: "Feb 18",
      invested: "$250.00",
      stake: "0.2%",
      fundCategory: "Fund-of-Funds",
      fundPurpose: [
        "Sector focus",
        "Services for pet owners",
        "Min return: 4%",
      ],
      sparklineData: [2.2, 2.2, 2.3, 2.3, 2.4, 2.4, 2.5, 2.5, 2.6, 2.6],
      geography: "Nationwide",
      fundNo: "1205056",
    },
    {
      date: "Feb 9",
      invested: "$82.50",
      stake: "3%",
      fundCategory: "Lending",
      fundPurpose: [
        "Max period: 14 days",
        "Max loan: $80",
        "Min. Reliability: Level 3",
      ],
      sparklineData: [1.5, 1.1, 1.3, 1.1, 1.5, 2.0, 2.4, 2.2, 2.3, 2.4],
      geography: "5 miles radius",
      fundNo: "879",
    },
    {
      date: "Jan 22",
      invested: "$175.00",
      stake: "8%",
      fundCategory: "Investment",
      fundPurpose: ["Green energy", "Solar", "Community projects"],
      sparklineData: [2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3],
      geography: "25 miles home",
      fundNo: "2045871",
    },
    {
      date: "Jan 15",
      invested: "$300.00",
      stake: "15%",
      fundCategory: "Fund-of-Funds",
      fundPurpose: ["Local food", "Agriculture", "Min return: 3%"],
      sparklineData: [1.9, 2.0, 2.1, 2.0, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
      geography: "Regional",
      fundNo: "1567234",
    },
    {
      date: "Dec 11",
      invested: "$125.00",
      stake: "5%",
      fundCategory: "Investment",
      fundPurpose: ["Transportation", "EV charging", "Infrastructure"],
      sparklineData: [2.0, 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8],
      geography: "15 miles work",
      fundNo: "987432",
    },
    {
      date: "Nov 28",
      invested: "$68.00",
      stake: "2%",
      fundCategory: "Lending",
      fundPurpose: [
        "Max period: 30 days",
        "Max loan: $150",
        "Min. Reliability: Level 4",
      ],
      sparklineData: [1.7, 1.8, 1.6, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5],
      geography: "Citywide",
      fundNo: "445",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">My Funds</h1>
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
          change={{ value: "9%", positive: true }}
          icon={TrendingUp}
          link="Returns breakdown"
          color="green"
          periodSelector={{
            value: returnPeriod,
            onChange: setReturnPeriod,
            options: [
              { value: "24hours", label: "Last 24 hours" },
              { value: "7days", label: "Last 7 days" },
              { value: "30days", label: "Last 30 days" },
              { value: "90days", label: "Last 90 days" },
            ],
          }}
        />

        <LiquidityCard
          title="Current Liquidity"
          periods={[
            { label: "24 hours", value: "17%" },
            { label: "7 days", value: "31%" },
            { label: "28 days", value: "58%" },
          ]}
          link="Liquidity tracker"
        />
      </div>

      {/* Account Info and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        <AccountInfo
          balance="$99.99"
          autoPlaced="$875"
          autoReturning={{ amount: "$580", date: "December 27" }}
          commitments={[
            { date: "December 28", description: "Rent", amount: "$780" },
          ]}
          coloredTitle={true}
        />

        <ReturnsTrackingChart coloredTitle={true} />
      </div>

      {/* Funds Table */}
      <FundsTable funds={mockFunds} coloredTitle={true} />
    </div>
  );
}
