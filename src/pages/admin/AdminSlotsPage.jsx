import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Users,
  AlertTriangle,
  X
} from 'lucide-react';

export const AdminSlotsPage = () => {
  const { pickupSlots, addPickupSlot, updatePickupSlot, deletePickupSlot } = useData();
  const [mealFilter, setMealFilter] = useState('dinner');
  const [showAddModal, setShowAddModal] = useState(false);

  const [slotData, setSlotData] = useState({
    mealType: 'dinner',
    startTime: '08:50 PM',
    endTime: '09:00 PM',
    capacity: 50
  });

  const filteredSlots = pickupSlots.filter((s) => s.mealType === mealFilter);

  const handleAddSlotSubmit = (e) => {
    e.preventDefault();
    addPickupSlot(slotData);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Staggered Queue Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pickup Slot Management
          </h2>
          <p className="text-sm text-slate-400">
            Configure 10-minute arrival intervals, set student capacity caps, and monitor rush-hour occupancy.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Slot</span>
        </button>
      </div>

      {/* Meal Session Filter */}
      <div className="flex gap-2">
        {['breakfast', 'lunch', 'dinner'].map((m) => (
          <button
            key={m}
            onClick={() => setMealFilter(m)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              mealFilter === m
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {m} Slots
          </button>
        ))}
      </div>

      {/* Slots Table */}
      <div className="bg-slate-800/90 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/60">
                <th className="py-4 px-6 font-semibold">Time Window</th>
                <th className="py-4 px-6 font-semibold">Meal Session</th>
                <th className="py-4 px-6 font-semibold">Capacity Cap</th>
                <th className="py-4 px-6 font-semibold">Current Bookings</th>
                <th className="py-4 px-6 font-semibold">Occupancy Rate</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredSlots.map((slot) => {
                const occupancyRate = Math.round((slot.bookedCount / slot.capacity) * 100);
                const isPeak = occupancyRate >= 70;

                return (
                  <tr key={slot.slotId} className="hover:bg-slate-900/40 transition">
                    <td className="py-4 px-6 font-bold text-white text-sm">
                      {slot.displayTime}
                    </td>
                    <td className="py-4 px-6 capitalize text-slate-300">{slot.mealType}</td>
                    <td className="py-4 px-6 text-white font-mono">{slot.capacity} max</td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                      {slot.bookedCount} booked
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              occupancyRate >= 95
                                ? 'bg-red-500'
                                : isPeak
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, occupancyRate)}%` }}
                          ></div>
                        </div>
                        <span className={`text-[11px] font-bold ${isPeak ? 'text-amber-400' : 'text-slate-400'}`}>
                          {occupancyRate}% {isPeak && '(Peak)'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => updatePickupSlot(slot.slotId, { isOpen: !slot.isOpen })}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                          slot.isOpen
                            ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {slot.isOpen ? 'Open' : 'Closed'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete slot ${slot.displayTime}?`)) {
                            deletePickupSlot(slot.slotId);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition"
                        title="Delete slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-700 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">Create New Pickup Slot</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSlotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Meal Session
                </label>
                <select
                  value={slotData.mealType}
                  onChange={(e) => setSlotData({ ...slotData, mealType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs capitalize"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    required
                    value={slotData.startTime}
                    onChange={(e) => setSlotData({ ...slotData, startTime: e.target.value })}
                    placeholder="08:50 PM"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    required
                    value={slotData.endTime}
                    onChange={(e) => setSlotData({ ...slotData, endTime: e.target.value })}
                    placeholder="09:00 PM"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Max Student Capacity Cap
                </label>
                <input
                  type="number"
                  required
                  value={slotData.capacity}
                  onChange={(e) => setSlotData({ ...slotData, capacity: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-md transition"
                >
                  Add Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
