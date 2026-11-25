import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  Send,
  Filter,
  Search,
  AlertTriangle
} from 'lucide-react';

export const AdminFeedbackPage = () => {
  const { feedbackList, resolveFeedback } = useData();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeResolvingId, setActiveResolvingId] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  const filtered = feedbackList.filter((f) => {
    const matchStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchCategory = categoryFilter === 'all' || f.category === categoryFilter;
    return matchStatus && matchCategory;
  });

  const avgRating =
    feedbackList.length > 0
      ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
      : '4.5';

  const handleResolve = (feedbackId) => {
    resolveFeedback(feedbackId, adminNotes, 'Resolved');
    setActiveResolvingId(null);
    setAdminNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Quality Assurance & Student Voice</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Student Feedback & Complaints
          </h2>
          <p className="text-sm text-slate-400">
            Review meal ratings, investigate service delays or food shortages, and resolve student issues.
          </p>
        </div>

        {/* Rating Scorecard */}
        <div className="flex items-center gap-4 bg-slate-800 p-3 px-5 rounded-2xl border border-slate-700">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">AVG STUDENT RATING</span>
            <div className="text-2xl font-black text-amber-400 flex items-center gap-1">
              <span>{avgRating}</span>
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">TOTAL REVIEWS</span>
            <div className="text-2xl font-black text-white">{feedbackList.length}</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/90 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {['all', 'Pending', 'Under Review', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Food Quality">Food Quality</option>
            <option value="Food Shortage">Food Shortage</option>
            <option value="Service Delay">Service Delay</option>
            <option value="Hygiene">Hygiene</option>
            <option value="Staff Behaviour">Staff Behaviour</option>
            <option value="Suggestion">Suggestion</option>
          </select>
        </div>
      </div>

      {/* Feedback Feed */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.feedbackId}
            className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-lg space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-sm">
                  {item.studentName}{' '}
                  <span className="text-xs font-mono font-normal text-slate-400">
                    ({item.tokenNumber} • {item.mealType})
                  </span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    item.status === 'Resolved'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                      : item.status === 'Under Review'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              "{item.description}"
            </p>

            {/* Resolved note if present */}
            {item.adminNotes && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200">
                <strong className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                  Official Kitchen Response:
                </strong>
                {item.adminNotes}
              </div>
            )}

            {/* Resolution Form Toggle */}
            {item.status !== 'Resolved' && (
              <div className="pt-2">
                {activeResolvingId === item.feedbackId ? (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Response & Action Taken Notes:
                    </label>
                    <textarea
                      rows={2}
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="e.g. Assigned extra counter helper, kitchen team briefed, pre-portioned containers added..."
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveResolvingId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleResolve(item.feedbackId)}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition"
                      >
                        Send Reply & Mark Resolved
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setActiveResolvingId(item.feedbackId);
                      setAdminNotes('');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Respond & Mark Resolved</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
