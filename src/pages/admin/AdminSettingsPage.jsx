import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  Settings,
  Clock,
  AlertTriangle,
  RotateCcw,
  Save,
  CheckCircle2,
  Download,
  ShieldCheck
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { settings, refreshData, showToast } = useData();

  const [form, setForm] = useState({
    avgServiceTimeMinutes: settings?.avgServiceTimeMinutes || 2,
    lowStockThreshold: settings?.lowStockThreshold || 15,
    autoCutoffMinutes: settings?.autoCutoffMinutes || 30,
    activeMeal: settings?.activeMeal || 'dinner'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dataService.updateSettings(form);
    refreshData();
    setSaved(true);
    showToast('Mess administration parameters updated', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Reset entire mess database to initial demo state? All new bookings will be reverted.')) {
      dataService.resetDatabase();
      refreshData();
      window.location.reload();
    }
  };

  const handleExportJSON = () => {
    const backup = {
      menu: dataService.getMenuItems(),
      slots: dataService.getPickupSlots(),
      bookings: dataService.getBookings(),
      inventory: dataService.getInventory(),
      feedback: dataService.getFeedbackList()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ThaliTime_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Operational Rules & Cutoffs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Mess Configuration & Settings
        </h2>
        <p className="text-sm text-slate-400">
          Configure queue calculation rates, low-stock threshold triggers, and backup controls.
        </p>
      </div>

      <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white">Operational Parameters</h3>

        {saved && (
          <div className="p-3.5 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Settings saved successfully! Queue estimators updated.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Average Counter Service Time (Minutes / Student)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                required
                value={form.avgServiceTimeMinutes}
                onChange={(e) =>
                  setForm({ ...form, avgServiceTimeMinutes: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Used to compute dynamic estimated wait time on student dashboards.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Emergency Low Stock Alert Threshold (Portions)
              </label>
              <input
                type="number"
                min={5}
                max={50}
                required
                value={form.lowStockThreshold}
                onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Triggers campus alert when item quantity drops below this level.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Active Meal Session
              </label>
              <select
                value={form.activeMeal}
                onChange={(e) => setForm({ ...form, activeMeal: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs capitalize"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Auto Cutoff Before Session (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={120}
                value={form.autoCutoffMinutes}
                onChange={(e) => setForm({ ...form, autoCutoffMinutes: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-md transition flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Parameters</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database Controls */}
      <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Database Backup & Reset</h3>
        <p className="text-xs text-slate-400">
          Export application data for institutional reporting or reset state for a fresh demonstration session.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full JSON Backup</span>
          </button>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800 hover:bg-red-900/60 text-red-300 text-xs font-bold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records to Default</span>
          </button>
        </div>
      </div>
    </div>
  );
};
