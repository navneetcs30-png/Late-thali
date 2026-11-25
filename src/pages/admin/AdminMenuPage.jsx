import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  UtensilsCrossed,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  Save,
  Search,
  Filter
} from 'lucide-react';

export const AdminMenuPage = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useData();
  const [mealFilter, setMealFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Veg',
    mealType: 'dinner',
    price: 80,
    quantity: 150,
    calories: 600,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
  });

  const filteredItems = menuItems.filter((i) => {
    if (mealFilter === 'all') return true;
    return i.mealType.toLowerCase() === mealFilter.toLowerCase();
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      category: 'Veg',
      mealType: 'dinner',
      price: 90,
      quantity: 180,
      calories: 650,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      mealType: item.mealType,
      price: item.price,
      quantity: item.quantity,
      calories: item.calories || 600,
      imageUrl: item.imageUrl
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem(editingItem.itemId, formData);
    } else {
      addMenuItem(formData);
    }
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Kitchen Production Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Mess Menu Management
          </h2>
          <p className="text-sm text-slate-400">
            Add new thalis, adjust prices and batch quantities, or update real-time counter availability.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'breakfast', 'lunch', 'dinner'].map((m) => (
          <button
            key={m}
            onClick={() => setMealFilter(m)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              mealFilter === m
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.itemId}
            className="bg-slate-800/90 rounded-3xl border border-slate-700 overflow-hidden shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-44">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold text-white shadow ${
                    item.category === 'Veg' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-black/60 text-white capitalize backdrop-blur">
                  {item.mealType}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <select
                  value={item.availability}
                  onChange={(e) => updateMenuItem(item.itemId, { availability: e.target.value })}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-900/90 text-white border border-slate-600 focus:outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Few Left">Few Left</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h3 className="font-bold text-base text-white">{item.name}</h3>
                  <span className="font-extrabold text-base text-emerald-400">₹{item.price}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
              </div>

              {/* Quantity Stepper */}
              <div className="pt-3 border-t border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Available Stock:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateMenuItem(item.itemId, {
                          availableQuantity: Math.max(0, item.availableQuantity - 10)
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center text-xs"
                    >
                      -10
                    </button>
                    <span className="font-mono font-bold text-emerald-400">
                      {item.availableQuantity}
                    </span>
                    <button
                      onClick={() =>
                        updateMenuItem(item.itemId, {
                          availableQuantity: item.availableQuantity + 10
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center text-xs"
                    >
                      +10
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white transition flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Item</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${item.name}" from mess catalog?`)) {
                        deleteMenuItem(item.itemId);
                      }
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-950/40 border border-red-800 hover:bg-red-900/60 transition"
                    title="Delete Menu Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Paneer Butter Masala Thali"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ingredients, side dishes, breads, sweet included..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Meal Session *
                  </label>
                  <select
                    value={formData.mealType}
                    onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs capitalize"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Dietary Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Prep Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Food Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-md transition"
                >
                  {editingItem ? 'Save Changes' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
