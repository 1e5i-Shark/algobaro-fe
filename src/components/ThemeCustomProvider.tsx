import { createContext, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { darkTheme, lightTheme, ThemeType } from '@/styles/theme';

type ThemeModeType = 'light' | 'dark';

export interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

interface ThemeProps {
  children: ReactNode;
}

export const ThemeCustomContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeCustomProvider({ children }: ThemeProps) {
  const [themeMode, setThemeMode] = useState<ThemeModeType | null>(null);

  const [localTheme, setLocalTheme] = useLocalStorage('theme');

  const getSystemTheme = () => {
    const systemTheme = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;
    return systemTheme ? 'light' : 'dark';
  };

  const toggleTheme = () => {
    const toggledTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(toggledTheme);
    setLocalTheme(toggledTheme);
  };

  useEffect(() => {
    const systemTheme = getSystemTheme();

    if (!localTheme) setThemeMode(systemTheme);

    localTheme === 'light' ? setThemeMode('light') : setThemeMode('dark');
  }, []);

  useEffect(() => {
    if (localTheme !== 'light' && localTheme !== 'dark') {
      const theme = getSystemTheme();

      setThemeMode(theme);
    }
  }, [localTheme]);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeCustomContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
    </ThemeCustomContext.Provider>
  );
}
