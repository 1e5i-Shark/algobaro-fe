import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

export default function DarkModeToggleButton() {
  const { theme, toggleTheme } = useCustomTheme();

  return (
    <div>
      <Icon
        onClick={toggleTheme}
        background={true}
      >
        {theme.mode === 'light' ? (
          <LightModeRoundedIcon />
        ) : (
          <DarkModeRoundedIcon />
        )}
      </Icon>
    </div>
  );
}
