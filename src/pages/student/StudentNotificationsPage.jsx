import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Utensils,
  Trash2,
  CheckCheck
} from 'lucide-react';

export const StudentNotificationsPage = () => {
  const { currentUser } = useAuth();
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead
  } = useData();

  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter !== 'all') return n.type === filter;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'booking':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'meal_ready':
        return <Utensils className="w-5 h-5 text-green-600" />;
      case 'stock_alert':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'queue':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Campus Notification Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Notifications
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time updates regarding your meal bookings, queue calls, and mess alerts.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: `Unread (${unreadNotificationCount})` },
          { id: 'booking', label: 'Bookings' },
          { id: 'meal_ready', label: 'Meal Ready' },
          { id: 'stock_alert', label: 'Food Shortage' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-emerald-800 text-white shadow-soft'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.notificationId}
              onClick={() => markNotificationRead(item.notificationId)}
              className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                !item.isRead
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 shrink-0">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>{item.title}</span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
