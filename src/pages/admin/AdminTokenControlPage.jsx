import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  Ticket,
  Activity,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  UserCheck,
  Send,
  AlertCircle
} from 'lucide-react';

export const AdminTokenControlPage = () => {
  const { bookings, updateTokenStatus, showToast } = useData();
  const [mealFilter, setMealFilter] = useState('dinner');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const queueMetrics = dataService.getQueueMetrics(null, mealFilter);

  const filteredBookings = bookings.filter((b) => {
    const matchMeal = b.mealType.toLowerCase() === mealFilter.toLowerCase();
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchSearch =
      b.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.studentReg.toLowerCase().includes(searchTerm.toLowerCase());
    return matchMeal && matchStatus && matchSearch;
  });

  const handleStatusChange = (bookingId, newStatus, counter) => {
    updateTokenStatus(bookingId, newStatus, counter);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Counter Serving Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Live Token & Queue Control
          </h2>
          <p className="text-sm text-slate-400">
            Advance token states in real time: Waiting → Preparing → Ready → Collected.
          </p>
        </div>

        {/* Live Serving Banner */}
        <div className="flex items-center gap-4 bg-slate-800 p-3 px-5 rounded-2xl border border-slate-700">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">NOW SERVING</span>
            <div className="text-2xl font-black text-emerald-400">{queueMetrics.nowServing}</div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">QUEUE ACTIVE</span>
            <div className="text-2xl font-black text-white">{queueMetrics.activeTokensCount}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-800/90 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search student name, registration number, or token (TT-XXXX)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          {['breakfast', 'lunch', 'dinner'].map((m) => (
            <button
              key={m}
              onClick={() => setMealFilter(m)}
              className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                mealFilter === m
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {['all', 'Waiting', 'Preparing', 'Ready', 'Collected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-emerald-800 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Token Pipeline Table */}
      <div className="bg-slate-800/90 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/60">
                <th className="py-4 px-6 font-semibold">Token</th>
                <th className="py-4 px-6 font-semibold">Student Details</th>
                <th className="py-4 px-6 font-semibold">Ordered Meal</th>
                <th className="py-4 px-6 font-semibold">Pickup Slot</th>
                <th className="py-4 px-6 font-semibold">Counter</th>
                <th className="py-4 px-6 font-semibold">Live Status</th>
                <th className="py-4 px-6 font-semibold text-right">Queue Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredBookings.map((b) => (
                <tr key={b.bookingId} className="hover:bg-slate-900/40 transition">
                  <td className="py-4 px-6 font-mono font-bold text-emerald-400 text-sm">
                    {b.tokenNumber}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-white">{b.studentName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {b.studentReg} • {b.studentHostel}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-200">
                    {b.selectedItems?.[0]?.name || 'Standard Thali'}
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-medium">{b.pickupSlot}</td>
                  <td className="py-4 px-6">
                    <select
                      value={b.counter || 'Counter 1'}
                      onChange={(e) => updateTokenStatus(b.bookingId, b.status, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="Counter 1">Counter 1 (Veg)</option>
                      <option value="Counter 2">Counter 2 (Special)</option>
                      <option value="Counter 3">Counter 3 (Express)</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Ready'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/40 animate-pulse'
                          : b.status === 'Preparing'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : b.status === 'Collected'
                          ? 'bg-slate-700 text-slate-300'
                          : b.status === 'Cancelled'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-1.5">
                    {b.status === 'Waiting' && (
                      <button
                        onClick={() => handleStatusChange(b.bookingId, 'Preparing')}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition"
                      >
                        Start Prep
                      </button>
                    )}
                    {b.status === 'Preparing' && (
                      <button
                        onClick={() => handleStatusChange(b.bookingId, 'Ready')}
                        className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs transition"
                        title="Alert student that food is ready"
                      >
                        Mark Ready (Call)
                      </button>
                    )}
                    {b.status === 'Ready' && (
                      <button
                        onClick={() => handleStatusChange(b.bookingId, 'Collected')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition"
                      >
                        Served (Collect)
                      </button>
                    )}
                    {b.status === 'Collected' && (
                      <span className="text-slate-500 text-[11px] font-semibold">Done ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
