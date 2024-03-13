import { ExitToAppRounded } from '@mui/icons-material';

import { Button, Icon, ThemeModeToggleButton } from '@/components';
import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import { ButtonsWrapper } from '@/pages/RoomPage/RoomPage.style';
import { RoleType } from '@/types/room';

interface RoomButtonsProps {
  role: RoleType;
  className: string;
  onClick: () => void;
  onExit: () => void;
}

export default function RoomHeaderButtons({
  role,
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
        {role === ROOM_ROLE.HOST && (
          <Button
            className="changeRoomInfo"
            fontSize="1.6rem"
            onClick={onClick}
          >
            방 정보 수정
          </Button>
        )}
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
