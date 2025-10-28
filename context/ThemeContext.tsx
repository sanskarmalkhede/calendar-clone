'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// localStorage key for theme persistence
const THEME_STORAGE_KEY = 'calendar-theme';

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Get system theme preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // Resolve theme based on current theme setting
  const resolveTheme = useCallback((currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Apply theme to document
  const applyTheme = useCallback((resolvedTheme: ResolvedTheme) => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      // Remove existing theme classes
      root.classList.remove('light', 'dark');
      
      // Add new theme class
      root.classList.add(resolvedTheme);
      
      // Set data attribute for CSS custom properties
      root.setAttribute('data-theme', resolvedTheme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        const themeColor = resolvedTheme === 'dark' ? '#0f172a' : '#f9fafb';
        metaThemeColor.setAttribute('content', themeColor);
      }
    }
  }, []);

  // Load theme from localStorage
  const loadThemeFromStorage = useCallback((): Theme => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored && ['light', 'dark', 'system'].includes(stored)) {
          return stored as Theme;
        }
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
    return 'system';
  }, []);

  // Save theme to localStorage
  const saveThemeToStorage = useCallback((theme: Theme) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }, []);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    saveThemeToStorage(newTheme);
    
    const resolved = resolveTheme(newTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [resolveTheme, applyTheme, saveThemeToStorage]);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = loadThemeFromStorage();
    const resolved = resolveTheme(storedTheme);
    
    setThemeState(storedTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [loadThemeFromStorage, resolveTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newResolvedTheme = e.matches ? 'dark' : 'light';
        setResolvedTheme(newResolvedTheme);
        applyTheme(newResolvedTheme);
      }
    };

    // Add listener for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup listener
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, applyTheme]);

  // Prevent hydration mismatch by not rendering until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a minimal provider during SSR to prevent hydration issues
    return (
      <ThemeContext.Provider value={{
        theme: 'system',
        setTheme: () => {},
        resolvedTheme: 'light'
      }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;