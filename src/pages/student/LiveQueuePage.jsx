import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  Activity,
  Ticket,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Bell,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const LiveQueuePage = () => {
  const { currentUser } = useAuth();
  const { bookings, refreshData } = useData();

  // Find active booking for student
  const activeBooking = bookings.find(
    (b) =>
      b.studentId === currentUser?.uid &&
      ['Waiting', 'Preparing', 'Ready', 'Confirmed'].includes(b.status)
  );

  const mealType = activeBooking?.mealType || 'dinner';
  const queueMetrics = dataService.getQueueMetrics(activeBooking?.tokenNumber, mealType);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const isReady = activeBooking?.status === 'Ready';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Mess Queue Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Real-Time Queue Tracking
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Monitor counter progress in real time. Collect your thali when your token is called.
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-50 transition shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Live Queue</span>
        </button>
      </div>

      {/* Meal Ready Callout Banner */}
      {isReady && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-bounce-short">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-100">
                MEAL READY FOR COLLECTION
              </span>
              <h3 className="text-2xl font-black">
                Your Thali ({activeBooking.tokenNumber}) is Ready!
              </h3>
              <p className="text-sm text-emerald-100">
                Please proceed to <strong className="underline font-bold text-white">{activeBooking.counter || 'Counter 1'}</strong> with your digital token.
              </p>
            </div>
          </div>
          <Link
            to="/student/tokens"
            className="px-6 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm shadow-md transition active:scale-95 shrink-0"
          >
            Show Token Ticket
          </Link>
        </div>
      )}

      {/* Main Queue Dashboard Display */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-8">
        {/* Top 4 Real-time KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* NOW SERVING */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-center">
            <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">
              NOW SERVING
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-900 dark:text-emerald-200 mt-1">
              {queueMetrics.nowServing}
            </div>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              Counter 1 & 2 Active
            </span>
          </div>

          {/* YOUR TOKEN */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center">
            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              YOUR TOKEN
            </span>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              {activeBooking ? activeBooking.tokenNumber : '—'}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              {activeBooking ? activeBooking.status : 'No active booking'}
            </span>
          </div>

          {/* PEOPLE AHEAD */}
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-center">
            <span className="text-[10px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-widest">
              PEOPLE AHEAD
            </span>
            <div className="text-3xl sm:text-4xl font-black text-blue-900 dark:text-blue-200 mt-1">
              {activeBooking ? queueMetrics.peopleAhead : '0'}
            </div>
            <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">
              In waiting line
            </span>
          </div>

          {/* ESTIMATED WAIT */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-center">
            <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest">
              ESTIMATED WAIT
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-900 dark:text-amber-200 mt-1">
              {activeBooking
                ? isReady
                  ? '0 mins'
                  : `~${queueMetrics.estimatedWaitMinutes} mins`
                : '0 mins'}
            </div>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
              {isReady ? 'Ready for pickup!' : 'Approximate service time'}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar Component */}
        <div className="space-y-3 p-6 rounded-2xl bg-gray-50/60 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Serving Token: {queueMetrics.nowServing}</span>
            </div>
            <div>
              {activeBooking ? (
                <span>
                  Your Target: <strong>{activeBooking.tokenNumber}</strong> ({activeBooking.status})
                </span>
              ) : (
                <span className="text-gray-400">Reserve a slot to enter the live queue</span>
              )}
            </div>
          </div>

          {/* Progress bar container */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700 h-3 rounded-full transition-all duration-700"
              style={{
                width: activeBooking
                  ? isReady
                    ? '100%'
                    : `${Math.max(12, 100 - queueMetrics.peopleAhead * 14)}%`
                  : '0%'
              }}
            ></div>
          </div>

          <div className="flex justify-between text-[11px] text-gray-500">
            <span>Kitchen Preparation Line</span>
            <span>Counter Collection Window</span>
          </div>
        </div>

        {/* Live Queue Status Stream */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Active Counter Stream (Latest Tokens)</span>
            </h3>
            <span className="text-xs text-gray-500">Auto-refreshes on status change</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {queueMetrics.queueList.map((tokenItem) => {
              const isYou = tokenItem.tokenNumber === activeBooking?.tokenNumber;
              return (
                <div
                  key={tokenItem.tokenNumber}
                  className={`p-4 rounded-2xl border transition-all ${
                    isYou
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500 shadow-soft'
                      : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white font-mono">
                      {tokenItem.tokenNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tokenItem.status === 'Ready'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                          : tokenItem.status === 'Preparing'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : tokenItem.status === 'Collected'
                          ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {tokenItem.status}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {tokenItem.studentName}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                    <span>{tokenItem.pickupSlot}</span>
                    {isYou && (
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        (You)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
