// LocalStorage abstraction layer with event-driven reactive sync
import {
  INITIAL_USERS,
  INITIAL_MENU_ITEMS,
  INITIAL_PICKUP_SLOTS,
  INITIAL_BOOKINGS,
  INITIAL_INVENTORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_FEEDBACK
} from './mockData';

const STORAGE_KEYS = {
  USERS: 'thalitime_users',
  MENU: 'thalitime_menu',
  SLOTS: 'thalitime_slots',
  BOOKINGS: 'thalitime_bookings',
  INVENTORY: 'thalitime_inventory',
  NOTIFICATIONS: 'thalitime_notifications',
  FEEDBACK: 'thalitime_feedback',
  SETTINGS: 'thalitime_settings'
};

const INITIAL_DATA_MAP = {
  [STORAGE_KEYS.USERS]: INITIAL_USERS,
  [STORAGE_KEYS.MENU]: INITIAL_MENU_ITEMS,
  [STORAGE_KEYS.SLOTS]: INITIAL_PICKUP_SLOTS,
  [STORAGE_KEYS.BOOKINGS]: INITIAL_BOOKINGS,
  [STORAGE_KEYS.INVENTORY]: INITIAL_INVENTORY,
  [STORAGE_KEYS.NOTIFICATIONS]: INITIAL_NOTIFICATIONS,
  [STORAGE_KEYS.FEEDBACK]: INITIAL_FEEDBACK,
  [STORAGE_KEYS.SETTINGS]: {
    avgServiceTimeMinutes: 2,
    lowStockThreshold: 15,
    autoCutoffMinutes: 30,
    activeMeal: 'dinner',
    enableSoundAlerts: false
  }
};

export const getStorageData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const initial = INITIAL_DATA_MAP[key] || [];
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return INITIAL_DATA_MAP[key] || [];
  }
};

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Dispatch local tab event
    window.dispatchEvent(new CustomEvent('thalitime_sync', { detail: { key, data } }));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
};

export const resetAllDataToDefault = () => {
  Object.keys(INITIAL_DATA_MAP).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(INITIAL_DATA_MAP[key]));
  });
  window.dispatchEvent(new CustomEvent('thalitime_sync', { detail: { key: 'ALL' } }));
};

export { STORAGE_KEYS };
