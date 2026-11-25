import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Landing & Auth
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';

// Student Layout & Pages
import { StudentLayout } from './components/student/StudentLayout';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { BookMealPage } from './pages/student/BookMealPage';
import { MyTokensPage } from './pages/student/MyTokensPage';
import { LiveQueuePage } from './pages/student/LiveQueuePage';
import { StudentMenuPage } from './pages/student/StudentMenuPage';
import { BookingHistoryPage } from './pages/student/BookingHistoryPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentFeedbackPage } from './pages/student/StudentFeedbackPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';

// Admin Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMenuPage } from './pages/admin/AdminMenuPage';
import { AdminSlotsPage } from './pages/admin/AdminSlotsPage';
import { AdminTokenControlPage } from './pages/admin/AdminTokenControlPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />

              {/* Student Protected Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <StudentDashboard />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/book"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <BookMealPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/tokens"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <MyTokensPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/queue"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <LiveQueuePage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/menu"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <StudentMenuPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/history"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <BookingHistoryPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/notifications"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <StudentNotificationsPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/feedback"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <StudentFeedbackPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <StudentProfilePage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/settings"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentLayout>
                      <StudentSettingsPage />
                    </StudentLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/menu"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminMenuPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/slots"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminSlotsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/tokens"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminTokenControlPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/inventory"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminInventoryPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminAnalyticsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/feedback"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminFeedbackPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminNotificationsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminLayout>
                      <AdminSettingsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
