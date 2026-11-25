import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import confetti from 'canvas-confetti';
import {
  CalendarPlus,
  Utensils,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Ticket,
  QrCode,
  ShieldAlert,
  Flame
} from 'lucide-react';

export const BookMealPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { menuItems, pickupSlots, bookMeal } = useData();

  // Workflow steps: 1: Meal Type -> 2: Menu Item -> 3: Slot -> 4: Summary -> 5: Generated Token
  const [step, setStep] = useState(1);
  const [mealType, setMealType] = useState('dinner');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [generatedBooking, setGeneratedBooking] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check URL query param for preselected item
  useEffect(() => {
    const preselectedItemId = searchParams.get('item');
    if (preselectedItemId && menuItems.length) {
      const found = menuItems.find((i) => i.itemId === preselectedItemId);
      if (found) {
        setMealType(found.mealType);
        setSelectedItem(found);
        setStep(2);
      }
    }
  }, [searchParams, menuItems]);

  // Filter items and slots based on selected mealType
  const filteredItems = menuItems.filter((i) => i.mealType.toLowerCase() === mealType.toLowerCase());
  const filteredSlots = pickupSlots.filter((s) => s.mealType.toLowerCase() === mealType.toLowerCase());

  // Smart Peak-Hour Analysis for selected slot (Feature 1)
  const peakHourInfo = selectedSlotId
    ? dataService.getPeakHourSuggestion(selectedSlotId, mealType)
    : null;

  const handleSelectSlot = (slotId) => {
    setSelectedSlotId(slotId);
  };

  const handleApplyAlternativeSlot = (altSlotId) => {
    setSelectedSlotId(altSlotId);
  };

  const handleConfirmBooking = () => {
    setError('');
    setIsSubmitting(true);
    try {
      const booking = bookMeal({
        mealType,
        selectedItem,
        pickupSlotId: selectedSlotId,
        bookingDate
      });

      setGeneratedBooking(booking);
      setStep(5);

      // Trigger celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    } catch (err) {
      setError(err.message || 'Could not complete booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Progress Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>Smart Mess Booking Wizard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Book Your Meal & Slot
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Complete the 5-step process to reserve your portion and secure a fast pickup window.
        </p>
      </div>

      {/* 5-Step Visual Stepper */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card">
        <div className="flex items-center justify-between text-xs font-bold">
          {[
            { num: 1, label: 'Meal Type' },
            { num: 2, label: 'Food Item' },
            { num: 3, label: 'Pickup Slot' },
            { num: 4, label: 'Confirm' },
            { num: 5, label: 'Token' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  step === s.num
                    ? 'bg-emerald-800 text-white shadow-sm ring-4 ring-emerald-100 dark:ring-emerald-950'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`hidden sm:inline ${
                  step === s.num
                    ? 'text-emerald-900 dark:text-emerald-300'
                    : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Error message banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm font-semibold flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 1: SELECT MEAL TYPE */}
      {/* ---------------------------------------------------- */}
      {step === 1 && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Step 1: Select Meal Session
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'breakfast',
                title: 'Breakfast',
                time: '7:45 AM – 8:40 AM',
                desc: 'Poha, Idli-Vada, Eggs & Chai'
              },
              {
                id: 'lunch',
                title: 'Lunch',
                time: '12:30 PM – 1:30 PM',
                desc: 'Dal Tadka, Rice, Rotis & Curries'
              },
              {
                id: 'dinner',
                title: 'Dinner (Active)',
                time: '6:50 PM – 8:40 PM',
                desc: 'Shahi Paneer, Egg Curry, Naan & Sweets'
              }
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setMealType(m.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  mealType === m.id
                    ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-soft ring-2 ring-emerald-500'
                    : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-900'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-extrabold text-base text-gray-900 dark:text-white capitalize">
                    {m.title}
                  </h4>
                  {mealType === m.id && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                  {m.time}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition"
            >
              <span>Next: View Menu & Thalis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 2: VIEW MENU AVAILABILITY */}
      {/* ---------------------------------------------------- */}
      {step === 2 && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                Step 2: Choose Your {mealType} Item
              </h3>
              <p className="text-xs text-gray-500">
                Live inventory tracking prevents bookings for sold-out items.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Meal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const isSelected = selectedItem?.itemId === item.itemId;
              const isSoldOut = item.availability === 'Sold Out' || item.availableQuantity <= 0;

              return (
                <div
                  key={item.itemId}
                  onClick={() => !isSoldOut && setSelectedItem(item)}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                    isSoldOut
                      ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 border-gray-200'
                      : isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500 cursor-pointer shadow-soft'
                      : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 cursor-pointer'
                  }`}
                >
                  <div className="relative h-36">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                          item.category === 'Veg' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                          item.availability === 'Available'
                            ? 'bg-emerald-600'
                            : item.availability === 'Few Left'
                            ? 'bg-amber-500'
                            : 'bg-red-600'
                        }`}
                      >
                        {item.availability} ({item.availableQuantity} Left)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">
                          {item.name}
                        </h4>
                        <span className="font-extrabold text-sm text-emerald-800 dark:text-emerald-400">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                      <span className="text-gray-400 text-[11px]">{item.calories} kcal</span>
                      <span
                        className={`font-bold ${
                          isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500'
                        }`}
                      >
                        {isSoldOut ? 'Sold Out' : isSelected ? '✓ Selected' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-gray-600 font-semibold text-xs border border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => {
                if (!selectedItem) {
                  setError('Please select an available food item to continue.');
                  return;
                }
                setError('');
                setStep(3);
              }}
              disabled={!selectedItem}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
            >
              <span>Next: Select Pickup Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 3: SELECT PICKUP SLOT & SMART PEAK-HOUR FEATURE */}
      {/* ---------------------------------------------------- */}
      {step === 3 && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Step 3: Choose 10-Minute Pickup Slot
              </h3>
              <p className="text-xs text-gray-500">
                Staggered slots prevent mess queues and guarantee freshly prepared thalis.
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Menu</span>
            </button>
          </div>

          {/* Feature 1: Smart Peak-Hour Distribution Alert */}
          {peakHourInfo && peakHourInfo.isBusy && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Smart Peak-Hour Distribution Recommendation</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                "{peakHourInfo.message}" {peakHourInfo.recommendation}
              </p>
              {peakHourInfo.suggestedSlot && (
                <button
                  type="button"
                  onClick={() => handleApplyAlternativeSlot(peakHourInfo.suggestedSlot.slotId)}
                  className="mt-1 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition"
                >
                  Switch to Recommended Slot ({peakHourInfo.suggestedSlot.displayTime})
                </button>
              )}
            </div>
          )}

          {/* Slot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSlots.map((slot) => {
              const isSelected = selectedSlotId === slot.slotId;
              const isFull = slot.bookedCount >= slot.capacity;
              const isPeak = slot.bookedCount >= slot.capacity * 0.7;

              return (
                <div
                  key={slot.slotId}
                  onClick={() => !isFull && handleSelectSlot(slot.slotId)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isFull
                      ? 'opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-800 border-gray-200'
                      : isSelected
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500 cursor-pointer shadow-soft'
                      : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                      {slot.displayTime}
                    </span>
                    {isPeak && !isFull && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Busy
                      </span>
                    )}
                    {!isPeak && !isFull && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                        Fast Access
                      </span>
                    )}
                    {isFull && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                        Full
                      </span>
                    )}
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>Occupancy</span>
                      <span className="font-semibold">
                        {slot.bookedCount} / {slot.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          isFull
                            ? 'bg-red-500'
                            : isPeak
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, (slot.bookedCount / slot.capacity) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-gray-600 font-semibold text-xs border border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => {
                if (!selectedSlotId) {
                  setError('Please select a pickup time slot to proceed.');
                  return;
                }
                setError('');
                setStep(4);
              }}
              disabled={!selectedSlotId}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
            >
              <span>Next: Review & Confirm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 4: BOOKING CONFIRMATION SUMMARY */}
      {/* ---------------------------------------------------- */}
      {step === 4 && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card space-y-6">
          <div className="pb-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Step 4: Booking Confirmation Summary
            </h3>
            <p className="text-xs text-gray-500">
              Please review your booking details before digital token generation.
            </p>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Student Name</span>
                <div className="font-bold text-gray-900 dark:text-white">{currentUser?.name}</div>
                <div className="text-xs font-mono text-gray-500">{currentUser?.registrationNumber}</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Hostel & Room</span>
                <div className="font-bold text-gray-900 dark:text-white">
                  {currentUser?.hostel} • Room {currentUser?.roomNumber}
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Selected Meal</span>
                <div className="font-bold text-gray-900 dark:text-white capitalize">{mealType} Session</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Thali Item</span>
                <div className="font-bold text-emerald-800 dark:text-emerald-400">{selectedItem?.name}</div>
                <div className="text-xs text-gray-500">₹{selectedItem?.price} • {selectedItem?.category}</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Booking Date</span>
                <div className="font-bold text-gray-900 dark:text-white">{bookingDate} (Today)</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Scheduled Pickup Slot</span>
                <div className="font-bold text-emerald-800 dark:text-emerald-400">
                  {filteredSlots.find((s) => s.slotId === selectedSlotId)?.displayTime}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <div className="font-bold text-gray-800 dark:text-white">Booking Policy & Rules:</div>
            <div>• Free cancellation is allowed before cutoff time. Cancelling restores meal inventory immediately.</div>
            <div>• A unique digital token will be issued. Please present your token screen at the counter.</div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-gray-600 font-semibold text-xs border border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-soft-lg transition active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Generating Token...' : 'Confirm & Generate Digital Token'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 5: DIGITAL TOKEN GENERATED! */}
      {/* ---------------------------------------------------- */}
      {step === 5 && generatedBooking && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              Booking Confirmed Successfully
            </span>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
              Your Meal Is Scheduled!
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
              Your meal portion has been reserved and inventory deducted. Here is your digital token ticket:
            </p>
          </div>

          {/* Generated Digital Ticket Card */}
          <div className="max-w-md mx-auto bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-3xl shadow-xl text-left relative overflow-hidden">
            <div className="flex justify-between items-start pb-4 border-b border-emerald-800">
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  ThaliTime Campus Token
                </span>
                <div className="text-4xl font-black text-white tracking-tight mt-0.5">
                  {generatedBooking.tokenNumber}
                </div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {generatedBooking.status}
                </span>
                <div className="text-xs font-semibold text-emerald-200 mt-2 capitalize">
                  {generatedBooking.mealType}
                </div>
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-300">Student:</span>
                <span className="font-bold text-white">{generatedBooking.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">Reg No:</span>
                <span className="font-mono text-emerald-200">{generatedBooking.studentReg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">Pickup Slot:</span>
                <span className="font-bold text-white">{generatedBooking.pickupSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">Meal:</span>
                <span className="font-semibold text-white">
                  {generatedBooking.selectedItems?.[0]?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">Counter:</span>
                <span className="font-bold text-emerald-300">{generatedBooking.counter}</span>
              </div>
            </div>

            {/* Barcode visual */}
            <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between">
              <div className="text-[10px] font-mono text-emerald-400">
                {generatedBooking.bookingId} • SCAN AT COUNTER
              </div>
              <div className="flex gap-0.5 h-6">
                {[2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3].map((w, i) => (
                  <div
                    key={i}
                    className="bg-white"
                    style={{ width: `${w * 2}px` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/student/queue"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition"
            >
              Track Live Queue Position
            </Link>
            <Link
              to="/student/tokens"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-white font-semibold text-sm transition"
            >
              View in My Tokens
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
