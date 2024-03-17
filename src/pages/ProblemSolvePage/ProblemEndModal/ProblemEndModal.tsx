import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Timer } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';
import { PATH } from '@/routes/path';

import * as S from './ProblemEndModal.style';

interface ProblemEndModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ProblemEndModal({
  modalRef,
  isOpen,
  closeModal,
}: ProblemEndModalProps) {
  const [isTimerEnd, setIsTimerEnd] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isTimerEnd) {
      navigate(`${PATH.PROBLEMSHARE}/${MOCK_ROOM_DATA.id}`);
      closeModal();
      setIsTimerEnd(false);
    }
  }, [isTimerEnd]);

  return (
    <Modal
      mode="confirm"
      width="fit-content"
      height="20rem"
      ref={modalRef}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <S.Wrapper>
        <S.ModalTitle>시험이 종료 되었습니다.</S.ModalTitle>
        {!isTimerEnd && (
          <S.InfoTitle>
            <span>{`풀이 공유 페이지로 `}</span>
            <Timer
              seconds={5}
              padLength={0}
              setIsEnd={setIsTimerEnd}
            />
            <span>{` 뒤에 이동합니다..`}</span>
          </S.InfoTitle>
        )}
      </S.Wrapper>
    </Modal>
  );
}
