import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  Package,
  TrendingDown,
  Leaf,
  Plus,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const AdminInventoryPage = () => {
  const { inventory, menuItems, updateMenuItem, showToast } = useData();
  const [selectedMeal, setSelectedMeal] = useState('all');

  const wasteMetrics = dataService.getWasteReductionMetrics();

  const filteredInventory = inventory.filter((item) => {
    if (selectedMeal === 'all') return true;
    return item.mealType.toLowerCase() === selectedMeal.toLowerCase();
  });

  const handleAdjustPrepared = (item, delta) => {
    const newQty = Math.max(0, item.preparedQuantity + delta);
    // Find matching menu item to update
    const menuItem = menuItems.find((m) => m.itemId === item.itemId);
    if (menuItem) {
      updateMenuItem(menuItem.itemId, {
        quantity: newQty,
        availableQuantity: Math.max(0, menuItem.availableQuantity + delta)
      });
      showToast(`Updated batch size for "${item.itemName}" to ${newQty}`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>Smart Sustainability Initiative</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Food Inventory & Waste Reduction
          </h2>
          <p className="text-sm text-slate-400">
            Compare total prepared thalis against actual consumption to eliminate over-cooking and minimize mess food waste.
          </p>
        </div>
      </div>

      {/* Feature 3: 4 Key Sustainability Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Prepared */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-lg">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Prepared
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {wasteMetrics.totalPrepared}
          </div>
          <div className="text-xs text-slate-400 mt-1">Portions cooked today</div>
        </div>

        {/* Total Served */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-lg">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Consumed
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            {wasteMetrics.totalServed}
          </div>
          <div className="text-xs text-emerald-400 mt-1">Collected at counters</div>
        </div>

        {/* Estimated Waste */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-lg">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Estimated Surplus
          </div>
          <div className="text-3xl font-black text-amber-400 mt-1">
            {wasteMetrics.totalWasteKg} Kg
          </div>
          <div className="text-xs text-amber-400 mt-1">
            {wasteMetrics.wastePercentage}% of total cooking
          </div>
        </div>

        {/* Efficiency & Savings */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-lg">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Kitchen Efficiency
          </div>
          <div className="text-3xl font-black text-green-400 mt-1">
            {wasteMetrics.mealEfficiency}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Est. Savings: ₹{wasteMetrics.costSavingsINR.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'breakfast', 'lunch', 'dinner'].map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMeal(m)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedMeal === m
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {m} Inventory
          </button>
        ))}
      </div>

      {/* Inventory & Waste Audit Table */}
      <div className="bg-slate-800/90 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/60">
                <th className="py-4 px-6 font-semibold">Meal Item</th>
                <th className="py-4 px-6 font-semibold">Session</th>
                <th className="py-4 px-6 font-semibold">Prepared Batch</th>
                <th className="py-4 px-6 font-semibold">Served Portions</th>
                <th className="py-4 px-6 font-semibold">Active In-Stock</th>
                <th className="py-4 px-6 font-semibold">Surplus / Waste</th>
                <th className="py-4 px-6 font-semibold text-right">Batch Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredInventory.map((item) => {
                const isLow = item.availableQuantity <= (item.lowStockThreshold || 15);
                const surplus = Math.max(0, item.preparedQuantity - item.servedQuantity - item.availableQuantity);

                return (
                  <tr key={item.inventoryId} className="hover:bg-slate-900/40 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">{item.itemName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: {item.itemId}</div>
                    </td>
                    <td className="py-4 px-6 capitalize text-slate-300 font-medium">
                      {item.mealType}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-white text-sm">
                      {item.preparedQuantity}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                      {item.servedQuantity}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`font-mono font-bold ${
                          item.availableQuantity === 0
                            ? 'text-red-400'
                            : isLow
                            ? 'text-amber-400'
                            : 'text-white'
                        }`}
                      >
                        {item.availableQuantity}
                      </span>
                      {isLow && item.availableQuantity > 0 && (
                        <span className="ml-2 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                          Low Stock
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {item.wasteQuantity > 0
                        ? `${item.wasteQuantity} portions`
                        : surplus > 0
                        ? `${surplus} portions`
                        : '0 (Optimal)'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
                        <button
                          onClick={() => handleAdjustPrepared(item, -20)}
                          className="px-2 py-1 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
                          title="Reduce batch prep by 20"
                        >
                          -20
                        </button>
                        <span className="text-[10px] font-bold text-slate-400">Prep</span>
                        <button
                          onClick={() => handleAdjustPrepared(item, 20)}
                          className="px-2 py-1 rounded-lg text-xs font-bold text-emerald-400 hover:bg-slate-800 transition"
                          title="Increase batch prep by 20"
                        >
                          +20
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
