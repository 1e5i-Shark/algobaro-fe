import { ExitToAppRounded } from '@mui/icons-material';

import { Button, Icon, ThemeModeToggleButton } from '@/components';
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
        >
          방 정보 변경
        </Button>
        <ThemeModeToggleButton />
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
