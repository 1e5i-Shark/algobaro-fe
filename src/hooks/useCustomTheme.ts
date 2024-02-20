import { useContext } from 'react';

import {
  ThemeContextProps,
  ThemeCustomContext,
} from '@/components/ThemeCustomProvider';

export const useCustomTheme = () => {
  const themeContext: ThemeContextProps = useContext(ThemeCustomContext);

  if (!themeContext) {
    throw new Error('Error: ThemeContext가 존재하지 않습니다.');
  }

  const { theme, toggleTheme } = themeContext;

  return { theme, toggleTheme };
};
