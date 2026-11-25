import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { dataService } from '../../services/dataService';
import {
  BookOpen,
  Calendar,
  Utensils,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Leaf
} from 'lucide-react';

export const StudentMenuPage = () => {
  const { menuItems } = useData();
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly'
  const [mealFilter, setMealFilter] = useState('all'); // 'all' | 'breakfast' | 'lunch' | 'dinner'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'Veg' | 'Non-Veg'
  const [selectedDay, setSelectedDay] = useState('Wednesday');

  const weeklySchedule = dataService.getWeeklyMenu();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredItems = menuItems.filter((item) => {
    const matchMeal = mealFilter === 'all' || item.mealType.toLowerCase() === mealFilter.toLowerCase();
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchMeal && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Campus Dining Hall</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Digital Mess Menu
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Check today's real-time counter stock or preview the full weekly rotating meal schedule.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'daily'
                ? 'bg-white dark:bg-gray-900 text-emerald-800 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Today's Live Menu
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'weekly'
                ? 'bg-white dark:bg-gray-900 text-emerald-800 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Weekly Schedule (Mon–Sun)
          </button>
        </div>
      </div>

      {/* DAILY VIEW */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            {/* Meal session pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Meals' },
                { id: 'breakfast', label: 'Breakfast' },
                { id: 'lunch', label: 'Lunch' },
                { id: 'dinner', label: 'Dinner' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMealFilter(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mealFilter === m.id
                      ? 'bg-emerald-800 text-white shadow-soft'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Veg / Non-Veg toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  categoryFilter === 'all'
                    ? 'border border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'text-gray-500'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setCategoryFilter('Veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  categoryFilter === 'Veg'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'border border-green-600 text-green-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setCategoryFilter('Non-Veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  categoryFilter === 'Non-Veg'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'border border-red-600 text-red-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Non-Veg</span>
              </button>
            </div>
          </div>

          {/* Menu Items Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.itemId}
                className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-card hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-44">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white shadow-sm ${
                        item.category === 'Veg' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-black/60 text-white backdrop-blur capitalize">
                      {item.mealType}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        item.availability === 'Available'
                          ? 'bg-emerald-600 text-white'
                          : item.availability === 'Few Left'
                          ? 'bg-amber-500 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {item.availability} ({item.availableQuantity} Left)
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h3 className="font-extrabold text-base text-gray-900 dark:text-white leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-400 shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Nutrition: <strong>{item.calories} kcal</strong></span>
                      <span>Allergens: {item.allergens?.join(', ') || 'None'}</span>
                    </div>

                    <Link
                      to={`/student/book?item=${item.itemId}`}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                        item.availability === 'Sold Out'
                          ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 pointer-events-none'
                          : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-soft'
                      }`}
                    >
                      <span>{item.availability === 'Sold Out' ? 'Sold Out Today' : 'Book This Thali'}</span>
                      {item.availability !== 'Sold Out' && <ArrowRight className="w-3.5 h-3.5" />}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WEEKLY VIEW (Monday to Sunday Calendar) */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          {/* Day selection tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                  selectedDay === day
                    ? 'bg-emerald-800 text-white shadow-soft'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:bg-gray-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule for the selected day */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Breakfast */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-card space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 flex items-center justify-center font-bold">
                  🌅
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900 dark:text-white">Breakfast</h4>
                  <div className="text-xs text-gray-500">7:45 AM – 8:40 AM</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {weeklySchedule[selectedDay]?.breakfast.map((dish, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lunch */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-card space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-700 flex items-center justify-center font-bold">
                  ☀️
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900 dark:text-white">Lunch</h4>
                  <div className="text-xs text-gray-500">12:30 PM – 1:30 PM</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {weeklySchedule[selectedDay]?.lunch.map((dish, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dinner */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-card space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 flex items-center justify-center font-bold">
                  🌙
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900 dark:text-white">Dinner</h4>
                  <div className="text-xs text-gray-500">6:50 PM – 8:40 PM</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {weeklySchedule[selectedDay]?.dinner.map((dish, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
