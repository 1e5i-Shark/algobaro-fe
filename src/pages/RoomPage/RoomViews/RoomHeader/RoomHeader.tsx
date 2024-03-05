import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { PATH } from '@/routes/path';
import { changeHostAuto } from '@/services/Room/Room';
import useRoomStore from '@/store/Room';
import { MemberType } from '@/types/room';

import { ModalRoom, RoomHeaderButtons, RoomHeaderInfo } from '.';

interface HeaderProps {
  className: string;
  myRoomData: MemberType;
}

export default function RoomHeader({ className, myRoomData }: HeaderProps) {
  const { id: myId, role: myRole } = myRoomData;

  const { roomData, setRoomData } = useRoomStore();
  const { members } = roomData;

  const { modalRef, isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: changeHostAuto,
  });

  const handleExitRoom = async () => {
    const newMembers = members.filter(member => member.id !== myId);
    setRoomData({ members: newMembers });

    if (myRole === 'HOST') {
      alert('방장 자동 변경!');
      // Todo: 방장 자동 변경 API 테스트
      // await mutation.mutate();
    }

    navigate(PATH.HOME);
  };

  return (
    <>
      <S.HeaderContainer className={className}>
        <RoomHeaderInfo className="roomInfo" />
        <RoomHeaderButtons
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
