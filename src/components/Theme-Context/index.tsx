import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Theme {
  background?: string;
  color?: string;
  primary?: string;
  secondary?: string;
  border?: string;
}

const themes: Record<string, Theme> = {
  light: {
  },
  dark: {
  }
}

type ThemeName = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  currentTheme: ThemeName;
  resolvedTheme: 'light' | 'dark';
  setTheme: (themeName: ThemeName) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme || '')) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const getResolved = (): 'light' | 'dark' => {
      if (currentTheme === 'system') {
        return media.matches ? 'dark' : 'light';
      }
      return currentTheme;
    }

    const handleChange = () => {
      setResolvedTheme(getResolved());
    }

    handleChange();
    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    }
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme, currentTheme]);

  const setTheme = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
  }

  const value: ThemeContextType = {
    theme: themes[resolvedTheme],
    currentTheme,
    resolvedTheme,
    setTheme
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}

export type { Theme, ThemeContextType, ThemeName }