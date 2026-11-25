import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DemoSwitcher } from '../common/DemoSwitcher';
import { Toast } from '../common/Toast';
import {
  LayoutDashboard,
  CalendarPlus,
  Ticket,
  Activity,
  BookOpen,
  History,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Utensils,
  ChevronRight,
  Clock
} from 'lucide-react';

export const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { unreadNotificationCount } = useData();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/student', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Book Meal', path: '/student/book', icon: <CalendarPlus className="w-5 h-5" /> },
    { label: 'My Tokens', path: '/student/tokens', icon: <Ticket className="w-5 h-5" /> },
    { label: 'Live Queue', path: '/student/queue', icon: <Activity className="w-5 h-5" /> },
    { label: 'Mess Menu', path: '/student/menu', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Booking History', path: '/student/history', icon: <History className="w-5 h-5" /> },
    {
      label: 'Notifications',
      path: '/student/notifications',
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : null
    },
    { label: 'Feedback & Help', path: '/student/feedback', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Profile', path: '/student/profile', icon: <User className="w-5 h-5" /> },
    { label: 'Settings', path: '/student/settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF5] dark:bg-gray-950 flex flex-col">
      <DemoSwitcher />
      <Toast />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
              <Link to="/student" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-soft">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-emerald-950 dark:text-white">
                    Thali<span className="text-emerald-500">Time</span>
                  </span>
                  <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider -mt-1">
                    Student Portal
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Info Pill */}
            <div className="p-4 mx-3 my-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
                {currentUser?.name || 'Student'}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                {currentUser?.registrationNumber || 'RA2111003010452'}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                {currentUser?.hostel} • Room {currentUser?.roomNumber}
              </div>
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
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-soft'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
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

          {/* Bottom user / logout bar */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sm:px-8 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Welcome, {currentUser?.name?.split(' ')[0] || 'Student'}! 👋
                </h1>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    Dinner Service Active (6:50 PM – 8:40 PM)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications Icon with Badge */}
              <Link
                to="/student/notifications"
                className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
                )}
              </Link>

              {/* Profile Avatar */}
              <Link
                to="/student/profile"
                className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser?.name?.charAt(0) || 'S'}
                </div>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 hidden sm:inline">
                  {currentUser?.name}
                </span>
              </Link>
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
