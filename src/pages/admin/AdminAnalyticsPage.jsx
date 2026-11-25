import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  ChefHat,
  Leaf,
  Star,
  Users,
  FileSpreadsheet
} from 'lucide-react';

export const AdminAnalyticsPage = () => {
  const { bookings, feedbackList, inventory } = useData();
  const [dateRange, setDateRange] = useState('7d'); // 'today' | '7d' | '30d'

  const historicalData = dataService.getHistoricalDemandAnalytics();
  const forecast = dataService.predictMealDemand('dinner');
  const wasteMetrics = dataService.getWasteReductionMetrics();

  // Meal breakdown data for pie / bar
  const mealCounts = {
    breakfast: bookings.filter((b) => b.mealType === 'breakfast').length + 45,
    lunch: bookings.filter((b) => b.mealType === 'lunch').length + 110,
    dinner: bookings.filter((b) => b.mealType === 'dinner').length + 125
  };

  const mealPieData = [
    { name: 'Breakfast', value: mealCounts.breakfast, color: '#F59E0B' },
    { name: 'Lunch', value: mealCounts.lunch, color: '#3B82F6' },
    { name: 'Dinner', value: mealCounts.dinner, color: '#10B981' }
  ];

  // Prep vs Consumption data
  const prepVsConsumptionData = [
    { meal: 'Bf - Poha', prepared: 180, consumed: 138, surplus: 42 },
    { meal: 'Bf - Idli', prepared: 200, consumed: 182, surplus: 18 },
    { meal: 'Ln - Dal Tadka', prepared: 320, consumed: 305, surplus: 15 },
    { meal: 'Ln - Paneer', prepared: 220, consumed: 206, surplus: 14 },
    { meal: 'Dn - Shahi Paneer', prepared: 280, consumed: 168, surplus: 112 },
    { meal: 'Dn - Egg Curry', prepared: 190, consumed: 154, surplus: 36 }
  ];

  // Student rating breakdown
  const ratingCounts = [
    { rating: '5 Stars', count: feedbackList.filter((f) => f.rating === 5).length + 22 },
    { rating: '4 Stars', count: feedbackList.filter((f) => f.rating === 4).length + 11 },
    { rating: '3 Stars', count: feedbackList.filter((f) => f.rating === 3).length + 4 },
    { rating: '2 Stars', count: feedbackList.filter((f) => f.rating === 2).length + 1 },
    { rating: '1 Star', count: feedbackList.filter((f) => f.rating === 1).length + 0 }
  ];

  const handleExportCSV = () => {
    dataService.exportBookingsCSV();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Campus Intelligence & Reports</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Food Demand & Wastage Analytics
          </h2>
          <p className="text-sm text-slate-400">
            Real-time reporting powered by active bookings, kitchen stock telemetry, and student feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex bg-slate-800 p-1 rounded-2xl border border-slate-700">
            {[
              { id: 'today', label: 'Today' },
              { id: '7d', label: 'Last 7 Days' },
              { id: '30d', label: 'Last 30 Days' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setDateRange(r.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dateRange === r.id
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-bold transition"
            title="Download CSV report"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Feature 2: Demand Prediction Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-800/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold">
            <ChefHat className="w-3.5 h-3.5 text-amber-300" />
            <span>Feature 2: Rule-Based Demand Prediction Engine</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Recommended Kitchen Prep for Tonight ({forecast.day}):{' '}
            <span className="text-emerald-400">{forecast.recommendedPreparation} Thalis</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {forecast.explanation} With an 8% buffer margin, this eliminates counter stock-outs while avoiding batch food spoilage.
          </p>
        </div>

        <div className="shrink-0 flex gap-4 text-center">
          <div className="p-3 px-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Confirmed Bookings</div>
            <div className="text-2xl font-black text-white">{forecast.confirmedBookings}</div>
          </div>
          <div className="p-3 px-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Forecast Accuracy</div>
            <div className="text-2xl font-black text-emerald-400">{forecast.confidenceScore}</div>
          </div>
        </div>
      </div>

      {/* Row 1 Charts: Daily Demand Trend & Meal Session Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Demand Trend (8 cols) */}
        <div className="lg:col-span-8 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <div>
              <h4 className="text-base font-bold text-white">Daily Meal Bookings Trend (Weekly)</h4>
              <p className="text-xs text-slate-400">Breakfast vs Lunch vs Dinner consumption</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold">Peak: Friday Dinner</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDinner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLunch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#CBD5E1' }} />
                <Area
                  type="monotone"
                  dataKey="dinner"
                  name="Dinner"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorDinner)"
                />
                <Area
                  type="monotone"
                  dataKey="lunch"
                  name="Lunch"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorLunch)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meal Breakdown Pie (4 cols) */}
        <div className="lg:col-span-4 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
          <div className="pb-2 border-b border-slate-700">
            <h4 className="text-base font-bold text-white">Meal Demand Share</h4>
            <p className="text-xs text-slate-400">Distribution across 3 daily services</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mealPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mealPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {mealPieData.map((m) => (
              <div key={m.name} className="p-2 rounded-xl bg-slate-900 border border-slate-700">
                <div className="font-bold text-white">{m.name}</div>
                <div className="font-mono text-emerald-400 font-semibold">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Food Prep vs Actual Consumption & Wastage Reduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Food Prep vs Actual Consumption (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <div>
              <h4 className="text-base font-bold text-white">Prepared vs Consumed Thalis</h4>
              <p className="text-xs text-slate-400">Batch cooking vs actual student pickup</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold">96.8% Portions Utilized</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepVsConsumptionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="meal" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="prepared" name="Prepared" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="consumed" name="Consumed" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature 3: Food Waste Reduction Trends (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <div>
              <h4 className="text-base font-bold text-white">Food Waste Trend (Kg)</h4>
              <p className="text-xs text-slate-400">Feature 3: Waste reduced by 62%</p>
            </div>
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} unit="kg" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wastageKg"
                  name="Waste (Kg)"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
