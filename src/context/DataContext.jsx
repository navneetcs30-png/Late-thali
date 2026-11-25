import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dataService } from '../services/dataService';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [tick, setTick] = useState(0);

  // Core state collections
  const [menuItems, setMenuItems] = useState(() => dataService.getMenuItems());
  const [pickupSlots, setPickupSlots] = useState(() => dataService.getPickupSlots());
  const [bookings, setBookings] = useState(() => dataService.getBookings());
  const [inventory, setInventory] = useState(() => dataService.getInventory());
  const [notifications, setNotifications] = useState(() => dataService.getNotifications(currentUser?.uid));
  const [feedbackList, setFeedbackList] = useState(() => dataService.getFeedbackList());
  const [settings, setSettings] = useState(() => dataService.getSettings());

  // Toast / Banner alert state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  const refreshData = useCallback(() => {
    setMenuItems(dataService.getMenuItems());
    setPickupSlots(dataService.getPickupSlots());
    setBookings(dataService.getBookings());
    setInventory(dataService.getInventory());
    setNotifications(dataService.getNotifications(currentUser?.uid));
    setFeedbackList(dataService.getFeedbackList());
    setSettings(dataService.getSettings());
    setTick((t) => t + 1);
  }, [currentUser]);

  // Listen to custom local tab events and cross-tab storage events
  useEffect(() => {
    const handleSync = () => {
      refreshData();
    };

    window.addEventListener('thalitime_sync', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('thalitime_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [refreshData]);

  // Keep notifications fresh when user changes
  useEffect(() => {
    setNotifications(dataService.getNotifications(currentUser?.uid));
  }, [currentUser, tick]);

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  // Book meal wrapper
  const handleBookMeal = (params) => {
    try {
      const newBooking = dataService.bookMeal({
        student: currentUser,
        ...params
      });
      refreshData();
      showToast(`Token ${newBooking.tokenNumber} generated successfully!`, 'success');
      return newBooking;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Cancel booking wrapper
  const handleCancelBooking = (bookingId) => {
    try {
      const cancelled = dataService.cancelBooking(bookingId, currentUser?.uid);
      refreshData();
      showToast(`Booking ${cancelled.tokenNumber} cancelled. Meal portion restored.`, 'info');
      return cancelled;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Admin token status control
  const handleUpdateTokenStatus = (bookingId, newStatus, counter) => {
    try {
      const updated = dataService.updateTokenStatus(bookingId, newStatus, counter);
      refreshData();
      showToast(`Token ${updated.tokenNumber} updated to "${newStatus}"`, 'success');
      return updated;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Menu operations
  const handleAddMenuItem = (item) => {
    const newItem = dataService.addMenuItem(item);
    refreshData();
    showToast(`Added "${newItem.name}" to menu`, 'success');
    return newItem;
  };

  const handleUpdateMenuItem = (itemId, updates) => {
    const updated = dataService.updateMenuItem(itemId, updates);
    refreshData();
    showToast(`Updated "${updated.name}"`, 'success');
    return updated;
  };

  const handleDeleteMenuItem = (itemId) => {
    dataService.deleteMenuItem(itemId);
    refreshData();
    showToast('Menu item removed', 'info');
  };

  // Slot operations
  const handleAddSlot = (slotData) => {
    const newSlot = dataService.addPickupSlot(slotData);
    refreshData();
    showToast(`Added slot ${newSlot.displayTime}`, 'success');
    return newSlot;
  };

  const handleUpdateSlot = (slotId, updates) => {
    const updated = dataService.updatePickupSlot(slotId, updates);
    refreshData();
    showToast(`Updated slot ${updated.displayTime}`, 'success');
    return updated;
  };

  const handleDeleteSlot = (slotId) => {
    dataService.deletePickupSlot(slotId);
    refreshData();
    showToast('Pickup slot deleted', 'info');
  };

  // Feedback
  const handleSubmitFeedback = (data) => {
    try {
      const fb = dataService.submitFeedback({
        student: currentUser,
        ...data
      });
      refreshData();
      showToast('Thank you! Your feedback has been received.', 'success');
      return fb;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleResolveFeedback = (feedbackId, notes, status) => {
    const fb = dataService.resolveFeedback(feedbackId, notes, status);
    refreshData();
    showToast(`Feedback marked as ${status}`, 'success');
    return fb;
  };

  // Notification actions
  const handleMarkNotificationRead = (notifId) => {
    dataService.markNotificationAsRead(notifId);
    refreshData();
  };

  const handleMarkAllNotificationsRead = () => {
    dataService.markAllNotificationsAsRead(currentUser?.uid);
    refreshData();
    showToast('All notifications marked as read', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        menuItems,
        pickupSlots,
        bookings,
        inventory,
        notifications,
        feedbackList,
        settings,
        unreadNotificationCount,
        toast,
        showToast,
        refreshData,
        bookMeal: handleBookMeal,
        cancelBooking: handleCancelBooking,
        updateTokenStatus: handleUpdateTokenStatus,
        addMenuItem: handleAddMenuItem,
        updateMenuItem: handleUpdateMenuItem,
        deleteMenuItem: handleDeleteMenuItem,
        addPickupSlot: handleAddSlot,
        updatePickupSlot: handleUpdateSlot,
        deletePickupSlot: handleDeleteSlot,
        submitFeedback: handleSubmitFeedback,
        resolveFeedback: handleResolveFeedback,
        markNotificationRead: handleMarkNotificationRead,
        markAllNotificationsRead: handleMarkAllNotificationsRead
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
