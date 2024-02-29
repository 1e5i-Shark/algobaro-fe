import { Modal } from '@/components';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/RoomPage/RoomPage.style';

import { RoomHeaderButtons, RoomHeaderInfo } from '.';
import ModalRoom from './ModalRoom';

interface HeaderProps {
  className: string;
}

export default function RoomHeader({ className }: HeaderProps) {
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <S.HeaderContainer className={className}>
        <RoomHeaderInfo className="roomInfo" />
        <RoomHeaderButtons
          className="roomButtons"
          onClick={() => openModal()}
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
