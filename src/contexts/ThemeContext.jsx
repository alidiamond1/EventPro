import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      const isDark = JSON.parse(stored);
      // Apply dark mode class immediately if stored preference exists
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
      return isDark;
    }
    // Check system preference if no stored preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPreference) {
      document.documentElement.classList.add('dark');
    }
    return systemPreference;
  });

  useEffect(() => {
    // Update document class and localStorage when darkMode changes
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};