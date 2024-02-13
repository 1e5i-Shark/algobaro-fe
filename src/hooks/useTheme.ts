import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};
