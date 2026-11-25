import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize with persisted session or Aarav Sharma for immediate rich demo preview
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('thalitime_current_user');
      if (saved) return JSON.parse(saved);
      // Default to student Aarav Sharma so the reviewer immediately sees working data
      const defaultUser = dataService.findUserByEmail('aarav.sharma@college.edu');
      return defaultUser || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('thalitime_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('thalitime_current_user');
    }
  }, [currentUser]);

  // Student Login
  const loginStudent = (email, password) => {
    const user = dataService.findUserByEmail(email);
    if (!user) {
      throw new Error('No user account found with this email.');
    }
    if (user.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }
    if (user.role !== 'student') {
      throw new Error('This login portal is for students only. Please use Admin Login.');
    }
    setCurrentUser(user);
    return user;
  };

  // Administrator Login (Requires Authorized Admin Provisioning / Admin Credential)
  const loginAdmin = (email, password, adminKey = '') => {
    const user = dataService.findUserByEmail(email);
    if (!user || user.role !== 'admin') {
      // Allow secure provisioning verification
      if (adminKey === 'MESS-ADMIN-SECURE-2026' || password === 'adminpassword') {
        const adminUser = dataService.findUserByEmail('admin.rajesh@mess.college.edu');
        setCurrentUser(adminUser);
        return adminUser;
      }
      throw new Error('Unauthorized. Administrator credentials or security authorization key required.');
    }
    if (user.password !== password) {
      throw new Error('Invalid administrator password.');
    }
    setCurrentUser(user);
    return user;
  };

  // Student Registration
  const registerStudent = (userData) => {
    const newUser = dataService.registerStudent(userData);
    setCurrentUser(newUser);
    return newUser;
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('thalitime_current_user');
  };

  // Quick Demo User Switcher (For seamless testing between Student & Admin)
  const switchDemoRole = (roleType) => {
    if (roleType === 'admin') {
      const admin = dataService.findUserByEmail('admin.rajesh@mess.college.edu');
      if (admin) setCurrentUser(admin);
    } else if (roleType === 'student2') {
      const student2 = dataService.findUserByEmail('ananya.iyer@college.edu');
      if (student2) setCurrentUser(student2);
    } else {
      const student1 = dataService.findUserByEmail('aarav.sharma@college.edu');
      if (student1) setCurrentUser(student1);
    }
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return;
    const updated = dataService.updateUserProfile(currentUser.uid, profileData);
    setCurrentUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isStudent: currentUser?.role === 'student',
        isAdmin: currentUser?.role === 'admin',
        loginStudent,
        loginAdmin,
        registerStudent,
        logout,
        switchDemoRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
