import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Utensils, Menu, X, ArrowRight, User, ShieldCheck, LogOut } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-[30px] z-40 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-950 dark:text-white">
                Thali<span className="text-emerald-600 dark:text-emerald-400">Time</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest -mt-1">
                Smart Mess System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700 dark:text-gray-300">
            <a href="#features" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">
              Benefits
            </a>
            <a href="#preview" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">
              Live Preview
            </a>
          </div>

          {/* Auth Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/student'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-soft transition active:scale-95"
                >
                  {currentUser.role === 'admin' ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>Student Dashboard</span>
                    </>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                >
                  Student Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-soft hover:shadow transition active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 pt-2 pb-5 space-y-3">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-gray-700 dark:text-gray-200 py-1"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-gray-700 dark:text-gray-200 py-1"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-gray-700 dark:text-gray-200 py-1"
          >
            Benefits
          </a>
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to={currentUser.role === 'admin' ? '/admin' : '/student'}
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl text-center font-semibold bg-emerald-800 text-white text-sm"
              >
                Go to {currentUser.role === 'admin' ? 'Admin' : 'Student'} Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center font-semibold border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white text-sm"
                >
                  Student Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-xl text-center font-semibold bg-emerald-800 text-white text-sm"
                >
                  Get Started (Register)
                </Link>
                <Link
                  to="/admin-login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-center text-xs text-emerald-700 dark:text-emerald-400 font-medium"
                >
                  Mess Administrator Portal →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
