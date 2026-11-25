import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('thalitime_theme') === 'dark';
  });

  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    return localStorage.getItem('thalitime_a11y') === 'true';
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('thalitime_high_contrast') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('thalitime_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('thalitime_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    if (accessibilityMode) {
      root.classList.add('accessibility-mode');
      localStorage.setItem('thalitime_a11y', 'true');
    } else {
      root.classList.remove('accessibility-mode');
      localStorage.setItem('thalitime_a11y', 'false');
    }
  }, [accessibilityMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
      localStorage.setItem('thalitime_high_contrast', 'true');
    } else {
      root.classList.remove('high-contrast');
      localStorage.setItem('thalitime_high_contrast', 'false');
    }
  }, [highContrast]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleAccessibility = () => setAccessibilityMode((prev) => !prev);
  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        accessibilityMode,
        highContrast,
        toggleTheme,
        toggleAccessibility,
        toggleHighContrast
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
