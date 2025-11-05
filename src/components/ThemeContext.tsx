import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorScheme = 'cyan' | 'purple' | 'blue' | 'orange' | 'green';
export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  colorScheme: ColorScheme;
  themeMode: ThemeMode;
  setColorScheme: (scheme: ColorScheme) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const colorSchemes = {
  cyan: {
    primary: 'cyan',
    secondary: 'teal',
    accent: 'emerald',
    gradient: 'from-cyan-400 via-teal-400 to-emerald-400',
    gradientBg: 'from-cyan-500/20 via-teal-500/20 to-emerald-500/20',
    gradientDark: 'from-cyan-600 to-teal-600',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    hover: 'hover:text-cyan-400',
    bg: 'bg-cyan-500',
    shadow: 'shadow-cyan-500',
  },
  purple: {
    primary: 'purple',
    secondary: 'pink',
    accent: 'fuchsia',
    gradient: 'from-purple-400 via-pink-400 to-fuchsia-400',
    gradientBg: 'from-purple-500/20 via-pink-500/20 to-fuchsia-500/20',
    gradientDark: 'from-purple-600 to-pink-600',
    border: 'border-purple-500',
    text: 'text-purple-400',
    hover: 'hover:text-purple-400',
    bg: 'bg-purple-500',
    shadow: 'shadow-purple-500',
  },
  blue: {
    primary: 'blue',
    secondary: 'indigo',
    accent: 'violet',
    gradient: 'from-blue-400 via-indigo-400 to-violet-400',
    gradientBg: 'from-blue-500/20 via-indigo-500/20 to-violet-500/20',
    gradientDark: 'from-blue-600 to-indigo-600',
    border: 'border-blue-500',
    text: 'text-blue-400',
    hover: 'hover:text-blue-400',
    bg: 'bg-blue-500',
    shadow: 'shadow-blue-500',
  },
  orange: {
    primary: 'orange',
    secondary: 'red',
    accent: 'rose',
    gradient: 'from-orange-400 via-red-400 to-rose-400',
    gradientBg: 'from-orange-500/20 via-red-500/20 to-rose-500/20',
    gradientDark: 'from-orange-600 to-red-600',
    border: 'border-orange-500',
    text: 'text-orange-400',
    hover: 'hover:text-orange-400',
    bg: 'bg-orange-500',
    shadow: 'shadow-orange-500',
  },
  green: {
    primary: 'green',
    secondary: 'emerald',
    accent: 'lime',
    gradient: 'from-green-400 via-emerald-400 to-lime-400',
    gradientBg: 'from-green-500/20 via-emerald-500/20 to-lime-500/20',
    gradientDark: 'from-green-600 to-emerald-600',
    border: 'border-green-500',
    text: 'text-green-400',
    hover: 'hover:text-green-400',
    bg: 'bg-green-500',
    shadow: 'shadow-green-500',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('cyan');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Load saved preferences
    const savedScheme = localStorage.getItem('colorScheme') as ColorScheme;
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    
    if (savedScheme && colorSchemes[savedScheme]) {
      setColorScheme(savedScheme);
    }
    if (savedMode) {
      setThemeMode(savedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, themeMode, setColorScheme, setThemeMode, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
