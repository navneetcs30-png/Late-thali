import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Sun, Moon, Eye, User, ShieldCheck } from 'lucide-react';

export const DemoSwitcher = () => {
  const { currentUser, switchDemoRole, isStudent, isAdmin } = useAuth();
  const { isDark, toggleTheme, accessibilityMode, toggleAccessibility } = useTheme();

  return (
    <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ThaliTime Live System</span>
        </span>
        <span className="hidden md:inline text-emerald-300/80">|</span>
        <span className="hidden md:inline text-emerald-200">
          Current Role:{' '}
          <span className="font-bold text-white capitalize bg-emerald-800/80 px-2 py-0.5 rounded-md">
            {currentUser ? `${currentUser.name} (${currentUser.role})` : 'Guest'}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] text-emerald-300 font-medium hidden sm:inline">Switch Role:</span>
        <button
          onClick={() => switchDemoRole('student1')}
          className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition flex items-center gap-1 ${
            isStudent && currentUser?.email.includes('aarav')
              ? 'bg-emerald-600 text-white shadow-sm font-bold'
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200'
          }`}
          title="Student Aarav (Active Token TT-1024)"
        >
          <User className="w-3 h-3" />
          <span>Student: Aarav</span>
        </button>

        <button
          onClick={() => switchDemoRole('admin')}
          className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition flex items-center gap-1 ${
            isAdmin
              ? 'bg-emerald-600 text-white shadow-sm font-bold'
              : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200'
          }`}
          title="Mess Administrator (Chef Rajesh)"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Admin: Chef Rajesh</span>
        </button>

        <div className="h-3 w-px bg-emerald-800 mx-1 hidden sm:block"></div>

        {/* Accessibility Mode Toggle */}
        <button
          onClick={toggleAccessibility}
          className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition flex items-center gap-1 ${
            accessibilityMode ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200'
          }`}
          title="High readability, larger fonts, high contrast"
        >
          <Eye className="w-3 h-3" />
          <span>A11y {accessibilityMode ? 'ON' : 'OFF'}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1 rounded-md bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 transition"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
