import { ReactNode, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { darkTheme, lightTheme } from '@/styles/theme';

interface ThemeProps {
  children: ReactNode;
}

export default function ThemeContext({ children }: ThemeProps) {
  const [localTheme] = useLocalStorage('theme');

  const themeMode = useMemo(() => {
    if (localTheme) return localTheme;

    const systemTheme = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;
    return systemTheme ? 'light' : 'dark';
  }, [localTheme]);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}
