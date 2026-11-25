import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  Ticket,
  Clock,
  Users,
  Utensils,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Activity,
  CalendarPlus,
  ChevronRight,
  TrendingUp,
  Sparkles,
  QrCode
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { bookings, menuItems, pickupSlots, cancelBooking } = useData();

  // Find active booking for student
  const activeBooking = bookings.find(
    (b) =>
      b.studentId === currentUser?.uid &&
      ['Waiting', 'Preparing', 'Ready', 'Confirmed'].includes(b.status)
  );

  // Compute live queue metrics
  const queueMetrics = dataService.getQueueMetrics(activeBooking?.tokenNumber, activeBooking?.mealType || 'dinner');

  // Today's available items
  const availableItems = menuItems.filter((i) => i.availableQuantity > 0);
  const dinnerItems = menuItems.filter((i) => i.mealType === 'dinner');

  // Recent student history (last 4)
  const recentBookings = bookings
    .filter((b) => b.studentId === currentUser?.uid)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 p-6 sm:p-8 text-white shadow-soft-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus Digital Mess System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good evening, {currentUser?.name?.split(' ')[0]}! 🍲
            </h2>
            <p className="text-emerald-200 text-sm max-w-xl">
              Dinner service is live at Central Mess Hall. Book your meal slot, skip the counter line, and collect your thali right on time.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/student/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-gray-100 text-emerald-900 font-bold text-sm shadow-md transition active:scale-95"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Book A Meal</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-700/20 blur-xl"></div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Active Token */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>Active Token</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {activeBooking ? activeBooking.tokenNumber : 'None'}
          </div>
          <div className="text-xs mt-1">
            {activeBooking ? (
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                {activeBooking.status} • {activeBooking.mealType}
              </span>
            ) : (
              <span className="text-gray-400">No active meal booking</span>
            )}
          </div>
        </div>

        {/* Stat 2: Queue Position */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>Queue Position</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {activeBooking ? (
              activeBooking.status === 'Ready' ? (
                <span className="text-emerald-700 dark:text-emerald-400">Ready!</span>
              ) : (
                `${queueMetrics.peopleAhead} Ahead`
              )
            ) : (
              '0 Ahead'
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Now serving: <strong className="text-emerald-700 dark:text-emerald-400">{queueMetrics.nowServing}</strong>
          </div>
        </div>

        {/* Stat 3: Est. Waiting Time */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>Estimated Wait</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {activeBooking ? (
              activeBooking.status === 'Ready' ? '0 min' : `~${queueMetrics.estimatedWaitMinutes} mins`
            ) : (
              '0 min'
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Avg service: 2 mins / student
          </div>
        </div>

        {/* Stat 4: Today's Menu Items */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>Available Thalis</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {availableItems.length} Menus
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
            Kitchen in full prep
          </div>
        </div>
      </div>

      {/* Center 2-Column: Active Token & Live Queue Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Token Card */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Active Meal Token</h3>
              </div>
              {activeBooking && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    activeBooking.status === 'Ready'
                      ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 animate-bounce'
                      : activeBooking.status === 'Preparing'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {activeBooking.status}
                </span>
              )}
            </div>

            {activeBooking ? (
              <div className="mt-4 space-y-4">
                {/* Visual Ticket Box */}
                <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white p-5 rounded-2xl shadow-inner relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                        Digital Token
                      </span>
                      <h4 className="text-3xl font-black tracking-tight">{activeBooking.tokenNumber}</h4>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-800/80 text-xs font-bold capitalize">
                      {activeBooking.mealType}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-800/80 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] text-emerald-300 font-medium">Pickup Slot</div>
                      <div className="font-bold text-white">{activeBooking.pickupSlot}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-300 font-medium">Assigned Counter</div>
                      <div className="font-bold text-emerald-200">{activeBooking.counter || 'Counter 1'}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-emerald-800/80 text-xs">
                    <div className="text-[10px] text-emerald-300 font-medium">Meal Choice</div>
                    <div className="font-semibold text-white truncate">
                      {activeBooking.selectedItems?.[0]?.name || 'Standard Thali'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/student/tokens"
                    className="flex-1 py-2.5 text-center text-xs font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-xl transition"
                  >
                    View Digital Ticket
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Cancel active booking ${activeBooking.tokenNumber}?`)) {
                        cancelBooking(activeBooking.bookingId);
                      }
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
                  <Ticket className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">No active meal booked</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  You haven't reserved dinner yet. Slots are currently open with fast queue access.
                </p>
                <Link
                  to="/student/book"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 text-white hover:bg-emerald-900 transition"
                >
                  <span>Book Dinner Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Live Queue Tracker Card */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Live Mess Queue</h3>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-Time Sync Active
              </span>
            </div>

            {/* Now Serving vs Your Token Highlight */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
                <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                  Now Serving
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-0.5">
                  {queueMetrics.nowServing}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Your Token
                </div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-0.5">
                  {activeBooking ? activeBooking.tokenNumber : '—'}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                  People Ahead
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {activeBooking ? queueMetrics.peopleAhead : '0'}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <div className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                  Est. Wait
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-200 mt-0.5">
                  {activeBooking ? `${queueMetrics.estimatedWaitMinutes}m` : '0m'}
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
                <span>Now Serving: {queueMetrics.nowServing}</span>
                <span>
                  {activeBooking ? `Your Position: ${activeBooking.tokenNumber}` : 'Queue Idle'}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-green-500 h-2 rounded-full transition-all duration-700"
                  style={{
                    width: activeBooking
                      ? activeBooking.status === 'Ready'
                        ? '100%'
                        : `${Math.max(15, 100 - queueMetrics.peopleAhead * 15)}%`
                      : '0%'
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Counter 1 & 2 Active</span>
                <span>Average throughput: 28 thalis / 10 mins</span>
              </div>
            </div>

            {/* Live Queue mini list */}
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                Live Counter Feed
              </div>
              <div className="flex flex-wrap gap-2">
                {queueMetrics.queueList.slice(0, 6).map((item) => {
                  const isYou = item.tokenNumber === activeBooking?.tokenNumber;
                  return (
                    <span
                      key={item.tokenNumber}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${
                        isYou
                          ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500'
                          : item.status === 'Ready'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                          : item.status === 'Preparing'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      <span>{item.tokenNumber}</span>
                      <span className="text-[10px] font-normal opacity-80">({item.status})</span>
                      {isYou && <span className="text-[10px] bg-emerald-600 px-1 rounded">You</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <Link
              to="/student/queue"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
            >
              <span>Open Full Live Queue Tracker</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Today's Menu Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tonight's Dinner Menu</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Chef-crafted nutritious meals prepared fresh with low food-waste scheduling
            </p>
          </div>
          <Link
            to="/student/menu"
            className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Weekly Menu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {dinnerItems.map((item) => (
            <div
              key={item.itemId}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50/40 dark:bg-gray-800/40 flex flex-col justify-between group hover:shadow-soft transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category & Status badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.category === 'Veg'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${
                      item.availability === 'Available'
                        ? 'bg-emerald-600 text-white'
                        : item.availability === 'Few Left'
                        ? 'bg-amber-500 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {item.availability} ({item.availableQuantity} Left)
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">
                      {item.name}
                    </h4>
                    <span className="font-extrabold text-sm text-emerald-800 dark:text-emerald-400 shrink-0">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {item.calories} kcal • Dinner
                  </span>
                  <Link
                    to={`/student/book?item=${item.itemId}`}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      item.availability === 'Sold Out'
                        ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 cursor-not-allowed pointer-events-none'
                        : 'bg-emerald-800 text-white hover:bg-emerald-900 active:scale-95'
                    }`}
                  >
                    {item.availability === 'Sold Out' ? 'Sold Out' : 'Book This Thali'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Booking History Mini-Table */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Booking History</h3>
          <Link
            to="/student/history"
            className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
          >
            View All History →
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                <th className="py-2.5 font-semibold">Date</th>
                <th className="py-2.5 font-semibold">Meal</th>
                <th className="py-2.5 font-semibold">Token</th>
                <th className="py-2.5 font-semibold">Pickup Slot</th>
                <th className="py-2.5 font-semibold">Counter</th>
                <th className="py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentBookings.map((bk) => (
                <tr key={bk.bookingId} className="text-gray-700 dark:text-gray-300">
                  <td className="py-3 font-medium">{bk.bookingDate}</td>
                  <td className="py-3 capitalize font-semibold">{bk.mealType}</td>
                  <td className="py-3 font-mono font-bold text-emerald-800 dark:text-emerald-400">
                    {bk.tokenNumber}
                  </td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">{bk.pickupSlot}</td>
                  <td className="py-3">{bk.counter || 'Counter 1'}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        bk.status === 'Collected'
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          : bk.status === 'Ready'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                          : bk.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {bk.status}
                    </span>
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
