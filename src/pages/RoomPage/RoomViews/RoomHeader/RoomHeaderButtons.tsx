import {
  DarkModeRounded,
  ExitToAppRounded,
  LightModeRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { Button, Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { ButtonsWrapper } from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';

interface RoomButtonsProps {
  className: string;
  onClick: () => void;
}

export default function RoomHeaderButtons({
  className,
  onClick,
}: RoomButtonsProps) {
  const { theme, toggleTheme } = useCustomTheme();

  const navigate = useNavigate();

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
          onClick={() => navigate(PATH.HOME)}
        >
          <ExitToAppRounded fontSize="large" />
        </Icon>
      </ButtonsWrapper>
    </>
  );
}
