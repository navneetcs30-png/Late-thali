import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Send,
  HelpCircle
} from 'lucide-react';

export const StudentFeedbackPage = () => {
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const { bookings, feedbackList, submitFeedback } = useData();

  const [mealType, setMealType] = useState('lunch');
  const [selectedToken, setSelectedToken] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Food Quality');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Eligible completed bookings for student
  const completedBookings = bookings.filter(
    (b) => b.studentId === currentUser?.uid && b.status === 'Collected'
  );

  // Student's own feedback submissions
  const myFeedback = feedbackList.filter((f) => f.studentId === currentUser?.uid);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const mealParam = searchParams.get('meal');
    if (tokenParam) setSelectedToken(tokenParam);
    if (mealParam) setMealType(mealParam);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!description.trim()) {
      setError('Please provide feedback comments.');
      return;
    }

    try {
      submitFeedback({
        mealType,
        tokenNumber: selectedToken || 'TT-1002',
        rating,
        category,
        description
      });

      setSuccessMsg('Thank you! Your feedback has been sent directly to Mess Management.');
      setDescription('');
      setRating(5);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback.');
    }
  };

  const categories = [
    'Food Quality',
    'Food Shortage',
    'Service Delay',
    'Hygiene',
    'Staff Behaviour',
    'Suggestion',
    'Other'
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Student Voice & Quality Assurance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Feedback & Complaints
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Rate your meals, report shortages or delays, and help improve campus mess operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Submit Meal Feedback
          </h3>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-xs text-red-600 font-semibold">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 text-xs text-green-700 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Meal Session *
                </label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white capitalize"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Referenced Booking Token
                </label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
                >
                  <option value="">Select Completed Booking</option>
                  {completedBookings.map((bk) => (
                    <option key={bk.bookingId} value={bk.tokenNumber}>
                      {bk.tokenNumber} ({bk.bookingDate} - {bk.mealType})
                    </option>
                  ))}
                  <option value="TT-1002">TT-1002 (Lunch Special)</option>
                  <option value="TT-0985">TT-0985 (Breakfast Combo)</option>
                </select>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rate Your Meal Experience (1 to 5 Stars) *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 ml-2">
                  {rating === 5
                    ? '5.0 - Excellent'
                    : rating === 4
                    ? '4.0 - Very Good'
                    : rating === 3
                    ? '3.0 - Average'
                    : rating === 2
                    ? '2.0 - Below Expectations'
                    : '1.0 - Poor'}
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Detailed Feedback / Complaint Description *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your thoughts on food taste, hygiene, serving speed, or suggest an item for next week's menu..."
                className="w-full p-3 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-soft transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback to Mess Administration</span>
            </button>
          </form>
        </div>

        {/* Right Column: Submitted tickets history (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
              Your Past Submissions
            </h3>

            {myFeedback.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No feedback tickets submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {myFeedback.map((fb) => (
                  <div
                    key={fb.feedbackId}
                    className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(fb.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          fb.status === 'Resolved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                            : fb.status === 'Under Review'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {fb.status}
                      </span>
                    </div>

                    <div className="font-semibold text-gray-900 dark:text-white">
                      [{fb.category}] <span className="font-normal font-mono text-gray-400">({fb.tokenNumber})</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-relaxed">
                      "{fb.description}"
                    </p>

                    {fb.adminNotes && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-[11px] text-emerald-900 dark:text-emerald-300">
                        <strong className="block text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                          Mess Chef Response:
                        </strong>
                        {fb.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
