import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import useRoomStore from '@/store/RoomStore';
import { RoomMemberType } from '@/types/room';

import { ROOM_ROLE } from '../RoomPage.consts';
import { ModalRoom, RoomHeaderButtons, RoomHeaderInfo } from '.';

interface HeaderProps {
  className: string;
  myRoomData: RoomMemberType;
}

export default function RoomHeader({ className, myRoomData }: HeaderProps) {
  const { memberId: myId, role: myRole } = myRoomData;

  const { roomData, setRoomData } = useRoomStore();
  const { roomMembers } = roomData;

  const { modalRef, isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleExitRoom = async () => {
    const newMembers = roomMembers.filter(member => member.memberId !== myId);
    setRoomData({ roomMembers: newMembers });

    if (myRole === ROOM_ROLE.HOST && roomMembers.length > 1) {
      // Todo: 소켓 연결
      // sendMessage(SOCKET_TYPE.ROOM.CHANGE_HOST);
      alert('방장 자동 변경!');
    }

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
