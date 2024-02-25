import {
  DarkModeRounded,
  ExitToAppRounded,
  LightModeRounded,
} from '@mui/icons-material';

import { Button, Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ButtonsWrapper } from '@/pages/RoomPage/RoomPage.style';

interface RoomButtonsProps {
  className: string;
}

export default function RoomHeaderButtons({ className }: RoomButtonsProps) {
  const { theme, toggleTheme } = useCustomTheme();
  return (
    <ButtonsWrapper className={className}>
      <Button
        className="changeRoomInfo"
        fontSize="1.4rem"
        onClick={() => {
          alert('changeRoomInfo');
        }}
        style={{ marginRight: '1rem' }}
      >
        방 정보 변경
      </Button>
      {theme.mode === 'dark' ? (
        <Icon
          className="darkTheme"
          background={true}
          onClick={() => {
            toggleTheme();
          }}
          style={{ marginRight: '1rem' }}
        >
          <DarkModeRounded fontSize="large" />
        </Icon>
      ) : (
        <Icon
          className="lightTheme"
          background={true}
          onClick={() => toggleTheme()}
          style={{ marginRight: '1rem' }}
        >
          <LightModeRounded fontSize="large" />
        </Icon>
      )}
      <Icon
        className="exitRoom"
        background={true}
        onClick={() => alert('RoomExit')}
        style={{ marginRight: '1rem' }}
      >
        <ExitToAppRounded fontSize="large" />
      </Icon>
    </ButtonsWrapper>
  );
}
