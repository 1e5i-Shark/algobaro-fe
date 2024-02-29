import { Modal } from '@/components';
import useModal from '@/hooks/useModal';
import * as S from '@/pages/RoomPage/RoomPage.style';

import { RoomHeaderButtons, RoomHeaderInfo } from '.';
import ModalRoom from './ModalRoom';

export default function RoomHeader() {
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <S.HeaderContainer>
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
          onClick={() => {
            alert('방 정보가 수정되었습니다');
            closeModal();
          }}
        />
      </Modal>
    </>
  );
}
