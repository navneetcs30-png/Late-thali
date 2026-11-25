import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  History,
  Calendar,
  Ticket,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  Filter
} from 'lucide-react';

export const BookingHistoryPage = () => {
  const { currentUser } = useAuth();
  const { bookings } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const studentBookings = bookings.filter((b) => b.studentId === currentUser?.uid);

  const filtered = studentBookings.filter((b) => {
    const matchesSearch =
      b.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mealType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.selectedItems?.[0]?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail & Records</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Booking History
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete record of your meal bookings, pickup timings, and service receipts.
          </p>
        </div>

        <Link
          to="/student/feedback"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-50 transition"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Submit Meal Feedback</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by token (TT-XXXX), dish, or session..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'Collected', 'Waiting', 'Ready', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-emerald-800 text-white shadow-soft'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="py-3.5 px-5 font-semibold">Token</th>
                <th className="py-3.5 px-5 font-semibold">Meal Session</th>
                <th className="py-3.5 px-5 font-semibold">Food Item</th>
                <th className="py-3.5 px-5 font-semibold">Date</th>
                <th className="py-3.5 px-5 font-semibold">Pickup Slot</th>
                <th className="py-3.5 px-5 font-semibold">Counter</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
                <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:border-gray-800">
              {filtered.map((item) => (
                <tr key={item.bookingId} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition">
                  <td className="py-4 px-5 font-mono font-bold text-emerald-800 dark:text-emerald-400">
                    {item.tokenNumber}
                  </td>
                  <td className="py-4 px-5 font-bold capitalize text-gray-900 dark:text-white">
                    {item.mealType}
                  </td>
                  <td className="py-4 px-5 text-gray-700 dark:text-gray-300 font-medium">
                    {item.selectedItems?.[0]?.name || 'Standard Thali'}
                  </td>
                  <td className="py-4 px-5 text-gray-500">{item.bookingDate}</td>
                  <td className="py-4 px-5 font-medium text-gray-700 dark:text-gray-300">
                    {item.pickupSlot}
                  </td>
                  <td className="py-4 px-5 text-gray-500">{item.counter || 'Counter 1'}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Collected'
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          : item.status === 'Ready'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                          : item.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    {item.status === 'Collected' ? (
                      <Link
                        to={`/student/feedback?booking=${item.bookingId}&token=${item.tokenNumber}&meal=${item.mealType}`}
                        className="px-3 py-1.5 rounded-xl font-bold text-[11px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition"
                      >
                        Rate Meal
                      </Link>
                    ) : ['Waiting', 'Preparing', 'Ready'].includes(item.status) ? (
                      <Link
                        to="/student/queue"
                        className="px-3 py-1.5 rounded-xl font-bold text-[11px] bg-emerald-800 text-white hover:bg-emerald-900 transition"
                      >
                        Track
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-[11px]">—</span>
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
