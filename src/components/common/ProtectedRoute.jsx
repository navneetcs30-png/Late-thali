import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF5] dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft-lg border border-red-200 dark:border-red-900/50 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Restricted</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
            You are signed in as a <strong className="capitalize">{currentUser.role}</strong>. This section requires <strong className="capitalize">{allowedRole}</strong> privileges.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NavigateToRoleDashboard role={currentUser.role} />
          </div>
        </div>
      </div>
    );
  }

  return children;
};

const NavigateToRoleDashboard = ({ role }) => {
  const target = role === 'admin' ? '/admin' : '/student';
  return (
    <a
      href={target}
      className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold transition"
    >
      Go to My {role === 'admin' ? 'Admin' : 'Student'} Dashboard
    </a>
  );
};
