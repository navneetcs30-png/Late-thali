import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import {
  Settings,
  Sun,
  Moon,
  Eye,
  Bell,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Volume2
} from 'lucide-react';

export const StudentSettingsPage = () => {
  const {
    isDark,
    toggleTheme,
    accessibilityMode,
    toggleAccessibility,
    highContrast,
    toggleHighContrast
  } = useTheme();

  const { refreshData, showToast } = useData();

  const handleResetData = () => {
    if (confirm('Reset all mess data (menu, slots, bookings, tokens) to initial defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Application Preferences</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          System Settings & Accessibility
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize your display, high-contrast mode, text scaling, and data synchronization.
        </p>
      </div>

      <div className="space-y-4">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Visual & Theme Settings
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/70 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-700 shadow-sm text-emerald-700">
                {isDark ? <Moon className="w-5 h-5 text-amber-300" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Theme Mode</h4>
                <p className="text-[11px] text-gray-500">
                  Currently set to {isDark ? 'Dark Mode' : 'Light Cream Mode'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 text-white shadow-soft hover:bg-emerald-900 transition"
            >
              Toggle to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Feature 5: Dedicated Accessibility Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 shadow-sm">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-amber-950 dark:text-amber-200">
                  Feature 5: Accessibility Mode
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  Larger fonts (110%), minimum 48px touch buttons, clear status borders, and simplified navigation.
                </p>
              </div>
            </div>
            <button
              onClick={toggleAccessibility}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                accessibilityMode
                  ? 'bg-amber-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300'
              }`}
            >
              {accessibilityMode ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/70 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="font-bold text-xs text-gray-900 dark:text-white">High Contrast Ratio</h4>
              <p className="text-[11px] text-gray-500">Enhance text sharpness and card borders</p>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                highContrast
                  ? 'bg-emerald-800 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
              }`}
            >
              {highContrast ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Demo Data Reset */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Demo Environment Controls
          </h3>
          <p className="text-xs text-gray-500">
            Reset all meal bookings, token states, inventory quantities, and feedback to the original initial seed database.
          </p>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 font-bold text-xs hover:bg-red-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Database to Initial Default Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
