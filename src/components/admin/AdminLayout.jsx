import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DemoSwitcher } from '../common/DemoSwitcher';
import { Toast } from '../common/Toast';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Clock,
  Ticket,
  Package,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  FileSpreadsheet,
  Plus
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { unreadNotificationCount } = useData();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Menu Management', path: '/admin/menu', icon: <UtensilsCrossed className="w-5 h-5" /> },
    { label: 'Pickup Slots', path: '/admin/slots', icon: <Clock className="w-5 h-5" /> },
    { label: 'Token Control', path: '/admin/tokens', icon: <Ticket className="w-5 h-5" /> },
    { label: 'Food Inventory', path: '/admin/inventory', icon: <Package className="w-5 h-5" /> },
    { label: 'Demand Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Student Feedback', path: '/admin/feedback', icon: <MessageSquare className="w-5 h-5" /> },
    {
      label: 'Notifications',
      path: '/admin/notifications',
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : null
    },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <DemoSwitcher />
      <Toast />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-soft">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white">
                    Thali<span className="text-emerald-400">Time</span>
                  </span>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider -mt-1">
                    Mess Administrator
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Admin Badge */}
            <div className="p-3.5 mx-3 my-3 rounded-2xl bg-emerald-950/50 border border-emerald-800/60">
              <div className="font-bold text-xs text-emerald-200">
                {currentUser?.name || 'Chef Rajesh Verma'}
              </div>
              <div className="text-[11px] text-emerald-400">Head Mess Administrator</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Central Kitchen Ops • Shift 1</div>
            </div>

            {/* Navigation links */}
            <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom user / logout */}
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Admin Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-900">
          {/* Top Header */}
          <header className="h-16 bg-slate-950/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Central Mess Control Dashboard</span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                    ONLINE
                  </span>
                </h1>
                <div className="text-xs text-slate-400 hidden sm:block">
                  Live dinner session • Counter 1 (Veg) & Counter 2 (Special)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/menu"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Menu Item</span>
              </Link>

              {/* Notification icon */}
              <Link
                to="/admin/notifications"
                className="relative p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
                )}
              </Link>

              {/* Profile icon */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  CR
                </div>
                <div className="hidden md:block text-left text-xs">
                  <div className="font-bold text-white leading-none">Chef Rajesh</div>
                  <div className="text-[10px] text-slate-400">Administrator</div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
