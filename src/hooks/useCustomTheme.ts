import { useContext } from 'react';

import {
  ThemeContextProps,
  ThemeCustomContext,
} from '@/components/ThemeCustomProvider';

export const useCustomTheme = () => {
  const { theme, toggleTheme }: ThemeContextProps =
    useContext(ThemeCustomContext);

  return { theme, toggleTheme };
};
