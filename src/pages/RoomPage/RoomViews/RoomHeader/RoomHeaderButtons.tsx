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
  onClick: () => void;
  onExit: () => void;
}

export default function RoomHeaderButtons({
  className,
  onClick,
  onExit,
}: RoomButtonsProps) {
  const { theme, toggleTheme } = useCustomTheme();

  const handleClickExit = () => {
    const confirmed = confirm('정말로 나가시겠습니까?');

    if (confirmed) {
      onExit();
    }
  };

  return (
    <>
      <ButtonsWrapper className={className}>
        <Button
          className="changeRoomInfo"
          fontSize="1.6rem"
          onClick={onClick}
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
          onClick={handleClickExit}
        >
          <ExitToAppRounded fontSize="large" />
        </Icon>
      </ButtonsWrapper>
    </>
  );
}
