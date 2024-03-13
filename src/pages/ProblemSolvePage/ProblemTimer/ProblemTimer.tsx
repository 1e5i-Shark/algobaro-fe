import { useState } from 'react';

import { Timer } from '@/components';
import useModal from '@/hooks/useModal';
import useTimerStore from '@/store/TimerStore';

import ProblemEndModal from '../ProblemEndModal/ProblemEndModal';
import * as S from './ProblemTimer.style';
interface TimerProps {
  minutes?: number;
  seconds?: number;
  isProblemSolvePage: boolean;
  openModal?: () => void;
}

export default function ProblemTimer({
  minutes,
  seconds,
  isProblemSolvePage,
}: TimerProps) {
  const [isEnd, setIsEnd] = useState(false);
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  // navigate 테스트용 코드 (삭제 예정)
  const isStop = useTimerStore(state => state.isStop);

  return (
    <S.Wrapper>
      <S.TimeLeftWrapper>
        {isEnd || !isProblemSolvePage ? (
          <S.TimeOverText>시험 종료</S.TimeOverText>
        ) : (
          <S.TimeLeftText>남은 시간</S.TimeLeftText>
        )}
        {isProblemSolvePage && (
          <Timer
            isStop={isStop}
            minutes={minutes}
            seconds={seconds}
            openModal={openModal}
            setIsEnd={setIsEnd}
          />
        )}
      </S.TimeLeftWrapper>
      <ProblemEndModal
        modalRef={modalRef}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </S.Wrapper>
  );
}
