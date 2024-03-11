import useModal from '@/hooks/useModal';

import ProblemEndModal from './ProblemEndModal/ProblemEndModal';
import * as S from './ProblemSolvePage.style';
import ProblemTimer from './ProblemTimer/ProblemTimer';

export default function ProblemSolvePage() {
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  return (
    <S.Wrapper>
      <ProblemTimer
        seconds={5}
        openModal={openModal}
      />
      <ProblemEndModal
        modalRef={modalRef}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </S.Wrapper>
  );
}
