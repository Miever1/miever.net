// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Theme {
  background?: string
  color?: string
  primary?: string
  secondary?: string
  border?: string
}

const themes: Record<string, Theme> = {
  light: {
  },
  dark: {
  }
}

interface ThemeContextType {
  theme: Theme
  currentTheme: string
  toggleTheme: () => void
  setTheme: (themeName: string) => void
}

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('light')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme)
      }
    }
  }, [])
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme])
  
  const toggleTheme = (): void => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  const setTheme = (themeName: string): void => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }
  
  const value: ThemeContextType = {
    theme: themes[currentTheme],
    currentTheme,
    toggleTheme,
    setTheme
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export type ThemeName = keyof typeof themes
export type { Theme, ThemeContextType }
