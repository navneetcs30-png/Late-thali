import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Bell,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Utensils
} from 'lucide-react';

export const AdminNotificationsPage = () => {
  const { notifications, unreadNotificationCount, markAllNotificationsRead } = useData();
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState('delay');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    // Dispatch campus-wide announcement
    dataService.createNotification({
      userId: 'all',
      title: broadcastTitle,
      message: broadcastMessage,
      type: broadcastType
    });

    setSentSuccess(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
          <Bell className="w-3.5 h-3.5" />
          <span>Campus Alert Dispatch</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Mess Notification Dispatcher
        </h2>
        <p className="text-sm text-slate-400">
          Send campus-wide service delay alerts, food shortage notices, or emergency kitchen updates.
        </p>
      </div>

      {/* Broadcast Form */}
      <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white">Broadcast New Mess Announcement</h3>

        {sentSuccess && (
          <div className="p-3.5 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Announcement dispatched to all student dashboards!</span>
          </div>
        )}

        <form onSubmit={handleSendBroadcast} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Announcement Title *
              </label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Service Delay Notice / Counter 2 Update"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Alert Category *
              </label>
              <select
                value={broadcastType}
                onChange={(e) => setBroadcastType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              >
                <option value="delay">Service Delay (e.g. 10m Late)</option>
                <option value="stock_alert">Food Shortage Warning</option>
                <option value="system">General Mess Announcement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Broadcast Message *
            </label>
            <textarea
              rows={3}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="e.g. Dinner service is running 10 minutes late due to heavy counter rush. Please monitor your live queue position."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-md transition flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Notification to All Students</span>
          </button>
        </form>
      </div>

      {/* Recent Alerts Feed */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Recent System Log & Alerts</h3>
        <div className="divide-y divide-slate-700">
          {notifications.slice(0, 6).map((n) => (
            <div key={n.notificationId} className="py-3.5 flex items-start justify-between gap-4">
              <div>
                <div className="font-bold text-white text-xs">{n.title}</div>
                <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
              </div>
              <span className="text-[10px] text-slate-500 shrink-0">
                {new Date(n.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
