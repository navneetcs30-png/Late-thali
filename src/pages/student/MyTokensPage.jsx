import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Ticket,
  Printer,
  XCircle,
  Activity,
  CheckCircle2,
  Clock,
  Utensils,
  Share2,
  Download,
  AlertTriangle
} from 'lucide-react';

export const MyTokensPage = () => {
  const { currentUser } = useAuth();
  const { bookings, cancelBooking } = useData();
  const [filter, setFilter] = useState('active'); // 'active' | 'completed' | 'cancelled' | 'all'
  const [selectedTokenForPrint, setSelectedTokenForPrint] = useState(null);

  const studentBookings = bookings.filter((b) => b.studentId === currentUser?.uid);

  const activeTokens = studentBookings.filter((b) =>
    ['Waiting', 'Preparing', 'Ready', 'Confirmed'].includes(b.status)
  );
  const completedTokens = studentBookings.filter((b) => b.status === 'Collected');
  const cancelledTokens = studentBookings.filter((b) => b.status === 'Cancelled');

  const displayedTokens =
    filter === 'active'
      ? activeTokens
      : filter === 'completed'
      ? completedTokens
      : filter === 'cancelled'
      ? cancelledTokens
      : studentBookings;

  const handlePrint = (token) => {
    setSelectedTokenForPrint(token);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Digital Token Wallet</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            My Meal Tokens
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View active digital tickets, check queue status, or print for quick verification.
          </p>
        </div>

        <Link
          to="/student/book"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-soft transition active:scale-95"
        >
          <span>Book Another Meal</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
        {[
          { id: 'active', label: `Active (${activeTokens.length})` },
          { id: 'completed', label: `Collected (${completedTokens.length})` },
          { id: 'cancelled', label: `Cancelled (${cancelledTokens.length})` },
          { id: 'all', label: `All (${studentBookings.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-emerald-800 text-white shadow-soft'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tokens Grid */}
      {displayedTokens.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-card">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No {filter} tokens found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-6">
            You don't have any meal tokens matching this tab. Book your thali ahead to receive a digital token.
          </p>
          <Link
            to="/student/book"
            className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold"
          >
            Book Meal Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTokens.map((token) => {
            const isCancelable = ['Waiting', 'Confirmed'].includes(token.status);
            const isReady = token.status === 'Ready';

            return (
              <div
                key={token.bookingId}
                className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-soft-lg transition-all"
              >
                {/* Digital Ticket Top Stub */}
                <div
                  className={`p-5 text-white relative ${
                    isReady
                      ? 'bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-800'
                      : token.status === 'Cancelled'
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800'
                      : token.status === 'Collected'
                      ? 'bg-gradient-to-r from-slate-800 to-slate-900'
                      : 'bg-gradient-to-r from-emerald-900 to-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">
                      THALITIME DIGITAL TOKEN
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isReady
                          ? 'bg-white text-green-800 animate-pulse'
                          : token.status === 'Cancelled'
                          ? 'bg-red-500 text-white'
                          : token.status === 'Collected'
                          ? 'bg-gray-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {token.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-3xl font-black tracking-tight">{token.tokenNumber}</div>
                      <div className="text-xs text-emerald-100 font-semibold capitalize mt-0.5">
                        {token.mealType} Session • {token.counter || 'Counter 1'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-300">Pickup Slot</div>
                      <div className="font-extrabold text-sm">{token.pickupSlot}</div>
                    </div>
                  </div>
                </div>

                {/* Ticket Perforation Graphic */}
                <div className="relative flex items-center justify-between px-2 bg-white dark:bg-gray-900 -my-3 z-10">
                  <div className="w-5 h-5 rounded-full bg-[#FAFAF5] dark:bg-gray-950 -ml-4 border-r border-gray-200 dark:border-gray-800"></div>
                  <div className="flex-1 border-b-2 border-dashed border-gray-200 dark:border-gray-800 mx-2"></div>
                  <div className="w-5 h-5 rounded-full bg-[#FAFAF5] dark:bg-gray-950 -mr-4 border-l border-gray-200 dark:border-gray-800"></div>
                </div>

                {/* Ticket Details Body */}
                <div className="p-5 space-y-3 pt-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Food Item:</span>
                      <span className="font-bold text-gray-900 dark:text-white text-right">
                        {token.selectedItems?.[0]?.name || 'Mess Meal'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Student:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {token.studentName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hostel & Room:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {token.studentHostel || currentUser?.hostel} • {currentUser?.roomNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {token.bookingDate}
                      </span>
                    </div>
                  </div>

                  {/* Barcode Graphic */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-gray-400">
                      ID: {token.bookingId}
                    </div>
                    <div className="flex gap-0.5 h-6">
                      {[1, 3, 2, 4, 1, 2, 4, 1, 3, 2, 1, 4].map((w, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-800 dark:bg-gray-300"
                          style={{ width: `${w * 1.5}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                    {['Waiting', 'Preparing', 'Ready'].includes(token.status) && (
                      <Link
                        to="/student/queue"
                        className="flex-1 py-2 rounded-xl text-center font-bold text-xs bg-emerald-800 hover:bg-emerald-900 text-white transition flex items-center justify-center gap-1.5"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Track Queue</span>
                      </Link>
                    )}

                    <button
                      onClick={() => handlePrint(token)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-200 transition"
                      title="Print or Save PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>

                    {isCancelable && (
                      <button
                        onClick={() => {
                          if (confirm(`Cancel token ${token.tokenNumber}? Your portion will be restored.`)) {
                            cancelBooking(token.bookingId);
                          }
                        }}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition"
                        title="Cancel Booking"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden Printable Token Element (activated by window.print()) */}
      {selectedTokenForPrint && (
        <div className="printable-token hidden p-8 border-2 border-black max-w-sm mx-auto text-black">
          <div className="text-center pb-4 border-b-2 border-black">
            <h1 className="text-2xl font-black">THALITIME SMART MESS</h1>
            <p className="text-xs">Central Mess Hall • College Campus</p>
          </div>
          <div className="py-4 text-center">
            <div className="text-xs font-bold">DIGITAL MEAL TOKEN</div>
            <div className="text-5xl font-black tracking-tight">{selectedTokenForPrint.tokenNumber}</div>
            <div className="text-sm font-bold uppercase mt-1">{selectedTokenForPrint.mealType} SESSION</div>
          </div>
          <div className="space-y-1 text-xs border-t border-black pt-3">
            <div><strong>Student:</strong> {selectedTokenForPrint.studentName}</div>
            <div><strong>Reg No:</strong> {selectedTokenForPrint.studentReg}</div>
            <div><strong>Hostel:</strong> {selectedTokenForPrint.studentHostel}</div>
            <div><strong>Pickup Slot:</strong> {selectedTokenForPrint.pickupSlot}</div>
            <div><strong>Counter:</strong> {selectedTokenForPrint.counter || 'Counter 1'}</div>
            <div><strong>Meal:</strong> {selectedTokenForPrint.selectedItems?.[0]?.name}</div>
            <div><strong>Date:</strong> {selectedTokenForPrint.bookingDate}</div>
          </div>
          <div className="mt-4 pt-3 border-t border-black text-center text-[10px]">
            Please present this token at the serving counter.
          </div>
        </div>
      )}
    </div>
  );
};
