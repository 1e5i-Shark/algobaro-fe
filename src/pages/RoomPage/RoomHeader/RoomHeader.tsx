import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

import { ModalRoom, RoomHeaderButtons, RoomHeaderInfo } from '.';

interface HeaderProps {
  className: string;
}

export default function RoomHeader({ className }: HeaderProps) {
  const {
    roomData,
    myRoomData: { email: myEmail, role: myRole },
    setRoomData,
  } = useRoomStore();
  const { roomMembers } = roomData;

  const { modalRef, isOpen, openModal, closeModal } = useModal();
  const { disconnect } = useMessageStore();
  const navigate = useNavigate();

  const handleExitRoom = async () => {
    const newMembers = roomMembers.filter(member => member.email !== myEmail);
    setRoomData({ roomMembers: newMembers });

    // disconnect 시 서버에서 방장 자동 변경
    await disconnect();
    navigate(PATH.HOME);
  };

  return (
    <>
      <S.HeaderContainer className={className}>
        <RoomHeaderInfo className="roomInfo" />
        <RoomHeaderButtons
          role={myRole}
          className="roomButtons"
          onClick={() => openModal()}
          onExit={handleExitRoom}
        />
      </S.HeaderContainer>
      <Modal
        width="70rem"
        height="50rem"
        isOpen={isOpen}
        onClose={closeModal}
        ref={modalRef}
      >
        <ModalRoom
          onClose={() => {
            closeModal();
          }}
        />
      </Modal>
    </>
  );
}
