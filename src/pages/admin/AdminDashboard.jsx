import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  Ticket,
  Users,
  ChefHat,
  Package,
  Clock,
  Star,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Activity,
  Flame,
  ChevronRight,
  Plus,
  FileSpreadsheet
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    bookings,
    menuItems,
    pickupSlots,
    inventory,
    feedbackList,
    updateTokenStatus,
    updateMenuItem
  } = useData();

  // Actual calculated statistics
  const todayDate = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((b) => b.bookingDate === todayDate && b.status !== 'Cancelled');
  const activeBookings = bookings.filter((b) => ['Waiting', 'Preparing', 'Ready'].includes(b.status));
  const pendingTokensCount = bookings.filter((b) => b.status === 'Waiting').length;

  const totalPreparedMeals = inventory.reduce((sum, item) => sum + item.preparedQuantity, 0);
  const totalAvailableStock = menuItems.reduce((sum, item) => sum + item.availableQuantity, 0);

  const avgRating =
    feedbackList.length > 0
      ? (feedbackList.reduce((sum, fb) => sum + fb.rating, 0) / feedbackList.length).toFixed(1)
      : '4.5';

  // Queue state
  const queueMetrics = dataService.getQueueMetrics(null, 'dinner');

  // Next token in line
  const nextToken = bookings.find((b) => b.status === 'Waiting');
  const readyToken = bookings.find((b) => b.status === 'Ready');
  const preparingToken = bookings.find((b) => b.status === 'Preparing');

  // Emergency Low Stock Alerts (Feature 4)
  const lowStockItems = dataService.getLowStockAlerts();

  // Smart Demand Forecast for tonight (Feature 2)
  const forecast = dataService.predictMealDemand('dinner');

  // Handler for advancing token status
  const handleAdvanceToken = (bookingId, currentStatus) => {
    let nextStatus = 'Preparing';
    if (currentStatus === 'Waiting') nextStatus = 'Preparing';
    else if (currentStatus === 'Preparing') nextStatus = 'Ready';
    else if (currentStatus === 'Ready') nextStatus = 'Collected';

    updateTokenStatus(bookingId, nextStatus);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Low Stock Alerts (Feature 4) */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Feature 4: Kitchen Emergency Low-Stock Alert
              </div>
              <p className="text-xs text-amber-200 mt-0.5">
                {lowStockItems.map((i) => `"${i.name}" has only ${i.availableQuantity} portions left`).join(' • ')}! Consider scheduling supplementary batch prep.
              </p>
            </div>
          </div>
          <Link
            to="/admin/inventory"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shrink-0 transition"
          >
            Manage Inventory
          </Link>
        </div>
      )}

      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* 1. Total Bookings Today */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Bookings
          </div>
          <div className="text-2xl font-black text-white mt-1">{todayBookings.length}</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-1">Confirmed today</div>
        </div>

        {/* 2. Active Bookings */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Active Bookings
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{activeBookings.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Waiting & Preparing</div>
        </div>

        {/* 3. Meals Prepared */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Meals Prepared
          </div>
          <div className="text-2xl font-black text-white mt-1">{totalPreparedMeals}</div>
          <div className="text-[10px] text-slate-400 mt-1">Kitchen batch total</div>
        </div>

        {/* 4. Remaining Stock */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Available Stock
          </div>
          <div className="text-2xl font-black text-white mt-1">{totalAvailableStock}</div>
          <div className="text-[10px] text-amber-400 font-semibold mt-1">Remaining portions</div>
        </div>

        {/* 5. Pending Tokens */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Pending Tokens
          </div>
          <div className="text-2xl font-black text-blue-400 mt-1">{pendingTokensCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">In queue line</div>
        </div>

        {/* 6. Avg Student Rating */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Student Rating
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1 flex items-center gap-1">
            <span>{avgRating}</span>
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">From {feedbackList.length} reviews</div>
        </div>
      </div>

      {/* Main Grid: Live Token Control (Left) & Demand Prediction / Slots (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Token Control & Queue Operator (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Ticket className="w-4 h-4 text-emerald-400" />
                <span>Live Counter Token Control</span>
              </h3>
              <p className="text-xs text-slate-400">
                Advance token statuses to automatically trigger real-time student queue updates.
              </p>
            </div>
            <Link
              to="/admin/tokens"
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Full Queue Desk</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Action Operator Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Now Serving Card */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/80 space-y-2">
              <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">
                NOW SERVING AT COUNTER 1
              </span>
              <div className="text-4xl font-black text-white">{queueMetrics.nowServing}</div>
              <div className="text-xs text-emerald-300">
                {readyToken
                  ? `${readyToken.studentName} (${readyToken.selectedItems?.[0]?.name})`
                  : 'Counter ready for next student'}
              </div>

              {readyToken && (
                <button
                  onClick={() => handleAdvanceToken(readyToken.bookingId, 'Ready')}
                  className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
                >
                  Mark as Collected (Finished)
                </button>
              )}
            </div>

            {/* Next Token In Line */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                NEXT TOKEN IN LINE
              </span>
              <div className="text-4xl font-black text-emerald-400">
                {nextToken ? nextToken.tokenNumber : preparingToken ? preparingToken.tokenNumber : 'None'}
              </div>
              <div className="text-xs text-slate-300 truncate">
                {nextToken
                  ? `${nextToken.studentName} • ${nextToken.pickupSlot}`
                  : preparingToken
                  ? `Preparing: ${preparingToken.studentName}`
                  : 'All caught up!'}
              </div>

              {nextToken && (
                <button
                  onClick={() => handleAdvanceToken(nextToken.bookingId, 'Waiting')}
                  className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition shadow-sm"
                >
                  Start Preparing (Move to Prep)
                </button>
              )}
            </div>
          </div>

          {/* Active Queue Pipeline Table */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-2">Live Token Queue Pipeline</div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {activeBookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {b.tokenNumber}
                    </span>
                    <div>
                      <div className="font-semibold text-white">{b.studentName}</div>
                      <div className="text-[10px] text-slate-400">
                        {b.pickupSlot} • {b.counter}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Ready'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                          : b.status === 'Preparing'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {b.status}
                    </span>

                    <button
                      onClick={() => handleAdvanceToken(b.bookingId, b.status)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                      {b.status === 'Waiting'
                        ? 'Prepare'
                        : b.status === 'Preparing'
                        ? 'Ready'
                        : 'Collect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Demand Forecasting & Slot Occupancy */}
        <div className="lg:col-span-5 space-y-6">
          {/* Feature 2: Meal Demand Prediction Engine */}
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Feature 2: Smart Demand Forecast</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                {forecast.confidenceScore} Accuracy
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Predicted Demand</div>
                <div className="text-2xl font-black text-white mt-0.5">
                  {forecast.predictedDemand} Thalis
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-700/80">
                <div className="text-[10px] font-bold text-emerald-300 uppercase">Recommended Prep</div>
                <div className="text-2xl font-black text-emerald-300 mt-0.5">
                  {forecast.recommendedPreparation} Thalis
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
              {forecast.explanation}
            </p>
          </div>

          {/* Pickup Slot Occupancy Overview */}
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Pickup Slot Distribution</span>
              </h3>
              <Link to="/admin/slots" className="text-xs text-emerald-400 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {pickupSlots.filter((s) => s.mealType === 'dinner').slice(0, 5).map((slot) => {
                const pct = Math.round((slot.bookedCount / slot.capacity) * 100);
                const isPeak = pct >= 70;

                return (
                  <div key={slot.slotId} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-white">{slot.displayTime}</span>
                      <span className={isPeak ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                        {slot.bookedCount} / {slot.capacity} booked {isPeak && '(Peak)'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          isPeak ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Menu Availability Manager */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h3 className="text-base font-bold text-white">Live Menu Availability Manager</h3>
            <p className="text-xs text-slate-400">
              Toggle availability status directly; changes reflect immediately on student menus.
            </p>
          </div>
          <Link
            to="/admin/menu"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition"
          >
            Open Menu Manager →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.filter((i) => i.mealType === 'dinner').map((item) => (
            <div
              key={item.itemId}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-400">
                    Remaining: <strong className="text-white">{item.availableQuantity}</strong> portions
                  </div>
                </div>
              </div>

              <div>
                <select
                  value={item.availability}
                  onChange={(e) => updateMenuItem(item.itemId, { availability: e.target.value })}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-600 text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Available">Available</option>
                  <option value="Few Left">Few Left</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
