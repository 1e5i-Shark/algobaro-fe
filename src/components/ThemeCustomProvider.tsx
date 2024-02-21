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

const getSystemTheme = () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemTheme ? 'dark' : 'light';
};

export const ThemeCustomContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeCustomProvider({ children }: ThemeProps) {
  const [themeMode, setThemeMode] = useState<ThemeModeType>(getSystemTheme());
  const [localTheme, setLocalTheme] = useLocalStorage('theme');

  const toggleTheme = () => {
    const toggledTheme = themeMode === 'dark' ? 'light' : 'dark';

    setThemeMode(toggledTheme);
    setLocalTheme(toggledTheme);
  };

  useEffect(() => {
    if (localTheme) {
      localTheme === 'dark' ? setThemeMode('dark') : setThemeMode('light');
    } else {
      setThemeMode(getSystemTheme());
    }
  }, [localTheme]);

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeCustomContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeCustomContext.Provider>
  );
}
