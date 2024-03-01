import { Button, Modal } from '@/components';
import Timer from '@/components/ProblemSolve/Timer/Timer';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';

import * as S from './ProblemSolvePage.style';

export default function ProblemSolvePage() {
  const { theme } = useCustomTheme();
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  return (
    <S.Wrapper>
      <Timer
        seconds={5}
        openModal={openModal}
      />
      <Modal
        width="fit-content"
        height="20rem"
        ref={modalRef}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <S.ModalWrapper>
          <S.ModalTitle>시험이 종료 되었습니다.</S.ModalTitle>
          <Button
            width="100%"
            fontSize={theme.size.M}
          >
            풀이 공유 페이지로 이동
          </Button>
        </S.ModalWrapper>
      </Modal>
    </S.Wrapper>
  );
}
