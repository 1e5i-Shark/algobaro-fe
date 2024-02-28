import {
  DarkModeRounded,
  ExitToAppRounded,
  LightModeRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Modal } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';
import { ButtonsWrapper } from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import { RoomType } from '@/types/room';

import ModalRoom from './ModalRoom';

interface RoomButtonsProps {
  className: string;
  data: RoomType;
}

export default function RoomHeaderButtons({
  className,
  data,
}: RoomButtonsProps) {
  const { theme, toggleTheme } = useCustomTheme();
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  const navigate = useNavigate();

  return (
    <>
      <ButtonsWrapper className={className}>
        <Button
          className="changeRoomInfo"
          fontSize="1.6rem"
          onClick={openModal}
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
      <Modal
        ref={modalRef}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <ModalRoom roomId={data.roomId} />
      </Modal>
    </>
  );
}
