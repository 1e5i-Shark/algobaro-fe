import { Modal } from '@/components';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/RoomStore';

import { ModalRoom, RoomHeaderButtons, RoomHeaderInfo } from '.';

interface HeaderProps {
  className: string;
}

export default function RoomHeader({ className }: HeaderProps) {
  const {
    myRoomData: { role: myRole },
  } = useRoomStore();

  const { modalRef, isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <S.HeaderContainer className={className}>
        <RoomHeaderInfo className="roomInfo" />
        <RoomHeaderButtons
          role={myRole}
          className="roomButtons"
          onClick={openModal}
        />
      </S.HeaderContainer>
      <Modal
        width="70rem"
        height="50rem"
        isOpen={isOpen}
        onClose={closeModal}
        ref={modalRef}
      >
        <ModalRoom onClose={closeModal} />
      </Modal>
    </>
  );
}
